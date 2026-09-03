import React, { useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { CaseStudy } from '../../types';
import { useTone } from './Band';
import { DURATION, EASE } from '../../lib/motion';

interface WorkShowcaseProps {
  studies: CaseStudy[];
  label: string;
}

/**
 * Seven case studies in one viewport.
 *
 * A stack of seven full case studies is seven screens of scrolling; a rail
 * plus one panel is a single screen the reader drives. The rail is the
 * navigation and the panel is the content — so the rail is a list of real
 * buttons, and the panel announces itself politely when it changes.
 */
export const WorkShowcase: React.FC<WorkShowcaseProps> = ({ studies, label }) => {
  const t = useTone();
  const [activeId, setActiveId] = useState(studies[0]?.id);
  const reducedMotion = useReducedMotion();
  const baseId = useId();
  const rail = useRef<HTMLDivElement>(null);

  const active = studies.find(study => study.id === activeId) ?? studies[0];

  const tabId = (id: string) => `${baseId}-tab-${id}`;
  const panelId = (id: string) => `${baseId}-panel-${id}`;

  /**
   * Arrow keys move between tabs, as the tab pattern requires. The rail is
   * horizontal on small screens and vertical from `lg`, so both axes are
   * accepted rather than guessing which one the reader is looking at.
   */
  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const current = studies.findIndex(study => study.id === active?.id);
    const last = studies.length - 1;
    let next = current;

    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = current >= last ? 0 : current + 1;
    } else {
      next = current <= 0 ? last : current - 1;
    }

    setActiveId(studies[next].id);
    // Selection follows focus, so the newly selected tab must take it.
    rail.current
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [next]?.focus();
  };

  if (!active) return null;

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: DURATION.base, ease: EASE };

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
      {/* The rail. A scroll-snap strip on small screens, a list on large. */}
      <div
        ref={rail}
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 md:-mx-10 md:px-10 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
      >
        {studies.map((study, index) => {
          const selected = study.id === active.id;
          return (
            <button
              key={study.id}
              type="button"
              role="tab"
              id={tabId(study.id)}
              aria-selected={selected}
              aria-controls={panelId(study.id)}
              // Roving tabindex: one stop for the whole rail, then arrows.
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(study.id)}
              className={`group relative flex shrink-0 snap-start items-baseline gap-4 rounded-full px-5 py-3 text-left text-sm transition-all active:scale-[0.98] focus-visible:outline-none ${t.focusRing} ${t.hairline} lg:w-full lg:shrink lg:rounded-none lg:border-t lg:px-0 lg:py-5`}
            >
              {selected && !reducedMotion && (
                // One shared layoutId, so the marker travels between rows
                // instead of blinking out and in somewhere else.
                // No negative z-index: the band paints its own white ground,
                // so a marker sent behind the button disappears entirely.
                // It sits first in the DOM and the labels are lifted instead.
                <motion.span
                  layoutId="work-rail-marker"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-brand-50 lg:rounded-none"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}

              <span
                className={`relative font-mono text-xs tabular-nums ${
                  selected ? t.accent : t.meta
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={`relative whitespace-nowrap font-medium transition-colors duration-300 lg:whitespace-normal ${
                  selected ? t.heading : `${t.body} ${t.headingHover}`
                }`}
              >
                {study.shortName}
              </span>
            </button>
          );
        })}
      </div>

      {/* The panel. `mode="wait"` so the outgoing study is gone before the
          next arrives — a crossfade of two dashboards is unreadable.
          No `aria-live` here: `aria-selected` already announces the change,
          and a live region would re-read the whole case study on every move. */}
      <div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={active.id}
            role="tabpanel"
            id={panelId(active.id)}
            aria-labelledby={tabId(active.id)}
            tabIndex={0}
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
            exit={reducedMotion ? {} : { opacity: 0, y: -8 }}
            transition={transition}
            className={`rounded-3xl focus-visible:outline-none ${t.focusRing}`}
          >
            <div
              className={`relative aspect-[16/10] w-full overflow-hidden rounded-3xl ${
                active.fit === 'contain' ? 'bg-brand-50 p-8' : 'bg-brand-50'
              }`}
            >
              <img
                src={active.image}
                alt={`${active.client} — ${active.project}`}
                loading="lazy"
                className={`h-full w-full ${
                  active.fit === 'contain' ? 'object-contain' : 'object-cover'
                }`}
              />
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className={`text-xs font-medium uppercase tracking-[0.18em] ${t.accent}`}>
                {active.sector}
              </span>
              <span aria-hidden="true" className={`h-px w-6 ${t.hairline} border-t`} />
              <span className={`text-xs font-medium uppercase tracking-[0.18em] ${t.meta}`}>
                {active.year}
              </span>
            </div>

            <h3
              className={`mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl ${t.heading} text-balance`}
            >
              {active.client}
            </h3>
            <p className={`mt-4 text-lg leading-relaxed md:text-xl ${t.body} max-w-2xl`}>
              {active.project}
            </p>
            <p className={`mt-6 max-w-2xl text-base leading-relaxed ${t.body}`}>
              {active.summary}
            </p>

            <div className="mt-12 grid gap-12 md:grid-cols-[1fr_auto] md:gap-16">
              <ul className="max-w-2xl">
                {active.outcomes.map(outcome => (
                  <li
                    key={outcome}
                    className={`flex gap-6 border-t ${t.hairline} py-4 text-base leading-relaxed ${t.body}`}
                  >
                    <span aria-hidden="true" className="mt-2.5 h-px w-6 shrink-0 bg-brand-300" />
                    {outcome}
                  </li>
                ))}
              </ul>

              <div className={`border-t-2 border-brand-600 pt-6 md:w-56`}>
                <p
                  className={`text-4xl font-semibold tracking-[-0.035em] ${t.accent} md:text-5xl`}
                >
                  {active.metric}
                </p>
                <p className={`mt-3 text-xs font-medium uppercase tracking-[0.18em] ${t.meta}`}>
                  {active.metricLabel}
                </p>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
};
