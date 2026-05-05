<script setup lang="ts">
import { ref } from 'vue';
import { useDiscoApp } from '@discoui/vue';

const count = ref(0);
const text = ref('Hello from Vue!');
const disco = useDiscoApp();

const increment = () => {
  count.value++;
};

const reset = () => {
  count.value = 0;
};

const handlePress = (e: any) => {
  console.log('Disco Press Event:', e.detail);
  increment();
};
</script>

<template>
  <disco-frame>
    <disco-pivot-page app-title="DISCO VUE">
      <disco-pivot-item header="INTEGRATION">
        <div class="container">
          <h1>Vue 3 Integration</h1>
          <p>Theme: {{ disco.theme }}</p>
          
          <div class="row">
            <disco-button @disco-press="handlePress">
              Count: {{ count }}
            </disco-button>
            
            <disco-button @disco-press="reset">
              Reset
            </disco-button>
          </div>

          <div class="control-group">
            <p>Progress: {{ count % 100 }}%</p>
            <disco-progress-bar :value="count % 100"></disco-progress-bar>
          </div>

          <div class="control-group">
            <p>Text Box (v-model emulation):</p>
            <disco-text-box 
              :value="text" 
              @input="text = ($event.target as any).value"
            ></disco-text-box>
            <p class="echo">Echo: {{ text }}</p>
          </div>

          <div class="control-group">
            <p>Toggle Switch:</p>
            <disco-toggle-switch @change="console.log('Toggle changed', $event)"></disco-toggle-switch>
          </div>
        </div>
      </disco-pivot-item>

      <disco-pivot-item header="NATIVE">
        <div class="container">
          <h2>Pure Custom Elements</h2>
          <p>Vue supports Web Components out of the box. No wrappers needed!</p>
          <disco-progress-ring indeterminate></disco-progress-ring>
        </div>
      </disco-pivot-item>
    </disco-pivot-page>
  </disco-frame>
</template>

<style scoped>
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.row {
  display: flex;
  gap: 10px;
}
.control-group {
  width: 300px;
}
.echo {
  font-style: italic;
  margin-top: 5px;
  color: var(--disco-color-amber);
}
</style>
