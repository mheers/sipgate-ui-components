import type { Meta, StoryObj } from '@storybook/vue3-vite';
import PhoneNumber from './PhoneNumber.vue';

const meta = {
  title: 'sipgate/PhoneNumber',
  component: PhoneNumber,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Formats a number for reading, with an optional `tel:` link and copy action. German numbers are grouped by area code — mobiles keep the 151/160/170 prefix, landlines split the subscriber into two readable halves. Other countries fall back to sensible groupings.',
      },
    },
  },
  argTypes: {
    format: { control: 'inline-radio', options: ['international', 'national', 'raw'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'inline-radio', options: ['default', 'muted', 'inverse'] },
    link: { control: 'boolean' },
    copyable: { control: 'boolean' },
    mono: { control: 'boolean' },
  },
  args: {
    value: '+49 151 23456789',
    format: 'international',
    size: 'md',
    tone: 'default',
    link: true,
    copyable: false,
    mono: true,
  },
  render: (args) => ({
    components: { PhoneNumber },
    setup: () => ({ args }),
    template: '<PhoneNumber v-bind="args" />',
  }),
} satisfies Meta<typeof PhoneNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Formats: Story = {
  render: () => ({
    components: { PhoneNumber },
    template: `
      <div class="space-y-2">
        <div><p class="mb-1 text-xs text-sg-muted-foreground">International</p><PhoneNumber value="+49 30 12345678" /></div>
        <div><p class="mb-1 text-xs text-sg-muted-foreground">National</p><PhoneNumber value="+49 30 12345678" format="national" /></div>
        <div><p class="mb-1 text-xs text-sg-muted-foreground">Raw</p><PhoneNumber value="+49 30 12345678" format="raw" /></div>
        <div><p class="mb-1 text-xs text-sg-muted-foreground">US national</p><PhoneNumber value="+14155551234" format="national" country="US" /></div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { PhoneNumber },
    template: `
      <div class="flex items-baseline gap-4">
        <PhoneNumber value="+49 30 12345678" size="sm" />
        <PhoneNumber value="+49 30 12345678" size="md" />
        <PhoneNumber value="+49 30 12345678" size="lg" />
      </div>
    `,
  }),
};

export const Copyable: Story = {
  args: { copyable: true },
};

export const OnInverse: Story = {
  args: { tone: 'inverse', copyable: true, size: 'lg' },
  render: (args) => ({
    components: { PhoneNumber },
    setup: () => ({ args }),
    template: `
      <div class="inline-flex rounded-sg-lg bg-sg-surface-inverse p-4 text-sg-inverse-foreground">
        <PhoneNumber v-bind="args" />
      </div>
    `,
  }),
};

export const WithoutLink: Story = {
  args: { link: false },
};
