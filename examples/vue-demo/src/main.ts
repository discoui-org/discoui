import { createApp } from 'vue';
import App from './App.vue';
import { DiscoPlugin } from '@discoui/vue';

// Import core to register custom elements
import '@discoui/core';

const app = createApp(App);

app.use(DiscoPlugin, {
  config: {
    theme: 'dark',
    accent: '#FA6800' // Orange
  }
});

app.mount('#app');
