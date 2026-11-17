import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';
import ActiveCallCard from './ActiveCallCard.vue';
import { activeCall } from '@/storybook/data';

const meta = {
  title: 'sipgate/ActiveCallCard',
  component: ActiveCallCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The stage for a live call. It uses the inverse surface deliberately: a call is a different mode from the rest of the app. A lime edge marks live audio, the timer is the loudest element, and all call actions stay within thumb reach.',
      },
    },
  },
  argTypes: {
    state: { control: 'inline-radio', options: ['ringing', 'active', 'held'] },
    direction: { control: 'inline-radio', options: ['inbound', 'outbound', 'missed'] },
    muted: { control: 'boolean' },
    recording: { control: 'boolean' },
  },
  args: {
    ...activeCall,
    onAnswer: fn(),
    onHangup: fn(),
    'onToggle-mute': fn(),
    'onToggle-hold': fn(),
  },
  render: (args) => ({
    components: { ActiveCallCard },
    setup: () => ({ args }),
    template: '<div class="max-w-lg"><ActiveCallCard v-bind="args" /></div>',
  }),
} satisfies Meta<typeof ActiveCallCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InCall: Story = {};

export const Incoming: Story = {
  args: {
    state: 'ringing',
    startedAt: undefined,
    recording: false,
    name: 'Ben Okafor',
    number: '+493088776655',
  },
};

export const Outgoing: Story = {
  args: {
    state: 'ringing',
    direction: 'outbound',
    startedAt: undefined,
    recording: false,
    name: 'Clara Neumann',
    number: '+49891234567',
  },
};

export const OnHold: Story = {
  args: { state: 'held' },
};

export const Muted: Story = {
  args: { muted: true },
};

export const UnknownCaller: Story = {
  args: {
    name: undefined,
    number: '+491729876543',
    recording: false,
    muted: false,
    state: 'active',
  },
};
