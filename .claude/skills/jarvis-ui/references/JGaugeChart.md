# JGaugeChart

Radial gauge chart with needle and tick marks.

## Import

```tsx
import { JGaugeChart } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current value |
| `max` | `number` | `100` | Maximum value |
| `colorVar` | `string` | `'--j-accent'` | CSS variable for gauge fill |
| `showNeedle` | `boolean` | `false` | Show needle indicator |
| `showTicks` | `boolean` | `false` | Show tick marks around arc |
| `label` | `string` | — | Label text below gauge |
| `height` | `number` | `200` | Chart height |

## Use Cases

### Basic gauge

```tsx
<JGaugeChart value={73} max={100} label="SIGNAL STRENGTH" />
```

### With needle and ticks

```tsx
<JGaugeChart
  value={67}
  max={100}
  showNeedle
  showTicks
  colorVar="--j-accent"
  label="SYSTEM LOAD"
/>
```

### Color variants

```tsx
// Green for good range
<JGaugeChart value={90} max={100} colorVar="--j-green" showNeedle label="BATTERY" />

// Amber for warning
<JGaugeChart value={55} max={100} colorVar="--j-amber" showNeedle label="FUEL" />

// Red for critical
<JGaugeChart value={12} max={100} colorVar="--j-red" showNeedle showTicks label="PRESSURE" />
```

### Dynamic color based on thresholds

```tsx
function getColorVar(value: number): string {
  if (value < 30) return '--j-red'
  if (value < 60) return '--j-amber'
  return '--j-green'
}

<JGaugeChart
  value={temp}
  max={120}
  colorVar={getColorVar(temp)}
  showNeedle
  showTicks
  label="ENGINE TEMP"
/>
```

### Dashboard row of gauges

```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
  <JGaugeChart value={cpu}    max={100} colorVar="--j-accent" showNeedle label="CPU"     />
  <JGaugeChart value={mem}    max={100} colorVar="--j-amber"  showNeedle label="MEMORY"  />
  <JGaugeChart value={disk}   max={100} colorVar="--j-green"  showNeedle label="DISK"    />
  <JGaugeChart value={temp}   max={120} colorVar="--j-red"    showNeedle label="TEMP °C" />
</div>
```

### Full-size featured gauge

```tsx
<JHudFrameCard style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <div style={{ fontSize: 9, color: 'var(--j-accent)', marginBottom: 8 }}>RADAR POWER</div>
  <JGaugeChart
    value={radarPower}
    max={100}
    colorVar="--j-accent"
    showNeedle
    showTicks
    label="POWER OUTPUT %"
    height={280}
  />
  <JSlider value={radarPower} onChange={setRadarPower} min={0} max={100} />
</JHudFrameCard>
```

## Notes

- `colorVar` must be a CSS variable name WITH the `--` prefix: `'--j-accent'`, `'--j-amber'`, etc.
- `showNeedle` adds a pointer that sweeps from min to max — good for large gauges
- `showTicks` adds tick marks at intervals around the arc
- For a simple fill-arc without needle, use `JArcMeter` instead — it's more compact
