import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Settings2 } from 'lucide-vue-next';
import Button from '../ui/Button.vue';
import DeviceCard from './DeviceCard.vue';
import { devices } from '../../storybook/data';

const meta = {
  title: 'sipgate/DeviceCard',
  component: DeviceCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An endpoint at a glance: kind, model or alias, presence and assigned numbers. Extra actions live in a footer so the card stays quiet until it is used.',
      },
    },
  },
  argTypes: {
    selected: { control: 'boolean' },
  },
  args: {
    device: devices[0],
    country: 'DE',
    selected: false,
  },
  render: (args) => ({
    components: { DeviceCard },
    setup: () => ({ args }),
    template: '<div class="max-w-sm"><DeviceCard v-bind="args" /></div>',
  }),
} satisfies Meta<typeof DeviceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const Grid: Story = {
  render: () => ({
    components: { DeviceCard },
    setup: () => ({ devices }),
    template: `
      <div class="grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DeviceCard v-for="device in devices" :key="device.id" :device="device" />
      </div>
    `,
  }),
};

export const WithActions: Story = {
  render: () => ({
    components: { DeviceCard, Button, Settings2 },
    setup: () => ({ devices }),
    template: `
      <div class="grid max-w-4xl gap-4 sm:grid-cols-2">
        <DeviceCard v-for="device in devices.slice(0, 2)" :key="device.id" :device="device">
          <template #actions>
            <Button variant="ghost" size="icon-sm" aria-label="Device settings"><Settings2 /></Button>
          </template>
        </DeviceCard>
      </div>
    `,
  }),
};
