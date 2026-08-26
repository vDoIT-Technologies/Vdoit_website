import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

/** A new route should start at the top, not wherever the last one was scrolled. */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

export const SiteLayout: React.FC = () => (
  <div className="min-h-screen bg-white text-slate-950 font-sans antialiased">
    <ScrollToTop />
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-slate-950"
    >
      Skip to content
    </a>
    <SiteHeader />
    <main id="main">
      <Outlet />
    </main>
    <SiteFooter />
  </div>
);
