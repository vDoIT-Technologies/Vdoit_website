import React from 'react';

interface WordmarkProps {
  className?: string;
  /** For one-off display sizing, e.g. the clamped footer watermark. */
  style?: React.CSSProperties;
}

/**
 * The vdoit wordmark, as supplied. One asset, used everywhere — the mark is
 * no longer drawn in markup, so nothing on the site can drift from the real
 * logo.
 *
 * Sizing still comes from font size: the image is `1em` tall and keeps its own
 * aspect, so the existing `text-[26px]` / `text-[28px]` call sites set the
 * height exactly as they did when this was type.
 *
 * The artwork is violet on transparent, so it needs a light ground. A dark
 * band would need its own asset rather than a colour prop — an image cannot
 * inherit `currentColor` the way the drawn mark could.
 */
export const Wordmark: React.FC<WordmarkProps> = ({ className = '', style }) => (
  <span className={`inline-flex items-center leading-none ${className}`} style={style}>
    <img
      src="/images/brand/vdoit-wordmark.webp"
      alt="vdoit"
      width={580}
      height={160}
      decoding="async"
      className="h-[1em] w-auto"
    />
  </span>
);
