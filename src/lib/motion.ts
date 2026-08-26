import type { Variants } from 'motion/react';

/**
 * Shared motion tokens.
 * Every animation on the site pulls its curve and cadence from here so the
 * whole page moves as one system instead of a pile of one-off transitions.
 */

/** Expo-out: fast departure, soft landing. The signature curve of the site. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.55,
  slow: 0.8,
} as const;

/** Reveal once, when a fifth of the element has entered the viewport. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

/**
 * Variants describe states only — the transition is supplied by the component
 * so a `delay` can be layered on without discarding the shared curve.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

/** Gentler variant for full page sections, which need less travel than cards. */
export const sectionRise: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});
