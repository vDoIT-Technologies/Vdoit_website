import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';
import { Band } from '../ui/Band';
import { NAV_ITEMS } from './SiteHeader';

const linkClasses =
  'text-slate-400 transition-colors hover:text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50';

export const SiteFooter: React.FC = () => (
  <Band tone="dark" as="footer" size="md">
    <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 mb-6">
          {COMPANY_INFO.tagline}
        </p>
        <Link
          to="/contact"
          className="group inline-flex items-baseline gap-4 text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          Start a conversation
          <ArrowUpRight
            aria-hidden="true"
            className="w-7 h-7 md:w-9 md:h-9 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </Link>
        <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className={`mt-8 block text-base ${linkClasses}`}>
          {COMPANY_INFO.primaryEmail}
        </a>
      </div>

      <nav aria-label="Footer">
        <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 mb-6">Site</h2>
        <ul className="space-y-3 text-base">
          {[{ label: 'Home', to: '/' }, ...NAV_ITEMS, { label: 'Contact', to: '/contact' }].map(item => (
            <li key={item.to}>
              <Link to={item.to} className={linkClasses}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 mb-6">Company</h2>
        <p className="text-base text-slate-400 leading-relaxed">
          {COMPANY_INFO.name}
          <br />
          Est. {COMPANY_INFO.foundedYear}
          <br />
          {COMPANY_INFO.corporateLocation}
        </p>
      </div>
    </div>

    <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <p>
        &copy; {COMPANY_INFO.foundedYear}–2026 {COMPANY_INFO.name}. All rights reserved.
      </p>
      <p>Founded by Narendra Kumar Kamra &amp; Neetu Gupta</p>
    </div>
  </Band>
);
