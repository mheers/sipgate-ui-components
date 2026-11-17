import type { Preview } from '@storybook/vue3-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import '@fontsource-variable/instrument-sans';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/jetbrains-mono';
import '../src/styles/index.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', 'Components', 'sipgate', 'Patterns', 'Changelog'],
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'sg-dark',
        'shadcn dark': 'dark',
      },
      defaultTheme: 'light',
    }),
    (story, context) => {
      const bleed = context.parameters.bleed === true;
      return {
        template: `
          <div class="sg-root min-h-dvh bg-sg-background text-sg-foreground ${bleed ? '' : 'p-6 sm:p-8'}">
            <story />
          </div>
        `,
      };
    },
  ],
};

export default preview;
