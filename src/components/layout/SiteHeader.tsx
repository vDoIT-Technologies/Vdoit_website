import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { CONTAINER } from '../../lib/tone';

export const NAV_ITEMS = [
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'IT Jobs', to: '/jobs' },
];

/**
 * Every page opens on a dark hero band, so the header is always white-on-dark.
 * It is transparent at rest and gains a ground once the page scrolls under it.
 */
export const SiteHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route changes close the menu; an open drawer must not survive navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // The drawer covers the page, so the page behind it must not scroll.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled && !menuOpen
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className={`${CONTAINER} flex items-center justify-between gap-8`}>
        <Link
          to="/"
          className="group inline-flex items-baseline gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="VDOIT — home"
        >
          <span className="relative text-xl font-semibold tracking-[-0.05em] uppercase text-white">
            VDOIT
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-500 ease-out group-hover:w-full" />
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-4 py-2 text-sm rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                  isActive ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-950 transition-all hover:bg-slate-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Let's talk
            <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(open => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white transition-all hover:bg-white/10 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-0 z-40 bg-slate-950 pt-24">
          <nav className={`${CONTAINER} flex flex-col`} aria-label="Mobile">
            {[...NAV_ITEMS, { label: 'Contact', to: '/contact' }].map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-baseline gap-5 border-t border-white/10 py-6 text-3xl font-semibold tracking-tight transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`
                }
              >
                <span className="text-xs font-mono tabular-nums text-slate-600">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
