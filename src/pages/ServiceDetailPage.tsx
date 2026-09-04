import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/companyData';
import { Band, BandHeader } from '../components/ui/Band';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { EditorialRow } from '../components/ui/EditorialRow';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { ServiceArtwork } from '../components/ui/ServiceArtwork';
import { NotFoundPage } from './NotFoundPage';
import { TONE } from '../lib/tone';

const light = TONE.light;
const dark = TONE.ink;

/**
 * One service, in full.
 *
 * /services shows six titles and taglines inside collapsed accordion panels,
 * so the capability lists and the business-impact lines — the part a buyer
 * searches for and the part an AI answer engine can quote — never reached the
 * served HTML. This page gives each service a static, linkable home. The
 * accordion on the index page is untouched; this is a second view of the same
 * data, not a replacement.
 */
export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams();
  const service = SERVICES.find(item => item.id === slug);

  // Only real slugs are prerendered, so this is the client-side case: someone
  // typed or followed a stale one.
  if (!service) return <NotFoundPage />;

  const others = SERVICES.filter(item => item.id !== service.id);

  return (
    <>
      {/* 1 — White header. Trail, badge, title, tagline. */}
      <Band tone="light" size="page">
        <RevealGroup trigger="mount" stagger={0.06} className="max-w-4xl">
          <RevealItem>
            <Breadcrumbs
              items={[
                { label: 'Home', to: '/' },
                { label: 'Services', to: '/services' },
                { label: service.badge },
              ]}
            />
          </RevealItem>

          <RevealItem>
            <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl md:text-6xl">
              {service.title}
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
              {service.tagline}
            </p>
          </RevealItem>
        </RevealGroup>
      </Band>

      {/* 2 — Light. What it is, what it includes, and the artwork. */}
      <Band tone="light" size="sm">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
              {service.description}
            </p>

            <h2 className="mt-16 text-balance text-2xl font-semibold tracking-tight text-ink md:text-4xl">
              What this includes
            </h2>

            <ul className="mt-10">
              {service.features.map((feature, index) => (
                <li
                  key={feature}
                  className={`grid grid-cols-[auto_1fr] items-baseline gap-6 border-t py-6 md:gap-10 ${light.hairline}`}
                >
                  <span className={`font-mono text-xs tabular-nums ${light.meta}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base leading-relaxed text-ink-soft">{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className={`overflow-hidden rounded-3xl border ${light.hairline} bg-brand-50`}
            >
              {service.image ? (
                <img
                  src={service.image}
                  alt={`${service.title} — ${service.tagline}`}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ServiceArtwork index={SERVICES.indexOf(service)} />
              )}
            </div>
          </Reveal>
        </div>
      </Band>

      {/* 3 — Ink. The one statement band: what it is worth. */}
      <Band tone="ink" size="lg">
        <Reveal>
          <p
            className={`text-xs font-medium uppercase tracking-[0.18em] ${dark.meta}`}
          >
            Business impact
          </p>
          <p className="mt-8 max-w-4xl text-balance text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-white md:text-4xl">
            {service.businessImpact}
          </p>
        </Reveal>
      </Band>

      {/* 4 — Light. The rest of the practice, so this is not a dead end. */}
      <Band tone="light" size="lg">
        <BandHeader
          eyebrow="Also in the practice"
          title="The other five."
          lede="Most engagements start as one of these and turn out to be another. They are delivered by one team, not five."
        />

        <div className="mt-16">
          {others.map((item, index) => (
            <EditorialRow
              key={item.id}
              index={index + 1}
              title={item.title}
              description={item.tagline}
              meta={item.badge}
              to={`/services/${item.id}`}
            />
          ))}
        </div>
      </Band>

      {/* 5 — Light close. */}
      <Band tone="light" size="lg">
        <Reveal>
          <div className="max-w-4xl">
            <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl">
              Is this the one you need?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
              Describe the constraint and we will tell you what it actually is —
              including when the answer is that you do not need AI for it.
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
                to="/work"
                className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${light.ghostButton} ${light.focusRing}`}
              >
                See where it has shipped
              </Link>
            </div>
          </div>
        </Reveal>
      </Band>
    </>
  );
};
