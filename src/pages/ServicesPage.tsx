import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { INDUSTRIES, SERVICES } from '../data/companyData';
import { Band, BandHeader } from '../components/ui/Band';
import { HorizontalScroller, ScrollItem } from '../components/ui/HorizontalScroller';
import { PageHero } from '../components/layout/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { CONTAINER } from '../lib/tone';

export const ServicesPage: React.FC = () => (
  <>
    {/* 1 — Dark hero. */}
    <PageHero
      eyebrow="Services"
      title={
        <>
          Five practices.
          <br />
          One delivery team.
        </>
      }
      lede="Strategy and engineering are not separate departments here. The people who scope your system are the people who ship it, and they are accountable for whether it works."
    />

    {/* 2 — Light. The detail belongs on this page, so each service gets room. */}
    <Band tone="light" size="lg">
      {SERVICES.map((service, index) => (
        <Reveal key={service.id}>
          <article className="grid gap-10 border-t border-slate-200 py-14 md:py-20 lg:grid-cols-[auto_1fr] lg:gap-20">
            {/* Index and label hold the left rail; detail runs down the right. */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-xs font-mono tabular-nums text-slate-500">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-500 lg:max-w-[10rem]">
                {service.badge}
              </p>
            </div>

            <div className="min-w-0">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-slate-950 text-balance">
                {service.title}
              </h2>
              <p className="mt-6 text-lg md:text-xl leading-relaxed text-slate-600 max-w-2xl">
                {service.tagline}
              </p>
              <p className="mt-6 text-base leading-relaxed text-slate-600 max-w-2xl">
                {service.description}
              </p>

              <ul className="mt-12 max-w-2xl">
                {service.features.map(feature => (
                  <li
                    key={feature}
                    className="flex gap-6 border-t border-slate-200 py-4 text-base leading-relaxed text-slate-600"
                  >
                    <span aria-hidden="true" className="mt-2.5 h-px w-6 shrink-0 bg-slate-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-12 max-w-2xl border-t border-slate-950 pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Measurable value
                </p>
                <p className="mt-3 text-lg md:text-xl leading-relaxed text-slate-950">
                  {service.businessImpact}
                </p>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </Band>

    {/* 3 — Dark. Industries as a scroll track. */}
    <Band tone="dark" size="lg" contained={false}>
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
              <article className="flex h-full flex-col rounded-2xl border border-white/10 p-8 transition-colors hover:border-white/30">
                <span className="text-xs font-mono tabular-nums text-slate-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">
                  {industry.name}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-400">
                  {industry.tagline}
                </p>

                <ul className="mt-8 space-y-3">
                  {industry.aiUseCases.slice(0, 3).map(useCase => (
                    <li key={useCase} className="flex gap-4 text-sm leading-relaxed text-slate-400">
                      <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-slate-600" />
                      {useCase}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <p className="text-4xl font-semibold tracking-[-0.03em] text-white">
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

    {/* 4 — Light close. The footer is dark, so this band has to be light. */}
    <Band tone="light" size="lg">
      <Reveal>
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02] text-slate-950 text-balance">
            Not sure which of these you need?
          </h2>
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-slate-600">
            Most engagements start as one thing and turn out to be another.
            Describe the constraint and we will tell you what it actually is —
            including when the answer is that you do not need AI for it.
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
