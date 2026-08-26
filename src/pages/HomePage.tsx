import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import {
  COMPANY_INFO,
  INDUSTRIES,
  LINKEDIN_POSTS,
  SERVICES,
} from '../data/companyData';
import { Band, BandHeader } from '../components/ui/Band';
import { EditorialRow } from '../components/ui/EditorialRow';
import { HorizontalScroller, ScrollItem } from '../components/ui/HorizontalScroller';
import { HeroCanvas } from '../components/ui/HeroCanvas';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { CONTAINER } from '../lib/tone';

export const HomePage: React.FC = () => (
  <>
    {/* 1 — Dark hero. The scene sits behind the type, never in front of it. */}
    <Band tone="dark" size="hero" className="overflow-hidden">
      <HeroCanvas />

      <RevealGroup trigger="mount" stagger={0.09} className="relative z-10 max-w-5xl">
        <RevealItem>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 mb-8">
            Enterprise AI &amp; digital engineering &middot; Est. {COMPANY_INFO.foundedYear}
          </p>
        </RevealItem>

        <RevealItem>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-[-0.04em] leading-[0.95] text-white text-balance">
            AI systems that
            <br />
            earn their keep.
          </h1>
        </RevealItem>

        <RevealItem>
          <p className="mt-10 max-w-xl text-lg md:text-xl leading-relaxed text-slate-400">
            We build production-grade AI for enterprises that need results, not
            demos. A decade of delivery, US leadership heritage, and not a single
            proof-of-concept left on a shelf.
          </p>
        </RevealItem>

        <RevealItem>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-slate-950 transition-all hover:bg-slate-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Start a project
              <ArrowUpRight aria-hidden="true" className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/40 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              What we do
            </Link>
          </div>
        </RevealItem>
      </RevealGroup>
    </Band>

    {/* 2 — Light. Capabilities as editorial rows, not a card grid. */}
    <Band tone="light" size="lg">
      <Reveal>
        <BandHeader
          eyebrow="What we do"
          title="Five practices, one delivery team."
          lede="No handoffs between strategy and engineering. The people who scope your system are the people who ship it."
        />
      </Reveal>

      <div className="mt-16">
        {SERVICES.map((service, index) => (
          <Reveal key={service.id} delay={index * 0.04}>
            <EditorialRow
              index={index + 1}
              title={service.title}
              description={service.tagline}
              meta={service.badge}
              href="/services"
            />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="border-t border-slate-200 pt-10">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-950 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40"
          >
            All services in detail
            <ArrowUpRight aria-hidden="true" className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
    </Band>

    {/* 3 — Dark statement. One idea, plus the numbers that back it. */}
    <Band tone="dark" size="lg">
      <Reveal>
        <p className="max-w-4xl text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.1] text-white text-balance">
          Founded in {COMPANY_INFO.foundedYear} by engineers who had already
          shipped at scale in the US — and never developed a taste for
          <span className="text-slate-500"> hype.</span>
        </p>
      </Reveal>

      <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {COMPANY_INFO.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.06}>
            <div className="border-t border-white/10 pt-6">
              <p className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-white">
                {stat.value}
              </p>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                {stat.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{stat.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Band>

    {/* 4 — Light. Industries as a scroll track; the strip is the content. */}
    <Band tone="light" size="lg" contained={false}>
      <Reveal>
        <div className={CONTAINER}>
          <BandHeader
            eyebrow="Where we work"
            title="Industries we know well enough to argue with."
          />
        </div>
      </Reveal>

      <Reveal>
        <HorizontalScroller label="Industries" className="mt-16">
          {INDUSTRIES.map((industry, index) => (
            <ScrollItem key={industry.id}>
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 p-8 transition-colors hover:border-slate-400">
                <span className="text-xs font-mono tabular-nums text-slate-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-slate-950">
                  {industry.name}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {industry.tagline}
                </p>
                <div className="mt-auto pt-10">
                  <p className="text-4xl font-semibold tracking-[-0.03em] text-slate-950">
                    {industry.statNumber}
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    {industry.statLabel}
                  </p>
                </div>
              </article>
            </ScrollItem>
          ))}
        </HorizontalScroller>
      </Reveal>
    </Band>

    {/* 5 — Dark. Thinking, also as a track. */}
    <Band tone="dark" size="lg" contained={false}>
      <Reveal>
        <div className={CONTAINER}>
          <BandHeader
            eyebrow="Thinking"
            title="What we are writing about."
          />
        </div>
      </Reveal>

      <Reveal>
        <HorizontalScroller label="Insights" className="mt-16">
          {LINKEDIN_POSTS.map(post => (
            <ScrollItem key={post.id}>
              <a
                href={post.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-white/10 p-8 transition-colors hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  {post.category}
                </p>
                <h3 className="mt-8 text-xl font-semibold tracking-tight text-white">
                  {post.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-400 line-clamp-4">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-10 text-xs text-slate-500">
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1.5">
                    {post.readTime}
                    <ArrowUpRight aria-hidden="true" className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </ScrollItem>
          ))}
        </HorizontalScroller>
      </Reveal>
    </Band>

    {/* 6 — Light close. The footer is dark, so this band has to be light. */}
    <Band tone="light" size="lg">
      <Reveal>
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02] text-slate-950 text-balance">
            Tell us what is not working.
          </h2>
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-slate-600">
            Bring the constraint, not the brief. Our leadership reviews every
            inquiry and comes back with an actual opinion.
          </p>
          <Link
            to="/contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40 focus-visible:ring-offset-2"
          >
            Start a conversation
            <ArrowUpRight aria-hidden="true" className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
    </Band>
  </>
);
