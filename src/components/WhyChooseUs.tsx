import React from 'react';
import {
  ShieldCheck,
  Award,
  Building,
  Target,
  Lock,
  Layers,
  Zap,
  Check,
  X,
  Sparkles
} from 'lucide-react';
import { ADVANTAGES } from '../data/companyData';

export const WhyChooseUs: React.FC = () => {
  const getAdvantageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Building': return <Building className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Target': return <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Lock': return <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default: return <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section id="why-vdoit" className="py-20 bg-white dark:bg-slate-900/40 border-t border-slate-200 dark:border-white/10 relative overflow-hidden">

      {/* Depth glow — dark mode only, purely decorative */}
      <div
        aria-hidden="true"
        className="hidden dark:block pointer-events-none absolute -bottom-24 right-0 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-400/20 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>The Enterprise Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Market Leaders Trust VDO IT Technologies
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
            A mature enterprise partner versus unproven AI wrapper startups. We bridge over a decade of verified engineering discipline with state-of-the-art AI innovation.
          </p>
        </div>

        {/* Comparison Matrix: Mature Enterprise Firm vs Generic AI Startups */}
        <div className="mb-16 rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 dark:ring-1 dark:ring-white/5 overflow-hidden shadow-sm dark:shadow-none">
          <div className="p-6 sm:p-8 bg-slate-900 dark:bg-white/[0.06] text-white">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              The Critical Difference: Architectural Maturity &amp; Accountability
            </h3>
            <p className="text-sm text-slate-300 dark:text-slate-400 leading-relaxed mt-2">
              Why enterprise executives choose VDOIT's proven 10+ year track record over speculative AI experimenters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-white/10">

            {/* VDO IT Technologies (Left) */}
            <div className="p-6 sm:p-8 bg-blue-50/30 dark:bg-blue-500/[0.06]">
              <div className="flex items-center flex-wrap gap-2 mb-6">
                <span className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400" aria-hidden="true"></span>
                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                  VDO IT Technologies Limited
                </h4>
                <span className="text-xs uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-400/20">
                  Established 2015
                </span>
              </div>

              <ul className="space-y-3.5">
                {[
                  '15+ Years US & Global executive leadership pedigree overseeing delivery',
                  '10+ Years operational stability with 200+ production systems shipped',
                  'Rigorous private VPC models & zero-IP-leakage enterprise security',
                  'Full-stack lifecycle: Data Lakehouse + MLOps + Custom Frontend + Backend',
                  'Dedicated SLAs, formal governance, and measurable business ROI KPIs',
                  'Predictable, transparent commercial models with full IP ownership'
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Typical AI Startups (Right) */}
            <div className="p-6 sm:p-8 bg-slate-50/70 dark:bg-white/[0.02]">
              <div className="flex items-center flex-wrap gap-2 mb-6">
                <span className="w-3 h-3 rounded-full bg-rose-500 dark:bg-rose-400" aria-hidden="true"></span>
                <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300 tracking-tight">
                  Generic AI Wrapper Startups
                </h4>
                <span className="text-xs uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-400/20">
                  Unproven
                </span>
              </div>

              <ul className="space-y-3.5">
                {[
                  'Inexperienced founders relying solely on pre-packaged third-party wrappers',
                  'Less than 1-2 years of operational runway and zero enterprise delivery history',
                  'Risk of sensitive customer data leaking into shared public LLM models',
                  'Superficial UI demos lacking real integration with legacy databases and ERPs',
                  'No formal SLAs, unpredictable hallucination risks, and zero compliance audits',
                  'Vendor lock-in with proprietary opaque monthly subscription fees'
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <X className="w-4 h-4 text-rose-500 dark:text-rose-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* 6 Key Enterprise Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADVANTAGES.map((adv, idx) => (
            <div
              key={idx}
              className="group h-full flex flex-col rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] dark:ring-1 dark:ring-white/5 p-6 shadow-xs hover:border-blue-400 dark:hover:border-blue-400/40 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-400/20 flex items-center justify-center mb-4 flex-shrink-0 transition-colors">
                {getAdvantageIcon(adv.icon)}
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                {adv.title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
