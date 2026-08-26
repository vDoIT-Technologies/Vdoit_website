export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'vdoit-theme';

/** Dark is the brand default; light is the opt-in. */
export const DEFAULT_THEME: Theme = 'dark';

/**
 * Storage can throw in private windows and embedded frames, so every access is
 * guarded — a failed read simply falls back to the default theme.
 */
export const readStoredTheme = (): Theme | null => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch {
    return null;
  }
};

export const storeTheme = (theme: Theme): void => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* Persisting the choice is a nicety, not a requirement. */
  }
};

/** Stored choice wins, then the OS preference, then the brand default. */
export const resolveInitialTheme = (): Theme => {
  const stored = readStoredTheme();
  if (stored) return stored;

  try {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  } catch {
    /* matchMedia is unavailable in some embedded contexts. */
  }

  return DEFAULT_THEME;
};

export const applyTheme = (theme: Theme): void => {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
};
