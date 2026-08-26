export type Tone = 'dark' | 'light';

/**
 * Dark and light are compositional here, not a user setting. A page is a
 * sequence of full-bleed bands, each declaring its tone; every component reads
 * its colors from the band that wraps it. There are no `dark:` variants.
 */
export const TONE = {
  dark: {
    band: 'bg-slate-950',
    heading: 'text-white',
    body: 'text-slate-400',
    meta: 'text-slate-500',
    hairline: 'border-white/10',
    accent: 'text-blue-400',
    /** Primary action inverts against the band. */
    solidButton: 'bg-white text-slate-950 hover:bg-slate-200',
    ghostButton: 'border border-white/20 text-white hover:bg-white/10 hover:border-white/40',
    focusRing: 'focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
    rowHover: 'hover:bg-white/[0.03]',
    chip: 'border border-white/15 text-slate-300',
  },
  light: {
    band: 'bg-white',
    heading: 'text-slate-950',
    body: 'text-slate-600',
    meta: 'text-slate-500',
    hairline: 'border-slate-200',
    accent: 'text-blue-600',
    solidButton: 'bg-slate-950 text-white hover:bg-slate-800',
    ghostButton: 'border border-slate-300 text-slate-900 hover:bg-slate-50 hover:border-slate-400',
    focusRing: 'focus-visible:ring-2 focus-visible:ring-slate-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    rowHover: 'hover:bg-slate-50',
    chip: 'border border-slate-300 text-slate-600',
  },
} as const satisfies Record<Tone, Record<string, string>>;

export const toneOf = (tone: Tone) => TONE[tone];

/** The shared page container. Every band's content sits inside this. */
export const CONTAINER = 'mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16';
