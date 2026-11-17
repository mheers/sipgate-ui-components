import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  publicDir: fileURLToPath(new URL('../../public', import.meta.url)),
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      // Consume the library exactly like a consumer would, but from source so
      // the example always shows the current components.
      '@mheers/sipgate-ui-components': fileURLToPath(
        new URL('../../src/index.ts', import.meta.url),
      ),
      '@': fileURLToPath(new URL('../../src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
});
