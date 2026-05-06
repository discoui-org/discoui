<template>
  <DiscoFrame initial-page="homePage">
    <HomePage />
  </DiscoFrame>
</template>

<script setup lang="ts">
import HomePage from './pages/HomePage.vue';
</script>

<style scoped>
.vue-container {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: white;
}
</style>
