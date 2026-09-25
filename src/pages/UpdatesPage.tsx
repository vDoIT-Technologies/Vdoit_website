import React from 'react';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import { COMPANY_INFO, LINKEDIN_POSTS } from '../data/companyData';

import { Band, BandHeader } from '../components/ui/Band';

import { Reveal } from '../components/ui/Reveal';

const [featured, ...rest] = LINKEDIN_POSTS;

export const UpdatesPage: React.FC = () => (
  <>
    {/* 1 — Light. No page header: the latest post opens the page, which is
        what someone who clicked "Updates" came for. Its own title is the
        page's h1, and the band's top padding is what clears the fixed
        header now that there is no hero above it. The Follow button and the
        follower count live in the ink band at the foot of the page. */}
    {featured && (
      <Band tone="light" size="none" className="pb-12 pt-28 md:pb-16 md:pt-32">
        <Reveal delay={0.05}>
          {/* Not a link wrapping the whole post. The featured slot now carries
              the post's own text, and a six-paragraph anchor is one enormous
              link target that a screen reader reads out as a single line. The
              link is the one at the foot, where it belongs. */}
          <article>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
                {featured.category}
              </span>
              <span aria-hidden="true" className="h-px w-6 border-t border-line" />
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">
                {featured.date}
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl">
              {featured.title}
            </h1>

            {/* The post as posted. Falls back to the summary for entries that
                only carry one — every other post in the list. */}
            {featured.fullContent ? (
              <div className="mt-8 max-w-2xl space-y-5">
                {featured.fullContent.split('\n\n').map(paragraph => (
                  <p key={paragraph} className="text-lg leading-relaxed text-ink-soft md:text-xl">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
                {featured.excerpt}
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={featured.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full text-sm font-medium text-ink transition-colors hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Read on LinkedIn
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {featured.tags.map(tag => (
                  <li key={tag} className="text-sm text-ink-mute">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      </Band>
    )}

    {/* 3 — Wash. Everything else, as cards. A post is one of the few things
        that genuinely earns a card. */}
    <Band tone="wash" size="lg">
      <Reveal>
        <BandHeader eyebrow="More posts" title="The rest of the feed." />
      </Reveal>

      {rest.length > 0 ? (
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <Reveal key={post.id} delay={(index % 3) * 0.08}>
              <a
                href={post.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-brand-200 bg-white p-8 transition-colors hover:border-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
                    {post.category}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">
                    {post.date}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-brand-600 text-balance">
                  {post.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-ink-soft">{post.excerpt}</p>

                <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
                  {post.tags.map(tag => (
                    <li key={tag} className="text-sm text-ink-mute">
                      {tag}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-ink">
                  Read post
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      ) : (
        /* Empty state: one post in the feed is a real possibility, and an
           empty grid with no explanation reads as a broken page. */
        <Reveal className="mt-16">
          <div className="max-w-xl border-t border-brand-200 pt-8">
            <p className="text-lg leading-relaxed text-ink-soft">
              Nothing else published yet. New posts land on LinkedIn first and
              are mirrored here.
            </p>
            <a
              href={COMPANY_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-brand-200 px-7 py-3.5 text-sm font-medium text-ink transition-all hover:border-brand-400 hover:bg-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-50"
            >
              Follow on LinkedIn
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      )}
    </Band>

    {/* 4 — Ink. The single hard-contrast moment, and the page's close. */}
    <Band tone="ink" size="lg">
      <Reveal>
        <div className="max-w-4xl">
          <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-white md:text-6xl">
            We post the work, not the hype.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            Follow along for what we are actually shipping — and the occasional
            argument about what enterprise AI is genuinely for.
          </p>
          <a
            href={COMPANY_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink transition-all hover:bg-brand-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <Linkedin aria-hidden="true" className="h-4 w-4" />
            Follow VDOIT
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </Reveal>
    </Band>
  </>
);
