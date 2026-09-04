import { ALL_ENGAGEMENTS, COMPANY_INFO, SERVICES } from './companyData';

/** Canonical origin, no trailing slash. Single source for every absolute URL. */
export const SITE_URL = COMPANY_INFO.siteUrl;

/** The share card. Absolute, because scrapers reject relative image paths. */
export const OG_IMAGE = `${SITE_URL}/images/og-cover.jpg`;

export interface PageSeo {
  /** Aim for under 60 characters so it survives the search result. */
  title: string;
  /** Aim for 150–160 characters. */
  description: string;
  /** Absolute URL. Falls back to the shared cover. */
  image?: string;
  /** `article` for insights, `website` for everything else. */
  type?: 'website' | 'article';
  /** Keep out of the index — used for the 404 only. */
  noindex?: boolean;
}

/**
 * Page metadata, keyed by path.
 *
 * Read twice: once by `scripts/prerender.ts`, which writes these into each
 * route's static HTML at build time, and once by `useSeo`, which updates the
 * live document on client-side navigation. Both must agree, which is why
 * there is one map rather than a tag in each page component.
 */
export const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    title: 'VDOIT — Enterprise AI & Digital Engineering',
    description:
      'Enterprise AI, autonomous agents and digital platforms built for production. 200+ projects for 100+ clients since 2015. ISO 9001 and ISO 27001 certified.',
  },
  '/services': {
    title: 'Enterprise AI & Software Development Services | VDOIT',
    description:
      'Generative AI, autonomous agents, computer vision, predictive ML, cloud modernization and custom software engineering — six practices, one delivery team.',
  },
  '/products': {
    title: 'AI & Web3 Products We Have Shipped | VDOIT',
    description:
      'Eleven products VDOIT designed, built and took to market across AI, Web3 and platform engineering — from digital twins to health and fintech platforms.',
  },
  '/work': {
    title: 'Case Studies — Defence, Government & Enterprise AI | VDOIT',
    description:
      'AI and analytics delivered for the Ministry of Defence, NACO, NSDC, NCERT, C-DAC and the governments of Maharashtra, Odisha and Tamil Nadu.',
  },
  '/about': {
    title: 'About VDOIT — Enterprise AI Company Since 2015',
    description:
      'Founded in 2015 and grown from two people to 100+ engineers across Gurugram, Las Vegas and Dubai. ISO 9001 and ISO 27001 certified, MSME registered.',
  },
  '/updates': {
    title: 'Insights on Enterprise AI & Delivery | VDOIT',
    description:
      'What we are writing about: enterprise AI strategy, architecture decisions, delivery practice and what actually reaches production.',
  },
  '/jobs': {
    title: 'IT Jobs & AI Engineering Careers | VDOIT',
    description:
      'Open roles in generative AI, machine learning, full-stack, cloud and product design. Real ownership early, a modern stack, and work that ships.',
  },
  '/contact': {
    title: 'Contact VDOIT — Start an AI Project',
    description:
      'Tell us the constraint and we will tell you what it actually is — including when the answer is that you do not need AI for it. Offices in India, the US and the UAE.',
  },
  '/404': {
    title: 'Page not found | VDOIT',
    description: 'That page is not here. Everything the site does have is one click away.',
    noindex: true,
  },
};

/** Trim to a length a search result will actually show, at a word boundary. */
const clamp = (text: string, limit = 155): string => {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

/**
 * Metadata for the detail routes, derived from the content rather than listed.
 *
 * Six services and eleven engagements would be seventeen hand-written entries
 * to keep in step with `companyData.ts`. Deriving them means a new case study
 * arrives with its title, description and share image already correct.
 */
const dynamicSeo = (path: string): PageSeo | null => {
  const service = SERVICES.find(item => path === `/services/${item.id}`);
  if (service) {
    return {
      title: `${service.title} | VDOIT`,
      description: clamp(`${service.tagline} ${service.description}`),
      image: service.image ? `${SITE_URL}${service.image}` : undefined,
    };
  }

  const study = ALL_ENGAGEMENTS.find(item => path === `/work/${item.id}`);
  if (study) {
    return {
      // Clamp the descriptive half only, so the suffix is never what gets cut.
      title: `${clamp(`${study.client} — ${study.project}`, 52)} | VDOIT`,
      description: clamp(`${study.summary} ${study.metric} ${study.metricLabel}.`),
      image: `${SITE_URL}${study.image}`,
      type: 'article',
    };
  }

  return null;
};

/** The metadata for a path, falling back to the 404 entry for unknown routes. */
export const seoFor = (pathname: string): PageSeo => {
  const path = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/';
  return PAGE_SEO[path] ?? dynamicSeo(path) ?? PAGE_SEO['/404'];
};

/** Absolute canonical URL for a path. */
export const canonicalFor = (pathname: string): string =>
  pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname.replace(/\/+$/, '')}`;
