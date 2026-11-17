import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';
import VoicemailPlayer from './VoicemailPlayer.vue';
import { voicemail } from '@/storybook/data';

const meta = {
  title: 'sipgate/VoicemailPlayer',
  component: VoicemailPlayer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A voicemail with a waveform scrubber and optional transcript. The range input sits invisibly over the bars, so dragging and arrow keys both work while the visual stays custom.',
      },
    },
  },
  argTypes: {
    listened: { control: 'boolean' },
  },
  args: {
    ...voicemail,
    locale: 'en-GB',
    country: 'DE',
    onPlay: fn(),
    onPause: fn(),
    onEnded: fn(),
    onSeek: fn(),
    'onMark-listened': fn(),
  },
  render: (args) => ({
    components: { VoicemailPlayer },
    setup: () => ({ args }),
    template: '<div class="max-w-md"><VoicemailPlayer v-bind="args" /></div>',
  }),
} satisfies Meta<typeof VoicemailPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Listened: Story = {
  args: { listened: true },
};

export const WithoutTranscript: Story = {
  args: { transcript: undefined },
};

export const ShortMessage: Story = {
  args: {
    caller: 'Clara Neumann',
    number: '+49891234567',
    durationSeconds: 4,
    transcript: undefined,
    listened: true,
  },
};

export const NoRecording: Story = {
  args: {
    src: undefined,
    transcript: undefined,
    listened: true,
  },
};
