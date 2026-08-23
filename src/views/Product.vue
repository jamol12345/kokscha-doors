<template>
  <div class="product-page">
    <div class="loading" v-if="loading">
      <div class="loading-el"></div>
    </div>
    <div class="product-not-found" v-else-if="notFound">
      <h1>Sahifa topilmadi</h1>
      <p>Bunday eshik modeli katalogda mavjud emas.</p>
      <RouterLink :to="{ name: 'products' }">Katalogga qaytish</RouterLink>
    </div>
    <div class="product-page__content" v-else>
      <CurrentCard v-if="product" :data="product" />
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import CurrentCard from "../components/views/product/CurrentCard.vue";
import { useProductStore } from "../store/product";
import { createProductSeo, updateSeo } from "@/utils/seo";

const route = useRoute();
const product = ref(null);
const loading = ref(true);
const notFound = ref(false);
const storeProduct = useProductStore();

let active = true;

onMounted(async () => {
  loading.value = true;
  const { data } = await storeProduct.getProduct(route.params.id);

  if (!active) return;

  if (data?.id == null) {
    notFound.value = true;
    updateSeo({
      path: route.path,
      title: "Eshik modeli topilmadi | Ko'kcha Eshiklari",
      description: "So'ralgan eshik modeli katalogda topilmadi.",
      noindex: true,
    });
  } else {
    product.value = data;
    updateSeo(createProductSeo(data, route.params.id));
  }

  loading.value = false;
});

onUnmounted(() => {
  active = false;
});
</script>
<style lang="scss" scoped>
    .loading{
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &-el{
            width: 60px;
            height: 60px;
            box-shadow: 2px 2px 2px rgb(77, 10, 113);
            border-radius: 50%;
            animation: loading 2s infinite linear;
        }
    }
    @keyframes loading {
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }

    .product-not-found {
        min-height: 55vh;
        display: grid;
        place-content: center;
        gap: 16px;
        padding: 60px 20px;
        text-align: center;
    }

    .product-not-found a {
        color: #8a7b3a;
        font-weight: 700;
    }
</style>
