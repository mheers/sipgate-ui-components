<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Pause, Play } from 'lucide-vue-next';
import Badge from '../ui/Badge.vue';
import Card from '../ui/Card.vue';
import PhoneNumber from './PhoneNumber.vue';
import { cn } from '../../lib/cn';
import { formatDuration, formatRelativeTime } from '../../lib/format';
import type { DateInput } from '../../lib/format';

const props = withDefaults(
  defineProps<{
    src?: string;
    caller?: string;
    number?: string;
    receivedAt?: DateInput;
    durationSeconds?: number;
    transcript?: string;
    listened?: boolean;
    locale?: string;
    country?: string;
    class?: string;
  }>(),
  {
    locale: 'en-GB',
    country: 'DE',
    listened: true,
    durationSeconds: 0,
  },
);

const emit = defineEmits<{
  play: [];
  pause: [];
  ended: [];
  seek: [seconds: number];
  'mark-listened': [];
}>();

const audio = ref<HTMLAudioElement | null>(null);
const playing = ref(false);
const currentTime = ref(0);
const duration = ref(props.durationSeconds);
const expanded = ref(false);

const seed = computed(() => {
  const source = props.number || props.caller || 'voicemail';
  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) % 9973;
  }
  return hash;
});

const bars = computed(() =>
  Array.from({ length: 34 }, (_, index) => {
    const wave = Math.sin((seed.value + index * 13) * 0.7);
    const height = 26 + Math.abs(wave) * 58;
    return Math.round(height);
  }),
);

const progress = computed(() =>
  duration.value > 0 ? Math.min(100, (currentTime.value / duration.value) * 100) : 0,
);
const progressTime = computed(() => formatDuration(currentTime.value));
const durationLabel = computed(() => formatDuration(duration.value));
const longTranscript = computed(() => (props.transcript?.length ?? 0) > 180);

function toggle() {
  const element = audio.value;
  if (!element || !props.src) return;
  if (element.paused) {
    void element.play().catch(() => {
      playing.value = false;
    });
  } else {
    element.pause();
  }
}

function onLoadedMetadata() {
  if (!audio.value) return;
  if (Number.isFinite(audio.value.duration) && audio.value.duration > 0) {
    duration.value = audio.value.duration;
  }
}

function onSeek(event: Event) {
  const value = Number((event.target as HTMLInputElement).value);
  currentTime.value = value;
  if (audio.value) audio.value.currentTime = value;
  emit('seek', value);
}

function onEnded() {
  playing.value = false;
  currentTime.value = duration.value;
  emit('ended');
  if (!props.listened) emit('mark-listened');
}

watch(
  () => props.src,
  () => {
    playing.value = false;
    currentTime.value = 0;
    duration.value = props.durationSeconds;
  },
);

watch(
  () => props.durationSeconds,
  (value) => {
    // Until the browser has read real metadata, trust the caller's duration.
    if (!audio.value || !Number.isFinite(audio.value.duration) || audio.value.duration === 0) {
      duration.value = value;
    }
  },
);
</script>

<template>
  <Card :class="cn('overflow-hidden', props.class)">
    <div class="flex items-start gap-3 border-b border-sg-border p-4">
      <button
        type="button"
        class="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-sg-primary text-sg-primary-foreground shadow-sg-xs transition-[background-color,transform] outline-none hover:bg-sg-primary-hover focus-visible:ring-2 focus-visible:ring-sg-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sg-background active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="!src"
        :aria-label="playing ? 'Pause voicemail' : 'Play voicemail'"
        :title="src ? (playing ? 'Pause' : 'Play') : 'No recording available'"
        @click="toggle"
      >
        <Pause v-if="playing" class="size-4" aria-hidden="true" />
        <Play v-else class="size-4 translate-x-px" aria-hidden="true" />
      </button>

      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <p class="truncate text-sm font-medium text-sg-foreground">
                {{ caller || 'Unknown caller' }}
              </p>
              <Badge v-if="!listened" variant="accent" size="sm" dot>New</Badge>
            </div>
            <div class="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-sg-muted-foreground">
              <PhoneNumber
                v-if="number"
                :value="number"
                :country="country"
                size="sm"
                tone="muted"
                :link="false"
              />
              <template v-if="receivedAt">
                <span class="text-sg-border-strong" aria-hidden="true">·</span>
                <span class="truncate">{{ formatRelativeTime(receivedAt, { locale }) }}</span>
              </template>
            </div>
          </div>
          <slot name="actions" />
        </div>

        <div
          class="relative mt-3 flex h-9 items-center gap-[3px] rounded-sm focus-within:ring-2 focus-within:ring-sg-ring"
        >
          <span
            v-for="(height, index) in bars"
            :key="index"
            class="min-w-0 flex-1 rounded-full transition-colors duration-150"
            :class="
              (index / bars.length) * 100 < progress ? 'bg-sg-primary' : 'bg-sg-border-strong'
            "
            :style="{ height: `${height}%` }"
            aria-hidden="true"
          />
          <input
            type="range"
            min="0"
            :max="Math.max(duration, 0.1)"
            step="0.1"
            :value="currentTime"
            :disabled="!src"
            class="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0 disabled:cursor-not-allowed"
            aria-label="Seek recording"
            :aria-valuetext="`${progressTime} of ${durationLabel}`"
            @input="onSeek"
          />
        </div>

        <div
          class="mt-1 flex items-center justify-between text-[0.625rem] text-sg-muted-foreground"
        >
          <span class="sg-numeric">{{ progressTime }}</span>
          <span class="sg-numeric">{{ durationLabel }}</span>
        </div>
      </div>
    </div>

    <div v-if="transcript" class="px-4 py-3">
      <p
        class="mb-1.5 font-sg-mono text-[0.625rem] font-medium tracking-[0.12em] text-sg-subtle-foreground uppercase"
      >
        Transcript
      </p>
      <p
        class="text-sm leading-relaxed text-sg-muted-foreground"
        :class="!expanded && longTranscript && 'line-clamp-3'"
      >
        {{ transcript }}
      </p>
      <button
        v-if="longTranscript"
        type="button"
        class="mt-1.5 text-xs font-medium text-sg-primary underline-offset-2 hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sg-ring focus-visible:outline-none"
        :aria-expanded="expanded"
        @click="expanded = !expanded"
      >
        {{ expanded ? 'Show less' : 'Show full transcript' }}
      </button>
    </div>

    <audio
      ref="audio"
      :src="src"
      preload="metadata"
      class="hidden"
      @loadedmetadata="onLoadedMetadata"
      @play="
        playing = true;
        emit('play');
      "
      @pause="
        playing = false;
        emit('pause');
      "
      @timeupdate="currentTime = audio?.currentTime ?? 0"
      @ended="onEnded"
    />
  </Card>
</template>
