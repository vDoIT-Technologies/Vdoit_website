import React from 'react';

interface WordmarkProps {
  className?: string;
  /** Inherit the surrounding color instead of brand violet (for ink bands). */
  inherit?: boolean;
  /** For one-off display sizing, e.g. the clamped footer watermark. */
  style?: React.CSSProperties;
}

/**
 * The vdoit wordmark: lowercase, geometric, with the four-point spark sitting
 * inside the counter of the "o".
 *
 * The "o" is drawn rather than typed so the spark stays centred in it at every
 * size and never depends on the webfont having loaded. The other letters are
 * real text, which keeps the mark selectable and readable to screen readers.
 */
export const Wordmark: React.FC<WordmarkProps> = ({
  className = '',
  inherit = false,
  style,
}) => (
  <span
    className={`inline-flex items-center font-bold lowercase leading-none tracking-[-0.045em] ${
      inherit ? '' : 'text-brand-600'
    } ${className}`}
    style={{ fontFamily: "'Outfit', sans-serif", ...style }}
  >
    <span aria-hidden="true">vd</span>

    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="mx-[0.01em] h-[0.9em] w-[0.9em] shrink-0 translate-y-[0.02em]"
      fill="none"
    >
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="19" />
      {/* Four-point spark, concave sides — the mark's one flourish.
          Scaled about the centre so it stays clear of the ring's inner edge. */}
      <g transform="translate(50 50) scale(0.98) translate(-50 -50)">
        <path
          d="M50 24c1.6 13.2 12.2 23.8 25.4 25.4C62.2 51 51.6 61.6 50 74.8 48.4 61.6 37.8 51 24.6 49.4 37.8 47.8 48.4 37.2 50 24Z"
          fill="currentColor"
        />
      </g>
    </svg>

    <span aria-hidden="true">it</span>
    <span className="sr-only">vdoit</span>
  </span>
);
