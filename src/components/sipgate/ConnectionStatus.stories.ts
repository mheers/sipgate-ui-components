import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ConnectionStatus from './ConnectionStatus.vue';

const meta = {
  title: 'sipgate/ConnectionStatus',
  component: ConnectionStatus,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Realtime transport state for websocket-driven apps. It is a polite live region, so a drop and reconnect is announced without stealing focus.',
      },
    },
  },
  argTypes: {
    state: { control: 'inline-radio', options: ['connected', 'connecting', 'disconnected'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    showLabel: { control: 'boolean' },
    tone: { control: 'inline-radio', options: ['default', 'inverse'] },
  },
  args: { state: 'connected', size: 'md', showLabel: true, tone: 'default' },
  render: (args) => ({
    components: { ConnectionStatus },
    setup: () => ({ args }),
    template: '<ConnectionStatus v-bind="args" />',
  }),
} satisfies Meta<typeof ConnectionStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Connected: Story = {};

export const Connecting: Story = {
  args: { state: 'connecting' },
};

export const Disconnected: Story = {
  args: { state: 'disconnected' },
};

export const AllStates: Story = {
  render: () => ({
    components: { ConnectionStatus },
    template: `
      <div class="flex flex-wrap items-center gap-5">
        <ConnectionStatus state="connected" />
        <ConnectionStatus state="connecting" />
        <ConnectionStatus state="disconnected" />
      </div>
    `,
  }),
};

export const InContext: Story = {
  render: () => ({
    components: { ConnectionStatus },
    template: `
      <div class="flex w-80 items-center justify-between rounded-sg border border-sg-border bg-sg-surface px-4 py-3 shadow-sg-xs">
        <div>
          <p class="text-sm font-medium">Realtime</p>
          <p class="text-xs text-sg-muted-foreground">Presence and call events</p>
        </div>
        <ConnectionStatus state="connected" />
      </div>
    `,
  }),
};
