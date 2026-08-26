import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CAREERS_INFO, COMPANY_INFO, JOB_OPENINGS } from '../data/companyData';
import { Band, BandHeader } from '../components/ui/Band';
import { PageHero } from '../components/layout/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { TONE } from '../lib/tone';

const ALL = 'All roles';

// The page renders its own Bands, so tone comes from the tokens directly
// rather than useTone() — which would read the default context out here.
const dark = TONE.dark;
const light = TONE.light;

export const JobsPage: React.FC = () => {
  const [discipline, setDiscipline] = useState<string>(ALL);

  const disciplines = useMemo(
    () => [ALL, ...Array.from(new Set(JOB_OPENINGS.map(job => job.discipline)))],
    []
  );

  const openings = useMemo(
    () =>
      discipline === ALL
        ? JOB_OPENINGS
        : JOB_OPENINGS.filter(job => job.discipline === discipline),
    [discipline]
  );

  return (
    <>
      {/* 1 — Dark hero. */}
      <PageHero
        eyebrow={CAREERS_INFO.eyebrow}
        title={CAREERS_INFO.headline}
        lede={CAREERS_INFO.subheadline}
      />

      {/* 2 — Light. Why work here, as rows rather than four icon cards. */}
      <Band tone="light" size="lg">
        <Reveal>
          <BandHeader
            eyebrow="What you get"
            title="Ownership, not a ticket queue."
          />
        </Reveal>

        <div className="mt-16">
          {CAREERS_INFO.perks.map((perk, index) => (
            <Reveal key={perk.title} delay={index * 0.04}>
              <div className="grid grid-cols-[auto_1fr] items-start gap-6 border-t border-slate-200 py-8 md:grid-cols-[auto_1fr_1.2fr] md:gap-12 md:py-10">
                <span className="pt-2 text-xs font-mono tabular-nums text-slate-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-950">
                  {perk.title}
                </h3>
                <p className="col-start-2 text-base leading-relaxed text-slate-600 md:col-start-3 md:pt-2">
                  {perk.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 3 — Dark. The open roles: the centre of the page. */}
      <Band tone="dark" size="lg">
        <Reveal>
          <BandHeader
            eyebrow="Open roles"
            title={`${JOB_OPENINGS.length} positions, hiring now.`}
          />
        </Reveal>

        <Reveal>
          <div
            role="group"
            aria-label="Filter roles by discipline"
            className="mt-12 flex flex-wrap gap-2"
          >
            {disciplines.map(item => {
              const selected = item === discipline;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setDiscipline(item)}
                  className={`rounded-full px-5 py-2.5 text-sm transition-all active:scale-[0.98] focus-visible:outline-none ${dark.focusRing} ${
                    selected
                      ? 'bg-white text-slate-950'
                      : 'border border-white/15 text-slate-400 hover:text-white hover:border-white/40'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-16">
          {openings.map((job, index) => (
            <Reveal key={job.id} delay={index * 0.03}>
              <article className="grid gap-6 border-t border-white/10 py-10 lg:grid-cols-[auto_1fr_auto] lg:gap-12">
                <span className="text-xs font-mono tabular-nums text-slate-500 lg:pt-3">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    {job.discipline}
                  </p>
                  <h3 className="mt-4 text-2xl md:text-4xl font-semibold tracking-tight text-white">
                    {job.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">
                    {job.summary}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {job.stack.map(item => (
                      <li
                        key={item}
                        className={`rounded-full px-3 py-1 text-xs ${dark.chip}`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4 lg:items-end lg:text-right">
                  <dl className="space-y-1 text-sm text-slate-400">
                    <div>
                      <dt className="sr-only">Level</dt>
                      <dd>{job.level}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Location</dt>
                      <dd>{job.location}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Work mode</dt>
                      <dd className={dark.accent}>{job.workMode}</dd>
                    </div>
                  </dl>

                  <a
                    href={`mailto:${COMPANY_INFO.inquiryEmail}?subject=${encodeURIComponent(
                      `Application: ${job.title}`
                    )}`}
                    className={`group inline-flex items-center gap-2 self-start rounded-full px-6 py-3 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none lg:self-end ${dark.solidButton} ${dark.focusRing}`}
                  >
                    Apply
                    <ArrowUpRight
                      aria-hidden="true"
                      className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}

          {openings.length === 0 && (
            <div className="border-t border-white/10 py-16">
              <p className="text-2xl font-semibold tracking-tight text-white">
                Nothing open in {discipline} right now.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">
                We still want to hear from strong people ahead of a role opening.
                Send us your work and tell us what you want to build.
              </p>
              <button
                type="button"
                onClick={() => setDiscipline(ALL)}
                className={`mt-8 rounded-full px-6 py-3 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${dark.ghostButton} ${dark.focusRing}`}
              >
                Show all roles
              </button>
            </div>
          )}
        </div>
      </Band>

      {/* 4 — Light close. The footer is dark, so this band has to be light. */}
      <Band tone="light" size="lg">
        <Reveal>
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02] text-slate-950 text-balance">
              No role that fits? Write anyway.
            </h2>
            <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-slate-600">
              Send what you have built and what you want to build next. We read
              everything, and we have opened roles for people before the role
              existed.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`mailto:${COMPANY_INFO.inquiryEmail}?subject=${encodeURIComponent(
                  'Open application'
                )}`}
                className={`group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${light.solidButton} ${light.focusRing}`}
              >
                {COMPANY_INFO.inquiryEmail}
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${light.ghostButton} ${light.focusRing}`}
              >
                Contact the team
              </Link>
            </div>
          </div>
        </Reveal>
      </Band>
    </>
  );
};
