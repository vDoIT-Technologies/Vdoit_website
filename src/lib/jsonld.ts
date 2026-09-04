import {
  CASE_STUDIES,
  COMPANY_INFO,
  CREDENTIALS,
  FOUNDERS,
  JOB_OPENINGS,
  MORE_ENGAGEMENTS,
  OFFICES,
  PRODUCTS,
  SERVICES,
} from '../data/companyData';
import { OG_IMAGE, SITE_URL, canonicalFor, seoFor } from '../data/seo';

/**
 * Structured data, generated from the same content the pages render.
 *
 * This used to be a hand-written block in `index.html`, which meant every
 * company fact existed twice and the two drifted. Everything here reads from
 * `companyData.ts`, so a changed address or a new certification updates the
 * schema without anyone remembering to.
 *
 * Emitted as a single `@graph` per page: the stable entities (organisation,
 * site) carry `@id` so the page-level nodes can point at them by reference
 * rather than repeating them.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/** A credential expressed the way Google expects, not as a bare string. */
const credentialNode = (label: string, detail: string) => ({
  '@type': 'EducationalOccupationalCredential',
  name: label,
  description: detail,
});

const addressNodes = () =>
  OFFICES.map(office => ({
    '@type': 'PostalAddress',
    streetAddress: office.address,
    addressLocality: office.city,
    addressCountry: office.country === 'USA' ? 'US' : office.country === 'UAE' ? 'AE' : 'IN',
  }));

const organization = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: COMPANY_INFO.name,
  alternateName: COMPANY_INFO.shortName,
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/logo.svg`,
    caption: COMPANY_INFO.name,
  },
  image: OG_IMAGE,
  slogan: COMPANY_INFO.tagline,
  foundingDate: COMPANY_INFO.foundedYear,
  email: COMPANY_INFO.inquiryEmail,
  telephone: COMPANY_INFO.phone,
  sameAs: [COMPANY_INFO.linkedinUrl],
  description: COMPANY_INFO.subheadline,
  founder: FOUNDERS.map(person => ({
    '@type': 'Person',
    name: person.name,
    jobTitle: person.role,
  })),
  address: addressNodes(),
  hasCredential: CREDENTIALS.map(c => credentialNode(c.label, c.detail)),
  knowsAbout: [
    'Artificial Intelligence',
    'Generative AI',
    'Retrieval-Augmented Generation',
    'Autonomous AI Agents',
    'Machine Learning',
    'Computer Vision',
    'Cloud Modernization',
    'Data Engineering',
    'Custom Software Engineering',
    'E-Governance',
  ],
  makesOffer: SERVICES.map(service => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: service.title,
      description: service.tagline,
      url: `${SITE_URL}/services`,
    },
  })),
});

const website = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE_URL}/`,
  name: COMPANY_INFO.name,
  alternateName: COMPANY_INFO.shortName,
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
});

const webPage = (path: string) => {
  const seo = seoFor(path);
  return {
    '@type': 'WebPage',
    '@id': `${canonicalFor(path)}#webpage`,
    url: canonicalFor(path),
    name: seo.title,
    description: seo.description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en',
  };
};

/** Home needs no breadcrumb; every other page is one level down. */
const breadcrumbs = (path: string, label: string) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: label, item: canonicalFor(path) },
  ],
});

const serviceNodes = () =>
  SERVICES.map(service => ({
    '@type': 'Service',
    '@id': `${SITE_URL}/services#${service.id}`,
    name: service.title,
    description: service.description,
    serviceType: service.tagline,
    provider: { '@id': ORG_ID },
    areaServed: OFFICES.map(o => o.country),
  }));

const caseStudyNodes = () =>
  [...CASE_STUDIES, ...MORE_ENGAGEMENTS].map((study, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'CreativeWork',
      '@id': `${SITE_URL}/work#${study.id}`,
      name: `${study.client} — ${study.project}`,
      description: study.summary,
      about: study.sector,
      image: `${SITE_URL}${study.image}`,
      creator: { '@id': ORG_ID },
    },
  }));

const productNodes = () =>
  PRODUCTS.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/products#${product.id}`,
      name: product.name,
      description: product.description,
      applicationCategory: product.category,
      image: `${SITE_URL}${product.image}`,
      author: { '@id': ORG_ID },
    },
  }));

/**
 * Job postings. `datePosted` is required by Google and has to be a real date,
 * so it is passed in from the build rather than invented here.
 */
const jobNodes = (datePosted: string) =>
  JOB_OPENINGS.map(job => ({
    '@type': 'JobPosting',
    '@id': `${SITE_URL}/jobs#${job.id}`,
    title: job.title,
    description: `${job.summary} Stack: ${job.stack.join(', ')}. Level: ${job.level}.`,
    datePosted,
    employmentType: 'FULL_TIME',
    occupationalCategory: job.discipline,
    skills: job.stack.join(', '),
    hiringOrganization: { '@id': ORG_ID },
    jobLocationType: job.workMode === 'Remote' ? 'TELECOMMUTE' : undefined,
    applicantLocationRequirements:
      job.workMode === 'Remote' ? { '@type': 'Country', name: 'India' } : undefined,
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: OFFICES[0].city,
        addressCountry: 'IN',
      },
    },
    directApply: false,
  }));

const PAGE_LABELS: Record<string, string> = {
  '/services': 'Services',
  '/products': 'Products',
  '/work': 'Success Stories',
  '/about': 'About Us',
  '/updates': 'Updates',
  '/jobs': 'IT Jobs',
  '/contact': 'Contact',
};

/**
 * The `@graph` for one route. `buildDate` is an ISO date supplied by the build
 * step, used where schema requires a real timestamp.
 */
export const jsonLdFor = (path: string, buildDate: string): object | null => {
  if (seoFor(path).noindex) return null;

  const graph: object[] = [organization(), website(), webPage(path)];

  const label = PAGE_LABELS[path];
  if (label) graph.push(breadcrumbs(path, label));

  if (path === '/services') {
    graph.push(...serviceNodes());
  }

  if (path === '/work') {
    graph.push({
      '@type': 'ItemList',
      name: 'Selected engagements',
      itemListElement: caseStudyNodes(),
    });
  }

  if (path === '/products') {
    graph.push({
      '@type': 'ItemList',
      name: 'Products built by VDOIT',
      itemListElement: productNodes(),
    });
  }

  if (path === '/jobs') {
    graph.push(...jobNodes(buildDate));
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};
