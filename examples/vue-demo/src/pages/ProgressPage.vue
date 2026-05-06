<template>
  <disco-single-page id="componentsProgress" app-title="DISCO VUE" header="progress-bar">
    <div class="page-content">
      <div class="section">
        <div class="section-header">progress bar</div>
        <div class="control-stack">
          <disco-progress-bar id="progressDeterminate" :value="progressValue" max="100"></disco-progress-bar>
          <div class="button-row">
            <disco-button @click="incrementProgress">Advance</disco-button>
            <disco-button @click="toggleIndeterminate">Toggle Indeterminate</disco-button>
          </div>
          <disco-progress-bar v-if="isIndeterminate" indeterminate></disco-progress-bar>
        </div>
      </div>
    </div>
  </disco-single-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const progressValue = ref(25);
const isIndeterminate = ref(false);

const incrementProgress = () => {
  progressValue.value = Math.min(100, progressValue.value + 10);
};

const toggleIndeterminate = () => {
  isIndeterminate.value = !isIndeterminate.value;
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
  align-items: flex-start;
}

.button-row {
  display: flex;
  gap: 12px;
}
</style>
