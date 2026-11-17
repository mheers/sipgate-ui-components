import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Skeleton from './Skeleton.vue';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A shimmering placeholder. Mirror the real layout, not just grey boxes, and stop the animation for reduced-motion users.',
      },
    },
  },
  argTypes: { rounded: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'full'] } },
  args: { rounded: 'md' },
  render: (args) => ({
    components: { Skeleton },
    setup: () => ({ args }),
    template: '<Skeleton v-bind="args" class="h-4 w-64" />',
  }),
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ListPlaceholder: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="w-96 space-y-4">
        <div v-for="index in 4" :key="index" class="flex items-center gap-3">
          <Skeleton rounded="full" class="size-10 shrink-0" />
          <div class="flex-1 space-y-2">
            <Skeleton class="h-3 w-2/5" />
            <Skeleton class="h-2.5 w-3/5" />
          </div>
          <Skeleton class="h-2.5 w-10" />
        </div>
      </div>
    `,
  }),
};
