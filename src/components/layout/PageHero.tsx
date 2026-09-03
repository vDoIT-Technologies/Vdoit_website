import React from 'react';
import { Band } from '../ui/Band';
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal';
import { SparkField } from '../ui/SparkField';

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  /** Optional trailing content — a CTA row, a stat strip. */
  children?: React.ReactNode;
}

/** Every page opens white, with the brand spark motif behind the type. */
export const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, lede, children }) => (
  <Band tone="light" size="hero" className="overflow-hidden">
    <SparkField />

    <RevealGroup trigger="mount" stagger={0.08} className="relative z-10 max-w-4xl">
      <RevealItem>
        <span className="inline-flex items-center rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
          {eyebrow}
        </span>
      </RevealItem>
      <RevealItem>
        <h1 className="mt-8 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-ink sm:text-7xl">
          {title}
        </h1>
      </RevealItem>
      {lede && (
        <RevealItem>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            {lede}
          </p>
        </RevealItem>
      )}
    </RevealGroup>

    {children && (
      <Reveal trigger="mount" delay={0.3} className="relative z-10">
        {children}
      </Reveal>
    )}
  </Band>
);
