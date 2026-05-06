<template>
  <disco-single-page id="componentsToggleButton" app-title="DISCO VUE" header="toggle-button">
    <div class="page-content">
      <div class="section">
        <div class="section-header">toggle buttons</div>
        <div class="control-stack">
          <disco-toggle-button id="demoToggleButton" @change="handleToggleChange">airplane mode</disco-toggle-button>
          <disco-toggle-button checked>wifi</disco-toggle-button>
          <disco-toggle-button disabled>bluetooth</disco-toggle-button>
          <div class="status-text">State: {{ isToggled ? 'on' : 'off' }}</div>
        </div>
      </div>
    </div>
  </disco-single-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isToggled = ref(false);

const handleToggleChange = (e: any) => {
  isToggled.value = e.target.hasAttribute('checked');
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

.status-text {
  font-size: 20px;
  opacity: 0.8;
  color: white;
  margin-top: 8px;
}
</style>
