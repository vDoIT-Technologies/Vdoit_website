import React, { useId, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Bot,
  Car,
  HeartPulse,
  Landmark,
  Megaphone,
  Plane,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Store,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { AI_APPLICATIONS } from '../../data/companyData';
import { DURATION, EASE } from '../../lib/motion';
import { useTone } from './Band';
import { Spark } from './SparkField';

/**
 * The hero's figure: the AI core ringed by the domains VDOIT builds in, each
 * node opening its use cases on hover, focus or tap.
 *
 * The card opens outward from its node and is deliberately not clamped to the
 * figure — there is no room for eleven nodes, their labels and a card inside
 * one column, so the card is allowed to sit over the headline instead. It is
 * the topmost thing on the band while it is open.
 *
 * Decorative below `xl`: the industries are on the page in full further down,
 * so nothing is lost at widths where a ring has nowhere to go.
 */

const ICONS: Record<string, LucideIcon> = {
  Users,
  Plane,
  ShoppingCart,
  Landmark,
  Megaphone,
  Bot,
  Shield,
  Car,
  ShieldCheck,
  Store,
  HeartPulse,
};

/**
 * The SVG shares the stage's viewBox, so orbit geometry is in stage units
 * while nodes and cards are placed in percentages of the same box.
 *
 * The stage's `aspect-square` class has to match these two numbers — Tailwind
 * cannot read a value built at runtime, so they are kept in step by hand.
 */
const W = 700;
const H = 700;

/** A true circle, as on the reference. */
const R = 232;

/** The gap between a node's edge and its label. */
const FLYOUT = 62;

/** The gap between a node's edge and its card, tighter than the label's. */
const CARD_OFFSET = 48;

/**
 * The shells behind the core, innermost first, as on the reference: a lit disc
 * hugging the mark, two thin rings, then the dotted orbit the nodes sit on and
 * a faint outer edge. Only one of these renders per page, so the gradient can
 * take a fixed id.
 */
const CORE_GLOW_ID = 'hero-core-glow';
/**
 * Sparks catching the light around the ring — the wordmark's own flourish,
 * so the shine is the brand's rather than a generic glint.
 *
 * Placed between the nodes and off the orbit, at art-directed points rather
 * than random ones, so the composition is the same every load. `radius` is a
 * multiple of the orbit's.
 */
const SPARKLES = [
  { angle: -73.6, radius: 0.86, size: 14, delay: 0 },
  { angle: -8.2, radius: 1.13, size: 19, delay: 1.1 },
  { angle: 57.3, radius: 0.79, size: 11, delay: 2.4 },
  { angle: 155, radius: 1.1, size: 16, delay: 0.6 },
  { angle: 221, radius: 0.88, size: 12, delay: 1.8 },
].map(sparkle => {
  const rad = (sparkle.angle * Math.PI) / 180;
  return {
    ...sparkle,
    x: 50 + ((R * sparkle.radius * Math.cos(rad)) / W) * 100,
    y: 50 + ((R * sparkle.radius * Math.sin(rad)) / H) * 100,
  };
});

/**
 * Where a node's label sits. Near the top and bottom of the ring there is no
 * room beside the circle, so the label goes above or below it instead — which
 * is also how the reference lays those two out.
 */
type Side = 'top' | 'right' | 'bottom' | 'left';

const sideFor = (angle: number): Side => {
  const a = ((angle % 360) + 360) % 360;
  if (a > 250 && a < 290) return 'top';
  if (a > 70 && a < 110) return 'bottom';
  return a > 90 && a < 270 ? 'left' : 'right';
};

const LABEL_POSITION: Record<Side, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2',
  bottom: 'top-full left-1/2 -translate-x-1/2',
  left: 'right-full top-1/2 -translate-y-1/2',
  right: 'left-full top-1/2 -translate-y-1/2',
};

const NODES = AI_APPLICATIONS.map((application, index) => {
  /** Evenly spaced, clockwise from twelve o'clock. */
  const angle = -90 + (index * 360) / AI_APPLICATIONS.length;
  const rad = (angle * Math.PI) / 180;
  const dx = R * Math.cos(rad);
  const dy = R * Math.sin(rad);

  return {
    application,
    side: sideFor(angle),
    /** Percentages of the stage box, for the DOM layer. */
    x: 50 + (dx / W) * 100,
    y: 50 + (dy / H) * 100,
    /** Stage units, for the SVG layer. */
    cx: W / 2 + dx,
    cy: H / 2 + dy,
    ux: dx / R,
    uy: dy / R,
  };
});

/**
 * Anchors the card against its node, opening away from the core — right off
 * the right-hand nodes, left off the left-hand ones.
 *
 * Neither side is clamped. Cards on the left run over the headline, which is
 * fine: they only exist under the pointer. Cards on the right are what sets
 * the stage's width in `HomePage` — the figure is held back from the container
 * edge so the outermost card still lands on screen.
 */
const cardAnchor = (node: (typeof NODES)[number]): React.CSSProperties =>
  node.ux >= 0
    ? { left: `calc(${node.x}% + ${CARD_OFFSET}px)`, top: `${node.y}%` }
    : { right: `calc(${100 - node.x}% + ${CARD_OFFSET}px)`, top: `${node.y}%` };

export const HeroConstellation: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const panelId = useId();
  const t = useTone();

  const active = NODES.find(node => node.application.id === activeId) ?? null;

  return (
    <div
      className={`relative aspect-square w-full ${className}`}
      onMouseLeave={() => setActiveId(null)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveId(null);
      }}
      onKeyDown={event => {
        if (event.key === 'Escape') setActiveId(null);
      }}
    >
      {/* Ambient wash. Sits under everything and never reacts to input. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[18%] rounded-full bg-brand-100/60 blur-[80px]"
      />

      {/* Orbits, spokes and connectors. Decorative, so no semantics. */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          active ? 'opacity-40' : 'opacity-100'
        }`}
      >
        <defs>
          <radialGradient id={CORE_GLOW_ID}>
            <stop offset="45%" stopColor="var(--color-brand-100)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-brand-100)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer edge. One step down the scale from the wash tokens: on white,
            brand-100 linework disappears at anything but full brightness. */}
        <circle
          cx={W / 2}
          cy={H / 2}
          r={R + 44}
          fill="none"
          stroke="var(--color-brand-200)"
          strokeWidth="1.5"
        />
        {/* The orbit the nodes sit on. Its dashes creep round it: one dash
            period every four seconds, slow enough to read as a live diagram
            rather than an animation asking to be watched. */}
        <motion.circle
          cx={W / 2}
          cy={H / 2}
          r={R}
          fill="none"
          stroke="var(--color-brand-300)"
          strokeWidth="1.5"
          strokeDasharray="3 7"
          animate={reducedMotion ? undefined : { strokeDashoffset: [0, -10] }}
          transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
        />
        <circle
          cx={W / 2}
          cy={H / 2}
          r={R - 76}
          fill="none"
          stroke="var(--color-brand-200)"
          strokeWidth="1.5"
        />
        {/* The lit disc the mark sits on, and the ring that crisps its edge. */}
        <motion.circle
          cx={W / 2}
          cy={H / 2}
          r={R - 62}
          fill={`url(#${CORE_GLOW_ID})`}
          animate={reducedMotion ? undefined : { opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
        />
        <circle
          cx={W / 2}
          cy={H / 2}
          r={R - 108}
          fill="none"
          stroke="var(--color-brand-300)"
          strokeWidth="1.5"
        />

        {NODES.map((node, index) => {
          const isActive = node.application.id === activeId;
          const stroke = isActive ? 'var(--color-brand-500)' : 'var(--color-brand-300)';
          const sign = node.ux >= 0 ? 1 : -1;

          return (
            <g key={node.application.id}>
              {/* Spoke: the core out to the node. Drawn core-first, so a
                  climbing dash offset runs the dashes back down it — each
                  domain feeding the core. Staggered so the eleven read as a
                  circulating system rather than eleven metronomes. */}
              <motion.line
                x1={W / 2 + node.ux * 128}
                y1={H / 2 + node.uy * 128}
                x2={node.cx - node.ux * 32}
                y2={node.cy - node.uy * 32}
                stroke={stroke}
                strokeWidth={isActive ? 2.5 : 1.5}
                strokeDasharray="6 8"
                animate={reducedMotion ? undefined : { strokeDashoffset: [0, 14] }}
                transition={{
                  duration: 2.4,
                  ease: 'linear',
                  repeat: Infinity,
                  delay: index * 0.18,
                }}
              />
              {/* Connector: the node out to its label. */}
              <line
                x1={node.cx + sign * 30}
                y1={node.cy}
                x2={node.cx + sign * 54}
                y2={node.cy}
                stroke={stroke}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <circle
                cx={node.cx + sign * 54}
                cy={node.cy}
                r="4.5"
                fill={isActive ? 'var(--color-brand-600)' : 'var(--color-brand-500)'}
              />
            </g>
          );
        })}
      </svg>

      {/* The core. Decorative — the mark's own "AI | ML" lettering is artwork
          rather than copy, and it stays put: the cards open outside the ring. */}
      <img
        src="/images/brand/ai-ml-core.webp"
        alt=""
        aria-hidden="true"
        width={400}
        height={400}
        decoding="async"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[27%] -translate-x-1/2 -translate-y-1/2"
      />

      {/* A gloss crossing the mark every few seconds. White lightens the violet
          linework and vanishes against the light ground, so it reads as a
          highlight passing over rather than a band sliding across. */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
        >
          <motion.div
            className="absolute -inset-y-1/4 w-2/5 -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
            animate={{ x: ['-180%', '360%'] }}
            transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3.5 }}
          />
        </div>
      )}

      {/* The shine. Decorative, and gone entirely when motion is reduced —
          a spark frozen mid-twinkle would read as a stray mark. */}
      {!reducedMotion &&
        SPARKLES.map(sparkle => (
          <motion.div
            key={sparkle.angle}
            aria-hidden="true"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: sparkle.size,
              height: sparkle.size,
            }}
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 text-brand-400"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1, 0.4] }}
            transition={{
              duration: 2.6,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 2.4,
              delay: sparkle.delay,
            }}
          >
            <Spark className="h-full w-full" />
          </motion.div>
        ))}

      <div role="group" aria-label="What we build with AI">
        {NODES.map(node => {
          const Icon = ICONS[node.application.iconName] ?? Bot;
          const isActive = node.application.id === activeId;
          /* A node with no use cases has no card to hand its place to, so its
             label stays put and the node just lights up. */
          const opensCard = isActive && node.application.useCases.length > 0;

          return (
            <button
              key={node.application.id}
              type="button"
              aria-label={node.application.name}
              aria-expanded={opensCard}
              aria-controls={panelId}
              onMouseEnter={() => setActiveId(node.application.id)}
              onFocus={() => setActiveId(node.application.id)}
              onClick={() => setActiveId(node.application.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white transition-all duration-300 focus-visible:outline-none ${t.focusRing} ${
                isActive
                  ? 'scale-110 border-brand-400 bg-brand-50'
                  : 'border-brand-300 hover:border-brand-400'
              } ${active && !isActive ? 'opacity-40' : 'opacity-100'}`}
            >
              <Icon
                aria-hidden="true"
                className={`h-5 w-5 transition-colors ${isActive ? 'text-brand-700' : 'text-brand-500'}`}
              />
              {/* On the connector, outside the ring. It steps back while its
                  own card is open, where the full name is the heading. */}
              <span
                aria-hidden="true"
                style={
                  node.side === 'left' || node.side === 'right'
                    ? { [node.side === 'right' ? 'marginLeft' : 'marginRight']: FLYOUT - 24 }
                    : { [node.side === 'top' ? 'marginBottom' : 'marginTop']: 10 }
                }
                className={`absolute whitespace-nowrap rounded-full border border-brand-100 bg-white px-3 py-1.5 text-xs font-medium text-ink transition-opacity duration-300 ${
                  LABEL_POSITION[node.side]
                } ${opensCard ? 'opacity-0' : 'opacity-100'}`}
              >
                {node.application.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* The card. Sits above everything on the band, including the headline it
          is allowed to overlap. */}
      <div id={panelId}>
        {active && active.application.useCases.length > 0 && (
          <motion.div
            key={active.application.id}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
            style={cardAnchor(active)}
            className={`absolute z-40 w-[15rem] -translate-y-1/2 rounded-2xl border border-brand-200 bg-white p-5 ${
              active.ux >= 0 ? 'origin-left' : 'origin-right'
            }`}
          >
            <h3 className="text-sm font-semibold leading-snug tracking-[-0.02em] text-ink">
              {active.application.name}
            </h3>
            <ul className="mt-3 space-y-1.5">
              {active.application.useCases.map(useCase => (
                <li key={useCase} className="flex gap-2 text-[13px] leading-[1.45] text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-400"
                  />
                  {useCase}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};
