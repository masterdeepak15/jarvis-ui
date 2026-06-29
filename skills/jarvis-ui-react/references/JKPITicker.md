# JKPITicker

A horizontally scrolling KPI ticker tape — continuously scrolls a list of key-value metrics with optional trend arrows. Designed as the **full-width bottom bar instrument** in Movies-mode layouts. Mimics stock tickers and flight telemetry readouts.

## Import

```tsx
import { JKPITicker } from '@masterdeepak15/jarvis-ui'
import type { JKPITickerItem } from '@masterdeepak15/jarvis-ui'
```

---

## Types

```tsx
interface JKPITickerItem {
  label: string           // metric name e.g. 'CPU', 'ALTITUDE', 'AGENTS'
  value: string           // current value e.g. '87%', 'FL380', '47'
  delta?: string          // change e.g. '+2.4%', '-12'
  trend?: 'up' | 'down' | 'flat'
}
```

**Trend → icon + color:**

| Trend | Icon | Color |
|---|---|---|
| `up` | ▲ | `var(--j-green)` |
| `down` | ▼ | `var(--j-red)` |
| `flat` | – | `var(--j-text-muted)` |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `JKPITickerItem[]` | — | Metrics to scroll |
| `speed` | `number` | `40` | Scroll speed in px/second |
| `color` | `'cyan'\|'amber'\|'green'\|'red'` | `'cyan'` | Accent color for values |
| `height` | `number` | `32` | Bar height in px |
| `pauseOnHover` | `boolean` | `true` | Pause scroll on mouse hover |
| `className` | `string` | — | Extra CSS class |
| `style` | `CSSProperties` | — | Extra styles |

---

## Examples

### Standard bottom telemetry bar

```tsx
const kpis: JKPITickerItem[] = [
  { label: 'CPU',       value: '34%',   delta: '+2%',   trend: 'up'   },
  { label: 'MEMORY',    value: '61%',   delta: '-4%',   trend: 'down' },
  { label: 'UPTIME',    value: '99.8%', delta: '',      trend: 'flat' },
  { label: 'ALTITUDE',  value: 'FL380', delta: '',      trend: 'flat' },
  { label: 'VELOCITY',  value: 'M0.82', delta: '+0.04', trend: 'up'   },
  { label: 'AGENTS',    value: '47',    delta: '+3',    trend: 'up'   },
  { label: 'THREATS',   value: '3',     delta: '+1',    trend: 'down' },
  { label: 'TEMP',      value: '72°C',  delta: '+4°C',  trend: 'down' },
]

// Pin to bottom of the viewport — always outside JHudCanvas
<div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50 }}>
  <JKPITicker items={kpis} color="cyan" height={32} />
</div>
```

### Slower, more readable scroll

```tsx
<JKPITicker items={kpis} speed={20} color="amber" height={36} />
```

### Financial / trading dashboard

```tsx
const stocks: JKPITickerItem[] = tickers.map(t => ({
  label: t.symbol,
  value: `$${t.price.toFixed(2)}`,
  delta: t.changePercent > 0 ? `+${t.changePercent.toFixed(2)}%` : `${t.changePercent.toFixed(2)}%`,
  trend: t.changePercent > 0 ? 'up' : t.changePercent < 0 ? 'down' : 'flat',
}))

<JKPITicker items={stocks} speed={50} color="green" height={28} />
```

### Server metrics strip

```tsx
const serverMetrics: JKPITickerItem[] = servers.flatMap(s => [
  { label: `${s.name}/CPU`,  value: `${s.cpu}%`,  trend: s.cpu > 80 ? 'down' : 'flat' },
  { label: `${s.name}/MEM`,  value: `${s.mem}%`,  trend: s.mem > 90 ? 'down' : 'flat' },
  { label: `${s.name}/DISK`, value: `${s.disk}%`, trend: 'flat' },
])

<JKPITicker items={serverMetrics} speed={35} color="cyan" />
```

---

## Notes

- Items are duplicated internally to create a seamless loop — the animation translates by 50% of total width.
- The scroll speed is calculated from the track width and `speed` (px/s) — wider tracks scroll at the same visual speed regardless of item count.
- Left and right edges fade to `var(--j-bg-card)` via gradient overlays — items smoothly appear and disappear.
- `pauseOnHover` sets `animationPlayState: paused` on the track element.
- The CSS keyframe is injected into a `<style id="j-ticker-style">` tag on first mount — safe to use multiple tickers simultaneously (unique keyframe names per instance).
- **Always pin with `position: fixed; bottom: 0`** in Movies-mode layouts — this is the designated bottom bar zone. Never place inside `JHudCanvas`.
