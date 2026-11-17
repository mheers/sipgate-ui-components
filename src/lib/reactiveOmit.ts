import { computed } from 'vue';

/**
 * Return a computed copy of a props object without the given keys.
 *
 * reka-ui used to ship `reactiveOmit`, but it is not part of its public API in
 * v2. Keeping the helper local also keeps the wrappers' prop forwarding
 * reactive — and the `Omit` return type keeps `vue-tsc` happy when a wrapper
 * binds a prop explicitly as well.
 */
export function reactiveOmit<T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  ...keys: K[]
) {
  return computed(() => {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(object)) {
      if (!keys.includes(key as K)) result[key] = value;
    }
    return result as Omit<T, K>;
  });
}
