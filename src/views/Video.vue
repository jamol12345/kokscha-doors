<script setup>
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from "vue";

import VideoCard from "@/components/views/video/VideoCard.vue";
import VideoModal from "@/components/views/video/VideoModal.vue";

// Instagram profile shown in the "Projects" tab.
const INSTAGRAM_URL = "https://www.instagram.com/kokcha.eshiklari.uz";
const INSTAGRAM_HANDLE = "@kokcha.eshiklari.uz";

// Instagram's iframe embeds (both the official embed.js and third-party widgets)
// get blocked by X-Frame-Options on some networks/browsers, especially for Reels.
// So instead of embedding, we link out to real posts/reels with a static card.
// To feature something new: add its post/reel URL below (type is auto-detected).
const featuredPosts = [
  {
    url: "https://www.instagram.com/kokcha.eshiklari.uz/reel/DYFOx82oLYa/",
    type: "reel",
    image: "/instagram/1.jpg",
  },
  {
    url: "https://www.instagram.com/kokcha.eshiklari.uz/reel/C_cZbaWKMpt/",
    type: "reel",
    image: "/instagram/2.jpg",
  },
  {
    url: "https://www.instagram.com/kokcha.eshiklari.uz/reel/DYBqRPSopCu/",
    type: "reel",
    image: "/instagram/3.jpg",
  },
  {
    url: "https://www.instagram.com/kokcha.eshiklari.uz/reel/DX6hVg4Ig9f/",
    type: "reel",
    image: "/instagram/4.jpg",
  },
  {
    url: "https://www.instagram.com/kokcha.eshiklari.uz/p/DXmgByWCH5C/",
    type: "post",
    image: "/instagram/5.jpg",
  },
  {
    url: "https://www.instagram.com/kokcha.eshiklari.uz/reel/DXhKWSZCFT9/",
    type: "reel",
    image: "/instagram/6.jpg",
  },
];

const mounted = ref(false);
let io;

const activeTab = ref("video");

const observeReveals = () => {
  document.querySelectorAll("[data-reveal]").forEach((el) => io?.observe(el));
};

onMounted(() => {
  requestAnimationFrame(() => (mounted.value = true));

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-in");
      });
    },
    { threshold: 0.12 }
  );

  observeReveals();
});

watch(activeTab, () => {
  nextTick(observeReveals);
});

onUnmounted(() => {
  if (io) io.disconnect();
});

const videos = [
  {
    id: 1,
    src: "/video/video-page/1.mp4",
    poster: "/video/video-page/thumbs/1.jpg",
    date: "2024-04-20",
    titleKey: "Another satisfied customer of “Ko'kcha eshiklari”",
  },
  {
    id: 2,
    src: "/video/video-page/2.mp4",
    poster: "/video/video-page/thumbs/2.jpg",
    date: "2023-08-26",
    titleKey: "Our doors at the Al Anvar hotel",
  },
  {
    id: 3,
    src: "/video/video-page/3.mp4",
    poster: "/video/video-page/thumbs/3.jpg",
    date: "2025-08-29",
    titleKey:
      "For us, every door is more than just wood — it's the beginning of a new story. We recently installed doors for the popular Novias Plaza bridal salon.",
  },
  {
    id: 4,
    src: "/video/video-page/4.mp4",
    poster: "/video/video-page/thumbs/4.jpg",
    date: "2024-09-03",
    titleKey: "The word “delay” is not in our vocabulary",
  },
  {
    id: 5,
    src: "/video/video-page/5.mp4",
    poster: "/video/video-page/thumbs/5.jpg",
    date: "2024-04-24",
    titleKey: "We are always working for your comfort",
  },
];

const sortedVideos = computed(() =>
  [...videos].sort((a, b) => new Date(b.date) - new Date(a.date))
);

const activeVideo = ref(null);

const openVideo = (video) => {
  activeVideo.value = video;
};

const closeVideo = () => {
  activeVideo.value = null;
};
</script>

<template>
  <div class="videoPage" :class="{ 'is-mounted': mounted }">
    <section class="hero">
      <div class="container">
        <div class="kicker" data-reveal>
          {{ activeTab === "video" ? $t("Video") : $t("Projects") }}
        </div>

        <h1 class="heroTitle" data-reveal>
          {{
            activeTab === "video"
              ? $t("Video reviews from our clients")
              : $t("Our projects on Instagram")
          }}
        </h1>

        <p class="heroText" data-reveal>
          {{
            activeTab === "video"
              ? $t(
                  "Watch how Ko'kcha doors look in real interiors — hotels, salons, offices and homes of our clients."
                )
              : $t(
                  "Follow @kokcha.eshiklari.uz on Instagram to see our latest completed projects and behind-the-scenes moments."
                )
          }}
        </p>

        <div class="tabs" data-reveal>
          <button
            type="button"
            class="tabs__btn"
            :class="{ 'is-active': activeTab === 'video' }"
            @click="activeTab = 'video'"
          >
            {{ $t("Video") }}
          </button>
          <button
            type="button"
            class="tabs__btn"
            :class="{ 'is-active': activeTab === 'projects' }"
            @click="activeTab = 'projects'"
          >
            {{ $t("Projects") }}
          </button>
        </div>
      </div>
    </section>

    <section v-if="activeTab === 'video'" class="section">
      <div class="container">
        <div class="grid" data-reveal>
          <VideoCard
            v-for="video in sortedVideos"
            :key="video.id"
            :video="video"
            @play="openVideo"
          />
        </div>
      </div>
    </section>

    <section v-else class="section">
      <div class="container">
        <div class="followBar" data-reveal>
          <div class="followBar__left">
            <div class="followBar__icon">
              <svg viewBox="0 0 24 24" fill="none">
                <rect
                  x="2.5"
                  y="2.5"
                  width="19"
                  height="19"
                  rx="5.5"
                  stroke="currentColor"
                  stroke-width="1.6"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.6"
                  stroke="currentColor"
                  stroke-width="1.6"
                />
                <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" />
              </svg>
            </div>
            <div class="followBar__handle">
              {{ INSTAGRAM_HANDLE }}
            </div>
          </div>

          <a
            class="followBar__btn"
            :href="INSTAGRAM_URL"
            target="_blank"
            rel="noreferrer"
          >
            {{ $t("Open") }}
          </a>
        </div>

        <div class="instagramGrid" data-reveal>
          <a
            class="instaCard"
            v-for="post in featuredPosts"
            :key="post.url"
            :href="post.url"
            target="_blank"
            rel="noreferrer"
            :style="{
              backgroundImage: `url(${post.image})`,
            }"
          >
            <div class="instaCard__icon">
              <svg viewBox="0 0 24 24" fill="none">
                <rect
                  x="2.5"
                  y="2.5"
                  width="19"
                  height="19"
                  rx="5.5"
                  stroke="currentColor"
                  stroke-width="1.6"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.6"
                  stroke="currentColor"
                  stroke-width="1.6"
                />
                <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" />
              </svg>
              <span v-if="post.type === 'reel'" class="instaCard__play">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>

            <div class="instaCard__type">
              {{ post.type === "reel" ? $t("Reel") : $t("Post") }}
            </div>

            <div class="instaCard__link">
              {{ $t("Open") }}
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H9M17 7V15"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>

    <VideoModal :video="activeVideo" @close="closeVideo" />
  </div>
</template>

<style scoped>
.videoPage {
  min-height: 100vh;
  background: #ffffff;
  color: #111827;
}

.container {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

.hero {
  padding: 56px 0 20px;
}

.kicker {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  background: #fff7f1;
  border: 1px solid #f7d9bf;
  color: #9a5a24;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.03em;
}

.heroTitle {
  margin-top: 18px;
  font-size: clamp(34px, 4.4vw, 58px);
  line-height: 1.05;
  font-weight: 900;
  letter-spacing: -0.03em;
  max-width: 16ch;
}

.heroText {
  margin-top: 16px;
  max-width: 62ch;
  color: #6b7280;
  font-size: 16px;
  line-height: 1.85;
}

.tabs {
  margin-top: 26px;
  display: inline-flex;
  padding: 5px;
  gap: 4px;
  border-radius: 999px;
  background: #f3f4f6;
}

.tabs__btn {
  min-height: 42px;
  padding: 0 22px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #6b7280;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.tabs__btn.is-active {
  background: #111827;
  color: #ffffff;
}

.section {
  padding: 36px 0 80px;
}

.followBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  margin-bottom: 28px;
  border-radius: 18px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

.followBar__left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.followBar__icon {
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  border-radius: 13px;
  display: grid;
  place-items: center;
  background: #fff7f1;
  border: 1px solid #f7d9bf;
  color: #f08a3c;
}

.followBar__icon svg {
  width: 22px;
  height: 22px;
}

.followBar__handle {
  font-size: 15px;
  font-weight: 800;
  color: #111827;
}

.followBar__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 20px;
  border-radius: 12px;
  background: #111827;
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.followBar__btn:hover {
  background: #000000;
  transform: translateY(-2px);
}

.instagramGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.instaCard {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  aspect-ratio: 4 / 5;
  padding: 24px;
  border-radius: 20px;
  color: #ffffff;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.instaCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px -18px rgba(17, 24, 39, 0.45);
}

.instaCard{
    position:relative;
    overflow:hidden;

    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
}

.instaCard::before{
    content:"";
    position:absolute;
    inset:0;

    background:linear-gradient(
        to top,
        rgba(0,0,0,.75),
        rgba(0,0,0,.25),
        rgba(0,0,0,.05)
    );
}

.instaCard>*{
    position:relative;
    z-index:2;
}

.instaCard__icon {
  position: relative;
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
}

.instaCard__icon svg {
  width: 100%;
  height: 100%;
}

.instaCard__play {
  position: absolute;
  right: -6px;
  bottom: -6px;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #ffffff;
  color: #111827;
}

.instaCard__play svg {
  width: 13px;
  height: 13px;
}

.instaCard__type {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  opacity: 0.85;
}

.instaCard__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 38px;
  padding: 0 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  font-size: 13px;
  font-weight: 800;
  backdrop-filter: blur(2px);
}

.instaCard__link svg {
  width: 15px;
  height: 15px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

[data-reveal] {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}

.is-mounted [data-reveal].is-in {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 900px) {
  .grid,
  .instagramGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
}

@media (max-width: 768px) {
  .container {
    width: calc(100% - 28px);
  }

  .hero {
    padding: 42px 0 12px;
  }

  .section {
    padding: 24px 0 56px;
  }
}

@media (max-width: 560px) {
  .grid,
  .instagramGrid {
    grid-template-columns: 1fr;
  }

  .followBar {
    padding: 14px 16px;
  }
}

@media (max-width: 420px) {
  .container {
    width: calc(100% - 20px);
  }
}
</style>
