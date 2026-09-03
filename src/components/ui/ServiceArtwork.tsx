import React from 'react';

/**
 * Card artwork, drawn rather than photographed.
 *
 * Five distinct compositions built from the brand's own vocabulary — the
 * spark, the ring from the "o", and violet gradients — so a row of cards reads
 * as a set without repeating. Deterministic by index: the same service always
 * gets the same artwork.
 *
 * These are placeholders in the sense that real photography or rendered
 * imagery could replace them, but they are not filler: nothing here reads as
 * generic stock.
 */

const SPARK =
  'M50 4c3.2 24.6 20.8 42.2 45.4 45.4C70.8 52.6 53.2 70.2 50 94.8 46.8 70.2 29.2 52.6 4.6 49.4 29.2 46.2 46.8 28.6 50 4Z';

interface ArtworkProps {
  index: number;
  className?: string;
}

export const ServiceArtwork: React.FC<ArtworkProps> = ({ index, className = '' }) => {
  const variant = index % 5;
  const gradientId = `svc-grad-${variant}`;

  return (
    <svg
      viewBox="0 0 300 200"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5f1ff" />
          <stop offset="100%" stopColor="#d9c9ff" />
        </linearGradient>
      </defs>

      <rect width="300" height="200" fill={`url(#${gradientId})`} />

      {variant === 0 && (
        <g>
          <circle cx="150" cy="100" r="70" fill="none" stroke="#9b6bff" strokeWidth="1.5" opacity="0.5" />
          <circle cx="150" cy="100" r="46" fill="none" stroke="#7a3cff" strokeWidth="1.5" opacity="0.6" />
          <path d={SPARK} fill="#5a18f0" transform="translate(120 70) scale(0.6)" />
        </g>
      )}

      {variant === 1 && (
        <g>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <line
              key={i}
              x1={-40 + i * 46}
              y1="200"
              x2={40 + i * 46}
              y2="0"
              stroke="#9b6bff"
              strokeWidth="1.5"
              opacity={0.15 + i * 0.06}
            />
          ))}
          <path d={SPARK} fill="#5a18f0" transform="translate(196 34) scale(0.42)" />
        </g>
      )}

      {variant === 2 && (
        <g>
          <circle cx="96" cy="100" r="58" fill="#7a3cff" opacity="0.14" />
          <circle cx="168" cy="100" r="58" fill="#5a18f0" opacity="0.16" />
          <circle cx="132" cy="100" r="58" fill="none" stroke="#5a18f0" strokeWidth="1.5" opacity="0.4" />
          <path d={SPARK} fill="#4711c4" transform="translate(212 44) scale(0.34)" />
        </g>
      )}

      {variant === 3 && (
        <g>
          <path
            d="M-10 150 Q75 60 150 110 T310 70"
            fill="none"
            stroke="#5a18f0"
            strokeWidth="2"
            opacity="0.55"
          />
          <path
            d="M-10 175 Q75 90 150 138 T310 100"
            fill="none"
            stroke="#9b6bff"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <circle cx="150" cy="110" r="7" fill="#5a18f0" />
          <path d={SPARK} fill="#5a18f0" transform="translate(232 26) scale(0.36)" />
        </g>
      )}

      {variant === 4 && (
        <g>
          {[0, 1, 2, 3].map(row =>
            [0, 1, 2, 3, 4, 5].map(col => (
              <circle
                key={`${row}-${col}`}
                cx={38 + col * 45}
                cy={38 + row * 42}
                r={2.5 + ((row + col) % 3) * 2}
                fill="#7a3cff"
                opacity={0.25 + ((row + col) % 4) * 0.12}
              />
            ))
          )}
          <path d={SPARK} fill="#5a18f0" transform="translate(118 68) scale(0.52)" />
        </g>
      )}
    </svg>
  );
};
