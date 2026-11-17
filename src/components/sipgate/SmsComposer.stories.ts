import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import SmsComposer from './SmsComposer.vue';

const meta = {
  title: 'sipgate/SmsComposer',
  component: SmsComposer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An SMS composer that tells the truth about billing. It detects GSM-7 versus UCS-2, counts extension characters twice, shows billable segments, and blocks sending past `maxSegments`. Ctrl/⌘ + Enter sends.',
      },
    },
  },
  argTypes: {
    showRecipient: { control: 'boolean' },
    disabled: { control: 'boolean' },
    sending: { control: 'boolean' },
    maxSegments: { control: 'number' },
  },
  args: {
    title: 'New message',
    showRecipient: true,
    disabled: false,
    sending: false,
    maxSegments: 8,
    country: 'DE',
    sendLabel: 'Send',
  },
  render: (args) => ({
    components: { SmsComposer },
    setup() {
      const message = ref('');
      const recipient = ref('+4915123456789');
      const lastSent = ref('');
      function onSend(payload: { message: string }) {
        lastSent.value = payload.message;
        message.value = '';
      }
      return { args, message, recipient, lastSent, onSend };
    },
    template: `
      <div class="max-w-lg space-y-3">
        <SmsComposer v-bind="args" v-model="message" v-model:recipient="recipient" @send="onSend" />
        <p v-if="lastSent" class="rounded-sg border border-sg-success/30 bg-sg-success-soft px-3 py-2 text-xs text-sg-success">
          Sent “{{ lastSent }}” to {{ recipient }}
        </p>
      </div>
    `,
  }),
} satisfies Meta<typeof SmsComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unicode: Story = {
  render: () => ({
    components: { SmsComposer },
    setup() {
      const message = ref('Grüße aus Köln 👋 — der Anhang kommt per Mail.');
      const recipient = ref('+4915123456789');
      return { message, recipient };
    },
    template:
      '<div class="max-w-lg"><SmsComposer v-model="message" v-model:recipient="recipient" /></div>',
  }),
};

export const Multipart: Story = {
  render: () => ({
    components: { SmsComposer },
    setup() {
      const message = ref(
        'Hi Anna, the revised quote is ready. I included the on-site installation as line item 4 and adjusted the delivery date to 28 November. The total comes to 2.480 € including VAT. Let me know if you want me to walk you through the numbers before you sign — happy to jump on a quick call this afternoon.',
      );
      const recipient = ref('+4915123456789');
      return { message, recipient };
    },
    template:
      '<div class="max-w-lg"><SmsComposer v-model="message" v-model:recipient="recipient" /></div>',
  }),
};

export const WithoutRecipient: Story = {
  args: { showRecipient: false },
  render: (args) => ({
    components: { SmsComposer },
    setup() {
      const message = ref('On my way — see you in five minutes.');
      return { args, message };
    },
    template: `
      <div class="max-w-lg">
        <SmsComposer v-bind="args" v-model="message" recipient="+4915123456789" />
      </div>
    `,
  }),
};

export const Sending: Story = {
  args: { sending: true },
  render: (args) => ({
    components: { SmsComposer },
    setup() {
      const message = ref('Sending this message now.');
      const recipient = ref('+4915123456789');
      return { args, message, recipient };
    },
    template:
      '<div class="max-w-lg"><SmsComposer v-bind="args" v-model="message" v-model:recipient="recipient" /></div>',
  }),
};
