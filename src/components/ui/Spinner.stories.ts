import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Spinner from './Spinner.vue';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An indeterminate progress indicator with a visually hidden status label. Prefer `Button loading` for actions and skeletons for content.',
      },
    },
  },
  argTypes: { size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] } },
  args: { size: 'md', label: 'Loading' },
  render: (args) => ({
    components: { Spinner },
    setup: () => ({ args }),
    template: '<Spinner v-bind="args" />',
  }),
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => ({
    components: { Spinner },
    template: `
      <div class="flex items-center gap-4">
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
    `,
  }),
};
