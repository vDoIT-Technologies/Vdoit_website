import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import type { Tone } from '../../lib/tone';

const HeroScene = lazy(() => import('./HeroScene'));

/**
 * Gate in front of the WebGL hero. Decides whether the scene is worth loading
 * at all, and renders a pure-CSS depth fallback when it is not — so the hero
 * looks intentional on a low-end phone, not broken.
 */

const CSS_FALLBACK = (
  <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-blue-500/15 blur-[120px]" />
    <div className="absolute top-1/3 right-0 w-[380px] h-[380px] rounded-full bg-indigo-500/15 blur-[110px]" />
  </div>
);

const supportsWebGL = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

export const HeroCanvas: React.FC<{ className?: string; tone?: Tone }> = ({
  className = '',
  tone = 'dark',
}) => {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    // Small screens and coarse pointers get the fallback: the scene reacts to a
    // pointer they do not have, and the fill cost lands hardest there.
    const isSmall = window.matchMedia('(max-width: 767px)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isSmall || isCoarse || !supportsWebGL()) return;

    // Defer past first paint so the headline is never waiting on WebGL.
    const id = window.setTimeout(() => setEnabled(true), 200);
    return () => window.clearTimeout(id);
  }, [reducedMotion]);

  return (
    <div aria-hidden className={`absolute inset-0 pointer-events-none ${className}`}>
      {CSS_FALLBACK}
      {enabled && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 scene-fade-in">
            <HeroScene tone={tone} />
          </div>
        </Suspense>
      )}
    </div>
  );
};
