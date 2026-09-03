import React from 'react';
import { Band } from '../ui/Band';
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal';

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  /**
   * Optional, and interior pages deliberately do not pass one. A paragraph
   * here pushes the first real row off the screen for something the content
   * underneath already says.
   */
  lede?: string;
  /** Optional trailing content — a CTA row, a stat strip. */
  children?: React.ReactNode;
}

/**
 * The interior page header: one label, one title, then the page.
 *
 * Two things were wrong before. It was a full-height `hero` — a landing-page
 * device that earns a screen because the visitor has not chosen anything yet,
 * which someone who clicked "Services" already has. And the band underneath
 * opened with a *second* heading restating it, so you scrolled past a title
 * only to land on another title. One heading per page, at section scale, and
 * the content starts immediately below it.
 *
 * No `SparkField`: the motif is composed for a tall band, and cropping it into
 * a strip leaves sliced rings rather than a backdrop. The home page keeps the
 * full `hero` band and the motif with it.
 */
export const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, lede, children }) => (
  <Band tone="light" size="page">
    <RevealGroup trigger="mount" stagger={0.06} className="max-w-4xl">
      <RevealItem>
        <span className="inline-flex items-center rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
          {eyebrow}
        </span>
      </RevealItem>
      <RevealItem>
        {/* Section scale, not display scale. The eyebrow above it and its
            position on the page are what mark it as the page title. */}
        <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl md:text-6xl">
          {title}
        </h1>
      </RevealItem>
      {lede && (
        <RevealItem>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{lede}</p>
        </RevealItem>
      )}
    </RevealGroup>

    {children && (
      <Reveal trigger="mount" delay={0.24} className="relative z-10">
        {children}
      </Reveal>
    )}
  </Band>
);
