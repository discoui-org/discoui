import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DiscoUIVue',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', '@discoui-org/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@discoui-org/core': 'DiscoUI'
        }
      }
    }
  }
});
