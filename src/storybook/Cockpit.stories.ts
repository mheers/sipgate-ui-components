import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CockpitApp from '../../examples/cockpit/src/CockpitApp.vue';

const meta = {
  title: 'Patterns/Cockpit',
  component: CockpitApp,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    bleed: true,
    docs: {
      description: {
        component:
          'The library used end to end: a live call, grouped history with a detail dialog, contact shortcuts, a segment-aware SMS composer, balance, devices and a voicemail. The same component powers `pnpm example:dev`.',
      },
    },
  },
  render: () => ({
    components: { CockpitApp },
    template: '<CockpitApp />',
  }),
} satisfies Meta<typeof CockpitApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
