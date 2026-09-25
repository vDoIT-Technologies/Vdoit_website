import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Band } from '../components/ui/Band';
import { PageHero } from '../components/layout/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { NAV_ITEMS } from '../components/layout/SiteHeader';
import { TONE } from '../lib/tone';

/**
 * A real dead end, not a silent bounce to the home page.
 *
 * The route used to be `<Navigate to="/" replace />`, which meant every typo
 * and every stale inbound link arrived at the home page under its own URL —
 * a soft 404 that search engines index as a duplicate. This page says what
 * happened and offers the nav, and the host is configured to serve it with a
 * genuine 404 status.
 */
export const NotFoundPage: React.FC = () => (
  <>
    <PageHero
      eyebrow="404"
      title="That page is not here."
      lede="The link may be old, or the address may have a typo in it. Everything the site does have is one click away below."
    />

    <Band tone="light" size="lg">
      <Reveal>
        <nav aria-label="Site sections" className="max-w-3xl">
          <ul>
            {NAV_ITEMS.map((item, index) => (
              <li key={item.to} className={`border-t ${TONE.light.hairline}`}>
                <Link
                  to={item.to}
                  className={`group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6 transition-colors md:gap-10 ${TONE.light.rowHover} focus-visible:outline-none ${TONE.light.focusRing}`}
                >
                  <span className={`font-mono text-xs tabular-nums ${TONE.light.meta}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-2xl font-semibold tracking-tight ${TONE.light.heading} ${TONE.light.headingHover} text-balance transition-colors duration-300 md:text-3xl`}
                  >
                    {item.label}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-ink-mute transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className={`group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${TONE.light.solidButton} ${TONE.light.focusRing}`}
          >
            Back to the home page
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            to="/contact"
            className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${TONE.light.ghostButton} ${TONE.light.focusRing}`}
          >
            Tell us what you were looking for
          </Link>
        </div>
      </Reveal>
    </Band>
  </>
);
