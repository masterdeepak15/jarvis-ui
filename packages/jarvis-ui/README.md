# @masterdeepak15/jarvis-ui

> HUD-style React component library — sci-fi / military aesthetic with dark themes, animated SVG, radial menus, draggable node graphs, and 50+ components.

[![npm](https://img.shields.io/npm/v/@masterdeepak15/jarvis-ui)](https://www.npmjs.com/package/@masterdeepak15/jarvis-ui)
[![license](https://img.shields.io/npm/l/@masterdeepak15/jarvis-ui)](./LICENSE)
[![demo](https://img.shields.io/badge/live%20demo-jarvis--ui--docs.vercel.app-00e5ff?style=flat&logo=vercel&logoColor=white)](https://jarvis-ui-docs.vercel.app/)

> **Live demo:** [https://jarvis-ui-docs.vercel.app/](https://jarvis-ui-docs.vercel.app/)

---

## Installation

```bash
npm install @masterdeepak15/jarvis-ui
# or
pnpm add @masterdeepak15/jarvis-ui
# or
yarn add @masterdeepak15/jarvis-ui
```

**Peer dependencies** (must already be in your project):
```bash
npm install react react-dom
```

---

## Setup

Import the stylesheet once at your app root:

```tsx
// main.tsx or App.tsx
import '@masterdeepak15/jarvis-ui/styles'
```

Wrap your app with `JThemeProvider`:

```tsx
import { JThemeProvider } from '@masterdeepak15/jarvis-ui'

function App() {
  return (
    <JThemeProvider>
      {/* your app */}
    </JThemeProvider>
  )
}
```

---

## Components

### Theme

| Component | Description |
|-----------|-------------|
| `JThemeProvider` | Root context — wraps the app, provides `useTheme()` |
| `JThemePicker` | Floating color-scheme switcher (6 presets) |

### Layout

| Component | Description |
|-----------|-------------|
| `JHudBar` | Top / bottom HUD bar with waveform, ticks, REC indicator |
| `JHudFrame` | Corner-bracket framing container |
| `JHudFrameCard` | Card with HUD border styling |
| `JPageLayout` | Full-page layout with sidebar + HUD bars |
| `JSidebar` | Left navigation sidebar |
| `JNavItem` | Sidebar nav link / button |
| `JSpinner` | Arc spinner with optional label |

### UI Controls

| Component | Description |
|-----------|-------------|
| `JButton` | Parallelogram / notch buttons in 7 colors |
| `JInput` | HUD-styled text input |
| `JTextArea` | Multi-line text input |
| `JSelect` | Custom dropdown select |
| `JCheckbox` | Animated checkbox |
| `JRadio` | Radio button |
| `JToggle` | On/off toggle switch |
| `JSlider` | Range slider |
| `JDatePicker` | Calendar date picker |
| `JDateRangePicker` | Date range picker |
| `JTimePicker` | Time picker |
| `JFormField` | Form field wrapper with label / error / hint |

### Display

| Component | Description |
|-----------|-------------|
| `JBadge` | Inline badge chip (7 colors, blink mode) |
| `JStatusPill` | Status dot + label pill |
| `JProgress` | Linear / segmented progress bar |
| `JHudLabel` | Labelled data pair |
| `JDivider` | Horizontal / vertical divider |
| `JAlert` | Dismissable alert banner |
| `JDataRow` | Key-value data row |
| `JCard` | General-purpose card container |
| `JStatCard` | Metric stat card with data rows |
| `JModal` | Overlay modal dialog |
| `JTabs` + `JTab` | Tab navigation |
| `JAccordion` | Expand/collapse accordion |
| `JPagination` | Page navigation |

### HUD Visualizations

| Component | Description |
|-----------|-------------|
| `JArcMeter` | Animated arc meter gauge |
| `JWaveform` | Animated audio waveform bars |
| `JOrb` | Pulsing orb with glow rings |

### Interactive

| Component | Description |
|-----------|-------------|
| `JCommandPalette` | Spotlight-style command palette with fuzzy filter |
| `JTable` | Data table with state badges, hover, footer |
| `JBootScreen` | 5-phase animated boot sequence overlay |
| `JRadialMenu` + `JRadialItem` | Spring fly-out radial navigation ring |
| `JNodeGraph` | Draggable node graph with SVG bezier edges |

### Charts (via Recharts)

| Component | Description |
|-----------|-------------|
| `JSparkline` | Mini trend line |
| `JBarChart` | Vertical bar chart |
| `JLineChart` | Line / area chart |
| `JDonutChart` | Donut / pie chart |
| `JGaugeChart` | Radial gauge |
| `JRadarChart` | Radar / spider chart |

### Toast

| Component | Description |
|-----------|-------------|
| `JToastProvider` + `useToast` | Toast notification system |

---

## Quick Examples

### Button

```tsx
import { JButton } from '@masterdeepak15/jarvis-ui'

<JButton color="cyan" shape="LeftNotch" onClick={() => console.log('clicked')}>
  ENGAGE
</JButton>
```

### Radial Menu

```tsx
import { JRadialMenu, JRadialItem } from '@masterdeepak15/jarvis-ui'

const [open, setOpen] = useState(false)

<JRadialMenu open={open} onOpenChange={setOpen} triggerLabel="MENU">
  <JRadialItem icon="⊞" label="Dashboard" angle={0}   onClick={() => navigate('/dash')} />
  <JRadialItem icon="⚡" label="Skills"    angle={72}  onClick={() => navigate('/skills')} />
  <JRadialItem icon="⚙" label="Settings"  angle={144} onClick={() => navigate('/settings')} />
  <JRadialItem icon="📡" label="Network"   angle={216} onClick={() => navigate('/net')} />
  <JRadialItem icon="🔊" label="Audio"     angle={288} onClick={() => navigate('/audio')} />
</JRadialMenu>
```

### Node Graph

```tsx
import { JNodeGraph } from '@masterdeepak15/jarvis-ui'
import type { NodeDef, EdgeDef } from '@masterdeepak15/jarvis-ui'

const nodes: NodeDef[] = [
  { id: 'hub',  label: 'CORE',   x: 300, y: 180, type: 'hub' },
  { id: 'n1',   label: 'SENSOR', x: 60,  y: 60,  pulse: true },
  { id: 'n2',   label: 'CAMERA', x: 60,  y: 180, color: 'amber' },
  { id: 'out',  label: 'OUTPUT', x: 520, y: 180, type: 'hex', color: 'green' },
]
const edges: EdgeDef[] = [
  { from: 'n1', to: 'hub' },
  { from: 'n2', to: 'hub', color: 'amber' },
  { from: 'hub', to: 'out', color: 'green', animDur: 1.2 },
]

<JNodeGraph nodes={nodes} edges={edges} title="SYSTEM MAP" height="400px" />
```

### Boot Screen

```tsx
import { JBootScreen } from '@masterdeepak15/jarvis-ui'

<JBootScreen
  systemName="NEXUS"
  version="v2.0.0"
  onComplete={() => setBooted(true)}
/>
```

### Command Palette

```tsx
import { JCommandPalette } from '@masterdeepak15/jarvis-ui'
import type { JCommand } from '@masterdeepak15/jarvis-ui'

const commands: JCommand[] = [
  { key: 'dash',     label: 'Dashboard',   group: 'Navigate', icon: '⊞' },
  { key: 'settings', label: 'Settings',    group: 'Navigate', icon: '⚙' },
  { key: 'theme',    label: 'Change Theme', group: 'Actions',  icon: '🎨' },
]

<JCommandPalette
  visible={paletteOpen}
  onClose={() => setPaletteOpen(false)}
  commands={commands}
  onExecute={(cmd) => handleCommand(cmd.key)}
/>
```

---

## Theming

JARVIS UI ships 6 built-in color presets:

| Preset | Accent color |
|--------|-------------|
| `cyan` (default) | `#00e5ff` |
| `amber` | `#f97316` |
| `green` | `#22c55e` |
| `red` | `#ef4444` |
| `blue` | `#3b82f6` |
| `violet` | `#8b5cf6` |

```tsx
import { JThemeProvider } from '@masterdeepak15/jarvis-ui'

<JThemeProvider preset="amber">
  {/* everything glows amber */}
</JThemeProvider>
```

Or switch at runtime:

```tsx
import { useTheme } from '@masterdeepak15/jarvis-ui'

const { setPreset } = useTheme()
setPreset('green')
```

---

## CSS Variables

All colors are CSS custom properties. Override any of them in your own stylesheet:

```css
:root {
  --j-accent:    #00e5ff;  /* primary accent color */
  --j-bg:        #050a0f;  /* page background */
  --j-bg-card:   #0a1520;  /* card background */
  --j-text-primary: #e2e8f0;
}
```

---

## TypeScript

Full TypeScript support — all props, types, and enums are exported:

```tsx
import type {
  JColor, JSize, JState, JVariant,
  NodeDef, EdgeDef, NType, EdgeStyle,
  JCommand, JTableColumn, JTableRow,
  JRadialItemDef,
} from '@masterdeepak15/jarvis-ui'
```

---

## License

MIT © [Deepak Chougale](https://github.com/masterdeepak15)
