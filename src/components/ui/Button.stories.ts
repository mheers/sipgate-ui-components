import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ArrowRight, Plus, Trash2 } from 'lucide-vue-next';
import Button from './Button.vue';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The primary action element. Variants map to intent — violet for the main action, lime for answering, red for hanging up or deleting. Every button has a visible focus ring and a loading state that preserves its width.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'outline',
        'ghost',
        'destructive',
        'link',
        'inverse',
        'inverse-ghost',
        'inverse-outline',
      ],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    block: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    block: false,
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Save changes</Button>',
  }),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="accent">Answer</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Hang up</Button>
        <Button variant="link">Link</Button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Add"><Plus /></Button>
        <Button size="icon-sm" aria-label="Add"><Plus /></Button>
        <Button size="icon-lg" aria-label="Add"><Plus /></Button>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    components: { Button, Plus, ArrowRight, Trash2 },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button><Plus /> New message</Button>
        <Button variant="outline">Open history <ArrowRight /></Button>
        <Button variant="destructive"><Trash2 /> Delete contact</Button>
      </div>
    `,
  }),
};

export const Loading: Story = {
  args: { loading: true },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Sending…</Button>',
  }),
};

export const OnInverse: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="inline-flex flex-wrap items-center gap-3 rounded-sg-lg bg-sg-surface-inverse p-4">
        <Button variant="accent">Answer</Button>
        <Button variant="inverse">Transfer</Button>
        <Button variant="inverse-ghost">Mute</Button>
        <Button variant="inverse-outline">Decline</Button>
        <Button variant="destructive">Hang up</Button>
      </div>
    `,
  }),
};

export const FullWidth: Story = {
  args: { block: true },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<div class="w-80"><Button v-bind="args">Sign in to sipgate</Button></div>',
  }),
};
