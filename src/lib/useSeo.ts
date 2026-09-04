import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { OG_IMAGE, canonicalFor, seoFor } from '../data/seo';

/** Create the tag if it is missing, then set one attribute on it. */
const setTag = (
  selector: string,
  create: () => HTMLElement,
  attribute: string,
  value: string
) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attribute, value);
};

const setMeta = (name: string, content: string) =>
  setTag(
    `meta[name="${name}"]`,
    () => {
      const el = document.createElement('meta');
      el.setAttribute('name', name);
      return el;
    },
    'content',
    content
  );

const setProperty = (property: string, content: string) =>
  setTag(
    `meta[property="${property}"]`,
    () => {
      const el = document.createElement('meta');
      el.setAttribute('property', property);
      return el;
    },
    'content',
    content
  );

/**
 * Keeps the document head in step with the route.
 *
 * Every route is prerendered with its own head already correct, so this exists
 * for client-side navigation only — without it, clicking through the nav would
 * leave the first page's title and share card in place for the whole session.
 * It reads the same `PAGE_SEO` map the build step does, so the two can never
 * describe a page differently.
 */
export const useSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = seoFor(pathname);
    const url = canonicalFor(pathname);
    const image = seo.image ?? OG_IMAGE;

    document.title = seo.title;
    setMeta('description', seo.description);
    setMeta('robots', seo.noindex ? 'noindex, follow' : 'index, follow');

    setTag(
      'link[rel="canonical"]',
      () => {
        const el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        return el;
      },
      'href',
      url
    );

    setProperty('og:title', seo.title);
    setProperty('og:description', seo.description);
    setProperty('og:url', url);
    setProperty('og:image', image);
    setProperty('og:type', seo.type ?? 'website');
    setMeta('twitter:title', seo.title);
    setMeta('twitter:description', seo.description);
    setMeta('twitter:image', image);
  }, [pathname]);
};
