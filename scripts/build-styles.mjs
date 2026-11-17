/*
 * The Tailwind/Vite build emits `dist/style.css`. The shadcn adapter is plain
 * CSS that consumers import separately, so copy it into the published package
 * after Vite has emptied `dist`.
 */
import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';

const root = new URL('../', import.meta.url);
const source = new URL('src/styles/shadcn.css', root);
const target = new URL('dist/shadcn.css', root);

await mkdir(new URL('dist/', root), { recursive: true });
await copyFile(source, target);

const css = await readFile(target, 'utf8');
if (!css.includes('.sg-root')) {
  throw new Error('dist/shadcn.css does not contain the .sg-root bridge');
}

console.log(`copied ${fileURLToPath(target)}`);
