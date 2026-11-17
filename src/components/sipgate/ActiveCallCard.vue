<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Mic, MicOff, Pause, Phone, PhoneOff, Play } from 'lucide-vue-next';
import Avatar from '../ui/Avatar.vue';
import Badge from '../ui/Badge.vue';
import Button from '../ui/Button.vue';
import CallTimer from './CallTimer.vue';
import CommunicationIcon from './CommunicationIcon.vue';
import { formatPhoneNumber } from '../../lib/phone';
import { cn } from '../../lib/cn';
import type { CallState, CommunicationDirection } from '../../lib/types';
import type { DateInput } from '../../lib/format';

const props = withDefaults(
  defineProps<{
    number: string;
    name?: string;
    direction?: CommunicationDirection;
    state?: CallState;
    startedAt?: DateInput;
    muted?: boolean;
    recording?: boolean;
    country?: string;
    class?: string;
  }>(),
  {
    direction: 'inbound',
    state: 'active',
    muted: false,
    recording: false,
    country: 'DE',
  },
);

const emit = defineEmits<{
  answer: [];
  hangup: [];
  'toggle-mute': [];
  'toggle-hold': [];
}>();

const mountedAt = ref(new Date());
onMounted(() => {
  mountedAt.value = new Date();
});

const display = computed(() =>
  formatPhoneNumber(props.number, { country: props.country, format: 'international' }),
);
const callStartedAt = computed(() => props.startedAt ?? mountedAt.value);
const isLive = computed(() => props.state === 'active' || props.state === 'held');
const statusLabel = computed(() => {
  if (props.state === 'ringing') {
    return props.direction === 'outbound' ? 'Calling' : 'Incoming call';
  }
  if (props.state === 'held') return 'On hold';
  return 'In call';
});
const directionLabel = computed(() =>
  props.direction === 'outbound' ? 'Outgoing call' : 'Incoming call',
);
</script>

<template>
  <section
    :class="
      cn(
        'relative overflow-hidden rounded-sg-xl bg-sg-surface-inverse p-5 text-sg-inverse-foreground shadow-sg-lg',
        props.class,
      )
    "
    :aria-label="`${statusLabel}: ${name || display}`"
  >
    <span
      :class="
        cn(
          'absolute inset-y-0 left-0 w-1',
          state === 'held' ? 'bg-sg-warning' : 'bg-sg-accent',
          state !== 'held' && 'animate-sg-pulse',
        )
      "
      aria-hidden="true"
    />

    <div class="flex items-start justify-between gap-3 pl-1.5">
      <div class="flex items-center gap-2">
        <span class="relative flex size-2">
          <span
            class="absolute inline-flex size-full rounded-full bg-sg-accent"
            :class="state === 'held' ? 'opacity-60' : 'animate-sg-pulse'"
          />
        </span>
        <span
          class="text-[0.6875rem] font-medium tracking-[0.14em] text-sg-inverse-foreground/65 uppercase"
          aria-live="polite"
        >
          {{ direction === 'outbound' && state === 'ringing' ? 'Outgoing' : statusLabel }}
        </span>
      </div>
      <div class="flex flex-wrap items-center justify-end gap-1.5">
        <Badge v-if="recording" variant="accent" size="sm" dot>REC</Badge>
        <Badge v-if="muted" variant="neutral" size="sm">Muted</Badge>
        <Badge v-if="state === 'held'" variant="warning" size="sm">On hold</Badge>
      </div>
    </div>

    <div class="mt-5 flex items-start gap-4 pl-1.5">
      <CommunicationIcon type="call" :direction="direction" size="lg" decorative />
      <div class="min-w-0 flex-1">
        <p class="truncate font-sg-display text-xl font-semibold tracking-[-0.02em]">
          {{ name || display }}
        </p>
        <p v-if="name" class="mt-0.5 truncate text-sm text-sg-inverse-foreground/65">
          {{ display }}
        </p>
        <p v-else class="mt-0.5 text-sm text-sg-inverse-foreground/65">Unknown caller</p>
      </div>
      <div class="shrink-0 text-right">
        <CallTimer v-if="isLive" :started-at="callStartedAt" size="xl" tone="inverse" />
        <span
          v-else
          class="inline-flex items-center gap-2 rounded-full bg-sg-inverse-foreground/10 px-3 py-1.5 text-sm font-medium"
        >
          <span class="size-1.5 animate-sg-pulse rounded-full bg-sg-accent" aria-hidden="true" />
          {{ direction === 'outbound' ? 'Calling' : 'Ringing' }}
        </span>
      </div>
    </div>

    <div
      class="mt-5 flex flex-wrap items-center gap-2 border-t border-sg-inverse-foreground/12 pt-4"
    >
      <template v-if="state === 'ringing'">
        <template v-if="direction === 'outbound'">
          <Button variant="destructive" class="flex-1 sm:flex-none" @click="emit('hangup')">
            <PhoneOff aria-hidden="true" />
            Cancel call
          </Button>
        </template>
        <template v-else>
          <Button variant="accent" class="flex-1 sm:flex-none" @click="emit('answer')">
            <Phone aria-hidden="true" />
            Answer
          </Button>
          <Button variant="inverse-outline" class="flex-1 sm:flex-none" @click="emit('hangup')">
            <PhoneOff aria-hidden="true" />
            Decline
          </Button>
        </template>
      </template>

      <template v-else>
        <Button
          variant="inverse-ghost"
          size="icon-lg"
          :title="muted ? 'Unmute microphone' : 'Mute microphone'"
          :aria-label="muted ? 'Unmute microphone' : 'Mute microphone'"
          :aria-pressed="muted"
          @click="emit('toggle-mute')"
        >
          <MicOff v-if="muted" aria-hidden="true" />
          <Mic v-else aria-hidden="true" />
        </Button>
        <Button
          variant="inverse-ghost"
          size="icon-lg"
          :title="state === 'held' ? 'Resume call' : 'Hold call'"
          :aria-label="state === 'held' ? 'Resume call' : 'Hold call'"
          :aria-pressed="state === 'held'"
          @click="emit('toggle-hold')"
        >
          <Play v-if="state === 'held'" aria-hidden="true" />
          <Pause v-else aria-hidden="true" />
        </Button>
        <div class="flex flex-1 items-center justify-end gap-2">
          <slot name="actions" />
          <Button
            variant="destructive"
            size="icon-lg"
            title="Hang up"
            aria-label="Hang up call"
            @click="emit('hangup')"
          >
            <PhoneOff aria-hidden="true" />
          </Button>
        </div>
      </template>
    </div>

    <p class="sr-only">{{ directionLabel }}</p>
  </section>
</template>
