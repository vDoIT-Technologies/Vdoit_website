import React, { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTone } from './Band';
import { DURATION, EASE } from '../../lib/motion';

interface DisclosureProps {
  /** 1-based position, shown as the row's numeral. */
  index: number;
  title: string;
  /** One line that survives when the row is closed. */
  summary?: string;
  /** Small label above the title — a category or badge. */
  meta?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

/**
 * An editorial row that holds its detail back until asked.
 *
 * The closed state is the point: a page of these reads as a table of contents
 * rather than a wall, so the whole list fits on one screen and the reader
 * chooses what to open. The entire header is one hit target — the "View more"
 * label and the +/− glyph are affordances inside that button, never separate
 * controls competing for the same row.
 */
export const Disclosure: React.FC<DisclosureProps> = ({
  index,
  title,
  summary,
  meta,
  children,
  defaultOpen = false,
}) => {
  const t = useTone();
  const [open, setOpen] = useState(defaultOpen);
  const reducedMotion = useReducedMotion();
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className={`border-t ${t.hairline}`}>
      <h3>
        <button
          type="button"
          id={buttonId}
          onClick={() => setOpen(value => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className={`group grid w-full grid-cols-[auto_1fr_auto] items-start gap-6 py-8 text-left transition-colors md:gap-10 md:py-10 ${t.rowHover} focus-visible:outline-none ${t.focusRing}`}
        >
          <span className={`mt-2 font-mono text-xs tabular-nums ${t.meta}`}>
            {String(index).padStart(2, '0')}
          </span>

          <span className="min-w-0">
            {meta && (
              <span className={`block text-xs font-medium uppercase tracking-[0.18em] ${t.meta}`}>
                {meta}
              </span>
            )}
            <span
              className={`mt-3 block text-2xl font-semibold tracking-tight md:text-4xl ${t.heading} ${t.headingHover} text-balance transition-colors duration-300`}
            >
              {title}
            </span>
            {summary && (
              <span className={`mt-3 block max-w-xl text-base leading-relaxed ${t.body}`}>
                {summary}
              </span>
            )}
          </span>

          <span className={`mt-1 inline-flex items-center gap-3 text-sm font-medium ${t.meta}`}>
            <span className="hidden sm:inline">{open ? 'Close' : 'View more'}</span>
            {/* The glyph is the affordance at every width; the word is the
                explanation once there is room for it. */}
            <span
              aria-hidden="true"
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                open ? 'border-brand-600 bg-brand-600 text-white' : `${t.chip} group-hover:border-brand-400`
              }`}
            >
              {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </span>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={reducedMotion ? {} : { height: 'auto', opacity: 1 }}
            exit={reducedMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: DURATION.base, ease: EASE }}
            className="overflow-hidden"
          >
            {/* Padding lives on an inner element: animating height on a box
                that also owns padding makes the close jump at the end. */}
            <div className="pb-12 md:pb-16">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
