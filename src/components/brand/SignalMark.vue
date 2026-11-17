<script setup lang="ts">
withDefaults(defineProps<{ size?: number | string; title?: string }>(), { size: 28 });
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    fill="none"
    role="img"
    :aria-label="title ?? 'sipgate ui'"
    class="shrink-0"
  >
    <circle cx="7" cy="25" r="3.2" fill="currentColor" />
    <path
      d="M7 18.2a6.8 6.8 0 0 1 6.8 6.8"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M7 11.4a13.6 13.6 0 0 1 13.6 13.6"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      opacity="0.62"
    />
    <path
      d="M7 4.6a20.4 20.4 0 0 1 20.4 20.4"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      opacity="0.3"
    />
  </svg>
</template>
