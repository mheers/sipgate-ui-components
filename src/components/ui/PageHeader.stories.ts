import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Phone, Plus } from 'lucide-vue-next';
import Button from './Button.vue';
import PageHeader from './PageHeader.vue';
import ConnectionStatus from '../sipgate/ConnectionStatus.vue';

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The first block of a page: an optional breadcrumb, an eyebrow, a display title, and room for actions and metadata. It ends with a hairline so the content below feels anchored.',
      },
    },
  },
  args: {
    eyebrow: 'sipgate cockpit',
    title: 'Call history',
    description:
      'Every conversation across your numbers, with recordings, notes and the devices that handled them.',
  },
  render: (args) => ({
    components: { PageHeader, Button, ConnectionStatus, Phone, Plus },
    setup: () => ({ args }),
    template: `
      <PageHeader v-bind="args">
        <template #actions>
          <ConnectionStatus state="connected" />
          <Button size="sm"><Plus /> New message</Button>
        </template>
        <template #meta>
          <span>18 calls today</span>
          <span>·</span>
          <span>4 messages</span>
          <span>·</span>
          <span>2 voicemails</span>
        </template>
      </PageHeader>
    `,
  }),
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBreadcrumb: Story = {
  render: () => ({
    components: { PageHeader, Button, Phone },
    template: `
      <PageHeader
        eyebrow="Contacts"
        title="Anna de Vries"
        description="Denim Studio · Client since 2023"
      >
        <template #breadcrumb>
          <span class="text-sg-muted-foreground">Contacts</span>
          <span class="mx-1.5 text-sg-border-strong">/</span>
          <span class="text-sg-foreground">Anna de Vries</span>
        </template>
        <template #actions>
          <Button size="sm"><Phone /> Call</Button>
        </template>
      </PageHeader>
    `,
  }),
};
