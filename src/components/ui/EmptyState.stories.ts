import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Plus } from 'lucide-vue-next';
import Button from './Button.vue';
import EmptyState from './EmptyState.vue';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A left-aligned empty state on dotted paper. It is designed to teach the next step rather than announce absence — give it a concrete action.',
      },
    },
  },
  argTypes: { compact: { control: 'boolean' } },
  args: {
    title: 'No calls today',
    description:
      'When someone calls one of your numbers, the conversation lands here with the recording and notes.',
    compact: false,
  },
  render: (args) => ({
    components: { EmptyState },
    setup: () => ({ args }),
    template: '<div class="max-w-xl"><EmptyState v-bind="args" /></div>',
  }),
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  render: () => ({
    components: { EmptyState, Button, Plus },
    template: `
      <div class="max-w-xl">
        <EmptyState
          title="No contacts yet"
          description="Import your address book or add a contact by hand. Favourites are pinned to the top of every call screen."
        >
          <Button size="sm"><Plus /> Add contact</Button>
        </EmptyState>
      </div>
    `,
  }),
};

export const Compact: Story = {
  args: {
    compact: true,
    title: 'No messages',
    description: 'Start the conversation — messages arrive on the handset.',
  },
  render: (args) => ({
    components: { EmptyState },
    setup: () => ({ args }),
    template: '<div class="max-w-sm"><EmptyState v-bind="args" /></div>',
  }),
};
