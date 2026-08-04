<template>
  <section class="hero">
    <div class="hero__left">
      <div class="hero__content">
        <div class="hero__badge">{{$t('NEWS')}}</div>

        <h1 class="hero__title">
          KO'KCHA<br />
          {{$t('DOORS')}}
        </h1>

        <p class="hero__text">
          {{$t('Modern interior and entrance doors.  Model selection, consultation, turnkey delivery and installation.')}}
        </p>

        <div class="hero__actions">
          <RouterLink :to="{ name: 'products' }" class="hero__btn hero__btn--dark">
            {{$t('Catalog')}}
          </RouterLink>

          <a href="#lead-form" class="hero__btn hero__btn--light" @click="openLeadModal">
            {{$t('More detailed')}}
          </a>
        </div>
      </div>
    </div>

    <div class="hero__right">
      <video
        class="hero__video"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
    </div>
  </section>
</template>
<script setup>

const openLeadModal = () => {
  if (window.openCallback) {
    window.openCallback();
  } else {
    console.log("window.openCallback не найден");
  }
};
</script>
<style scoped lang="scss">
.hero {
  min-height: calc(100vh - 124px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #fff;
}

.hero__left {
  display: flex;
  align-items: center;
  background:
    linear-gradient(rgba(92, 92, 92, 0.78), rgba(92, 92, 92, 0.78)),
    url("https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop")
      center/cover no-repeat;
  color: white;
}

.hero__content {
  width: min(520px, calc(100% - 80px));
  margin: 0 auto;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  min-height: 62px;
  border: 2px solid rgba(255, 255, 255, 0.85);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 42px;
}

.hero__title {
  font-size: clamp(42px, 5vw, 72px);
  line-height: 1.02;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-bottom: 22px;
}

.hero__text {
  max-width: 440px;
  font-size: 17px;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.82);
  margin-bottom: 32px;
}

.hero__actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 22px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s ease;
}

.hero__btn--dark {
  background: #111827;
  color: #fff;
}

.hero__btn--dark:hover {
  background: #000;
}

.hero__btn--light {
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: #fff;
}

.hero__btn--light:hover {
  background: rgba(255, 255, 255, 0.08);
}

.hero__right {
  position: relative;
  min-height: 540px;
  background: #f3f4f6;
}

.hero__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 992px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero__left,
  .hero__right {
    min-height: 50vh;
  }

  .hero__content {
    width: calc(100% - 32px);
    padding: 48px 0;
  }
}

@media (max-width: 576px) {
  .hero {
    min-height: auto;
  }

  .hero__left {
    min-height: auto;
  }

  .hero__right {
    min-height: 320px;
  }

  .hero__badge {
    min-width: 150px;
    min-height: 52px;
    margin-bottom: 28px;
  }

  .hero__text {
    font-size: 15px;
  }
}
</style>