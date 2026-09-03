import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { INDUSTRIES, SERVICES } from '../data/companyData';
import { Band, BandHeader } from '../components/ui/Band';
import { Disclosure } from '../components/ui/Disclosure';
import { HorizontalScroller, ScrollItem } from '../components/ui/HorizontalScroller';
import { PageHero } from '../components/layout/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { CONTAINER } from '../lib/tone';

export const ServicesPage: React.FC = () => (
  <>
    {/* 1 — White hero. */}
    <PageHero
      eyebrow="Services"
      title={
        <>
          Six practices.
          <br />
          One delivery team.
        </>
      }
    />

    {/* 2 — Light. The list starts directly under the page title: a second
        heading here would only restate it and push the first row off screen.
        The whole list closed fits on one screen; detail opens on demand. */}
    <Band tone="light" size="sm">
      <div>
        {SERVICES.map((service, index) => (
          <Disclosure
            key={service.id}
            index={index + 1}
            meta={service.badge}
            title={service.title}
            summary={service.tagline}
          >
            <div className="grid gap-12 md:grid-cols-[1fr_auto] md:gap-16 md:pl-[calc(1.5rem+2.5rem)]">
              <div className="min-w-0 max-w-2xl">
                <p className="text-base leading-relaxed text-ink-soft">{service.description}</p>

                <ul className="mt-10">
                  {service.features.map(feature => (
                    <li
                      key={feature}
                      className="flex gap-6 border-t border-line py-4 text-base leading-relaxed text-ink-soft"
                    >
                      <span aria-hidden="true" className="mt-2.5 h-px w-6 shrink-0 bg-brand-300" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 border-t-2 border-brand-600 pt-6">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">
                    Measurable value
                  </p>
                  <p className="mt-3 text-lg leading-relaxed text-ink md:text-xl">
                    {service.businessImpact}
                  </p>
                </div>
              </div>

              {/* Artwork only when the service actually has some — no
                  placeholder frames sitting empty in the panel. */}
              {service.image && (
                <div className="w-full overflow-hidden rounded-3xl bg-brand-50 md:w-80">
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] h-full w-full object-cover md:aspect-auto"
                  />
                </div>
              )}
            </div>
          </Disclosure>
        ))}
      </div>

      {/* Closes the list, so the last row has a bottom edge like every other. */}
      <div className="border-t border-line" />
    </Band>

    {/* 3 — Ink. Industries as a scroll track. */}
    <Band tone="ink" size="lg" contained={false}>
      <Reveal>
        <div className={CONTAINER}>
          <BandHeader
            eyebrow="Where it lands"
            title="Built for industries with real constraints."
            lede="Regulation, legacy systems, and data that was never meant to be queried. That is the normal starting position, not an exception."
          />
        </div>
      </Reveal>

      <Reveal>
        <HorizontalScroller label="Industries" className="mt-16">
          {INDUSTRIES.map((industry, index) => (
            <ScrollItem key={industry.id}>
              <article className="flex h-full flex-col rounded-3xl border border-white/10 p-8 transition-colors hover:border-white/30">
                <span className="font-mono text-xs tabular-nums text-white/50">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">
                  {industry.name}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">{industry.tagline}</p>

                <ul className="mt-8 space-y-3">
                  {industry.aiUseCases.slice(0, 3).map(useCase => (
                    <li key={useCase} className="flex gap-4 text-sm leading-relaxed text-white/70">
                      <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-white/30" />
                      {useCase}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <p className="text-4xl font-semibold tracking-[-0.03em] text-white">
                    {industry.statNumber}
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-white/50">
                    {industry.statLabel}
                  </p>
                </div>
              </article>
            </ScrollItem>
          ))}
        </HorizontalScroller>
      </Reveal>
    </Band>

    {/* 4 — Light close. The footer is a wash band, so this one stays white. */}
    <Band tone="light" size="lg">
      <Reveal>
        <div className="max-w-4xl">
          <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl">
            Not sure which of these you need?
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Most engagements start as one thing and turn out to be another.
            Describe the constraint and we will tell you what it actually is —
            including when the answer is that you do not need AI for it.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
            >
              Start a conversation
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-medium text-ink transition-all hover:border-brand-300 hover:bg-brand-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
            >
              See the work
            </Link>
          </div>
        </div>
      </Reveal>
    </Band>
  </>
);
