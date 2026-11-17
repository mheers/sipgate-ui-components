import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';
import { ref } from 'vue';
import CallHistoryList from './CallHistoryList.vue';
import CallHistoryItem from './CallHistoryItem.vue';
import CommunicationIcon from './CommunicationIcon.vue';
import PhoneNumber from './PhoneNumber.vue';
import Button from '../ui/Button.vue';
import Card from '../ui/Card.vue';
import { historyEntries } from '../../storybook/data';

const meta = {
  title: 'sipgate/CallHistoryList',
  component: CallHistoryList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A grouped, newest-first history list with loading and empty states. It sorts defensively, groups by calendar day, and exposes an `item` slot for product-specific rows.',
      },
    },
  },
  argTypes: {
    grouped: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    entries: historyEntries,
    loading: false,
    grouped: true,
    locale: 'en-GB',
    country: 'DE',
    onSelect: fn(),
  },
  render: (args) => ({
    components: { CallHistoryList },
    setup: () => ({ args }),
    template: '<div class="max-w-md"><CallHistoryList v-bind="args" /></div>',
  }),
} satisfies Meta<typeof CallHistoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Flat: Story = {
  args: { grouped: false },
};

export const Loading: Story = {
  args: { entries: [], loading: true },
};

export const Empty: Story = {
  args: { entries: [] },
};

export const WithSelection: Story = {
  render: () => ({
    components: {
      CallHistoryList,
      CallHistoryItem,
      CommunicationIcon,
      PhoneNumber,
      Button,
      Card,
    },
    setup() {
      const selected = ref(historyEntries[1]);
      return { entries: historyEntries, selected };
    },
    template: `
      <div class="grid max-w-4xl gap-4 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
        <CallHistoryList :entries="entries" @select="selected = $event" />
        <Card class="h-fit p-5">
          <div class="flex items-start gap-3">
            <CommunicationIcon :type="selected.type" :direction="selected.direction" size="lg" />
            <div class="min-w-0 flex-1">
              <p class="font-sg-display text-lg font-semibold">{{ selected.name || selected.number }}</p>
              <PhoneNumber :value="selected.number" size="sm" tone="muted" class="mt-0.5" />
            </div>
          </div>
          <div class="mt-5 space-y-2 border-t border-sg-border pt-4 text-sm">
            <div class="flex justify-between"><span class="text-sg-muted-foreground">Channel</span><span class="capitalize">{{ selected.type }}</span></div>
            <div class="flex justify-between"><span class="text-sg-muted-foreground">Direction</span><span class="capitalize">{{ selected.direction }}</span></div>
            <div v-if="selected.durationSeconds !== undefined" class="flex justify-between"><span class="text-sg-muted-foreground">Duration</span><span class="sg-numeric">{{ selected.durationSeconds }} s</span></div>
            <div v-if="selected.note" class="flex justify-between gap-6"><span class="text-sg-muted-foreground">Note</span><span class="text-right">{{ selected.note }}</span></div>
          </div>
          <div class="mt-5 flex gap-2">
            <Button size="sm">Call back</Button>
            <Button size="sm" variant="outline">Open notes</Button>
          </div>
        </Card>
      </div>
    `,
  }),
};
