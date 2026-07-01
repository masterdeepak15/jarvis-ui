# JArcMeter · JWaveform · JOrb

HUD visualization components — animated displays for dashboards.

## Import

```tsx
import { JArcMeter, JWaveform, JOrb } from '@masterdeepak15/jarvis-ui'
```

---

## JArcMeter

Segmented arc-style level meter. Displays a value as a count of lit segments with wave-shaped heights.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `number` | — | Number of active segments (0 to `totalArcs`) |
| `totalArcs` | `number` | `6` | Total number of segments |
| `color` | `JColor` | `'cyan'` | Segment color |
| `orientation` | `'horizontal'`\|`'vertical'` | `'horizontal'` | Layout direction |
| `showLabel` | `boolean` | `false` | Show label above meter |
| `label` | `string` | `'LEVEL'` | Label text |
| `showValue` | `boolean` | `false` | Show `level / totalArcs` below meter |
| `arcWidth` | `string` | `'8px'` | Width of each segment (horizontal) |
| `arcGap` | `string` | `'3px'` | Gap between segments |

> **Note:** The prop is `level` (not `value`) and `totalArcs` (not `max`). There is no `size` or `unit` prop.

### Examples

```tsx
// Basic — 4 of 6 segments lit
<JArcMeter level={4} totalArcs={6} />

// With label and value readout
<JArcMeter level={4} totalArcs={6} label="SIGNAL" showLabel showValue />

// Multi-meter panel
<div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
  <JArcMeter level={8}  totalArcs={10} label="CPU"    showLabel color="cyan"  />
  <JArcMeter level={9}  totalArcs={10} label="MEMORY" showLabel color="amber" />
  <JArcMeter level={3}  totalArcs={10} label="DISK"   showLabel color="green" />
  <JArcMeter level={10} totalArcs={10} label="TEMP"   showLabel color="red"   />
</div>

// Vertical orientation
<JArcMeter level={5} totalArcs={8} orientation="vertical" color="cyan" />
```

---

## JWaveform

Animated audio-style waveform bars.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bars` | `number` | `20` | Number of bars |
| `color` | `JColor` | `'cyan'` | Bar color |
| `height` | `number` | `40` | Container height in pixels |
| `active` | `boolean` | `true` | Running animation |

### Examples

```tsx
// Signal waveform
<JWaveform bars={30} color="cyan" height={50} />

// Inactive (paused) waveform
<JWaveform bars={20} color="amber" active={false} />

// Small inline waveform
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <span style={{ fontSize: 8 }}>RADAR SIGNAL</span>
  <JWaveform bars={15} color="green" height={24} />
</div>
```

---

## JOrb

Large interactive AI-assistant orb with concentric animated rings, system name, state label, and a listening indicator dot.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `systemName` | `string` | `'JARVIS'` | Text displayed in the center |
| `size` | `string` | `'160px'` | Diameter — CSS string e.g. `'160px'`, `'10rem'` |
| `state` | `JState` | `'active'` | Drives ring animation speed and state label |
| `listening` | `boolean` | `false` | Lights up the bottom indicator dot |
| `onClick` | `() => void` | — | Click handler |

> **Note:** Props are `systemName` (not `label`), `size: string` (not `number`), `state` (not `pulse`/`rings`). There is no `color` prop — color is always the theme accent.

### State behaviors

| `state` | Ring speed | Center label |
|---|---|---|
| `active` | Medium | Online / Listening |
| `processing` | Fast | Processing |
| `idle` | Slow | Idle |
| `warning` | Medium | Warning |
| `error` | Medium | Error |

### Examples

```tsx
// Basic
<JOrb systemName="JARVIS" state="active" />

// Processing with click handler
<JOrb systemName="IRIS" state="processing" size="200px" onClick={handleActivate} />

// Listening mode
<JOrb systemName="JARVIS" state="active" listening size="160px" />

// Idle / standby
<JOrb systemName="ARIA" state="idle" size="120px" />
```

---

## Dashboard panel using all three

```tsx
<JHudFrameCard style={{ padding: 16 }}>
  <div style={{ fontSize: 9, color: 'var(--j-accent)', marginBottom: 16 }}>
    ▶ SYSTEM VITALS
  </div>

  {/* Arc meters for key metrics */}
  <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
    <JArcMeter level={9}  totalArcs={10} label="SIGNAL"  showLabel color="cyan"  />
    <JArcMeter level={7}  totalArcs={10} label="BATTERY" showLabel color="green" />
  </div>

  {/* Waveform at bottom */}
  <JWaveform bars={24} color="cyan" height={32} />
</JHudFrameCard>
```

## Notes

- `JArcMeter`: `level` must be ≤ `totalArcs`; the peak segment pulses
- `JWaveform`: animation runs continuously using CSS keyframes — no data input needed
- `JOrb`: best used as a hero/centerpiece element; not for inline status indicators
