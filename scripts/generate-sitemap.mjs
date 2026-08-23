import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://www.kukcha-eshiklari.uz";
const DOORS_API = "https://kukcha-doors.up.railway.app/api/doors";

const staticPaths = [
  "/",
  "/products",
  "/about",
  "/partners",
  "/designers",
  "/builders",
  "/video",
  "/our-partners",
];

const staticPages = {
  "/products": {
    title: "Eshiklar katalogi | Ko'kcha Eshiklari",
    description:
      "Ko'kcha Eshiklari katalogi: klassik, neoklassik, minimalistik va zamonaviy eshik modellari. Rang, uslub va o'lcham bo'yicha tanlang.",
  },
  "/about": {
    title: "Kompaniya haqida | Ko'kcha Eshiklari",
    description:
      "Ko'kcha Eshiklari Toshkentda kirish va ichki eshiklar ishlab chiqaradi va o'rnatadi. Individual o'lchamlar, sifat nazorati va kafolat.",
  },
  "/partners": {
    title: "Hamkorlik | Ko'kcha Eshiklari",
    description:
      "Qurilish kompaniyalari, pudratchilar va salonlar uchun Ko'kcha Eshiklari hamkorlik shartlari, barqaror yetkazib berish va loyiha yordami.",
  },
  "/designers": {
    title: "Dizayner va arxitektorlar uchun | Ko'kcha Eshiklari",
    description:
      "Dizayner va arxitektorlar uchun eshik modellari, dekor, materiallar va loyiha bo'yicha Ko'kcha Eshiklari yordami.",
  },
  "/builders": {
    title: "Quruvchilar uchun eshiklar | Ko'kcha Eshiklari",
    description:
      "Quruvchilar va pudratchilar uchun o'rnatishga tayyor eshik bloklari, individual o'lchamlar, tez yetkazib berish va loyiha yordami.",
  },
  "/video": {
    title: "Eshiklar video va loyihalar | Ko'kcha Eshiklari",
    description:
      "Ko'kcha Eshiklari eshiklari mehmonxona, salon, ofis va uy interyerlarida qanday ko'rinishini video va loyihalarda tomosha qiling.",
  },
  "/our-partners": {
    title: "Bizning hamkorlarimiz | Ko'kcha Eshiklari",
    description:
      "Ko'kcha Eshiklari bilan hamkorlik qilayotgan mehmonxonalar, kompaniyalar va tashkilotlar hamda amalga oshirilgan loyihalar.",
  },
};

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const truncateDescription = (value, maxLength = 160) => {
  const text = String(value || "").trim();
  if (text.length <= maxLength) return text;

  const shortened = text.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 100 ? lastSpace : maxLength - 1)}…`;
};

const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 15000);
let productPaths = [];
let doors = [];

try {
  const response = await fetch(DOORS_API, { signal: controller.signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const payload = await response.json();
  doors = Array.isArray(payload) ? payload : payload.doors || [];

  productPaths = doors
    .filter((door) => door?.id != null)
    .map((door) => `/products/${encodeURIComponent(String(door.id))}`);
} catch (error) {
  throw new Error(
    `SEO generation requires the current product catalog, but ${DOORS_API} failed: ${error.message}`,
    { cause: error }
  );
} finally {
  clearTimeout(timeout);
}

const paths = [...new Set([...staticPaths, ...productPaths])];
const urls = paths
  .map((path) => `  <url><loc>${escapeXml(`${SITE_URL}${path}`)}</loc></url>`)
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outputPath = fileURLToPath(new URL("../dist/sitemap.xml", import.meta.url));
await writeFile(outputPath, sitemap, "utf8");

const htmlPath = fileURLToPath(new URL("../dist/index.html", import.meta.url));
const seoOutputDir = fileURLToPath(new URL("../dist/_seo", import.meta.url));
const baseHtml = await readFile(htmlPath, "utf8");
const baseJsonLdMatch = baseHtml.match(
  /<script id="seo-jsonld" type="application\/ld\+json">([\s\S]*?)<\/script>/
);
const baseGraph = baseJsonLdMatch
  ? JSON.parse(baseJsonLdMatch[1])["@graph"]
  : [];

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const replaceMeta = (html, attribute, key, content) => {
  const pattern = new RegExp(
    `<meta\\s+${attribute}="${key}"[\\s\\S]*?\\/?>`,
    "i"
  );
  return html.replace(
    pattern,
    `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`
  );
};

const renderSeoHtml = ({
  path,
  title,
  description,
  image = "https://kukcha-doors.up.railway.app/images/1001.webp",
  imageAlt = "Ko'kcha Eshiklari zamonaviy eshik modeli",
  type = "website",
  schemas = [],
}) => {
  const url = `${SITE_URL}${path}`;
  let html = baseHtml.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(title)}</title>`
  );

  html = replaceMeta(html, "name", "description", description);
  html = replaceMeta(html, "property", "og:type", type);
  html = replaceMeta(html, "property", "og:title", title);
  html = replaceMeta(html, "property", "og:description", description);
  html = replaceMeta(html, "property", "og:url", url);
  html = replaceMeta(html, "property", "og:image", image);
  html = replaceMeta(html, "property", "og:image:alt", imageAlt);
  html = replaceMeta(html, "name", "twitter:title", title);
  html = replaceMeta(html, "name", "twitter:description", description);
  html = replaceMeta(html, "name", "twitter:image", image);
  html = replaceMeta(html, "name", "twitter:image:alt", imageAlt);
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(url)}" />`
  );

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [...baseGraph, ...schemas],
  }).replaceAll("<", "\\u003c");

  return html.replace(
    /<script id="seo-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="seo-jsonld" type="application/ld+json">${jsonLd}</script>`
  );
};

await mkdir(seoOutputDir, { recursive: true });

for (const [path, seo] of Object.entries(staticPages)) {
  const filename = path.slice(1).replaceAll("/", "-") + ".html";
  await writeFile(
    `${seoOutputDir}/${filename}`,
    renderSeoHtml({ path, ...seo }),
    "utf8"
  );
}

const productOutputDir = `${seoOutputDir}/products`;
await mkdir(productOutputDir, { recursive: true });

for (const door of doors) {
  if (door?.id == null) continue;

  const id = encodeURIComponent(String(door.id));
  const model = door.model || id;
  const path = `/products/${id}`;
  const image = door.image
    ? `https://kukcha-doors.up.railway.app${door.image}`
    : "https://kukcha-doors.up.railway.app/images/1001.webp";
  const description =
    door.description ||
    `Ko'kcha Eshiklari ${model} modeli: ${door.type || "zamonaviy eshik"}, ${door.color || "turli ranglarda"}.`;
  const metaDescription = truncateDescription(description);
  const title = `${model} eshik modeli | Ko'kcha Eshiklari`;
  const productSchema = {
    "@type": "Product",
    "@id": `${SITE_URL}${path}#product`,
    name: `Ko'kcha Eshiklari ${model}`,
    description,
    image: [image],
    sku: String(model),
    category: door.type || "Eshiklar",
    color: door.color || undefined,
    size: door.size || undefined,
    brand: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}${path}`,
  };

  await writeFile(
    `${productOutputDir}/${id}.html`,
    renderSeoHtml({
      path,
      title,
      description: metaDescription,
      image,
      imageAlt: `Ko'kcha Eshiklari ${model} eshik modeli`,
      type: "product",
      schemas: [productSchema],
    }),
    "utf8"
  );
}

console.log(
  `SEO: generated ${paths.length} sitemap URLs and ${Object.keys(staticPages).length + doors.length} route HTML files.`
);
