import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Phone, Settings2 } from 'lucide-vue-next';
import Avatar from './Avatar.vue';
import Badge from './Badge.vue';
import Button from './Button.vue';
import Card from './Card.vue';
import CardContent from './CardContent.vue';
import CardDescription from './CardDescription.vue';
import CardFooter from './CardFooter.vue';
import CardHeader from './CardHeader.vue';
import CardTitle from './CardTitle.vue';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A quiet surface for grouped content. The header, content and footer subcomponents keep spacing consistent; `inverse` is reserved for moments that should read like a control panel, such as a live call or a balance.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'muted', 'inverse', 'outline'] },
    interactive: { control: 'boolean' },
  },
  args: { variant: 'default', interactive: false },
  render: (args) => ({
    components: {
      Card,
      CardHeader,
      CardTitle,
      CardDescription,
      CardContent,
      CardFooter,
      Button,
    },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args" class="max-w-sm">
        <CardHeader>
          <CardTitle>Call forwarding</CardTitle>
          <CardDescription>Send calls to your mobile when the desk phone is offline.</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-sg-muted-foreground">Forward to <span class="sg-numeric text-sg-foreground">+49 151 234 56789</span></p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Configure</Button>
          <Button size="sm" variant="ghost">Cancel</Button>
        </CardFooter>
      </Card>
    `,
  }),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ContactCard: Story = {
  render: () => ({
    components: {
      Card,
      CardContent,
      Avatar,
      Badge,
      Button,
      Phone,
      Settings2,
    },
    template: `
      <Card class="max-w-sm">
        <CardContent class="pt-5">
          <div class="flex items-start gap-3">
            <Avatar name="Anna de Vries" size="lg" status="online" />
            <div class="min-w-0 flex-1">
              <p class="font-sg-display text-base font-semibold">Anna de Vries</p>
              <p class="text-xs text-sg-muted-foreground">Denim Studio · Client</p>
              <div class="mt-2 flex gap-1.5">
                <Badge variant="success" size="sm" dot>Online</Badge>
                <Badge variant="outline" size="sm">Design</Badge>
              </div>
            </div>
          </div>
          <div class="mt-4 flex gap-2">
            <Button size="sm"><Phone /> Call</Button>
            <Button size="sm" variant="outline"><Settings2 /> Edit</Button>
          </div>
        </CardContent>
      </Card>
    `,
  }),
};

export const Inverse: Story = {
  args: { variant: 'inverse' },
  render: (args) => ({
    components: { Card, CardHeader, CardTitle, CardDescription, CardContent },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args" class="max-w-sm">
        <CardHeader>
          <CardTitle>Live call</CardTitle>
          <CardDescription class="text-sg-inverse-foreground/65">Anna de Vries · 01:42</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="font-sg-mono text-2xl text-sg-accent">REC</p>
        </CardContent>
      </Card>
    `,
  }),
};
