import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const theme = create({
  base: 'light',

  brandTitle: 'sipgate / ui',
  brandUrl: 'https://github.com/mheers/sipgate-ui-components',
  brandTarget: '_self',

  colorPrimary: '#8642fe',
  colorSecondary: '#8642fe',

  appBg: '#faf9f6',
  appContentBg: '#ffffff',
  appPreviewBg: '#faf9f6',
  appBorderColor: '#e7e2f0',
  appBorderRadius: 10,

  fontBase:
    "'Instrument Sans', 'Instrument Sans Variable', ui-sans-serif, system-ui, -apple-system, sans-serif",
  fontCode: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",

  textColor: '#202023',
  textInverseColor: '#f7f5fa',
  textMutedColor: '#6c6677',

  barBg: '#ffffff',
  barTextColor: '#6c6677',
  barSelectedColor: '#8642fe',
  barHoverColor: '#8642fe',

  inputBg: '#ffffff',
  inputBorder: '#e7e2f0',
  inputTextColor: '#202023',
  inputBorderRadius: 8,
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
});
