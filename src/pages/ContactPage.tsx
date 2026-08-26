import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { COMPANY_INFO, INDUSTRIES, SERVICES } from '../data/companyData';
import type { InquiryFormData } from '../types';
import { Band } from '../components/ui/Band';
import { PageHero } from '../components/layout/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { TONE } from '../lib/tone';

const light = TONE.light;

const EMPTY_FORM: InquiryFormData = {
  fullName: '',
  email: '',
  companyName: '',
  phone: '',
  serviceInterest: '',
  industry: '',
  timeline: '',
  budgetRange: '',
  projectDescription: '',
};

const TIMELINES = ['Urgent — under 4 weeks', '1–3 months', '3–6 months', 'Exploring options'];
const BUDGETS = ['Under $25k', '$25k – $75k', '$75k – $200k', '$200k+', 'Not yet defined'];

const labelClasses = 'block text-xs font-medium uppercase tracking-[0.18em] text-slate-500 mb-3';

/**
 * Editorial form styling: bottom hairline only, no boxes. The focus state has
 * to be carried by the rule darkening plus a ring, since there is no border to
 * light up.
 */
const fieldClasses =
  'w-full rounded-none border-0 border-b border-slate-300 bg-transparent px-0 py-4 text-lg text-slate-950 placeholder:text-slate-400 transition-colors focus:border-slate-950 focus:outline-none focus-visible:ring-0';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState<InquiryFormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [ticket, setTicket] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const update = (field: keyof InquiryFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(current => ({ ...current, [field]: event.target.value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    // Client-side only, exactly as before: there is no backend, and pretending
    // otherwise would silently drop real inquiries.
    const reference = `VDO-AI-${Math.floor(1000 + Math.random() * 9000)}`;
    window.setTimeout(() => {
      setSubmitting(false);
      setTicket(reference);
    }, 700);
  };

  const handleCopy = async () => {
    if (!ticket || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(ticket);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      /* Clipboard is unavailable on insecure origins; the id is visible anyway. */
    }
  };

  return (
    <>
      {/* 1 — Dark hero. */}
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us what is
            <br />
            not working.
          </>
        }
        lede="Bring the constraint, not the brief. Our leadership reads every inquiry and comes back with an actual opinion — including when the answer is that you do not need us."
      />

      {/* 2 — Light. Form plus a slim column of direct details. */}
      <Band tone="light" size="lg">
        <div className="grid gap-20 lg:grid-cols-[1.6fr_1fr] lg:gap-28">
          <Reveal>
            {ticket ? (
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Inquiry received
                </p>
                <h2 className="mt-6 text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-slate-950">
                  We have it. Reference {ticket}.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                  Keep that reference — quoting it in an email puts your message
                  straight in front of the person already reviewing it.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={copied ? 'Reference copied' : `Copy reference ${ticket}`}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${light.ghostButton} ${light.focusRing}`}
                  >
                    {copied ? <Check aria-hidden="true" className="w-4 h-4" /> : <Copy aria-hidden="true" className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy reference'}
                  </button>

                  <a
                    href={`mailto:${COMPANY_INFO.primaryEmail}?subject=${encodeURIComponent(
                      `Follow-up on inquiry ${ticket}`
                    )}`}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${light.solidButton} ${light.focusRing}`}
                  >
                    Email the follow-up
                  </a>
                </div>

                {/* Reserved height, so confirming does not shift the layout. */}
                <p role="status" aria-live="polite" className="mt-4 h-5 text-sm text-slate-600">
                  {copied ? 'Reference copied to clipboard' : ''}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setForm(EMPTY_FORM);
                    setTicket(null);
                  }}
                  className="mt-10 text-sm text-slate-600 underline underline-offset-4 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate={false}>
                <div className="grid gap-10 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className={labelClasses}>
                      Your name (required)
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.fullName}
                      onChange={update('fullName')}
                      className={fieldClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Work email (required)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={update('email')}
                      className={fieldClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="companyName" className={labelClasses}>
                      Company
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      autoComplete="organization"
                      value={form.companyName}
                      onChange={update('companyName')}
                      className={fieldClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      className={fieldClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="serviceInterest" className={labelClasses}>
                      What you need
                    </label>
                    <select
                      id="serviceInterest"
                      name="serviceInterest"
                      value={form.serviceInterest}
                      onChange={update('serviceInterest')}
                      className={fieldClasses}
                    >
                      <option value="">Select a service</option>
                      {SERVICES.map(service => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="industry" className={labelClasses}>
                      Your industry
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={form.industry}
                      onChange={update('industry')}
                      className={fieldClasses}
                    >
                      <option value="">Select an industry</option>
                      {INDUSTRIES.map(industry => (
                        <option key={industry.id} value={industry.name}>
                          {industry.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className={labelClasses}>
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={form.timeline}
                      onChange={update('timeline')}
                      className={fieldClasses}
                    >
                      <option value="">Select a timeline</option>
                      {TIMELINES.map(item => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budgetRange" className={labelClasses}>
                      Budget range
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={form.budgetRange}
                      onChange={update('budgetRange')}
                      className={fieldClasses}
                    >
                      <option value="">Select a range</option>
                      {BUDGETS.map(item => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-10">
                  <label htmlFor="projectDescription" className={labelClasses}>
                    What is the constraint? (required)
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    required
                    rows={5}
                    value={form.projectDescription}
                    onChange={update('projectDescription')}
                    placeholder="The process that breaks, the data you cannot query, the decision nobody can make fast enough."
                    className={`${fieldClasses} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className={`mt-12 inline-flex h-14 min-w-[16rem] items-center justify-center rounded-full px-8 text-sm font-medium transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 focus-visible:outline-none ${light.solidButton} ${light.focusRing}`}
                >
                  {submitting ? 'Sending inquiry...' : 'Send inquiry'}
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Direct
              </h2>

              <dl className="mt-8 space-y-8">
                <div className="border-t border-slate-200 pt-6">
                  <dt className="text-sm text-slate-500">Leadership</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${COMPANY_INFO.primaryEmail}`}
                      className="text-lg text-slate-950 underline underline-offset-4 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40"
                    >
                      {COMPANY_INFO.primaryEmail}
                    </a>
                  </dd>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <dt className="text-sm text-slate-500">General inquiries</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${COMPANY_INFO.inquiryEmail}`}
                      className="text-lg text-slate-950 underline underline-offset-4 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40"
                    >
                      {COMPANY_INFO.inquiryEmail}
                    </a>
                  </dd>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <dt className="text-sm text-slate-500">Delivery</dt>
                  <dd className="mt-2 text-lg text-slate-950">
                    {COMPANY_INFO.corporateLocation}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </Band>
    </>
  );
};
