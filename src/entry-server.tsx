import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

/**
 * Renders one URL to static HTML.
 *
 * Called by `scripts/prerender.ts` once per route at build time. The same
 * route tree the browser uses is wrapped in a `StaticRouter` instead of a
 * `BrowserRouter`, so the markup a crawler receives is the markup a visitor
 * would have got after JavaScript ran.
 */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
}

// Re-exported so the prerender script needs only the built SSR bundle, rather
// than resolving the TypeScript sources a second time.
export { ALL_ROUTES, INDEXABLE_ROUTES } from './data/routes';
export { PAGE_SEO, SITE_URL, OG_IMAGE, canonicalFor, seoFor } from './data/seo';
export { jsonLdFor } from './lib/jsonld';
export {
  CASE_STUDIES,
  COMPANY_INFO,
  CREDENTIALS,
  JOB_OPENINGS,
  MORE_ENGAGEMENTS,
  OFFICES,
  PRODUCTS,
  SERVICES,
} from './data/companyData';
