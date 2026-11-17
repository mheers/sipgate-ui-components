import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SignalMark from './SignalMark.vue';

const meta = {
  title: 'Components/SignalMark',
  component: SignalMark,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The library mark: a signal radiating from a single point. It is intentionally abstract — use it in navigation, empty states and documentation, not as a replacement for the sipgate logo.',
      },
    },
  },
  argTypes: { size: { control: 'number' } },
  args: { size: 48 },
  render: (args) => ({
    components: { SignalMark },
    setup: () => ({ args }),
    template: '<span class="inline-flex text-sg-primary"><SignalMark v-bind="args" /></span>',
  }),
} satisfies Meta<typeof SignalMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => ({
    components: { SignalMark },
    template: `
      <div class="flex items-end gap-4 text-sg-primary">
        <SignalMark :size="16" />
        <SignalMark :size="24" />
        <SignalMark :size="32" />
        <SignalMark :size="48" />
        <SignalMark :size="64" />
      </div>
    `,
  }),
};

export const OnInverse: Story = {
  render: () => ({
    components: { SignalMark },
    template: `
      <div class="inline-flex items-center gap-3 rounded-sg-lg bg-sg-surface-inverse px-5 py-4 text-sg-inverse-foreground">
        <span class="text-sg-accent"><SignalMark :size="28" /></span>
        <span class="font-sg-display text-lg font-semibold tracking-tight">sipgate ui</span>
      </div>
    `,
  }),
};
