# JStatCard

Metric stat card with title, value, state, optional bar, and data rows. Perfect for dashboard KPI panels.

## Import

```tsx
import { JStatCard } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Card header label |
| `value` | `string\|number` | — | Primary metric value |
| `state` | `JState` | `'active'` | Card color state |
| `barValue` | `number` | — | 0–100, shows a progress bar at bottom |
| `dataRows` | `{ label: string; value: string }[]` | — | List of key-value rows below the metric |
| `unit` | `string` | — | Unit label beside the value |

`JState`: `'active'` | `'warning'` | `'error'` | `'success'`

## Use Cases

### Four states dashboard row

```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
  <JStatCard title="UNITS ONLINE"   value={42}   state="active"  barValue={84} />
  <JStatCard title="WARNINGS"       value={7}    state="warning" barValue={14} />
  <JStatCard title="ERRORS"         value={3}    state="error"   barValue={6}  />
  <JStatCard title="MISSIONS DONE"  value={18}   state="success" barValue={90} />
</div>
```

### With unit and data rows

```tsx
<JStatCard
  title="SIGNAL STRENGTH"
  value={73}
  unit="%"
  state="active"
  barValue={73}
  dataRows={[
    { label: 'MIN',     value: '41%' },
    { label: 'MAX',     value: '98%' },
    { label: 'AVG 1H',  value: '68%' },
  ]}
/>
```

### Fleet overview panel

```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
  <JStatCard
    title="ACTIVE UNITS"
    value="24 / 30"
    state="active"
    barValue={80}
    dataRows={[
      { label: 'CCTV', value: '12' },
      { label: 'PTZ',  value: '8'  },
      { label: 'VMS',  value: '4'  },
    ]}
  />
  <JStatCard
    title="NETWORK LOAD"
    value="67%"
    state="warning"
    barValue={67}
    dataRows={[
      { label: 'INBOUND',  value: '1.2 GB/s' },
      { label: 'OUTBOUND', value: '0.4 GB/s' },
    ]}
  />
</div>
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

## Notes

- `barValue` should be 0–100 (percentage); scales the bar fill
- `state` controls the card accent color: `active`→cyan, `warning`→amber, `error`→red, `success`→green
- `dataRows` renders as small key-value pairs below the main value
- Commonly used in 2×2 or 4-column grids on dashboards
