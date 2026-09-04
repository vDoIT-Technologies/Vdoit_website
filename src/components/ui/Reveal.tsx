import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react';
import { DURATION, EASE, fadeUp, staggerContainer } from '../../lib/motion';

type Trigger = 'view' | 'mount';

/**
 * `static` renders plain markup with no inline opacity; `animate` renders the
 * motion element that fades and rises.
 */
type Entrance = 'static' | 'animate';

/**
 * Whether this element should animate its entrance at all.
 *
 * Two things force `static`. The first is server rendering: pages are
 * prerendered to static HTML at build time, and a `motion.div` with
 * `initial="hidden"` serialises as `opacity: 0`, which would ship the whole
 * site's copy to crawlers as hidden text. The second is content that is
 * already on screen when hydration finishes — animating it in would mean
 * fading out something the visitor is already reading.
 *
 * So: nothing animates until after mount, and then only what is below the
 * fold, which is off screen while it flips and therefore never seen to pop.
 */
const useEntrance = (ref: React.RefObject<HTMLDivElement | null>): Entrance => {
  const [entrance, setEntrance] = useState<Entrance>('static');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setEntrance('animate');
  }, [ref]);

  return entrance;
};

/**
 * A `RevealGroup` cascades its children through parent variants, so its items
 * cannot decide independently — if the group renders static markup the items
 * must too, or they would be left with variants and no parent to drive them.
 */
const EntranceContext = createContext<Entrance>('static');

/**
 * Whether this element should be showing content yet.
 *
 * `whileInView` proved unreliable here: an instant scroll jump, a restored
 * scroll position, or a missed observer frame can leave a band stuck at
 * opacity 0 with its content unreadable. Content visibility is too important
 * to hang on an animation firing, so this hook is deliberately conservative —
 * it reveals if the element is in view, if motion is reduced, if
 * IntersectionObserver is missing, or if a grace period elapses without any
 * of that resolving.
 */
const useRevealed = (
  ref: React.RefObject<HTMLDivElement | null>,
  trigger: Trigger,
  reducedMotion: boolean | null
) => {
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    if (trigger === 'mount' || reducedMotion) return;
    if (typeof IntersectionObserver === 'undefined') {
      setForced(true);
      return;
    }
    // Safety net: nothing stays invisible for longer than this, whatever the
    // observer did or did not do.
    const id = window.setTimeout(() => setForced(true), 2500);
    return () => window.clearTimeout(id);
  }, [trigger, reducedMotion]);

  if (trigger === 'mount' || reducedMotion) return true;
  return inView || forced;
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to hold before this element starts. */
  delay?: number;
  duration?: number;
  variants?: Variants;
  /** `view` animates on scroll into view (default), `mount` on first paint. */
  trigger?: Trigger;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  duration = DURATION.base,
  variants = fadeUp,
  trigger = 'view' as Trigger,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const entrance = useEntrance(ref);
  const revealed = useRevealed(ref, trigger, reducedMotion);

  if (reducedMotion || entrance === 'static') {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={revealed ? 'visible' : 'hidden'}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  /** Gap between each child's start. */
  stagger?: number;
  delay?: number;
  trigger?: Trigger;
}

/**
 * Cascades its `RevealItem` children one after another. Keep the container's
 * own layout classes on it — it renders as a div and nothing else changes.
 */
export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  trigger = 'view' as Trigger,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const entrance = useEntrance(ref);
  const revealed = useRevealed(ref, trigger, reducedMotion);

  if (reducedMotion || entrance === 'static') {
    return (
      <EntranceContext.Provider value="static">
        <div ref={ref} className={className}>
          {children}
        </div>
      </EntranceContext.Provider>
    );
  }

  return (
    <EntranceContext.Provider value="animate">
      <motion.div
        ref={ref}
        className={className}
        variants={staggerContainer(stagger, delay)}
        initial="hidden"
        animate={revealed ? 'visible' : 'hidden'}
      >
        {children}
      </motion.div>
    </EntranceContext.Provider>
  );
};

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  variants?: Variants;
}

/** One step in a `RevealGroup` cascade. Timing comes from the parent. */
export const RevealItem: React.FC<RevealItemProps> = ({
  children,
  className,
  duration = DURATION.base,
  variants = fadeUp,
}) => {
  const reducedMotion = useReducedMotion();
  const entrance = useContext(EntranceContext);

  if (reducedMotion || entrance === 'static') {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      transition={{ duration, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};
