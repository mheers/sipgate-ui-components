import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Label from './Label.vue';
import Textarea from './Textarea.vue';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line text with an optional `autoResize` mode. Use it for notes and transcripts; the SMS composer has its own character-aware field.',
      },
    },
  },
  argTypes: {
    autoResize: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    rows: { control: 'number' },
  },
  args: {
    placeholder: 'Add a note to this call…',
    rows: 4,
    autoResize: false,
    invalid: false,
    disabled: false,
  },
  render: (args) => ({
    components: { Textarea },
    setup: () => ({ args }),
    template: '<div class="w-96"><Textarea v-bind="args" /></div>',
  }),
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => ({
    components: { Textarea, Label },
    template: `
      <div class="w-96 space-y-1.5">
        <Label for="note">Internal note</Label>
        <Textarea id="note" placeholder="Only visible to your team…" />
        <p class="text-xs text-sg-muted-foreground">Notes are stored with the call history entry.</p>
      </div>
    `,
  }),
};

export const AutoResize: Story = {
  args: { autoResize: true, rows: 2 },
  render: (args) => ({
    components: { Textarea },
    setup: () => ({ args }),
    template:
      '<div class="w-96"><Textarea v-bind="args" model-value="This field grows with the content. Add a line and watch it expand without a scrollbar." /></div>',
  }),
};

export const Invalid: Story = {
  args: { invalid: true },
  render: (args) => ({
    components: { Textarea },
    setup: () => ({ args }),
    template: '<div class="w-96"><Textarea v-bind="args" model-value="Too short" /></div>',
  }),
};
