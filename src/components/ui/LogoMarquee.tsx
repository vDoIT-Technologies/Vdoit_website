import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { ClientLogo } from '../../types';

interface LogoMarqueeProps {
  logos: ClientLogo[];
  /** Seconds for one full pass. Longer reads calmer. */
  duration?: number;
}

/**
 * A continuously travelling strip of client marks.
 *
 * The list is rendered twice and the track translates exactly -50%, so the
 * second copy is in the first copy's position at the moment the loop restarts
 * and the seam is invisible. Reduced motion gets the same logos as a static
 * wrapped row — the content is the point, the travel is decoration.
 *
 * The marks are supplied as dark artwork on white, so this belongs on a white
 * band; on a tinted ground each logo would sit in its own pale rectangle.
 */
export const LogoMarquee: React.FC<LogoMarqueeProps> = ({ logos, duration = 55 }) => {
  const reducedMotion = useReducedMotion();

  const item = (logo: ClientLogo, key: string) => (
    <li key={key} className="shrink-0">
      <img
        src={logo.src}
        alt={logo.name}
        loading="lazy"
        className="h-10 w-auto opacity-60 transition-opacity duration-500 hover:opacity-100 md:h-12"
      />
    </li>
  );

  if (reducedMotion) {
    return (
      <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {logos.map(logo => item(logo, logo.name))}
      </ul>
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {/* Two lists with identical classes, so each is exactly half the
            track and -50% lands the copy precisely where the original was. */}
        <ul className="flex items-center gap-x-16 pr-16">
          {logos.map(logo => item(logo, `a-${logo.name}`))}
        </ul>
        {/* The duplicate is decoration — the first copy is what gets read. */}
        <ul aria-hidden="true" className="flex items-center gap-x-16 pr-16">
          {logos.map(logo => item(logo, `b-${logo.name}`))}
        </ul>
      </motion.div>
    </div>
  );
};
