# JBarChart · JLineChart · JDonutChart · JRadarChart

Pure-SVG chart components with HUD styling. **Not Recharts** — these are custom SVG renderers.

## Import

```tsx
import { JBarChart, JLineChart, JDonutChart, JRadarChart } from '@masterdeepak15/jarvis-ui'
import type { JChartPoint, JDonutSegment, JRadarAxis } from '@masterdeepak15/jarvis-ui'
```

## Shared data types

```tsx
// Used by JBarChart and JLineChart
interface JChartPoint { label: string; value: number }

// Used by JDonutChart
interface JDonutSegment { label: string; value: number; color?: string }

// Used by JRadarChart
interface JRadarAxis { label: string; value: number; max?: number }
```

> **Note:** There is no `dataKey` / `xKey` / `name` prop pattern. All charts use typed data structs above — not arbitrary object arrays. Charts are all **single-series** (no `lines[]` multi-series).

---

## JBarChart

Vertical or horizontal bar chart.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `JChartPoint[]` | — | Bar data (`{label, value}`) |
| `height` | `string` | `'220px'` | Chart height (CSS string) |
| `colorVar` | `string` | `'--j-accent'` | CSS variable name for bar color |
| `orientation` | `'vertical'`\|`'horizontal'` | `'vertical'` | Bar direction |
| `showGrid` | `boolean` | `true` | Show grid lines |
| `showAxisLabels` | `boolean` | `true` | Show axis value labels |
| `showValues` | `boolean` | `false` | Show value above each bar |
| `gridLines` | `number` | `4` | Number of grid lines |

### Examples

```tsx
const zoneData: JChartPoint[] = [
  { label: 'ALPHA',   value: 12 },
  { label: 'BRAVO',   value: 8  },
  { label: 'CHARLIE', value: 15 },
  { label: 'DELTA',   value: 6  },
]

<JBarChart data={zoneData} />
<JBarChart data={zoneData} colorVar="--j-warn" height="160px" />
<JBarChart data={zoneData} orientation="horizontal" showValues />
```

---

## JLineChart

Single-series line / area chart.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `JChartPoint[]` | — | Line data (`{label, value}`) |
| `height` | `string` | `'200px'` | Chart height (CSS string) |
| `colorVar` | `string` | `'--j-accent'` | CSS variable name for line color |
| `showArea` | `boolean` | `false` | Fill area under the line |
| `showDots` | `boolean` | `true` | Show data point dots |
| `showAxisLabels` | `boolean` | `true` | Show axis labels |
| `showGrid` | `boolean` | `true` | Show grid lines |
| `gridLines` | `number` | `4` | Number of grid lines |

> **Note:** Single-series only. There is no `lines[]`, `xKey`, or multi-series support.

### Examples

```tsx
const signalData: JChartPoint[] = [
  { label: '00:00', value: 72 },
  { label: '04:00', value: 68 },
  { label: '08:00', value: 85 },
  { label: '12:00', value: 91 },
  { label: '16:00', value: 78 },
  { label: '20:00', value: 65 },
]

<JLineChart data={signalData} />
<JLineChart data={signalData} showArea colorVar="--j-ok" />
<JLineChart data={signalData} showDots={false} height="150px" />
```

---

## JDonutChart

Donut / pie chart with optional legend.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `JDonutSegment[]` | — | Slice data (`{label, value, color?}`) |
| `size` | `string` | `'160px'` | Chart diameter (CSS string) |
| `thickness` | `number` | `20` | Ring thickness in SVG units |
| `centerValue` | `string` | — | Large text in the center |
| `centerLabel` | `string` | — | Small label below `centerValue` |
| `showLegend` | `boolean` | `true` | Show label + % legend below chart |

> **Note:** Props are `size` (not `height`), `centerValue`+`centerLabel` (not a single `label`), `data[].label` (not `.name`).

### Examples

```tsx
const statusData: JDonutSegment[] = [
  { label: 'ONLINE',  value: 42, color: 'var(--j-ok)'        },
  { label: 'WARNING', value: 7,  color: 'var(--j-warn)'      },
  { label: 'ERROR',   value: 3,  color: 'var(--j-err)'       },
  { label: 'OFFLINE', value: 8,  color: 'var(--j-text-muted)' },
]

<JDonutChart data={statusData} centerValue="60" centerLabel="UNITS" />
<JDonutChart data={statusData} size="200px" showLegend={false} />
<JDonutChart data={statusData} thickness={30} />  {/* fatter ring */}
```

---

## JRadarChart

Single-series radar / spider chart. Each axis has its own value and optional max.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `axes` | `JRadarAxis[]` | — | Axis data (`{label, value, max?}`) |
| `size` | `string` | `'200px'` | Chart diameter (CSS string) |
| `colorVar` | `string` | `'--j-accent'` | CSS variable name for polygon color |
| `rings` | `number` | `4` | Number of web rings |
| `showLabels` | `boolean` | `true` | Show axis labels |

> **Note:** Single-series only. Props are `axes` (not `data`), no `keys[]` or `colors[]`. Each axis carries its own `value` and optional `max` (defaults to 100).

### Examples

```tsx
const unitStats: JRadarAxis[] = [
  { label: 'SIGNAL',   value: 80 },
  { label: 'RANGE',    value: 60 },
  { label: 'ACCURACY', value: 90 },
  { label: 'SPEED',    value: 75 },
  { label: 'STEALTH',  value: 55 },
]

<JRadarChart axes={unitStats} />
<JRadarChart axes={unitStats} colorVar="--j-warn" size="240px" />

// Per-axis custom max
const threatStats: JRadarAxis[] = [
  { label: 'RANGE',  value: 12, max: 20  },
  { label: 'SPEED',  value: 450, max: 600 },
  { label: 'ARMOR',  value: 3,  max: 5   },
]
<JRadarChart axes={threatStats} />
```

---

## Dashboard with multiple charts

```tsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
  <JHudFrameCard style={{ padding: 14 }}>
    <div style={{ fontSize: 8, color: 'var(--j-accent)', marginBottom: 8 }}>SIGNAL HISTORY</div>
    <JLineChart data={signalData} showArea />
  </JHudFrameCard>

  <JHudFrameCard style={{ padding: 14 }}>
    <div style={{ fontSize: 8, color: 'var(--j-accent)', marginBottom: 8 }}>UNIT STATUS</div>
    <JDonutChart data={statusData} centerValue="60" centerLabel="UNITS" />
  </JHudFrameCard>

  <JHudFrameCard style={{ padding: 14 }}>
    <div style={{ fontSize: 8, color: 'var(--j-accent)', marginBottom: 8 }}>ZONE ACTIVITY</div>
    <JBarChart data={zoneData} />
  </JHudFrameCard>

  <JHudFrameCard style={{ padding: 14 }}>
    <div style={{ fontSize: 8, color: 'var(--j-accent)', marginBottom: 8 }}>UNIT PROFILE</div>
    <JRadarChart axes={unitStats} />
  </JHudFrameCard>
</div>
```

## Notes

- All charts use `colorVar` (a CSS variable **name** without `var()`) — e.g. `colorVar="--j-warn"` not `colorVar="var(--j-warn)"`
- Charts auto-scale to their data range — no `min`/`max` prop needed (except `JRadarAxis.max` per-axis)
- `JSparkline` is for micro trends with no axes; these charts are for labeled data with context
- For multi-series line charts, use raw Recharts or render two `JLineChart` overlaid with `position: absolute`
