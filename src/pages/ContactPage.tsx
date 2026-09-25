import React, { useEffect, useRef, useState } from 'react';
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

/**
 * Where the mail relay lives. Empty means same origin, which is the production
 * shape: nginx and Apache both proxy `/api` to the backend on the same host,
 * so the browser never makes a cross-origin request. Development sets
 * `VITE_API_BASE_URL=http://localhost:4000`.
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

/**
 * What the visitor is told when a send fails. Deliberately never "something
 * went wrong": each case ends somewhere they can act, because the form is the
 * only route in on this page.
 */
const FAILURE = {
  invalid: 'Some of those details did not come through. Check the required fields and try again.',
  throttled:
    'That is several messages from this connection in a short window. Give it a few minutes, or',
  refused: 'The message could not be sent just now. Please',
  offline: 'We could not reach the server — check your connection and try again, or',
} as const;

const TIMELINES = ['Urgent — under 4 weeks', '1–3 months', '3–6 months', 'Exploring options'];
const BUDGETS = ['Under $25k', '$25k – $75k', '$75k – $200k', '$200k+', 'Not yet defined'];

const labelClasses = 'block text-xs font-medium uppercase tracking-[0.18em] text-ink-mute mb-2';

/**
 * Editorial form styling: bottom hairline only, no boxes. The focus state is
 * the rule darkening *and* a ring — this used to set `focus-visible:ring-0`,
 * which left a 1px border colour change as the only cue on the whole form.
 * A hairline shifting from #e8e6f0 to violet is not a focus indicator.
 */
const fieldClasses =
  'w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-lg text-ink placeholder:text-ink-mute transition-colors focus:border-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-4 focus-visible:ring-offset-white';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState<InquiryFormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [ticket, setTicket] = useState<string | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  /** The honeypot's value. A real visitor never sees the field, so this stays
      empty; a bot filling every input it finds is what gives it away. */
  const [honeypot, setHoneypot] = useState('');
  const [copied, setCopied] = useState(false);
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  const update = (field: keyof InquiryFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(current => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setFailure(null);

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: honeypot }),
      });

      // A proxy in front of the API can answer with HTML, so a failed parse is
      // a real outcome rather than an exception to swallow.
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setFailure(response.status === 400 ? FAILURE.invalid
          : response.status === 429 ? FAILURE.throttled
          : FAILURE.refused);
        return;
      }

      // The reference is issued by the server so the number shown here is the
      // one on the email. Without it there is nothing to confirm, so a 2xx
      // that omits it is treated as a failure rather than a silent success.
      const reference: unknown = payload?.reference;
      if (typeof reference !== 'string' || !reference) {
        setFailure(FAILURE.refused);
        return;
      }

      setTicket(reference);
    } catch {
      setFailure(FAILURE.offline);
    } finally {
      setSubmitting(false);
    }
  };

  // The submit button unmounts when the confirmation replaces the form, which
  // used to drop focus to <body> and announce nothing. Moving focus to the
  // confirmation heading both tells a screen reader what happened and leaves
  // the keyboard somewhere sensible.
  useEffect(() => {
    if (ticket) confirmationRef.current?.focus();
  }, [ticket]);

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
      {/* 1 — White page header. */}
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us what is
            <br />
            not working.
          </>
        }
      />

      {/* 2 — Light. The form itself, directly under the page title.
          Explicit padding rather than `size="sm"`: that token's `py-12 md:py-16`
          stacked on the page header's own bottom padding put ~96px of white
          between the title and the first label, on a page whose whole job is
          the form. The bottom keeps the full band padding — it is the gap to
          the footer, not a gap inside one thought. */}
      <Band tone="light" size="none" className="pb-12 pt-2 md:pb-16 md:pt-4">
        <div className="grid gap-20 lg:grid-cols-[1.6fr_1fr] lg:gap-28">
          <Reveal>
            {ticket ? (
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">
                  Inquiry received
                </p>
                {/* tabIndex -1 so the effect above can move focus here without
                    putting the heading into the tab order. */}
                <h2
                  ref={confirmationRef}
                  tabIndex={-1}
                  className={`mt-6 text-balance text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-ink focus-visible:outline-none ${light.focusRing}`}
                >
                  We have it. Reference {ticket}.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
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
                    href={`mailto:${COMPANY_INFO.inquiryEmail}?subject=${encodeURIComponent(
                      `Follow-up on inquiry ${ticket}`
                    )}`}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${light.solidButton} ${light.focusRing}`}
                  >
                    Email the follow-up
                  </a>
                </div>

                {/* Reserved height, so confirming does not shift the layout. */}
                <p role="status" aria-live="polite" className="mt-4 h-5 text-sm text-ink-soft">
                  {copied ? 'Reference copied to clipboard' : ''}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setForm(EMPTY_FORM);
                    setTicket(null);
                  }}
                  className={`mt-10 rounded-full text-sm text-ink-soft underline underline-offset-4 transition-colors hover:text-ink focus-visible:outline-none ${light.focusRing}`}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate={false}>
                <div className="grid gap-8 sm:grid-cols-2">
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

                <div className="mt-8">
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

                {/* Honeypot. Positioned off-screen rather than `sr-only`,
                    which keeps a field readable to screen readers — and a
                    mystery input is worse for that visitor than for a bot.
                    Hidden from assistive tech and out of the tab order, so it
                    only ever reaches something filling inputs blind. */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px overflow-hidden"
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={event => setHoneypot(event.target.value)}
                  />
                </div>

                {failure && (
                  <p
                    role="alert"
                    className="mt-10 border-l-2 border-brand-600 pl-5 text-base leading-relaxed text-ink"
                  >
                    {failure === FAILURE.invalid ? (
                      failure
                    ) : (
                      <>
                        {failure}{' '}
                        <a
                          href={`mailto:${COMPANY_INFO.inquiryEmail}`}
                          className={`font-medium text-brand-600 underline underline-offset-4 transition-colors hover:text-brand-700 focus-visible:outline-none ${light.focusRing}`}
                        >
                          email {COMPANY_INFO.inquiryEmail}
                        </a>{' '}
                        directly.
                      </>
                    )}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className={`mt-10 inline-flex h-14 min-w-[16rem] items-center justify-center rounded-full px-8 text-sm font-medium transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 focus-visible:outline-none ${light.solidButton} ${light.focusRing}`}
                >
                  {submitting ? 'Sending inquiry...' : 'Send inquiry'}
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-32 lg:self-start">
              {/* The two email rows are gone, so this column is the location
                  only — a heading promising a direct line would be writing a
                  cheque the column no longer cashes. The form is the route in. */}
              <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">
                Where we are
              </h2>

              <dl className="mt-8 space-y-8">
                <div className="border-t border-line pt-6">
                  <dt className="text-sm text-ink-mute">Delivery</dt>
                  <dd className="mt-2 text-lg text-ink">
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
