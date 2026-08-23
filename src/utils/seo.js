export const SITE_URL = "https://www.kukcha-eshiklari.uz";
export const SITE_NAME = "Ko'kcha Eshiklari";
export const DEFAULT_IMAGE =
  "https://kukcha-doors.up.railway.app/images/1001.webp";

export const DEFAULT_SEO = {
  title: "Ko'kcha Eshiklari — sifatli va zamonaviy eshiklar",
  description:
    "Ko'kcha Eshiklari — Toshkentdagi zamonaviy kirish va ichki eshiklar ishlab chiqaruvchisi. Individual o'lcham, yetkazib berish va professional o'rnatish.",
  image: DEFAULT_IMAGE,
  imageAlt: "Ko'kcha Eshiklari zamonaviy eshik modeli",
};

const organizationSchema = {
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: [
    "Kokcha Eshiklari",
    "Kukcha Eshiklari",
    "Ko'kcha Eshiklar",
  ],
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/kokscha-logo.svg`,
  image: DEFAULT_IMAGE,
  telephone: "+998901301010",
  email: "info@kokscha.uz",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shayxontohur tumani, Sebzor-7",
    addressLocality: "Toshkent",
    addressCountry: "UZ",
  },
  sameAs: ["https://www.instagram.com/kokcha.eshiklari.uz"],
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  alternateName: ["Kokcha Eshiklari", "Kukcha Eshiklari"],
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "uz",
};

const setMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const setCanonical = (url) => {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", url);
};

export const canonicalUrl = (path = "/") => {
  const cleanPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${SITE_URL}${cleanPath}`;
};

const truncateDescription = (value, maxLength = 160) => {
  const text = String(value || "").trim();
  if (text.length <= maxLength) return text;

  const shortened = text.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 100 ? lastSpace : maxLength - 1)}…`;
};

export const updateSeo = ({
  path = "/",
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  image = DEFAULT_SEO.image,
  imageAlt = DEFAULT_SEO.imageAlt,
  type = "website",
  noindex = false,
  schemas = [],
} = {}) => {
  const url = canonicalUrl(path);
  const robots = noindex
    ? "noindex,nofollow"
    : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

  document.title = title;
  document.documentElement.lang = document.documentElement.lang || "uz";

  setMeta("name", "description", description);
  setMeta("name", "robots", robots);
  setMeta("name", "googlebot", robots);
  setCanonical(url);

  setMeta("property", "og:type", type);
  setMeta("property", "og:site_name", SITE_NAME);
  setMeta("property", "og:locale", "uz_UZ");
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", url);
  setMeta("property", "og:image", image);
  setMeta("property", "og:image:alt", imageAlt);

  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", image);
  setMeta("name", "twitter:image:alt", imageAlt);

  let jsonLd = document.head.querySelector("#seo-jsonld");
  if (!jsonLd) {
    jsonLd = document.createElement("script");
    jsonLd.id = "seo-jsonld";
    jsonLd.type = "application/ld+json";
    document.head.appendChild(jsonLd);
  }

  jsonLd.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema, ...schemas],
  });
};

export const updateSeoFromRoute = (route) => {
  const seo = route.meta?.seo || DEFAULT_SEO;

  updateSeo({
    ...seo,
    path: route.path,
    noindex: Boolean(route.meta?.noindex),
  });
};

export const createProductSeo = (product, id) => {
  const model = product.title || id;
  const image = product.thumbnail || DEFAULT_IMAGE;
  const description =
    product.description ||
    `Ko'kcha Eshiklari ${model} modeli: ${product.type || "zamonaviy eshik"}, ${product.color || "turli ranglarda"}.`;
  const metaDescription = truncateDescription(description);

  return {
    path: `/products/${id}`,
    title: `${model} eshik modeli | ${SITE_NAME}`,
    description: metaDescription,
    image,
    imageAlt: `${SITE_NAME} ${model} eshik modeli`,
    type: "product",
    schemas: [
      {
        "@type": "Product",
        "@id": `${canonicalUrl(`/products/${id}`)}#product`,
        name: `${SITE_NAME} ${model}`,
        description,
        image: [image],
        sku: String(model),
        category: product.type || "Eshiklar",
        color: product.color || undefined,
        size: product.size || undefined,
        brand: { "@id": `${SITE_URL}/#organization` },
        url: canonicalUrl(`/products/${id}`),
      },
    ],
  };
};
