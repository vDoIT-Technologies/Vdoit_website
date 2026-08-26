import { useCallback, useEffect, useState } from 'react';
import { applyTheme, resolveInitialTheme, storeTheme, type Theme } from './theme';

/**
 * The theme is owned by the document, not by React — the inline script in
 * index.html sets it before first paint. This hook reads that state, then keeps
 * it in sync. Single consumer (the navbar toggle), so no context is warranted.
 */
export const useTheme = (): { theme: Theme; toggleTheme: () => void } => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'dark';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  useEffect(() => {
    // Reconcile with storage in case the pre-paint script was skipped.
    const initial = resolveInitialTheme();
    applyTheme(initial);
    setTheme(initial);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(current => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
};
