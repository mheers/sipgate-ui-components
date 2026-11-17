export interface AvatarTone {
  /** Classes for the avatar surface and initials. */
  classes: string;
  /** Solid dot / accent colour matching the tone. */
  dot: string;
}

/**
 * A small, deliberately harmonised palette. Text pairs pass WCAG AA on their
 * surfaces in both themes.
 */
const TONES: AvatarTone[] = [
  {
    classes: 'bg-[#efe7ff] text-[#5b21b6] sg-dark:bg-[#312348] sg-dark:text-[#cdb4ff]',
    dot: 'bg-[#8642fe]',
  },
  {
    classes: 'bg-[#e0f7e9] text-[#14532d] sg-dark:bg-[#143024] sg-dark:text-[#8be0b1]',
    dot: 'bg-[#2f9e63]',
  },
  {
    classes: 'bg-[#fff1d6] text-[#7c4a03] sg-dark:bg-[#33270f] sg-dark:text-[#f0c477]',
    dot: 'bg-[#d18f1f]',
  },
  {
    classes: 'bg-[#fde7e7] text-[#9b1c1c] sg-dark:bg-[#381b1b] sg-dark:text-[#f2a4a0]',
    dot: 'bg-[#d0453f]',
  },
  {
    classes: 'bg-[#e7eaff] text-[#303f9f] sg-dark:bg-[#20263f] sg-dark:text-[#b3beff]',
    dot: 'bg-[#4d65ff]',
  },
  {
    classes: 'bg-[#ddf4f6] text-[#155e63] sg-dark:bg-[#12302f] sg-dark:text-[#8fd7d0]',
    dot: 'bg-[#2a9d93]',
  },
  {
    classes: 'bg-[#f3ede4] text-[#5c4a32] sg-dark:bg-[#2c241a] sg-dark:text-[#d8c3a5]',
    dot: 'bg-[#9c7c50]',
  },
  {
    classes: 'bg-[#eef0d0] text-[#4d4d0f] sg-dark:bg-[#272a12] sg-dark:text-[#cfd68a]',
    dot: 'bg-[#8f9922]',
  },
];

/** Stable tone for a name, so the same person keeps their colour. */
export function avatarTone(seed: string): AvatarTone {
  let hash = 5381;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 33) ^ seed.charCodeAt(index);
  }
  return TONES[Math.abs(hash) % TONES.length];
}
