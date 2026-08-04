<template>
  <div class="map-card">
    <div class="map-card__head">
      <div>
        <div class="map-card__title">{{$t('Showroom')}}</div>
        <div class="map-card__text">
          {{$t('Tashkent, Shaikhantakhur district, Sebzar-7')}}
        </div>
      </div>

      <a
        class="map-card__btn"
        target="_blank"
        rel="noreferrer"
        :href="openLink"
      >
        {{$t('Open')}}
      </a>
    </div>

    <div ref="mapEl" class="map"></div>

    <!-- лёгкий премиум-оверлей (не мешает кликам) -->
    <div class="map-glow" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// ✅ координаты Себзар-7 (приблизительно).
// если захочешь точнее — просто заменишь числа.
const center = [41.336194, 69.256306];

const mapEl = ref(null);

const openLink = `https://www.google.com/maps?q=${center[0]},${center[1]}`;

onMounted(() => {
  const map = L.map(mapEl.value, {
    zoomControl: false,
    scrollWheelZoom: false, // чтобы не бесила прокрутка
  }).setView(center, 15);

  // OSM tiles
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      attribution: "",
      zoomControl: false,
      scrollWheelZoom: false,
    }
  ).addTo(map);

  // ✅ кастомная иконка (твоя дверца)
  const icon = L.icon({
    iconUrl: new URL(
      "@/assets/img/kokscha_icon_transparent.svg",
      import.meta.url
    ).href,
    iconSize: [46, 46],
    iconAnchor: [23, 46],
    popupAnchor: [0, -44],
  });

  L.marker(center, { icon })
    .addTo(map)
    .bindPopup(`Ko'kcha eshiklar — ${t("Showroom")}`);

  // если хочешь зум-кнопки — включим:
  // L.control.zoom({ position: "bottomright" }).addTo(map);
});
</script>

<style scoped>
.map-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 22px;
  box-shadow: var(--shadow);
  overflow: hidden;
  position: relative;
}

.map-card__head {
  padding: 18px 18px 14px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.map-card__title {
  font-weight: 800;
  letter-spacing: 0.2px;
}

.map-card__text {
  color: var(--muted);
  margin-top: 6px;
  line-height: 1.45;
  font-size: 14px;
}

.map-card__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 14px;
  font-weight: 800;
  text-decoration: none;
  color: #1b120d;
  background: rgba(200, 161, 101, 0.16);
  border: 1px solid rgba(200, 161, 101, 0.35);
  transition: 0.2s ease;
  white-space: nowrap;
}
.map-card__btn:hover {
  background: rgba(200, 161, 101, 0.22);
  border-color: rgba(200, 161, 101, 0.55);
}

.map {
  height: 380px;
}

.map-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* премиум “винигрет” сверху */
  background: radial-gradient(
      1200px 500px at 15% 0%,
      rgba(200, 161, 101, 0.14),
      transparent 55%
    ),
    radial-gradient(
      900px 400px at 80% 0%,
      rgba(17, 17, 17, 0.06),
      transparent 55%
    );
  mix-blend-mode: multiply;
}

/* ✅ адаптив */
@media (max-width: 1024px) {
  .map {
    height: 320px;
  }
}
@media (max-width: 768px) {
  .map-card__head {
    padding: 16px;
  }
  .map {
    height: 280px;
  }
}
</style>
