<script setup lang="ts">
import { DialogClose, type DialogCloseProps } from 'reka-ui';

defineProps<DialogCloseProps>();
</script>

<template>
  <DialogClose v-bind="$props">
    <slot />
  </DialogClose>
</template>
