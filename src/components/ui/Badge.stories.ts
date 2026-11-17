import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Badge from './Badge.vue';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A compact status label. Use a dot for presence and colour for meaning; never rely on colour alone — the label carries the meaning.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'primary', 'accent', 'success', 'warning', 'danger', 'info', 'outline'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    dot: { control: 'boolean' },
  },
  args: { variant: 'primary', size: 'md', dot: false },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">Badge</Badge>',
  }),
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <Badge>Neutral</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="accent">Live</Badge>
        <Badge variant="success">Online</Badge>
        <Badge variant="warning">Low balance</Badge>
        <Badge variant="danger">Missed</Badge>
        <Badge variant="info">SMS</Badge>
        <Badge variant="outline">Draft</Badge>
      </div>
    `,
  }),
};

export const WithDots: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <Badge variant="success" dot>Online</Badge>
        <Badge variant="danger" dot>Busy</Badge>
        <Badge variant="warning" dot>Do not disturb</Badge>
        <Badge variant="accent" dot>Recording</Badge>
        <Badge variant="neutral" dot>Offline</Badge>
      </div>
    `,
  }),
};
