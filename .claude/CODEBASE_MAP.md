# CODEBASE_MAP.md
> Updated: 2026-06-19 | Session #1
> Note: Project is in design phase. Source files not yet created. Map reflects planned structure from design spec.

---

## Annotated File Tree

```
HUDtheme/                                   ← git root; clone this to get everything
│
├── .claude/                                ← AI memory — never import in source code
│   ├── INDEX.md                            ← START HERE every session
│   ├── AGENT.md                            ← rules + live state
│   ├── SESSION.md                          ← current session progress
│   ├── TASKS.md                            ← full task queue
│   ├── ARCHITECTURE.md                     ← system design
│   ├── CODEBASE_MAP.md                     ← this file
│   ├── DECISIONS.md                        ← ADR log
│   └── CONTEXT/
│       └── frontend.md                     ← component library frontend architecture
│
├── docs/superpowers/specs/
│   └── 2026-06-19-jarvis-ui-react-design.md  ← approved design spec
│
├── pnpm-workspace.yaml                     ← [TO CREATE] defines workspaces
├── package.json                            ← [TO CREATE] root scripts only
│
├── packages/
│   └── jarvis-ui/                          ← [TO CREATE] npm package "jarvis-ui"
│       ├── src/
│       │   ├── components/
│       │   │   ├── layout/
│       │   │   │   ├── JPageLayout.tsx     ← Full app shell (fixed top/bottom bars + sidebar)
│       │   │   │   ├── JSidebar.tsx        ← Left nav: brand header + nav slot + footer + clock
│       │   │   │   └── JHudBar.tsx         ← Top/bottom HUD bar: dots + waveform + ticks + LIVE/REC
│       │   │   ├── buttons/
│       │   │   │   ├── JButton.tsx         ← 9 angular shapes via clip-path + SVG polygons
│       │   │   │   ├── JNavItem.tsx        ← Navigation menu item: icon + label + badge
│       │   │   │   └── JToggle.tsx         ← Toggle switch with diamond thumb
│       │   │   ├── cards/
│       │   │   │   ├── JCard.tsx           ← 9 frame styles (CornerBracket…DoubleFrame)
│       │   │   │   ├── JHudFrame.tsx       ← Basic HUD frame wrapper
│       │   │   │   ├── JHudFrameCard.tsx   ← Card with HUD frame styling
│       │   │   │   ├── JStatCard.tsx       ← Pre-wired stat/metric card (wraps JCard)
│       │   │   │   ├── JBootScreen.tsx     ← Startup animation screen
│       │   │   │   ├── JOrb.tsx            ← JARVIS identity orb with rotating rings
│       │   │   │   └── JWaveform.tsx       ← Audio waveform visualization
│       │   │   ├── forms/
│       │   │   │   ├── JInput.tsx          ← Text input with corner bracket accents
│       │   │   │   ├── JTextArea.tsx       ← Multi-line text input
│       │   │   │   ├── JFormField.tsx      ← Form field wrapper with label + helper
│       │   │   │   ├── JCheckbox.tsx       ← HUD-styled checkbox
│       │   │   │   ├── JRadio.tsx          ← HUD-styled radio button
│       │   │   │   ├── JSelect.tsx         ← Dropdown select
│       │   │   │   ├── JSlider.tsx         ← Range slider
│       │   │   │   ├── JDatePicker.tsx     ← Single date selection
│       │   │   │   ├── JDateRangePicker.tsx← Date range selection
│       │   │   │   └── JTimePicker.tsx     ← Time selection
│       │   │   ├── data/
│       │   │   │   ├── JTable.tsx          ← Data table with sorting/filtering
│       │   │   │   ├── JDataRow.tsx        ← Individual data row rendering
│       │   │   │   ├── JAccordion.tsx      ← Collapsible accordion
│       │   │   │   └── JPagination.tsx     ← Pagination control
│       │   │   ├── feedback/
│       │   │   │   ├── JToast.tsx          ← Toast notification (needs JToastProvider ancestor)
│       │   │   │   ├── JToastProvider.tsx  ← Toast context provider — wrap app once
│       │   │   │   ├── JAlert.tsx          ← Inline alert box
│       │   │   │   └── JModal.tsx          ← Modal dialog
│       │   │   ├── charts/
│       │   │   │   ├── JBarChart.tsx       ← Recharts BarChart wrapper
│       │   │   │   ├── JLineChart.tsx      ← Recharts LineChart wrapper
│       │   │   │   ├── JDonutChart.tsx     ← Recharts PieChart wrapper
│       │   │   │   ├── JGaugeChart.tsx     ← Custom SVG arc (no Recharts primitive exists)
│       │   │   │   ├── JRadarChart.tsx     ← Recharts RadarChart wrapper
│       │   │   │   └── JSparkline.tsx      ← Minimal Recharts LineChart (inline)
│       │   │   ├── maps/
│       │   │   │   ├── JLeafletMap.tsx     ← react-leaflet integration with HUD markers
│       │   │   │   ├── JGoogleMap.tsx      ← @react-google-maps/api with dark HUD style
│       │   │   │   └── JMapInfoWindow.tsx  ← HUD-styled map popup (shared by both maps)
│       │   │   └── special/
│       │   │       ├── JCommandPalette.tsx ← Command palette overlay (keyboard-driven)
│       │   │       ├── JRadialMenu.tsx     ← Circular radial menu container
│       │   │       ├── JRadialItem.tsx     ← Single item in radial menu
│       │   │       ├── JSpinner.tsx        ← 3 concentric rotating rings + diamond center
│       │   │       ├── JProgress.tsx       ← Linear progress bar
│       │   │       ├── JBadge.tsx          ← Status badge (small label chip)
│       │   │       ├── JStatusPill.tsx     ← Larger status indicator pill
│       │   │       ├── JDivider.tsx        ← HUD-styled visual divider
│       │   │       ├── JNodeGraph.tsx      ← Node/network graph visualization
│       │   │       ├── JArcMeter.tsx       ← Arc-style meter (mic level style)
│       │   │       └── JHudLabel.tsx       ← Small HUD-styled text label
│       │   ├── theme/
│       │   │   ├── JarvisTheme.ts          ← Theme interface + 6 presets + toCss()
│       │   │   ├── JarvisTokens.ts         ← Enum→CSS class resolvers (JColor, JSize, etc.)
│       │   │   └── JThemeContext.tsx       ← React context + JThemeProvider + useTheme hook
│       │   ├── styles/
│       │   │   ├── jarvis-theme.css        ← 6 preset CSS var definitions (copied from Blazor)
│       │   │   ├── jarvis-ui.css           ← 30+ animations + all component classes (copied)
│       │   │   ├── jarvis-charts.css       ← Chart axis/grid/legend styles (copied)
│       │   │   └── jarvis-maps.css         ← Leaflet + Google Maps HUD styles (copied)
│       │   ├── assets/
│       │   │   └── geo/                    ← GeoJSON files (copied from Blazor JarvisUI.Docs)
│       │   └── index.ts                    ← Public barrel export — all components + types
│       ├── vite.config.ts                  ← Library build: ESM+CJS output, React external
│       ├── tailwind.config.ts              ← Tailwind config (content paths for library src)
│       ├── tsconfig.json
│       └── package.json                    ← name:"jarvis-ui", peerDeps: react, react-dom
│
└── apps/
    └── docs/                               ← Demo/docs app — not published to npm
        ├── src/
        │   ├── pages/
        │   │   ├── LayoutPage.tsx          ← JPageLayout, JSidebar, JHudBar demos
        │   │   ├── ButtonsPage.tsx         ← JButton (all 9 shapes), JNavItem, JToggle
        │   │   ├── CardsPage.tsx           ← JCard (all 9 styles), JStatCard, JOrb, JBootScreen
        │   │   ├── FormsPage.tsx           ← All form + date/time picker components
        │   │   ├── DataPage.tsx            ← JTable, JAccordion, JPagination, JStatCard
        │   │   ├── FeedbackPage.tsx        ← JToast, JAlert, JModal, JBadge, JProgress
        │   │   ├── ChartsPage.tsx          ← All 6 chart components with sample data
        │   │   ├── MapsPage.tsx            ← JLeafletMap + JGoogleMap with GeoJSON
        │   │   └── SpecialPage.tsx         ← JCommandPalette, JRadialMenu, JSpinner, JNodeGraph
        │   ├── App.tsx                     ← Routes + JPageLayout shell + JThemePicker in sidebar
        │   └── main.tsx                    ← Entry point, wraps app in JThemeProvider
        ├── vite.config.ts
        ├── tailwind.config.ts
        └── package.json                    ← imports "jarvis-ui" via pnpm workspace symlink
```

---

## Key Functions / Types

| Name | File | What It Does |
|---|---|---|
| `JarvisTheme` | `src/theme/JarvisTheme.ts` | TS interface — 30 color/timing/shape properties mirroring Blazor `JarvisTheme.cs` |
| `PRESETS` | `src/theme/JarvisTheme.ts` | 6 preset theme objects: Cyan, Amber, Green, Red, Purple, White |
| `toCss(theme)` | `src/theme/JarvisTheme.ts` | Converts theme → 80+ CSS custom property string injected into `<style>` |
| `JarvisTokens` | `src/theme/JarvisTokens.ts` | Static resolvers: `color(JColor)` → `"j-color-cyan"`, `size(JSize)` → `"j-size-md"` etc. |
| `JThemeContext` | `src/theme/JThemeContext.tsx` | React context carrying `{ theme, setTheme, setPreset }` |
| `JThemeProvider` | `src/theme/JThemeContext.tsx` | Root wrapper — injects `<style id="jarvis-theme-vars">` into DOM on theme change |
| `useTheme()` | `src/theme/JThemeContext.tsx` | Hook to read/change theme from any component |

---

## Enum Reference (mirrors Blazor JarvisTokens.cs)

| Enum | Values |
|---|---|
| `JColor` | `'cyan' \| 'blue' \| 'amber' \| 'red' \| 'green' \| 'ghost' \| 'white'` |
| `JSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` |
| `JVariant` | `'solid' \| 'outline' \| 'ghost' \| 'danger' \| 'scan'` |
| `JState` | `'idle' \| 'active' \| 'processing' \| 'warning' \| 'error' \| 'success'` |
| `JAnimSpeed` | `'off' \| 'slow' \| 'normal' \| 'fast'` |
| `JCardStyle` | `'CornerBracket' \| 'Notched' \| 'SideRail' \| 'GlowBorder' \| 'PartialBorder' \| 'DangerPulse' \| 'Hexagonal' \| 'Radar' \| 'DoubleFrame'` |
| `JButtonShape` | `'LeftNotch' \| 'RightNotch' \| 'BothNotch' \| 'Parallelogram' \| 'GhostSkew' \| 'BracketFrame' \| 'Hexagonal' \| 'IconSquare' \| 'ScanFull'` |

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component files | PascalCase | `JButton.tsx` |
| CSS class prefix | `j-` | `j-color-cyan`, `j-size-md` |
| CSS variable prefix | `--j-` | `--j-accent`, `--j-bg`, `--j-border` |
| Theme preset names | lowercase string | `'cyan'`, `'amber'` |
| TypeScript enum-like types | string literal union | `JColor`, `JSize` |
| Props | camelCase | `animSpeed`, `cardStyle`, `showSidebar` |
| GeoJSON assets | kebab-case | `india-districts.geojson` |

---

## Gotchas / Watch Out For

- **Always read the Blazor `.razor` file before building any React component** — the Blazor file is the spec
- `JGaugeChart` has no Recharts primitive — must be a custom SVG arc component
- CSS files are imported once by the consumer: `import 'jarvis-ui/styles'` — not per-component
- All color values must use `var(--j-*)` CSS variables — never hardcode hex in TSX files
- `clip-path` polygon shapes (notches, hexagons) don't respond to `border-radius` — keep it `0`
- `JToast` requires `JToastProvider` as an ancestor — call this out in the component JSDoc
- Blazor uses `RenderFragment` child slots → React equivalent is `children: React.ReactNode` or named slot props (e.g. `sidebarNav`, `topBarContent`)
- `JTable` sorting/filtering is client-side only — no server-side pagination in v1
- Maps need API keys from consumers — `JGoogleMap` must accept a `apiKey` prop, never bundle keys
