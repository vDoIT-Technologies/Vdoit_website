import React, { useState } from 'react';
import {
  Linkedin,
  Sparkles,
  ExternalLink,
  ThumbsUp,
  MessageSquare,
  Share2,
  ArrowRight,
  Clock,
  CheckCircle2,
  HelpCircle,
  X,
  RefreshCw
} from 'lucide-react';
import { LINKEDIN_POSTS } from '../data/companyData';
import { LinkedInPost } from '../types';

export const LinkedInHub: React.FC = () => {
  const [activePost, setActivePost] = useState<LinkedInPost | null>(null);
  const [showSyncGuide, setShowSyncGuide] = useState(false);

  return (
    <section id="linkedin" className="py-20 bg-white dark:bg-slate-900/40 border-t border-slate-200 dark:border-white/10 relative overflow-hidden">
      {/* Dark-mode depth comes from glow, not shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 w-full max-w-md h-64 rounded-full bg-blue-500/10 blur-3xl opacity-0 dark:opacity-100"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-400/20 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Linkedin className="w-3.5 h-3.5 text-[#0077b5] dark:text-blue-300" aria-hidden="true" />
              <span>Real-Time Insights & Updates Hub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Latest from VDO IT on LinkedIn
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base mt-2 max-w-2xl leading-relaxed">
              Our LinkedIn channel is our most active technical platform, where our leadership shares cutting-edge AI breakthroughs, client architecture case studies, and enterprise updates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setShowSyncGuide(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-3 text-xs font-semibold rounded-xl bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.07] border border-slate-300 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-400/40 shadow-xs dark:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 active:scale-[0.99] transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-300" aria-hidden="true" />
              <span>LinkedIn Sync Guide</span>
            </button>

            <a
              href="https://www.linkedin.com/company/vdoit-technologies-limited/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-3 text-xs font-bold rounded-xl bg-[#0077b5] hover:bg-[#006097] text-white shadow-lg shadow-[#0077b5]/25 hover:shadow-[#0077b5]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
              <span>Follow VDO IT</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* LinkedIn Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {LINKEDIN_POSTS.map((post) => (
            <article
              key={post.id}
              className="h-full rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] dark:ring-1 dark:ring-white/5 hover:border-blue-300 dark:hover:border-blue-400/40 p-6 flex flex-col shadow-xs dark:shadow-none hover:shadow-lg transition-all group"
            >
              {/* Author badge */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0077b5] flex items-center justify-center text-white font-black text-sm shadow-xs flex-shrink-0">
                  VDO
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    VDO IT Technologies Limited
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    {post.date}
                  </p>
                </div>
              </div>

              {/* Category chip */}
              <div className="mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-400/20 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2.5 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                {post.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer: muted metadata, then the CTA row pinned to the bottom */}
              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/[0.08]">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-500 mb-4">
                  <span className="inline-flex items-center space-x-1.5">
                    <ThumbsUp className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                    <span>{post.reactionsCount} reactions</span>
                  </span>
                  <span className="inline-flex items-center space-x-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                    <span>{post.commentsCount} comments</span>
                  </span>
                  <span className="inline-flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActivePost(post)}
                    className="inline-flex items-center space-x-1.5 px-4 py-3 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.07] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-400/40 text-xs font-semibold shadow-xs dark:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>

                  <a
                    href={post.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-[#0077b5] dark:hover:bg-[#0077b5] text-slate-600 dark:text-slate-300 hover:text-white dark:hover:text-white border border-slate-200 dark:border-white/10 hover:border-[#0077b5] dark:hover:border-[#0077b5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 active:scale-[0.99] transition-all"
                    title="View on LinkedIn"
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="sr-only">View on LinkedIn</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Integration Instructions Card */}
        <div className="rounded-2xl bg-slate-900 dark:bg-white/[0.03] border border-slate-800 dark:border-white/10 dark:ring-1 dark:ring-white/5 p-6 md:p-8 text-white shadow-lg dark:shadow-none relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"
          />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-400 dark:text-blue-300 uppercase tracking-wider">
                Automated LinkedIn Integration Setup
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white">
                How VDOIT Ingests Live LinkedIn Feed Posts
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400 max-w-2xl leading-relaxed">
                We can connect this live feed directly with your company's LinkedIn Organization ID or webhook stream to auto-publish every new service launch and thought leadership article directly onto this website.
              </p>
            </div>
            <button
              onClick={() => setShowSyncGuide(true)}
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-xs font-bold shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 dark:shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex-shrink-0 cursor-pointer"
            >
              <span>View Integration Instructions</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>

      {/* Modal: Full LinkedIn Post Viewer */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 dark:ring-1 dark:ring-white/5 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Close article</span>
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0077b5] flex items-center justify-center text-white font-bold">
                VDO
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  VDO IT Technologies Limited
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Published on LinkedIn • {activePost.date}
                </p>
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              {activePost.title}
            </h3>

            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed mb-6 whitespace-pre-line">
              {activePost.fullContent || activePost.excerpt}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3 text-xs text-slate-600 dark:text-slate-400">
                <span className="text-blue-700 dark:text-blue-300 font-semibold">{activePost.reactionsCount} Likes</span>
                <span aria-hidden="true">•</span>
                <span>{activePost.commentsCount} Comments</span>
              </div>
              <a
                href={activePost.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0077b5] dark:text-blue-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-lg transition-all"
              >
                <span>View Full Post on LinkedIn</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>

            <button
              onClick={() => setActivePost(null)}
              className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white/10 text-white font-semibold text-xs hover:bg-slate-800 dark:hover:bg-white/[0.16] border border-transparent dark:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 active:scale-[0.99] transition-all cursor-pointer"
            >
              Close Briefing
            </button>
          </div>
        </div>
      )}

      {/* Modal: LinkedIn Technical Integration Guide */}
      {showSyncGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 dark:ring-1 dark:ring-white/5 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowSyncGuide(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Close integration guide</span>
            </button>

            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-300 mb-2">
              <Linkedin className="w-5 h-5 text-[#0077b5] dark:text-blue-300" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider">
                How to Connect Your LinkedIn Account & Feed
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Connecting VDO IT's LinkedIn Platform
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-400 leading-relaxed mb-6">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Method 1: Direct LinkedIn Company Page Linking (Currently Active)
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-xs break-words">
                  All cards and founder links on this site direct to your verified LinkedIn company profile (<code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200">https://www.linkedin.com/company/vdoit-technologies-limited/</code>) and Narendra Kumar Kamra's profile.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Method 2: Automated Live Ingestion via LinkedIn API
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-xs break-words">
                  To automatically pull every post without manual entry:
                  <br />1. Generate an OAuth Client ID & Token through the <strong className="text-slate-800 dark:text-slate-200">LinkedIn Developer Portal</strong> with <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200">r_organization_social</code> permissions.
                  <br />2. VDO IT's backend proxy endpoint <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200">/api/linkedin/feed</code> can fetch real-time posts and cache them seamlessly.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Method 3: Official LinkedIn Embedded Posts Widget
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  You can also paste the URL of any specific LinkedIn post into the site editor to embed the exact interactive LinkedIn iframe viewer.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSyncGuide(false)}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 dark:shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 active:scale-[0.99] transition-all cursor-pointer"
              >
                Got It, Thank You
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
