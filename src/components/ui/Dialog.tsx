import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE } from '../../lib/motion';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** Ties the panel to its own heading for screen readers. */
  labelledBy: string;
  children: React.ReactNode;
}

/**
 * A modal panel, used where a full page would be too much and an inline
 * expansion would push the grid around.
 *
 * Deliberately small: Escape and the backdrop both close it, the page behind
 * stops scrolling, focus moves in on open and returns to the trigger on close,
 * and Tab is kept inside the panel while it is up. Anything more elaborate
 * than that belongs in a route, not a dialog.
 */
export const Dialog: React.FC<DialogProps> = ({ open, onClose, labelledBy, children }) => {
  const panel = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  // Remember what had focus before the dialog took it.
  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement | null;
    // Focus the panel itself rather than guessing at a first control — the
    // heading is what the reader needs announced.
    panel.current?.focus();
    return () => restoreTo.current?.focus?.();
  }, [open]);

  // The page behind a modal must not scroll.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      // Keep Tab inside the panel: without this, focus walks onto the page
      // behind the backdrop where nothing is visible or clickable.
      const focusable = panel.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
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
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={reducedMotion ? {} : { opacity: 1 }}
            exit={reducedMotion ? {} : { opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
            exit={reducedMotion ? {} : { opacity: 0, y: 16 }}
            transition={{ duration: DURATION.base, ease: EASE }}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white focus:outline-none sm:max-h-[88vh] sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/90 text-ink backdrop-blur transition-all hover:border-brand-300 hover:bg-brand-50 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
