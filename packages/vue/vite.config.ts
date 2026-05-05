import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DiscoUIVue',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['vue', '@discoui/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@discoui/core': 'DiscoCore',
        },
      },
    },
  },
});
