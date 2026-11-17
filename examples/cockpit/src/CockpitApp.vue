<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  ArrowRightLeft,
  Bell,
  ChevronRight,
  Hash,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Moon,
  Phone,
  Plus,
  Settings,
  Smartphone,
  Sun,
  Users,
  Voicemail,
  Wallet,
} from 'lucide-vue-next';
import {
  AccountBalance,
  ActiveCallCard,
  Avatar,
  Badge,
  Button,
  CallHistoryList,
  ConnectionStatus,
  ContactListItem,
  DeviceStatusBadge,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  EmptyState,
  Input,
  Label,
  PageHeader,
  PhoneNumber,
  Separator,
  SignalMark,
  SmsComposer,
  VoicemailPlayer,
} from '@mheers/sipgate-ui-components';
import { formatPhoneNumber } from '@mheers/sipgate-ui-components';
import type { Contact, HistoryEntry } from '@mheers/sipgate-ui-components';
import {
  activeCall,
  contacts as contactFixtures,
  devices,
  historyEntries as historyFixtures,
  voicemail,
} from '@/storybook/data';

const dark = ref(false);
const activeNav = ref('Overview');
const navigation = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Calls', icon: Phone, badge: '2' },
  { label: 'Messages', icon: MessageSquare, badge: '4' },
  { label: 'Contacts', icon: Users },
  { label: 'Numbers', icon: Hash },
  { label: 'Devices', icon: Smartphone },
  { label: 'Settings', icon: Settings },
];

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 11) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
});
const today = computed(() =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date()),
);

// ---- Call state ----------------------------------------------------------
const callActive = ref(true);
const callStartedAt = ref(activeCall.startedAt);
const muted = ref(false);
const held = ref(false);
const callDialogOpen = ref(false);
const callTarget = ref('+49 151 23456789');

function startCall() {
  callStartedAt.value = new Date();
  muted.value = false;
  held.value = false;
  callActive.value = true;
  callDialogOpen.value = false;
}

function endCall() {
  callActive.value = false;
}

// ---- History -------------------------------------------------------------
const entries = ref<HistoryEntry[]>([...historyFixtures]);
const filters = ['all', 'missed'] as const;
const filter = ref<(typeof filters)[number]>('all');
const filteredEntries = computed(() =>
  filter.value === 'all'
    ? entries.value
    : entries.value.filter((entry) => entry.direction === 'missed'),
);
const selectedEntry = ref<HistoryEntry | null>(null);
const historyDialogOpen = ref(false);

function openEntry(entry: HistoryEntry) {
  selectedEntry.value = entry;
  historyDialogOpen.value = true;
}

// ---- Contacts ------------------------------------------------------------
const contactList = ref<Contact[]>(contactFixtures.map((contact) => ({ ...contact })));

function toggleFavorite(contact: Contact) {
  const target = contactList.value.find((item) => item.id === contact.id);
  if (target) target.favorite = !target.favorite;
}

// ---- Messages ------------------------------------------------------------
const composer = ref<HTMLElement | null>(null);
const message = ref('');
const recipient = ref('+4915123456789');
const sentNotice = ref('');

function focusComposer() {
  composer.value?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function useRecipient(contact: Contact) {
  recipient.value = contact.numbers?.[0] ?? '';
  focusComposer();
}

function sendMessage(payload: { message: string; recipient: string }) {
  sentNotice.value = `Message to ${formatPhoneNumber(payload.recipient)} queued — ${payload.message.length} characters.`;
  message.value = '';
}
</script>

<template>
  <div :class="['sg-root flex min-h-dvh bg-sg-background text-sg-foreground', dark && 'sg-dark']">
    <!-- Sidebar ---------------------------------------------------------- -->
    <aside class="hidden w-60 shrink-0 flex-col border-r border-sg-border bg-sg-surface lg:flex">
      <div class="flex items-center gap-2.5 px-5 pt-5 pb-4">
        <span class="text-sg-primary"><SignalMark :size="24" /></span>
        <div>
          <p class="font-sg-display text-sm leading-none font-semibold tracking-tight">sipgate</p>
          <p
            class="mt-1 font-sg-mono text-[0.5625rem] tracking-[0.18em] text-sg-subtle-foreground uppercase"
          >
            cockpit
          </p>
        </div>
      </div>

      <nav class="mt-2 flex-1 space-y-1 px-2" aria-label="Main">
        <a
          v-for="item in navigation"
          :key="item.label"
          href="#"
          :aria-current="activeNav === item.label ? 'page' : undefined"
          class="flex items-center gap-2.5 rounded-sg px-3 py-2 text-sm transition-colors"
          :class="
            activeNav === item.label
              ? 'bg-sg-primary-soft font-medium text-sg-primary-strong'
              : 'text-sg-muted-foreground hover:bg-sg-surface-muted hover:text-sg-foreground'
          "
          @click.prevent="activeNav = item.label"
        >
          <component :is="item.icon" class="size-4" aria-hidden="true" />
          <span class="flex-1">{{ item.label }}</span>
          <Badge v-if="item.badge" size="sm" variant="primary">{{ item.badge }}</Badge>
        </a>
      </nav>

      <div class="border-t border-sg-border p-3">
        <div class="flex items-center gap-2.5 rounded-sg p-2">
          <Avatar name="Marcel Heers" size="sm" status="online" decorative />
          <div class="min-w-0 flex-1">
            <p class="truncate text-xs font-medium">Marcel Heers</p>
            <p class="truncate text-[0.625rem] text-sg-muted-foreground">sipgate basic</p>
          </div>
          <button
            type="button"
            class="rounded-sm p-1 text-sg-subtle-foreground outline-none hover:text-sg-foreground focus-visible:ring-2 focus-visible:ring-sg-ring"
            aria-label="Sign out"
          >
            <LogOut class="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main -------------------------------------------------------------- -->
    <div class="flex min-w-0 flex-1 flex-col">
      <header
        class="backdrop-blur flex items-center justify-between gap-4 border-b border-sg-border bg-sg-background/85 px-5 py-3 lg:px-8"
      >
        <div class="flex items-center gap-2.5 lg:hidden">
          <span class="text-sg-primary"><SignalMark :size="22" /></span>
          <span class="font-sg-display text-sm font-semibold">sipgate cockpit</span>
        </div>

        <div class="hidden items-center gap-4 lg:flex">
          <ConnectionStatus state="connected" label="Realtime connected" size="sm" />
          <Separator orientation="vertical" class="h-4" />
          <span class="text-xs text-sg-muted-foreground">
            Main number
            <PhoneNumber
              value="+49 30 12345678"
              size="sm"
              tone="default"
              :link="false"
              copyable
              class="ml-1"
            />
          </span>
        </div>

        <div class="flex items-center gap-1.5">
          <button
            type="button"
            class="relative inline-flex size-8 items-center justify-center rounded-sg-sm text-sg-muted-foreground transition-colors outline-none hover:bg-sg-surface-muted hover:text-sg-foreground focus-visible:ring-2 focus-visible:ring-sg-ring"
            aria-label="Notifications"
          >
            <Bell class="size-4" aria-hidden="true" />
            <span class="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-sg-accent" />
          </button>
          <Button
            variant="outline"
            size="icon-sm"
            :aria-label="dark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="dark = !dark"
          >
            <Sun v-if="dark" aria-hidden="true" />
            <Moon v-else aria-hidden="true" />
          </Button>
        </div>
      </header>

      <main class="mx-auto w-full max-w-6xl px-5 py-6 lg:px-8">
        <PageHeader
          :eyebrow="today"
          :title="`${greeting}, Marcel`"
          description="Two missed calls, four new messages and a voicemail waiting. Your line is connected."
        >
          <template #actions>
            <Button variant="outline" size="sm" @click="callDialogOpen = true">
              <Phone aria-hidden="true" />
              Start call
            </Button>
            <Button size="sm" @click="focusComposer">
              <Plus aria-hidden="true" />
              New message
            </Button>
          </template>
          <template #meta>
            <span class="inline-flex items-center gap-1.5">
              <Phone class="size-3" aria-hidden="true" /> 18 calls today
            </span>
            <span class="inline-flex items-center gap-1.5">
              <MessageSquare class="size-3" aria-hidden="true" /> 4 messages
            </span>
            <span class="inline-flex items-center gap-1.5">
              <Voicemail class="size-3" aria-hidden="true" /> 2 voicemails
            </span>
          </template>
        </PageHeader>

        <div class="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
          <!-- Primary column -------------------------------------------- -->
          <div class="min-w-0 space-y-6">
            <ActiveCallCard
              v-if="callActive"
              :name="activeCall.name"
              :number="activeCall.number"
              :direction="activeCall.direction"
              :state="held ? 'held' : 'active'"
              :started-at="callStartedAt"
              :muted="muted"
              :recording="true"
              @toggle-mute="muted = !muted"
              @toggle-hold="held = !held"
              @hangup="endCall"
            >
              <template #actions>
                <Button
                  variant="inverse-ghost"
                  size="icon-lg"
                  title="Transfer call"
                  aria-label="Transfer call"
                >
                  <ArrowRightLeft aria-hidden="true" />
                </Button>
              </template>
            </ActiveCallCard>

            <EmptyState
              v-else
              title="Call ended"
              description="The conversation with Anna de Vries was saved to your history with the recording and notes."
              compact
            >
              <Button size="sm" @click="startCall">Call Anna again</Button>
            </EmptyState>

            <section
              class="overflow-hidden rounded-sg-lg border border-sg-border bg-sg-surface shadow-sg-xs"
            >
              <div
                class="flex items-center justify-between gap-3 border-b border-sg-border px-4 py-3"
              >
                <div class="flex items-center gap-2">
                  <h2 class="font-sg-display text-sm font-semibold tracking-[-0.01em]">
                    Recent activity
                  </h2>
                  <Badge size="sm" variant="primary">{{ filteredEntries.length }}</Badge>
                </div>
                <div class="flex items-center gap-1">
                  <button
                    v-for="option in filters"
                    :key="option"
                    type="button"
                    class="rounded-full px-2.5 py-1 text-[0.6875rem] font-medium capitalize transition-colors outline-none focus-visible:ring-2 focus-visible:ring-sg-ring"
                    :class="
                      filter === option
                        ? 'bg-sg-foreground text-sg-background'
                        : 'text-sg-muted-foreground hover:bg-sg-surface-muted hover:text-sg-foreground'
                    "
                    :aria-pressed="filter === option"
                    :aria-label="option === 'all' ? 'Show all communications' : 'Show missed calls'"
                    @click="filter = option"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
              <div class="p-2 sm:p-3">
                <CallHistoryList :entries="filteredEntries" @select="openEntry" />
              </div>
            </section>

            <div ref="composer" class="scroll-mt-24">
              <SmsComposer
                v-model="message"
                v-model:recipient="recipient"
                title="New message"
                @send="sendMessage"
              />
              <p
                v-if="sentNotice"
                class="mt-2 rounded-sg border border-sg-success/30 bg-sg-success-soft px-3 py-2 text-xs text-sg-success"
              >
                {{ sentNotice }}
              </p>
            </div>
          </div>

          <!-- Rail ------------------------------------------------------ -->
          <aside class="space-y-6">
            <AccountBalance
              :amount="42.8"
              account-name="Marcel Heers · sipgate basic"
              :low-threshold="5"
            >
              <template #actions>
                <Button size="sm" variant="accent"><Wallet /> Top up</Button>
              </template>
              <template #meta>
                <span>Next invoice 1 Dec</span>
                <ConnectionStatus state="connected" size="sm" tone="inverse" />
              </template>
            </AccountBalance>

            <section class="rounded-sg-lg border border-sg-border bg-sg-surface shadow-sg-xs">
              <div class="flex items-center justify-between gap-2 px-4 pt-4 pb-2">
                <h2 class="font-sg-display text-sm font-semibold tracking-[-0.01em]">Contacts</h2>
                <Button variant="ghost" size="icon-sm" aria-label="Add contact"><Plus /></Button>
              </div>
              <ul class="px-2 pb-2">
                <li v-for="contact in contactList.slice(0, 3)" :key="contact.id">
                  <ContactListItem
                    :contact="contact"
                    @select="useRecipient"
                    @toggle-favorite="toggleFavorite"
                  />
                </li>
              </ul>
              <div class="border-t border-sg-border px-4 py-2.5">
                <a
                  href="#"
                  class="inline-flex items-center gap-1 text-xs font-medium text-sg-primary hover:underline"
                  @click.prevent="activeNav = 'Contacts'"
                >
                  All contacts <ChevronRight class="size-3" aria-hidden="true" />
                </a>
              </div>
            </section>

            <VoicemailPlayer v-bind="voicemail" :listened="false" />

            <section class="rounded-sg-lg border border-sg-border bg-sg-surface shadow-sg-xs">
              <div class="flex items-center justify-between gap-2 px-4 pt-4 pb-2">
                <h2 class="font-sg-display text-sm font-semibold tracking-[-0.01em]">Devices</h2>
                <Badge size="sm" variant="success" dot
                  >{{ devices.filter((device) => device.status === 'online').length }} online</Badge
                >
              </div>
              <ul class="space-y-1 px-2 pb-2">
                <li
                  v-for="device in devices.slice(0, 3)"
                  :key="device.id"
                  class="flex items-center justify-between gap-2 rounded-sg px-2 py-2 hover:bg-sg-surface-muted/70"
                >
                  <div class="min-w-0">
                    <p class="truncate text-xs font-medium">{{ device.name }}</p>
                    <p class="truncate text-[0.625rem] text-sg-muted-foreground">
                      {{ device.alias || device.model }}
                    </p>
                  </div>
                  <DeviceStatusBadge :status="device.status" size="sm" />
                </li>
              </ul>
              <div class="border-t border-sg-border px-4 py-2.5">
                <a
                  href="#"
                  class="inline-flex items-center gap-1 text-xs font-medium text-sg-primary hover:underline"
                  @click.prevent="activeNav = 'Devices'"
                >
                  Manage devices <ChevronRight class="size-3" aria-hidden="true" />
                </a>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>

    <!-- Start-call dialog ------------------------------------------------- -->
    <Dialog v-model:open="callDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start a call</DialogTitle>
          <DialogDescription>
            Your desk phone rings first. Pick up and the call is connected.
          </DialogDescription>
        </DialogHeader>
        <div class="mt-5 space-y-1.5">
          <Label for="call-number">Number</Label>
          <Input id="call-number" v-model="callTarget" type="tel" placeholder="+49 30 12345678">
            <template #leading><Phone /></template>
          </Input>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button @click="startCall"><Phone /> Call now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- History detail dialog --------------------------------------------- -->
    <Dialog v-model:open="historyDialogOpen">
      <DialogContent v-if="selectedEntry">
        <DialogHeader>
          <DialogTitle>{{ selectedEntry.name || selectedEntry.number }}</DialogTitle>
          <DialogDescription>
            {{ selectedEntry.type }} · {{ selectedEntry.direction }} ·
            {{ selectedEntry.note || 'No note' }}
          </DialogDescription>
        </DialogHeader>
        <div class="mt-4 space-y-2 rounded-sg bg-sg-surface-muted p-4 text-sm">
          <div class="flex justify-between gap-4">
            <span class="text-sg-muted-foreground">Number</span>
            <PhoneNumber :value="selectedEntry.number" size="sm" />
          </div>
          <div
            v-if="selectedEntry.durationSeconds !== undefined"
            class="flex justify-between gap-4"
          >
            <span class="text-sg-muted-foreground">Duration</span>
            <span class="sg-numeric text-sm">{{ selectedEntry.durationSeconds }} s</span>
          </div>
          <div class="flex justify-between gap-4">
            <span class="text-sg-muted-foreground">Recording</span>
            <span>{{ selectedEntry.recording ? 'Available' : 'None' }}</span>
          </div>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button><Phone /> Call back</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
