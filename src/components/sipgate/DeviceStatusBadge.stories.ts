import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DeviceStatusBadge from './DeviceStatusBadge.vue';

const meta = {
  title: 'sipgate/DeviceStatusBadge',
  component: DeviceStatusBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Presence for an endpoint. The label always spells the state out — colour is a reinforcement, not the message. Set `showLabel` to `false` for a compact dot; the state stays available to screen readers.',
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'dnd', 'ringing'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    showLabel: { control: 'boolean' },
  },
  args: { status: 'online', size: 'md', showLabel: true },
  render: (args) => ({
    components: { DeviceStatusBadge },
    setup: () => ({ args }),
    template: '<DeviceStatusBadge v-bind="args" />',
  }),
} satisfies Meta<typeof DeviceStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllStates: Story = {
  render: () => ({
    components: { DeviceStatusBadge },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <DeviceStatusBadge status="online" />
        <DeviceStatusBadge status="ringing" />
        <DeviceStatusBadge status="busy" />
        <DeviceStatusBadge status="dnd" />
        <DeviceStatusBadge status="offline" />
      </div>
    `,
  }),
};

export const DotOnly: Story = {
  render: () => ({
    components: { DeviceStatusBadge },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <DeviceStatusBadge status="online" :show-label="false" />
        <DeviceStatusBadge status="ringing" :show-label="false" />
        <DeviceStatusBadge status="busy" :show-label="false" />
        <DeviceStatusBadge status="dnd" :show-label="false" />
        <DeviceStatusBadge status="offline" :show-label="false" />
      </div>
    `,
  }),
};
