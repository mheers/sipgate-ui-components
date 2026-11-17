import { computed, onScopeDispose, ref } from 'vue';

export interface UseClipboardOptions {
  /** How long `copied` stays true, in ms. */
  timeout?: number;
}

/**
 * Copy text with the async Clipboard API and a textarea fallback for
 * non-secure contexts. Cleans up after itself.
 */
export function useClipboard(options: UseClipboardOptions = {}) {
  const { timeout = 1600 } = options;
  const copied = ref(false);
  const copying = ref(false);
  const error = ref<Error | null>(null);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const supported = computed(
    () => typeof navigator !== 'undefined' && typeof window !== 'undefined',
  );

  async function fallbackCopy(text: string): Promise<void> {
    if (typeof document === 'undefined') throw new Error('Clipboard is not available');
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    try {
      textarea.select();
      const ok = document.execCommand('copy');
      if (!ok) throw new Error('Copy command failed');
    } finally {
      textarea.remove();
    }
  }

  async function copy(text: string): Promise<boolean> {
    copying.value = true;
    error.value = null;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        await fallbackCopy(text);
      }
      copied.value = true;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        copied.value = false;
      }, timeout);
      return true;
    } catch (cause) {
      error.value = cause instanceof Error ? cause : new Error(String(cause));
      copied.value = false;
      return false;
    } finally {
      copying.value = false;
    }
  }

  onScopeDispose(() => {
    if (timer) clearTimeout(timer);
  });

  return { copy, copied, copying, error, supported };
}
