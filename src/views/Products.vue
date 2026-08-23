<template>
  <div class="products-page">
    <div class="container">
      <h1 class="visually-hidden">
        {{ $t("Catalog") }} — Ko'kcha Eshiklari
      </h1>
      <div class="products-page__content">
        <Category />

        <div class="products-page__right">

          <!-- ✅ Фильтр по цене -->
          <!-- <div class="price-filter">
            <div class="price-filter__title">Фильтр по цене</div>

            <div class="price-filter__row">
              <input
                type="number"
                v-model.number="minPrice"
                class="price-filter__input"
                placeholder="Цена от"
              />
              <input
                type="number"
                v-model.number="maxPrice"
                class="price-filter__input"
                placeholder="Цена до"
              />
              <button class="price-filter__btn" @click="resetPrice">
                Сбросить
              </button>
            </div>
          </div> -->

          <!-- ✅ Список товаров -->
          <div class="products-page__list">
            <Card v-for="data in filteredProducts" :data="data" :key="data.id" />
          </div>

        </div>
      </div>
    </div>
  </div>

  <!-- <Partners /> -->
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { onBeforeRouteUpdate } from "vue-router";

import Partners from "../components/views/home/Partners.vue";
import Category from "../components/views/product/Category.vue";
import Card from "../components/views/product/Card.vue";
import { useProductStore } from "../store/product";

const storeProduct = useProductStore();

const products = ref([]);
const skip = ref(0);
const limit = ref(12);
const total = ref(null);

// ✅ Фильтр
const minPrice = ref(null);
const maxPrice = ref(null);

const resetPrice = () => {
  minPrice.value = null;
  maxPrice.value = null;
};

// ✅ Отфильтрованный список
const filteredProducts = computed(() => {
  const min = minPrice.value ?? -Infinity;
  const max = maxPrice.value ?? Infinity;

  return (products.value || []).filter((p) => p.price >= min && p.price <= max);
});

// ✅ Загрузка товаров
const loadProducts = async (cat) => {
  skip.value = 0;
  limit.value = 12;
  total.value = null;

  resetPrice(); // сбрасываем фильтр при смене категории

  if (cat) {
    const { data } = await storeProduct.getProductsByCategory(cat, {
      limit: limit.value,
      skip: skip.value,
    });
    total.value = data.total;
    products.value = data.products || [];
  } else {
    const { data } = await storeProduct.getProducts({
      limit: limit.value,
      skip: skip.value,
    });
    total.value = data.total;
    products.value = data.products || [];
  }
};

onBeforeRouteUpdate(async (to) => {
  await loadProducts(to.query.cat);
});

onMounted(async () => {
  await loadProducts(null);
});
</script>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.products-page__right {
  width: 100%;
}

.price-filter {
  margin-bottom: 20px;
  padding: 14px;
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fff;
}

.price-filter__title {
  font-weight: 700;
  margin-bottom: 10px;
}

.price-filter__row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.price-filter__input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  min-width: 150px;
}

.price-filter__btn {
  padding: 10px 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: #c8a165;
}
</style>
