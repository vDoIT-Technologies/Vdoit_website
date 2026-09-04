/**
 * Every URL the site serves.
 *
 * One list, three consumers: `scripts/prerender.ts` renders each entry to a
 * static HTML file, and `scripts/generate-seo-files.ts` writes them into
 * `sitemap.xml` and `llms.txt`. Adding a page means adding it here, so a route
 * cannot ship without also being crawlable and listed.
 */
export interface SiteRoute {
  /** Path as served, leading slash, no trailing slash except the root. */
  path: string;
  /** Sitemap hint. The root and the commercial pages change most often. */
  changefreq: 'weekly' | 'monthly' | 'yearly';
  /** Sitemap priority, 0–1. */
  priority: number;
  /** Excluded from the sitemap and from `llms.txt`. */
  noindex?: boolean;
}

import { ALL_ENGAGEMENTS, SERVICES } from './companyData';

const STATIC_ROUTES: SiteRoute[] = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/services', changefreq: 'weekly', priority: 0.9 },
  { path: '/work', changefreq: 'weekly', priority: 0.9 },
  { path: '/products', changefreq: 'monthly', priority: 0.8 },
  { path: '/about', changefreq: 'monthly', priority: 0.7 },
  { path: '/updates', changefreq: 'weekly', priority: 0.7 },
  { path: '/jobs', changefreq: 'weekly', priority: 0.6 },
  { path: '/contact', changefreq: 'monthly', priority: 0.8 },
  { path: '/404', changefreq: 'yearly', priority: 0.0, noindex: true },
];

/**
 * Detail pages, derived from the content.
 *
 * These carry the depth: a service's capability list and business impact, an
 * engagement's outcomes and its number. On the index pages that material lives
 * inside a collapsed accordion or a one-at-a-time tab panel, so none of it
 * reaches the served HTML. Here each one gets a static, linkable page.
 */
const SERVICE_ROUTES: SiteRoute[] = SERVICES.map(service => ({
  path: `/services/${service.id}`,
  changefreq: 'monthly',
  priority: 0.8,
}));

const ENGAGEMENT_ROUTES: SiteRoute[] = ALL_ENGAGEMENTS.map(study => ({
  path: `/work/${study.id}`,
  changefreq: 'monthly',
  priority: 0.7,
}));

export const ALL_ROUTES: SiteRoute[] = [
  ...STATIC_ROUTES,
  ...SERVICE_ROUTES,
  ...ENGAGEMENT_ROUTES,
];

/** Routes that belong in the sitemap and in `llms.txt`. */
export const INDEXABLE_ROUTES = ALL_ROUTES.filter(route => !route.noindex);
