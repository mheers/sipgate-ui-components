import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Separator from './Separator.vue';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A 1px hairline for splitting content. Purely decorative by default.',
      },
    },
  },
  argTypes: { orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] } },
  args: { orientation: 'horizontal' },
  render: (args) => ({
    components: { Separator },
    setup: () => ({ args }),
    template: '<div class="w-80"><Separator v-bind="args" /></div>',
  }),
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => ({
    components: { Separator },
    setup: () => ({ args }),
    template: `
      <div class="flex h-10 items-center gap-4 text-sm">
        <span>24 calls</span>
        <Separator v-bind="args" />
        <span>6 messages</span>
        <Separator v-bind="args" />
        <span>2 voicemails</span>
      </div>
    `,
  }),
};

export const InContext: Story = {
  render: () => ({
    components: { Separator },
    template: `
      <div class="w-80 rounded-sg-lg border border-sg-border bg-sg-surface p-4 shadow-sg-xs">
        <p class="text-sm font-medium">Account</p>
        <p class="mt-1 text-xs text-sg-muted-foreground">Marcel Heers · sipgate basic</p>
        <Separator class="my-3" />
        <p class="text-sm font-medium">Billing</p>
        <p class="mt-1 text-xs text-sg-muted-foreground">Next invoice on 1 December</p>
      </div>
    `,
  }),
};
