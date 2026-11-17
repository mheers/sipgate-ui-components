import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CallTimer from './CallTimer.vue';

const meta = {
  title: 'sipgate/CallTimer',
  component: CallTimer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A tabular call clock. Pass `startedAt` for a live timer or `seconds` for a recorded duration. The visible clock updates every second; screen readers get a stable, human sentence instead of a stream of numbers.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    tone: { control: 'inline-radio', options: ['default', 'muted', 'inverse'] },
    seconds: { control: 'number' },
  },
  args: { seconds: 125, size: 'lg', tone: 'default' },
  render: (args) => ({
    components: { CallTimer },
    setup: () => ({ args }),
    template: '<CallTimer v-bind="args" />',
  }),
} satisfies Meta<typeof CallTimer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => ({
    components: { CallTimer },
    template: `
      <div class="flex items-baseline gap-4">
        <CallTimer :seconds="65" size="sm" />
        <CallTimer :seconds="65" size="md" />
        <CallTimer :seconds="3725" size="lg" />
        <CallTimer :seconds="3725" size="xl" />
      </div>
    `,
  }),
};

export const Live: Story = {
  args: { seconds: undefined, startedAt: new Date(Date.now() - 96_000), size: 'xl' },
};

export const OnInverse: Story = {
  args: { seconds: 3725, tone: 'inverse', size: 'xl' },
  render: (args) => ({
    components: { CallTimer },
    setup: () => ({ args }),
    template:
      '<div class="inline-flex rounded-sg-lg bg-sg-surface-inverse p-4"><CallTimer v-bind="args" /></div>',
  }),
};
