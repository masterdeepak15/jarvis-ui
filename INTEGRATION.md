# @masterdeepak15/jarvis-ui — Integration Guide

> A HUD-style React component library. Military/tactical dark-mode aesthetic.  
> All components use CSS custom properties (`var(--j-*)`), `clip-path` polygons instead of border-radius, and `'Courier New', monospace` font.

---

## Quick Start

```bash
npm install @masterdeepak15/jarvis-ui
# or
pnpm add @masterdeepak15/jarvis-ui
```

### Wrap your app with `JThemeProvider`

```tsx
import { JThemeProvider } from '@masterdeepak15/jarvis-ui'
import '@masterdeepak15/jarvis-ui/dist/jarvis-ui.css'

function App() {
  return (
    <JThemeProvider preset="cyan">
      <YourApp />
    </JThemeProvider>
  )
}
```

**Available presets:** `'cyan'` | `'amber'` | `'green'` | `'red'` | `'purple'` | `'white'`

---

## Theme System

### Access & switch themes at runtime

```tsx
import { useTheme } from '@masterdeepak15/jarvis-ui'

function MyComponent() {
  const { theme, setPreset } = useTheme()
  return (
    <button onClick={() => setPreset('amber')}>
      Current: {theme.name}
    </button>
  )
}
```

### CSS custom properties injected by JThemeProvider

| Variable | Description |
|---|---|
| `--j-accent` | Primary accent color (theme-specific: cyan, amber, green…) |
| `--j-accent-mid` | Mid-brightness accent |
| `--j-accent-dim` | Dimmed accent (borders, subtle glow) |
| `--j-accent-05` … `--j-accent-70` | Alpha variants of accent (5%–70%) |
| `--j-bg` | Page background |
| `--j-bg-card` | Card/panel background |
| `--j-bg-card-alt` | Slightly lighter card bg |
| `--j-text-primary` | Main text |
| `--j-text-secondary` | Secondary text |
| `--j-text-muted` | Muted/label text |
| `--j-text-dim` | Barely-visible text |
| `--j-border` | Standard border (accent at 18% alpha) |
| `--j-border-mid` | Mid border (accent at 35% alpha) |
| `--j-border-full` | Full-opacity border |
| `--j-warn` | Warning color (orange) |
| `--j-err` | Error color (red) |
| `--j-ok` | Success color (green) |
| `--j-warn-12`, `--j-err-12`, `--j-ok-12` | Alpha variants |

> **Rule:** Always use `var(--j-*)` in your inline styles. Never hardcode hex values — they won't respond to theme switching.

### Static CSS theme (no JS)

If you don't use `JThemeProvider`, you can set the data attribute instead:

```html
<html data-jarvis-theme="cyan">
```

This uses the static CSS selectors in `jarvis-ui.css` (no runtime injection).

---

## Layout Components

### `JPageLayout` — Full application shell

```tsx
import { JPageLayout, JNavItem } from '@masterdeepak15/jarvis-ui'

<JPageLayout
  systemName="JARVIS"
  version="v1.0.0"
  sidebar={<>
    <JNavItem icon="⊞" label="DASHBOARD" active onClick={() => {}} />
    <JNavItem icon="◉" label="NETWORK" onClick={() => {}} />
  </>}
  topBar={<YourTopBarContent />}
  showRec   // show REC blinking indicator
  showLive  // show LIVE indicator
>
  <YourPageContent />
</JPageLayout>
```

**Props:**
| Prop | Type | Default | Description |
|---|---|---|---|
| `systemName` | `string` | — | System name in header |
| `version` | `string` | — | Version string |
| `sidebar` | `ReactNode` | — | Left sidebar content |
| `topBar` | `ReactNode` | — | Extra content in top bar (right side) |
| `showRec` | `boolean` | `false` | Blinking REC indicator |
| `showLive` | `boolean` | `false` | LIVE indicator |
| `children` | `ReactNode` | — | Main page content |

---

### `JHudFrame` — Decorative border frame

```tsx
<JHudFrame title="UNIT STATUS" scanline corner="BR">
  <p>Content inside the HUD frame</p>
</JHudFrame>
```

**Props:**
| Prop | Type | Description |
|---|---|---|
| `title` | `string` | Label shown in frame corner |
| `scanline` | `boolean` | Animated scanline overlay |
| `corner` | `'TL'|'TR'|'BL'|'BR'` | Corner decoration position |

---

### `JHudFrameCard` — Card with HUD frame style

```tsx
<JHudFrameCard frameStyle="Alpha" title="STATUS">
  <JDataRow label="SIGNAL" value="98%" />
</JHudFrameCard>
```

**`frameStyle`:** `'Alpha'` | `'Beta'` | `'Gamma'` | `'Delta'`

---

### `JCard` — Simple card container

```tsx
<JCard header={<span>TITLE</span>} footer={<span>footer</span>}>
  <p>Card content</p>
</JCard>
```

---

### `JNavItem` — Sidebar navigation item

```tsx
<JNavItem
  icon="◉"
  label="NETWORK"
  active={currentPage === 'network'}
  badge={3}          // optional count badge
  onClick={() => setPage('network')}
/>
```

---

### `JDivider` — Horizontal rule with HUD styling

```tsx
<JDivider />
<JDivider label="SECTION" />
```

---

### `JBootScreen` — Animated startup splash

```tsx
<JBootScreen
  systemName="JARVIS"
  onComplete={() => setBooted(true)}
  duration={3000}
/>
```

---

## Display Components

### `JStatusPill` — Inline status badge

```tsx
<JStatusPill state="active">ONLINE</JStatusPill>
<JStatusPill state="warning">DEGRADED</JStatusPill>
<JStatusPill state="error">OFFLINE</JStatusPill>
<JStatusPill state="idle">STANDBY</JStatusPill>
```

**`state`:** `'active'` | `'warning'` | `'error'` | `'idle'` | `'success'`

---

### `JBadge` — Color-coded label chip

```tsx
<JBadge color="cyan">ONLINE</JBadge>
<JBadge color="amber">WARNING</JBadge>
<JBadge color="red">CRITICAL</JBadge>
<JBadge color="green">OK</JBadge>
<JBadge color="ghost">INACTIVE</JBadge>
<JBadge color="white">NEUTRAL</JBadge>
<JBadge color="blue">INFO</JBadge>
```

**`color`:** `'cyan'` | `'blue'` | `'amber'` | `'red'` | `'green'` | `'ghost'` | `'white'`

> Note: `blue` maps to `var(--j-cyan-deep)` — intentionally dimmer. `ghost` maps to `var(--j-text-muted)`.

---

### `JDataRow` — Key/value pair row

```tsx
<JDataRow label="SIGNAL"  value="98%"      />
<JDataRow label="STATUS"  value="ACTIVE"   state="active" />
<JDataRow label="FUEL"    value="21%"      state="error" />
<JDataRow label="MISSION" value="ALPHA-7"  />
```

**Props:**
| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Left label |
| `value` | `string \| ReactNode` | Right value |
| `state` | `'active'|'warning'|'error'|'success'` | Colors the value |

---

### `JOrb` — Animated pulsing status orb

```tsx
<JOrb color="cyan" size="lg" pulse />
<JOrb color="amber" size="md" />
<JOrb color="red" size="sm" pulse />
```

**Props:** `color` (same as `JBadge`), `size` (`'sm'|'md'|'lg'|'xl'`), `pulse` (boolean)

---

### `JSpinner` — Loading indicator

```tsx
<JSpinner />
<JSpinner label="LOADING DATA..." />
<JSpinner size="sm" />
```

---

## Input Components

### `JButton` — HUD-styled button

```tsx
<JButton color="cyan" size="md" onClick={handleClick}>ENGAGE</JButton>
<JButton color="amber" size="sm">WARNING ACTION</JButton>
<JButton color="red" size="lg">ABORT</JButton>
<JButton color="ghost" disabled>OFFLINE</JButton>
```

**Props:**
| Prop | Type | Default |
|---|---|---|
| `color` | `JColor` | `'cyan'` |
| `size` | `'sm'|'md'|'lg'` | `'md'` |
| `disabled` | `boolean` | `false` |
| `onClick` | `() => void` | — |

---

### `JInput` — HUD text input

```tsx
<JInput
  label="ACCESS CODE"
  value={code}
  onChange={setCode}
  placeholder="ENTER CODE..."
  type="password"
/>
```

---

### `JToggle` — On/Off switch

```tsx
<JToggle
  label="NIGHT VISION"
  checked={nightVision}
  onChange={setNightVision}
/>
```

---

### `JSelect` — Dropdown selector

```tsx
<JSelect
  label="REGION"
  value={region}
  onChange={setRegion}
  options={[
    { value: 'north', label: 'NORTH SECTOR' },
    { value: 'south', label: 'SOUTH SECTOR' },
  ]}
/>
```

---

### `JCommandPalette` — Command input with suggestions

```tsx
const COMMANDS = [
  { key: 'scan',   label: 'Initiate Scan',   group: 'Recon',   icon: '◉' },
  { key: 'lock',   label: 'Lock Target',     group: 'Actions', icon: '⊕' },
]

<JCommandPalette
  commands={COMMANDS}
  onSelect={(cmd) => console.log('Selected:', cmd.key)}
  placeholder="ENTER COMMAND..."
/>
```

**`CommandDef` shape:**
```ts
interface CommandDef {
  key: string
  label: string
  group?: string
  icon?: string
}
```

---

## Data Visualization

### `JProgress` — Horizontal progress bar

```tsx
<JProgress value={72} label="UPLINK" />
<JProgress value={45} state="warning" label="DOWNLINK" />
<JProgress value={88} state="success" label="MESH" />
<JProgress value={12} state="error" label="CRITICAL" />
```

**Props:** `value` (0–100), `label`, `state` (`'active'|'warning'|'error'|'success'`)

---

### `JLineChart` — Sparkline / line chart

```tsx
<JLineChart
  data={[
    { label: '06:00', value: 12 },
    { label: '12:00', value: 45 },
    { label: '18:00', value: 38 },
  ]}
  height="140px"
  color="cyan"
/>
```

---

### `JBarChart` — Bar chart

```tsx
<JBarChart
  data={[
    { label: 'ALPHA', value: 80 },
    { label: 'BRAVO', value: 55, color: 'amber' },
    { label: 'DELTA', value: 92, color: 'green' },
  ]}
  height="180px"
/>
```

---

### `JDonutChart` — Donut / pie chart

```tsx
<JDonutChart
  data={[
    { label: 'ONLINE',  value: 60, color: '#00e5ff' },
    { label: 'OFFLINE', value: 25, color: '#ef4444' },
    { label: 'STANDBY', value: 15, color: '#f97316' },
  ]}
  size={160}
  centerLabel="72%"
/>
```

---

### `JRadarChart` — Radar / spider chart

```tsx
<JRadarChart
  axes={['SPEED', 'ACCURACY', 'RANGE', 'STEALTH', 'DEFENSE']}
  datasets={[
    { label: 'ALPHA', values: [80, 92, 60, 45, 70], color: '#00e5ff' },
    { label: 'BRAVO', values: [65, 70, 85, 90, 55], color: '#f97316' },
  ]}
  size={260}
/>
```

---

### `JArcMeter` — Semicircular gauge

```tsx
<JArcMeter level={76} label="SIGNAL" />
<JArcMeter level={45} color="amber" label="FUEL" />
<JArcMeter level={12} color="red"   label="POWER" />
<JArcMeter level={98} color="green" label="UPLINK" />
```

**Props:** `level` (0–100), `color` (`'cyan'|'amber'|'red'|'green'`), `label`

---

### `JWaveform` — Audio/signal waveform

```tsx
<JWaveform
  bars={32}
  color="cyan"
  animated
  height="60px"
/>
```

---

### `JNodeGraph` — Network relationship graph (SVG)

```tsx
import type { NodeDef, EdgeDef } from '@masterdeepak15/jarvis-ui'

const nodes: NodeDef[] = [
  { id: 'hub',   label: 'HQ',     x: 300, y: 150, type: 'hub' },
  { id: 'nodeA', label: 'ALPHA',  x: 80,  y: 80,  pulse: true },
  { id: 'nodeB', label: 'BRAVO',  x: 80,  y: 240, color: 'amber' },
  { id: 'nodeC', label: 'RELAY',  x: 520, y: 150, type: 'diamond', color: 'green' },
]

const edges: EdgeDef[] = [
  { from: 'nodeA', to: 'hub' },
  { from: 'nodeB', to: 'hub', color: 'amber', style: 'dashed' },
  { from: 'hub',   to: 'nodeC', color: 'green', animDur: 1.2 },
]

<JNodeGraph
  nodes={nodes}
  edges={edges}
  title="NETWORK MAP"
  height="400px"
  showLegend
/>
```

**`NodeDef` shape:**
```ts
interface NodeDef {
  id:     string
  label:  string
  x:      number          // SVG x coordinate
  y:      number          // SVG y coordinate
  type?:  'default' | 'hub' | 'hex' | 'diamond'
  color?: 'cyan' | 'amber' | 'red' | 'green'
  pulse?: boolean         // animated pulse ring
}
```

**`EdgeDef` shape:**
```ts
interface EdgeDef {
  from:     string        // node id
  to:       string        // node id
  color?:   'cyan' | 'amber' | 'red' | 'green'
  style?:   'solid' | 'dashed'
  animDur?: number        // flow animation speed in seconds (default 2.0)
}
```

---

### `JTable` — Data table with HUD styling

```tsx
import type { JTableColumn } from '@masterdeepak15/jarvis-ui'

const columns: JTableColumn[] = [
  { key: 'callsign', label: 'CALLSIGN', width: 140 },
  { key: 'status',   label: 'STATUS',   width: 100 },
  { key: 'signal',   label: 'SIGNAL',   width: 80,  align: 'right' },
]

const rows = [
  { callsign: 'ALPHA-01', status: 'ACTIVE',  signal: '98%' },
  { callsign: 'BRAVO-02', status: 'WARNING', signal: '72%' },
]

<JTable columns={columns} rows={rows} />
```

---

## Notification System

### `useToast` — Toast notifications

```tsx
import { JToastContainer, useToast } from '@masterdeepak15/jarvis-ui'

// 1. Add container once near your app root
function Root() {
  return (
    <>
      <App />
      <JToastContainer />
    </>
  )
}

// 2. Use hook anywhere in the tree
function MyComponent() {
  const { show } = useToast()

  return (
    <button onClick={() => show('active', 'Mission complete')}>
      Trigger
    </button>
  )
}
```

**`show(state, message, duration?)`**
- `state`: `'active'` | `'warning'` | `'error'` | `'success'`
- `message`: string
- `duration`: milliseconds (default 3000)

---

## Color System

### `JColor` type

```ts
type JColor = 'cyan' | 'blue' | 'amber' | 'red' | 'green' | 'ghost' | 'white'
```

Used by: `JButton`, `JBadge`, `JOrb`

> `blue` → maps to `var(--j-cyan-deep)` (intentionally dimmer, not true blue)  
> `ghost` → maps to `var(--j-text-muted)` (subtle secondary)

### `JThemePreset` type

```ts
type JThemePreset = 'cyan' | 'amber' | 'green' | 'red' | 'purple' | 'white'
```

Used by: `JThemeProvider`, `useTheme().setPreset()`

> Note: `purple` is a theme preset but NOT a `JColor` — you cannot pass `color="purple"` to a button.

---

## HUD Map CSS Classes

The library ships `jarvis-ui.css` which includes utility classes for Leaflet map integration:

| Class | Element | Purpose |
|---|---|---|
| `.j-map-container` | wrapper `div` | Dark bordered HUD container |
| `.j-map-controls` | absolute `div` | Floating control button group |
| `.j-map-controls.top-right` | — | Positions at top-right of map |
| `.j-map-legend` | absolute `div` | Legend panel |
| `.j-map-legend.bottom-left` | — | Positions at bottom-left |
| `.j-map-status-bar` | absolute `div` | Bottom status bar strip |
| `.j-map-btn` | `button` | Small HUD icon button |
| `.j-map-btn.active` | — | Highlighted/active state |
| `.j-map-btn-wide` | — | Wider text button |
| `.j-leaflet-marker` | Leaflet divIcon wrapper | Removes default Leaflet marker styles |
| `.j-leaflet-popup` | Leaflet popup | Dark HUD popup style |
| `.j-leaflet-tooltip` | Leaflet tooltip | Dark HUD tooltip |
| `.j-map-legend-title` | `div` | Legend section label |
| `.j-map-legend-item` | `div` | Legend row (icon + label) |
| `.j-map-legend-swatch` | `div` | Color swatch square |

---

## Key Rules (for AI agents)

1. **No hardcoded hex colors in TSX** — always `var(--j-*)` or `STATE_COLORS[state]` pattern
2. **No `border-radius`** — use `clip-path: polygon(...)` for angled HUD corners
3. **Font: `'Courier New', monospace` everywhere** — for all inline text styles
4. **`JColor` ≠ `JThemePreset`** — purple is a preset, not a color; blue is a color, not a preset
5. **`useTheme()` must be inside `JThemeProvider`** — wrap at app root
6. **`useToast()` requires `<JToastContainer />`** somewhere in the tree
7. **CSS files are read-only** — extend with inline styles or new classes only
8. **Rebuild dist after changing `packages/jarvis-ui/src/`**: `pnpm --filter jarvis-ui build`

---

## Full Component Export List

```ts
// Layout
export { JThemeProvider, useTheme }
export { JPageLayout }
export { JHudFrame }
export { JHudFrameCard }
export { JCard }
export { JNavItem }
export { JDivider }
export { JBootScreen }
export { JSpinner }

// Inputs
export { JButton }
export { JInput }
export { JToggle }
export { JSelect }
export { JCommandPalette }

// Display
export { JStatusPill }
export { JBadge }
export { JDataRow }
export { JOrb }

// Charts / Data Viz
export { JProgress }
export { JLineChart }
export { JBarChart }
export { JDonutChart }
export { JRadarChart }
export { JArcMeter }
export { JWaveform }
export { JNodeGraph }
export { JTable }

// Notifications
export { JToastContainer, useToast }

// Types
export type { JColor, JThemePreset, JarvisTheme }
export type { NodeDef, EdgeDef }
export type { JTableColumn }
export type { CommandDef }
```

---

## Live Demo

**Vercel:** `https://jarvis-ui-docs-fduc6wa7y-jarvis-hud.vercel.app`

The demo app shows:
- Boot screen → Login → Full dashboard
- All components in realistic JARVIS tactical context
- Theme switcher (◐ LIGHT MODE / ◑ DARK MODE)
- Tactical map (Leaflet + Google Maps tabs)
- India administrative drill-down map (State → District → Taluk)
- 4 node graph types (Tactical / Org / Microservices / Data Pipeline)
