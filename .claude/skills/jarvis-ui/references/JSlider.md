# JSlider

HUD-styled range slider with optional value display.

## Import

```tsx
import { JSlider } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current value |
| `onChange` | `(v: number) => void` | — | Change handler |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `color` | `JColor` | `'cyan'` | Accent color |
| `disabled` | `boolean` | `false` | Disabled state |
| `showValue` | `boolean` | `false` | Show current value above thumb |

## Use Cases

### Basic slider

```tsx
const [gain, setGain] = useState(50)

<JSlider value={gain} onChange={setGain} min={0} max={100} />
```

### With label and badge

```tsx
const [gain, setGain] = useState(72)

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <span style={{ fontSize: 8, color: 'var(--j-text-muted)', width: 80 }}>GAIN</span>
  <div style={{ flex: 1 }}>
    <JSlider value={gain} onChange={setGain} min={0} max={100} showValue />
  </div>
  <JBadge color="cyan">{gain}%</JBadge>
</div>
```

### Multi-control panel

```tsx
const [freq, setFreq]     = useState(240)
const [thresh, setThresh] = useState(3.5)
const [vol, setVol]       = useState(80)

<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
  {[
    { label: 'FREQUENCY', value: freq,   set: setFreq,   min: 100, max: 500, step: 10,  color: 'cyan',  unit: 'Hz' },
    { label: 'THRESHOLD', value: thresh, set: setThresh, min: 0,   max: 10,  step: 0.5, color: 'red',   unit: '' },
    { label: 'VOLUME',    value: vol,    set: setVol,    min: 0,   max: 100, step: 1,   color: 'green', unit: '%' },
  ].map(s => (
    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 8, color: 'var(--j-text-muted)', width: 90 }}>{s.label}</span>
      <div style={{ flex: 1 }}>
        <JSlider value={s.value} onChange={s.set} min={s.min} max={s.max} step={s.step} color={s.color as JColor} />
      </div>
      <JBadge color={s.color as JColor}>{s.value}{s.unit}</JBadge>
    </div>
  ))}
</div>
```

### Disabled slider (locked setting)

```tsx
<JSlider value={42} onChange={() => {}} disabled />
```

## Notes

- Controlled component — always pass `value` + `onChange`
- `step` can be decimal (e.g. `0.5`, `0.1`) for fine-grained control
- `showValue` shows the number floating above the thumb as you drag
- Pair with `JBadge` beside the slider for a persistent numeric display
