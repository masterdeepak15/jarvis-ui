# DECISIONS.md — Architecture Decision Records
> Every significant technical decision logged here with context and reason.
> Future agents: read before changing architecture or patterns.

---

## ADR-4: Use Recharts for chart components
**Date:** 2026-06-19 | **Session:** #1 | **Status:** Accepted

**Context:** The Blazor project has 6 custom chart components. React needs a charting library to replicate them without building SVG charts from scratch.

**Decision:** Use Recharts as the rendering engine, wrapped in `J*` components that match the Blazor prop API.

**Reason:** Recharts is the most React-idiomatic, tree-shakeable, and well-maintained option. It uses SVG natively which lets HUD CSS variables color chart elements. Rejected Chart.js (Canvas-based, hard to style with CSS vars) and Victory (heavier, less maintained).

**Impact:**
- ✅ Each Blazor chart maps cleanly to a Recharts primitive
- ✅ CSS variable colors work via stroke/fill props
- ⚠️ Gauge chart has no Recharts primitive — needs custom SVG arc component

---

## ADR-3: Bundle GeoJSON into the library
**Date:** 2026-06-19 | **Session:** #1 | **Status:** Accepted

**Context:** GeoJSON files for Leaflet maps live in `JarvisUI.Docs` (the Blazor demo project). In React, users need this data without having to source it separately.

**Decision:** Bundle all GeoJSON files into `packages/jarvis-ui/src/assets/geo/` so they ship with the library.

**Reason:** Simplifies consumer setup — no separate download or data hosting required. Files are static and change rarely.

**Impact:**
- ✅ Zero consumer config for map data
- ⚠️ Adds to bundle size — acceptable for a specialized HUD library

---

## ADR-2: CSS files copied verbatim from Blazor
**Date:** 2026-06-19 | **Session:** #1 | **Status:** Accepted

**Context:** The Blazor project has 4 CSS files totalling ~2,500 lines. These define all animations, component styles, state modifiers, and the CSS variable system.

**Decision:** Copy all 4 CSS files (`jarvis-theme.css`, `jarvis-ui.css`, `jarvis-charts.css`, `jarvis-maps.css`) verbatim into `packages/jarvis-ui/src/styles/` with no rewrites.

**Reason:** The CSS is pure standard CSS — no Blazor-specific syntax. Rewriting would risk drift from the Blazor original and is unnecessary. Tailwind handles layout/spacing in TSX; HUD-specific classes stay in these files.

**Impact:**
- ✅ Pixel-perfect parity with Blazor version guaranteed
- ✅ Zero CSS rewrite effort
- ⚠️ Must be kept in sync manually if Blazor CSS is ever updated

---

## ADR-1: pnpm workspace monorepo (library + demo app)
**Date:** 2026-06-19 | **Session:** #1 | **Status:** Accepted

**Context:** Need both a publishable npm package (`jarvis-ui`) and a demo/docs app in the same repo. Users clone the repo to get both — the demo shows how to use the library.

**Decision:** pnpm workspaces monorepo: `packages/jarvis-ui/` (npm package) + `apps/docs/` (Vite demo app).

**Reason:** Mirrors the Blazor solution structure exactly (JarvisUI RCL + JarvisUI.Docs). Turborepo was rejected as overkill for a single-developer project. Single Vite project (Option A) was rejected for insufficient library/app boundary.

**Impact:**
- ✅ Clean separation — library is publishable, demo is separate
- ✅ `apps/docs` imports from `packages/jarvis-ui` via pnpm workspace symlink
- ⚠️ Requires pnpm as package manager (not npm or yarn)
