import React from 'react';
import { Band } from '../ui/Band';
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal';

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  /** Optional trailing content — a CTA row, a stat strip. */
  children?: React.ReactNode;
}

/**
 * Every page opens on the same dark hero band, which is what lets the header
 * stay white-on-transparent everywhere. Home overrides this with its own hero.
 */
export const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, lede, children }) => (
  <Band tone="dark" size="hero">
    <RevealGroup trigger="mount" stagger={0.08} className="max-w-5xl">
      <RevealItem>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 mb-8">
          {eyebrow}
        </p>
      </RevealItem>
      <RevealItem>
        <h1 className="text-5xl sm:text-7xl font-semibold tracking-[-0.04em] leading-[0.98] text-white text-balance">
          {title}
        </h1>
      </RevealItem>
      {lede && (
        <RevealItem>
          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-slate-400">
            {lede}
          </p>
        </RevealItem>
      )}
    </RevealGroup>
    {children && <Reveal trigger="mount" delay={0.35}>{children}</Reveal>}
  </Band>
);
