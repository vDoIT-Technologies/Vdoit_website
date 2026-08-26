import React from 'react';
import {
  Cpu,
  Mail,
  Linkedin,
  ArrowUp,
  ShieldCheck,
  Sparkles,
  Globe2
} from 'lucide-react';
import { COMPANY_INFO, SERVICES, INDUSTRIES } from '../data/companyData';

/** One link treatment across every footer column, in both themes. */
const footerLinkClasses =
  'rounded-sm text-slate-600 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 transition-colors dark:text-slate-400 dark:hover:text-blue-400';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs relative dark:bg-slate-900/40 dark:border-white/10 dark:text-slate-400">
      {/* Top Banner */}
      <div className="border-b border-slate-200 py-8 bg-white dark:border-white/10 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-xs shadow-blue-600/20 dark:shadow-blue-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center dark:bg-slate-950">
                <Cpu className="w-4 h-4 text-blue-400" aria-hidden="true" />
              </div>
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block dark:text-white">
                VDO IT Technologies Limited
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Pioneering Enterprise AI & Value-Oriented Digital Engineering (Est. 2015)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={`mailto:${COMPANY_INFO.primaryEmail}`}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-blue-700 border border-slate-300 hover:border-blue-400 shadow-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 active:scale-[0.99] transition-all dark:bg-white/5 dark:hover:bg-white/[0.09] dark:text-blue-300 dark:border-white/10 dark:hover:border-blue-400/40 dark:shadow-none"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{COMPANY_INFO.primaryEmail}</span>
            </a>

            <a
              href="https://www.linkedin.com/company/vdoit-technologies-limited/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0077b5] text-white hover:bg-[#006097] shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 active:scale-[0.99] transition-all dark:shadow-none"
              title="VDO IT LinkedIn"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">VDO IT on LinkedIn</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-300 hover:border-blue-400 shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 active:scale-[0.99] transition-all dark:bg-white/5 dark:hover:bg-white/[0.09] dark:text-slate-300 dark:hover:text-white dark:border-white/10 dark:hover:border-blue-400/40 dark:shadow-none"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Scroll to top</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Col 1: About VDOIT */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider dark:text-white">
              About VDO IT Technologies
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed max-w-sm dark:text-slate-400">
              Founded in 2015 by Narendra Kumar Kamra and Neetu Gupta after 15+ years of US and global leadership experience. VDO IT Technologies delivers production-grade enterprise AI, Generative AI systems, and scalable cloud engineering for global industry leaders.
            </p>
            <div className="pt-2 flex flex-col space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
              <span><strong className="text-slate-700 dark:text-slate-300">Founders:</strong> Narendra Kumar Kamra & Neetu Gupta</span>
              <span><strong className="text-slate-700 dark:text-slate-300">Heritage:</strong> Formerly vdoit.com • 10+ Years of Enterprise Delivery</span>
              <span><strong className="text-slate-700 dark:text-slate-300">Delivery Footprint:</strong> United States, Europe, APAC, India</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider dark:text-white">
              AI & Tech Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services" className={footerLinkClasses}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider dark:text-white">
              Industry Verticals
            </h4>
            <ul className="space-y-2">
              {INDUSTRIES.map((ind) => (
                <li key={ind.id}>
                  <a href="#industries" className={footerLinkClasses}>
                    {ind.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Links & Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider dark:text-white">
              Company & Insights
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#heritage" className={footerLinkClasses}>
                  Founders & Heritage
                </a>
              </li>
              <li>
                <a href="#why-vdoit" className={footerLinkClasses}>
                  The VDOIT Advantage
                </a>
              </li>
              <li>
                <a href="#estimator" className={footerLinkClasses}>
                  AI Solution Estimator
                </a>
              </li>
              <li>
                <a href="#linkedin" className={footerLinkClasses}>
                  LinkedIn Insights Hub
                </a>
              </li>
              <li>
                <a href="#contact" className={footerLinkClasses}>
                  Schedule Consultation
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-500 dark:border-white/10 dark:text-slate-400">
          <div>
            <span>© 2015 – {new Date().getFullYear()} <strong className="text-slate-700 dark:text-slate-300">VDO IT Technologies Limited</strong>. All Rights Reserved.</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-900 transition-colors dark:hover:text-slate-200">Privacy Policy</span>
            <span aria-hidden="true">•</span>
            <span className="hover:text-slate-900 transition-colors dark:hover:text-slate-200">Terms of Service</span>
            <span aria-hidden="true">•</span>
            <span className="hover:text-slate-900 transition-colors dark:hover:text-slate-200">Enterprise Security & Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
