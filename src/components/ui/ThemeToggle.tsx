import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../lib/useTheme';

interface ThemeToggleProps {
  className?: string;
}

/**
 * Light/dark switch. The icon shows the theme you will get, not the one you are
 * in — the label says so explicitly for anyone who cannot see the icon.
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-xl border transition-all
        border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-blue-400
        dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:border-blue-400/40
        focus:outline-none focus:ring-2 focus:ring-blue-500/30 active:scale-[0.97] ${className}`}
    >
      <Sun className="w-[18px] h-[18px] rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute w-[18px] h-[18px] rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100" />
    </button>
  );
};
