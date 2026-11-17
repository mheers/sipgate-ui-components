<script setup lang="ts">
import { computed } from 'vue';
import { ChevronRight, Star } from 'lucide-vue-next';
import Avatar from '../ui/Avatar.vue';
import Badge from '../ui/Badge.vue';
import PhoneNumber from './PhoneNumber.vue';
import { cn } from '../../lib/cn';
import type { Contact } from '../../lib/types';

const props = withDefaults(
  defineProps<{
    contact: Contact;
    country?: string;
    selected?: boolean;
    showFavorite?: boolean;
    class?: string;
  }>(),
  { country: 'DE', selected: false, showFavorite: true },
);

const emit = defineEmits<{
  select: [contact: Contact];
  'toggle-favorite': [contact: Contact];
}>();

const numbers = computed(() => props.contact.numbers ?? []);
const firstNumber = computed(() => numbers.value[0]);
const extraNumbers = computed(() => Math.max(0, numbers.value.length - 1));
const subtitle = computed(() => props.contact.company || props.contact.email || '');
</script>

<template>
  <div
    :class="
      cn(
        'group/contact flex items-stretch gap-1 rounded-sg pe-1 transition-colors duration-150',
        selected
          ? 'bg-sg-primary-soft/70 hover:bg-sg-primary-soft'
          : 'hover:bg-sg-surface-muted/80',
        props.class,
      )
    "
  >
    <button
      type="button"
      class="flex min-w-0 flex-1 items-center gap-3 rounded-sg px-2 py-2.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-sg-ring focus-visible:ring-inset"
      @click="emit('select', contact)"
    >
      <Avatar :name="contact.name" :src="contact.avatarUrl" size="md" decorative />

      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-1.5">
          <span class="truncate text-sm leading-tight font-medium text-sg-foreground">
            {{ contact.name }}
          </span>
          <span v-if="contact.favorite && !showFavorite" class="text-sg-warning" aria-hidden="true">
            <Star class="size-3.5 fill-current" />
          </span>
        </div>
        <div class="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-sg-muted-foreground">
          <PhoneNumber
            v-if="firstNumber"
            :value="firstNumber"
            :country="country"
            size="sm"
            tone="muted"
            :link="false"
            class="min-w-0"
          />
          <Badge v-if="extraNumbers" size="sm" variant="neutral">+{{ extraNumbers }}</Badge>
          <span v-if="!firstNumber && subtitle" class="truncate">{{ subtitle }}</span>
        </div>
        <div
          v-if="firstNumber && (subtitle || contact.tags?.length)"
          class="mt-1 flex min-w-0 items-center gap-1.5 text-[0.6875rem] text-sg-subtle-foreground"
        >
          <span v-if="subtitle" class="truncate">{{ subtitle }}</span>
          <template v-if="subtitle && contact.tags?.length">
            <span class="text-sg-border-strong" aria-hidden="true">·</span>
          </template>
          <span v-if="contact.tags?.length" class="truncate">
            {{ contact.tags.slice(0, 2).join(' · ') }}
          </span>
        </div>
      </div>

      <ChevronRight
        class="size-4 shrink-0 self-center text-sg-subtle-foreground transition-transform group-hover/contact:translate-x-0.5"
        aria-hidden="true"
      />
    </button>

    <button
      v-if="showFavorite"
      type="button"
      class="my-1.5 inline-flex size-8 shrink-0 items-center justify-center rounded-sg-sm transition-colors outline-none hover:bg-sg-surface focus-visible:ring-2 focus-visible:ring-sg-ring"
      :class="
        contact.favorite
          ? 'text-sg-warning'
          : 'text-sg-subtle-foreground opacity-100 focus-visible:opacity-100 sm:opacity-0 sm:group-hover/contact:opacity-100'
      "
      :aria-pressed="contact.favorite || false"
      :aria-label="
        contact.favorite
          ? `Remove ${contact.name} from favorites`
          : `Add ${contact.name} to favorites`
      "
      :title="contact.favorite ? 'Remove from favorites' : 'Add to favorites'"
      @click.stop="emit('toggle-favorite', contact)"
    >
      <Star class="size-4" :class="contact.favorite && 'fill-current'" aria-hidden="true" />
    </button>
  </div>
</template>
