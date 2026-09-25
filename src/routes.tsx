import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/layout/SiteLayout';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { UpdatesPage } from './pages/UpdatesPage';
import { JobsPage } from './pages/JobsPage';
import { ContactPage } from './pages/ContactPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * The route tree, kept separate from the router that hosts it.
 *
 * `App` wraps this in a `BrowserRouter` for the browser; the prerender step
 * wraps the same tree in a `StaticRouter` to render each URL to static HTML at
 * build time. Both must see an identical tree, so it lives here rather than
 * inside either entry point.
 */
export const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<SiteLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:slug" element={<ServiceDetailPage />} />
      <Route path="/success-stories" element={<ProductsPage />} />
      {/* Paused. "Success Stories" now points at /success-stories; the case-study
          index and its detail pages come back with the next content pass,
          along with their imports at the top of this file. */}
      {/* <Route path="/work" element={<WorkPage />} /> */}
      {/* <Route path="/work/:slug" element={<CaseStudyDetailPage />} /> */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/updates" element={<UpdatesPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      {/* A genuine dead end. The host serves this file with a 404 status, so
          a stale link is never indexed as a copy of the home page. */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
