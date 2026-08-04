<script setup>
import CarouselMain from "@/components/views/home/CarouselMain.vue";
import NewProducts from "@/components/views/home/NewProducts.vue";
import AllProducts from "@/components/views/home/AllProducts.vue";

const openLeadModal = () => {
  if (window.openCallback) {
    window.openCallback();
  } else {
    console.log("window.openCallback не найден");
  }
};
</script>

<template>
  <div class="home">
    <CarouselMain />

    <div class="container">
      <div class="badges">
        <div class="badge">{{ $t("Premium doors") }}</div>
        <div class="badge">{{ $t("GOST / ISO") }}</div>
        <div class="badge">{{ $t("Up to 10 years warranty") }}</div>
        <div class="badge">{{ $t("Under the size") }}</div>
      </div>

      <section class="section">
        <div class="sectionHead">
          <h2>{{ $t("New models") }}</h2>
          <p>{{ $t("Fresh solutions for a modern interior") }}</p>
        </div>

        <NewProducts />
      </section>

      <!-- ALL PRODUCTS -->
      <section class="section">
        <div class="sectionHead">
          <h2>{{ $t("Catalog") }}</h2>
          <p>{{ $t("Choose the perfect door for your project.") }}</p>
        </div>

        <AllProducts />
      </section>

      <!-- CTA -->
      <section class="cta">
        <div class="cta__content">
          <h2>{{ $t("Do you need help choosing?") }}</h2>
          <p>
            {{
              $t(
                "Leave a request and we will select the doors for your interior and budget."
              )
            }}
          </p>
        </div>

        <button class="btn" type="button" @click="openLeadModal">
          {{ $t("Submit your application") }}
        </button>
      </section>

      <!-- FORM -->
      <!-- <section class="section" id="lead-form">
        <div class="sectionHead">
          <h2>Оставить заявку</h2>
          <p>Мы свяжемся с вами и предложим лучшие варианты</p>
        </div>

      </section> -->
    </div>
  </div>
</template>

<style scoped>
.home {
  background: #ffffff;
  min-height: 100vh;
}

/* container */
.container {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

/* badges */
.badges {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.badge {
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: #fff7f1;
  border: 1px solid #f7d9bf;
  color: #9a5a24;
}

/* section */
.section {
  margin-top: 60px;
}

.sectionHead {
  margin-bottom: 20px;
}

.sectionHead h2 {
  font-size: 32px;
  font-weight: 800;
}

.sectionHead p {
  margin-top: 6px;
  color: #6b7280;
}

/* CTA */
.cta {
  margin-top: 80px;
  padding: 40px;
  border-radius: 20px;
  background: #111827;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.cta h2 {
  font-size: 26px;
}

.cta p {
  margin-top: 6px;
  color: #9ca3af;
}

.btn {
  padding: 14px 22px;
  background: #fff;
  color: #111827;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
}

/* mobile */
@media (max-width: 768px) {
  .container {
    width: calc(100% - 24px);
  }

  .cta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
