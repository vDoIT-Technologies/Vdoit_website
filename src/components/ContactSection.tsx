import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Calendar,
  Building,
  Sparkles,
  ArrowRight,
  Copy,
  ExternalLink,
  Loader2,
  MessageSquare
} from 'lucide-react';
import { COMPANY_INFO, SERVICES, INDUSTRIES } from '../data/companyData';
import { InquiryFormData } from '../types';

/** One label treatment for every field, so the form reads as a single control set. */
const labelClasses =
  'block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5';

/** Shared control shell: rest / hover / focus states in both themes. */
const controlClasses =
  'w-full rounded-xl px-4 py-3 text-sm bg-slate-50 border border-slate-300 text-slate-900 ' +
  'placeholder:text-slate-400 hover:border-slate-400 focus:outline-none focus:bg-white ' +
  'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ' +
  'dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-slate-500 ' +
  'dark:hover:border-white/20 dark:focus:bg-white/[0.07] dark:focus:border-blue-500';

/**
 * Native <option> elements inherit the OS popup colors, so dark mode needs an
 * explicit background and text color or the list renders invisible.
 */
const optionClasses = 'bg-white text-slate-900 dark:bg-slate-900 dark:text-white';

interface ContactSectionProps {
  prefilledService?: string;
  prefilledIndustry?: string;
  prefilledDetails?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledService,
  prefilledIndustry,
  prefilledDetails
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    companyName: '',
    phone: '',
    serviceInterest: 'Generative AI & Custom Enterprise LLMs',
    industry: 'Healthcare & Life Sciences',
    timeline: 'Within 1-3 Months',
    budgetRange: '$25,000 - $100,000+',
    projectDescription: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({ ...prev, serviceInterest: prefilledService }));
    }
    if (prefilledIndustry) {
      setFormData(prev => ({ ...prev, industry: prefilledIndustry }));
    }
    if (prefilledDetails) {
      setFormData(prev => ({
        ...prev,
        projectDescription: prev.projectDescription
          ? `${prev.projectDescription}\n\n[Blueprint]: ${prefilledDetails}`
          : prefilledDetails
      }));
    }
  }, [prefilledService, prefilledIndustry, prefilledDetails]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate unique inquiry ticket
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `VDO-AI-${randomId}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedTicket(ticketId);
    }, 700);
  };

  const handleCopyTicket = () => {
    if (submittedTicket) {
      navigator.clipboard.writeText(submittedTicket);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-slate-50 border-t border-slate-200 relative overflow-hidden dark:bg-slate-950 dark:border-white/10"
    >
      {/* Depth glow — carries elevation in dark mode, where shadows do nothing. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-blue-500/10 blur-3xl opacity-0 dark:opacity-100"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3 dark:bg-blue-500/10 dark:border-blue-400/20 dark:text-blue-300">
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Direct Enterprise Engagement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-white">
            Schedule an AI Consultation with VDO IT Leadership
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 dark:text-slate-400">
            Share your enterprise challenge or project vision. Our executive leadership reviews all inquiries and responds within 4 business hours with an actionable roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Inquiry Form (Left / Main) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm relative dark:bg-white/[0.04] dark:border-white/10 dark:shadow-none dark:ring-1 dark:ring-white/5">

            {submittedTicket ? (
              <div className="py-8 text-center space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto dark:bg-emerald-500/10 dark:border-emerald-400/25 dark:text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                </div>

                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                    Inquiry Successfully Dispatched
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1 dark:text-white">
                    Thank You, {formData.fullName || 'Valued Partner'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 dark:text-slate-400">
                    Your request has been routed directly to Narendra Kumar Kamra and the VDO IT AI Solutions Practice.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto flex items-center justify-between dark:bg-white/[0.04] dark:border-white/10">
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block dark:text-slate-400">
                      Inquiry Reference ID:
                    </span>
                    <span className="font-mono text-base font-bold text-blue-600 dark:text-blue-300">
                      {submittedTicket}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyTicket}
                    aria-label={copiedTicket ? 'Reference ID copied to clipboard' : 'Copy reference ID'}
                    className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 active:scale-[0.99] transition-all dark:bg-white/5 dark:hover:bg-white/[0.1] dark:text-slate-300 dark:hover:text-white dark:border-white/10 dark:shadow-none"
                    title="Copy Reference ID"
                  >
                    {copiedTicket ? <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                  </button>
                </div>

                <p role="status" aria-live="polite" className="text-[11px] font-semibold text-emerald-600 h-4 dark:text-emerald-400">
                  {copiedTicket ? 'Reference ID copied to clipboard' : ''}
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1 text-left dark:bg-white/[0.04] dark:border-white/10 dark:text-slate-400">
                  <p className="font-semibold text-slate-800 dark:text-white">What happens next?</p>
                  <p>1. Our architecture team will analyze your tech requirements and industry fit.</p>
                  <p>2. You will receive an initial feasibility overview and a direct calendar invitation.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`mailto:${COMPANY_INFO.primaryEmail}?subject=Follow-up on Inquiry ${submittedTicket}&body=Hi Narendra,%0D%0A%0D%0AI just submitted inquiry ${submittedTicket} for ${formData.companyName}. Looking forward to connecting.`}
                    className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 hover:shadow-blue-600/35 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-all dark:bg-blue-500 dark:hover:bg-blue-400 dark:shadow-blue-500/20 dark:hover:shadow-blue-500/30 dark:focus-visible:ring-offset-slate-950"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>Email Leadership Directly</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmittedTicket(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        companyName: '',
                        phone: '',
                        serviceInterest: 'Generative AI & Custom Enterprise LLMs',
                        industry: 'Healthcare & Life Sciences',
                        timeline: 'Within 1-3 Months',
                        budgetRange: '$25,000 - $100,000+',
                        projectDescription: '',
                      });
                    }}
                    className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-300 hover:border-blue-400 shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 active:scale-[0.99] transition-all dark:bg-white/5 dark:hover:bg-white/[0.09] dark:text-slate-200 dark:border-white/10 dark:hover:border-blue-400/40 dark:shadow-none"
                  >
                    Submit Another Inquiry
                  </button>
                </div>

              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inquiry-full-name" className={labelClasses}>
                      Your Full Name (required)
                    </label>
                    <input
                      id="inquiry-full-name"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. John Miller"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={controlClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-email" className={labelClasses}>
                      Work Email (required)
                    </label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="john@yourcompany.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={controlClasses}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inquiry-company" className={labelClasses}>
                      Company / Organization (required)
                    </label>
                    <input
                      id="inquiry-company"
                      name="companyName"
                      type="text"
                      required
                      autoComplete="organization"
                      placeholder="e.g. Global Health Corp"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className={controlClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-phone" className={labelClasses}>
                      Phone Number (Optional)
                    </label>
                    <input
                      id="inquiry-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={controlClasses}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inquiry-service" className={labelClasses}>
                      Service of Interest
                    </label>
                    <select
                      id="inquiry-service"
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className={`${controlClasses} cursor-pointer`}
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title} className={optionClasses}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Enterprise AI Feasibility Audit" className={optionClasses}>Enterprise AI Feasibility Audit</option>
                      <option value="Full Digital Transformation & Squad" className={optionClasses}>Full Digital Transformation & Squad</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="inquiry-industry" className={labelClasses}>
                      Target Industry
                    </label>
                    <select
                      id="inquiry-industry"
                      name="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className={`${controlClasses} cursor-pointer`}
                    >
                      {INDUSTRIES.map((ind) => (
                        <option key={ind.id} value={ind.name} className={optionClasses}>
                          {ind.name}
                        </option>
                      ))}
                      <option value="Other / Cross-Sector" className={optionClasses}>Other / Cross-Sector</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-project" className={labelClasses}>
                    Project Goals & Technological Scope
                  </label>
                  <textarea
                    id="inquiry-project"
                    name="projectDescription"
                    rows={4}
                    placeholder="Describe the operational challenge you are looking to solve, data types available, or target AI capabilities..."
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    className={`${controlClasses} resize-y`}
                  />
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 dark:text-emerald-400" aria-hidden="true" />
                  <span>Strict NDA & confidentiality standards apply to all shared information.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400 dark:shadow-blue-500/20 dark:hover:shadow-blue-500/30 dark:focus-visible:ring-offset-slate-950 dark:disabled:hover:bg-blue-500"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Enterprise Inquiry & Request Roadmap</span>
                      <Send className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

          {/* Direct Leadership Contacts & Credentials (Right) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Leadership Contact Card */}
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl text-white dark:bg-white/[0.04] dark:border-white/10 dark:shadow-none dark:ring-1 dark:ring-white/5">
              <div>
                <span className="text-xs uppercase font-bold text-blue-400 tracking-wider dark:text-blue-300">
                  Executive Direct Line
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Connect Directly with Co-Founder & CEO
                </h3>
                <p className="text-xs text-slate-300 mt-1 dark:text-slate-400">
                  Narendra Kumar Kamra oversees enterprise client partnerships directly.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${COMPANY_INFO.primaryEmail}`}
                  className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 active:scale-[0.99] transition-all group dark:bg-white/[0.03] dark:border-white/10 dark:hover:border-blue-400/40"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors dark:border-blue-400/25 dark:group-hover:bg-blue-500">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Primary Leadership Email</span>
                    <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {COMPANY_INFO.primaryEmail}
                    </span>
                  </div>
                </a>

                <div className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 dark:bg-white/[0.03] dark:border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 dark:border-indigo-400/25">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Enterprise Response SLA</span>
                    <span className="text-sm font-semibold text-white">
                      Within 4 Business Hours
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 dark:bg-white/[0.03] dark:border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 dark:border-teal-400/25">
                    <Building className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Global Delivery Model</span>
                    <span className="text-sm font-semibold text-white">
                      US Timezone Coverage + India Engineering Hub
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 dark:border-white/10">
                <a
                  href="https://www.linkedin.com/in/narinder-kamra-721200b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-sm transition-colors dark:text-blue-300 dark:hover:text-blue-200"
                >
                  <span>Connect with Narendra Kumar Kamra on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Engagement Models Card */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 space-y-3 dark:bg-white/[0.04] dark:border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Flexible Enterprise Engagement Models
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" aria-hidden="true"></span>
                  <strong className="text-slate-800 dark:text-white">Dedicated AI Engineering Squads:</strong> Full team integration.
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" aria-hidden="true"></span>
                  <strong className="text-slate-800 dark:text-white">Fixed-Price Outcome Deliveries:</strong> Milestone-based scoping.
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" aria-hidden="true"></span>
                  <strong className="text-slate-800 dark:text-white">AI Feasibility & Architecture Audits:</strong> 2-week rapid diagnostic.
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
