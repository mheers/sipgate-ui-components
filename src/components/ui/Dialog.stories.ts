import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Button from './Button.vue';
import Dialog from './Dialog.vue';
import DialogClose from './DialogClose.vue';
import DialogContent from './DialogContent.vue';
import DialogDescription from './DialogDescription.vue';
import DialogFooter from './DialogFooter.vue';
import DialogHeader from './DialogHeader.vue';
import DialogTitle from './DialogTitle.vue';
import DialogTrigger from './DialogTrigger.vue';
import Input from './Input.vue';
import Label from './Label.vue';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A focused task in a modal. The content traps focus, closes on Escape, and always renders a titled header for assistive tech. Use it for a single decisive step, not for navigation.',
      },
    },
  },
  render: () => ({
    components: {
      Dialog,
      DialogTrigger,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
      DialogClose,
      Button,
      Input,
      Label,
    },
    template: `
      <Dialog>
        <DialogTrigger as-child>
          <Button>Start a call</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start a call</DialogTitle>
            <DialogDescription>
              Dial a number or pick a contact. Your desk phone rings first, then the call is connected.
            </DialogDescription>
          </DialogHeader>
          <div class="mt-5 space-y-1.5">
            <Label for="dialog-number">Number</Label>
            <Input id="dialog-number" type="tel" placeholder="+49 30 12345678" model-value="+49 151 23456789" />
          </div>
          <DialogFooter>
            <DialogClose as-child>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Call now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DestructiveConfirmation: Story = {
  render: () => ({
    components: {
      Dialog,
      DialogTrigger,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
      DialogClose,
      Button,
    },
    template: `
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">Delete contact</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Anna de Vries?</DialogTitle>
            <DialogDescription>
              This removes the contact and its notes from every device. Call history is kept.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose as-child>
              <Button variant="outline">Keep contact</Button>
            </DialogClose>
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
};
