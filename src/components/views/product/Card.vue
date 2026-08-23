<template>
    <RouterLink
        :to="{ name: 'product', params: { id: data.id } }"
        class="product__card"
    >
        <div class="product__card-img">
            <img
                :src="data.thumbnail"
                :alt="`Ko'kcha Eshiklari ${data.title} — ${data.type || 'eshik'}`"
                loading="lazy"
                decoding="async"
                @error="(e) => (e.target.src = '/no-image.svg')"
            />
        </div>

        <div class="product__card-category">
            {{ data.type }}
        </div>

        <div class="product__card-name">{{ $t("Model") }} {{ data.title }}</div>

        <!-- 👇 новая инфа -->
        <div class="product__card-meta">{{ data.color }} • {{ data.size }}</div>

        <div class="product__card-btn">
            <button
                class="btn btn-primary"
                type="button"
                @click.prevent.stop="onLeadClick"
            >
                {{ $t("Submit your application") }}
            </button>
        </div>
    </RouterLink>
</template>

<script setup>
const props = defineProps(["data"]);

const onLeadClick = () => {
    console.log("Lead click:", props.data?.id);
    window.openCallback();
};
</script>
