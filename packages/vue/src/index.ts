import type { App } from 'vue';
import DiscoButton from './components/DiscoButton.vue';
import DiscoFrame from './components/DiscoFrame.vue';
import DiscoSlider from './components/DiscoSlider.vue';
import DiscoToggleSwitch from './components/DiscoToggleSwitch.vue';
import DiscoTextBox from './components/DiscoTextBox.vue';

export const DiscoPlugin = {
  install(app: App) {
    app.component('DiscoButton', DiscoButton);
    app.component('DiscoFrame', DiscoFrame);
    app.component('DiscoSlider', DiscoSlider);
    app.component('DiscoToggleSwitch', DiscoToggleSwitch);
    app.component('DiscoTextBox', DiscoTextBox);
  }
};

export * from './composables/useDiscoFrame';
export * from './composables/useDiscoTheme';
export { DiscoButton, DiscoFrame, DiscoSlider, DiscoToggleSwitch, DiscoTextBox };

