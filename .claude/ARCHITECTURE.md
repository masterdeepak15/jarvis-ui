# ARCHITECTURE.md
> Updated: 2026-06-19 | Session #1

## System Overview

JarvisUI React is a HUD-themed UI component library (55+ components) ported from Blazor (`Jarvis_theme_Blazer_v1`). It ships as an npm-publishable package (`jarvis-ui`) with a companion demo/docs Vite app in the same monorepo. All components are driven by a CSS custom-property theming system with 6 presets and full runtime user customisation.

## Component Diagram

```
HUDtheme/ (git root — single deliverable)
│
├── packages/jarvis-ui/          ← npm package "jarvis-ui"
│   ├── src/components/          ← 55+ React TSX components
│   ├── src/theme/               ← JarvisTheme, JarvisTokens, JThemeContext
│   ├── src/styles/              ← 4 CSS files (copied from Blazor)
│   ├── src/assets/geo/          ← GeoJSON files for Leaflet maps
│   └── src/index.ts             ← public barrel export
│
└── apps/docs/                   ← demo/docs Vite app
    └── src/pages/               ← one page per component group
```

## Theming Flow

```
User picks swatch in JThemePicker
  → setPreset() / setTheme() via useTheme() hook
  → JThemeProvider regenerates toCss() string
  → <style id="jarvis-theme-vars"> updated in DOM
  → all components update instantly (CSS variable cascade)
```

## Layers

| Layer | Responsibility | Location |
|---|---|---|
| Theme system | CSS variable generation + React context | `packages/jarvis-ui/src/theme/` |
| Component library | 55+ TSX components, one per Blazor counterpart | `packages/jarvis-ui/src/components/` |
| Styles | 4 CSS files — animations, shapes, layout, charts, maps | `packages/jarvis-ui/src/styles/` |
| Geo assets | GeoJSON bundled with library for Leaflet maps | `packages/jarvis-ui/src/assets/geo/` |
| Demo app | Live interactive showcase of every component | `apps/docs/` |

## External Services / Dependencies

| Service | Why Used | Peer/Bundled |
|---|---|---|
| React 18 | UI runtime | Peer dep — not bundled |
| Tailwind CSS | Layout & spacing utilities | Peer dep |
| Recharts | Chart rendering engine (Bar, Line, Donut, Radar, Sparkline) | Bundled |
| react-leaflet | Leaflet map integration | Bundled |
| @react-google-maps/api | Google Maps integration | Bundled |

## Build Output

```
packages/jarvis-ui/dist/
├── jarvis-ui.es.js      ← ESM build (tree-shakeable)
├── jarvis-ui.cjs.js     ← CommonJS build
├── index.d.ts           ← TypeScript declarations
└── styles/
    └── jarvis-ui.css    ← all 4 CSS files merged
```

## Known Constraints

- No border-radius on HUD components — shapes use `clip-path` polygons
- All colors via CSS variables only — no hardcoded hex values in components
- Monospace font stack everywhere: `'Courier New', 'Lucida Console', monospace`
- React and ReactDOM are external peer dependencies — never bundled
- Always read the corresponding `.razor` file before building a React component
