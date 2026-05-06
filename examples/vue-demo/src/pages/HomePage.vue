<template>
  <disco-pivot-page id="homePage" app-title="DISCO VUE">
    <disco-pivot-item header="components">
      <disco-list-view id="componentsList" :items="listItems" selection-mode="none" item-click-enabled @itemselect="handleSelect">
        <template disco-list-template>
          <div class="item-title" data-bind="Title"></div>
          <div class="item-description" data-bind="Description"></div>
        </template>
      </disco-list-view>
    </disco-pivot-item>
    
    <disco-pivot-item id="componentsHomeEasings" header="easings">
      <div class="easing-scroll">
        <div class="easing-stack">
          <div v-for="group in easingGroups" :key="group.name" class="easing-card">
            <div class="easing-label">{{ group.name }}</div>
            <div class="easing-row">
              <div v-for="ease in group.items" :key="ease" class="easing-preview">
                <div class="easing-dot" :style="{ '--ease-preview': `var(--ease-${ease})` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </disco-pivot-item>
  </disco-pivot-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const listItems = ref([
  { id: 'buttons', Title: 'Buttons', Description: 'Standard and toggle buttons' },
  { id: 'progress', Title: 'Progress', Description: 'Bars and rings' },
  { id: 'inputs', Title: 'Inputs', Description: 'Text boxes and sliders' }
]);

const easingGroups = [
  { name: 'sine', items: ['in-sine', 'out-sine', 'in-out-sine'] },
  { name: 'cubic', items: ['in-cubic', 'out-cubic', 'in-out-cubic'] },
  { name: 'expo', items: ['in-expo', 'out-expo', 'in-out-expo'] }
];

const handleSelect = (event: any) => {
  console.log('Selected:', event.detail?.data?.id);
};
</script>

<style scoped>
.easing-scroll {
  height: calc(100vh - 140px);
  width: 100%;
}

.easing-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 0 20px;
}

.easing-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.easing-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.easing-label {
  font-size: 20px;
  opacity: 0.75;
  text-transform: lowercase;
  color: white;
}

.easing-preview {
  height: 30px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--disco-border-color, rgba(255, 255, 255, 0.22));
}

.easing-dot {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 5px;
  left: 5px;
  background: var(--disco-accent, #d80073);
  animation: easing-shift 1.25s var(--ease-preview) infinite, easing-opacity 1.25s ease-in-out infinite;
}

@keyframes easing-shift {
  0%, 10% { left: 5px; }
  75%, 100% { left: calc(100% - 25px); }
}

@keyframes easing-opacity {
  0% { opacity: 0; }
  10%, 90% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
