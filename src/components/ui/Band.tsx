import React, { createContext, useContext } from 'react';
import { CONTAINER, TONE, type Tone } from '../../lib/tone';

const ToneContext = createContext<Tone>('light');

/** Lets any descendant read the band it is sitting on without prop drilling. */
export const useTone = () => TONE[useContext(ToneContext)];
export const useToneName = () => useContext(ToneContext);

interface BandProps {
  children: React.ReactNode;
  tone?: Tone;
  id?: string;
  /** Vertical rhythm. `hero` is the only full-height option. */
  size?: 'hero' | 'lg' | 'md' | 'sm';
  className?: string;
  /** Set false when the band manages its own edge-to-edge content. */
  contained?: boolean;
  as?: 'section' | 'div' | 'footer' | 'header';
}

const SIZE = {
  hero: 'pt-32 pb-20 md:pt-44 md:pb-28',
  lg: 'py-24 md:py-32',
  md: 'py-16 md:py-24',
  sm: 'py-12 md:py-16',
} as const;

/**
 * A full-bleed horizontal band. The background runs edge to edge, the content
 * sits in the shared container. Alternating these is the whole design.
 */
export const Band: React.FC<BandProps> = ({
  children,
  tone = 'light',
  id,
  size = 'lg',
  className = '',
  contained = true,
  as: Element = 'section',
}) => (
  <ToneContext.Provider value={tone}>
    <Element id={id} className={`relative ${TONE[tone].band} ${SIZE[size]} ${className}`}>
      {contained ? <div className={CONTAINER}>{children}</div> : children}
    </Element>
  </ToneContext.Provider>
);

interface BandHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  className?: string;
}

/** Eyebrow, display heading, optional lede. One per band. */
export const BandHeader: React.FC<BandHeaderProps> = ({ eyebrow, title, lede, className = '' }) => {
  const t = useTone();

  return (
    <div className={`max-w-4xl ${className}`}>
      {eyebrow && (
        <p className={`text-xs font-medium uppercase tracking-[0.18em] ${t.meta} mb-5`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02] ${t.heading} text-balance`}>
        {title}
      </h2>
      {lede && (
        <p className={`mt-6 text-lg md:text-xl leading-relaxed max-w-2xl ${t.body}`}>
          {lede}
        </p>
      )}
    </div>
  );
};
