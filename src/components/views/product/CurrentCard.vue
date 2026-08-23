```vue
<template>
    <div class="current">
        <div class="container">
            <div class="card-content">
                <!-- КАРТИНКА -->
                <div class="card-content_carousel">
                    <div class="product-image-wrapper">
                        <img
                            :src="data.thumbnail"
                            class="product-image"
                            @error="onImgError"
                            :alt="`Ko'kcha Eshiklari ${data.title} — ${data.type || 'eshik'}`"
                            fetchpriority="high"
                        />
                    </div>
                </div>

                <!-- ИНФА -->
                <div class="card-content_info">
                    <div class="product__card-name">
                        <h1>{{ $t("Model") }} {{ data.title }}</h1>
                    </div>

                    <!-- характеристики -->
                    <div class="specs">
                        <p>
                            <b>{{ $t("Type") }}:</b> {{ data.type }}
                        </p>
                        <p>
                            <b>{{ $t("Style") }}:</b> {{ data.style }}
                        </p>
                        <p>
                            <b>{{ $t("Colour") }}:</b> {{ data.color }}
                        </p>
                        <p>
                            <b>{{ $t("Size") }}:</b> {{ data.size }}
                        </p>
                        <p>
                            <b>{{ $t("Content") }}:</b> {{ data.fill }}
                        </p>
                    </div>

                    <!-- описание -->
                    <div class="description">
                        <h3>{{ $t("description") }}</h3>
                        <p>{{ data.description }}</p>
                    </div>

                    <!-- кнопка -->
                    <div class="product__card-btn">
                        <button class="btn btn-primary" @click="onLeadClick">
                            {{ $t("Submit your application") }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- похожие товары -->
        <NewProducts />
    </div>
</template>

<script setup>
import NewProducts from "../home/NewProducts.vue";

const props = defineProps(["data"]);

const onImgError = (e) => {
    e.target.src = "/no-image.svg";
};

const onLeadClick = () => {
    console.log("Lead for:", props.data?.id);
    window.openCallback?.();
};
</script>

<style scoped>
.card-content {
    display: flex;
    gap: 40px;
    margin-top: 30px;
    align-items: flex-start;

    background: #f6f7f8;
    padding: 30px;
    border-radius: 20px;
}

/* ЛЕВАЯ ЧАСТЬ */
.card-content_carousel {
    flex: 0 0 420px;
}

/* ОБЕРТКА КАРТИНКИ */
.product-image-wrapper {
    width: 100%;
    height: 420px;
    background: #fff;
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    overflow: hidden;
}

/* САМА КАРТИНКА */
.product-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transition: 0.3s;
}

.product-image:hover {
    transform: scale(1.05);
}

/* ПРАВАЯ ЧАСТЬ */
.card-content_info {
    flex: 1;
}

.product__card-name h1 {
    margin-bottom: 10px;
    font-size: 1.5em;
}

/* ХАРАКТЕРИСТИКИ */
.specs {
    margin-top: 20px;
}

.specs p {
    margin: 6px 0;
    font-size: 14px;
}

/* ОПИСАНИЕ */
.description {
    margin-top: 20px;
}

.description h3 {
    margin-bottom: 10px;
}

/* КНОПКА */
.product__card-btn {
    margin-top: 25px;
}

/* АДАПТИВ */
@media (max-width: 900px) {
    .card-content {
        flex-direction: column;
        padding: 20px;
    }

    .card-content_carousel {
        width: 100%;
    }

    .product-image-wrapper {
        height: 300px;
    }
}
</style>
```
