import React from 'react';

/** The four-point spark lifted from the wordmark. The brand's one flourish. */
export const Spark: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style,
}) => (
  <svg viewBox="0 0 100 100" aria-hidden="true" className={className} style={style} fill="currentColor">
    <path d="M50 4c3.2 24.6 20.8 42.2 45.4 45.4C70.8 52.6 53.2 70.2 50 94.8 46.8 70.2 29.2 52.6 4.6 49.4 29.2 46.2 46.8 28.6 50 4Z" />
  </svg>
);

/**
 * The hero's backdrop: a lavender wash, two outlined rings echoing the "o" of
 * the wordmark, and a scatter of sparks.
 *
 * Positions are art-directed rather than random, so the composition is the
 * same every load and can be judged like a layout instead of a lottery.
 */
const SPARKS = [
  { top: '14%', left: '72%', size: 26, opacity: 'text-brand-300' },
  { top: '30%', left: '88%', size: 14, opacity: 'text-brand-200' },
  { top: '58%', left: '78%', size: 40, opacity: 'text-brand-200' },
  { top: '76%', left: '64%', size: 16, opacity: 'text-brand-300' },
  { top: '8%', left: '54%', size: 12, opacity: 'text-brand-200' },
  { top: '66%', left: '94%', size: 20, opacity: 'text-brand-100' },
];

export const SparkField: React.FC = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* Lavender wash, weighted to the top right so the headline stays clean. */}
    <div className="absolute -right-40 -top-52 h-[720px] w-[720px] rounded-full bg-brand-100/60 blur-[120px]" />
    <div className="absolute -bottom-40 left-1/4 h-[420px] w-[420px] rounded-full bg-brand-50 blur-[100px]" />

    {/* Rings echoing the counter of the "o". */}
    <div className="absolute -right-24 top-24 h-[380px] w-[380px] rounded-full border border-brand-200/60 md:h-[520px] md:w-[520px]" />
    <div className="absolute right-24 top-56 hidden h-[260px] w-[260px] rounded-full border border-brand-200/40 lg:block" />

    {SPARKS.map(spark => (
      <Spark
        key={`${spark.top}-${spark.left}`}
        className={`absolute hidden md:block ${spark.opacity}`}
        // Inline coordinates: one-off art direction, not a repeatable scale
        // worth minting utility classes for.
        style={{ top: spark.top, left: spark.left, width: spark.size, height: spark.size }}
      />
    ))}
  </div>
);
