import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Avatar from './Avatar.vue';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Initials on a stable, name-derived colour. The palette is tuned for AA contrast in both themes and deliberately avoids the usual random rainbow.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'inline-radio', options: ['circle', 'rounded'] },
    status: { control: 'select', options: [undefined, 'online', 'offline', 'busy', 'away'] },
  },
  args: { name: 'Anna de Vries', size: 'md', shape: 'circle' },
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: '<Avatar v-bind="args" />',
  }),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-end gap-3">
        <Avatar name="Anna de Vries" size="xs" />
        <Avatar name="Anna de Vries" size="sm" />
        <Avatar name="Anna de Vries" size="md" />
        <Avatar name="Anna de Vries" size="lg" />
        <Avatar name="Anna de Vries" size="xl" />
      </div>
    `,
  }),
};

export const Presence: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-3">
        <Avatar name="Anna de Vries" status="online" />
        <Avatar name="Ben Okafor" status="busy" />
        <Avatar name="Clara Neumann" status="away" />
        <Avatar name="Tobias Krüger" status="offline" />
      </div>
    `,
  }),
};

export const Tones: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <Avatar v-for="name in ['Anna de Vries', 'Ben Okafor', 'Clara Neumann', 'Jonas Weber', 'Tobias Krüger', 'Mia Hoffmann', 'Studio Nord', 'sipgate Support']" :key="name" :name="name" />
      </div>
    `,
  }),
};

export const Rounded: Story = {
  args: { shape: 'rounded', size: 'lg' },
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: '<Avatar v-bind="args" status="online" />',
  }),
};
