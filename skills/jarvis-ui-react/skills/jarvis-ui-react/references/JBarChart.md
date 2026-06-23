# JBarChart · JLineChart · JDonutChart · JRadarChart

Chart components powered by Recharts with HUD styling.

## Import

```tsx
import { JBarChart, JLineChart, JDonutChart, JRadarChart } from '@masterdeepak15/jarvis-ui'
```

---

## JBarChart

Vertical bar chart.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `object[]` | — | Array of data objects |
| `dataKey` | `string` | — | Key for bar values |
| `xKey` | `string` | — | Key for X-axis labels |
| `color` | `string` | `'var(--j-accent)'` | Bar color (CSS value) |
| `height` | `number` | `200` | Chart height in pixels |
| `showGrid` | `boolean` | `true` | Show grid lines |

### Examples

```tsx
const data = [
  { zone: 'ALPHA', units: 12 },
  { zone: 'BRAVO', units: 8  },
  { zone: 'CHARLIE', units: 15 },
  { zone: 'DELTA', units: 6  },
]

<JBarChart data={data} dataKey="units" xKey="zone" height={200} />
<JBarChart data={data} dataKey="units" xKey="zone" color="var(--j-amber)" />
```

---

## JLineChart

Line / area chart with multiple series.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `object[]` | — | Array of data objects |
| `lines` | `{ key: string; color: string; area?: boolean }[]` | — | Line series definitions |
| `xKey` | `string` | — | Key for X-axis |
| `height` | `number` | `200` | Chart height |
| `showGrid` | `boolean` | `true` | Show grid lines |

### Examples

```tsx
const timeData = [
  { time: '00:00', signal: 72, noise: 18 },
  { time: '04:00', signal: 68, noise: 22 },
  { time: '08:00', signal: 85, noise: 14 },
  { time: '12:00', signal: 91, noise: 9  },
  { time: '16:00', signal: 78, noise: 17 },
  { time: '20:00', signal: 65, noise: 24 },
]

// Single line
<JLineChart
  data={timeData}
  xKey="time"
  lines={[{ key: 'signal', color: 'var(--j-accent)' }]}
/>

// Multi-line with area fill
<JLineChart
  data={timeData}
  xKey="time"
  lines={[
    { key: 'signal', color: 'var(--j-cyan)',  area: true },
    { key: 'noise',  color: 'var(--j-amber)', area: false },
  ]}
  height={250}
/>
```

---

## JDonutChart

Donut / pie chart.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `{ name: string; value: number; color?: string }[]` | — | Slice data |
| `height` | `number` | `200` | Chart height |
| `innerRadius` | `number` | `60` | Inner radius (0 = pie, >0 = donut) |
| `label` | `string` | — | Center label text |

### Examples

```tsx
const statusData = [
  { name: 'ONLINE',  value: 42, color: 'var(--j-green)' },
  { name: 'WARNING', value: 7,  color: 'var(--j-amber)' },
  { name: 'ERROR',   value: 3,  color: 'var(--j-red)'   },
  { name: 'OFFLINE', value: 8,  color: 'var(--j-text-muted)' },
]

<JDonutChart data={statusData} label="60 UNITS" />
<JDonutChart data={statusData} innerRadius={0} />  {/* pie chart */}
```

---

## JRadarChart

Radar / spider chart for multi-dimensional comparison.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `object[]` | — | Data with `subject` key + metric keys |
| `keys` | `string[]` | — | Metric keys to plot |
| `colors` | `string[]` | — | Colors for each key |
| `height` | `number` | `200` | Chart height |

### Examples

```tsx
const radarData = [
  { subject: 'SIGNAL',   unitA: 80, unitB: 65 },
  { subject: 'RANGE',    unitA: 60, unitB: 85 },
  { subject: 'ACCURACY', unitA: 90, unitB: 70 },
  { subject: 'SPEED',    unitA: 75, unitB: 90 },
  { subject: 'STEALTH',  unitA: 55, unitB: 40 },
]

<JRadarChart
  data={radarData}
  keys={['unitA', 'unitB']}
  colors={['var(--j-cyan)', 'var(--j-amber)']}
  height={280}
/>
```

---

## Dashboard with multiple charts

```tsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
  <JHudFrameCard style={{ padding: 14 }}>
    <div style={{ fontSize: 8, color: 'var(--j-accent)', marginBottom: 8 }}>SIGNAL HISTORY</div>
    <JLineChart data={signalData} xKey="hour" lines={[{ key: 'strength', color: 'var(--j-accent)', area: true }]} />
  </JHudFrameCard>

  <JHudFrameCard style={{ padding: 14 }}>
    <div style={{ fontSize: 8, color: 'var(--j-accent)', marginBottom: 8 }}>UNIT STATUS</div>
    <JDonutChart data={statusData} label="60 UNITS" />
  </JHudFrameCard>

  <JHudFrameCard style={{ padding: 14 }}>
    <div style={{ fontSize: 8, color: 'var(--j-accent)', marginBottom: 8 }}>ZONE ACTIVITY</div>
    <JBarChart data={zoneData} dataKey="count" xKey="zone" />
  </JHudFrameCard>

  <JHudFrameCard style={{ padding: 14 }}>
    <div style={{ fontSize: 8, color: 'var(--j-accent)', marginBottom: 8 }}>UNIT COMPARISON</div>
    <JRadarChart data={radarData} keys={['alpha','bravo']} colors={['var(--j-cyan)','var(--j-amber)']} />
  </JHudFrameCard>
</div>
```

## Notes

- All charts use `var(--j-*)` CSS variables for colors — they update automatically on theme change
- Data arrays must be stable references — memoize with `useMemo` for large datasets
- Charts are Recharts under the hood — responsive by default
- `JSparkline` is for micro trends with no axes; these charts are for labeled data with context
