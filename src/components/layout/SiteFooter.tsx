import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import { COMPANY_INFO, OFFICES } from '../../data/companyData';
import { Band } from '../ui/Band';
import { Wordmark } from '../ui/Wordmark';
import { Spark } from '../ui/SparkField';
import { TONE } from '../../lib/tone';

const wash = TONE.wash;

const linkClasses = `text-ink-soft transition-colors hover:text-brand-600 rounded-full focus-visible:outline-none ${wash.focusRing}`;

/**
 * A `<p>`, not an `<h2>`. These are 12px column labels, and as headings they
 * put four extra `<h2>`s into the outline of every page on the site, competing
 * with the real section headings above them. Each column is a `<nav>` with an
 * `aria-label`, so the grouping is still announced.
 */
const headingClasses = 'text-xs font-medium uppercase tracking-[0.18em] text-ink-mute mb-4';

const COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Services', to: '/services' },
      { label: 'Products', to: '/products' },
      { label: 'Success Stories', to: '/work' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Updates', to: '/updates' },
      { label: 'IT Jobs', to: '/jobs' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

export const SiteFooter: React.FC = () => (
  <Band tone="wash" as="footer" size="md" className="relative overflow-hidden">
    {/* Faint grid for structure, faded out before it reaches the legal row. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          'linear-gradient(to right, #ebe3ff 1px, transparent 1px), linear-gradient(to bottom, #ebe3ff 1px, transparent 1px)',
        backgroundSize: '132px 132px',
        maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
      }}
    />

    {/* One oversized spark, mostly off-canvas — brand presence at a whisper,
        instead of the wordmark shouting across the whole width. */}
    <Spark
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 text-brand-200/30"
    />

    <div className="relative">
      {/* The footer's focal point is now the fastest route to a human. */}
      <div className="flex flex-col gap-8 border-b border-brand-200/70 pb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={headingClasses}>Have a project in mind?</p>
          <a
            href={`mailto:${COMPANY_INFO.inquiryEmail}`}
            className={`group inline-flex items-center gap-3 rounded-full text-3xl font-semibold tracking-[-0.03em] text-ink transition-colors hover:text-brand-600 focus-visible:outline-none md:text-5xl ${wash.focusRing}`}
          >
            {COMPANY_INFO.inquiryEmail}
            <ArrowUpRight
              aria-hidden="true"
              className="h-7 w-7 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 md:h-9 md:w-9"
            />
          </a>
        </div>

        <Link
          to="/contact"
          className={`group inline-flex shrink-0 items-center gap-2 self-start rounded-full px-7 py-3.5 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none md:self-auto ${wash.solidButton} ${wash.focusRing}`}
        >
          Start a project
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <Wordmark className="text-[28px]" />
          <p className="mt-4 max-w-xs text-base leading-relaxed text-ink-soft">
            {COMPANY_INFO.tagline}
          </p>

          <a
            href={COMPANY_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="VDOIT on LinkedIn"
            className={`mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 text-ink-soft transition-all hover:border-brand-400 hover:text-brand-600 active:scale-[0.97] focus-visible:outline-none ${wash.focusRing}`}
          >
            <Linkedin aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>

        {COLUMNS.map(column => (
          <nav key={column.heading} aria-label={column.heading}>
            <p className={headingClasses}>{column.heading}</p>
            <ul className="space-y-3 text-base">
              {column.links.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <p className={headingClasses}>Where we are</p>
          <ul className="space-y-3 text-base">
            <li>
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/[^+\d]/g, '')}`}
                className={linkClasses}
              >
                {COMPANY_INFO.phone}
              </a>
            </li>
            {OFFICES.map(office => (
              <li key={office.country} className="text-ink-soft">
                {office.country} &mdash; {office.city}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-brand-200/70 pt-5 text-xs text-ink-mute sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {COMPANY_INFO.foundedYear}&ndash;2026 {COMPANY_INFO.name}. All rights reserved.
        </p>
        <p>Founded by Narendra Kumar Kamra &amp; Neetu Gupta</p>
      </div>
    </div>
  </Band>
);
