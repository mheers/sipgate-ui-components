/**
 * Build entry: the public API plus the compiled stylesheet. The published
 * `dist/index.d.ts` is generated from `src/index.ts`, so consumers never see a
 * CSS import in the type declarations.
 */
import './styles/index.css';

export * from './index';
