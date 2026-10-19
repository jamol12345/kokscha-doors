<template>
  <main class="aboutPage">
    <section class="section section--hero">
      <div class="container">
        <div class="heroGrid">
          <div class="heroLeft">
            <div class="kicker reveal">{{ $t("About the company") }}</div>
            <h1 class="title heroTitle reveal">
              Ko'kcha Eshiklar —
              <span class="accent">{{ $t("modern doors") }}</span>
              {{ $t("for interior and entrance solutions") }}
            </h1>
            <p class="lead reveal">
              {{
                $t(
                  "We produce and install entrance and interior doors in Tashkent. Individual sizes, finishes, fittings and installation are turnkey."
                )
              }}
            </p>
            <div class="heroActions reveal">
              <RouterLink class="btn btn-primary" :to="{ name: 'products' }">
                {{ $t("Catalog") }}
              </RouterLink>
              <RouterLink class="btn btn-outline" :to="{ name: 'builders' }">
                {{ $t("For builders") }}
              </RouterLink>
              <RouterLink class="btn btn-ghost" :to="{ name: 'designers' }">
                {{ $t("For designers") }}
              </RouterLink>
            </div>
            <div class="chips reveal">
              <span class="chip">{{ $t("Individual production") }}</span>
              <span class="chip">{{ $t("Turnkey installation") }}</span>
              <span class="chip">{{ $t("Quality assurance") }}</span>
            </div>
          </div>
          <div class="heroRight card reveal">
            <div class="stats">
              <div class="stat">
                <div class="statNum">{{ display.year }}</div>
                <div class="statLabel">{{ $t("on the market") }}</div>
              </div>
              <div class="stat">
                <div class="statNum">{{ display.projects }}+</div>
                <div class="statLabel">{{ $t("projects") }}</div>
              </div>
              <div class="stat">
                <div class="statNum">{{ display.cities }}</div>
                <div class="statLabel">{{ $t("cities/countries") }}</div>
              </div>
              <div class="stat">
                <div class="statNum">{{ display.support }}</div>
                <div class="statLabel">{{ $t("support") }}</div>
              </div>
            </div>
            <div class="note">
              <div class="noteTitle">{{ $t("Showroom") }}</div>
              <div class="noteText">
                {{ $t("Tashkent, Shaikhantakhur district, Sebzar-7") }}
              </div>
            </div>
            <div class="note">
              <div class="noteTitle">{{ $t("Geography") }}</div>
              <div class="noteText">
                {{ $t("Tashkent • Bishkek • Dushanbe") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section--tint">
      <div class="container">
        <div class="split">
          <div class="splitLeft reveal">
            <h2 class="title h2">{{ $t("Quality as a philosophy") }}</h2>
            <p class="text">
              {{ $t("We keep the focus on the material, precise assembly and clean installation. The door should look neat, modern and last a long time.") }}
            </p>
            <div class="bullets">
              <div class="bullet reveal">
                <div class="bulletDot" />
                <div>
                  <div class="bulletTitle">
                    {{ $t("Control at each stage") }}
                  </div>
                  <div class="bulletText">
                    {{
                      $t(
                        "From measurement to installation and final inspection."
                      )
                    }}
                  </div>
                </div>
              </div>
              <div class="bullet reveal">
                <div class="bulletDot" />
                <div>
                  <div class="bulletTitle">
                    {{ $t("Customized solutions") }}
                  </div>
                  <div class="bulletText">
                    {{ $t("Sizes, finishes, fittings — for your project.") }}
                  </div>
                </div>
              </div>
              <div class="bullet reveal">
                <div class="bulletDot" />
                <div>
                  <div class="bulletTitle">{{ $t("Modern design") }}</div>
                  <div class="bulletText">
                    {{
                      $t("From classics to minimalism, it's neat and relevant.")
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="splitRight reveal">
            <div class="showcase card">
              <div class="showTop">
                <div class="tag">{{ $t("Service") }}</div>
                <div class="tag tag--soft">{{ $t("Production") }}</div>
              </div>
              <div class="showTitle title">
                {{ $t("The details decide everything") }}
              </div>
              <div class="showText">
                {{
                  $t(
                    "We assemble the product so that it looks good and fits exactly into the the project did not create any problems after installation."
                  )
                }}
              </div>
              <div class="miniCards">
                <div class="mini card">
                  <div class="miniTitle">{{ $t("Measuring") }}</div>
                  <div class="miniText">{{ $t("accurate and fast") }}</div>
                </div>
                <div class="mini card">
                  <div class="miniTitle">{{ $t("Production") }}</div>
                  <div class="miniText">{{ $t("under the project") }}</div>
                </div>
                <div class="mini card">
                  <div class="miniTitle">{{ $t("Mounting") }}</div>
                  <div class="miniText">{{ $t("clean and tidy") }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="head reveal">
          <h2 class="title h2">{{ $t("We work with partners") }}</h2>
          <p class="text">
            {{
              $t(
                "Separate working conditions and a convenient format for designers, builders and project clients."
              )
            }}
          </p>
        </div>
        <div class="partnerGrid">
          <RouterLink
            class="partnerCard card reveal"
            :to="{ name: 'designers' }"
          >
            <div class="partnerTitle">{{$t('For designers')}}</div>
            <div class="partnerText">
              {{$t('Selection of finishes, textures, fittings and interior solutions.')}}
            </div>
            <span class="partnerLink">{{$t('Go over')}}</span>
          </RouterLink>
          <RouterLink
            class="partnerCard card reveal"
            :to="{ name: 'builders' }"
          >
            <div class="partnerTitle">{{$t('For builders')}}</div>
            <div class="partnerText">
              {{$t('Wholesale conditions, stable supplies and facility support.')}}
            </div>
            <span class="partnerLink">{{$t('Go over')}}</span>
          </RouterLink>
        </div>
      </div>
    </section>
    <section id="contacts" class="section section--tint">
      <div class="container">
        <div class="head reveal">
          <h2 class="title h2">{{$t('Contacts')}}</h2>
          <p class="text">
            {{$t('Contact us and we will tell you about the models, terms and cost.')}}
          </p>
        </div>
        <div class="contactsGrid">
          <div class="card reveal contactCard">
            <div class="contactTitle">{{$t('Telephone')}}</div>
            <a class="contactLink" href="tel:+998901301010">
              +998 (90) 130-10-10
            </a>
            <div class="contactHint">{{$t('Daily')}} 09:00–20:00</div>
          </div>
          <div class="card reveal contactCard">
            <div class="contactTitle">{{$t('Address')}}</div>
            <div class="contactText">
              {{$t('Tashkent, Shaikhantakhur district, Sebzar-7')}}
            </div>
            <div class="contactHint">{{$t('Showroom')}}</div>
          </div>
          <div class="card reveal contactCard">
            <div class="contactTitle">{{$t('Geography')}}</div>
            <div class="contactText">{{$t('Tashkent • Bishkek • Dushanbe')}}</div>
            <div class="contactHint">{{$t('Delivery by region')}}</div>
          </div>
        </div>
      </div>
    </section>
    <section class="mapSection"><AboutMap /></section>
  </main>
</template>
<script setup>
import { onMounted, onUnmounted, reactive } from "vue";
import AboutMap from "@/components/partials/AboutMap.vue";

const display = reactive({
  year: 0,
  projects: 0,
  cities: 0,
  support: "0/0",
});

let io;
let rafId;

const animateCounters = () => {
  const target = { year: 2022, projects: 1740, cities: 3 };
  const start = performance.now();
  const duration = 900;

  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const ease = 1 - Math.pow(1 - t, 3);

    display.year = Math.round(target.year * ease);
    display.projects = Math.round(target.projects * ease);
    display.cities = Math.max(1, Math.round(target.cities * ease));
    display.support = t < 0.65 ? "12/7" : "24/7";

    if (t < 1) {
      rafId = requestAnimationFrame(tick);
    }
  };

  rafId = requestAnimationFrame(tick);
};

onMounted(() => {
  const els = document.querySelectorAll(".reveal");
  els.forEach((el) => el.classList.add("reveal--init"));

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--show");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));

  const counterEl = document.querySelector(".heroRight");
  if (counterEl) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          animateCounters();
          counterObserver.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    counterObserver.observe(counterEl);
  }
});

onUnmounted(() => {
  if (io) io.disconnect();
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
#contacts {
  scroll-margin-top: 110px;
}

.aboutPage {
  min-height: 100vh;
  background: #ffffff;
  color: #111827;
}

.section {
  padding: 88px 0;
}

.section--hero {
  padding: 72px 0 56px;
}

.section--tint {
  background: #f8f8f8;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.container {
  width: min(1280px, calc(100% - 40px));
  margin: 0 auto;
}

.heroGrid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
  align-items: start;
}

.kicker {
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-weight: 800;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 12px;
}

.heroTitle {
  font-size: clamp(38px, 5vw, 70px);
  line-height: 1.04;
  margin-bottom: 16px;
}

.accent {
  color: #f08a3c;
}

.lead {
  max-width: 62ch;
  font-size: 16px;
  line-height: 1.8;
  color: #6b7280;
  margin-bottom: 24px;
}

.heroActions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.chips {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.chip {
  padding: 8px 12px;
  border-radius: 999px;
  background: #fff7f1;
  border: 1px solid #f7d9bf;
  font-size: 13px;
  font-weight: 700;
  color: #9a5a24;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 22px;
  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.05);
}

.heroRight {
  padding: 22px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.stat {
  padding: 16px;
  border-radius: 18px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
}

.statNum {
  font-weight: 900;
  font-size: 28px;
  line-height: 1.05;
  color: #f08a3c;
}

.statLabel {
  margin-top: 6px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b7280;
}

.note {
  padding: 14px;
  border-radius: 18px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  margin-bottom: 12px;
}

.note:last-child {
  margin-bottom: 0;
}

.noteTitle {
  font-weight: 800;
  margin-bottom: 6px;
}

.noteText {
  color: #6b7280;
  line-height: 1.65;
}

.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: start;
}

.h2 {
  font-size: clamp(28px, 3.2vw, 42px);
  line-height: 1.12;
  margin-bottom: 12px;
}

.text {
  font-size: 16px;
  line-height: 1.8;
  color: #6b7280;
}

.bullets {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bullet {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.bulletDot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #f08a3c;
  margin-top: 7px;
  flex: 0 0 auto;
}

.bulletTitle {
  font-weight: 800;
}

.bulletText {
  color: #6b7280;
  margin-top: 4px;
  line-height: 1.65;
}

.showcase {
  padding: 22px;
}

.showTop {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.tag {
  padding: 8px 10px;
  border-radius: 999px;
  background: #fff7f1;
  border: 1px solid #f7d9bf;
  font-weight: 800;
  font-size: 12px;
  color: #9a5a24;
}

.tag--soft {
  background: #f3f4f6;
  border-color: #e5e7eb;
  color: #6b7280;
}

.showTitle {
  font-size: 30px;
  margin-bottom: 10px;
}

.showText {
  color: #6b7280;
  line-height: 1.75;
}

.miniCards {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.mini {
  padding: 14px;
}

.miniTitle {
  font-weight: 800;
}

.miniText {
  margin-top: 6px;
  color: #6b7280;
}

.head {
  max-width: 70ch;
  margin-bottom: 20px;
}

.partnerGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.partnerCard {
  padding: 22px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.partnerCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(17, 24, 39, 0.08);
}

.partnerTitle {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 8px;
}

.partnerText {
  color: #6b7280;
  line-height: 1.7;
  margin-bottom: 14px;
}

.partnerLink {
  font-weight: 700;
  color: #f08a3c;
}

.contactsGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.contactCard {
  padding: 18px;
}

.contactTitle {
  font-weight: 800;
  margin-bottom: 8px;
}

.contactLink {
  font-weight: 800;
  color: #111827;
  text-decoration: none;
}

.contactLink:hover {
  text-decoration: underline;
}

.contactText {
  color: #6b7280;
  line-height: 1.65;
}

.contactHint {
  margin-top: 8px;
  color: #9ca3af;
  font-size: 13px;
  font-weight: 700;
}

.mapSection {
  padding-top: 0;
}

.reveal--init {
  opacity: 0;
  transform: translateY(18px);
}

.reveal--show {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.65s ease, transform 0.65s ease;
}

@media (max-width: 1024px) {
  .section {
    padding: 72px 0;
  }

  .heroGrid,
  .split {
    grid-template-columns: 1fr;
  }

  .partnerGrid {
    grid-template-columns: 1fr;
  }

  .contactsGrid {
    grid-template-columns: 1fr;
  }

  .miniCards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  #contacts {
    scroll-margin-top: 90px;
  }

  .container {
    width: calc(100% - 24px);
  }

  .section--hero {
    padding: 48px 0 40px;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 56px 0;
  }

  .heroActions {
    gap: 10px;
  }

  .stats {
    grid-template-columns: 1fr;
  }
}
</style>
