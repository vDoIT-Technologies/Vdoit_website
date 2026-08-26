import React, { useMemo, useState } from 'react';
import {
  Rocket,
  Cpu,
  Globe2,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Code2,
  Cloud,
  Palette,
  Users2,
  Briefcase,
  MapPin,
  Signal,
  ArrowRight,
} from 'lucide-react';
import { CAREERS_INFO, JOB_OPENINGS, COMPANY_INFO } from '../data/companyData';
import type { JobOpening } from '../types';

interface CareersSectionProps {
  onApplyForRole?: (roleTitle: string) => void;
}

const ALL_DISCIPLINES = 'All Roles';

export const CareersSection: React.FC<CareersSectionProps> = ({ onApplyForRole }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(ALL_DISCIPLINES);

  const getIcon = (iconName: string) => {
    const cls = 'w-5 h-5 text-blue-600 dark:text-blue-400';
    switch (iconName) {
      case 'Rocket': return <Rocket className={cls} aria-hidden="true" />;
      case 'Cpu': return <Cpu className={cls} aria-hidden="true" />;
      case 'Globe2': return <Globe2 className={cls} aria-hidden="true" />;
      case 'GraduationCap': return <GraduationCap className={cls} aria-hidden="true" />;
      case 'Sparkles': return <Sparkles className={cls} aria-hidden="true" />;
      case 'TrendingUp': return <TrendingUp className={cls} aria-hidden="true" />;
      case 'Code2': return <Code2 className={cls} aria-hidden="true" />;
      case 'Cloud': return <Cloud className={cls} aria-hidden="true" />;
      case 'Palette': return <Palette className={cls} aria-hidden="true" />;
      case 'Users2': return <Users2 className={cls} aria-hidden="true" />;
      default: return <Briefcase className={cls} aria-hidden="true" />;
    }
  };

  const disciplines = useMemo(
    () => [ALL_DISCIPLINES, ...Array.from(new Set(JOB_OPENINGS.map((job) => job.discipline)))],
    []
  );

  const filteredJobs = useMemo(
    () =>
      selectedDiscipline === ALL_DISCIPLINES
        ? JOB_OPENINGS
        : JOB_OPENINGS.filter((job) => job.discipline === selectedDiscipline),
    [selectedDiscipline]
  );

  const mailtoForRole = (job: JobOpening) =>
    `mailto:${COMPANY_INFO.inquiryEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`;

  return (
    <section
      id="careers"
      className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 relative overflow-hidden"
    >
      {/* Depth glow — decorative, carries elevation in dark mode */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-400/20 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{CAREERS_INFO.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {CAREERS_INFO.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
            {CAREERS_INFO.subheadline}
          </p>
        </div>

        {/* Perks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {CAREERS_INFO.perks.map((perk) => (
            <div
              key={perk.title}
              className="rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] dark:ring-1 dark:ring-white/5 p-6 shadow-xs transition-all hover:border-blue-400 dark:hover:border-blue-400/30"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 dark:bg-blue-500/10 dark:border-blue-400/20 flex items-center justify-center mb-4">
                {getIcon(perk.iconName)}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                {perk.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {perk.description}
              </p>
            </div>
          ))}
        </div>

        {/* Discipline filter */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-12">
          {disciplines.map((discipline) => {
            const isActive = discipline === selectedDiscipline;
            return (
              <button
                key={discipline}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedDiscipline(discipline)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-[0.99] ${
                  isActive
                    ? 'bg-blue-600 dark:bg-blue-500 text-white border border-blue-600 dark:border-blue-500 shadow-lg shadow-blue-600/25 dark:shadow-blue-500/20'
                    : 'bg-white dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10 shadow-xs hover:border-blue-400 dark:hover:border-blue-400/30'
                }`}
              >
                {discipline}
              </button>
            );
          })}
        </div>

        {/* Openings */}
        {filteredJobs.length === 0 ? (
          <div className="max-w-xl mx-auto text-center rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] p-8 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No openings in this discipline right now
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-2 mb-5">
              Show every open role, or send your profile to our talent inbox and we will reach out when a match opens.
            </p>
            <button
              type="button"
              onClick={() => setSelectedDiscipline(ALL_DISCIPLINES)}
              className="inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 dark:shadow-blue-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <span>{ALL_DISCIPLINES}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="flex flex-col h-full rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] dark:ring-1 dark:ring-white/5 p-6 shadow-xs transition-all hover:border-blue-400 dark:hover:border-blue-400/30"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 dark:bg-blue-500/10 dark:border-blue-400/20 flex items-center justify-center flex-shrink-0">
                    {getIcon(job.iconName)}
                  </div>
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-400/20 dark:text-blue-300 text-xs font-semibold">
                    <Signal className="w-3 h-3" aria-hidden="true" />
                    <span>{job.workMode}</span>
                  </span>
                </div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 mb-1.5">
                  {job.discipline}
                </p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {job.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2 text-xs text-slate-500 dark:text-slate-500">
                  <span className="inline-flex items-center space-x-1.5">
                    <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{job.level}</span>
                  </span>
                  <span className="inline-flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{job.location}</span>
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                  {job.summary}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  {onApplyForRole ? (
                    <button
                      type="button"
                      onClick={() => onApplyForRole(job.title)}
                      className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.07] text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-300 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-400/30 shadow-xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-[0.99]"
                    >
                      <span>Apply for this role</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  ) : (
                    <a
                      href={mailtoForRole(job)}
                      className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.07] text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-300 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-400/30 shadow-xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-[0.99]"
                    >
                      <span>Apply for this role</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
