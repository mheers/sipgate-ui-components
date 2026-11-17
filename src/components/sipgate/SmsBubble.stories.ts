import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SmsBubble from './SmsBubble.vue';

const meta = {
  title: 'sipgate/SmsBubble',
  component: SmsBubble,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'One message in a thread. Outbound bubbles sit on the violet primary surface; inbound messages stay on paper. Timestamps and delivery ticks sit inside the bubble so copying text never picks up chrome.',
      },
    },
  },
  argTypes: { showStatus: { control: 'boolean' } },
  args: {
    message: {
      id: 'msg-1',
      direction: 'outbound',
      body: 'Hi Anna, the revised quote is ready. Shall I send it over?',
      sentAt: new Date(Date.now() - 4 * 60_000),
      status: 'delivered',
    },
    locale: 'en-GB',
    showStatus: true,
  },
  render: (args) => ({
    components: { SmsBubble },
    setup: () => ({ args }),
    template: '<div class="max-w-md"><SmsBubble v-bind="args" /></div>',
  }),
} satisfies Meta<typeof SmsBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outbound: Story = {};

export const Inbound: Story = {
  args: {
    message: {
      id: 'msg-2',
      direction: 'inbound',
      body: 'Yes please! And could you include the on-site installation?',
      sentAt: new Date(Date.now() - 8 * 60_000),
    },
  },
};

export const Sending: Story = {
  args: {
    message: {
      id: 'msg-3',
      direction: 'outbound',
      body: 'Done — installation is line item 4.',
      sentAt: new Date(),
      status: 'sending',
    },
  },
};

export const Failed: Story = {
  args: {
    message: {
      id: 'msg-4',
      direction: 'outbound',
      body: 'This one did not go through.',
      sentAt: new Date(),
      status: 'failed',
      error: 'Recipient unreachable — try again in a moment.',
    },
  },
};
