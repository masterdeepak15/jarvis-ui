# JHudLabel

Labelled data display in chip, arc, or metric variants — for HUD dashboards.

## Import

```tsx
import { JHudLabel } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label (header text) |
| `value` | `string\|number` | — | Field value |
| `variant` | `'chip'`\|`'arc'`\|`'metric'` | `'chip'` | Visual style |
| `color` | `JColor` | `'cyan'` | Accent color |
| `unit` | `string` | — | Unit suffix after value |

## Variants

| Variant | Description |
|---------|-------------|
| `'chip'` | Compact label+value inline chip — good for status rows |
| `'arc'` | Value inside an arc bracket — good for highlighted metrics |
| `'metric'` | Large value with small label below — good for KPI display |

## Use Cases

### Chip variant — status row

```tsx
<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
  <JHudLabel variant="chip" label="CALLSIGN" value="ALPHA-1"    color="cyan"  />
  <JHudLabel variant="chip" label="STATUS"   value="ONLINE"     color="green" />
  <JHudLabel variant="chip" label="ZONE"     value="SECTOR 3"   color="amber" />
  <JHudLabel variant="chip" label="SIGNAL"   value="73 dBm"     color="cyan"  />
</div>
```

### Arc variant — highlighted data

```tsx
<div style={{ display: 'flex', gap: 20 }}>
  <JHudLabel variant="arc" label="TEMP"    value="38.2" unit="°C" color="amber" />
  <JHudLabel variant="arc" label="VOLTAGE" value="12.4" unit="V"  color="cyan"  />
  <JHudLabel variant="arc" label="SIGNAL"  value="87"   unit="%"  color="green" />
</div>
```

### Metric variant — large KPI numbers

```tsx
<div style={{ display: 'flex', gap: 24 }}>
  <JHudLabel variant="metric" label="UNITS ONLINE"  value={42}      color="cyan"  />
  <JHudLabel variant="metric" label="ALERTS ACTIVE" value={7}       color="amber" />
  <JHudLabel variant="metric" label="UPTIME"        value="99.8"    unit="%" color="green" />
  <JHudLabel variant="metric" label="PACKETS/SEC"   value="1,240"   color="cyan"  />
</div>
```

### Mixed variants on a dashboard panel

```tsx
<JHudFrameCard style={{ padding: 16 }}>
  {/* Big numbers at top */}
  <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
    <JHudLabel variant="metric" label="TOTAL UNITS"   value={100}  color="cyan"  />
    <JHudLabel variant="metric" label="ACTIVE"        value={84}   color="green" />
    <JHudLabel variant="metric" label="FAULTS"        value={3}    color="red"   />
  </div>

  {/* Details in chips below */}
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
    <JHudLabel variant="chip" label="LOCATION" value="NH-90" />
    <JHudLabel variant="chip" label="ZONE"     value="HARIDWAR" />
    <JHudLabel variant="chip" label="VERSION"  value="v2.1.0" />
  </div>
</JHudFrameCard>
```

## Notes

- `variant` determines the entire visual layout — choose based on context
- `chip` for dense info rows, `arc` for highlighted values, `metric` for large KPI numbers
- `unit` appends a small unit string after the value (e.g. `%`, `°C`, `km`)
