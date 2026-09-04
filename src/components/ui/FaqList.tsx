import React from 'react';
import { Minus, Plus } from 'lucide-react';
import type { FaqItem } from '../../types';
import { useTone } from './Band';

/**
 * The FAQ, built on native `<details>` rather than the site's `Disclosure`.
 *
 * `Disclosure` mounts its panel only when open, which is right for a services
 * accordion but wrong here: the whole point of an FAQ is that the answers are
 * in the page, where a crawler and an AI answer engine can read them without
 * clicking anything. `<details>` collapses the answer while keeping it in the
 * markup, and it needs no JavaScript, so it survives prerendering untouched
 * and has nothing to hydrate.
 *
 * The open/close glyph is CSS-only, driven by `group-open`.
 */
export const FaqList: React.FC<{ items: FaqItem[] }> = ({ items }) => {
  const t = useTone();

  return (
    <div>
      {items.map(item => (
        <details key={item.question} className={`group border-t ${t.hairline}`}>
          <summary
            // `list-none` hides the marker in Chrome and Firefox;
            // Safari needs the webkit pseudo-element as well.
            className={`grid cursor-pointer list-none grid-cols-[1fr_auto] items-start gap-6 py-8 transition-colors md:gap-10 [&::-webkit-details-marker]:hidden ${t.rowHover} focus-visible:outline-none ${t.focusRing}`}
          >
            <h3
              className={`text-balance text-xl font-semibold tracking-tight md:text-2xl ${t.heading} ${t.headingHover} transition-colors duration-300`}
            >
              {item.question}
            </h3>

            <span
              aria-hidden="true"
              className={`mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${t.chip} group-hover:border-brand-400`}
            >
              <Plus className="h-4 w-4 group-open:hidden" />
              <Minus className="hidden h-4 w-4 group-open:block" />
            </span>
          </summary>

          <p className={`max-w-2xl pb-10 text-base leading-relaxed ${t.body}`}>{item.answer}</p>
        </details>
      ))}

      {/* Closes the list, so the last row has a bottom edge like every other. */}
      <div className={`border-t ${t.hairline}`} />
    </div>
  );
};
