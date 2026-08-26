import React from 'react';
import {
  Users2,
  Award,
  Globe2,
  Sparkles,
  Linkedin,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Building
} from 'lucide-react';
import { FOUNDERS, TIMELINE_MILESTONES } from '../data/companyData';

interface HeritageSectionProps {
  onOpenConsultation: () => void;
}

export const HeritageSection: React.FC<HeritageSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="heritage" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 relative overflow-hidden">
      {/* Depth: dark mode carries elevation with glow, not shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 rounded-full bg-blue-500/10 blur-3xl opacity-0 dark:opacity-100"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-400/20 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Established 2015 • A Decade of Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our Heritage & Executive Leadership
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
            Founded with the philosophy of delivering true, measurable value to global clients, VDO IT Technologies is built on over 15 years of US technology leadership and a mature engineering pedigree.
          </p>
        </div>

        {/* Founders Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {FOUNDERS.map((founder, idx) => (
            <div
              key={idx}
              className="h-full rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] dark:ring-1 dark:ring-white/5 hover:border-blue-300 dark:hover:border-blue-400/40 p-6 sm:p-8 flex flex-col shadow-xs dark:shadow-none hover:shadow-lg transition-all group"
            >
              {/* Identity */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center space-x-4 min-w-0">
                  {/* Gradient-ringed avatar */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-md shadow-blue-600/20 dark:shadow-blue-500/20 flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-white dark:bg-slate-950 flex items-center justify-center font-extrabold text-blue-700 dark:text-blue-300 text-lg tracking-tight">
                      {founder.initials}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                      {founder.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-300 leading-snug">
                      {founder.role}
                    </p>
                  </div>
                </div>

                <a
                  href={founder.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-[#0077b5] dark:hover:bg-[#0077b5] text-slate-600 dark:text-slate-300 hover:text-white dark:hover:text-white border border-slate-200 dark:border-white/10 hover:border-[#0077b5] dark:hover:border-[#0077b5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 active:scale-[0.99] transition-all flex-shrink-0"
                  title={`Connect with ${founder.name} on LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">{`Connect with ${founder.name} on LinkedIn`}</span>
                </a>
              </div>

              {/* Experience line */}
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                <Award className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" aria-hidden="true" />
                <span>{founder.experienceYears}</span>
              </div>

              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-400/20 text-xs text-blue-800 dark:text-blue-300 font-medium mb-4">
                <Globe2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-300 flex-shrink-0" aria-hidden="true" />
                <span>{founder.usExperienceHighlight}</span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {founder.bio}
              </p>

              {/* Focus Areas */}
              <div className="space-y-2 mb-6">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-300 uppercase tracking-wider block">
                  Strategic Focus & Specialization:
                </span>
                <div className="flex flex-wrap gap-2">
                  {founder.focusAreas.map((area, fIdx) => (
                    <span
                      key={fIdx}
                      className="text-xs px-2.5 py-1 rounded-full bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* LinkedIn affordance, pinned to the bottom so cards align */}
              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/[0.08]">
                <a
                  href={founder.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.07] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-400/40 text-xs font-semibold shadow-xs dark:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 active:scale-[0.99] transition-all"
                >
                  <Linkedin className="w-4 h-4 text-[#0077b5]" aria-hidden="true" />
                  <span>View LinkedIn Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* The Growth Story & AI Strategic Shift Timeline */}
        <div className="rounded-3xl bg-slate-900 dark:bg-white/[0.03] border border-slate-800 dark:border-white/10 dark:ring-1 dark:ring-white/5 p-6 sm:p-8 md:p-12 shadow-xl dark:shadow-none relative overflow-hidden text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl"
          />

          <div className="max-w-3xl mx-auto text-center mb-12 relative">
            <span className="text-xs font-bold text-blue-400 dark:text-blue-300 uppercase tracking-wider">
              The Evolution of VDO IT Technologies
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
              From Value-Driven Engineering to Enterprise AI Leadership
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400 mt-2 leading-relaxed">
              How our single-minded focus on client ROI propelled our journey from foundational digital platforms to world-class Generative AI and autonomous agent systems.
            </p>
          </div>

          {/* Timeline: one spine, year markers, entries alternating on desktop */}
          <ol className="relative">
            <span
              aria-hidden="true"
              className="absolute left-3 md:left-1/2 md:-ml-px top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-blue-400/40 dark:via-blue-300/30 to-transparent"
            />

            {TIMELINE_MILESTONES.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <li
                  key={idx}
                  className="relative pl-12 md:pl-0 pb-8 last:pb-0 md:pb-12 md:last:pb-0"
                >
                  {/* Year marker on the spine */}
                  <span
                    aria-hidden="true"
                    className="absolute left-3 md:left-1/2 top-8 -ml-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-slate-900 dark:ring-slate-950 shadow-lg shadow-blue-500/30"
                  />

                  <div className={`md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <div className="h-full rounded-2xl bg-slate-950 dark:bg-white/[0.05] border border-slate-800 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-blue-400/40 p-6 flex flex-col transition-all">
                      <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-mono tracking-tight block mb-2">
                        {item.year}
                      </span>
                      <h4 className="text-base font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-auto pt-4 flex items-center space-x-1.5 text-xs text-blue-400 dark:text-blue-300 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Proven Track Record</span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Strategic Consultation Banner */}
          <div className="mt-10 pt-8 border-t border-slate-800 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative">
            <div>
              <h4 className="text-base font-bold text-white">
                Speak Directly with Narendra Kumar Kamra & The AI Practice Leadership
              </h4>
              <p className="text-xs text-slate-300 dark:text-slate-400 leading-relaxed">
                Discuss your enterprise technology roadmap with leaders who have 15+ years of US & global delivery experience.
              </p>
            </div>
            <a
              href="#contact"
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 dark:shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex-shrink-0"
            >
              <span>Schedule Leadership Strategy Call</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
