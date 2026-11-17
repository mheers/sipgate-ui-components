import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CopyButton from './CopyButton.vue';

const meta = {
  title: 'Components/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Copies a value and swaps to a check for a moment. The label also changes for screen readers, and a live region announces the copy.',
      },
    },
  },
  argTypes: { showLabel: { control: 'boolean' } },
  args: {
    value: '+49 30 12345678',
    label: 'Copy number',
    showLabel: false,
  },
  render: (args) => ({
    components: { CopyButton },
    setup: () => ({ args }),
    template: '<CopyButton v-bind="args" />',
  }),
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { showLabel: true },
};

export const InContext: Story = {
  render: () => ({
    components: { CopyButton },
    template: `
      <div class="flex w-80 items-center justify-between gap-3 rounded-sg border border-sg-border bg-sg-surface px-4 py-3 shadow-sg-xs">
        <div>
          <p class="text-xs text-sg-muted-foreground">Main number</p>
          <p class="sg-numeric text-sm">+49 30 12345678</p>
        </div>
        <CopyButton value="+49 30 12345678" label="Copy main number" />
      </div>
    `,
  }),
};
