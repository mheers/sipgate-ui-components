import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Input from './Input.vue';
import Label from './Label.vue';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A small, typographically quiet form label. Set `required` to append a red asterisk that is hidden from assistive tech.',
      },
    },
  },
  args: { for: 'email', required: false },
  render: (args) => ({
    components: { Label },
    setup: () => ({ args }),
    template: '<Label v-bind="args">Email address</Label>',
  }),
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  render: () => ({
    components: { Label, Input },
    template: `
      <div class="w-80 space-y-1.5">
        <Label for="email" required>Email address</Label>
        <Input id="email" type="email" placeholder="anna@example.com" />
      </div>
    `,
  }),
};
