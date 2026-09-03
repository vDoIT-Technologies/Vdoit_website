import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { CONTAINER } from '../../lib/tone';

interface PinnedSplitProps {
  /** Held still while the right column travels. */
  left: React.ReactNode;
  children: React.ReactNode;
}

/**
 * The pinned frame. Separate component on purpose: `useScroll` binds its
 * target on mount, so behind an early return the ref would still be null and
 * progress would sit at 0 — the section would pin but never move.
 */
const PinnedSplitTrack: React.FC<PinnedSplitProps> = ({ left, children }) => {
  const outer = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // How far the column must travel for its last item to clear the frame.
  const measure = useCallback(() => {
    if (!viewport.current || !content.current) return;
    setDistance(
      Math.max(0, content.current.scrollHeight - viewport.current.clientHeight)
    );
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, children]);

  const { scrollYProgress } = useScroll({
    target: outer,
    offset: ['start start', 'end end'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    // The extra height is the scroll budget the frame spends moving the column.
    <div ref={outer} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className={`${CONTAINER} grid h-full items-center gap-12 lg:grid-cols-[0.85fr_1.35fr] lg:gap-20`}
        >
          <div className="min-w-0">{left}</div>

          <div
            ref={viewport}
            className="relative h-full min-w-0 overflow-hidden"
            // Soft edges: entries dissolve at the top and bottom of the frame
            // rather than being sliced off by a hard line.
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
            }}
          >
            <motion.div ref={content} style={{ y }} className="py-28 will-change-transform">
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * A section that pins while its right column scrolls through — the background
 * and the left-hand text hold still, and only the content moves.
 *
 * Desktop with a fine pointer only. Anywhere else, and under reduced motion,
 * it falls back to an ordinary stacked layout that scrolls normally.
 */
export const PinnedSplit: React.FC<PinnedSplitProps> = ({ left, children }) => {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  if (!enabled || reducedMotion) {
    return (
      <div className={`${CONTAINER} grid gap-12`}>
        <div className="min-w-0">{left}</div>
        <div className="min-w-0">{children}</div>
      </div>
    );
  }

  return <PinnedSplitTrack left={left}>{children}</PinnedSplitTrack>;
};
