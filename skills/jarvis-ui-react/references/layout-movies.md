# Movies / HUD Layout — Widget-First Mental Model

> **Read every word before writing a single line of Movies-mode UI.**
> **These rules are non-negotiable. Violating them produces a page, not a HUD.**

---

## The Core Mental Model: The Screen IS the Canvas

In movie-style HUDs (Iron Man, SHIELD OS, JARVIS, Avengers Helicarrier), **there is no page**.
There is only a **dark screen** with **floating, self-contained widgets** placed at precise pixel coordinates — exactly like a Rainmeter desktop skin or a fighter jet cockpit panel.

Each component is not a "section of a page". It is an **instrument**. A clock is a clock instrument. A radar is a radar instrument. An arc meter is a power gauge. They sit on the dark screen independently, separated by intentional dark space.

| Typical Layout | Movies / HUD Layout |
|---|---|
| Components live inside a page flow | Components float on a canvas at absolute `(x, y)` |
| Content stacks top-to-bottom | Widgets scattered across the full viewport |
| Sidebar + main content area | No sidebar. No main area. Just widgets on darkness. |
| Scrollable page | Fixed viewport — everything visible at once |
| Components are content blocks | Components are **instruments on a cockpit panel** |
| Top-level `grid` / `flex` | `position: absolute` — every widget placed manually |

---

## ❌ NEVER Do This in Movies Mode

```tsx
// ❌ WRONG — page flow thinking
<div className="flex flex-col gap-4">
  <JStatCard ... />
  <JBarChart ... />
</div>

// ❌ WRONG — grid of widgets is still a page
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
  <JArcMeter ... />
</div>

// ❌ WRONG — wrapping in JPageLayout
<JPageLayout sidebar={...}>
  <MoviesDashboard />
</JPageLayout>

// ❌ WRONG — full-width components (except KPI ticker)
<JActivityFeed style={{ width: '100%' }} />
```

---

## ✅ ALWAYS Do This in Movies Mode

**Every component = one widget = one floating instrument = one `JHudCanvas` entry.**

```tsx
import { JHudCanvas, JHudClock, JArcReactor, JArcMeter,
         JActivityFeed, JKPITicker, JDataRow } from '@masterdeepak15/jarvis-ui'

export function MyHUDPage() {
  return (
    <>
      <JHudCanvas
        height="100vh"
        showGrid
        snapToGrid
        widgets={[

          // ── TOP-LEFT — identity & time ──────────────────────
          { id: 'clock',   x: 32,  y: 28,  width: 160, color: 'cyan',
            title: 'SYSTEM CLOCK',
            content: <JHudClock analog size={120} showDate /> },

          // ── LEFT COLUMN — system meters ─────────────────────
          { id: 'power',   x: 32,  y: 220, width: 160, color: 'cyan',
            title: 'ARC REACTOR',
            content: <JArcReactor level={87} size={110} label="POWER" /> },

          { id: 'meters',  x: 32,  y: 400, width: 200, color: 'cyan',
            title: 'SYSTEMS',
            content: (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <JArcMeter level={91} label="SHIELDS" color="cyan" />
                <JArcMeter level={67} label="ENGINES" color="green" />
                <JArcMeter level={44} label="FUEL"    color="amber" />
                <JArcMeter level={23} label="HULL"    color="red" />
              </div>
            )},

          // ── CENTER — primary instrument (always largest) ────
          { id: 'radar',   x: 260, y: 28,  width: 340, color: 'cyan',
            title: 'TACTICAL RADAR',
            content: <RadarWidget /> },

          // ── TOP-RIGHT — alerts & comms ──────────────────────
          { id: 'alerts',  x: 640, y: 28,  width: 280, color: 'amber',
            title: 'SYSTEM ALERTS',
            content: <JAlert state="warning" message="Sector 7 breach detected" /> },

          // ── RIGHT COLUMN — live data feed ───────────────────
          { id: 'log',     x: 640, y: 120, width: 280, color: 'cyan',
            title: 'ACTIVITY LOG',
            content: <JActivityFeed items={logItems} maxRows={8} autoScroll /> },

          { id: 'contacts',x: 640, y: 380, width: 280, color: 'green',
            title: 'CONTACTS',
            content: (
              <>
                <JDataRow label="HOSTILE"  value="3"  state="error" />
                <JDataRow label="NEUTRAL"  value="5" />
                <JDataRow label="FRIENDLY" value="12" state="success" />
              </>
            )},

          // ── BOTTOM STRIP — small secondary instruments ──────
          { id: 'hex1', x: 260, y: 420, width: 90, color: 'cyan',
            title: 'SPEED', content: <HexCell value="M1.8" label="MACH" state="ok" /> },
          { id: 'hex2', x: 370, y: 420, width: 90, color: 'amber',
            title: 'FUEL',  content: <HexCell value="47%"  label="FUEL" state="warn" /> },
        ]}
      />

      {/* KPI ticker — full-width, fixed bottom, outside canvas */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50 }}>
        <JKPITicker items={kpiItems} color="cyan" height={32} />
      </div>
    </>
  )
}
```

---

## Widget Placement Zones

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO + CLOCK]         [PRIMARY WIDGET]      [ALERTS]      │
│  top-left zone          center zone (LARGE)   top-right     │
│  JHudClock              RadarWidget /          JAlert        │
│                         JNodeGraph /           JWaveform     │
│  [ARC REACTOR]          center zone (cont.)   [ACTIVITY]    │
│  [JArcMeter ×4]                               JActivityFeed  │
│  left column                                  right column   │
│                                                              │
│  [HEX] [HEX] [HEX]    [TARGET] [TARGET]     [DATAROWS]    │
│  bottom strip           reticles               JDataRow ×N   │
│──────────────────────────────────────────────────────────────│
│  [ JKPITicker ────────────────────────────────────────────] │
└─────────────────────────────────────────────────────────────┘
```

| Zone | What goes here | Components | Typical x/y |
|---|---|---|---|
| **Top-left** | Identity, logo, clock | `JHudClock` | x:30, y:28 |
| **Left column** | System gauges, meters | `JArcReactor`, `JArcMeter` 4-up | x:30, y:200+ |
| **Center** | ONE primary instrument (largest) | `RadarWidget`, `JNodeGraph`, `JHeatmap` | x:260, y:28 |
| **Top-right** | Alerts, comms | `JAlert`, `JWaveform` | x:640, y:28 |
| **Right column** | Live data stream | `JActivityFeed`, `JDataRow` | x:640, y:120+ |
| **Bottom strip** | Small secondary instruments | `HexCell`, `TargetLock` | x:260+, y:420+ |
| **Bottom bar** | Scrolling telemetry | `JKPITicker` (fixed, outside canvas) | fixed bottom:0 |

**Spacing rules:**
- Widgets must NOT touch each other — dark space between is intentional
- Size = importance: center widget is 2–3× larger than secondary widgets
- No widget fills 100% width except `JKPITicker`

---

## Component → Cockpit Instrument Mapping

| Data / Use Case | Widget | Natural Size | Zone |
|---|---|---|---|
| Time / date | `JHudClock` | 140×160px | Top-left |
| Power / energy / capacity | `JArcReactor` | 120×120px | Left column |
| CPU / RAM / fuel / % metrics | `JArcMeter` (4-up) | 200px wide | Left column |
| Spatial / location / contacts | `RadarWidget` (canvas) | 280×280px | **Center** |
| Node relationships / network | `JNodeGraph` | 320px+ | **Center** |
| Data density matrix | `JHeatmap` | flexible | **Center** or right |
| Live log / events | `JActivityFeed` | 280px wide | Right column |
| KPI scrolling telemetry | `JKPITicker` | full width | Bottom bar |
| Quick stat numbers | `HexCell` SVG | 90×80px | Bottom strip |
| Target reticle | `TargetLock` SVG | 72×72px | Bottom strip |
| Trend sparklines | `JSparkline`, `JLineChart` | 200px wide | Right column |
| Key-value status | `JDataRow` stack | 160px wide | Left / right |
| Signal / comms | `JWaveform` | 200px wide | Top-right |
| Alert / notification | `JAlert` | 240px wide | Top-right |

---

## Banned in Movies Mode

| ❌ Banned | Why | Use Instead |
|---|---|---|
| `JPageLayout` | Creates a traditional page | Raw `JHudCanvas` |
| `JSidebar` | Sidebar = Typical pattern | `JRadialMenu` or bottom dock |
| Top-level `display: grid` | Turns widgets into columns | `position: absolute` via `JHudCanvas` |
| Top-level `display: flex` | Page thinking | `position: absolute` per widget |
| Full-width components (except ticker) | Breaks floating aesthetic | Fixed natural widths |
| Scrollable page containers | HUD = fixed viewport | Everything visible at once |
| `border-radius` | Breaks HUD aesthetic | `clip-path` polygons |
| Hardcoded hex colors | Breaks theme system | `var(--j-accent)` etc. |
