import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  TrendingUp,
  ScanEye,
  Database,
  Code2,
  ArrowRight,
  Check,
  Layers,
  ChevronRight,
  Shield
} from 'lucide-react';
import { SERVICES } from '../data/companyData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeService, setActiveService] = useState<ServiceItem | null>(SERVICES[0]);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'genai', label: 'Generative AI & LLMs' },
    { id: 'agents', label: 'AI Agents & Automation' },
    { id: 'vision', label: 'Computer Vision & Edge' },
    { id: 'cloud-data', label: 'Cloud & Data Pipelines' },
    { id: 'software', label: 'Custom Enterprise Apps' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === selectedCategory || (selectedCategory === 'genai' && s.id === 'predictive-ml'));

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'Bot': return <Bot className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'ScanEye': return <ScanEye className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'Database': return <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'Code2': return <Code2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      default: return <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-900/40 border-t border-slate-200 dark:border-white/10 relative overflow-hidden">

      {/* Depth glow — dark mode only, purely decorative */}
      <div
        aria-hidden="true"
        className="hidden dark:block pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-400/20 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>World-Class AI &amp; Technology Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Enterprise Solutions Tailored for Every Challenge
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
            Over the last several years, VDO IT Technologies has focused relentlessly on advanced AI architectures that replace manual latency with governed, automated intelligence.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              aria-pressed={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`cursor-pointer px-4 py-3 text-xs sm:text-sm font-semibold rounded-xl border transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-400 shadow-lg shadow-blue-600/25 dark:shadow-blue-500/20'
                  : 'bg-white dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 shadow-xs hover:bg-slate-50 dark:hover:bg-white/[0.07] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group h-full flex flex-col rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] dark:ring-1 dark:ring-white/5 p-6 shadow-xs hover:border-blue-400 dark:hover:border-blue-400/40 transition-all"
            >
              {/* Icon tile + badge */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-400/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  {getIcon(service.iconName)}
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                  {service.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-300 mt-2">
                {service.tagline}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
                {service.description}
              </p>

              {/* Key Features List */}
              <div className="mt-6 space-y-2">
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                  Core Capabilities
                </span>
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Business Impact & Inquire Action — pinned to the bottom of every card */}
              <div className="mt-auto pt-6">
                <div className="rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-4">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                    Measurable Value
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {service.businessImpact}
                  </p>
                </div>

                <a
                  href="#contact"
                  onClick={() => onSelectServiceForInquiry(service.title)}
                  className="mt-4 w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-blue-600 dark:hover:bg-blue-500 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white border border-slate-300 dark:border-white/10 hover:border-blue-600 dark:hover:border-blue-400 font-semibold text-sm shadow-xs transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 group/btn"
                >
                  <span>Inquire for {service.title.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Global Value Commitment Note */}
        <div className="rounded-2xl bg-slate-900 dark:bg-white/[0.04] border border-slate-800 dark:border-white/10 dark:ring-1 dark:ring-white/5 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-lg dark:shadow-none">
          <div className="flex items-center space-x-4">
            <div className="w-11 h-11 rounded-xl bg-blue-500/20 dark:bg-blue-500/10 border border-blue-400/30 dark:border-blue-400/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-blue-400 dark:text-blue-300" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Looking for a Custom Multi-Disciplinary AI Architecture?
              </h4>
              <p className="text-sm text-slate-300 dark:text-slate-400 leading-relaxed mt-1">
                Our founders Narendra Kumar Kamra and Neetu Gupta personally oversee initial enterprise feasibility reviews.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            onClick={() => onSelectServiceForInquiry('Custom AI Transformation')}
            className="flex-shrink-0 inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-bold text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 dark:shadow-blue-500/20 transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
          >
            <span>Request Feasibility Review</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

      </div>
    </section>
  );
};
