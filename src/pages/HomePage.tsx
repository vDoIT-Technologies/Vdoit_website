import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import {
  CLIENT_LOGOS,
  COMPANY_INFO,
  INDUSTRIES,
  LINKEDIN_POSTS,
  SERVICES,
} from '../data/companyData';
import { Band, BandHeader } from '../components/ui/Band';
import { ServiceCard } from '../components/ui/ServiceCard';
import { PinnedScroller, ScrollItem } from '../components/ui/PinnedScroller';
import { PostThread } from '../components/ui/PostThread';
import { LogoMarquee } from '../components/ui/LogoMarquee';
import { PinnedSplit } from '../components/ui/PinnedSplit';
import { SparkField, Spark } from '../components/ui/SparkField';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { CONTAINER } from '../lib/tone';

export const HomePage: React.FC = () => (
  <>
    {/* 1 — White hero. The spark field carries the right-hand side. */}
    <Band tone="light" size="hero" className="overflow-hidden">
      <SparkField />

      <RevealGroup trigger="mount" stagger={0.08} className="relative z-10 max-w-4xl">
        <RevealItem>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
            <Spark className="h-3 w-3" />
            Enterprise AI since {COMPANY_INFO.foundedYear}
          </span>
        </RevealItem>

        <RevealItem>
          <h1 className="mt-8 text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-ink sm:text-7xl md:text-8xl">
            AI systems that
            <br />
            <span className="text-brand-600">earn their keep.</span>
          </h1>
        </RevealItem>

        <RevealItem>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
            We build production-grade AI for enterprises that need results, not
            demos. A decade of delivery, and not a single proof-of-concept left
            on a shelf.
          </p>
        </RevealItem>

        <RevealItem>
          <div className="mt-11 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
            >
              Start a project
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-medium text-ink transition-all hover:border-brand-300 hover:bg-brand-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
            >
              What we do
            </Link>
          </div>
        </RevealItem>
      </RevealGroup>
    </Band>

    {/* 1b — Light. Proof before the pitch. The marks are dark artwork on
        white, so this strip has to sit on a white ground. */}
    <Band tone="light" size="sm" contained={false}>
      <Reveal>
        <p className={`${CONTAINER} text-xs font-medium uppercase tracking-[0.18em] text-ink-mute`}>
          Trusted by ministries, universities and global companies
        </p>
      </Reveal>
      <Reveal delay={0.08} className="mt-10">
        <LogoMarquee logos={CLIENT_LOGOS} />
      </Reveal>
    </Band>

    {/* 2 — Wash. The stat strip, back where it was. */}
    <Band tone="wash" size="md">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {COMPANY_INFO.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.06}>
            <div>
              <p className="text-5xl font-semibold tracking-[-0.035em] text-brand-600 md:text-6xl">
                {stat.value}
              </p>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">
                {stat.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{stat.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Band>

    {/* 3 — White. Services as media cards: artwork, tag, headline, arrow. */}
    <Band tone="light" size="lg">
      <Reveal>
        {/* Header and the catch-all link share a baseline, as on the reference. */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <BandHeader
            eyebrow="What we do"
            title="Six practices, one delivery team."
            lede="No handoffs between strategy and engineering. The people who scope your system are the people who ship it."
          />
          <Link
            to="/services"
            className="group inline-flex shrink-0 items-center gap-2 rounded pb-2 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
          >
            View all services
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <Reveal key={service.id} delay={(index % 3) * 0.08}>
            <ServiceCard
              index={index}
              eyebrow={service.badge}
              title={service.title}
              description={service.tagline}
              imageSrc={service.image}
              videoSrc={service.video}
              to="/services"
            />
          </Reveal>
        ))}
      </div>
    </Band>

    {/* 4 — Ink. The single hard-contrast moment on the page. */}
    <Band tone="ink" size="lg" className="overflow-hidden">
      <Spark
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-white/[0.04]"
      />
      <Reveal>
        <p className="relative max-w-4xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-white md:text-5xl">
          Founded in {COMPANY_INFO.foundedYear} by engineers who had already
          shipped at scale in the US — and never developed a taste for
          <span className="text-brand-300"> hype.</span>
        </p>
      </Reveal>
    </Band>

    {/* 5 — White. Industries pinned: the frame holds still, the work moves. */}
    <Band tone="light" size="none" contained={false}>
      <PinnedScroller
        label="Industries"
        heading={
          <Reveal>
            <BandHeader
              eyebrow="Where we work"
              title="Industries we know well enough to argue with."
            />
          </Reveal>
        }
      >
        {INDUSTRIES.map((industry, index) => (
          <ScrollItem key={industry.id}>
            <article className="flex h-full flex-col rounded-3xl border border-line bg-white p-8 transition-colors hover:border-brand-300">
              <span className="font-mono text-xs tabular-nums text-ink-mute">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.02em] text-ink">
                {industry.name}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                {industry.tagline}
              </p>
              <div className="mt-auto pt-10">
                <p className="text-4xl font-semibold tracking-[-0.03em] text-brand-600">
                  {industry.statNumber}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">
                  {industry.statLabel}
                </p>
              </div>
            </article>
          </ScrollItem>
        ))}
      </PinnedScroller>
    </Band>

    {/* 6 — Wash. Pinned: the ground and the left-hand text hold still while
        the thread travels through the frame. */}
    <Band tone="wash" size="none" contained={false} className="relative">
      {/* Fixed while the section is pinned, so it reads as a backdrop rather
          than something scrolling past. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e6dcff 1px, transparent 1px), linear-gradient(to bottom, #e6dcff 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
        }}
      />

      <PinnedSplit
        left={
          <Reveal>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">
              Thinking
            </p>
            <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink md:text-5xl">
              What we are writing about.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              Notes on enterprise AI, the work, and the people doing it — posted
              as we go.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={COMPANY_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
              >
                Follow on LinkedIn
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <p className="text-sm text-ink-mute">
                {COMPANY_INFO.linkedinFollowers} followers
              </p>
            </div>
          </Reveal>
        }
      >
        <PostThread posts={LINKEDIN_POSTS} />
      </PinnedSplit>
    </Band>

    {/* 7 — White close, before the ink footer. */}
    <Band tone="light" size="lg">
      <Reveal>
        <div className="max-w-4xl">
          <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl">
            Tell us what is not working.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Bring the constraint, not the brief. Our leadership reviews every
            inquiry and comes back with an actual opinion.
          </p>
          <Link
            to="/contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
          >
            Start a conversation
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Reveal>
    </Band>
  </>
);
