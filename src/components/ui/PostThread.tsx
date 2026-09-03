import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { LinkedInPost } from '../../types';
import { Spark } from './SparkField';

interface PostThreadProps {
  posts: LinkedInPost[];
}

/**
 * The LinkedIn feed as a chronological thread: a spine down the left, a marker
 * per post, and the post itself to the right.
 *
 * Deliberately not a card grid — these are dated entries in a running
 * conversation, and reading them top to bottom is the point. Engagement counts
 * are shown only when the data actually carries them; inventing plausible
 * numbers on a public site is not on.
 */
export const PostThread: React.FC<PostThreadProps> = ({ posts }) => (
  <ol className="relative border-l border-brand-200 pl-8 md:pl-12">
    {posts.map(post => (
      <li key={post.id} className="relative pb-8 last:pb-0">
        {/* Marker sits on the spine, ringed in the band colour so the line
            appears to pass behind it. */}
        <span
          aria-hidden="true"
          className="absolute -left-[35px] top-7 h-2.5 w-2.5 rounded-full bg-brand-600 ring-4 ring-brand-50 md:-left-[51px]"
        />

        <a
          href={post.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block min-w-0 rounded-3xl border border-brand-100 bg-white p-6 transition-colors hover:border-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 md:p-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            {/* The mark stands in as the author avatar. */}
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600">
              <Spark className="h-4 w-4 text-white" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-ink">
                VDOIT Technologies
              </span>
              <span className="block text-xs text-ink-mute">{post.date}</span>
            </span>
            <span className="shrink-0 rounded-full border border-brand-200 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-brand-700 sm:ml-auto">
              {post.category}
            </span>
          </div>

          <h3 className="mt-6 text-xl font-semibold leading-[1.25] tracking-[-0.02em] text-ink transition-colors group-hover:text-brand-600 md:text-2xl">
            {post.title}
          </h3>

          <p className="mt-3 text-base leading-relaxed text-ink-soft">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-brand-100 pt-5">
            <span className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-brand-600">
              {post.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </span>

            <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-ink">
              Read on LinkedIn
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </a>
      </li>
    ))}
  </ol>
);
