import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { describeCommunication } from './communication';
import CommunicationBadge from './CommunicationBadge.vue';
import CommunicationIcon from './CommunicationIcon.vue';
import type { CommunicationDirection, CommunicationType } from '../../lib/types';

const entries: Array<{ type: CommunicationType; direction: CommunicationDirection }> = [
  { type: 'call', direction: 'inbound' },
  { type: 'call', direction: 'outbound' },
  { type: 'call', direction: 'missed' },
  { type: 'sms', direction: 'inbound' },
  { type: 'fax', direction: 'inbound' },
  { type: 'voicemail', direction: 'inbound' },
];

const meta = {
  title: 'sipgate/CommunicationBadge',
  component: CommunicationBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The shared vocabulary for sipgate history: one icon, one label and one tone per channel and direction. `CommunicationIcon` is the same language without the label, for dense lists.',
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['call', 'sms', 'fax', 'voicemail'] },
    direction: { control: 'inline-radio', options: ['inbound', 'outbound', 'missed'] },
    showLabel: { control: 'boolean' },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
  args: { type: 'call', direction: 'missed', showLabel: true, size: 'md' },
  render: (args) => ({
    components: { CommunicationBadge },
    setup: () => ({ args }),
    template: '<CommunicationBadge v-bind="args" />',
  }),
} satisfies Meta<typeof CommunicationBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllChannels: Story = {
  render: () => ({
    components: { CommunicationBadge },
    setup: () => ({ entries }),
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <CommunicationBadge v-for="entry in entries" :key="entry.type + entry.direction" v-bind="entry" />
      </div>
    `,
  }),
};

export const IconOnly: Story = {
  render: () => ({
    components: { CommunicationBadge },
    setup: () => ({ entries }),
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <CommunicationBadge v-for="entry in entries" :key="entry.type + entry.direction" v-bind="entry" :show-label="false" />
      </div>
    `,
  }),
};

export const Icons: Story = {
  render: () => ({
    components: { CommunicationIcon },
    setup: () => ({ entries }),
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <CommunicationIcon v-for="entry in entries" :key="entry.type + entry.direction" v-bind="entry" size="lg" />
      </div>
    `,
  }),
};

export const Vocabulary: Story = {
  render: () => ({
    components: { CommunicationBadge, CommunicationIcon },
    setup: () => ({ entries, describeCommunication }),
    template: `
      <div class="overflow-hidden rounded-sg-lg border border-sg-border bg-sg-surface shadow-sg-xs">
        <div v-for="entry in entries" :key="entry.type + entry.direction" class="flex items-center gap-4 border-b border-sg-border px-4 py-3 last:border-b-0">
          <CommunicationIcon v-bind="entry" />
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium">{{ describeCommunication(entry.type, entry.direction).label }}</p>
            <p class="sg-numeric text-[0.6875rem] text-sg-muted-foreground">{{ entry.type }} / {{ entry.direction }}</p>
          </div>
          <CommunicationBadge v-bind="entry" size="sm" />
        </div>
      </div>
    `,
  }),
};
