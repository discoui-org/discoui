import { defineConfig } from 'vite';
import path from 'path';

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
  plugins: [cssInlinePlugin()],
  server: {
    port: 5173,
    strictPort: true
  },
  resolve: {
    alias: {
      '@discoui-org/core/dist/discoui.css': path.resolve(__dirname, '../../packages/core/dist/discoui.css'),
      '@discoui-org/core': path.resolve(__dirname, '../../packages/core/src/index.js')
    }
  }
});
