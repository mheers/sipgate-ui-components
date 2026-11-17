import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Tabs from './Tabs.vue';
import TabsContent from './TabsContent.vue';
import TabsList from './TabsList.vue';
import TabsTrigger from './TabsTrigger.vue';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A segmented control built on reka-ui. Arrow keys move between tabs; the active tab is indicated by surface, not only colour.',
      },
    },
  },
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    template: `
      <Tabs default-value="all" class="w-full max-w-lg">
        <TabsList aria-label="Communication filter">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="missed">Missed</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <p class="text-sm text-sg-muted-foreground">Every call, message and fax, newest first.</p>
        </TabsContent>
        <TabsContent value="missed">
          <p class="text-sm text-sg-muted-foreground">Only calls that nobody picked up.</p>
        </TabsContent>
        <TabsContent value="messages">
          <p class="text-sm text-sg-muted-foreground">SMS threads and fax confirmations.</p>
        </TabsContent>
      </Tabs>
    `,
  }),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCounts: Story = {
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    template: `
      <Tabs default-value="calls" class="w-full max-w-lg">
        <TabsList aria-label="History">
          <TabsTrigger value="calls">Calls <span class="sg-numeric text-[0.6875rem] text-sg-subtle-foreground">18</span></TabsTrigger>
          <TabsTrigger value="messages">Messages <span class="sg-numeric text-[0.6875rem] text-sg-subtle-foreground">4</span></TabsTrigger>
          <TabsTrigger value="faxes">Faxes</TabsTrigger>
        </TabsList>
        <TabsContent value="calls">
          <div class="rounded-sg border border-dashed border-sg-border-strong p-4 text-sm text-sg-muted-foreground">18 calls in the selected period.</div>
        </TabsContent>
        <TabsContent value="messages">
          <div class="rounded-sg border border-dashed border-sg-border-strong p-4 text-sm text-sg-muted-foreground">4 messages in the selected period.</div>
        </TabsContent>
        <TabsContent value="faxes">
          <div class="rounded-sg border border-dashed border-sg-border-strong p-4 text-sm text-sg-muted-foreground">No faxes in the selected period.</div>
        </TabsContent>
      </Tabs>
    `,
  }),
};
