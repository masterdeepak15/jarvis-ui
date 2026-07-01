# JProgress

Linear progress bar in two variants: solid fill bar or animated tick segments.

## Import

```tsx
import { JProgress } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current value (0–100) |
| `label` | `string` | — | Label shown above the bar |
| `state` | `JState` | `'active'` | Color state |
| `variant` | `'bar'` \| `'ticks'` | `'bar'` | Solid bar or segmented ticks |
| `indeterminate` | `boolean` | `false` | Scanning animation (ignores `value`) |
| `showPercent` | `boolean` | `true` | Show `value%` on the right of the label |
| `total` | `number` | `16` | Number of tick segments (ticks variant only) |

`JState`: `'active'` | `'warning'` | `'error'` | `'success'` | `'idle'` | `'processing'`

> **Note:** There is no `max`, `color`, `segments`, or `showLabel` prop. Color comes from `state`; tick count comes from `total`.

## Use Cases

### Basic bar

```tsx
<JProgress value={73} />
<JProgress value={45} label="SIGNAL" />
```

### State-colored bars

```tsx
<JProgress value={85} label="CPU"    state="active"  />
<JProgress value={67} label="MEMORY" state="warning" />
<JProgress value={91} label="TEMP"   state="error"   />
<JProgress value={32} label="DISK"   state="success" />
```

### Hide percent

```tsx
<JProgress value={73} label="LOAD" showPercent={false} />
```

### Indeterminate (loading)

```tsx
<JProgress indeterminate label="SCANNING" />
```

### Tick variant (discrete segments — ammo/battery/signal)

```tsx
// 16 ticks default
<JProgress variant="ticks" value={75} label="AMMO" />

// Custom tick count
<JProgress variant="ticks" value={60} total={10} label="CHARGES" />
```

### Threshold-based state

```tsx
function SystemBar({ name, pct }: { name: string; pct: number }) {
  const state: JState = pct > 80 ? 'error' : pct > 60 ? 'warning' : 'active'
  return <JProgress value={pct} label={name} state={state} />
}

<SystemBar name="CPU"    pct={45} />
<SystemBar name="MEMORY" pct={82} />
<SystemBar name="DISK"   pct={23} />
```

### In a stat card

```tsx
<JStatCard title="NETWORK LOAD" value="67%">
  <JProgress value={67} state="warning" showPercent={false} />
</JStatCard>
```

## Notes

- `value` is always 0–100 (a percentage); the component does not accept raw values against a `max`
- `variant="ticks"` renders `total` discrete segments — the active count is `Math.round(value / 100 * total)`
- `state` drives color: `active` → cyan, `warning` → amber, `error` → red, `success` → green
- `indeterminate` shows a scanning sweep animation and ignores `value`
