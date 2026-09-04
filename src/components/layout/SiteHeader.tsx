import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { CONTAINER, TONE } from '../../lib/tone';
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
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
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

  /**
   * Escape closes, and Tab stays inside.
   *
   * The drawer covers the page but the page behind it was still in the tab
   * order, so tabbing past the last link walked invisibly through the whole
   * document. It is a modal, so it traps focus, takes focus on open, and hands
   * focus back to the toggle on close.
   */
  useEffect(() => {
    if (!menuOpen) return;

    const drawer = drawerRef.current;
    drawer?.querySelector<HTMLElement>('a, button')?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !drawer) return;

      const focusable = drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      toggleRef.current?.focus();
    };
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
          className="group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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
                className={`relative whitespace-nowrap rounded-full px-3.5 py-2 text-sm transition-colors xl:px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
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
                {/* The pill follows the pointer, so hovering any item used to
                    erase every trace of which page you were actually on. This
                    quieter rule stays put underneath. */}
                {item.to === activeItem && !lit && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3.5 bottom-1 h-0.5 rounded-full bg-brand-300 xl:inset-x-4"
                  />
                )}
                <span className="relative">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Visible at every width. It used to be `hidden sm:inline-flex`, so
              on a phone the only route to contact was the drawer, where it sat
              seventh. The arrow is what gives way on narrow screens, not the
              CTA. `py-3` keeps the target at 44px. */}
          <Link
            to="/contact"
            className={`group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-600 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none sm:px-5 ${TONE.light.focusRing}`}
          >
            Let's talk
            <ArrowUpRight
              aria-hidden="true"
              className="hidden h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block"
            />
          </Link>

          <button
            type="button"
            ref={toggleRef}
            onClick={() => setMenuOpen(open => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all hover:border-brand-300 active:scale-[0.97] focus-visible:outline-none lg:hidden ${TONE.light.focusRing}`}
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
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
        <div
          ref={drawerRef}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 top-0 z-40 overflow-y-auto bg-white pb-16 pt-24 lg:hidden"
        >
          <nav className={`${CONTAINER} flex flex-col`} aria-label="Mobile">
            {[...NAV_ITEMS, { label: 'Contact', to: '/contact' }].map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-baseline gap-5 border-t border-line py-6 text-3xl font-semibold tracking-[-0.03em] transition-colors focus-visible:outline-none ${
                    TONE.light.focusRing
                  } ${isActive ? 'text-brand-600' : 'text-ink'}`
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
