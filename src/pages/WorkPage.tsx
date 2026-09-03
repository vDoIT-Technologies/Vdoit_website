import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import {
  CASE_STUDIES,
  CLIENT_LOGOS,
  CREDENTIALS,
  MORE_ENGAGEMENTS,
} from '../data/companyData';
import { Band, BandHeader } from '../components/ui/Band';
import { LogoMarquee } from '../components/ui/LogoMarquee';
import { WorkShowcase } from '../components/ui/WorkShowcase';
import { PageHero } from '../components/layout/PageHero';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { CONTAINER } from '../lib/tone';

export const WorkPage: React.FC = () => (
  <>
    {/* 1 — White hero, as on every page. */}
    <PageHero
      eyebrow="Success stories"
      title={
        <>
          Ministries, states,
          <br />
          and one very large army.
        </>
      }
      lede="Defence project tracking, GST fraud detection, a Chief Minister's dashboard, and a skilling library with twenty thousand books in it. Work that had to pass procurement before it could pass review."
    />

    {/* 2 — Light. Seven engagements in one screen: pick from the rail, the
        panel changes. No scrolling through seven case studies to reach one. */}
    <Band tone="light" size="lg">
      <Reveal>
        <BandHeader
          eyebrow="Selected work"
          title="Seven engagements, in their own words."
          lede="Each of these was delivered against a real constraint — an air gap, a compliance regime, or a department that had never had its data in one place."
        />
      </Reveal>

      <Reveal className="mt-16">
        <WorkShowcase studies={CASE_STUDIES} label="Case studies" />
      </Reveal>
    </Band>

    {/* 3 — Ink. The one hard-contrast band on this page. */}
    <Band tone="ink" size="lg">
      <Reveal>
        <BandHeader
          eyebrow="Also delivered"
          title="Four more that did not need a longer write-up."
        />
      </Reveal>

      <div className="mt-16">
        {MORE_ENGAGEMENTS.map((engagement, index) => (
          <Reveal key={engagement.id} delay={index * 0.05}>
            <article className="grid gap-6 border-t border-white/10 py-10 md:grid-cols-[auto_1fr_auto] md:gap-12 md:py-12">
              <p className="font-mono text-xs tabular-nums text-white/50">
                {String(index + 1).padStart(2, '0')}
              </p>

              <div className="min-w-0">
                <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl text-balance">
                  {engagement.client}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/70">
                  {engagement.project}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
                  {engagement.summary}
                </p>
              </div>

              <div className="md:w-52 md:text-right">
                <p className="text-3xl font-semibold tracking-[-0.035em] text-brand-300 md:text-4xl">
                  {engagement.metric}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-white/50">
                  {engagement.metricLabel}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Band>

    {/* 4 — White. The client wall. The marks are dark on white, so this band
        has to stay white or each logo sits in its own pale rectangle. */}
    <Band tone="light" size="lg" contained={false}>
      <Reveal>
        <div className={CONTAINER}>
          <BandHeader
            eyebrow="Who we work with"
            title="Ministries, universities, and companies you have heard of."
          />
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <LogoMarquee logos={CLIENT_LOGOS} />
      </Reveal>
    </Band>

    {/* 5 — Wash. Credentials: the reason a government department can sign. */}
    <Band tone="wash" size="lg">
      <Reveal>
        <BandHeader
          eyebrow="Credentials"
          title="Certified, partnered, and audited."
          lede="Public sector procurement asks for proof rather than a portfolio. This is the proof."
        />
      </Reveal>

      <RevealGroup stagger={0.05} className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {CREDENTIALS.map(credential => (
          <RevealItem key={credential.label}>
            <div className="border-t border-brand-200 pt-6">
              <p className="text-lg font-semibold tracking-tight text-ink">{credential.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{credential.detail}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Band>

    {/* 6 — White close, before the wash footer. */}
    <Band tone="light" size="lg">
      <Reveal>
        <div className="max-w-4xl">
          <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl">
            Your constraint is probably in there somewhere.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Air-gapped data, a compliance regime, twelve languages, or a
            department that has never had one view of its own numbers. Tell us
            which one you are dealing with.
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
