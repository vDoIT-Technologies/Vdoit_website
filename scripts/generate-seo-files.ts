import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Writes `robots.txt`, `sitemap.xml` and `llms.txt` into `dist/`.
 *
 * All three are generated from `src/data/routes.ts` and `companyData.ts` so a
 * new page cannot ship without being listed. Hand-maintained sitemaps go stale
 * within a release or two.
 */

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');

/**
 * Crawlers that feed AI answer engines. They are listed explicitly and
 * allowed: being quoted by ChatGPT, Claude, Perplexity and Google's AI
 * surfaces is the point, and several of these are disallowed by default in
 * hosting-provider boilerplate.
 *
 * Search and indexing agents (GPTBot, ClaudeBot, PerplexityBot, CCBot) are
 * separate from the user-triggered fetchers (ChatGPT-User, Claude-User,
 * Perplexity-User), so both kinds are named.
 */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bingbot',
  'Amazonbot',
  'meta-externalagent',
];

const robots = (siteUrl: string) =>
  [
    '# VDO IT Technologies Limited',
    '# Search and AI answer engines are both welcome here.',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# AI crawlers, named explicitly so a default deny never applies to them.',
    ...AI_AGENTS.flatMap(agent => [`User-agent: ${agent}`, 'Allow: /', '']),
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n');

const sitemap = (siteUrl: string, routes: any[], lastmod: string) =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(route =>
      [
        '  <url>',
        `    <loc>${route.path === '/' ? `${siteUrl}/` : `${siteUrl}${route.path}`}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority.toFixed(1)}</priority>`,
        '  </url>',
      ].join('\n')
    ),
    '</urlset>',
    '',
  ].join('\n');

/**
 * `llms.txt` — a plain-language map of the site for AI agents, in the
 * emerging convention: what the company is, what it does, and where the
 * canonical pages are. Kept factual, because the value is in being quotable.
 */
const llms = (siteUrl: string, mod: any, lastmod: string) => {
  const { COMPANY_INFO, SERVICES, CASE_STUDIES, MORE_ENGAGEMENTS, PRODUCTS, CREDENTIALS, OFFICES, JOB_OPENINGS } = mod;
  const studies = [...CASE_STUDIES, ...MORE_ENGAGEMENTS];

  return [
    `# ${COMPANY_INFO.name}`,
    '',
    `> ${COMPANY_INFO.subheadline}`,
    '',
    `- Founded: ${COMPANY_INFO.foundedYear}`,
    `- Headquarters: ${COMPANY_INFO.address}`,
    `- Offices: ${OFFICES.map((o: any) => `${o.city}, ${o.country}`).join('; ')}`,
    `- Contact: ${COMPANY_INFO.inquiryEmail} · ${COMPANY_INFO.phone}`,
    `- Website: ${siteUrl}/`,
    `- LinkedIn: ${COMPANY_INFO.linkedinUrl}`,
    `- Last updated: ${lastmod}`,
    '',
    '## Scale',
    '',
    ...COMPANY_INFO.stats.map((s: any) => `- ${s.label}: ${s.value} — ${s.sub}`),
    '',
    '## Certifications and partnerships',
    '',
    ...CREDENTIALS.map((c: any) => `- ${c.label} — ${c.detail}`),
    '',
    '## Services',
    '',
    ...SERVICES.flatMap((s: any) => [
      `### ${s.title}`,
      '',
      s.description,
      '',
      `Business impact: ${s.businessImpact}`,
      '',
      `Capabilities: ${s.features.join('; ')}`,
      '',
    ]),
    '## Selected engagements',
    '',
    ...studies.map(
      (s: any) => `- **${s.client} — ${s.project}** (${s.sector}). ${s.summary} Result: ${s.metric} ${s.metricLabel}.`
    ),
    '',
    '## Products built and shipped',
    '',
    ...PRODUCTS.map((p: any) => `- **${p.name}** (${p.category}). ${p.tagline} ${p.description}`),
    '',
    '## Open roles',
    '',
    ...JOB_OPENINGS.map((j: any) => `- ${j.title} — ${j.level}, ${j.location} (${j.workMode}). ${j.summary}`),
    '',
    '## Pages',
    '',
    `- [Home](${siteUrl}/): overview and current focus`,
    `- [Services](${siteUrl}/services): the six delivery practices`,
    // The /work page is paused; /success-stories carries that label.
    `- [Success Stories](${siteUrl}/success-stories): products taken to market`,
    `- [About](${siteUrl}/about): founders, team, timeline, offices`,
    `- [Updates](${siteUrl}/updates): writing and company news`,
    `- [IT Jobs](${siteUrl}/jobs): open roles`,
    `- [Contact](${siteUrl}/contact): how to start a project`,
    '',
  ].join('\n');
};

const main = async () => {
  const mod = await import(pathToFileURL(SSR_ENTRY).href);
  const { SITE_URL, INDEXABLE_ROUTES } = mod;
  const lastmod = new Date().toISOString().slice(0, 10);

  const files: Array<[string, string]> = [
    ['robots.txt', robots(SITE_URL)],
    ['sitemap.xml', sitemap(SITE_URL, INDEXABLE_ROUTES, lastmod)],
    ['llms.txt', llms(SITE_URL, mod, lastmod)],
  ];

  for (const [name, content] of files) {
    fs.writeFileSync(path.join(DIST, name), content, 'utf8');
    console.log(`wrote dist/${name} (${content.length} bytes)`);
  }
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
