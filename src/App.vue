<template>
  <div class="layout">
    <Header />
    <main class="main">
      <RouterView />
    </main>
    <Footer />
  <CallbackWidget ref="callbackRef" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from "@/components/partials/Header.vue";
import Footer from "@/components/partials/Footer.vue";
import CallbackWidget from "@/components/partials/CallbackWidget.vue";

const callbackRef = ref(null);

onMounted(() => {
  console.log("APP REF =", callbackRef.value);

  window.openCallback = () => {
    console.log("WINDOW CLICK");
    console.log(callbackRef.value);

    callbackRef.value?.openModal();
  };
});
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
}
</style>