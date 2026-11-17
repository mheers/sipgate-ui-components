# Contributing

Thanks for helping make sipgate UIs better. This project is a small, deliberately
curated library — the bar is quality, not quantity.

## Set up

```bash
git clone git@github.com:mheers/sipgate-ui-components.git
cd sipgate-ui-components
pnpm install
pnpm dev          # Storybook
pnpm example:dev  # cockpit example
```

Requirements: Node `>= 20.19` (`.nvmrc` pins 22) and pnpm 10.

## Before opening a pull request

```bash
pnpm typecheck
pnpm test
pnpm build
pnpm build:storybook
pnpm format:check
```

All five must pass. If you changed a component, also open its Storybook page and
check the Accessibility panel.

## What a component needs

A component is not done with the `.vue` file alone. Include:

1. **Types** — typed props and emits, no `any`. Use `defineModel` for two-way bindings.
2. **Tokens** — use `bg-sg-*`, `text-sg-*`, `rounded-sg*`; never hard-code brand colours.
3. **Accessibility** — a visible focus ring, a label for every icon-only control,
   keyboard operation, and `aria-*` where the native element cannot carry the state.
4. **Story** — a `.stories.ts` with `autodocs`, meaningful states, and mobile-friendly
   layouts. Use the fixtures in `src/storybook/data.ts` where they fit.
5. **Tests** — for logic and for behaviour that could silently regress. See
   `SmsComposer.test.ts` for the pattern.
6. **Docs** — update the table in `README.md` and the component description in the story meta.

## Conventions

- Vue 3.5, `<script setup lang="ts">`, Composition API only.
- Two spaces, single quotes, semicolons, Prettier with the Tailwind plugin.
- Props are camelCase in script and kebab-case in templates.
- Emit names are kebab-case (`toggle-mute`), handled as `onToggle-mute` in Storybook args.
- Prefer a derived `computed` over a method in templates.
- New props go at the end of the type unless grouping suggests otherwise.
- Components must work in SSR-safe environments: guard `window`, `document` and
  `navigator` access.

## Commit messages

Conventional Commits, for example:

```
feat(sms): show UCS-2 segment warnings in the composer
fix(phone): keep the trunk prefix for Austrian numbers
docs(readme): add a call-history mapping example
```

## Releasing

There is no CI on purpose. A release is a local, reviewed step:

```bash
pnpm install
pnpm lint
pnpm build
pnpm example:build:dist
pnpm build:storybook
npm publish --access public
```

`example:build:dist` builds the cockpit against the compiled package, not the source
tree — it catches missing exports and styling regressions before npm sees them.

Update `CHANGELOG.md` and the version in `package.json` first. Tag the commit
`vX.Y.Z` on GitHub.

## Reporting

- Bugs and ideas: GitHub issues.
- Security: see [SECURITY.md](./SECURITY.md). Please do not open a public issue for
  a vulnerability.

This project is released with a [Code of Conduct](./CODE_OF_CONDUCT.md). By
participating you agree to uphold it.
