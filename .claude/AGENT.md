# AGENT.md — JarvisUI React
> Updated: 2026-06-19 | Session #1 | By: Claude Sonnet 4.6
> ⚠️ This file is always live — it reflects the current state of the .claude/ folder

---

## Project Overview

JarvisUI React is a HUD-themed React + TypeScript component library (55+ components) — a 1:1 port of `Jarvis_theme_Blazer_v1` (Blazor). Ships as npm package `jarvis-ui` with a companion Vite demo/docs app in the same pnpm workspace monorepo. Full runtime theming via CSS custom properties (6 presets + user-customisable colors).

**Stack:** React 18 + TypeScript | Vite (library + app) | Tailwind CSS | pnpm workspaces  
**Source Blazor project:** `D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1`  
**Repo root:** `D:\Claude\HUD Theme\HUDtheme`  
**Status:** Design complete — implementation not yet started

---

## How To Run (once scaffolded)

```bash
# Install all workspace deps
pnpm install

# Develop library in watch mode
pnpm --filter jarvis-ui dev

# Run demo/docs app
pnpm --filter docs dev

# Build library for publishing
pnpm --filter jarvis-ui build

# Build demo app
pnpm --filter docs build
```

## Required Environment Variables

```
VITE_GOOGLE_MAPS_KEY=    # Google Maps API key (needed for JGoogleMap in docs app)
```

---

## Rules For All Agents

### Mandatory — every session:
1. Read `.claude/INDEX.md` first — get oriented
2. Read `.claude/SESSION.md` before writing any code — know what's in progress
3. Update `.claude/SESSION.md` when starting AND finishing work
4. Move tasks in `.claude/TASKS.md` as status changes
5. Log every technical decision in `.claude/DECISIONS.md` with WHY

### The Golden Rule for this project:
**Always read the corresponding Blazor `.razor` file BEFORE building any React component.**
The Blazor source at `D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI\Components\` is the spec.
Never guess — read first, then build.

### Code rules:
6. Update `.claude/CODEBASE_MAP.md` when any file is created, deleted, or renamed
7. Update `.claude/CONTEXT/frontend.md` when component API patterns change
8. No hardcoded hex colors in TSX — all colors via `var(--j-*)` CSS variables only
9. No `border-radius` on HUD components — use `clip-path` polygons (matches Blazor)
10. All text: `font-family: 'Courier New', 'Lucida Console', monospace`
11. React/ReactDOM are peer deps — never import them inside library build output
12. Surgical section edits only — never rewrite a whole `.claude/` file

### Never do:
- Skip reading the Blazor `.razor` file before building a component
- Hardcode colors — use CSS variables
- Add border-radius to HUD components
- Import React in the library's bundled output (it's a peer dep)
- Leave SESSION.md "In Progress" items stale at session end
- Make architecture changes without a DECISIONS.md entry

---

## Key Source Files (Blazor reference — read before building each component)

| Blazor File | React Output |
|---|---|
| `JarvisUI/Tokens/JarvisTheme.cs` | `packages/jarvis-ui/src/theme/JarvisTheme.ts` |
| `JarvisUI/Tokens/JarvisTokens.cs` | `packages/jarvis-ui/src/theme/JarvisTokens.ts` |
| `JarvisUI/Components/JThemeProvider.razor` | `packages/jarvis-ui/src/theme/JThemeContext.tsx` |
| `JarvisUI/Components/JThemePicker.razor` | `packages/jarvis-ui/src/components/special/JThemePicker.tsx` |
| `JarvisUI/Components/JPageLayout.razor` | `packages/jarvis-ui/src/components/layout/JPageLayout.tsx` |
| `JarvisUI/Components/JSidebar.razor` | `packages/jarvis-ui/src/components/layout/JSidebar.tsx` |
| `JarvisUI/Components/JHudBar.razor` | `packages/jarvis-ui/src/components/layout/JHudBar.tsx` |
| `JarvisUI/Components/JButton.razor` | `packages/jarvis-ui/src/components/buttons/JButton.tsx` |
| `JarvisUI/Components/JCard.razor` | `packages/jarvis-ui/src/components/cards/JCard.tsx` |
| `JarvisUI/wwwroot/css/` (4 files) | `packages/jarvis-ui/src/styles/` (copied verbatim) |
| `JarvisUI/wwwroot/js/jarvis-gmap.js` | `packages/jarvis-ui/src/components/maps/JGoogleMap.tsx` |
| `JarvisUI/wwwroot/js/jarvis-leaflet.js` | `packages/jarvis-ui/src/components/maps/JLeafletMap.tsx` |

---

## .claude/ Folder Live State

| File | Last Updated | Summary |
|---|---|---|
| SESSION.md | 2026-06-19 | Session #1 — design + .claude/ setup complete |
| TASKS.md | 2026-06-19 | 0 active, 61 backlog, 0 blocked |
| CODEBASE_MAP.md | 2026-06-19 | Planned structure mapped (no source files yet) |
| ARCHITECTURE.md | 2026-06-19 | Monorepo design, theming flow, layer table |
| DECISIONS.md | 2026-06-19 | 4 ADRs logged |
| CONTEXT/frontend.md | 2026-06-19 | Component library frontend patterns |
