import React, { useState } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Truck, 
  Factory, 
  ShoppingBag, 
  Building2, 
  ArrowRight, 
  Check, 
  Layers, 
  TrendingUp 
} from 'lucide-react';
import { INDUSTRIES } from '../data/companyData';
import { IndustryItem } from '../types';

interface IndustriesSectionProps {
  onSelectIndustryForInquiry: (industryName: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectIndustryForInquiry }) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>(INDUSTRIES[0].id);

  const activeIndustry = INDUSTRIES.find(i => i.id === selectedIndustryId) || INDUSTRIES[0];

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Truck': return <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Factory': return <Factory className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      default: return <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section id="industries" className="py-20 bg-white dark:bg-slate-900/40 border-t border-slate-200 dark:border-white/10 relative">
      {/* Dark-mode depth: glows do the work shadows do in light mode. */}
      <div aria-hidden="true" className="hidden dark:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-400/20 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Vertical Domain Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI-Based Solutions Across All Industries
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3">
            Every sector faces distinct compliance, data complexity, and operational bottlenecks. VDO IT Technologies architects specialized solutions tailored to your industry's exact DNA.
          </p>
        </div>

        {/* Industry Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {INDUSTRIES.map((ind) => {
            const isSelected = ind.id === selectedIndustryId;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustryId(ind.id)}
                aria-pressed={isSelected}
                className={`h-full p-4 rounded-xl text-left flex flex-col justify-between border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 active:scale-[0.99] ${
                  isSelected
                    ? 'bg-blue-50/90 border-blue-500 shadow-sm scale-[1.02] dark:bg-blue-500/10 dark:border-blue-400/40 dark:ring-1 dark:ring-blue-400/20 dark:shadow-none'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 dark:bg-white/[0.04] dark:border-white/[0.08] dark:hover:bg-white/[0.07] dark:hover:border-white/20'
                }`}
              >
                <div className="mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected
                      ? 'bg-white border border-blue-200 shadow-xs dark:bg-blue-500/15 dark:border-blue-400/30 dark:shadow-none'
                      : 'bg-white border border-slate-200 dark:bg-white/[0.06] dark:border-white/10'
                  }`}>
                    {getIndustryIcon(ind.iconName)}
                  </div>
                  <span className={`text-xs font-bold block leading-snug ${
                    isSelected ? 'text-blue-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {ind.name}
                  </span>
                </div>

                {/* Stat block: numeral leads, micro-label supports */}
                <div className="mt-auto">
                  <span className={`block text-xl font-black tracking-tight leading-none ${
                    isSelected ? 'text-blue-600 dark:text-blue-300' : 'text-slate-900 dark:text-white'
                  }`}>
                    {ind.statNumber}
                  </span>
                  <span className={`block text-[10px] font-bold tracking-wider uppercase leading-tight mt-1.5 ${
                    isSelected ? 'text-blue-700 dark:text-blue-300/80' : 'text-slate-500 dark:text-slate-500'
                  }`}>
                    {ind.statLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Industry Deep-Dive Card */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-10 shadow-xl relative overflow-hidden text-white dark:bg-white/[0.04] dark:border-white/10 dark:ring-1 dark:ring-white/5 dark:shadow-none">
          <div aria-hidden="true" className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 dark:bg-blue-500/20 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 dark:bg-blue-500/10 dark:border-blue-400/20 text-xs font-semibold">
                <span>Domain Focus: {activeIndustry.name}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeIndustry.tagline}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeIndustry.description}
              </p>

              {/* Use Cases */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Proven Solution Blueprints:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeIndustry.aiUseCases.map((uc, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 dark:bg-white/[0.04] dark:border-white/[0.08]">
                      <Check className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>{uc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <a
                  href="#contact"
                  onClick={() => onSelectIndustryForInquiry(activeIndustry.name)}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-bold text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 dark:shadow-blue-500/20 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 transition-all"
                >
                  <span>Inquire for {activeIndustry.name.split('&')[0].trim()}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <span className="text-xs text-slate-400">
                  Custom AI feasibility audit in under 24 hours.
                </span>
              </div>
            </div>

            {/* Right Metric Box */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <div className="rounded-2xl bg-slate-950 border border-slate-800 dark:bg-white/[0.04] dark:border-white/10 p-6 sm:p-8 text-center relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 dark:border-blue-400/25 text-blue-400 dark:text-blue-300 mb-4">
                  <TrendingUp className="w-6 h-6" aria-hidden="true" />
                </div>

                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight block">
                  {activeIndustry.statNumber}
                </span>

                <span className="text-xs sm:text-sm font-bold text-slate-200 dark:text-slate-300 uppercase tracking-wider block mt-1.5">
                  {activeIndustry.statLabel}
                </span>

                <p className="text-xs text-slate-400 mt-4 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800 dark:bg-white/[0.04] dark:border-white/[0.08]">
                  "{activeIndustry.keyOutcome}"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 dark:bg-white/[0.04] dark:border-white/[0.08] text-xs text-slate-400 flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                <span>Enterprise compliance protocols (HIPAA, SOC2, GDPR, PCI-DSS) baked into our AI architectures.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
