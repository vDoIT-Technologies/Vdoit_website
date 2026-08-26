import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  TrendingUp, 
  Globe2, 
  Layers, 
  CheckCircle2,
  Users2,
  Calendar
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';
import { HeroCanvas } from './ui/HeroCanvas';

interface HeroProps {
  onOpenEstimator: () => void;
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimator, onOpenInquiry }) => {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Grid substrate, then the WebGL field on top of it */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-60 dark:opacity-40" />
      <HeroCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealGroup trigger="mount" stagger={0.09} delay={0.05} className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Heritage Badge */}
          <RevealItem>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-400/20 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-6 shadow-xs backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
            <span>A Decade of Enterprise Digital Craftsmanship • Est. 2015</span>
          </div>
          </RevealItem>

          {/* Main Headline */}
          <RevealItem>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-slate-900 dark:text-white leading-[1.05] mb-6 text-balance">
            World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-300">Enterprise AI</span> Engineered for Measurable Business Growth
          </h1>
          </RevealItem>

          {/* Subheading */}
          <RevealItem className="max-w-3xl">
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-3xl mb-8">
            Founded in 2015 by technology veterans with 15+ years of US leadership experience, <strong className="text-slate-900 dark:text-white font-semibold">VDO IT Technologies</strong> empowers global enterprises with production-grade Generative AI, autonomous agents, and mission-critical software systems designed strictly for business value and high ROI.
          </p>
          </RevealItem>

          {/* Direct CTA Buttons */}
          <RevealItem className="w-full sm:w-auto">
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <a
              href="#contact"
              onClick={onOpenInquiry}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white dark:text-slate-950 font-bold text-base shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 dark:shadow-blue-500/30 dark:hover:shadow-blue-400/45 hover:scale-[1.01] active:scale-[0.99] transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <span>Schedule Enterprise Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenEstimator}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-semibold text-base border border-slate-300 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-400/40 backdrop-blur-md transition-all shadow-xs active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Interactive AI Solution Estimator</span>
            </button>
          </div>
          </RevealItem>

          {/* Value Pillars Badges */}
          <RevealItem className="w-full max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl pt-2 pb-8 border-t border-slate-200 dark:border-white/10 text-left">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-white/[0.04] p-3 rounded-xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs transition-colors hover:border-blue-300 dark:hover:border-blue-400/30">
              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="font-medium">Zero "Hype AI" Bloat</span>
            </div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-white/[0.04] p-3 rounded-xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs transition-colors hover:border-blue-300 dark:hover:border-blue-400/30">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-medium">100% IP & Data Privacy</span>
            </div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-white/[0.04] p-3 rounded-xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs transition-colors hover:border-blue-300 dark:hover:border-blue-400/30">
              <Users2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span className="font-medium">US-Trained Leadership</span>
            </div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-white/[0.04] p-3 rounded-xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs transition-colors hover:border-blue-300 dark:hover:border-blue-400/30">
              <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="font-medium">Direct ROI Focus</span>
            </div>
          </div>
          </RevealItem>

        </RevealGroup>

        {/* Enterprise Metrics Bar */}
        <Reveal trigger="mount" delay={0.55} duration={0.7}>
        <div className="mt-4 max-w-5xl mx-auto rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 dark:ring-1 dark:ring-white/5 p-6 md:p-8 shadow-sm dark:shadow-none backdrop-blur-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-white/10">
            {COMPANY_INFO.stats.map((stat, idx) => (
              <div key={idx} className={`flex flex-col items-center ${idx > 0 ? 'pt-4 lg:pt-0' : ''}`}>
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-300 mt-1 uppercase tracking-wider">
                  {stat.label}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-500 mt-0.5 max-w-[180px]">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
        </Reveal>

      </div>
    </section>
  );
};
