import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BUSINESS_DOMAINS, OFFERINGS, PRODUCTS } from '../data/companyData';
import { Band, BandHeader } from '../components/ui/Band';
import { EditorialRow } from '../components/ui/EditorialRow';
import { ProductShowcase } from '../components/ui/ProductShowcase';
import { PageHero } from '../components/layout/PageHero';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';

export const ProductsPage: React.FC = () => (
  <>
    {/* 1 — White hero. */}
    <PageHero
      eyebrow="Products"
      title={
        <>
          Eleven products
          <br />
          we built and shipped.
        </>
      }
      lede="Not case studies — products. Smart farming, meta-human education, decentralised identity, unified communications, and a photo booth that started inside a prison. Each one is running."
    />

    {/* 2 — Light. The shelf. Filter, then open one without losing your place. */}
    <Band tone="light" size="lg">
      <Reveal>
        <BandHeader
          eyebrow="The shelf"
          title="Pick a category, open anything."
          lede="Detail opens in place rather than on its own page, so comparing two products does not cost you two navigations."
        />
      </Reveal>

      <Reveal className="mt-16">
        <ProductShowcase products={PRODUCTS} />
      </Reveal>
    </Band>

    {/* 3 — Ink. The domains those products came out of. */}
    <Band tone="ink" size="lg">
      <Reveal>
        <BandHeader
          eyebrow="Business domains"
          title="Six domains, and the products are the evidence."
          lede="These are not target markets. Every one of them has shipped work behind it."
        />
      </Reveal>

      <div className="mt-16">
        {BUSINESS_DOMAINS.map((domain, index) => (
          <Reveal key={domain.name} delay={index * 0.04}>
            <EditorialRow index={index + 1} title={domain.name} description={domain.detail} />
          </Reveal>
        ))}
      </div>
    </Band>

    {/* 4 — Wash. How the capacity is actually bought. */}
    <Band tone="wash" size="lg">
      <Reveal>
        <BandHeader
          eyebrow="How we engage"
          title="Six ways to put our team on your problem."
        />
      </Reveal>

      <RevealGroup stagger={0.05} className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {OFFERINGS.map((offering, index) => (
          <RevealItem key={offering}>
            <div className="border-t border-brand-200 pt-6">
              <p className="font-mono text-xs tabular-nums text-ink-mute">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="mt-4 text-xl font-semibold tracking-tight text-ink text-balance">
                {offering}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Band>

    {/* 5 — White close, before the wash footer. */}
    <Band tone="light" size="lg">
      <Reveal>
        <div className="max-w-4xl">
          <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl">
            Want one of these, or something like it?
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Several of these started as a client engagement and became a
            product. If one of them is close to what you need, the distance is
            usually shorter than building from nothing.
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
