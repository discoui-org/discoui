import { IntrinsicElementAttributes } from 'vue';

declare module 'vue' {
  export interface GlobalComponents {
    'disco-frame': IntrinsicElementAttributes['div'];
    'disco-page': IntrinsicElementAttributes['div'];
    'disco-pivot-page': IntrinsicElementAttributes['div'];
    'disco-pivot-item': IntrinsicElementAttributes['div'];
    'disco-hub-page': IntrinsicElementAttributes['div'];
    'disco-hub-section': IntrinsicElementAttributes['div'];
    'disco-single-page': IntrinsicElementAttributes['div'];
    'disco-button': IntrinsicElementAttributes['button'];
    'disco-toggle-button': IntrinsicElementAttributes['button'];
    'disco-checkbox': IntrinsicElementAttributes['input'];
    'disco-slider': IntrinsicElementAttributes['input'];
    'disco-toggle-switch': IntrinsicElementAttributes['input'];
    'disco-text-box': IntrinsicElementAttributes['input'];
    'disco-password-box': IntrinsicElementAttributes['input'];
    'disco-radio-button': IntrinsicElementAttributes['input'];
    'disco-combo-box': IntrinsicElementAttributes['select'];
    'disco-progress-bar': IntrinsicElementAttributes['div'];
    'disco-progress-ring': IntrinsicElementAttributes['div'];
    'disco-image': IntrinsicElementAttributes['img'];
    'disco-list-view': IntrinsicElementAttributes['div'];
    'disco-list-item': IntrinsicElementAttributes['div'];
    'disco-splash': IntrinsicElementAttributes['div'];
  }
}

export {};
