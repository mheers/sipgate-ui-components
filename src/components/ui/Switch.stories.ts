import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Separator from './Separator.vue';
import Switch from './Switch.vue';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A binary setting with an always-visible label. The switch itself is a button with `aria-checked`; the label is linked by id so clicking the text toggles the setting.',
      },
    },
  },
  argTypes: { disabled: { control: 'boolean' } },
  args: {
    label: 'Do not disturb',
    description: 'Send incoming calls straight to voicemail.',
    disabled: false,
  },
  render: (args) => ({
    components: { Switch },
    setup() {
      const enabled = ref(true);
      return { args, enabled };
    },
    template: '<div class="w-96"><Switch v-bind="args" v-model="enabled" /></div>',
  }),
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SettingsPanel: Story = {
  render: () => ({
    components: { Switch, Separator },
    setup() {
      const dnd = ref(true);
      const recording = ref(true);
      const transcription = ref(false);
      return { dnd, recording, transcription };
    },
    template: `
      <div class="w-96 rounded-sg-lg border border-sg-border bg-sg-surface p-5 shadow-sg-xs">
        <p class="font-sg-display text-sm font-semibold">Call handling</p>
        <div class="mt-4 space-y-4">
          <Switch v-model="dnd" label="Do not disturb" description="Send incoming calls straight to voicemail." />
          <Separator />
          <Switch v-model="recording" label="Record calls" description="Recordings are stored for 90 days." />
          <Separator />
          <Switch v-model="transcription" label="Voicemail transcription" description="Add a text transcript to every voicemail." />
        </div>
      </div>
    `,
  }),
};
