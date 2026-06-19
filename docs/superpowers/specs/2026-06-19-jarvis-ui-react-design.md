# JarvisUI React — Design Spec
**Date:** 2026-06-19  
**Source:** Clone of `Jarvis_theme_Blazer_v1` Blazor project  
**Status:** Approved

---

## 1. Goal

Build a React + TypeScript port of the Blazor `JarvisUI` component library — a HUD-themed UI kit with 55+ components, 6 built-in color presets, and full runtime theme customisation. Distribute as a single npm-publishable package (`jarvis-ui`). Ship a companion demo/docs app in the same repository.

---

## 2. Repository Structure

```
HUDtheme/                          ← git root (single deliverable repo)
├── pnpm-workspace.yaml
├── package.json                   ← root scripts only
│
├── packages/
│   └── jarvis-ui/                 ← npm package (published as "jarvis-ui")
│       ├── src/
│       │   ├── components/
│       │   │   ├── layout/        ← JPageLayout, JSidebar, JHudBar
│       │   │   ├── buttons/       ← JButton, JNavItem, JToggle
│       │   │   ├── cards/         ← JCard, JStatCard, JHudFrame, JHudFrameCard, JOrb, JWaveform, JBootScreen
│       │   │   ├── forms/         ← JInput, JTextArea, JFormField, JCheckbox, JRadio, JSelect, JSlider
│       │   │   ├── data/          ← JTable, JDataRow, JAccordion, JPagination
│       │   │   ├── feedback/      ← JToast, JToastProvider, JAlert, JModal
│       │   │   ├── charts/        ← JBarChart, JLineChart, JDonutChart, JGaugeChart, JRadarChart, JSparkline
│       │   │   ├── maps/          ← JLeafletMap, JGoogleMap, JMapInfoWindow
│       │   │   └── special/       ← JCommandPalette, JRadialMenu, JRadialItem, JSpinner, JProgress,
│       │   │                         JBadge, JStatusPill, JDivider, JHudLabel, JNodeGraph, JArcMeter
│       │   ├── theme/
│       │   │   ├── JarvisTheme.ts     ← Theme type + 6 presets (Cyan, Amber, Green, Red, Purple, White)
│       │   │   ├── JarvisTokens.ts    ← Enum → CSS class name resolvers
│       │   │   └── JThemeContext.tsx  ← React context + useTheme hook
│       │   ├── styles/
│       │   │   ├── jarvis-theme.css   ← copied from Blazor verbatim
│       │   │   ├── jarvis-ui.css      ← copied from Blazor verbatim
│       │   │   ├── jarvis-charts.css  ← copied from Blazor verbatim
│       │   │   └── jarvis-maps.css    ← copied from Blazor verbatim
│       │   ├── assets/
│       │   │   └── geo/               ← GeoJSON files (from Blazor JarvisUI.Docs)
│       │   └── index.ts               ← public barrel export
│       ├── vite.config.ts             ← Vite library build (ESM + CJS)
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       └── package.json               ← name: "jarvis-ui", peerDeps: react, react-dom
│
└── apps/
    └── docs/                          ← Demo/docs app (not published to npm)
        ├── src/
        │   ├── pages/                 ← One page per component group
        │   │   ├── LayoutPage.tsx
        │   │   ├── ButtonsPage.tsx
        │   │   ├── CardsPage.tsx
        │   │   ├── FormsPage.tsx
        │   │   ├── DataPage.tsx
        │   │   ├── FeedbackPage.tsx
        │   │   ├── ChartsPage.tsx
        │   │   ├── MapsPage.tsx
        │   │   └── SpecialPage.tsx
        │   ├── App.tsx
        │   └── main.tsx
        ├── vite.config.ts
        ├── tailwind.config.ts
        └── package.json               ← imports "jarvis-ui" via pnpm workspace
```

---

## 3. Tech Stack

| Concern | Choice |
|---|---|
| Runtime | React 18 + TypeScript |
| Bundler (library) | Vite library mode — outputs ESM + CJS |
| Bundler (demo) | Vite app mode |
| Styling | Tailwind CSS (layout/spacing) + 4 HUD CSS files (theme, animations, shapes) |
| Package manager | pnpm workspaces |
| Charts | Recharts (wraps each chart in a `J*` component matching Blazor API) |
| Maps | Leaflet (`react-leaflet`) + Google Maps (`@react-google-maps/api`) |
| State (theme) | React Context — no external state library |

---

## 4. Theming System

### How it works

Exact port of the Blazor `JThemeProvider.razor` → `JThemeContext.tsx` pattern.

```
User picks swatch in JThemePicker
  → calls setTheme() / setPreset() from useTheme() hook
  → JThemeProvider regenerates CSS variable string via toCss()
  → Updates <style id="jarvis-theme-vars"> in the DOM
  → All components update instantly (no page reload)
```

### JarvisTheme type (mirrors JarvisTheme.cs)

```ts
export interface JarvisTheme {
  name: string
  preset: JThemePreset
  accent: string       // main color  e.g. "#00e5ff"
  accentMid: string
  accentDim: string
  accentDeep: string
  warn: string
  err: string
  ok: string
  bg: string
  bgCard: string
  bgCardAlt: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  textDim: string
  durScan: string      // "3.5s"
  durPulse: string
  durSpin: string
  durShine: string
  durCorner: string
  notch: string        // "14px"
  notchLg: string
  railW: string        // "3px"
}
```

### 6 Built-in Presets

| Name | Accent |
|---|---|
| Cyan (default) | `#00e5ff` |
| Amber | `#f97316` |
| Green | `#22c55e` |
| Red | `#ef4444` |
| Purple | `#a855f7` |
| White | `#0891b2` on light bg |

### CSS Variables

`toCss()` generates 80+ CSS custom properties on `:root` — accent with opacity ramps (05/08/12/18/25/35/50/70), semantic colors, borders, backgrounds, text, animation durations, shape tokens. All components consume only these variables — no hardcoded colors anywhere.

### Consumer API

```tsx
// Wrap your app once
<JThemeProvider preset="cyan">
  <App />
</JThemeProvider>

// Use the hook anywhere
const { theme, setPreset, setTheme } = useTheme()

// Drop-in theme picker
<JThemePicker />
```

---

## 5. Component Design Contract

All 55+ components follow a consistent prop API mirroring the Blazor parameter pattern:

```ts
// Common props on every component
color?: JColor          // 'cyan' | 'blue' | 'amber' | 'red' | 'green' | 'ghost' | 'white'
size?: JSize            // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
variant?: JVariant      // 'solid' | 'outline' | 'ghost' | 'danger' | 'scan'
state?: JState          // 'idle' | 'active' | 'processing' | 'warning' | 'error' | 'success'
animSpeed?: JAnimSpeed  // 'off' | 'slow' | 'normal' | 'fast'
label?: string
disabled?: boolean
className?: string
style?: React.CSSProperties
children?: React.ReactNode
```

`JarvisTokens.ts` provides resolvers that convert these enums to CSS class strings — same pattern as `JarvisTokens.cs` in Blazor.

---

## 6. CSS Strategy

**Tailwind CSS** — used for layout, flexbox, grid, and spacing utilities inside component JSX.

**`jarvis-theme.css`** — CSS custom properties for all 6 presets. Copied verbatim from Blazor. No changes needed.

**`jarvis-ui.css`** — 30+ keyframe animations, all component styles, state/size/color modifier classes. Copied verbatim from Blazor. No changes needed.

**`jarvis-charts.css`** — Chart axis, grid, legend styles. Copied verbatim.

**`jarvis-maps.css`** — Leaflet + Google Maps HUD styles. Copied verbatim.

Library consumers import styles once:
```ts
import 'jarvis-ui/styles'
```

---

## 7. Charts

Using **Recharts** as the rendering engine. Each chart is wrapped in a `J*` component that:
1. Applies HUD CSS classes from `jarvis-charts.css`
2. Exposes the same prop API as the Blazor version
3. Uses `--j-accent` CSS variable for chart colors

| React Component | Recharts Primitive |
|---|---|
| `JBarChart` | `BarChart` |
| `JLineChart` | `LineChart` |
| `JDonutChart` | `PieChart` |
| `JGaugeChart` | Custom SVG arc |
| `JRadarChart` | `RadarChart` |
| `JSparkline` | `LineChart` (minimal) |

---

## 8. Maps

| React Component | Library |
|---|---|
| `JLeafletMap` | `react-leaflet` |
| `JGoogleMap` | `@react-google-maps/api` |
| `JMapInfoWindow` | Shared popup styled with `jarvis-maps.css` |

GeoJSON files live in `packages/jarvis-ui/src/assets/geo/` and are bundled into the library. Consumers pass `geoDataUrl` or import the JSON directly.

---

## 9. Build & Publish

**Library build** (`packages/jarvis-ui`):
```ts
// vite.config.ts
build: {
  lib: {
    entry: 'src/index.ts',
    formats: ['es', 'cjs'],
    fileName: (format) => `jarvis-ui.${format}.js`
  },
  rollupOptions: {
    external: ['react', 'react-dom'],  // peer deps, not bundled
  }
}
```

**`package.json` exports:**
```json
{
  "name": "jarvis-ui",
  "main": "./dist/jarvis-ui.cjs.js",
  "module": "./dist/jarvis-ui.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": { "import": "./dist/jarvis-ui.es.js", "require": "./dist/jarvis-ui.cjs.js" },
    "./styles": "./dist/styles/jarvis-ui.css"
  }
}
```

**User install:**
```bash
npm install jarvis-ui
```

---

## 10. Component Build Phases

| Phase | Components | Depends On |
|---|---|---|
| 1 — Foundation | JarvisTheme, JarvisTokens, JThemeContext, JThemeProvider, JThemePicker + 4 CSS files | — |
| 2 — Layout Shell | JHudBar, JSidebar, JPageLayout | Phase 1 |
| 3 — Core UI | JButton (9 shapes), JCard (9 styles), JInput, JSpinner, JBadge, JProgress, JAlert, JModal, JToast + JToastProvider | Phase 1 |
| 4 — Forms | JTextArea, JSelect, JSlider, JToggle, JCheckbox, JRadio, JFormField | Phase 1 |
| 5 — Data | JTable, JDataRow, JAccordion, JPagination, JStatCard, JNavItem | Phase 1–2 |
| 6 — Special | JOrb, JCommandPalette, JRadialMenu + JRadialItem, JBootScreen, JWaveform, JNodeGraph, JArcMeter, JHudLabel, JDivider, JStatusPill, JHudFrame, JHudFrameCard | Phase 1–2 |
| 7 — Charts | JBarChart, JLineChart, JDonutChart, JGaugeChart, JRadarChart, JSparkline | Phase 1 |
| 8 — Maps | JLeafletMap, JGoogleMap, JMapInfoWindow | Phase 1 |
| Demo App | All pages wiring up all components | Phases 1–8 |

---

## 11. Development Workflow

```bash
# Install all deps
pnpm install

# Develop library (watch mode)
pnpm --filter jarvis-ui dev

# Develop demo app (uses live library)
pnpm --filter docs dev

# Build library for publishing
pnpm --filter jarvis-ui build

# Build demo app
pnpm --filter docs build
```

---

## 12. Key Constraints

- **Always read from Blazor first** — before building any React component, read the corresponding `.razor` file to ensure 1:1 parity
- **No hardcoded colors** — all colors come from CSS variables only
- **CSS files copied verbatim** — do not rewrite the 4 CSS files; copy them from Blazor directly
- **Monospace font** — all text uses `font-family: 'Courier New', monospace`
- **No border-radius** — all shapes use `clip-path` polygons or `0` radius to preserve HUD aesthetic
- **React peer deps** — React/ReactDOM are never bundled into the library output
