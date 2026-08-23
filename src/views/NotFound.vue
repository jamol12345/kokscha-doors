<template>
  <main class="not-found">
    <div class="container">
      <p class="code">404</p>
      <h1>Sahifa topilmadi</h1>
      <p>So'ralgan sahifa mavjud emas yoki uning manzili o'zgargan.</p>
      <RouterLink :to="{ name: 'index' }">Bosh sahifaga qaytish</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.not-found {
  min-height: 55vh;
  display: grid;
  place-items: center;
  padding: 80px 20px;
  text-align: center;
}

.container {
  max-width: 680px;
}

.code {
  margin: 0 0 8px;
  color: #8a7b3a;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.14em;
}

h1 {
  margin: 0 0 16px;
  font-size: clamp(34px, 6vw, 58px);
}

.container > p:not(.code) {
  margin-bottom: 28px;
  color: #6b7280;
  line-height: 1.7;
}

a {
  display: inline-flex;
  padding: 12px 20px;
  border-radius: 10px;
  background: #111827;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
}
</style>
