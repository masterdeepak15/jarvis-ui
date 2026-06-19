# CONTEXT/frontend.md — Component Library Frontend Architecture
> Updated: 2026-06-19 | Session #1
> Framework: React 18 + TypeScript | Styling: Tailwind CSS + 4 HUD CSS files | State: React Context (theme only)

---

## Structure

```
packages/jarvis-ui/src/
├── components/
│   ├── layout/        ← JPageLayout, JSidebar, JHudBar
│   ├── buttons/       ← JButton (9 shapes), JNavItem, JToggle
│   ├── cards/         ← JCard (9 styles), JStatCard, JOrb, JBootScreen, JWaveform, JHudFrame, JHudFrameCard
│   ├── forms/         ← JInput, JTextArea, JFormField, JCheckbox, JRadio, JSelect, JSlider, date/time pickers
│   ├── data/          ← JTable, JDataRow, JAccordion, JPagination
│   ├── feedback/      ← JToast, JToastProvider, JAlert, JModal
│   ├── charts/        ← 6 chart components (Recharts-backed)
│   ├── maps/          ← JLeafletMap, JGoogleMap, JMapInfoWindow
│   └── special/       ← JSpinner, JBadge, JProgress, JCommandPalette, JRadialMenu, JNodeGraph, JArcMeter…
├── theme/
│   ├── JarvisTheme.ts     ← theme type + presets + toCss()
│   ├── JarvisTokens.ts    ← enum → CSS class resolvers
│   └── JThemeContext.tsx  ← React context + provider + useTheme hook
└── styles/                ← 4 CSS files (copied verbatim from Blazor)
```

---

## Theming Pattern

All components read theme via CSS variables — never via props or context directly.

```tsx
// Provider wraps the app once (in consumer's main.tsx or App.tsx)
<JThemeProvider preset="cyan">
  <App />
</JThemeProvider>

// Hook for reading/changing theme programmatically
const { theme, setPreset, setTheme } = useTheme()
setPreset('amber')                     // switch to preset
setTheme({ ...theme, accent: '#ff0' }) // custom color

// Theme picker drops in anywhere
<JThemePicker />
```

`JThemeProvider` injects a `<style id="jarvis-theme-vars">` tag with 80+ CSS custom properties. All components consume `var(--j-accent)`, `var(--j-bg)` etc. — no React context reads inside component render.

---

## Standard Component Prop Pattern

Every component follows this consistent interface (mirror of Blazor parameter pattern):

```tsx
interface JComponentProps {
  color?: JColor          // 'cyan' | 'amber' | 'red' | 'green' | 'blue' | 'ghost' | 'white'
  size?: JSize            // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: JVariant      // 'solid' | 'outline' | 'ghost' | 'danger' | 'scan'
  state?: JState          // 'idle' | 'active' | 'processing' | 'warning' | 'error' | 'success'
  animSpeed?: JAnimSpeed  // 'off' | 'slow' | 'normal' | 'fast'
  label?: string
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  // Component-specific props below these common ones
}
```

CSS classes are built via `JarvisTokens`:
```tsx
const cls = [
  JarvisTokens.color(color),     // → 'j-color-cyan'
  JarvisTokens.size(size),       // → 'j-size-md'
  JarvisTokens.state(state),     // → 'j-state-active'
  JarvisTokens.animSpeed(speed), // → 'j-anim-normal'
  className,
].filter(Boolean).join(' ')
```

---

## Named Children Slots (Blazor RenderFragment → React)

Blazor uses `RenderFragment` named slots. React equivalent is named ReactNode props:

| Blazor Parameter | React Prop |
|---|---|
| `ChildContent` | `children` |
| `SidebarNav` | `sidebarNav?: React.ReactNode` |
| `SidebarFooter` | `sidebarFooter?: React.ReactNode` |
| `MainContent` | `mainContent?: React.ReactNode` (or `children`) |
| `TopBarContent` | `topBarContent?: React.ReactNode` |
| `BottomBarContent` | `bottomBarContent?: React.ReactNode` |

---

## CSS Strategy

| Concern | Tool |
|---|---|
| Layout, flexbox, grid, spacing | Tailwind CSS utility classes in JSX |
| HUD colors, borders, glows | CSS variables (`var(--j-*)`) in CSS files |
| HUD animations (scan, pulse, spin, blink) | Keyframes in `jarvis-ui.css` |
| Angular shapes (notches, hexagons, parallelograms) | `clip-path` polygon in `jarvis-ui.css` |
| Chart styling | `jarvis-charts.css` |
| Map styling | `jarvis-maps.css` |

Tailwind and the 4 HUD CSS files coexist without conflict — Tailwind handles layout, HUD CSS handles visual identity.

---

## Charts (Recharts)

Each chart wraps a Recharts primitive inside a HUD-styled container:

```tsx
// Example: JBarChart
<div className={`j-chart ${cls}`}>
  <BarChart data={data} ...>
    <Bar dataKey="value" fill="var(--j-accent)" />
  </BarChart>
</div>
```

`JGaugeChart` is a custom SVG component (no Recharts equivalent):
```tsx
// SVG arc from start angle to end angle, colored with var(--j-accent)
```

---

## Maps

```tsx
// Leaflet
<JLeafletMap
  center={[20.5937, 78.9629]}
  zoom={5}
  geoDataUrl="/geo/india-districts.geojson"  // bundled asset
  markers={markers}
  onMarkerClick={(id) => ...}
/>

// Google Maps
<JGoogleMap
  apiKey="YOUR_KEY"
  center={{ lat: 20.5937, lng: 78.9629 }}
  markers={markers}
  onMarkerClick={(id) => ...}
/>
```

GeoJSON files are bundled in `packages/jarvis-ui/src/assets/geo/` and can be imported directly or referenced via URL.

---

## Component State Classes

State is applied via CSS class — not inline styles:

| State | CSS Class | Visual Effect |
|---|---|---|
| `idle` | `j-state-idle` | 60% opacity, slowest animations |
| `active` | `j-state-active` | Full opacity, normal cyan animations |
| `processing` | `j-state-processing` | Faster scan (1.8s), faster pulse (1.4s) |
| `warning` | `j-state-warning` | Amber color override |
| `error` | `j-state-error` | Red color, fast blink (0.6s), fast pulse (1.2s) |
| `success` | `j-state-success` | Green color override |

---

## Key Gotchas for Frontend Work

- `JToastProvider` must wrap the app — `JToast` calls `useToastContext()` internally
- `JGaugeChart` is a custom SVG — not Recharts
- Maps need API keys from consumers — accept as props, never bundle
- `clip-path` shapes break `overflow: hidden` — be aware when composing
- All animations use CSS variable durations (`--j-dur-scan` etc.) — speed changes via theme
