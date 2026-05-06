<template>
  <disco-single-page id="componentsButton" app-title="DISCO VUE" header="button">
    <div class="page-content">
      <div class="section">
        <div class="section-header">standard buttons</div>
        <div class="button-row">
          <disco-button>default</disco-button>
          <disco-button disabled>disabled</disco-button>
        </div>
      </div>
      
      <div class="section">
        <div class="section-header">navigation</div>
        <disco-button @click="goHome">back to home</disco-button>
      </div>
    </div>
  </disco-single-page>
</template>

<script setup lang="ts">
const goHome = () => {
  const frame = document.getElementById('componentsFrame') as any;
  if (frame) {
    const home = document.getElementById('homePage');
    if (home) frame.navigate(home);
  }
};
</script>

<style scoped>
.page-content {
  padding: 0 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-header {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.6;
  letter-spacing: 0.05em;
  color: white;
}

.button-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
