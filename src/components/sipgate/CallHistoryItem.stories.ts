import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';
import { ref } from 'vue';
import CallHistoryItem from './CallHistoryItem.vue';
import { historyEntries } from '@/storybook/data';

const meta = {
  title: 'sipgate/CallHistoryItem',
  component: CallHistoryItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'One history row: channel icon, remote party, outcome and duration, with the number visible when the contact is known. Actions only appear on hover, keeping the list calm.',
      },
    },
  },
  argTypes: {
    timeFormat: { control: 'inline-radio', options: ['time', 'relative'] },
    selected: { control: 'boolean' },
  },
  args: {
    entry: historyEntries[0],
    locale: 'en-GB',
    country: 'DE',
    selected: false,
    timeFormat: 'time',
    onSelect: fn(),
  },
  render: (args) => ({
    components: { CallHistoryItem },
    setup: () => ({ args }),
    template: '<div class="max-w-md"><CallHistoryItem v-bind="args" /></div>',
  }),
} satisfies Meta<typeof CallHistoryItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Missed: Story = {};

export const Answered: Story = {
  args: { entry: historyEntries[1] },
};

export const Outgoing: Story = {
  args: { entry: historyEntries[2] },
};

export const Selected: Story = {
  args: { entry: historyEntries[1], selected: true },
};

export const RelativeTime: Story = {
  args: { entry: historyEntries[3], timeFormat: 'relative' },
};

export const List: Story = {
  render: () => ({
    components: { CallHistoryItem },
    setup() {
      const selected = ref('hist-2');
      return { entries: historyEntries.slice(0, 5), selected };
    },
    template: `
      <div class="max-w-md space-y-1">
        <CallHistoryItem
          v-for="entry in entries"
          :key="entry.id"
          :entry="entry"
          :selected="selected === entry.id"
          @select="selected = entry.id"
        />
      </div>
    `,
  }),
};
