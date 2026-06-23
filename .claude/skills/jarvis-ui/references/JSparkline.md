# JSparkline

Mini trend line for compact data visualization — no axes, just the shape of the data.

## Import

```tsx
import { JSparkline } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `number[]` | — | Array of numeric values |
| `colorVar` | `string` | `'--j-accent'` | CSS variable for line color |
| `showArea` | `boolean` | `false` | Fill area under the line |
| `showTrend` | `boolean` | `false` | Show trend direction indicator |
| `height` | `number` | `40` | Height in pixels |
| `width` | `number` | — | Width (defaults to container width) |

## Use Cases

### Basic sparkline

```tsx
<JSparkline data={[12, 18, 9, 24, 15, 32, 28]} />
```

### With area fill

```tsx
<JSparkline
  data={[45, 52, 38, 67, 71, 58, 84]}
  showArea
  colorVar="--j-accent"
/>
```

### With trend indicator

```tsx
<JSparkline
  data={[20, 35, 28, 42, 55, 48, 62]}
  showTrend
  colorVar="--j-green"
/>
```

### Color variants

```tsx
<JSparkline data={cpuData}  colorVar="--j-cyan"  showArea />
<JSparkline data={memData}  colorVar="--j-amber" showArea />
<JSparkline data={diskData} colorVar="--j-green" showArea />
<JSparkline data={netData}  colorVar="--j-red"   showArea showTrend />
```

### In a stat card row

```tsx
<JHudFrameCard style={{ padding: 14 }}>
  <div style={{ fontSize: 9, color: 'var(--j-text-muted)', marginBottom: 8 }}>
    CPU USAGE — LAST 24H
  </div>
  <JSparkline data={cpuHistory} showArea showTrend colorVar="--j-accent" height={48} />
  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
    <JDataRow label="CURRENT" value={`${cpu}%`} />
    <JDataRow label="PEAK"    value={`${Math.max(...cpuHistory)}%`} />
  </div>
</JHudFrameCard>
```

### Mini sparklines in a table cell

```tsx
// Sparkline per device in a metrics table
<div style={{ width: 80 }}>
  <JSparkline data={device.history} height={24} colorVar="--j-accent" />
</div>
```

### Live updating sparkline

```tsx
const [history, setHistory] = useState<number[]>(Array(20).fill(0))

useEffect(() => {
  const interval = setInterval(() => {
    const newValue = Math.random() * 100
    setHistory(prev => [...prev.slice(1), newValue])
  }, 1000)
  return () => clearInterval(interval)
}, [])

<JSparkline data={history} showArea colorVar="--j-accent" />
```

## Notes

- `data` should have at least 3 points for a meaningful line
- `colorVar` must be a CSS variable name string (with `--` prefix): `'--j-accent'`, `'--j-amber'`, etc.
- `showTrend` shows a small ▲/▼ indicator comparing first vs last value
- No axes, labels, or tooltips — use `JLineChart` when those are needed
