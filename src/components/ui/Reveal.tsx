import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react';
import { DURATION, EASE, fadeUp, staggerContainer } from '../../lib/motion';

type Trigger = 'view' | 'mount';

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
  const revealed = useRevealed(ref, trigger, reducedMotion);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
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
  const revealed = useRevealed(ref, trigger, reducedMotion);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate={revealed ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
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

  if (reducedMotion) {
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
