import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTone } from './Band';

interface EditorialRowProps {
  index: number;
  title: string;
  description?: string;
  meta?: string;
  href?: string;
  onClick?: () => void;
}

/**
 * The replacement for card grids. A numbered full-width row: index, large
 * title, one supporting line, a hairline above. The entire row is one hit
 * target — never scatter separate controls across it.
 */
export const EditorialRow: React.FC<EditorialRowProps> = ({
  index,
  title,
  description,
  meta,
  href,
  onClick,
}) => {
  const t = useTone();
  const interactive = Boolean(href || onClick);

  const body = (
    <>
      <span className={`text-xs font-mono tabular-nums ${t.meta} pt-2 md:pt-3`}>
        {String(index).padStart(2, '0')}
      </span>

      <span className="min-w-0">
        <span className={`block text-2xl md:text-4xl font-semibold tracking-tight ${t.heading} transition-transform duration-500 ease-out md:group-hover:translate-x-2`}>
          {title}
        </span>
        {description && (
          <span className={`mt-3 block text-base leading-relaxed max-w-xl ${t.body}`}>
            {description}
          </span>
        )}
      </span>

      <span className="flex items-center gap-6 pt-2 md:pt-3">
        {meta && (
          <span className={`hidden lg:block text-xs font-medium uppercase tracking-[0.18em] ${t.meta}`}>
            {meta}
          </span>
        )}
        {interactive && (
          <ArrowUpRight
            aria-hidden="true"
            className={`w-6 h-6 shrink-0 ${t.meta} transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 ${
              t.heading === 'text-white' ? 'group-hover:text-white' : 'group-hover:text-slate-950'
            }`}
          />
        )}
      </span>
    </>
  );

  const shared = `group grid grid-cols-[auto_1fr_auto] items-start gap-6 md:gap-12 w-full text-left py-8 md:py-10 border-t ${t.hairline} transition-colors ${
    interactive ? `${t.rowHover} ${t.focusRing} focus-visible:outline-none` : ''
  }`;

  if (href) {
    return (
      <a href={href} className={shared}>
        {body}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={shared}>
        {body}
      </button>
    );
  }

  return <div className={shared}>{body}</div>;
};
