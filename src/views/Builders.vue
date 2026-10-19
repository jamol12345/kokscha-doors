<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { companyContent } from "@/components/content/companyContent";

const mounted = ref(false);

let io;

onMounted(() => {
    requestAnimationFrame(() => (mounted.value = true));

    io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add("is-in");
            });
        },
        { threshold: 0.12 },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
});

onUnmounted(() => {
    if (io) io.disconnect();
});

const c = companyContent;

const whatYouGet = [
    {
        icon: "🧱",
        title: "Ready-made kit",
        text: "Door leaf, frame and pre-installation prep — fewer mistakes and less rework on site.",
    },
    {
        icon: "⏱️",
        title: "Saving time",
        text: "Installation goes faster, without extra fitting or delays on site.",
    },
    {
        icon: "🛠️",
        title: "Stable quality",
        text: "Factory preparation and production control deliver a predictable result.",
    },
    {
        icon: "📦",
        title: "Deliveries matched to your schedule",
        text: "We coordinate batches, timelines and configuration to match your construction phase.",
    },
];

const pipeline = [
    {
        n: "01",
        t: "Request",
        d: "You send us the volume, timelines and requirements for your facility.",
    },
    {
        n: "02",
        t: "Selection",
        d: "We prepare the specification, models and configuration.",
    },
    {
        n: "03",
        t: "Production",
        d: "We start manufacturing and control quality.",
    },
    {
        n: "04",
        t: "Delivery",
        d: "We organize shipment and support throughout the project.",
    },
];
const openLeadModal = () => {
  if (window.openCallback) {
    window.openCallback();
  } else {
    console.log("window.openCallback не найден");
  }
};

const goLead = () => {
    document
        .querySelector("#lead-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
};
</script>

<template>
    <div class="builders" :class="{ 'is-mounted': mounted }">
        <section class="hero">
            <div class="container">
                <div class="heroGrid">
                    <div class="heroLeft" data-reveal>
                        <div class="kicker">{{ $t("For builders") }}</div>

                        <h1 class="heroTitle">
                            {{
                                $t(c.builders.heroTitle) ||
                                "Решения для строителей и подрядчиков"
                            }}
                        </h1>

                        <p class="heroText">
                            {{
                                $t(c.builders.heroText) ||
                                "Поставляем двери для объектов, частного строительства и комплектации проектов. Помогаем по срокам, объёмам и подбору решений под задачу."
                            }}
                        </p>

                        <div class="heroActions">
                            <button
                                class="btn btn--primary"
                                type="button"
                                @click="openLeadModal"
                            >
                                {{ $t("Request conditions") }}
                            </button>
                            <a
                                class="btn btn--ghost"
                                href="tel:+998901301010"
                                >{{ $t("To call") }}</a
                            >
                        </div>

                        <div class="heroChips">
                            <span class="chip">{{
                                $t("Wholesale volumes")
                            }}</span>
                            <span class="chip">{{
                                $t("Deadlines for the schedule")
                            }}</span>
                            <span class="chip">{{ $t("Object support") }}</span>
                        </div>
                    </div>

                    <div class="heroRight card" data-reveal>
                        <div class="stats">
                            <div class="stat">
                                <div class="stat__num">
                                    {{ $t("Wholesale") }}
                                </div>
                                <div class="stat__text">
                                    {{ $t("conditions for objects") }}
                                </div>
                            </div>
                            <div class="stat">
                                <div class="stat__num">{{ $t("GOST") }}</div>
                                <div class="stat__text">
                                    {{ $t("quality standards") }}
                                </div>
                            </div>
                            <div class="stat">
                                <div class="stat__num">
                                    {{ $t("Deadlines") }}
                                </div>
                                <div class="stat__text">
                                    {{ $t("deliveries under stages") }}
                                </div>
                            </div>
                            <div class="stat">
                                <div class="stat__num">
                                    {{ $t("Selection") }}
                                </div>
                                <div class="stat__text">
                                    {{ $t("according to the specification") }}
                                </div>
                            </div>
                        </div>

                        <div class="note">
                            <div class="note__title">{{ $t("For whom") }}</div>
                            <div class="note__text">
                                {{
                                    $t(
                                        "Builders, contractors, fitters, repair crews, and companies that maintain turnkey facilities.",
                                    )
                                }}
                            </div>
                        </div>

                        <div class="note">
                            <div class="note__title">
                                {{ $t("The format of the work") }}
                            </div>
                            <div class="note__text">
                                {{
                                    $t(
                                        "Consultation, selection, coordination of batches, production and delivery.",
                                    )
                                }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="kpis" data-reveal>
                    <div class="kpi">
                        <div class="kpi__num">×7</div>
                        <div class="kpi__text">
                            {{ $t("faster installation") }}
                        </div>
                    </div>
                    <div class="kpi">
                        <div class="kpi__num">{{ $t("GOST") }}</div>
                        <div class="kpi__text">{{ $t("Quality control") }}</div>
                    </div>
                    <div class="kpi">
                        <div class="kpi__num">{{ $t("Wholesale") }}</div>
                        <div class="kpi__text">
                            {{ $t("conditions for projects") }}
                        </div>
                    </div>
                    <div class="kpi">
                        <div class="kpi__num">{{ $t("Deadlines") }}</div>
                        <div class="kpi__text">
                            {{ $t("delivery on schedule") }}
                        </div>
                    </div>
                </div>

                <div class="grid" data-reveal>
                    <article
                        class="card"
                        v-for="(p, i) in c.builders.perks"
                        :key="i"
                    >
                        <div class="card__top">
                            <div class="icon">⚡</div>
                            <h3 class="card__title">{{ $t(p.title) }}</h3>
                        </div>
                        <p class="muted">{{ $t(p.text) }}</p>
                    </article>
                </div>
            </div>
        </section>

        <section class="section section--tint">
            <div class="container">
                <div class="head" data-reveal>
                    <h2 class="h2">
                        {{ $t("What do you get at the facility") }}
                    </h2>
                    <p class="sub">
                        {{
                            $t(
                                "There are fewer delays, fewer improvements, and a more predictable result for each batch.",
                            )
                        }}
                    </p>
                </div>

                <div class="perksGrid" data-reveal>
                    <article
                        class="perk card"
                        v-for="(x, idx) in whatYouGet"
                        :key="idx"
                    >
                        <div class="perk__top">
                            <div class="perk__icon">{{ $t(x.icon) }}</div>
                            <div class="perk__title">{{ $t(x.title) }}</div>
                        </div>
                        <div class="perk__text">{{ $t(x.text) }}</div>
                    </article>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="stepsWrap" data-reveal>
                    <div class="head">
                        <h2 class="h2">
                            {{ $t("How the work is structured") }}
                        </h2>
                        <p class="sub">
                            {{
                                $t(
                                    "A simple and intuitive process so that you dont lose your pace on the site.",
                                )
                            }}
                        </p>
                    </div>

                    <div class="stepsGrid">
                        <article
                            class="step card"
                            v-for="(s, idx) in pipeline"
                            :key="idx"
                        >
                            <div class="step__num">{{ $t(s.n) }}</div>
                            <div class="step__title">{{ $t(s.t) }}</div>
                            <div class="step__text">{{ $t(s.d) }}</div>
                        </article>
                    </div>

                    <div class="cta">
                        <div>
                            <div class="cta__title">
                                {{ $t("Do you need doors to the facility?") }}
                            </div>
                            <div class="cta__text">
                                {{
                                    $t(
                                        "Leave a request and we will prepare the conditions for the volume, timing and configuration.",
                                    )
                                }}
                            </div>
                        </div>

                        <button
                            class="btn btn--primary"
                            type="button"
                            @click="openLeadModal"
                            
                        >
                            {{ $t("Submit your application") }}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.builders {
    min-height: 100vh;
    background: #ffffff;
    color: #111827;
}

.container {
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto;
}

.hero {
    padding: 56px 0 28px;
}

.heroGrid {
    display: grid;
    grid-template-columns: 1.08fr 0.92fr;
    gap: 20px;
    align-items: start;
}

.kicker {
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #9a5a24;
    background: #fff7f1;
    border: 1px solid #f7d9bf;
}

.heroTitle {
    margin-top: 14px;
    font-size: clamp(30px, 4vw, 52px);
    line-height: 1.05;
    font-weight: 900;
    color: #111827;
}

.heroText {
    margin-top: 14px;
    max-width: 68ch;
    color: #6b7280;
    line-height: 1.8;
    font-size: 15px;
}

.heroActions {
    margin-top: 18px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.heroChips {
    margin-top: 16px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.chip {
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 800;
    color: #9a5a24;
    background: #fff7f1;
    border: 1px solid #f7d9bf;
}

.section {
    padding: 28px 0 80px;
}

.section--tint {
    background: #f8f8f8;
    border-top: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
}

.card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 22px;
    box-shadow: 0 10px 30px rgba(17, 24, 39, 0.05);
}

.heroRight {
    padding: 20px;
}

.stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}

.stat {
    padding: 16px;
    border-radius: 18px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
}

.stat__num {
    font-size: 22px;
    font-weight: 900;
    color: #f08a3c;
}

.stat__text {
    margin-top: 6px;
    color: #6b7280;
    font-size: 13px;
    line-height: 1.5;
}

.note {
    margin-top: 12px;
    padding: 14px;
    border-radius: 18px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
}

.note__title {
    font-weight: 800;
    color: #111827;
}

.note__text {
    margin-top: 6px;
    color: #6b7280;
    line-height: 1.7;
    font-size: 14px;
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
    border: 1px solid transparent;
    transition: 0.2s ease;
    cursor: pointer;
}

.btn--primary {
    color: #ffffff;
    background: #111827;
    border-color: #111827;
}

.btn--primary:hover {
    background: #000000;
    transform: translateY(-1px);
}

.btn--ghost {
    color: #111827;
    background: #ffffff;
    border-color: #d1d5db;
}

.btn--ghost:hover {
    background: #f9fafb;
    transform: translateY(-1px);
}

.kpis {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 16px;
}

.kpi {
    padding: 18px;
    border-radius: 18px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
}

.kpi__num {
    color: #f08a3c;
    font-size: clamp(18px, 2vw, 24px);
    font-weight: 900;
}

.kpi__text {
    margin-top: 6px;
    color: #6b7280;
    font-size: 13px;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.grid .card {
    padding: 20px;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.grid .card:hover,
.perk:hover,
.step:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(17, 24, 39, 0.08);
}

.card__top,
.perk__top {
    display: flex;
    align-items: center;
    gap: 10px;
}

.icon,
.perk__icon {
    width: 42px;
    height: 42px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: #fff7f1;
    border: 1px solid #f7d9bf;
}

.card__title,
.perk__title,
.step__title {
    font-size: 18px;
    font-weight: 900;
    color: #111827;
}

.muted,
.perk__text,
.step__text,
.sub,
.cta__text {
    color: #6b7280;
    line-height: 1.75;
    font-size: 14px;
}

.muted,
.perk__text {
    margin-top: 10px;
}

.head {
    max-width: 74ch;
    margin-bottom: 18px;
}

.h2 {
    font-size: clamp(24px, 3vw, 38px);
    font-weight: 900;
    line-height: 1.12;
    color: #111827;
}

.perksGrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.perk {
    padding: 20px;
}

.stepsWrap {
    padding: 24px;
    border-radius: 22px;
    background: #f8f8f8;
    border: 1px solid #e5e7eb;
}

.stepsGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
}

.step {
    padding: 18px;
}

.step__num {
    color: #f08a3c;
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 0.05em;
}

.step__title {
    margin-top: 8px;
}

.step__text {
    margin-top: 6px;
}

.cta {
    margin-top: 16px;
    padding: 18px;
    border-radius: 20px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
}

.cta__title {
    font-size: 18px;
    font-weight: 900;
    color: #111827;
}

[data-reveal] {
    opacity: 0;
    transform: translateY(14px);
    transition:
        opacity 0.6s ease,
        transform 0.6s ease;
}

.is-mounted [data-reveal].is-in {
    opacity: 1;
    transform: translateY(0);
}

@media (max-width: 980px) {
    .heroGrid,
    .grid,
    .perksGrid,
    .stepsGrid {
        grid-template-columns: 1fr;
    }

    .kpis {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .container {
        width: calc(100% - 28px);
    }

    .hero {
        padding: 40px 0 24px;
    }

    .section {
        padding: 24px 0 64px;
    }

    .stepsWrap {
        padding: 18px;
    }
}

@media (max-width: 420px) {
    .container {
        width: calc(100% - 20px);
    }

    .kpis,
    .stats {
        grid-template-columns: 1fr;
    }
}
</style>
