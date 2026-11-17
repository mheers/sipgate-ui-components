import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CommunicationIcon from './CommunicationIcon.vue';

const meta = {
  title: 'sipgate/CommunicationIcon',
  component: CommunicationIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The communication vocabulary as a compact tile: call direction, SMS, fax and voicemail, each with its own tone. Use `decorative` when an adjacent label already names the channel.',
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['call', 'sms', 'fax', 'voicemail'] },
    direction: { control: 'inline-radio', options: ['inbound', 'outbound', 'missed'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    decorative: { control: 'boolean' },
  },
  args: { type: 'call', direction: 'inbound', size: 'md', decorative: false },
  render: (args) => ({
    components: { CommunicationIcon },
    setup: () => ({ args }),
    template: '<CommunicationIcon v-bind="args" />',
  }),
} satisfies Meta<typeof CommunicationIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllChannels: Story = {
  render: () => ({
    components: { CommunicationIcon },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <CommunicationIcon type="call" direction="inbound" />
        <CommunicationIcon type="call" direction="outbound" />
        <CommunicationIcon type="call" direction="missed" />
        <CommunicationIcon type="sms" />
        <CommunicationIcon type="fax" />
        <CommunicationIcon type="voicemail" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { CommunicationIcon },
    template: `
      <div class="flex items-center gap-3">
        <CommunicationIcon type="call" direction="missed" size="sm" />
        <CommunicationIcon type="call" direction="missed" size="md" />
        <CommunicationIcon type="call" direction="missed" size="lg" />
      </div>
    `,
  }),
};

export const Decorative: Story = {
  render: () => ({
    components: { CommunicationIcon },
    template: `
      <div class="flex items-center gap-2 text-sm text-sg-muted-foreground">
        <CommunicationIcon type="voicemail" decorative size="sm" />
        <span>New voicemail from Anna de Vries</span>
      </div>
    `,
  }),
};
