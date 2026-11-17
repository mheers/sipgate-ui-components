import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import SmsThread from './SmsThread.vue';
import SmsComposer from './SmsComposer.vue';
import Avatar from '../ui/Avatar.vue';
import ConnectionStatus from './ConnectionStatus.vue';
import { smsThread } from '../../storybook/data';

const meta = {
  title: 'sipgate/SmsThread',
  component: SmsThread,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A conversation with day separators, delivery states and an optional typing indicator. It only auto-scrolls when the reader is already near the bottom, so history is never yanked away.',
      },
    },
  },
  argTypes: {
    loading: { control: 'boolean' },
    typing: { control: 'boolean' },
  },
  args: {
    messages: smsThread,
    locale: 'en-GB',
    loading: false,
    typing: false,
  },
  render: (args) => ({
    components: { SmsThread },
    setup: () => ({ args }),
    template:
      '<div class="max-w-md rounded-sg-lg border border-sg-border bg-sg-surface shadow-sg-xs"><SmsThread v-bind="args" /></div>',
  }),
} satisfies Meta<typeof SmsThread>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Typing: Story = {
  args: { typing: true },
};

export const Loading: Story = {
  args: { messages: [], loading: true },
};

export const Empty: Story = {
  args: { messages: [] },
};

export const Conversation: Story = {
  render: () => ({
    components: { SmsThread, SmsComposer, Avatar, ConnectionStatus },
    setup() {
      const messages = ref([...smsThread]);
      const message = ref('');
      function onSend(payload: { message: string }) {
        messages.value.push({
          id: `local-${messages.value.length}`,
          direction: 'outbound',
          body: payload.message,
          sentAt: new Date(),
          status: 'sent',
        });
        message.value = '';
      }
      return { messages, message, onSend };
    },
    template: `
      <div class="max-w-md overflow-hidden rounded-sg-lg border border-sg-border bg-sg-surface shadow-sg-sm">
        <SmsThread :messages="messages">
          <template #header>
            <div class="flex items-center gap-3 px-4 py-3">
              <Avatar name="Anna de Vries" status="online" decorative />
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium">Anna de Vries</p>
                <p class="text-xs text-sg-muted-foreground">+49 151 234 56789</p>
              </div>
              <ConnectionStatus state="connected" />
            </div>
          </template>
          <template #composer>
            <SmsComposer
              v-model="message"
              :show-recipient="false"
              title="Reply"
              @send="onSend"
            />
          </template>
        </SmsThread>
      </div>
    `,
  }),
};
