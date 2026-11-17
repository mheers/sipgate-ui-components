import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

const external = [
  'vue',
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
  /^reka-ui(\/.*)?$/,
  /^lucide-vue-next(\/.*)?$/,
];

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // The demo voicemail in /public belongs to Storybook, not the npm package.
  publicDir: false,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: fileURLToPath(new URL('./src/entry.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'style',
    },
    rollupOptions: {
      external,
    },
  },
});
