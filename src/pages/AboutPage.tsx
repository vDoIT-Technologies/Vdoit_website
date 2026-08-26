import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import {
  ADVANTAGES,
  COMPANY_INFO,
  FOUNDERS,
  TIMELINE_MILESTONES,
} from '../data/companyData';
import { Band, BandHeader } from '../components/ui/Band';
import { EditorialRow } from '../components/ui/EditorialRow';
import { PageHero } from '../components/layout/PageHero';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { TONE } from '../lib/tone';

/**
 * Tone tokens, read directly rather than through `useTone()` — the hook needs a
 * `Band` above it in the tree, and this page's markup *is* the band's children.
 */
const dark = TONE.dark;
const light = TONE.light;

/** The company facts that sit under the story. A label and a value, no cards. */
const STORY_FACTS = [
  { label: 'Registered as', value: COMPANY_INFO.name },
  { label: 'Founded', value: COMPANY_INFO.foundedYear },
  { label: 'Leadership', value: COMPANY_INFO.foundersExperience },
  { label: 'Delivery', value: COMPANY_INFO.corporateLocation },
];

export const AboutPage: React.FC = () => (
  <>
    {/* 1 — Dark hero. Same opening band on every page, so the header stays white. */}
    <PageHero
      eyebrow="About"
      title={
        <>
          Two founders, ten years,
          <br />
          no shelved prototypes.
        </>
      }
      lede="VDOIT was built by engineers who had already carried enterprise systems in the US, and who came back with a low tolerance for software that only demos well."
    />

    {/* 2 — Light. The story as prose at a reading measure, not a set of boxes. */}
    <Band tone="light" size="lg">
      <RevealGroup stagger={0.08} className="max-w-4xl">
        <RevealItem>
          <p className={`text-xs font-medium uppercase tracking-[0.18em] ${light.meta} mb-8`}>
            Our story
          </p>
        </RevealItem>

        <RevealItem>
          {/* The headline carries the band. Display size, light weight, tight tracking. */}
          <p className={`text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.1] ${light.heading} text-balance`}>
            {COMPANY_INFO.headline}
          </p>
        </RevealItem>

        <RevealItem>
          <p className={`mt-10 max-w-3xl text-lg md:text-xl leading-relaxed ${light.body}`}>
            {COMPANY_INFO.subheadline}
          </p>
        </RevealItem>

        <RevealItem>
          <p className={`mt-8 max-w-3xl text-lg leading-relaxed ${light.accent}`}>
            {COMPANY_INFO.tagline}
          </p>
        </RevealItem>
      </RevealGroup>

      {/* Footnotes to the story — hairline-topped columns, one numeral each. */}
      <RevealGroup stagger={0.06} className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {STORY_FACTS.map(fact => (
          <RevealItem key={fact.label}>
            <div className={`border-t ${light.hairline} pt-6`}>
              <p className={`text-xs font-medium uppercase tracking-[0.18em] ${light.meta}`}>
                {fact.label}
              </p>
              <p className={`mt-3 text-base leading-relaxed ${light.heading}`}>{fact.value}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Band>

    {/* 3 — Dark. Leadership. Two people, given the room two people deserve. */}
    <Band tone="dark" size="lg">
      <Reveal>
        <BandHeader
          eyebrow="Leadership"
          title="The two people who answer for the work."
          lede="Both founders review delivery directly. There is no layer between the person who scopes your system and the person accountable for it."
        />
      </Reveal>

      <div className="mt-20 grid gap-20 lg:grid-cols-2 lg:gap-16">
        {FOUNDERS.map((founder, index) => (
          <Reveal key={founder.name} delay={index * 0.08}>
            <article className={`border-t ${dark.hairline} pt-8`}>
              {/* Initials as a typographic mark, not an avatar chip. */}
              <p
                aria-hidden="true"
                className={`text-6xl md:text-7xl font-semibold tracking-[-0.04em] ${dark.meta}`}
              >
                {founder.initials}
              </p>

              <h3 className={`mt-10 text-3xl md:text-4xl font-semibold tracking-[-0.03em] ${dark.heading} text-balance`}>
                {founder.name}
              </h3>
              <p className={`mt-3 text-base ${dark.accent}`}>{founder.role}</p>

              <p className={`mt-6 text-xs font-medium uppercase tracking-[0.18em] ${dark.meta}`}>
                {founder.experienceYears}
              </p>
              <p className={`mt-2 text-sm leading-relaxed ${dark.body}`}>
                {founder.usExperienceHighlight}
              </p>

              <p className={`mt-8 max-w-xl text-base leading-relaxed ${dark.body}`}>
                {founder.bio}
              </p>

              {/* Focus areas as hairline-separated text — chips would add six more boxes. */}
              <ul className={`mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm ${dark.meta}`}>
                {founder.focusAreas.map((area, areaIndex) => (
                  <li
                    key={area}
                    className={areaIndex > 0 ? `border-l ${dark.hairline} pl-4` : ''}
                  >
                    {area}
                  </li>
                ))}
              </ul>

              <a
                href={founder.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn — ${founder.name}`}
                className={`group mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/20 px-6 py-3 text-sm font-medium ${dark.heading} transition-all hover:bg-white/10 hover:border-white/40 active:scale-[0.98] focus-visible:outline-none ${dark.focusRing}`}
              >
                <Linkedin aria-hidden="true" className="w-4 h-4" />
                LinkedIn
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </Band>

    {/* 4 — Light. A decade on a spine: year, marker, entry. */}
    <Band tone="light" size="lg">
      <Reveal>
        <BandHeader
          eyebrow="Track record"
          title="How the last decade actually went."
        />
      </Reveal>

      <ol className="mt-16">
        {TIMELINE_MILESTONES.map((milestone, index) => (
          <li key={milestone.year} className={`border-t ${light.hairline}`}>
            <Reveal
              delay={index * 0.05}
              className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[12rem_1fr] md:gap-12 md:py-14"
            >
              <p className={`text-4xl md:text-5xl font-semibold tracking-[-0.03em] tabular-nums ${light.heading}`}>
                {milestone.year}
              </p>

              {/* The left border is the spine; consecutive entries make it continuous. */}
              <div className={`relative md:border-l ${light.hairline} md:pl-12`}>
                <span
                  aria-hidden="true"
                  className="absolute -left-1 top-2.5 hidden h-2 w-2 rounded-full bg-slate-950 md:block"
                />
                <h3 className={`text-2xl md:text-3xl font-semibold tracking-tight ${light.heading} text-balance`}>
                  {milestone.title}
                </h3>
                <p className={`mt-4 max-w-2xl text-base leading-relaxed ${light.body}`}>
                  {milestone.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Band>

    {/* 5 — Dark. Why us, as numbered rows. This used to be a six-card grid. */}
    <Band tone="dark" size="lg">
      <Reveal>
        <BandHeader
          eyebrow="Why VDOIT"
          title="Six reasons, none of them a logo wall."
        />
      </Reveal>

      <div className="mt-16">
        {ADVANTAGES.map((advantage, index) => (
          <Reveal key={advantage.title} delay={index * 0.04}>
            <EditorialRow
              index={index + 1}
              title={advantage.title}
              description={advantage.description}
            />
          </Reveal>
        ))}
      </div>
    </Band>

    {/* 6 — Light close. The footer is dark, so this band has to be light. */}
    <Band tone="light" size="lg">
      <Reveal>
        <div className="max-w-4xl">
          <h2 className={`text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02] ${light.heading} text-balance`}>
            Work with us, or come work here.
          </h2>
          <p className={`mt-6 max-w-2xl text-lg md:text-xl leading-relaxed ${light.body}`}>
            Both conversations start the same way — tell us what you are trying
            to build and what is standing in the way of it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className={`group inline-flex items-center gap-2 rounded-full ${light.solidButton} px-7 py-3.5 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${light.focusRing}`}
            >
              Start a conversation
              <ArrowUpRight
                aria-hidden="true"
                className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              to="/jobs"
              className={`inline-flex items-center gap-2 rounded-full ${light.ghostButton} px-7 py-3.5 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${light.focusRing}`}
            >
              See open roles
            </Link>
          </div>
        </div>
      </Reveal>
    </Band>
  </>
);
