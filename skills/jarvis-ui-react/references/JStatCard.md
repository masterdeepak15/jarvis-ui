# JStatCard

Metric stat card with title, value, state, optional progress bar, data rows, badge, and children.

## Import

```tsx
import { JStatCard } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Card header label (required) |
| `value` | `string` | — | Primary metric value (required, always a string) |
| `state` | `JState` | `'active'` | Card accent color state |
| `sub` | `string` | — | Subtitle below the value |
| `showStatusDot` | `boolean` | `false` | Show a colored dot before `sub` |
| `badge` | `string` | — | Badge label in the top-right corner |
| `badgeColor` | `JColor` | `'cyan'` | Badge color |
| `barValue` | `number` | — | 0–100 — shows a progress bar at the bottom |
| `dataRows` | `JStatCardDataRow[]` | — | List of key-value rows below the metric |
| `cardStyle` | `JCardStyle` | `'CornerBracket'` | Card frame style |
| `color` | `JColor` | `'cyan'` | Card frame color |
| `padding` | `string` | `'14px 16px'` | Inner padding |
| `children` | `ReactNode` | — | Extra content rendered at the bottom |

```tsx
interface JStatCardDataRow {
  label:       string
  value:       string
  barPercent?: number  // 0–100, renders a mini bar
}
```

> **Note:** `value` is always a `string` — format your number before passing it. There is no `unit` prop.

`JState`: `'active'` | `'warning'` | `'error'` | `'success'`

## Use Cases

### Four states dashboard row

```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
  <JStatCard title="UNITS ONLINE"  value="42"  state="active"  barValue={84} />
  <JStatCard title="WARNINGS"      value="7"   state="warning" barValue={14} />
  <JStatCard title="ERRORS"        value="3"   state="error"   barValue={6}  />
  <JStatCard title="MISSIONS DONE" value="18"  state="success" barValue={90} />
</div>
```

### With sub text and status dot

```tsx
<JStatCard
  title="RADAR LINK"
  value="ONLINE"
  state="success"
  sub="Last sync 2s ago"
  showStatusDot
/>
```

### With badge

```tsx
<JStatCard
  title="THREAT LEVEL"
  value="HIGH"
  state="error"
  badge="URGENT"
  badgeColor="red"
/>
```

### With data rows (inline bars optional)

```tsx
<JStatCard
  title="SIGNAL STRENGTH"
  value="73%"
  state="active"
  barValue={73}
  dataRows={[
    { label: 'MIN',    value: '41%', barPercent: 41 },
    { label: 'MAX',    value: '98%', barPercent: 98 },
    { label: 'AVG 1H', value: '68%', barPercent: 68 },
  ]}
/>
```

### Dynamic state based on thresholds

```tsx
function getState(value: number): JState {
  if (value >= 80) return 'error'
  if (value >= 60) return 'warning'
  return 'active'
}

<JStatCard
  title="CPU LOAD"
  value={`${cpu}%`}
  state={getState(cpu)}
  barValue={cpu}
/>
```

### With children (custom content)

```tsx
<JStatCard title="ACTIVE UNITS" value="24 / 30" state="active">
  <div style={{ marginTop: 8 }}>
    <JProgress value={80} showPercent={false} />
  </div>
</JStatCard>
```

## Notes

- `value` must be a string — format numbers before passing (e.g. `value={cpu.toFixed(1) + '%'}`)
- `barValue` should be 0–100; scales the progress bar fill
- `state` controls accent color: `active` → cyan, `warning` → amber, `error` → red, `success` → green
- `dataRows` with `barPercent` renders a mini inline bar next to each value
- Commonly used in 2×2 or 4-column grids on dashboards
