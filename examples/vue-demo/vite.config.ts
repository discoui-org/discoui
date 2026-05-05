import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Tell Vue that all tags starting with 'disco-' are custom elements
          isCustomElement: (tag) => tag.startsWith('disco-')
        }
      }
    })
  ],
});
