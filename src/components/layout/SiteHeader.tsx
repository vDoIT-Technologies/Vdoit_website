import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { CONTAINER } from '../../lib/tone';
import { Wordmark } from '../ui/Wordmark';

export const NAV_ITEMS = [
  { label: 'Services', to: '/services' },
  { label: 'Products', to: '/products' },
  { label: 'Success Stories', to: '/work' },
  { label: 'About Us', to: '/about' },
  { label: 'Updates', to: '/updates' },
  { label: 'IT Jobs', to: '/jobs' },
];

/**
 * White header on a white page: it earns its separation from a hairline and a
 * blur once the page scrolls under it, never from a shadow.
 */
export const SiteHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // The indicator follows the pointer, and falls back to the current route
  // when the pointer leaves — so it always says where you are or where you
  // are about to go.
  const activeItem = NAV_ITEMS.find(item => pathname.startsWith(item.to))?.to;
  const highlighted = hovered ?? activeItem;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled && !menuOpen
          ? 'bg-white/85 backdrop-blur-xl border-b border-line py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className={`${CONTAINER} flex items-center justify-between gap-8`}>
        <Link
          to="/"
          aria-label="vdoit — home"
          className="group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
        >
          <Wordmark className="text-[26px] [&>svg]:transition-transform [&>svg]:duration-700 [&>svg]:ease-out group-hover:[&>svg]:rotate-[135deg]" />
        </Link>

        {/* Grouped in a pill: loose links in the middle of a wide bar read as
            an accident, a segmented group reads as a decision. Six of them no
            longer fit beside the logo and the CTA at `md`, so the pill appears
            at `lg` and the drawer covers everything below it. */}
        <nav
          className="hidden items-center gap-1 rounded-full border border-line bg-white/70 p-1 backdrop-blur lg:flex"
          aria-label="Primary"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_ITEMS.map(item => {
            const lit = highlighted === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onMouseEnter={() => setHovered(item.to)}
                className={`relative whitespace-nowrap rounded-full px-3.5 py-2 text-sm transition-colors xl:px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 ${
                  lit ? 'text-white' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {lit && (
                  // One shared layoutId means the pill slides between items
                  // rather than blinking out and in.
                  <motion.span
                    layoutId="nav-indicator"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-brand-600"
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 420, damping: 34 }
                    }
                  />
                )}
                <span className="relative">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            to="/contact"
            className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
          >
            Let's talk
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(open => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all hover:border-brand-300 hover:bg-brand-50 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Reading progress: a use for the header's bottom edge that also tells
          you something. Only once the page has actually moved. */}
      {scrolled && !menuOpen && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand-600"
        />
      )}

      {menuOpen && (
        <div className="fixed inset-0 top-0 z-40 overflow-y-auto bg-white pb-16 pt-24 lg:hidden">
          <nav className={`${CONTAINER} flex flex-col`} aria-label="Mobile">
            {[...NAV_ITEMS, { label: 'Contact', to: '/contact' }].map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-baseline gap-5 border-t border-line py-6 text-3xl font-semibold tracking-[-0.03em] transition-colors ${
                    isActive ? 'text-brand-600' : 'text-ink'
                  }`
                }
              >
                <span className="font-mono text-xs tabular-nums text-ink-mute">
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
