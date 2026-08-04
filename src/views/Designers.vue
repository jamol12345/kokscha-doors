<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { companyContent } from "@/components/content/companyContent";

const mounted = ref(false);
let io;

onMounted(() => {
    requestAnimationFrame(() => (mounted.value = true));

    io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add("is-in");
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

const perks = [
    {
        title: "Catalogs and materials",
        text: "Catalogs of finishes, textures and samples for convenient client work and project presentation.",
        icon: "📦",
    },
    {
        title: "Matching the style",
        text: "We select doors to match the interior: classic, minimalist, modern and complex custom solutions.",
        icon: "🎨",
    },
    {
        title: "Decor in a unified style",
        text: "Casings, cornices, panels and other elements so the interior looks cohesive and neat.",
        icon: "🧩",
    },
    {
        title: "Custom sizes",
        text: "We manufacture doors for your project factoring in dimensions, preferences and room features.",
        icon: "📐",
    },
];

const steps = [
    {
        n: "01",
        t: "Request",
        d: "You send your project, references or a description of the task.",
    },
    {
        n: "02",
        t: "Selection",
        d: "We offer models, finishes, decor and suitable solutions.",
    },
    {
        n: "03",
        t: "Approval",
        d: "We clarify details, dimensions, configuration and final materials.",
    },
    {
        n: "04",
        t: "Delivery",
        d: "We organize delivery and support the project through to completion.",
    },
];

const heroList = [
    "Matching the style",
    "Catalogs and samples",
    "Decor in a unified style",
    "Custom sizes",
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
    <div class="designers" :class="{ 'is-mounted': mounted }">
        <section class="hero">
            <div class="container">
                <div class="heroGrid">
                    <div class="heroLeft" data-reveal>
                        <div class="kicker">{{ $t("For designers") }}</div>

                        <h1 class="heroTitle">
                            {{ $t(c.designers.heroTitle) }}
                        </h1>

                        <p class="heroText">
                            {{ $t(c.designers.heroText) }}
                        </p>

                        <div class="heroActions">
                            <button
                                class="btn btn--primary"
                                type="button"
                                @click="openLeadModal"
                            >
                                {{ $t("Get materials") }}
                            </button>

                            <a class="btn btn--ghost" href="tel:+998901301010">
                                {{ $t("To call") }}
                            </a>
                        </div>

                        <div class="heroChips">
                            <span class="chip">{{ $t("Catalogs") }}</span>
                            <span class="chip">{{
                                $t("Matching the style")
                            }}</span>
                            <span class="chip">{{ $t("Decor") }}</span>
                        </div>
                    </div>

                    <div class="heroRight card" data-reveal>
                        <div class="heroRight__top">
                            <div class="heroRight__eyebrow">
                                {{ $t("For designers") }}
                            </div>
                            <h2 class="heroRight__title">
                                {{ $t("What will you get") }}
                            </h2>
                        </div>

                        <ul class="heroRight__list">
                            <li v-for="(item, index) in heroList" :key="index">
                                {{ $t(item) }}
                            </li>
                        </ul>

                        <div class="heroRight__stats">
                            <div class="miniStat">
                                <div class="miniStat__num">
                                    {{ $t("Catalogs") }}
                                </div>
                                <div class="miniStat__text">
                                    {{ $t("materials and samples") }}
                                </div>
                            </div>

                            <div class="miniStat">
                                <div class="miniStat__num">
                                    {{ $t("Style") }}
                                </div>
                                <div class="miniStat__text">
                                    {{ $t("interior solutions") }}
                                </div>
                            </div>
                        </div>

                        <div class="heroRight__footer">
                            {{
                                $t(
                                    "We work with designers, architects and private projects.",
                                )
                            }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section section--cards">
            <div class="container">
                <div class="cardsHead" data-reveal>
                    <h2 class="sectionTitle">
                        {{ $t("Why is it convenient to work with us") }}
                    </h2>
                    <p class="sectionText">
                        {{
                            $t(
                                "Not just doors, but clear work with the project, materials and the client.",
                            )
                        }}
                    </p>
                </div>

                <div class="grid" data-reveal>
                    <article
                        class="card featureCard"
                        v-for="(b, i) in c.designers.blocks"
                        :key="i"
                    >
                        <div class="featureCard__icon">✨</div>
                        <h3 class="featureCard__title">{{ $t(b.title) }}</h3>
                        <p class="featureCard__text">{{ $t(b.text) }}</p>
                    </article>
                </div>
            </div>
        </section>

        <section class="section section--tint">
            <div class="container">
                <div class="head" data-reveal>
                    <h2 class="sectionTitle">{{ $t("What do you get") }}</h2>
                    <p class="sectionText">
                        {{
                            $t(
                                "Everything that helps to coordinate decisions faster and close the project beautifully.",
                            )
                        }}
                    </p>
                </div>

                <div class="perksGrid" data-reveal>
                    <article
                        class="card perk"
                        v-for="(p, idx) in perks"
                        :key="idx"
                    >
                        <div class="perk__top">
                            <div class="perk__icon">{{ p.icon }}</div>
                            <div class="perk__title">{{ $t(p.title) }}</div>
                        </div>
                        <div class="perk__text">{{ $t(p.text) }}</div>
                    </article>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="stepsWrap" data-reveal>
                    <div class="head head--steps">
                        <div>
                            <h2 class="sectionTitle">
                                {{ $t("How we work") }}
                            </h2>
                            <p class="sectionText">
                                {{
                                    $t(
                                        "A simple process so that you can quickly bring the project to the result.",
                                    )
                                }}
                            </p>
                        </div>
                    </div>

                    <div class="stepsGrid">
                        <article class="step" v-for="(s, i) in steps" :key="i">
                            <div class="step__num">{{ s.n }}</div>
                            <div class="step__title">{{ $t(s.t) }}</div>
                            <div class="step__text">{{ $t(s.d) }}</div>
                        </article>
                    </div>

                    <div class="cta">
                        <div class="cta__content">
                            <div class="cta__title">
                                {{ $t("Do you need catalogs and materials?") }}
                            </div>
                            <div class="cta__text">
                                {{
                                    $t(
                                        "Leave a request and we will send you the materials and help you with the selection for your project.",
                                    )
                                }}
                            </div>
                        </div>

                        <button
                            class="btn btn--primary"
                            type="button"
                            @click="openLeadModal"
                        >
                            {{ $t("Get materials") }}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.designers {
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
    grid-template-columns: minmax(0, 1.1fr) minmax(360px, 0.9fr);
    gap: 24px;
    align-items: stretch;
}

.heroLeft {
    padding: 8px 0;
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
    font-size: clamp(38px, 4.7vw, 72px);
    line-height: 1.02;
    font-weight: 900;
    letter-spacing: -0.03em;
    max-width: 10ch;
}

.heroText {
    margin-top: 18px;
    max-width: 62ch;
    color: #6b7280;
    font-size: 16px;
    line-height: 1.85;
}

.heroActions {
    margin-top: 24px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.heroChips {
    margin-top: 18px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.chip {
    display: inline-flex;
    align-items: center;
    min-height: 36px;
    padding: 0 14px;
    border-radius: 999px;
    background: #fff7f1;
    border: 1px solid #f7d9bf;
    color: #9a5a24;
    font-size: 12px;
    font-weight: 700;
}

.card {
    position: relative;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 24px;
    padding: 22px;
    box-shadow: 0 10px 30px rgba(17, 24, 39, 0.05);
    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease,
        border-color 0.25s ease;
}

.card:hover {
    transform: translateY(-6px);
    box-shadow: 0 22px 50px rgba(17, 24, 39, 0.08);
    border-color: #f2b37e;
}

.heroRight {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
    overflow: hidden;
}

.heroRight::before,
.featureCard::before,
.perk::before {
    content: "";
    display: block;
    width: 42px;
    height: 4px;
    border-radius: 999px;
    background: #f08a3c;
    margin-bottom: 16px;
}

.heroRight__top {
    margin-bottom: 4px;
}

.heroRight__eyebrow {
    color: #9ca3af;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 8px;
}

.heroRight__title {
    font-size: 28px;
    line-height: 1.12;
    font-weight: 900;
    color: #111827;
}

.heroRight__list {
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0;
    list-style: none;
}

.heroRight__list li {
    position: relative;
    padding-left: 18px;
    color: #4b5563;
    line-height: 1.65;
    font-size: 15px;
}

.heroRight__list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 9px;
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #f08a3c;
}

.heroRight__stats {
    margin-top: 22px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.miniStat {
    padding: 16px;
    border-radius: 18px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
}

.miniStat__num {
    color: #111827;
    font-size: 15px;
    font-weight: 900;
}

.miniStat__text {
    margin-top: 6px;
    color: #6b7280;
    font-size: 13px;
    line-height: 1.55;
}

.heroRight__footer {
    margin-top: 18px;
    color: #9ca3af;
    font-size: 13px;
    line-height: 1.6;
}

.section {
    padding: 74px 0;
}

.section--cards {
    padding-top: 42px;
}

.section--tint {
    background: #f8f8f8;
    border-top: 1px solid #eef0f3;
    border-bottom: 1px solid #eef0f3;
}

.head,
.cardsHead {
    max-width: 760px;
    margin-bottom: 20px;
}

.head--steps {
    margin-bottom: 22px;
}

.sectionTitle {
    font-size: clamp(28px, 3vw, 42px);
    line-height: 1.08;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: #111827;
}

.sectionText {
    margin-top: 10px;
    color: #6b7280;
    line-height: 1.8;
    font-size: 16px;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
}

.featureCard {
    min-height: 230px;
}

.featureCard__icon {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: #fff7f1;
    border: 1px solid #f7d9bf;
    margin-bottom: 16px;
    font-size: 20px;
}

.featureCard__title {
    font-size: 20px;
    line-height: 1.2;
    font-weight: 800;
    color: #111827;
}

.featureCard__text {
    margin-top: 10px;
    color: #6b7280;
    font-size: 15px;
    line-height: 1.8;
}

.perksGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
}

.perk {
    min-height: 220px;
}

.perk__top {
    display: flex;
    align-items: center;
    gap: 12px;
}

.perk__icon {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: #fff7f1;
    border: 1px solid #f7d9bf;
    font-size: 20px;
    flex: 0 0 auto;
}

.perk__title {
    font-size: 18px;
    font-weight: 800;
    line-height: 1.25;
}

.perk__text {
    margin-top: 14px;
    color: #6b7280;
    font-size: 15px;
    line-height: 1.8;
}

.stepsWrap {
    padding: 26px;
    border-radius: 28px;
    background: linear-gradient(180deg, #fbfbfc 0%, #f7f7f8 100%);
    border: 1px solid #e8ebef;
}

.stepsGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
}

.step {
    position: relative;
    min-height: 190px;
    padding: 22px 20px;
    border-radius: 22px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease,
        border-color 0.25s ease;
}

.step:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 45px rgba(17, 24, 39, 0.07);
    border-color: #f2b37e;
}

.step::before {
    content: "";
    display: block;
    width: 40px;
    height: 4px;
    border-radius: 999px;
    background: #f08a3c;
    margin-bottom: 16px;
}

.step__num {
    color: #f08a3c;
    font-size: 22px;
    line-height: 1;
    font-weight: 900;
    letter-spacing: 0.04em;
}

.step__title {
    margin-top: 14px;
    font-size: 18px;
    line-height: 1.2;
    font-weight: 800;
    color: #111827;
}

.step__text {
    margin-top: 10px;
    color: #6b7280;
    font-size: 15px;
    line-height: 1.75;
}

.cta {
    margin-top: 22px;
    padding: 22px 24px;
    border-radius: 22px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    flex-wrap: wrap;
}

.cta__content {
    max-width: 720px;
}

.cta__title {
    font-size: 22px;
    line-height: 1.2;
    font-weight: 900;
    color: #111827;
}

.cta__text {
    margin-top: 8px;
    color: #6b7280;
    font-size: 15px;
    line-height: 1.75;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 0 20px;
    border-radius: 14px;
    border: 1px solid transparent;
    font-size: 14px;
    font-weight: 800;
    text-decoration: none;
    transition:
        transform 0.2s ease,
        background 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;
    cursor: pointer;
}

.btn:hover {
    transform: translateY(-2px);
}

.btn--primary {
    color: #ffffff;
    background: #111827;
    border-color: #111827;
    box-shadow: 0 10px 24px rgba(17, 24, 39, 0.16);
}

.btn--primary:hover {
    background: #0b1220;
}

.btn--ghost {
    color: #111827;
    background: #ffffff;
    border-color: #d1d5db;
}

.btn--ghost:hover {
    background: #f9fafb;
}

[data-reveal] {
    opacity: 0;
    transform: translateY(16px);
    transition:
        opacity 0.65s ease,
        transform 0.65s ease;
}

.is-mounted [data-reveal].is-in {
    opacity: 1;
    transform: translateY(0);
}

@media (max-width: 1100px) {
    .heroGrid {
        grid-template-columns: 1fr;
    }

    .heroTitle {
        max-width: none;
    }

    .stepsGrid {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 900px) {
    .grid,
    .perksGrid {
        grid-template-columns: 1fr;
    }

    .featureCard,
    .perk {
        min-height: auto;
    }
}

@media (max-width: 768px) {
    .container {
        width: calc(100% - 28px);
    }

    .hero {
        padding: 42px 0 18px;
    }

    .section {
        padding: 58px 0;
    }

    .section--cards {
        padding-top: 28px;
    }

    .heroRight__stats,
    .stepsGrid {
        grid-template-columns: 1fr;
    }

    .stepsWrap {
        padding: 18px;
    }

    .cta {
        padding: 18px;
    }

    .cta__title {
        font-size: 20px;
    }
}

@media (max-width: 420px) {
    .container {
        width: calc(100% - 20px);
    }

    .heroActions {
        flex-direction: column;
        align-items: stretch;
    }

    .btn {
        width: 100%;
    }
}
</style>
