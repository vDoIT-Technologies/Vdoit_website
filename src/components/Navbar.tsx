import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Mail,
  ChevronRight,
  Cpu
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ThemeToggle } from './ui/ThemeToggle';

interface NavbarProps {
  onOpenEstimator: () => void;
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimator, onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Industries', href: '#industries' },
    { name: 'AI Architect', href: '#estimator' },
    { name: 'About', href: '#heritage' },
    { name: 'Why VDOIT', href: '#why-vdoit' },
    { name: 'IT Jobs', href: '#careers' },
    { name: 'Insights', href: '#linkedin' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro-bar for enterprise contact credibility */}
      <div className="bg-slate-900 dark:bg-black border-b border-slate-800 dark:border-white/5 text-xs text-slate-300 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-blue-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>Enterprise AI Solutions & Global Engineering</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Est. 2015 • Narendra Kumar Kamra & Neetu Gupta</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`mailto:${COMPANY_INFO.primaryEmail}`}
              className="flex items-center space-x-1.5 text-slate-300 hover:text-blue-400 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{COMPANY_INFO.primaryEmail}</span>
            </a>
            <span className="text-slate-700">•</span>
            <span className="text-slate-400">Global Delivery (US & India)</span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav className={`transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-950/85 backdrop-blur-lg border-b border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-none py-3.5'
          : 'bg-white/80 dark:bg-slate-950/60 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand wordmark */}
          <a
            href="#"
            className="flex items-center space-x-3 group rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 p-0.5 shadow-md shadow-blue-600/15 group-hover:shadow-blue-600/35 dark:shadow-blue-500/20 dark:group-hover:shadow-blue-500/40 transition-all">
              <div className="w-full h-full bg-slate-900 dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                {/* Gradient-clipped wordmark with an underline that sweeps on hover */}
                <span className="relative font-black text-xl uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-300">
                  VDOIT
                  <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 transition-all duration-500 ease-out rounded-full" />
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-400/20 text-blue-700 dark:text-blue-300 font-semibold uppercase tracking-wider">
                  AI
                </span>
              </div>
              <span className="text-[10px] tracking-wider text-slate-500 dark:text-slate-500 uppercase font-medium">
                Technologies Limited
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/[0.07] rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA actions */}
          <div className="hidden sm:flex items-center space-x-2.5">
            <ThemeToggle />

            <button
              onClick={onOpenEstimator}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white border border-slate-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-400/40 transition-all shadow-xs active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              title="Interactive AI Feasibility Estimator"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>AI Architect</span>
            </button>

            <a
              href="#contact"
              onClick={onOpenInquiry}
              className="inline-flex items-center space-x-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white dark:text-slate-950 shadow-md shadow-blue-600/20 hover:shadow-blue-600/35 dark:shadow-blue-500/25 dark:hover:shadow-blue-400/40 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <span>Let's talk</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <ThemeToggle className="w-9 h-9" />
            <a
              href="#contact"
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-blue-600 dark:bg-blue-500 text-white dark:text-slate-950 active:scale-[0.98] transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              Inquire
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[60px] bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 p-6 shadow-xl transition-all max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <div className="pb-3 border-b border-slate-100 dark:border-white/10">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                Enterprise AI Solutions
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                VDO IT Technologies Limited • Est. 2015
              </p>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white py-2 border-b border-slate-100 dark:border-white/5 transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600" />
              </a>
            ))}

            <div className="pt-2 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEstimator();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-blue-600 dark:text-blue-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-all active:scale-[0.99]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch AI Architect Tool</span>
              </button>

              <a
                href="#contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-blue-600 dark:bg-blue-500 text-white dark:text-slate-950 font-bold text-sm shadow-md shadow-blue-600/25 hover:bg-blue-700 dark:hover:bg-blue-400 transition-all active:scale-[0.99]"
              >
                <span>Schedule Consultation / Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="pt-3 text-xs text-slate-500 text-center">
                <span>Direct email: </span>
                <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className="text-blue-600 dark:text-blue-400 font-medium underline">
                  {COMPANY_INFO.primaryEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
