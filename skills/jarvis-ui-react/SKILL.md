---
name: jarvis-ui-react
description: Use this skill whenever working with @masterdeepak15/jarvis-ui — the HUD-style React component library. Trigger on any mention of JButton, JInput, JModal, JNodeGraph, JTable, JPagination, JAlert, JFormField, JThemeProvider, JHudBar, JRadialMenu, JCommandPalette, JBootScreen, JSparkline, JGaugeChart, PageShield, JDragWidget, JHudClock, JArcReactor, JHeatmap, JActivityFeed, JKPITicker, JHudCanvas, or any other J-prefixed component. Also trigger when user says "jarvis ui react", "jarvis theme", "HUD component", "tactical UI", "sci-fi UI", "shield HUD", "movies layout", "rainmeter", "widget canvas", "floating widget", or wants to add/fix/use any component from the React library @masterdeepak15/jarvis-ui.
---

# JARVIS UI — Component Skill

HUD-style React component library with 50+ components. Sci-fi / military aesthetic with dark themes, clip-path polygons, animated SVG, and CSS custom properties.

**Live Demo:** https://jarvis-ui-docs.vercel.app/
**npm:** `@masterdeepak15/jarvis-ui`

---

## 🎬 Layout Style — Ask First!

When a **first-time user** sets up a new page or dashboard, **always ask** which layout style they prefer:

```
"Which layout style do you want?"

  A) TYPICAL  — Standard dashboard layout. Sidebar navigation, data tables,
                 form panels, stat cards in a grid. Clean and information-dense.

  B) MOVIES   — Cinematic HUD style. Inspired by SHIELD OS / Iron Man /
                 Avengers interfaces. Concentric radar rings, rotating tick rings,
                 hex grid overlays, target lock brackets, animated sweep —
                 the full Rainmeter/sci-fi experience.
```

- **Typical** → use `JPageLayout` + standard component layout patterns.
- **Movies / SHIELD** → use `JHudCanvas` as the root, place every component as an independent floating widget at explicit `(x, y)` coordinates. See all rules below.

---

## 🎬 MOVIES UI — WIDGET-FIRST MENTAL MODEL (MANDATORY)

> **Read every word of this section before writing a single line of Movies-mode UI.**
> **These rules are non-negotiable. Violating them produces a page, not a HUD.**

---

### The Core Mental Model: The Screen IS the Canvas

In movie-style HUDs (Iron Man, SHIELD OS, JARVIS, Avengers Helicarrier), **there is no page**.
There is only a **dark screen** with **floating, self-contained widgets** placed at precise pixel coordinates — exactly like a Rainmeter desktop skin or a fighter jet cockpit panel.

Each component is not a "section of a page". It is an **instrument**. A clock is a clock instrument. A radar is a radar instrument. An arc meter is a power gauge instrument. They sit on the dark screen independently, separated by intentional dark space.

**Fundamental shift from Typical → Movies:**

| Typical Layout | Movies / HUD Layout |
|---|---|
| Components live inside a page flow | Components float on a canvas at absolute `(x, y)` |
| Content stacks top-to-bottom | Widgets are scattered across the full viewport |
| Sidebar + main content area | No sidebar. No main area. Just widgets on darkness. |
| Scrollable page | Fixed viewport — everything visible at once, no scroll |
| Components are content blocks | Components are **instruments on a cockpit panel** |
| Width fills the container | Each widget has its own fixed natural width |
| Top-level CSS `grid` / `flex` | `position: absolute` — every widget placed manually |
| Navigation = sidebar | Navigation = `JRadialMenu` radial ring or bottom dock |

---

### ❌ NEVER Do This in Movies Mode

```tsx
// ❌ WRONG — page flow thinking
<div className="flex flex-col gap-4">
  <JStatCard ... />
  <JBarChart ... />
  <JTable ... />
</div>

// ❌ WRONG — grid of widgets is still a page, not a HUD
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
  <JArcMeter ... />
  <JArcMeter ... />
</div>

// ❌ WRONG — wrapping everything in JPageLayout
<JPageLayout sidebar={...}>
  <MoviesDashboard />
</JPageLayout>

// ❌ WRONG — full-width components (except the KPI ticker bar)
<JActivityFeed style={{ width: '100%' }} />
```

---

### ✅ ALWAYS Do This in Movies Mode

**Every component = one widget = one floating instrument = one `JHudCanvas` entry.**

Use `JHudCanvas` as the root. Give every widget an explicit `x`, `y`, and natural `width`.
The canvas handles drag-to-reposition automatically — this is the Rainmeter philosophy.

```tsx
import { JHudCanvas, JHudClock, JArcReactor, JArcMeter,
         JActivityFeed, JKPITicker, JDataRow } from '@masterdeepak15/jarvis-ui'

export function MyHUDPage() {
  return (
    <>
      {/* Full-screen dark canvas — widgets float on this */}
      <JHudCanvas
        height="100vh"
        showGrid       // subtle dot grid — pure HUD aesthetic
        snapToGrid     // optional: widgets snap to 20px grid
        widgets={[

          // ── TOP-LEFT ZONE — identity & time ──────────────────
          {
            id: 'clock',
            x: 32, y: 28,
            width: 160,
            color: 'cyan',
            title: 'SYSTEM CLOCK',
            content: <JHudClock analog size={120} showDate />,
          },

          // ── LEFT COLUMN — system meters ───────────────────────
          {
            id: 'power',
            x: 32, y: 220,
            width: 160,
            color: 'cyan',
            title: 'ARC REACTOR',
            content: <JArcReactor level={87} size={110} label="POWER" />,
          },
          {
            id: 'meters',
            x: 32, y: 400,
            width: 200,
            color: 'cyan',
            title: 'SYSTEMS',
            content: (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <JArcMeter level={91} label="SHIELDS" color="cyan" />
                <JArcMeter level={67} label="ENGINES" color="green" />
                <JArcMeter level={44} label="FUEL"    color="amber" />
                <JArcMeter level={23} label="HULL"    color="red" />
              </div>
            ),
          },

          // ── CENTER ZONE — primary instrument (always largest) ─
          {
            id: 'radar',
            x: 260, y: 28,
            width: 340,
            color: 'cyan',
            title: 'TACTICAL RADAR',
            content: <RadarWidget />,   // 280×280 canvas radar
          },

          // ── TOP-RIGHT ZONE — alerts & comms ──────────────────
          {
            id: 'alerts',
            x: 640, y: 28,
            width: 280,
            color: 'amber',
            title: 'SYSTEM ALERTS',
            content: <JAlert state="warning" message="Sector 7 breach detected" />,
          },

          // ── RIGHT COLUMN — live data feed ─────────────────────
          {
            id: 'log',
            x: 640, y: 120,
            width: 280,
            color: 'cyan',
            title: 'ACTIVITY LOG',
            content: <JActivityFeed items={logItems} maxRows={8} autoScroll />,
          },
          {
            id: 'contacts',
            x: 640, y: 380,
            width: 280,
            color: 'green',
            title: 'CONTACTS',
            content: (
              <>
                <JDataRow label="HOSTILE"  value="3" state="error" />
                <JDataRow label="NEUTRAL"  value="5" />
                <JDataRow label="FRIENDLY" value="12" state="success" />
              </>
            ),
          },

          // ── BOTTOM STRIP — small secondary instruments ────────
          {
            id: 'hex1',
            x: 260, y: 420,
            width: 90,
            color: 'cyan',
            title: 'SPEED',
            content: <HexCell value="M1.8" label="MACH" state="ok" />,
          },
          {
            id: 'hex2',
            x: 370, y: 420,
            width: 90,
            color: 'amber',
            title: 'FUEL',
            content: <HexCell value="47%" label="FUEL" state="warn" />,
          },
        ]}
      />

      {/* KPI ticker is always full-width at the very bottom — outside the canvas */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50 }}>
        <JKPITicker items={kpiItems} color="cyan" height={32} />
      </div>
    </>
  )
}
```

---

### Widget Placement Zones (Iron Man / SHIELD HUD Design Rules)

The actual Iron Man HUD designers (Jayse Hansen, Kent Seki at The Orphanage) used **zones**, not grid columns. Apply these zones to every Movies-mode layout:

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO + CLOCK]         [PRIMARY WIDGET]      [ALERTS]      │
│  top-left zone          center zone (LARGE)   top-right     │
│  JHudClock              RadarWidget /          JAlert        │
│  identity               JNodeGraph /           JWaveform     │
│                         JHeatmap                             │
│  [ARC REACTOR]          [PRIMARY WIDGET]      [ACTIVITY]    │
│  [JArcMeter ×4]         center zone (cont.)   FEED]         │
│  left column                                  JActivityFeed  │
│  power gauges                                 right column   │
│                                                              │
│  [HEX] [HEX] [HEX]    [TARGET] [TARGET]     [DATAROWS]    │
│  bottom strip           reticles               stat rows     │
│  small instruments      TargetLock ×N          JDataRow ×N   │
│──────────────────────────────────────────────────────────────│
│  [ JKPITicker ────────────────────────────────────────────] │
│  bottom bar — full width, always scrolling telemetry         │
└─────────────────────────────────────────────────────────────┘
```

**Zone rules — apply every time:**

| Zone | What goes here | Components | Typical x/y |
|---|---|---|---|
| **Top-left** | Identity, logo, clock, date | `JHudClock`, SHIELD SVG logo | x:30, y:28 |
| **Left column** | System gauges, meters, fuel | `JArcReactor`, `JArcMeter` 4-up, `JHudLabel` stack | x:30, y:200+ |
| **Center** | The ONE primary instrument — always the largest widget on screen | `RadarWidget`, `JNodeGraph`, `JHeatmap`, `JGaugeChart` | x:260, y:28 |
| **Top-right** | Alerts, comms status | `JAlert`, `JWaveform`, `JBadge` cluster | x:640, y:28 |
| **Right column** | Live data stream | `JActivityFeed`, `JSparkline`, `JDataRow` stack | x:640, y:120+ |
| **Bottom strip** | Small secondary instruments | `HexCell`, `TargetLock`, `JArcMeter` singles | x:260+, y:420+ |
| **Bottom bar** | Scrolling telemetry | `JKPITicker` (fixed, full-width, outside canvas) | fixed bottom:0 |

**Spacing rules — mandatory:**
- Widgets must **NOT touch each other**. Dark space between widgets is intentional — the darkness IS part of the UI aesthetic.
- **Size = importance**: the primary center widget is 2–3× the size of secondary widgets.
- No widget ever fills 100% width except `JKPITicker` at the bottom bar.
- All widgets in `JHudCanvas` are drag-repositionable — this is the Rainmeter philosophy, preserve it.

---

### Component → Cockpit Instrument Mapping

When a data requirement arrives, ask: **"What instrument does this resemble on a cockpit panel?"** Then pick the right widget and place it in the right zone.

| Data / Use Case | Widget to use | Natural Size | Zone |
|---|---|---|---|
| Time / date | `JHudClock` | 140×160px | Top-left |
| Power / energy / capacity | `JArcReactor` | 120×120px | Left column |
| CPU / RAM / fuel / % metrics | `JArcMeter` (4-up inside widget) | 200px wide | Left column |
| Spatial / location / contacts | `RadarWidget` (canvas) | 280×280px | **Center** |
| Node relationships / network | `JNodeGraph` | 320px+ | **Center** |
| Data density matrix | `JHeatmap` | flexible | **Center** or right |
| Live log / events / telemetry | `JActivityFeed` | 280px wide | Right column |
| KPI scrolling telemetry | `JKPITicker` | full width | Bottom bar (fixed) |
| Quick stat numbers | `HexCell` SVG | 90×80px | Bottom strip |
| Target acquisition reticle | `TargetLock` SVG | 72×72px | Bottom strip / center |
| Trend sparklines | `JSparkline`, `JLineChart` | 200px wide | Right column |
| Key-value system status | `JDataRow` stack | 160px wide | Left / right |
| Signal / audio / comms | `JWaveform` | 200px wide | Top-right |
| Alert / notification | `JAlert` | 240px wide | Top-right |
| Rotating ring wrapper | `RotatingRingSVG` (local) | wraps any widget | Around center |
| Labelled readouts | `JHudLabel` | inline | Inside left widgets |

---

### Do NOT Use These in Movies Mode

| ❌ Banned in Movies Mode | Why | Use Instead |
|---|---|---|
| `JPageLayout` | Creates a traditional page | Raw `JHudCanvas` |
| `JSidebar` | Sidebar = Typical pattern | `JRadialMenu` or bottom dock strip |
| Top-level `display: grid` | Turns widgets into page columns | `position: absolute` via `JHudCanvas` |
| Top-level `display: flex` as layout | Same — page thinking | `position: absolute` per widget |
| Full-width components (except ticker) | Breaks floating widget aesthetic | Fixed natural widths per widget |
| Scrollable page containers | HUD = fixed viewport | Everything visible at once |
| `border-radius` anywhere | Breaks HUD aesthetic | `clip-path` polygons only |
| Hardcoded hex colors | Breaks theme system | `var(--j-accent)` etc. |

---

## 🛡️ SHIELD HUD Page (`PageShield`)

A full cinematic HUD page in `apps/docs/src/PageShield.tsx`. Already wired as nav item `shield` in `App.tsx`.

**Local widgets inside PageShield (copy these when building new pages):**

| Widget | Description |
|--------|-------------|
| `RadarWidget` | Canvas-based radar with hex grid overlay, sweep gradient, animated blips, concentric rings |
| `RotatingRingSVG` | SVG ring with animated tick marks (configurable RPM, forward/reverse) — wraps any content |
| `TargetLock` | Animated corner-bracket target acquisition reticle with scan-line |
| `HexCell` | Hexagonal SVG polygon stat cell with double-polygon depth, state-aware color |

These are **local** to the docs app (not exported from the npm library). Copy from `PageShield.tsx` when building new pages.

**Key techniques used:**
- `useRef` + `requestAnimationFrame` for smooth canvas radar sweep
- `@keyframes spinF/spinR` CSS animations for ring rotation
- SVG `<animateTransform>` for scan-line effect in target lock
- `clipPath` hexagon shapes with double-polygon for depth
- Canvas hex grid via 2D trigonometry

---

## 📦 New HUD Widgets (v1.0.1) — Library Components

These are exported from `@masterdeepak15/jarvis-ui` and available via `import`:

| Component | Props | Description |
|---|---|---|
| `JDragWidget` | `title, defaultX, defaultY, width, color, collapsible` | Standalone draggable widget panel — use when NOT using `JHudCanvas` |
| `JHudClock` | `analog, color, size, showDate` | Analog + digital clock with rotating tick ring and hands |
| `JArcReactor` | `level, size, color, label, animated` | Iron Man arc reactor SVG — power/capacity display with petal triangles |
| `JHeatmap` | `data[][], color, cellSize, gap, showValue, title` | 2D grid data density heatmap with lerp color palette |
| `JActivityFeed` | `items[], maxRows, autoScroll, showTime, showSource` | Scrolling live event log with level icons, auto-scroll, hover-pause |
| `JKPITicker` | `items[], speed, color, height, pauseOnHover` | Horizontal scrolling KPI ticker tape with trend arrows |
| `JHudCanvas` | `widgets[], height, showGrid, gridSize, snapToGrid, onWidgetMove` | **The root canvas for Movies mode** — drag-drop widget placement |

---

## Installation

```bash
npm install @masterdeepak15/jarvis-ui
# or
pnpm add @masterdeepak15/jarvis-ui
```

---

## Setup (Required — do this first)

### 1. Import stylesheet (once, at app root)

```tsx
// main.tsx or index.tsx
import '@masterdeepak15/jarvis-ui/styles'
```

### 2. Wrap with JThemeProvider

```tsx
import { JThemeProvider } from '@masterdeepak15/jarvis-ui'

function App() {
  return (
    <JThemeProvider preset="cyan">
      {/* your app */}
    </JThemeProvider>
  )
}
```

**Presets:** `'cyan'` | `'amber'` | `'green'` | `'red'` | `'purple'` | `'white'`

---

## CRITICAL Design Rules

These rules apply to EVERY component and every line of custom styling:

1. **Colors via CSS variables only** — never hardcode hex values
   ```tsx
   // ✅ correct
   style={{ color: 'var(--j-accent)', background: 'var(--j-bg-card)' }}
   // ❌ wrong
   style={{ color: '#00e5ff', background: '#0a1520' }}
   ```

2. **No border-radius** — use `clip-path` polygons for HUD corners
   ```tsx
   // ✅ correct
   style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
   // ❌ wrong
   style={{ borderRadius: '4px' }}
   ```

3. **Font: Courier New monospace everywhere**
   ```tsx
   style={{ fontFamily: "'Courier New', monospace" }}
   ```

4. **JColor type** (for `color` prop on most components):
   `'cyan'` | `'blue'` | `'amber'` | `'red'` | `'green'` | `'ghost'` | `'white'`

5. **JState type** (for `state` prop on display components):
   `'active'` | `'warning'` | `'error'` | `'success'`

---

## Component Index

Read the reference file for the component you need. Each file has props, use cases, and working code examples.

### Theme & Layout
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JThemeProvider` | [references/JThemeProvider.md](references/JThemeProvider.md) | Root context — wrap the entire app |
| `JPageLayout` | [references/JPageLayout.md](references/JPageLayout.md) | Full-page layout with sidebar + HUD bars (**Typical mode only**) |
| `JHudBar` | [references/JHudBar.md](references/JHudBar.md) | Top/bottom HUD bar with waveform and ticks |
| `JSidebar` | [references/JSidebar.md](references/JSidebar.md) | Left navigation sidebar (**Typical mode only**) |
| `JNavItem` | [references/JNavItem.md](references/JNavItem.md) | Sidebar navigation item |
| `JHudFrame` | [references/JHudFrame.md](references/JHudFrame.md) | Corner-bracket HUD frame container |
| `JHudFrameCard` | [references/JHudFrame.md](references/JHudFrame.md) | Card with HUD border styling |
| `JCard` | [references/JCard.md](references/JCard.md) | General-purpose card container |
| `JSpinner` | [references/JSpinner.md](references/JSpinner.md) | Arc loading spinner |

### HUD Canvas & Drag Widgets (Movies Mode)
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JHudCanvas` | [references/JHudCanvas.md](references/JHudCanvas.md) | **Root canvas for Movies mode** — floating widget placement with drag support |
| `JDragWidget` | [references/JDragWidget.md](references/JDragWidget.md) | Standalone draggable panel — single widget without full canvas |
| `JHudClock` | [references/JHudClock.md](references/JHudClock.md) | Analog + digital clock with rotating SVG tick ring |
| `JArcReactor` | [references/JArcReactor.md](references/JArcReactor.md) | Iron Man arc reactor power display with petal triangles |
| `JHeatmap` | [references/JHeatmap.md](references/JHeatmap.md) | 2D color-interpolated data density grid |
| `JActivityFeed` | [references/JActivityFeed.md](references/JActivityFeed.md) | Scrolling live event log with level icons and auto-scroll |
| `JKPITicker` | [references/JKPITicker.md](references/JKPITicker.md) | Horizontal scrolling KPI ticker bar — pin to bottom in Movies mode |

### Form Controls
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JButton` | [references/JButton.md](references/JButton.md) | Parallelogram / notch buttons in 7 colors |
| `JInput` | [references/JInput.md](references/JInput.md) | HUD-styled text input |
| `JTextArea` | [references/JTextArea.md](references/JTextArea.md) | Multi-line text input |
| `JSelect` | [references/JSelect.md](references/JSelect.md) | Custom dropdown select |
| `JToggle` | [references/JToggle.md](references/JToggle.md) | On/off toggle switch |
| `JSlider` | [references/JSlider.md](references/JSlider.md) | Range slider |
| `JCheckbox` | [references/JCheckbox.md](references/JCheckbox.md) | Animated checkbox |
| `JRadio` | [references/JRadio.md](references/JRadio.md) | Radio button |
| `JFormField` | [references/JFormField.md](references/JFormField.md) | Form field wrapper with label/hint/error |
| `JDatePicker` | [references/JDatePicker.md](references/JDatePicker.md) | Calendar date picker |
| `JDateRangePicker` | [references/JDateRangePicker.md](references/JDateRangePicker.md) | Dual-month date range picker |
| `JTimePicker` | [references/JTimePicker.md](references/JTimePicker.md) | Time picker (HH:MM) |

### Display & Feedback
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JBadge` | [references/JBadge.md](references/JBadge.md) | Inline badge chip with optional blink |
| `JStatusPill` | [references/JStatusPill.md](references/JStatusPill.md) | Status dot + label pill |
| `JProgress` | [references/JProgress.md](references/JProgress.md) | Linear / segmented progress bar |
| `JAlert` | [references/JAlert.md](references/JAlert.md) | Dismissable alert banner (4 states) |
| `JModal` | [references/JModal.md](references/JModal.md) | Overlay modal dialog |
| `JDivider` | [references/JDivider.md](references/JDivider.md) | Horizontal / vertical divider |
| `JDataRow` | [references/JDataRow.md](references/JDataRow.md) | Key-value data row |
| `JHudLabel` | [references/JHudLabel.md](references/JHudLabel.md) | Labelled data pair (chip/arc/metric variants) |
| `JStatCard` | [references/JStatCard.md](references/JStatCard.md) | Metric stat card with data rows |

### Navigation & Structure
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JTabs` + `JTab` | [references/JTabs.md](references/JTabs.md) | Tab navigation |
| `JAccordion` | [references/JAccordion.md](references/JAccordion.md) | Expand/collapse accordion |
| `JPagination` | [references/JPagination.md](references/JPagination.md) | Page navigation with info and first/last |

### Data & Tables
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JTable` | [references/JTable.md](references/JTable.md) | Data table — place inside a `JHudCanvas` widget in Movies mode |

### Charts (via Recharts)
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JSparkline` | [references/JSparkline.md](references/JSparkline.md) | Mini trend line |
| `JBarChart` | [references/JBarChart.md](references/JBarChart.md) | Vertical bar chart |
| `JLineChart` | [references/JLineChart.md](references/JLineChart.md) | Line / area chart |
| `JDonutChart` | [references/JDonutChart.md](references/JDonutChart.md) | Donut / pie chart |
| `JGaugeChart` | [references/JGaugeChart.md](references/JGaugeChart.md) | Radial gauge with needle |
| `JRadarChart` | [references/JRadarChart.md](references/JRadarChart.md) | Radar / spider chart |

### HUD Visualizations
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JArcMeter` | [references/JArcMeter.md](references/JArcMeter.md) | Animated SVG arc meter |
| `JWaveform` | [references/JWaveform.md](references/JWaveform.md) | Animated audio waveform bars |
| `JOrb` | [references/JOrb.md](references/JOrb.md) | Pulsing orb with glow rings |

### Interactive & Advanced
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JNodeGraph` | [references/JNodeGraph.md](references/JNodeGraph.md) | Draggable node graph with SVG bezier edges |
| `JRadialMenu` + `JRadialItem` | [references/JRadialMenu.md](references/JRadialMenu.md) | Spring fly-out radial navigation ring |
| `JCommandPalette` | [references/JCommandPalette.md](references/JCommandPalette.md) | Spotlight-style command palette |
| `JBootScreen` | [references/JBootScreen.md](references/JBootScreen.md) | 5-phase animated boot sequence overlay |
| `JToastProvider` + `useToast` | [references/JToast.md](references/JToast.md) | Toast notification system |

---

## Common CSS Variables Reference

```css
--j-accent          /* primary accent (theme color) */
--j-accent-50       /* accent at 50% opacity */
--j-accent-18       /* accent at 18% opacity (hover bg) */
--j-bg              /* page background */
--j-bg-card         /* card background */
--j-border          /* border color */
--j-border-dim      /* dim border (inactive) */
--j-text-primary    /* primary text */
--j-text-muted      /* muted/secondary text */
--j-cyan            /* cyan color */
--j-amber           /* amber color */
--j-green           /* green color */
--j-red             /* red color */
--j-blue            /* blue color */
```

---

## TypeScript Types Quick Reference

```tsx
import type {
  JColor,           // 'cyan'|'blue'|'amber'|'red'|'green'|'ghost'|'white'
  JSize,            // 'sm'|'md'|'lg'
  JState,           // 'active'|'warning'|'error'|'success'
  JThemePreset,     // 'cyan'|'amber'|'green'|'red'|'purple'|'white'
  NodeDef,          // { id, label, x, y, type?, color?, pulse? }
  EdgeDef,          // { from, to, color?, style?, animDur? }
  NType,            // 'default'|'hub'|'hex'|'diamond'
  EdgeStyle,        // 'solid'|'dashed'
  JCommand,         // { key, label, group?, icon? }
  JTableColumn,     // { key, label, sortable? }
  JTableRow,        // Record<string, any>
  DateRange,        // { from?: Date, to?: Date }
  JWidgetSlot,      // { id, x, y, width?, title?, color?, content }
  JActivityFeedItem,// { id, time?, level?, message, source? }
  JKPITickerItem,   // { label, value, delta?, trend? }
  JHeatmapCell,     // { value, label?, tooltip? }
} from '@masterdeepak15/jarvis-ui'
```
