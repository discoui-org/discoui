<template>
  <disco-single-page id="componentsSlider" app-title="DISCO VUE" header="slider">
    <div class="page-content">
      <div class="section">
        <div class="section-header">standard slider</div>
        <div class="control-stack">
          <disco-slider 
            id="demoSlider" 
            min="0" 
            max="100" 
            step="5" 
            :value="sliderValue" 
            @input="handleInput"
          ></disco-slider>
          <div class="status-text">Value: {{ sliderValue }}</div>
        </div>
      </div>
    </div>
  </disco-single-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sliderValue = ref(35);

const handleInput = (e: any) => {
  sliderValue.value = Number(e.target.getAttribute('value'));
};
</script>

<style scoped>
.page-content {
  padding: 0 16px 40px;
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
  margin-bottom: 8px;
}

.control-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 320px;
}

.status-text {
  font-size: 20px;
  opacity: 0.8;
  color: white;
}
</style>
