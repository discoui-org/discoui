import type { App } from 'vue';
import DiscoFrame from './components/DiscoFrame.vue';

export { DiscoFrame };

export const DiscoPlugin = {
  install(app: App) {
    app.component('DiscoFrame', DiscoFrame);
  }
};

export default DiscoPlugin;
