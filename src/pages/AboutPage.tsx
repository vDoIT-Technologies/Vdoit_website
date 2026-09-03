import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import {
  ADVANTAGES,
  ADVISORY_BOARD,
  COMPANY_INFO,
  MANAGEMENT_TEAM,
  OFFICES,
  TIMELINE_MILESTONES,
  VISION_MISSION,
} from '../data/companyData';
import type { TeamMember } from '../types';
import { Band, BandHeader } from '../components/ui/Band';
import { EditorialRow } from '../components/ui/EditorialRow';
import { PageHero } from '../components/layout/PageHero';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { TONE } from '../lib/tone';

/**
 * Tone tokens, read directly rather than through `useTone()` — the hook needs a
 * `Band` above it in the tree, and this page's markup *is* the band's children.
 */
const dark = TONE.ink;
const light = TONE.light;
const wash = TONE.wash;

/** The company facts that sit under the story. A label and a value, no cards. */
const STORY_FACTS = [
  { label: 'Registered as', value: COMPANY_INFO.name },
  { label: 'Founded', value: COMPANY_INFO.foundedYear },
  { label: 'Leadership', value: COMPANY_INFO.foundersExperience },
  { label: 'Delivery', value: COMPANY_INFO.corporateLocation },
];

/**
 * One person, on a light band. Shared by the management team and the advisory
 * board so the two read as the same kind of thing at different altitudes.
 */
const PersonCard: React.FC<{ person: TeamMember; tone: Record<string, string> }> = ({
  person,
  tone,
}) => (
  <article className={`flex h-full flex-col border-t ${tone.hairline} pt-8`}>
    {/* Initials as a typographic mark, not an avatar chip. */}
    <p
      aria-hidden="true"
      className={`text-5xl font-semibold tracking-[-0.04em] ${tone.meta} md:text-6xl`}
    >
      {person.initials}
    </p>

    <h3 className={`mt-8 text-2xl font-semibold tracking-[-0.02em] ${tone.heading} text-balance`}>
      {person.name}
    </h3>
    <p className={`mt-2 text-sm ${tone.accent}`}>{person.role}</p>

    <p className={`mt-6 text-base leading-relaxed ${tone.body}`}>{person.bio}</p>

    {person.focusAreas && person.focusAreas.length > 0 && (
      <ul className={`mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm ${tone.meta}`}>
        {person.focusAreas.map((area, index) => (
          <li key={area} className={index > 0 ? `border-l ${tone.hairline} pl-4` : ''}>
            {area}
          </li>
        ))}
      </ul>
    )}

    {person.linkedinUrl && (
      // `mt-auto` on the wrapper pins the control to the bottom of the card so
      // a row of these lines up regardless of bio length.
      <div className="mt-auto pt-10">
        <a
          href={person.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn — ${person.name}`}
          className={`group inline-flex items-center gap-2.5 rounded-full ${tone.ghostButton} px-6 py-3 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${tone.focusRing}`}
        >
          <Linkedin aria-hidden="true" className="h-4 w-4" />
          LinkedIn
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    )}
  </article>
);

export const AboutPage: React.FC = () => (
  <>
    {/* 1 — White page header, as on every page. */}
    <PageHero
      eyebrow="About us"
      title={
        <>
          Two founders, ten years,
          <br />
          no shelved prototypes.
        </>
      }
    />

    {/* 2 — Light. The story as prose at a reading measure, not a set of boxes.
        It opens directly under the page title. */}
    <Band tone="light" size="sm">
      <RevealGroup stagger={0.08} className="max-w-4xl">
        <RevealItem>
          <p className={`text-xs font-medium uppercase tracking-[0.18em] ${light.meta} mb-8`}>
            Our story
          </p>
        </RevealItem>

        <RevealItem>
          {/* The headline carries the band. Display size, light weight, tight tracking. */}
          <p
            className={`text-3xl font-semibold leading-[1.1] tracking-[-0.03em] ${light.heading} text-balance md:text-5xl`}
          >
            {COMPANY_INFO.headline}
          </p>
        </RevealItem>

        <RevealItem>
          <p className={`mt-10 max-w-3xl text-lg leading-relaxed ${light.body} md:text-xl`}>
            Established in 2015 by two people, VDOIT is now a team of 100+
            engineers that has delivered 200+ projects for 100+ clients across
            India, the United States, and the UAE — with heavy, sustained
            investment in R&amp;D behind it.
          </p>
        </RevealItem>

        <RevealItem>
          <p className={`mt-8 max-w-3xl text-lg leading-relaxed ${light.accent}`}>
            {COMPANY_INFO.tagline}
          </p>
        </RevealItem>
      </RevealGroup>

      {/* One image to break the prose before the footnotes. Decorative, so the
          alt is empty and it is skipped by screen readers. */}
      <Reveal delay={0.1}>
        <img
          src="/images/abstract-forms.jpg"
          alt=""
          loading="lazy"
          width={1200}
          height={800}
          className="mt-20 aspect-[3/2] w-full rounded-3xl object-cover"
        />
      </Reveal>

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

    {/* 3 — Ink. Vision and mission, given the one hard-contrast band on the
        page. Two statements, no icons, no cards. */}
    <Band tone="ink" size="lg">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        {[VISION_MISSION.vision, VISION_MISSION.mission].map((entry, index) => (
          <Reveal key={entry.label} delay={index * 0.08}>
            <div className={`border-t ${dark.hairline} pt-8`}>
              <p className={`text-xs font-medium uppercase tracking-[0.18em] ${dark.meta}`}>
                {entry.label}
              </p>
              <p
                className={`mt-8 text-3xl font-semibold leading-[1.05] tracking-[-0.035em] ${dark.heading} text-balance md:text-5xl`}
              >
                {entry.statement}
              </p>
              <p className={`mt-8 max-w-xl text-lg leading-relaxed ${dark.body}`}>{entry.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Band>

    {/* 4 — Light. The management team. */}
    <Band tone="light" size="lg">
      <Reveal>
        <BandHeader
          eyebrow="Management team"
          title="The people who answer for the work."
          lede="Both founders review delivery directly. There is no layer between the person who scopes your system and the person accountable for it."
        />
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {MANAGEMENT_TEAM.map((person, index) => (
          <Reveal key={person.name} delay={index * 0.08}>
            <PersonCard person={person} tone={light} />
          </Reveal>
        ))}
      </div>
    </Band>

    {/* 5 — Wash. The advisory board, or an honest account of why it is not
        listed yet. An empty grid with no explanation reads as a broken page. */}
    <Band tone="wash" size="lg">
      <Reveal>
        <BandHeader
          eyebrow="Advisory board"
          title={
            ADVISORY_BOARD.length > 0
              ? 'The people we take advice from.'
              : 'Being appointed, and named here when it is signed.'
          }
          lede={
            ADVISORY_BOARD.length > 0
              ? 'Independent counsel on strategy, governance, and the markets we operate in.'
              : undefined
          }
        />
      </Reveal>

      {ADVISORY_BOARD.length > 0 ? (
        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {ADVISORY_BOARD.map((person, index) => (
            <Reveal key={person.name} delay={index * 0.08}>
              <PersonCard person={person} tone={wash} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="mt-16">
          <div className={`max-w-xl border-t ${wash.hairline} pt-8`}>
            <p className={`text-lg leading-relaxed ${wash.body}`}>
              We would rather leave this section empty than fill it with names
              we have not confirmed. Advisers are listed here once appointments
              are formalised.
            </p>
            <Link
              to="/contact"
              className={`group mt-8 inline-flex items-center gap-2 rounded-full ${wash.ghostButton} px-7 py-3.5 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${wash.focusRing}`}
            >
              Talk to the leadership team
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      )}
    </Band>

    {/* 6 — Light. A decade on a spine: year, marker, entry. */}
    <Band tone="light" size="lg">
      <Reveal>
        <BandHeader eyebrow="Track record" title="How the last decade actually went." />
      </Reveal>

      <ol className="mt-16">
        {TIMELINE_MILESTONES.map((milestone, index) => (
          <li key={milestone.year} className={`border-t ${light.hairline}`}>
            <Reveal
              delay={index * 0.05}
              className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[12rem_1fr] md:gap-12 md:py-14"
            >
              <p
                className={`text-4xl font-semibold tracking-[-0.03em] tabular-nums ${light.heading} md:text-5xl`}
              >
                {milestone.year}
              </p>

              {/* The left border is the spine; consecutive entries make it continuous. */}
              <div className={`relative md:border-l ${light.hairline} md:pl-12`}>
                <span
                  aria-hidden="true"
                  className="absolute -left-1 top-2.5 hidden h-2 w-2 rounded-full bg-brand-600 md:block"
                />
                <h3
                  className={`text-2xl font-semibold tracking-tight ${light.heading} text-balance md:text-3xl`}
                >
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

    {/* 7 — Wash. Why us, as numbered rows. This used to be a six-card grid. */}
    <Band tone="wash" size="lg">
      <Reveal>
        <BandHeader eyebrow="Why VDOIT" title="Six reasons, none of them a logo wall." />
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

    {/* 8 — Light close. Offices, then the two ways to start a conversation. */}
    <Band tone="light" size="lg">
      <Reveal>
        <div className="max-w-4xl">
          <h2
            className={`text-4xl font-semibold leading-[1.02] tracking-[-0.03em] ${light.heading} text-balance md:text-6xl`}
          >
            Work with us, or come work here.
          </h2>
          <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${light.body} md:text-xl`}>
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
                className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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

      <RevealGroup stagger={0.06} className="mt-20 grid gap-10 sm:grid-cols-3">
        {OFFICES.map(office => (
          <RevealItem key={office.country}>
            <div className={`border-t ${light.hairline} pt-6`}>
              <p className={`text-xs font-medium uppercase tracking-[0.18em] ${light.meta}`}>
                {office.country}
              </p>
              <p className={`mt-3 text-xl font-semibold tracking-tight ${light.heading}`}>
                {office.city}
              </p>
              <p className={`mt-3 text-sm leading-relaxed ${light.body}`}>{office.address}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Band>
  </>
);
