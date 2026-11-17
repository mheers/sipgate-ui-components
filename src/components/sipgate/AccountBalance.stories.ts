import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Receipt, Wallet } from 'lucide-vue-next';
import AccountBalance from './AccountBalance.vue';
import Button from '../ui/Button.vue';
import ConnectionStatus from './ConnectionStatus.vue';

const meta = {
  title: 'sipgate/AccountBalance',
  component: AccountBalance,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Available credit on the inverse surface. The amount is the only loud element; low balance is announced with a label as well as colour.',
      },
    },
  },
  argTypes: {
    amount: { control: 'number' },
    currency: { control: 'text' },
    lowThreshold: { control: 'number' },
    loading: { control: 'boolean' },
  },
  args: {
    amount: 42.8,
    currency: 'EUR',
    locale: 'de-DE',
    accountName: 'Marcel Heers · sipgate basic',
    lowThreshold: 5,
    loading: false,
  },
  render: (args) => ({
    components: { AccountBalance },
    setup: () => ({ args }),
    template: '<div class="max-w-sm"><AccountBalance v-bind="args" /></div>',
  }),
} satisfies Meta<typeof AccountBalance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LowBalance: Story = {
  args: { amount: 2.4, accountName: 'Studio Nord · sipgate team' },
};

export const Loading: Story = {
  args: { loading: true },
};

export const WithActions: Story = {
  render: () => ({
    components: { AccountBalance, Button, ConnectionStatus, Wallet, Receipt },
    template: `
      <div class="max-w-sm">
        <AccountBalance :amount="42.8" account-name="Marcel Heers · sipgate basic">
          <template #actions>
            <Button size="sm" variant="accent"><Wallet /> Top up</Button>
          </template>
          <template #meta>
            <span class="inline-flex items-center gap-1.5"><Receipt class="size-3.5" /> Next invoice 1 Dec</span>
            <ConnectionStatus state="connected" size="sm" tone="inverse" />
          </template>
        </AccountBalance>
      </div>
    `,
  }),
};
