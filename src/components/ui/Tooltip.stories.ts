import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Info } from 'lucide-vue-next';
import Button from './Button.vue';
import Tooltip from './Tooltip.vue';
import TooltipContent from './TooltipContent.vue';
import TooltipProvider from './TooltipProvider.vue';
import TooltipTrigger from './TooltipTrigger.vue';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A short, non-essential explanation. It opens on hover and focus, and the trigger stays keyboard reachable.',
      },
    },
  },
  render: () => ({
    components: { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button },
    template: `
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline">Hover or focus me</Button>
          </TooltipTrigger>
          <TooltipContent>Forward calls to +49 151 234 56789</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    `,
  }),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIconTrigger: Story = {
  render: () => ({
    components: { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button, Info },
    template: `
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon-sm" aria-label="About recording">
              <Info />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Recording starts when the call is answered.</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    `,
  }),
};

export const InContext: Story = {
  render: () => ({
    components: { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button, Info },
    template: `
      <div class="flex w-80 items-center justify-between rounded-sg-lg border border-sg-border bg-sg-surface p-4 shadow-sg-xs">
        <div>
          <p class="text-sm font-medium">Call recording</p>
          <p class="text-xs text-sg-muted-foreground">Stored for 90 days</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="ghost" size="icon-sm" aria-label="Recording details"><Info /></Button>
            </TooltipTrigger>
            <TooltipContent class="max-w-56">Recordings are encrypted at rest and deleted automatically after 90 days.</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    `,
  }),
};
