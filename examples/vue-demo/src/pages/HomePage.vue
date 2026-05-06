<template>
  <disco-pivot-page id="homePage" app-title="DISCO VUE">
    <!-- Components Tab -->
    <disco-pivot-item header="components">
      <disco-list-view
        id="componentsList"
        selection-mode="none"
        item-click-enabled
      >
        <disco-list-item
          v-for="item in listItems"
          :key="item.id"
          @click="handleItemClick(item)"
        >
          <div class="item-title">{{ item.Title }}</div>
          <div class="item-description">{{ item.Description }}</div>
        </disco-list-item>
      </disco-list-view>
    </disco-pivot-item>

    <!-- Easings Tab -->
    <disco-pivot-item id="componentsHomeEasings" header="easings">
      <div class="easing-scroll">
        <div class="easing-stack">
          <div v-for="group in easingGroups" :key="group.name" class="easing-row">
            <div v-for="ease in group.items" :key="ease" class="easing-card" :style="{ '--ease-preview': `var(--disco-ease-${ease})` }">
              <div class="easing-label">{{ ease.replace(/-/g, ' / ') }}</div>
              <div class="easing-preview">
                <div class="easing-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </disco-pivot-item>

    <!-- Colors Tab -->
    <disco-pivot-item id="componentsHomeColors" header="colors">
      <div class="color-scroll">
        <div class="color-stack">
          <div v-for="color in systemColors" :key="color.name" class="color-row">
            <div class="color-swatch" :style="{ background: color.hex }"></div>
            <div class="color-name">{{ color.name }}</div>
            <div class="color-hex">{{ color.hex }}</div>
          </div>
        </div>
      </div>
    </disco-pivot-item>
  </disco-pivot-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const listItems = ref([
  { id: 'toggle-theme', Title: 'Toggle Theme', Description: 'Switch between light and dark' },
  { id: 'button', Title: 'Button', Description: 'Standard push button' },
  { id: 'checkbox', Title: 'Checkbox', Description: 'Binary selection control' },
  { id: 'combobox', Title: 'Combo Box', Description: 'Dropdown selection' },
  { id: 'dialog', Title: 'Dialog', Description: 'Modal content shell' },
  { id: 'image', Title: 'Image', Description: 'Image viewer with fit modes' },
  { id: 'progress', Title: 'Progress Bar', Description: 'Linear progress indicator' },
  { id: 'progressring', Title: 'Progress Ring', Description: 'Circular progress indicator' },
  { id: 'radiobutton', Title: 'Radio Button', Description: 'Exclusive selection control' },
  { id: 'slider', Title: 'Slider', Description: 'Range selection control' },
  { id: 'textbox', Title: 'Text Box', Description: 'Single-line text input' },
  { id: 'togglebutton', Title: 'Toggle Button', Description: 'Sticky push button' },
  { id: 'toggleswitch', Title: 'Toggle Switch', Description: 'On/Off switch control' }
].sort((a, b) => a.Title.localeCompare(b.Title)));

const easingGroups = [
  { name: 'basic', items: ['in', 'out', 'in-out'] },
  { name: 'quad', items: ['in-quad', 'out-quad', 'in-out-quad'] },
  { name: 'cubic', items: ['in-cubic', 'out-cubic', 'in-out-cubic'] },
  { name: 'quart', items: ['in-quart', 'out-quart', 'in-out-quart'] },
  { name: 'expo', items: ['in-expo', 'out-expo', 'in-out-expo'] },
  { name: 'back', items: ['in-back', 'out-back', 'in-out-back'] }
];

const systemColors = [
  { name: 'lime', hex: '#A4C400' },
  { name: 'green', hex: '#60A917' },
  { name: 'emerald', hex: '#008A00' },
  { name: 'teal', hex: '#00ABA9' },
  { name: 'cyan', hex: '#1BA1E2' },
  { name: 'cobalt', hex: '#3E65FF' },
  { name: 'indigo', hex: '#6A00FF' },
  { name: 'violet', hex: '#AA00FF' },
  { name: 'pink', hex: '#F472D0' },
  { name: 'magenta', hex: '#D80073' },
  { name: 'crimson', hex: '#A20025' },
  { name: 'red', hex: '#E51400' },
  { name: 'orange', hex: '#FA6800' },
  { name: 'amber', hex: '#F0A30A' },
  { name: 'yellow', hex: '#E3C800' },
  { name: 'brown', hex: '#825A2C' },
  { name: 'olive', hex: '#6D8764' },
  { name: 'steel', hex: '#647687' },
  { name: 'mauve', hex: '#76608A' },
  { name: 'taupe', hex: '#87794E' }
];

const handleItemClick = (item: any) => {
  console.log('Selected:', item.id);
};
</script>

<style scoped>
.easing-scroll, .color-scroll {
  height: calc(100vh - 140px);
  width: 100%;
  overflow-y: auto;
}

.easing-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 16px 40px;
}

.easing-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.easing-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.easing-label {
  font-size: 14px;
  opacity: 0.75;
  text-transform: lowercase;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.easing-preview {
  height: 30px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.22);
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

.color-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 16px 40px;
}

.color-row {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  min-height: 36px;
}

.color-swatch {
  width: 20px;
  height: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.color-name {
  font-size: 20px;
  text-transform: lowercase;
  color: white;
}

.color-hex {
  font-size: 18px;
  opacity: 0.8;
  color: white;
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
