import {
  COMPANY_INFO,
  FAQS,
  CREDENTIALS,
  FOUNDERS,
  JOB_OPENINGS,
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
    url: `${SITE_URL}/images/brand/vdoit-icon.png`,
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
    // Their own profiles, so the founder nodes resolve to real entities
    // rather than to two bare names.
    sameAs: [person.linkedinUrl],
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

/**
 * Home needs no breadcrumb. Section pages are one level down and detail pages
 * two, so this takes the trail rather than assuming a depth — and it must
 * match the `Breadcrumbs` component the page actually renders.
 */
const breadcrumbs = (trail: Array<{ name: string; path: string }>) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    ...trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: step.name,
      item: canonicalFor(step.path),
    })),
  ],
});

const serviceNodes = () =>
  SERVICES.map(service => ({
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${service.id}#service`,
    name: service.title,
    description: service.description,
    serviceType: service.tagline,
    // Points at the detail page, so the index and the page it links to are
    // the same entity rather than two competing ones.
    url: `${SITE_URL}/services/${service.id}`,
    provider: { '@id': ORG_ID },
    areaServed: OFFICES.map(o => o.country),
  }));

// Paused with the /work routes. Restore this and the `ALL_ENGAGEMENTS` import
// when the case studies come back.
// const caseStudyNodes = () =>
//   ALL_ENGAGEMENTS.map((study, index) => ({
//     '@type': 'ListItem',
//     position: index + 1,
//     url: `${SITE_URL}/work/${study.id}`,
//     item: {
//       '@type': 'Article',
//       '@id': `${SITE_URL}/work/${study.id}#article`,
//       headline: `${study.client} — ${study.project}`,
//       description: study.summary,
//       articleSection: study.sector,
//       url: `${SITE_URL}/work/${study.id}`,
//       image: `${SITE_URL}${study.image}`,
//       author: { '@id': ORG_ID },
//     },
//   }));

const productNodes = () =>
  PRODUCTS.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/success-stories#${product.id}`,
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

/**
 * A `FAQPage` for the questions a page actually renders.
 *
 * Only ever emitted alongside a visible `FaqList`. Schema describing answers
 * a visitor cannot find on the page is the kind of mismatch that gets markup
 * ignored, and it deserves to be.
 */
const faqNode = (items: typeof FAQS, path: string) => ({
  '@type': 'FAQPage',
  '@id': `${canonicalFor(path)}#faq`,
  mainEntity: items.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});

const generalFaqs = () => FAQS.filter(faq => !faq.serviceId);

const PAGE_LABELS: Record<string, string> = {
  '/services': 'Services',
  '/success-stories': 'Success Stories',
  // '/work': 'Success Stories',
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

  // Detail pages carry the depth, so they get the richest markup: the full
  // description and capability list for a service, the outcomes and the
  // headline number for an engagement.
  const service = SERVICES.find(item => path === `/services/${item.id}`);
  if (service) {
    graph.push(
      breadcrumbs([
        { name: 'Services', path: '/services' },
        { name: service.title, path },
      ]),
      {
        '@type': 'Service',
        '@id': `${canonicalFor(path)}#service`,
        name: service.title,
        description: service.description,
        serviceType: service.tagline,
        url: canonicalFor(path),
        provider: { '@id': ORG_ID },
        areaServed: OFFICES.map(o => o.country),
        image: service.image ? `${SITE_URL}${service.image}` : OG_IMAGE,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${service.title} — capabilities`,
          itemListElement: service.features.map(feature => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: feature },
          })),
        },
      }
    );

    // Mirrors the FaqList on the page: this service's questions, then the
    // first four general ones.
    graph.push(
      faqNode(
        [...FAQS.filter(faq => faq.serviceId === service.id), ...generalFaqs().slice(0, 4)],
        path
      )
    );
    return { '@context': 'https://schema.org', '@graph': graph };
  }

  // Paused with /work/:slug.
  // const study = ALL_ENGAGEMENTS.find(item => path === `/work/${item.id}`);
  // if (study) {
  //   graph.push(
  //     breadcrumbs([
  //       { name: 'Success Stories', path: '/work' },
  //       { name: `${study.client} — ${study.project}`, path },
  //     ]),
  //     {
  //       '@type': 'Article',
  //       '@id': `${canonicalFor(path)}#article`,
  //       headline: `${study.client} — ${study.project}`,
  //       description: study.summary,
  //       articleSection: study.sector,
  //       url: canonicalFor(path),
  //       image: `${SITE_URL}${study.image}`,
  //       author: { '@id': ORG_ID },
  //       publisher: { '@id': ORG_ID },
  //       dateModified: buildDate,
  //       about: {
  //         '@type': 'Organization',
  //         name: study.client,
  //       },
  //       // The outcomes are the substance of the page; without them the schema
  //       // describes the engagement without saying what was delivered.
  //       articleBody: [study.summary, ...study.outcomes].join(' '),
  //     }
  //   );
  //   return { '@context': 'https://schema.org', '@graph': graph };
  // }

  const label = PAGE_LABELS[path];
  if (label) graph.push(breadcrumbs([{ name: label, path }]));

  if (path === '/services') {
    graph.push(...serviceNodes(), faqNode(generalFaqs(), path));
  }

  // Paused with the /work route.
  // if (path === '/work') {
  //   graph.push({
  //     '@type': 'ItemList',
  //     name: 'Selected engagements',
  //     itemListElement: caseStudyNodes(),
  //   });
  // }

  if (path === '/success-stories') {
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
