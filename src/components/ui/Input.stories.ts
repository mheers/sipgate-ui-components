import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Phone, Search } from 'lucide-vue-next';
import Input from './Input.vue';
import Label from './Label.vue';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A single-line field with an optional leading or trailing slot. Focus is shown on the wrapper so icons and affixes participate in the same ring.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: '+49 30 12345678',
    size: 'md',
    invalid: false,
    disabled: false,
  },
  render: (args) => ({
    components: { Input },
    setup: () => ({ args }),
    template: '<div class="w-80"><Input v-bind="args" /></div>',
  }),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => ({
    components: { Input, Label },
    template: `
      <div class="w-80 space-y-1.5">
        <Label for="phone">Phone number</Label>
        <Input id="phone" placeholder="+49 30 12345678" type="tel" />
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    components: { Input, Phone, Search },
    template: `
      <div class="w-80 space-y-3">
        <Input placeholder="Search contacts" type="search">
          <template #leading><Search /></template>
        </Input>
        <Input placeholder="+49 30 12345678" type="tel">
          <template #leading><Phone /></template>
        </Input>
      </div>
    `,
  }),
};

export const Invalid: Story = {
  args: { invalid: true },
  render: (args) => ({
    components: { Input, Label },
    setup: () => ({ args }),
    template: `
      <div class="w-80 space-y-1.5">
        <Label for="invalid">Phone number</Label>
        <Input id="invalid" v-bind="args" model-value="+49 30" />
        <p class="text-xs text-sg-danger">Enter the full number, including the area code.</p>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    components: { Input },
    setup: () => ({ args }),
    template: '<div class="w-80"><Input v-bind="args" model-value="+49 30 12345678" /></div>',
  }),
};
