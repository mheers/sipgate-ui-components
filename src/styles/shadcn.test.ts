import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(process.cwd(), 'src/styles/shadcn.css'), 'utf8');

describe('shadcn adapter stylesheet', () => {
  it('maps the host surface and action tokens', () => {
    expect(css).toContain('--sg-background: var(--background');
    expect(css).toContain('--sg-surface: var(--card');
    expect(css).toContain('--sg-primary: var(--primary');
    expect(css).toContain('--sg-ring: var(--ring');
    expect(css).toContain('--sg-danger: var(--destructive');
  });

  it('uses shadcn radii and control heights', () => {
    expect(css).toContain('--sg-radius: var(--radius-md');
    expect(css).toContain('--sg-control-height: 2.25rem');
    expect(css).toContain('--sg-dialog-radius');
    expect(css).toContain('--sg-input: transparent');
  });

  it('follows host status colours when they exist', () => {
    expect(css).toContain('--sg-success: var(--success');
    expect(css).toContain('--sg-warning: var(--warning');
    expect(css).toContain('--sg-info: var(--info');
  });

  it('keeps the lime signal under library control', () => {
    expect(css).not.toMatch(/--sg-accent\s*:/);
  });

  it('keeps the shadcn card preset opt-in', () => {
    expect(css).toContain(".sg-root[data-sg-preset='shadcn'] .sg-card-header");
    expect(css).toContain(".sg-root[data-sg-preset='shadcn'] .sg-card-title");
  });
});
