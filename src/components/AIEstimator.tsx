import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Layers, 
  Send, 
  Cpu, 
  HelpCircle,
  ShieldCheck,
  RefreshCw,
  ChevronDown
} from 'lucide-react';
import { AIEstimateResult } from '../types';

interface AIEstimatorProps {
  onApplyBlueprintToInquiry: (blueprintData: {
    industry: string;
    workflow: string;
    details: string;
  }) => void;
}

export const AIEstimator: React.FC<AIEstimatorProps> = ({ onApplyBlueprintToInquiry }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Healthcare & Life Sciences');
  const [selectedGoal, setSelectedGoal] = useState<string>('Automate Multi-Step Document & Data Workflows (LLMs / Agents)');
  const [dataMaturity, setDataMaturity] = useState<string>('Structured SQL / Cloud DBs (Ready for Vectorization)');
  const [timelineGoal, setTimelineGoal] = useState<string>('Fast MVP in 4-8 Weeks');
  const [generatedResult, setGeneratedResult] = useState<AIEstimateResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const industriesList = [
    'Healthcare & Life Sciences',
    'Banking, FinTech & Insurance',
    'Supply Chain & Smart Logistics',
    'Manufacturing & Industry 4.0',
    'Retail, E-Commerce & Consumer Brands',
    'Real Estate & Smart Infrastructure',
    'Legal & Professional Services',
    'Custom Enterprise SaaS'
  ];

  const goalsList = [
    'Automate Multi-Step Document & Data Workflows (LLMs / Agents)',
    'Deploy Private Enterprise RAG & Internal Knowledge Intelligence',
    'Real-Time Computer Vision Quality Control or Spatial Analytics',
    'Predictive Analytics, Demand Forecasting & Risk Scoring',
    'Cloud Monolith Modernization to AI-Ready Microservices',
    'End-to-End Custom Web/Mobile Enterprise App'
  ];

  const maturityOptions = [
    'Structured SQL / Cloud DBs (Ready for Vectorization)',
    'Unstructured PDFs, Docs, Images, Audio Records',
    'IoT Telemetry / Real-Time Kafka Stream Logs',
    'Legacy On-Premise Silos (Requires ETL & Modernization)'
  ];

  /* One control recipe for every select, so the four states stay identical. */
  const labelClasses =
    'block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5';

  const selectClasses =
    'w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3.5 pr-11 text-sm text-slate-900 shadow-2xs cursor-pointer transition-all hover:border-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-white/5 dark:border-white/10 dark:text-white dark:shadow-none dark:hover:border-white/20 dark:focus:border-blue-400';

  /* Native option lists inherit the OS palette — set both colors explicitly or
     the text disappears against the dark control. */
  const optionClasses = 'bg-white text-slate-900 dark:bg-slate-900 dark:text-white';

  const handleGenerateBlueprint = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let timeline = '4 - 8 Weeks to Production Pilot';
      let roi = 'Estimated 45-65% operational efficiency uplift within Q1 deployment';
      let arch = 'Private VPC RAG Pipeline + Multi-Agent Orchestration with SOC2-compliant guardrails';
      let services = ['Generative AI & LLM Systems', 'Autonomous AI Agents', 'Cloud Data Engineering'];

      if (selectedGoal.includes('Computer Vision')) {
        arch = 'Edge Neural Inference (TensorRT) + Cloud MLOps Telemetry Dashboard';
        roi = '99.4% optical defect reduction with sub-40ms inference latency';
        services = ['Computer Vision & Edge Intelligence', 'Cloud Modernization'];
      } else if (selectedGoal.includes('Predictive')) {
        arch = 'Distributed Gradient Boosting & Deep Temporal Models on Snowflake/BigQuery';
        roi = '25-35% inventory and risk forecasting error reduction';
        services = ['Predictive Machine Learning', 'Data Lakehouse Architecture'];
      } else if (selectedGoal.includes('Cloud Monolith')) {
        arch = 'Event-Driven Kubernetes Microservices + Automated Terraform CI/CD';
        roi = '40% cloud compute expenditure reduction with 99.99% uptime';
        services = ['Cloud Modernization', 'Custom Enterprise Software'];
      }

      setGeneratedResult({
        industry: selectedIndustry,
        workflow: selectedGoal,
        dataReadiness: dataMaturity,
        recommendedArchitecture: arch,
        estimatedTimeline: timeline,
        expectedROI: roi,
        suggestedServices: services
      });
      setIsGenerating(false);
    }, 600);
  };

  const handlePushToInquiry = () => {
    if (!generatedResult) return;
    onApplyBlueprintToInquiry({
      industry: generatedResult.industry,
      workflow: generatedResult.workflow,
      details: `Interactive Feasibility Blueprint generated: Industry: ${generatedResult.industry}. Objective: ${generatedResult.workflow}. Data: ${generatedResult.dataReadiness}. Recommended Architecture: ${generatedResult.recommendedArchitecture}. Projected ROI: ${generatedResult.expectedROI}.`
    });

    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="estimator" className="py-20 bg-slate-50 dark:bg-slate-950 relative border-t border-slate-200 dark:border-white/10">
      {/* Dark-mode depth: glows do the work shadows do in light mode. */}
      <div aria-hidden="true" className="hidden dark:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-24 left-0 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-400/20 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Interactive Feasibility & ROI Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Design Your Enterprise AI Solution Blueprint
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3">
            Select your industry and primary operational bottleneck. Our system computes the preliminary technical architecture, recommended delivery squad, and projected ROI timeline.
          </p>
        </div>

        {/* Main Interactive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Configurator (Left) */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] dark:ring-1 dark:ring-white/5 p-6 md:p-8 shadow-sm dark:shadow-none">
            <div className="space-y-5">

              {/* Step 1: Industry */}
              <div>
                <label htmlFor="estimator-industry" className={labelClasses}>
                  1. Select Target Industry Vertical
                </label>
                <div className="relative">
                  <select
                    id="estimator-industry"
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className={selectClasses}
                  >
                    {industriesList.map((ind) => (
                      <option key={ind} value={ind} className={optionClasses}>
                        {ind}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>
              </div>

              {/* Step 2: Primary AI Goal */}
              <div>
                <label htmlFor="estimator-goal" className={labelClasses}>
                  2. Primary Technological or Business Objective
                </label>
                <div className="relative">
                  <select
                    id="estimator-goal"
                    value={selectedGoal}
                    onChange={(e) => setSelectedGoal(e.target.value)}
                    className={selectClasses}
                  >
                    {goalsList.map((goal) => (
                      <option key={goal} value={goal} className={optionClasses}>
                        {goal}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>
              </div>

              {/* Step 3: Current Data State */}
              <div>
                <label htmlFor="estimator-data" className={labelClasses}>
                  3. Current Data Readiness & Infrastructure State
                </label>
                <div className="relative">
                  <select
                    id="estimator-data"
                    value={dataMaturity}
                    onChange={(e) => setDataMaturity(e.target.value)}
                    className={selectClasses}
                  >
                    {maturityOptions.map((opt) => (
                      <option key={opt} value={opt} className={optionClasses}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>
              </div>

              {/* Generate Trigger — fixed height so the label swap never reflows */}
              <button
                onClick={handleGenerateBlueprint}
                disabled={isGenerating}
                aria-busy={isGenerating}
                className="w-full h-12 flex items-center justify-center space-x-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-bold text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 dark:shadow-blue-500/20 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-blue-600 dark:disabled:hover:bg-blue-500 transition-all cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
                    <span>Architecting Enterprise Blueprint...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    <span>Generate AI Architecture Blueprint</span>
                  </>
                )}
              </button>

              <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" aria-hidden="true" />
                <span>Zero obligation • Governed by VDO IT Enterprise Security Framework</span>
              </div>

            </div>
          </div>

          {/* Blueprint Result Viewer (Right) */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900 border border-slate-800 dark:bg-white/[0.04] dark:border-white/10 dark:ring-1 dark:ring-white/5 p-6 md:p-8 shadow-lg dark:shadow-none text-white relative overflow-hidden">
            <div aria-hidden="true" className="hidden dark:block absolute -top-20 -right-16 w-64 h-64 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

            <div className="absolute top-4 right-4">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-400/20">
                AI Blueprint
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-5 flex items-center space-x-2 relative">
              <Layers className="w-5 h-5 text-blue-400 dark:text-blue-300" aria-hidden="true" />
              <span>Recommended Architecture</span>
            </h3>

            {generatedResult ? (
              <div className="space-y-3 relative animate-in fade-in duration-300">

                {/* Scope */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 dark:bg-white/[0.04] dark:border-white/[0.08]">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Industry & Workflow Scope
                  </span>
                  <p className="text-sm font-semibold text-white leading-snug">
                    {generatedResult.industry}
                  </p>
                  <p className="text-xs text-blue-300 mt-1 leading-relaxed">
                    {generatedResult.workflow}
                  </p>
                </div>

                {/* Primary output: the architecture itself */}
                <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/25 dark:bg-blue-500/[0.07] dark:border-blue-400/25">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5 mb-2">
                    <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Target Technical Architecture</span>
                  </span>
                  <p className="text-xs text-slate-100 leading-relaxed font-mono">
                    {generatedResult.recommendedArchitecture}
                  </p>
                </div>

                {/* Timeline */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 dark:bg-white/[0.04] dark:border-white/[0.08]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5 mb-1.5">
                    <Clock className="w-3 h-3 text-blue-400 dark:text-blue-300" aria-hidden="true" />
                    <span>Estimated Timeline</span>
                  </span>
                  <p className="text-sm font-bold text-white leading-snug">
                    {generatedResult.estimatedTimeline}
                  </p>
                </div>

                {/* ROI */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 dark:bg-white/[0.04] dark:border-white/[0.08]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5 mb-1.5">
                    <TrendingUp className="w-3 h-3 text-blue-400 dark:text-blue-300" aria-hidden="true" />
                    <span>Projected Value</span>
                  </span>
                  <p className="text-xs font-semibold text-blue-300 leading-relaxed">
                    {generatedResult.expectedROI}
                  </p>
                </div>

                {/* Suggested delivery squad */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 dark:bg-white/[0.04] dark:border-white/[0.08]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                    Suggested Services
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {generatedResult.suggestedServices.map((service) => (
                      <span
                        key={service}
                        className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/25 text-blue-200 text-[11px] font-semibold"
                      >
                        <CheckCircle2 className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                        <span>{service}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handlePushToInquiry}
                    className="w-full h-12 flex items-center justify-center space-x-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 dark:shadow-blue-500/20 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 transition-all cursor-pointer"
                  >
                    <span>Attach Blueprint & Request Consultation</span>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  </button>
                  <span className="text-[10px] text-slate-400 text-center block mt-2">
                    Pre-fills our consultation form with this custom blueprint.
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 relative">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 dark:bg-white/[0.06] dark:border-white/10 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-blue-400 dark:text-blue-300 animate-pulse" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Customize Parameters on the Left
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mt-1.5 leading-relaxed">
                    Click "Generate AI Architecture Blueprint" to receive instant technological recommendations and ROI projections.
                  </p>
                </div>
                <button
                  onClick={handleGenerateBlueprint}
                  disabled={isGenerating}
                  aria-busy={isGenerating}
                  className="px-4 py-3 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-blue-400 dark:text-blue-300 border border-blue-500/30 dark:border-blue-400/25 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  {isGenerating ? 'Architecting Blueprint...' : 'Generate Quick Preview'}
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
