import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ALL_ENGAGEMENTS } from '../data/companyData';
import { Band, BandHeader } from '../components/ui/Band';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { EditorialRow } from '../components/ui/EditorialRow';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { TONE } from '../lib/tone';

const light = TONE.light;

/**
 * One engagement, in full.
 *
 * /work renders only the active tab panel, so ten of the eleven engagements'
 * summaries, outcomes and numbers were absent from the served HTML — and these
 * are the most citable things on the site: air-gapped ML for the Ministry of
 * Defence, AI fraud detection for the Maharashtra GST department. Each one now
 * has its own page. The showcase on /work is unchanged.
 */
export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams();
  const study = ALL_ENGAGEMENTS.find(item => item.id === slug);

  if (!study) {
    return (
      <Band tone="light" size="page">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Success Stories', to: '/work' },
            { label: 'Not found' },
          ]}
        />
        <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl">
          That engagement is not here.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          The link may be old. The full list is on the Success Stories page.
        </p>
        <Link
          to="/work"
          className={`mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${light.solidButton} ${light.focusRing}`}
        >
          See all engagements
        </Link>
      </Band>
    );
  }

  const others = ALL_ENGAGEMENTS.filter(item => item.id !== study.id).slice(0, 5);

  return (
    <>
      {/* 1 — White header. */}
      <Band tone="light" size="page">
        <RevealGroup trigger="mount" stagger={0.06} className="max-w-4xl">
          <RevealItem>
            <Breadcrumbs
              items={[
                { label: 'Home', to: '/' },
                { label: 'Success Stories', to: '/work' },
                { label: study.sector },
              ]}
            />
          </RevealItem>

          <RevealItem>
            <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl md:text-6xl">
              {study.project}
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
              {study.summary}
            </p>
          </RevealItem>
        </RevealGroup>
      </Band>

      {/* 2 — Light. Facts, the number, the outcomes, the image. */}
      <Band tone="light" size="sm">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <dl className="grid grid-cols-2 gap-x-10 gap-y-8">
              <div>
                <dt className={`text-xs font-medium uppercase tracking-[0.18em] ${light.meta}`}>
                  Client
                </dt>
                <dd className="mt-3 text-base font-medium text-ink">{study.client}</dd>
              </div>
              <div>
                <dt className={`text-xs font-medium uppercase tracking-[0.18em] ${light.meta}`}>
                  Sector
                </dt>
                <dd className="mt-3 text-base font-medium text-ink">{study.sector}</dd>
              </div>
              <div className="col-span-2">
                <dt className={`text-xs font-medium uppercase tracking-[0.18em] ${light.meta}`}>
                  Engaged by
                </dt>
                <dd className="mt-3 text-base font-medium text-ink">{study.year}</dd>
              </div>
            </dl>

            <div className={`mt-12 border-t-2 border-brand-600 pt-6`}>
              <p className="text-5xl font-semibold tracking-[-0.035em] text-ink md:text-6xl">
                {study.metric}
              </p>
              <p className={`mt-3 text-base ${light.body}`}>{study.metricLabel}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className={`overflow-hidden rounded-3xl border ${light.hairline} bg-brand-50 ${
                study.fit === 'contain' ? 'p-8' : ''
              }`}
            >
              <img
                src={study.image}
                alt={`${study.client} — ${study.project}`}
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className={`h-full w-full ${
                  study.fit === 'contain' ? 'object-contain' : 'object-cover'
                }`}
              />
            </div>
          </Reveal>
        </div>
      </Band>

      {/* 3 — Ink. What we actually did. The one statement band. */}
      <Band tone="ink" size="lg">
        <Reveal>
          <h2 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-white md:text-6xl">
            What we did
          </h2>

          <ul className="mt-16">
            {study.outcomes.map((outcome, index) => (
              <li
                key={outcome}
                className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t border-white/10 py-8 md:gap-10"
              >
                <span className="font-mono text-xs tabular-nums text-white/50">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="max-w-2xl text-lg leading-relaxed text-white/70">
                  {outcome}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Band>

      {/* 4 — Light. Neighbouring work. */}
      <Band tone="light" size="lg">
        <BandHeader
          eyebrow="More engagements"
          title="Other places this has gone."
          lede="Ministries, state governments, public institutions and enterprises — the same delivery team across all of them."
        />

        <div className="mt-16">
          {others.map((item, index) => (
            <EditorialRow
              key={item.id}
              index={index + 1}
              title={`${item.client} — ${item.project}`}
              description={item.summary}
              meta={item.sector}
              to={`/work/${item.id}`}
            />
          ))}
        </div>

        <Reveal>
          <Link
            to="/work"
            className={`mt-12 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${light.ghostButton} ${light.focusRing}`}
          >
            See all eleven
          </Link>
        </Reveal>
      </Band>

      {/* 5 — Light close. */}
      <Band tone="light" size="lg">
        <Reveal>
          <div className="max-w-4xl">
            <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl">
              Something like this, for you?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
              Most of the work above started as a constraint someone could not
              get past. Describe yours.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className={`group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${light.solidButton} ${light.focusRing}`}
              >
                Start a conversation
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                to="/services"
                className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${light.ghostButton} ${light.focusRing}`}
              >
                What we do
              </Link>
            </div>
          </div>
        </Reveal>
      </Band>
    </>
  );
};
