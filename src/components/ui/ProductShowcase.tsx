import React, { useId, useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { ProductItem } from '../../types';
import { useTone } from './Band';
import { Dialog } from './Dialog';
import { DURATION, EASE } from '../../lib/motion';

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'ai', label: 'AI & meta-human' },
  { id: 'web3', label: 'Web3 & blockchain' },
  { id: 'platform', label: 'Platforms' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

interface ProductShowcaseProps {
  products: ProductItem[];
}

/**
 * The product shelf: a filtered grid of media cards, each opening its detail
 * in a dialog rather than on its own route.
 *
 * Eleven products across four categories is more than a page of prose can
 * hold and less than eleven routes deserve. Filtering keeps the grid short,
 * and the dialog means reading one product never costs your place in the grid.
 */
export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ products }) => {
  const t = useTone();
  const [filter, setFilter] = useState<FilterId>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const headingId = useId();

  const visible = useMemo(
    () => (filter === 'all' ? products : products.filter(p => p.category === filter)),
    [products, filter]
  );

  const active = products.find(product => product.id === openId) ?? null;

  return (
    <>
      <div className="flex flex-wrap gap-3" role="group" aria-label="Filter products">
        {FILTERS.map(option => {
          const selected = filter === option.id;
          const count =
            option.id === 'all'
              ? products.length
              : products.filter(p => p.category === option.id).length;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setFilter(option.id)}
              aria-pressed={selected}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none ${t.focusRing} ${
                selected
                  ? 'bg-brand-600 text-white'
                  : `${t.chip} ${t.body} hover:border-brand-300 hover:bg-brand-50`
              }`}
            >
              {option.label}
              <span className={selected ? 'text-white/60' : t.meta}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* `layout` on each card means a filter change slides the survivors into
          their new positions instead of the grid snapping. */}
      <motion.div layout className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map(product => (
            <motion.div
              key={product.id}
              layout={!reducedMotion}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
              exit={reducedMotion ? {} : { opacity: 0, scale: 0.96 }}
              transition={{ duration: DURATION.fast, ease: EASE }}
            >
              <button
                type="button"
                onClick={() => setOpenId(product.id)}
                className={`group flex h-full w-full flex-col text-left rounded-3xl focus-visible:outline-none ${t.focusRing}`}
              >
                <div
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-brand-50 ${
                    product.fit === 'contain' ? 'p-8' : ''
                  }`}
                >
                  <img
                    src={product.image}
                    alt=""
                    loading="lazy"
                    className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06] ${
                      product.fit === 'contain' ? 'object-contain' : 'object-cover'
                    }`}
                  />
                </div>

                <p className={`mt-7 text-xs font-medium uppercase tracking-[0.18em] ${t.accent}`}>
                  {FILTERS.find(f => f.id === product.category)?.label}
                </p>
                <h3
                  className={`mt-4 text-2xl font-semibold leading-[1.15] tracking-[-0.02em] ${t.heading} ${t.headingHover} transition-colors duration-300`}
                >
                  {product.name}
                </h3>
                <p className={`mt-3 text-base leading-relaxed ${t.body}`}>{product.tagline}</p>

                <span
                  className={`mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium ${t.heading}`}
                >
                  View details
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Dialog open={Boolean(active)} onClose={() => setOpenId(null)} labelledBy={headingId}>
        {active && (
          <article>
            <div
              className={`aspect-[16/9] w-full overflow-hidden rounded-t-3xl bg-brand-50 ${
                active.fit === 'contain' ? 'p-10' : ''
              }`}
            >
              <img
                src={active.image}
                alt={`${active.name} — ${active.tagline}`}
                className={`h-full w-full ${
                  active.fit === 'contain' ? 'object-contain' : 'object-cover'
                }`}
              />
            </div>

            <div className="p-8 md:p-12">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
                {FILTERS.find(f => f.id === active.category)?.label}
              </p>
              <h2
                id={headingId}
                className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-ink md:text-5xl text-balance"
              >
                {active.name}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft md:text-xl">
                {active.tagline}
              </p>
              <p className="mt-6 text-base leading-relaxed text-ink-soft">{active.description}</p>

              <ul className="mt-10">
                {active.highlights.map(highlight => (
                  <li
                    key={highlight}
                    className="flex gap-6 border-t border-line py-4 text-base leading-relaxed text-ink-soft"
                  >
                    <span aria-hidden="true" className="mt-2.5 h-px w-6 shrink-0 bg-brand-300" />
                    {highlight}
                  </li>
                ))}
              </ul>

              {active.marketNote && (
                <div className="mt-10 border-t-2 border-brand-600 pt-6">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">
                    Where else this lands
                  </p>
                  <p className="mt-3 text-lg leading-relaxed text-ink">{active.marketNote}</p>
                </div>
              )}
            </div>
          </article>
        )}
      </Dialog>
    </>
  );
};
