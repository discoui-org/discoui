import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  server: {
    fs: {
      // Allow serving files from the entire monorepo (for core dist access)
      allow: ['..']
    }
  },
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        demo: resolve(__dirname, 'demo.html'),
      }
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: '../assets/*',
          dest: 'assets'
        },
        {
          src: '../docs/*',
          dest: 'docs'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@discoui/core': resolve(__dirname, '../packages/core'),
      '/assets': resolve(__dirname, '../assets'),
      '/docs': resolve(__dirname, '../docs')
    }
  }
})
