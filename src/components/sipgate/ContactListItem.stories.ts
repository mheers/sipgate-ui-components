import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';
import ContactListItem from './ContactListItem.vue';
import { contacts } from '../../storybook/data';

const meta = {
  title: 'sipgate/ContactListItem',
  component: ContactListItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A compact contact row with a stable initial avatar, the primary number, and favourite pinning. The star is a separate control so favouriting never accidentally starts a call.',
      },
    },
  },
  args: {
    contact: contacts[0],
    country: 'DE',
    selected: false,
    showFavorite: true,
    onSelect: fn(),
    'onToggle-favorite': fn(),
  },
  render: (args) => ({
    components: { ContactListItem },
    setup: () => ({ args }),
    template: '<div class="max-w-md"><ContactListItem v-bind="args" /></div>',
  }),
} satisfies Meta<typeof ContactListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const WithoutFavoriteControl: Story = {
  args: { showFavorite: false },
};

export const WithoutPhoneNumber: Story = {
  args: {
    contact: {
      id: 'contact-x',
      name: 'Studio Nord',
      email: 'hello@studionord.de',
      company: 'Studio Nord',
      tags: ['Studio'],
    },
  },
};

export const List: Story = {
  render: () => ({
    components: { ContactListItem },
    setup: () => ({ contacts }),
    template: `
      <div class="max-w-md space-y-1">
        <ContactListItem v-for="contact in contacts" :key="contact.id" :contact="contact" />
      </div>
    `,
  }),
};
