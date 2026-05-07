import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const cssInlinePlugin = () => ({
  name: 'css-inline',
  enforce: 'pre',
  async resolveId(source, importer) {
    if (!importer) return null;
    if ((source.endsWith('.scss') || source.endsWith('.css')) && !source.includes('?inline')) {
      const resolved = await this.resolve(`${source}?inline`, importer, { skipSelf: true });
      return resolved?.id ?? `${source}?inline`;
    }
    return null;
  }
});

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
    cssInlinePlugin(),
    viteStaticCopy({
      targets: [
        {
          src: '../assets/*',
          dest: 'assets'
        },
        {
          src: '../packages/core/dist/*',
          dest: 'discoui'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@discoui/core/dist': resolve(__dirname, '../packages/core/dist'),
      '@discoui/core': resolve(__dirname, '../packages/core/src/index.js')
    }
  }
})
