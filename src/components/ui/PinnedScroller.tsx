import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useTone } from './Band';
import { HorizontalScroller, ScrollItem } from './HorizontalScroller';
import { CONTAINER } from '../../lib/tone';

interface PinnedScrollerProps {
  children: React.ReactNode;
  /** Names the region for assistive tech and labels the fallback track. */
  label: string;
  /** Rendered inside the pinned frame, above the track. */
  heading?: React.ReactNode;
}

/**
 * The pinned frame itself.
 *
 * Deliberately a separate component so it only ever mounts when pinning is
 * actually wanted: `useScroll` binds to its target on mount, so if this lived
 * behind an early return the ref would still be null at that moment and the
 * progress would sit at 0 forever — the section would pin but never travel.
 */
const PinnedTrack: React.FC<PinnedScrollerProps> = ({ children, heading }) => {
  const t = useTone();
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // How far the track must travel for its last item to reach the right edge.
  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setDistance(Math.max(0, el.scrollWidth - el.clientWidth));
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

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    // The extra height is the scroll budget the pinned frame spends moving
    // sideways: one viewport to sit in, plus the track's overflow.
    <div ref={outer} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {heading && <div className={`${CONTAINER} shrink-0`}>{heading}</div>}

        <motion.div
          ref={track}
          style={{ x }}
          className="mt-14 flex gap-6 px-6 will-change-transform md:px-10 lg:px-14"
        >
          {children}
        </motion.div>

        {/* The scale: how far through the section you are. */}
        <div className={`${CONTAINER} mt-10 shrink-0`}>
          <div className={`h-px w-full border-t ${t.hairline}`}>
            <motion.div style={{ width: progress }} className="-mt-px h-0.5 bg-brand-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * A section that pins to the viewport while its content travels sideways —
 * vertical scroll drives horizontal movement, with a progress bar as the scale.
 *
 * Taking over the scroll is a strong move, so it is deliberately narrow in
 * scope: desktop with a fine pointer only. Touch devices and anyone with
 * reduced motion get the native snap track instead, which reaches exactly the
 * same content without hijacking anything.
 */
export const PinnedScroller: React.FC<PinnedScrollerProps> = props => {
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
      <>
        {props.heading && <div className={CONTAINER}>{props.heading}</div>}
        <HorizontalScroller label={props.label} className="mt-14">
          {props.children}
        </HorizontalScroller>
      </>
    );
  }

  return <PinnedTrack {...props} />;
};

export { ScrollItem };
