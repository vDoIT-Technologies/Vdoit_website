import React from 'react';
import { Link } from 'react-router-dom';
import { useTone } from './Band';

export interface Crumb {
  label: string;
  /** Omitted on the last crumb, which is the page you are on. */
  to?: string;
}

/**
 * The trail above a detail page's title.
 *
 * Detail pages are two levels down, and without this there is no way back up
 * except the browser button or the header. It also gives the `BreadcrumbList`
 * in the page's structured data something to correspond to — schema that
 * describes a trail the page does not show is the kind of mismatch that gets
 * rich results dropped.
 */
export const Breadcrumbs: React.FC<{ items: Crumb[] }> = ({ items }) => {
  const t = useTone();

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.18em]">
        {items.map((crumb, index) => {
          const last = index === items.length - 1;

          return (
            <li key={crumb.label} className="flex items-center gap-x-3">
              {crumb.to && !last ? (
                <Link
                  to={crumb.to}
                  className={`rounded-full transition-colors ${t.meta} hover:text-brand-600 focus-visible:outline-none ${t.focusRing}`}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={t.accent}>
                  {crumb.label}
                </span>
              )}

              {!last && (
                <span aria-hidden="true" className={t.meta}>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
