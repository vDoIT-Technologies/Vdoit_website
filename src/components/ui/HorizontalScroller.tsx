import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTone } from './Band';
import { CONTAINER } from '../../lib/tone';

interface HorizontalScrollerProps {
  children: React.ReactNode;
  /** Names the scroll region for screen readers and labels the arrows. */
  label: string;
  className?: string;
}

/**
 * Scroll-snap showcase track. Native scrolling does the work — the arrows are
 * progressive enhancement, never the only way to move. The track is focusable
 * so keyboard users get arrow-key scrolling for free.
 */
export const HorizontalScroller: React.FC<HorizontalScrollerProps> = ({
  children,
  label,
  className = '',
}) => {
  const t = useTone();
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 8);
    // A hair of tolerance: sub-pixel widths never land exactly on the max.
    setAtEnd(el.scrollLeft >= max - 8);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync, { passive: true });
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const nudge = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.max(el.clientWidth * 0.8, 320), behavior: 'smooth' });
  };

  const arrowClasses = (disabled: boolean) =>
    `inline-flex items-center justify-center w-11 h-11 rounded-full border transition-all ${t.focusRing} focus-visible:outline-none ${
      disabled
        ? 'opacity-30 cursor-not-allowed border-current'
        : `${t.ghostButton} active:scale-[0.97]`
    }`;

  return (
    <div className={className}>
      <div className={`${CONTAINER} flex justify-end gap-3 mb-8`}>
        <button
          type="button"
          onClick={() => nudge(-1)}
          disabled={atStart}
          aria-label={`Scroll ${label} backward`}
          className={arrowClasses(atStart)}
        >
          <ArrowLeft aria-hidden="true" className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          disabled={atEnd}
          aria-label={`Scroll ${label} forward`}
          className={arrowClasses(atEnd)}
        >
          <ArrowRight aria-hidden="true" className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={`flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar
          px-6 md:px-10 lg:px-16 scroll-pl-6 md:scroll-pl-10 lg:scroll-pl-16
          ${t.focusRing} focus-visible:outline-none`}
      >
        {children}
        {/* Trailing spacer so the last item can snap clear of the edge. */}
        <div aria-hidden="true" className="shrink-0 w-2 md:w-10 lg:w-16" />
      </div>
    </div>
  );
};

interface ScrollItemProps {
  children: React.ReactNode;
  className?: string;
}

/** One snap target. Sized so the next item always peeks at the right edge. */
export const ScrollItem: React.FC<ScrollItemProps> = ({ children, className = '' }) => (
  <div className={`snap-start shrink-0 w-[78vw] sm:w-[380px] lg:w-[420px] ${className}`}>
    {children}
  </div>
);
