import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useTone } from './Band';
import { ServiceArtwork } from './ServiceArtwork';

interface ServiceCardProps {
  index: number;
  eyebrow: string;
  title: string;
  description: string;
  to: string;
  /** Real imagery when it exists; the drawn artwork stands in until then. */
  imageSrc?: string;
  /** Loops on hover, over the still. Ignored without a still to poster it. */
  videoSrc?: string;
  cta?: string;
}

/**
 * Media card: artwork, tag, headline, body, arrow link — in that order.
 *
 * Borderless by default so a grid of these reads as content rather than as a
 * dashboard; the whole card is a single link, and the hover gesture is one
 * idea expressed in synchronised parts — art pushes in, headline takes the
 * brand colour, arrow leaves. Never a lift, never a shadow.
 */
export const ServiceCard: React.FC<ServiceCardProps> = ({
  index,
  eyebrow,
  title,
  description,
  to,
  imageSrc,
  videoSrc,
  cta = 'Explore',
}) => {
  const t = useTone();
  const video = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);

  // Touch devices have no hover, so the video would either never play or play
  // on tap — both wrong. They keep the still.
  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const playable = Boolean(videoSrc) && canHover && !reducedMotion;

  const start = useCallback(() => {
    const el = video.current;
    if (!el) return;
    // play() rejects if the pointer leaves before the load resolves; that is
    // expected, not an error worth surfacing.
    void el.play().catch(() => {});
  }, []);

  const stop = useCallback(() => {
    const el = video.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  }, []);

  return (
    <Link
      to={to}
      onMouseEnter={playable ? start : undefined}
      onMouseLeave={playable ? stop : undefined}
      onFocus={playable ? start : undefined}
      onBlur={playable ? stop : undefined}
      className={`group flex h-full flex-col rounded-3xl focus-visible:outline-none ${t.focusRing}`}
    >
      {/* Fixed ratio keeps every card in the row aligned regardless of title length. */}
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl bg-brand-50">
        {imageSrc ? (
          <img
            src={imageSrc}
            // Decorative: the headline beside it carries the meaning.
            alt=""
            loading="lazy"
            width={1200}
            height={800}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <ServiceArtwork
            index={index}
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        )}

        {playable && (
          // Sits over the still and fades in, so the first frame never flashes
          // and nothing downloads until the pointer actually arrives.
          <video
            ref={video}
            src={videoSrc}
            poster={imageSrc}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
        )}
      </div>

      <p className={`mt-7 text-xs font-medium uppercase tracking-[0.18em] ${t.accent}`}>
        {eyebrow}
      </p>

      <h3
        className={`mt-4 text-2xl font-semibold leading-[1.15] tracking-[-0.02em] ${t.heading} ${t.headingHover} transition-colors duration-300`}
      >
        {title}
      </h3>

      <p className={`mt-3 text-base leading-relaxed ${t.body}`}>{description}</p>

      <span className={`mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium ${t.heading}`}>
        {cta}
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
};
