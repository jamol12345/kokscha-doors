<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["play"]);

const { locale, t } = useI18n();

const localeMap = {
  en: "en-GB",
  ru: "ru-RU",
  uz: "uz-Latn",
  zh: "zh-CN",
};

const formattedDate = computed(() => {
  const date = new Date(props.video.date);

  try {
    return new Intl.DateTimeFormat(localeMap[locale.value] || "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch (e) {
    return props.video.date;
  }
});
</script>

<template>
  <article class="videoCard" @click="emit('play', video)">
    <div class="videoCard__thumb">
      <img
        :src="video.poster"
        :alt="t(video.titleKey)"
        loading="lazy"
        @error="(e) => (e.target.src = '/no-image.svg')"
      />

      <div class="videoCard__overlay">
        <button
          class="videoCard__play"
          type="button"
          :aria-label="t('Watch video')"
          @click.stop="emit('play', video)"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>

    <div class="videoCard__body">
      <h3 class="videoCard__title">{{ t(video.titleKey) }}</h3>
      <div class="videoCard__date">{{ formattedDate }}</div>
    </div>
  </article>
</template>

<style scoped>
.videoCard {
  position: relative;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.videoCard:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 50px rgba(17, 24, 39, 0.1);
  border-color: #f2b37e;
}

.videoCard__thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  background: #111827;
  overflow: hidden;
}

.videoCard__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.videoCard:hover .videoCard__thumb img {
  transform: scale(1.04);
}

.videoCard__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(17, 24, 39, 0) 55%, rgba(17, 24, 39, 0.55) 100%);
}

.videoCard__play {
  width: 62px;
  height: 62px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.92);
  color: #111827;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(17, 24, 39, 0.3);
  transition: transform 0.2s ease, background 0.2s ease;
}

.videoCard__play svg {
  width: 24px;
  height: 24px;
  margin-left: 3px;
}

.videoCard:hover .videoCard__play {
  transform: scale(1.08);
  background: #f08a3c;
  color: #ffffff;
}

.videoCard__body {
  padding: 18px 20px 22px;
}

.videoCard__title {
  font-size: 16px;
  line-height: 1.45;
  font-weight: 700;
  color: #111827;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.videoCard__date {
  margin-top: 10px;
  font-size: 13px;
  color: #9ca3af;
  font-weight: 600;
  letter-spacing: 0.01em;
}
</style>
