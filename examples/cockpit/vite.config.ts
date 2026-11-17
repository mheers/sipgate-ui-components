import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

const src = fileURLToPath(new URL('../../src', import.meta.url));
const srcStyle = fileURLToPath(new URL('../../src/styles/index.css', import.meta.url));
const distStyle = fileURLToPath(new URL('../../dist/style.css', import.meta.url));
const distEntry = fileURLToPath(new URL('../../dist/index.js', import.meta.url));
const demoSource = fileURLToPath(new URL('./src/demo.css', import.meta.url));
const demoDist = fileURLToPath(new URL('./src/demo-dist.css', import.meta.url));

export default defineConfig(() => {
  // `example:build:dist` sets this so the example consumes the compiled
  // package, catching missing exports and CSS that only appears in a build.
  const useDist = process.env.SG_USE_DIST === '1';

  return {
    root: fileURLToPath(new URL('.', import.meta.url)),
    publicDir: fileURLToPath(new URL('../../public', import.meta.url)),
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: [
        {
          find: /^\.\/demo\.css$/,
          // The dist build imports an already-compiled stylesheet, so it must
          // not add `@source` for the library a second time.
          replacement: useDist ? demoDist : demoSource,
        },
        {
          find: /^@mheers\/sipgate-ui-components\/style\.css$/,
          replacement: useDist ? distStyle : srcStyle,
        },
        {
          find: /^@mheers\/sipgate-ui-components$/,
          // Consume the library exactly like a consumer would. Source mode
          // keeps the example showing the current components; dist mode keeps
          // the release check honest.
          replacement: useDist ? distEntry : `${src}/index.ts`,
        },
        { find: '@', replacement: src },
      ],
    },
    server: {
      port: 5173,
    },
  };
});
