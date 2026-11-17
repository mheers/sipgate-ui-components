import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-themes'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: 'vue-component-meta',
      builder: {
        viteConfigPath: '.storybook/vite.config.ts',
      },
    },
  },
  staticDirs: [{ from: '../public', to: '/' }],
  docs: {
    defaultName: 'Docs',
  },
  typescript: {
    check: false,
  },
  core: {
    disableTelemetry: true,
  },
  features: {
    sidebarOnboardingChecklist: false,
    menuOnboardingChecklist: false,
  },
};

export default config;
