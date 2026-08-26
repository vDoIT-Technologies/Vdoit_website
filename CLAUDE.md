# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # install dependencies
npm run dev          # Vite dev server on port 3000, host 0.0.0.0
npm run build        # production build to dist/
npm run preview      # serve the production build
npm run lint         # type-check only (tsc --noEmit); there is no ESLint config
npm run clean        # rm -rf dist server.js
```

There is no test runner configured — `npm run lint` (type-check) is the only automated check.

`DISABLE_HMR=true` turns off Vite HMR **and** file watching (see `vite.config.ts`). This is set by AI Studio to prevent flicker during agent edits; leave that logic alone.

## Project

Single-page marketing site for VDO IT Technologies Limited, scaffolded from Google AI Studio (`metadata.json`, `README.md`, and the AI Studio app link are AI Studio artifacts). React 19 + Vite 6 + Tailwind CSS v4, TypeScript, no router, no backend.

Env vars are documented in `.env.example` (`GEMINI_API_KEY`, `APP_URL`) and injected by AI Studio at runtime. **Nothing in `src/` currently reads them** — `@google/genai`, `express`, and `dotenv` are declared dependencies but unused, and `metadata.json` advertises `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` that no code implements. Treat that as latent scaffolding, not a live integration.

## Architecture

`src/main.tsx` → `src/App.tsx` renders a fixed sequence of section components; there is no routing. Navigation is DOM anchor scrolling: `App.scrollToSection(id)` calls `getElementById(...).scrollIntoView()`, so each section component must keep its `id` (`estimator`, `contact`, etc.) in sync with the ids passed by `Navbar`, `Hero`, and footer links.

Cross-section state lives entirely in `App` as one `inquiryPrefill` object:

- `ServicesSection` / `IndustriesSection` / `AIEstimator` call their `on*ForInquiry` callback with a service title, industry name, or generated blueprint.
- `App` stores it in `inquiryPrefill` and scrolls to `#contact`.
- `ContactSection` receives `prefilledService` / `prefilledIndustry` / `prefilledDetails` as props and syncs them into local form state via `useEffect`. Blueprint details are *appended* to `projectDescription` as `[Blueprint]: ...` rather than replacing it.

Adding a new "send this into the inquiry form" entry point means adding a handler in `App` and a corresponding prefilled prop on `ContactSection` — not a global store.

### Content is data, not markup

`src/data/companyData.ts` is the single source of truth for all site copy: `COMPANY_INFO`, `FOUNDERS`, `SERVICES`, `INDUSTRIES`, `LINKEDIN_POSTS`, `TIMELINE_MILESTONES`, `ADVANTAGES`. Interfaces for these live in `src/types.ts`. Copy edits (founders, stats, service descriptions, emails) belong here, not in component JSX.

Data entries carry an `iconName` **string**, and each consuming component maps it to a `lucide-react` component through its own local `switch` (`getIcon` in `ServicesSection`, `getIndustryIcon` in `IndustriesSection`, `getAdvantageIcon` in `WhyChooseUs`). Adding a data entry with a new `iconName` requires adding a case to the matching switch, or it falls through to that switch's default.

### Simulated behavior

Two flows look like backend calls but are entirely client-side and intentionally so:

- `AIEstimator.handleGenerateBlueprint` — a `setTimeout` plus `if/else` rules over the selected goal string produces architecture/timeline/ROI text. No model call.
- `ContactSection.handleSubmit` — generates a `VDO-AI-####` ticket id locally and shows a success state; nothing is sent anywhere. Real follow-up happens through `mailto:` links to `COMPANY_INFO.primaryEmail`.

### Theming

The site is **dark-first**. `.dark` on `<html>` drives every `dark:` variant, enabled by `@custom-variant dark (&:where(.dark, .dark *));` in `src/index.css` — Tailwind v4 has no `darkMode` config file here.

Three pieces, in the order they run:

1. The inline script in `index.html` sets the class **before first paint** so the theme never flashes. It duplicates the resolution logic on purpose.
2. `src/lib/theme.ts` owns that logic for the app: stored choice → OS preference → `dark` default. Every `localStorage` access is guarded because it throws in private windows.
3. `src/lib/useTheme.ts` reads the document state and flips it; `ThemeToggle` is its only consumer, so there is no context provider.

If you change the resolution order, change it in both `theme.ts` and the inline script or they will disagree on first load.

### The 3D hero

`src/components/ui/HeroCanvas.tsx` is a gate, not a scene. It decides whether WebGL is worth loading — skipping it on reduced-motion, small screens, coarse pointers, and missing WebGL — and renders a CSS blurred-orb fallback in those cases. Only when it passes does it `React.lazy` the actual scene, 200ms after paint, so the headline never waits on WebGL.

`src/components/ui/HeroScene.tsx` is the React Three Fiber scene: a wireframe icosahedron in a particle shell, driven by pointer (`state.pointer`) and a scroll ref updated by a passive listener outside React. It takes `theme` as a prop because material colors differ per theme — the light-mode palette has to be darker or the field vanishes into white.

The fallback path is the common one on mobile. Test it.

### Styling

Tailwind v4 via `@tailwindcss/vite`; `src/index.css` uses `@import "tailwindcss"` (no `tailwind.config.js`). Fonts (`Plus Jakarta Sans` body, `Outfit` headings) load from Google Fonts in `index.html` and are bound in `@layer base`. Palette is Tailwind slate + blue; sections alternate `bg-white` / `bg-slate-50` with `border-t border-slate-200`.

`index.html` also holds SEO meta tags and a JSON-LD `Organization` block naming the founders — keep it consistent with `companyData.ts` when company facts change.

The `@` path alias maps to the project root (`vite.config.ts` + `tsconfig.json`), though existing imports use relative paths.

## Always route work through the skills and agents

This project keeps its conventions in `.claude/`, not in your head. **Before editing any file under `src/`, load the matching skill.** Do not start from memory of how the codebase looked — the skills are the source of truth and they change.

| Work | Load first | Delegate to |
|---|---|---|
| Any UI — building or restyling | `ui-ux-pro-max` | `frontend-agent` |
| New page section | `add-section` | `frontend-agent` |
| Animation, transitions, reveals | `add-motion` | `animation-agent` |
| Copy, company facts, SEO, JSON-LD | `update-content` | `website-content-agent` |
| Review before shipping | `ui-audit` | `ui-review-agent` |

Rules:

- **Skill before edit.** UI work loads `ui-ux-pro-max` even when the change looks like a one-liner — that is exactly when the spacing scale and interaction states get skipped.
- **More than one domain?** Load both skills, or delegate each part to its agent. A section with copy, layout, and motion touches three.
- **Delegate real work.** Multi-file changes and anything with a clear owner in the table go to the agent. Small single-file edits inside one domain can be done inline, with the skill loaded.
- **Always finish with review.** After any component or styling change, run `ui-audit` (or `ui-review-agent`) before reporting done. It is read-only and reports findings; you apply the fixes.
- Agents in `.claude/agents/` and skills in `.claude/skills/` carry the same rules. The agent gets its own context and restricted tools; the skill runs inline. Pick by size of the job, not by preference.

## Working conventions

- **Never overwrite an existing component.** New functionality goes into a new file, or as a small additive change to the existing one — no rewrites of working sections.
- **Minimal patterns.** Add the smallest thing that satisfies the request. No speculative abstractions, no extra config, no refactors that weren't asked for.
- **Reuse first.** Pull copy from `companyData.ts`, types from `types.ts`, icons from the existing `iconName` switches, and Tailwind classes from the existing slate/blue section rhythm before introducing anything new.
- **Structure stays clean.** One component per file in `src/components/`, data in `src/data/`, shared interfaces in `src/types.ts`. Tailwind utility classes only — no ad-hoc `<style>` blocks or one-off CSS; `src/index.css` is for base layer and scrollbar rules only.
- **Git:** never add Claude as a co-author or author on commits.
- **Design standard:** `.claude/skills/ui-ux-pro-max/SKILL.md` holds the spacing scale, type ramp, color roles, depth, interaction states, and component patterns. Load it before building or restyling UI.
