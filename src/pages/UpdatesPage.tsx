import React from 'react';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import { COMPANY_INFO, LINKEDIN_POSTS } from '../data/companyData';
import { Band, BandHeader } from '../components/ui/Band';
import { PageHero } from '../components/layout/PageHero';
import { Reveal } from '../components/ui/Reveal';

const [featured, ...rest] = LINKEDIN_POSTS;

export const UpdatesPage: React.FC = () => (
  <>
    {/* 1 — White page header. */}
    <PageHero
      eyebrow="Updates"
      title={
        <>
          What we are
          <br />
          writing about.
        </>
      }
    >
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href={COMPANY_INFO.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
        >
          <Linkedin aria-hidden="true" className="h-4 w-4" />
          Follow on LinkedIn
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
        <p className="text-sm text-ink-mute">{COMPANY_INFO.linkedinFollowers} followers</p>
      </div>
    </PageHero>

    {/* 2 — Light. The featured post gets the room a featured post deserves. */}
    {featured && (
      <Band tone="light" size="sm">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">Featured</p>
        </Reveal>

        <Reveal delay={0.05}>
          <a
            href={featured.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 block border-t border-line pt-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
                {featured.category}
              </span>
              <span aria-hidden="true" className="h-px w-6 border-t border-line" />
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">
                {featured.date}
              </span>
            </div>

            <h2 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-brand-600 md:text-6xl">
              {featured.title}
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
              {featured.excerpt}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                Read on LinkedIn
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {featured.tags.map(tag => (
                  <li key={tag} className="text-sm text-ink-mute">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </a>
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
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-brand-200 px-7 py-3.5 text-sm font-medium text-ink transition-all hover:border-brand-400 hover:bg-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
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
