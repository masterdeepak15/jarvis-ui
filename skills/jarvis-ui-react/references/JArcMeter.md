# JArcMeter · JWaveform · JOrb

HUD visualization components — animated SVG displays for dashboards.

## Import

```tsx
import { JArcMeter, JWaveform, JOrb } from '@masterdeepak15/jarvis-ui'
```

---

## JArcMeter

Animated SVG arc gauge — shows a value as a filled arc with needle or fill.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current value |
| `max` | `number` | `100` | Maximum value |
| `label` | `string` | — | Label below the arc |
| `unit` | `string` | — | Unit suffix (e.g. `'%'`, `'km/h'`) |
| `color` | `JColor` | `'cyan'` | Arc fill color |
| `size` | `number` | `120` | Width/height in pixels |
| `showValue` | `boolean` | `true` | Show value text inside arc |

### Examples

```tsx
// Basic arc meter
<JArcMeter value={73} max={100} label="SIGNAL" unit="%" color="cyan" />

// Multi-meter panel
<div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
  <JArcMeter value={45} max={100} label="CPU"    unit="%" color="cyan"  />
  <JArcMeter value={82} max={100} label="MEMORY" unit="%" color="amber" />
  <JArcMeter value={23} max={100} label="DISK"   unit="%" color="green" />
  <JArcMeter value={91} max={100} label="TEMP"   unit="°C" color="red" max={120} />
</div>

// Larger meter for featured metric
<JArcMeter value={speed} max={500} label="VELOCITY" unit="km/h" size={200} color="cyan" />
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

Pulsing orb with concentric glow rings — status indicator or decorative element.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `JColor` | `'cyan'` | Orb color |
| `size` | `number` | `60` | Diameter in pixels |
| `pulse` | `boolean` | `true` | Enable pulse animation |
| `label` | `string` | — | Label below orb |
| `rings` | `number` | `3` | Number of glow rings |

### Examples

```tsx
// Status orbs
<JOrb color="green" label="ONLINE"  />
<JOrb color="amber" label="WARNING" />
<JOrb color="red"   label="OFFLINE" pulse={false} />

// Large featured orb
<JOrb color="cyan" size={120} rings={4} label="SYSTEM ACTIVE" />

// Row of system status orbs
<div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
  {systems.map(s => (
    <JOrb key={s.name} color={s.color} label={s.name} size={50} />
  ))}
</div>
```

---

## Dashboard panel using all three

```tsx
<JHudFrameCard style={{ padding: 16 }}>
  <div style={{ fontSize: 9, color: 'var(--j-accent)', marginBottom: 16 }}>
    ▶ SYSTEM VITALS
  </div>

  {/* Orbs for quick status */}
  <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
    <JOrb color="green" size={40} label="RADAR"   />
    <JOrb color="amber" size={40} label="COMMS"   pulse />
    <JOrb color="red"   size={40} label="SENSORS" pulse={false} />
  </div>

  {/* Arc meters for key metrics */}
  <div style={{ display: 'flex', gap: 16 }}>
    <JArcMeter value={signal}  max={100} label="SIGNAL"  unit="%" color="cyan"  size={80} />
    <JArcMeter value={battery} max={100} label="BATTERY" unit="%" color="green" size={80} />
  </div>

  {/* Waveform at bottom */}
  <JWaveform bars={24} color="cyan" height={32} />
</JHudFrameCard>
```

## Notes

- `JArcMeter`: value must be ≤ max; it does not clamp
- `JWaveform`: animation runs continuously using CSS keyframes — no data input needed
- `JOrb`: `pulse={false}` stops the animation — use for offline/error states
- All three are purely decorative/visual — no interaction handlers
