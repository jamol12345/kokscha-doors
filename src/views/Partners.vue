<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import HeroSimple from "@/components/sections/HeroSimple.vue";

const mounted = ref(false);


let io;
const revealEls = [];

onMounted(() => {
  requestAnimationFrame(() => (mounted.value = true));

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-in");
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    revealEls.push(el);
    io.observe(el);
  });
});

onUnmounted(() => {
  if (io) io.disconnect();
});
</script>

<template>
  
  <div class="partners" :class="{ 'is-mounted': mounted }">
    <HeroSimple
  :title="$t('Cooperation')"
  :subtitle="$t('Stable supplies, facility support and favorable terms for construction companies, contractors and fit-out teams.')"
  :ctaText="$t('Submit your application')"
  @openCallback="openCallback"
/>

    <section class="section">
      <div class="container">
        <div class="kpis" data-reveal>
          <div class="kpi">
            <div class="kpi__num">4+</div>
            <div class="kpi__text">{{$t('years on the market')}}</div>
          </div>
          <div class="kpi">
            <div class="kpi__num">10 {{$t('years')}}</div>
            <div class="kpi__text">{{$t('door warranty')}}</div>
          </div>
          <div class="kpi">
            <div class="kpi__num">{{$t('GOST / ISO')}}</div>
            <div class="kpi__text">{{$t('quality standards')}}</div>
          </div>
          <div class="kpi">
            <div class="kpi__num">{{$t('min / max')}}</div>
            <div class="kpi__text">{{$t('custom-made')}}</div>
          </div>
        </div>

        <div class="heroCard" data-reveal>
          <div class="heroCard__badge">{{$t('Partner Program')}}</div>
          <h2 class="heroCard__title">
            {{$t('Cooperation that is convenient for construction projects')}}
          </h2>
          <p class="heroCard__text">
           {{$t('We supply interior doors for facilities and private orders. We accompany our partners at all stages and help them find solutions. for the budget, project format and deadlines.')}}
          </p>

          <div class="heroCard__actions">
            <button
  class="btn btn--primary"
  @click="openCallback"
>
  {{$t('Submit your application')}}
</button>
            <a class="btn btn--ghost" href="tel:+998901301010">{{$t('To call')}}</a>
          </div>
        </div>

        <div class="grid" data-reveal>
          <article class="card">
            <div class="card__top">
              <div class="icon">🤝</div>
              <h3 class="card__title">{{$t('What we offer')}}</h3>
            </div>

            <ul class="list">
              <li>{{$t('Stable supplies and clear deadlines')}}</li>
              <li>{{$t('Selection of models for the object')}}</li>
              <li>{{$t('Volume discounts and special conditions')}}</li>
              <li>{{$t('Consultations on assortment and configuration')}}</li>
              <li>{{$t('Support at the approval stage')}}</li>
              <li>{{$t('Presentation materials for clients')}}</li>
            </ul>
          </article>

          <article class="card">
            <div class="card__top">
              <div class="icon">🛠️</div>
              <h3 class="card__title">{{$t('Product Advantages')}}</h3>
            </div>

            <ul class="list">
              <li>{{$t('Custom size manufacturing')}}</li>
              <li>{{$t('A wide range of models and coatings')}}</li>
              <li>{{$t('PVC veneer, enamel, patina')}}</li>
              <li>{{$t('Comprehensive interior solutions')}}</li>
              <li>{{$t('Reliable design and modern production')}}</li>
              <li>{{$t('Short production time')}}</li>
            </ul>
          </article>

          <article class="card card--wide">
            <div class="card__top">
              <div class="icon">🏗️</div>
              <h3 class="card__title">{{$t('Suitable for whom')}}</h3>
            </div>

            <p class="muted">
              {{$t('We work with builders, contractors, salons, and companies that complete facilities with doors. We supply solutions for apartments, houses, commercial premises and development projects.')}}
            </p>

            <div class="chips">
              <span class="chip">{{$t('Object configuration')}}</span>
              <span class="chip">{{$t('Wholesale supplies')}}</span>
              <span class="chip">{{$t('Salons and sections')}}</span>
              <span class="chip">{{$t('Contracting organizations')}}</span>
            </div>
          </article>
        </div>

        <div class="steps" data-reveal>
          <div class="steps__head">
            <h2 class="steps__title">{{$t('How to start a collaboration')}}</h2>
            <p class="steps__sub">
              {{$t('A fast and clear process — from the application to the launch of deliveries.')}}
            </p>
          </div>

          <div class="steps__grid">
            <div class="step">
              <div class="step__n">01</div>
              <div class="step__t">{{$t('Leave a request')}}</div>
              <div class="step__d">
                {{$t('Write down what your project is, the scope, and what exactly is required.')}}
              </div>
            </div>

            <div class="step">
              <div class="step__n">02</div>
              <div class="step__t">{{$t('Well agree on the terms')}}</div>
              <div class="step__d">
                {{$t('We will select the assortment, finishes, terms and convenient format of work.')}}
              </div>
            </div>

            <div class="step">
              <div class="step__n">03</div>
              <div class="step__t">{{$t('Launching deliveries')}}</div>
              <div class="step__d">
                {{$t('We support the project and provide stable equipment.')}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.partners {
  min-height: 100vh;
  background: #ffffff;
  color: #111827;
}

.container {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

.section {
  padding: 24px 0 88px;
}

[data-reveal] {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.is-mounted [data-reveal].is-in {
  opacity: 1;
  transform: translateY(0);
}

.kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 12px;
  margin-bottom: 16px;
}

.kpi {
  border-radius: 18px;
  padding: 18px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
}

.kpi__num {
  color: #f08a3c;
  font-weight: 900;
  letter-spacing: 0.02em;
  font-size: clamp(18px, 2.2vw, 26px);
}

.kpi__text {
  margin-top: 6px;
  color: #6b7280;
  font-size: 13px;
}

.heroCard {
  border-radius: 22px;
  padding: clamp(20px, 2.8vw, 28px);
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.05);
}

.heroCard__badge {
  display: inline-flex;
  align-items: center;
  padding: 7px 12px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 12px;
  color: #9a5a24;
  background: #fff7f1;
  border: 1px solid #f7d9bf;
}

.heroCard__title {
  margin-top: 12px;
  color: #111827;
  font-weight: 900;
  line-height: 1.14;
  font-size: clamp(22px, 3vw, 36px);
}

.heroCard__text {
  margin-top: 10px;
  color: #6b7280;
  line-height: 1.75;
  font-size: 15px;
  max-width: 82ch;
}

.heroCard__actions {
  margin-top: 16px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 14px;
  font-weight: 800;
  text-decoration: none;
  transition: 0.2s ease;
}

.btn--primary {
  color: #ffffff;
  background: #111827;
  border: 1px solid #111827;
}

.btn--primary:hover {
  background: #000000;
  transform: translateY(-1px);
}

.btn--ghost {
  color: #111827;
  background: #ffffff;
  border: 1px solid #d1d5db;
}

.btn--ghost:hover {
  background: #f9fafb;
  transform: translateY(-1px);
}

.grid {
  margin-top: 16px;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
}

.card {
  border-radius: 22px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 36px rgba(17, 24, 39, 0.08);
}

.card__top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: #fff7f1;
  border: 1px solid #f7d9bf;
}

.card__title {
  color: #111827;
  font-size: 18px;
  font-weight: 900;
}

.list {
  margin-top: 12px;
  padding-left: 18px;
  color: #6b7280;
  line-height: 1.85;
  font-size: 14px;
}

.muted {
  margin-top: 12px;
  color: #6b7280;
  line-height: 1.75;
  font-size: 14px;
}

.card--wide {
  grid-column: span 2;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.chip {
  padding: 8px 12px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 12px;
  color: #9a5a24;
  background: #fff7f1;
  border: 1px solid #f7d9bf;
}

.steps {
  margin-top: 18px;
  border-radius: 22px;
  padding: clamp(20px, 2.8vw, 26px);
  background: #f8f8f8;
  border: 1px solid #e5e7eb;
}

.steps__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.steps__title {
  color: #111827;
  font-weight: 900;
  font-size: clamp(20px, 2.5vw, 30px);
}

.steps__sub {
  color: #6b7280;
  line-height: 1.6;
  max-width: 62ch;
  font-size: 14px;
}

.steps__grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.step {
  border-radius: 20px;
  padding: 18px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.step:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(17, 24, 39, 0.06);
}

.step__n {
  font-weight: 1000;
  letter-spacing: 0.06em;
  color: #f08a3c;
}

.step__t {
  margin-top: 6px;
  font-weight: 900;
  color: #111827;
}

.step__d {
  margin-top: 6px;
  color: #6b7280;
  line-height: 1.65;
  font-size: 13.5px;
}

@media (max-width: 980px) {
  .kpis {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .card--wide {
    grid-column: auto;
  }

  .steps__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .container {
    width: calc(100% - 28px);
  }

  .section {
    padding: 18px 0 64px;
  }
}

@media (max-width: 420px) {
  .container {
    width: calc(100% - 20px);
  }

  .kpis {
    grid-template-columns: 1fr;
  }
}
</style>