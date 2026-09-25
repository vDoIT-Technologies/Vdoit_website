import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Writes one static HTML file per route.
 *
 * The site is a client-rendered SPA, which meant the served HTML was an empty
 * `<div id="root">`. Search engines can execute JavaScript; the crawlers
 * behind AI answer engines largely cannot, so the site was invisible to them.
 * This step renders every route to real markup at build time.
 *
 * It also removes the need for an SPA rewrite rule: `/services` is served from
 * `dist/services/index.html` as an ordinary file, so a deep link works on a
 * plain Apache or nginx host with no special configuration.
 *
 * Run after `vite build` and `vite build --ssr`.
 */

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');

const escapeAttr = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/** `</script>` inside JSON would close the tag early. */
const escapeJson = (value: string) => value.replace(/</g, '\u003c');

const replaceBetween = (html: string, marker: string, content: string) => {
  const open = `<!--${marker}-->`;
  const close = `<!--/${marker}-->`;
  const start = html.indexOf(open);
  const end = html.indexOf(close);
  if (start === -1 || end === -1) {
    throw new Error(`index.html is missing the ${open}...${close} markers`);
  }
  return html.slice(0, start + open.length) + content + html.slice(end);
};

const main = async () => {
  if (!fs.existsSync(SSR_ENTRY)) {
    throw new Error(`SSR bundle not found at ${SSR_ENTRY}. Run the ssr build first.`);
  }

  const mod = await import(pathToFileURL(SSR_ENTRY).href);
  const { render, ALL_ROUTES, OG_IMAGE, canonicalFor, seoFor, jsonLdFor } = mod;

  const templatePath = path.join(DIST, 'index.html');
  const template = fs.readFileSync(templatePath, 'utf8');
  const buildDate = new Date().toISOString().slice(0, 10);

  for (const route of ALL_ROUTES) {
    const seo = seoFor(route.path);
    const url = canonicalFor(route.path);
    const image = seo.image ?? OG_IMAGE;

    const head = [
      `<title>${escapeAttr(seo.title)}</title>`,
      `<meta name="description" content="${escapeAttr(seo.description)}" />`,
      `<link rel="canonical" href="${url}" />`,
      `<meta name="robots" content="${seo.noindex ? 'noindex, follow' : 'index, follow'}" />`,
      `<meta property="og:title" content="${escapeAttr(seo.title)}" />`,
      `<meta property="og:description" content="${escapeAttr(seo.description)}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:type" content="${seo.type ?? 'website'}" />`,
      `<meta property="og:image" content="${image}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${escapeAttr(seo.title)}" />`,
      `<meta property="og:site_name" content="VDO IT Technologies Limited" />`,
      `<meta property="og:locale" content="en_US" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`,
      `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`,
      `<meta name="twitter:image" content="${image}" />`,
    ]
      .map(tag => `\n    ${tag}`)
      .join('');

    const schema = jsonLdFor(route.path, buildDate);
    const jsonLd = schema
      ? `\n    <script type="application/ld+json">${escapeJson(JSON.stringify(schema))}</script>\n    `
      : '';

    const body = render(route.path);

    let html = replaceBetween(template, 'seo', `${head}\n    `);
    html = replaceBetween(html, 'jsonld', jsonLd);
    html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

    // The root and the 404 are files at the top level; everything else becomes
    // a directory with an index.html so the host serves it without a rewrite.
    const outPath =
      route.path === '/'
        ? path.join(DIST, 'index.html')
        : route.path === '/404'
          ? path.join(DIST, '404.html')
          : path.join(DIST, route.path.slice(1), 'index.html');

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf8');
    console.log(`prerendered ${route.path.padEnd(12)} -> ${path.relative(ROOT, outPath)}`);
  }

  console.log(`\n${ALL_ROUTES.length} routes prerendered.`);
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
