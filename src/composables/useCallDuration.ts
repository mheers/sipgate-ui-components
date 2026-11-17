import { computed, onScopeDispose, ref, toValue, watch, type MaybeRefOrGetter } from 'vue';
import { toDate, type DateInput } from '../lib/format';

/**
 * Seconds since `startedAt`, ticking every second. Pass `null` for calls that
 * are not live. Falls back to 0 for invalid dates and never runs in SSR.
 */
export function useCallDuration(
  startedAt: MaybeRefOrGetter<DateInput>,
  options: { tickMs?: number } = {},
) {
  const { tickMs = 1000 } = options;
  const seconds = ref(0);
  let interval: ReturnType<typeof setInterval> | undefined;

  function measure(): number {
    const start = toDate(toValue(startedAt));
    if (!start) return 0;
    return Math.max(0, Math.floor((Date.now() - start.getTime()) / 1000));
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }
  }

  function start() {
    stop();
    seconds.value = measure();
    if (typeof window === 'undefined') return;
    interval = setInterval(() => {
      seconds.value = measure();
    }, tickMs);
  }

  watch(
    () => toDate(toValue(startedAt))?.getTime() ?? null,
    (value) => {
      if (value === null) {
        stop();
        seconds.value = 0;
      } else {
        start();
      }
    },
    { immediate: true },
  );

  onScopeDispose(stop);

  const minutes = computed(() => Math.floor(seconds.value / 60));
  const hours = computed(() => Math.floor(seconds.value / 3600));

  return { seconds, minutes, hours };
}
