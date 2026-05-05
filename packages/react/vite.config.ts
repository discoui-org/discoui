import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({ 
      insertTypesEntry: true,
      include: ['src']
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DiscoUIReact',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@discoui/core', '@lit/react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@discoui/core': 'DiscoCore',
          '@lit/react': 'LitReact',
        },
      },
    },
  },
});
