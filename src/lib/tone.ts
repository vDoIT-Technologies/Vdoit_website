export type Tone = 'light' | 'wash' | 'ink';

/**
 * The site is white-first. `light` is the default ground, `wash` is the
 * lavender tint used to separate a section without a hard edge, and `ink` is
 * the near-black band held back for one or two moments of contrast per page.
 *
 * Violet is the brand and the only action color — it comes straight from the
 * wordmark, so nothing on the page competes with the logo.
 */
export const TONE = {
  light: {
    band: 'bg-white',
    heading: 'text-ink',
    body: 'text-ink-soft',
    meta: 'text-ink-mute',
    hairline: 'border-line',
    accent: 'text-brand-600',
    headingHover: 'group-hover:text-brand-600',
    solidButton: 'bg-brand-600 text-white hover:bg-brand-700',
    ghostButton: 'border border-line text-ink hover:border-brand-300 hover:bg-brand-50',
    focusRing:
      'focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    rowHover: 'hover:bg-brand-50/60',
    chip: 'border border-line text-ink-soft',
  },
  wash: {
    band: 'bg-brand-50',
    heading: 'text-ink',
    body: 'text-ink-soft',
    meta: 'text-ink-mute',
    hairline: 'border-brand-100',
    accent: 'text-brand-600',
    headingHover: 'group-hover:text-brand-600',
    solidButton: 'bg-brand-600 text-white hover:bg-brand-700',
    ghostButton: 'border border-brand-200 text-ink hover:border-brand-400 hover:bg-white',
    focusRing:
      'focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-50',
    rowHover: 'hover:bg-white',
    chip: 'border border-brand-200 text-brand-700',
  },
  ink: {
    band: 'bg-ink',
    heading: 'text-white',
    body: 'text-white/70',
    meta: 'text-white/50',
    hairline: 'border-white/10',
    accent: 'text-brand-300',
    headingHover: 'group-hover:text-white',
    solidButton: 'bg-white text-ink hover:bg-brand-100',
    ghostButton: 'border border-white/20 text-white hover:bg-white/10 hover:border-white/40',
    focusRing:
      'focus-visible:ring-2 focus-visible:ring-brand-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
    rowHover: 'hover:bg-white/[0.04]',
    chip: 'border border-white/15 text-white/70',
  },
} as const satisfies Record<Tone, Record<string, string>>;

export const toneOf = (tone: Tone) => TONE[tone];

/** The shared page container. Every band's content sits inside this. */
export const CONTAINER = 'mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-14';
