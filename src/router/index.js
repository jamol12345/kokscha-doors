import { createRouter, createWebHistory } from "vue-router";
import { updateSeoFromRoute } from "@/utils/seo";

import Index from "../views/Index.vue";

const Products = () => import("../views/Products.vue");
const Product = () => import("../views/Product.vue");
const About = () => import("../views/About.vue");
const Partners = () => import("../views/Partners.vue");
const Designers = () => import("../views/Designers.vue");
const Builders = () => import("../views/Builders.vue");
const Video = () => import("../views/Video.vue");
const OurPartners = () => import("../views/OurPartners.vue");
const NotFound = () => import("../views/NotFound.vue");

const routes = [
  {
    path: "/",
    component: Index,
    name: "index",
    meta: {
      seo: {
        title: "Ko'kcha Eshiklari — sifatli va zamonaviy eshiklar",
        description:
          "Ko'kcha Eshiklari — Toshkentdagi zamonaviy kirish va ichki eshiklar ishlab chiqaruvchisi. Individual o'lcham, yetkazib berish va professional o'rnatish.",
      },
    },
  },
  {
    path: "/products",
    component: Products,
    name: "products",
    meta: {
      seo: {
        title: "Eshiklar katalogi | Ko'kcha Eshiklari",
        description:
          "Ko'kcha Eshiklari katalogi: klassik, neoklassik, minimalistik va zamonaviy eshik modellari. Rang, uslub va o'lcham bo'yicha tanlang.",
      },
    },
  },
  {
    path: "/products/:id",
    component: Product,
    name: "product",
    meta: {
      seo: {
        title: "Eshik modeli | Ko'kcha Eshiklari",
        description:
          "Ko'kcha Eshiklari eshik modeli haqida tavsif, rang, uslub va o'lcham ma'lumotlari.",
      },
    },
  },
  {
    path: "/about",
    component: About,
    name: "about",
    meta: {
      seo: {
        title: "Kompaniya haqida | Ko'kcha Eshiklari",
        description:
          "Ko'kcha Eshiklari Toshkentda kirish va ichki eshiklar ishlab chiqaradi va o'rnatadi. Individual o'lchamlar, sifat nazorati va kafolat.",
      },
    },
  },
  {
    path: "/partners",
    component: Partners,
    name: "partners",
    meta: {
      seo: {
        title: "Hamkorlik | Ko'kcha Eshiklari",
        description:
          "Qurilish kompaniyalari, pudratchilar va salonlar uchun Ko'kcha Eshiklari hamkorlik shartlari, barqaror yetkazib berish va loyiha yordami.",
      },
    },
  },
  {
    path: "/designers",
    component: Designers,
    name: "designers",
    meta: {
      seo: {
        title: "Dizayner va arxitektorlar uchun | Ko'kcha Eshiklari",
        description:
          "Dizayner va arxitektorlar uchun eshik modellari, dekor, materiallar va loyiha bo'yicha Ko'kcha Eshiklari yordami.",
      },
    },
  },
  {
    path: "/builders",
    component: Builders,
    name: "builders",
    meta: {
      seo: {
        title: "Quruvchilar uchun eshiklar | Ko'kcha Eshiklari",
        description:
          "Quruvchilar va pudratchilar uchun o'rnatishga tayyor eshik bloklari, individual o'lchamlar, tez yetkazib berish va loyiha yordami.",
      },
    },
  },
  {
    path: "/video",
    component: Video,
    name: "video",
    meta: {
      seo: {
        title: "Eshiklar video va loyihalar | Ko'kcha Eshiklari",
        description:
          "Ko'kcha Eshiklari eshiklari mehmonxona, salon, ofis va uy interyerlarida qanday ko'rinishini video va loyihalarda tomosha qiling.",
      },
    },
  },
  {
    path: "/our-partners",
    component: OurPartners,
    name: "our-partners",
    meta: {
      seo: {
        title: "Bizning hamkorlarimiz | Ko'kcha Eshiklari",
        description:
          "Ko'kcha Eshiklari bilan hamkorlik qilayotgan mehmonxonalar, kompaniyalar va tashkilotlar hamda amalga oshirilgan loyihalar.",
      },
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    name: "not-found",
    meta: {
      noindex: true,
      seo: {
        title: "Sahifa topilmadi | Ko'kcha Eshiklari",
        description: "So'ralgan sahifa topilmadi.",
      },
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
});

router.afterEach((to) => {
  updateSeoFromRoute(to);
});

export default router;
