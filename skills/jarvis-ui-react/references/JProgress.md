# JProgress

Linear progress bar with optional segmented display.

## Import

```tsx
import { JProgress } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current value |
| `max` | `number` | `100` | Maximum value |
| `color` | `JColor` | `'cyan'` | Bar color |
| `segments` | `number` | — | If set, renders segmented blocks instead of solid fill |
| `showLabel` | `boolean` | `false` | Show percentage label |

## Use Cases

### Basic health/capacity bar

```tsx
<JProgress value={73} max={100} color="cyan" />
```

### Health bar with color thresholds

```tsx
function HealthBar({ health }: { health: number }) {
  const color: JColor = health > 70 ? 'green' : health > 30 ? 'amber' : 'red'
  return <JProgress value={health} max={100} color={color} />
}

<HealthBar health={85} />  // green
<HealthBar health={45} />  // amber
<HealthBar health={12} />  // red
```

### Segmented progress (ammo / battery / signal)

```tsx
// Renders as discrete blocks — good for ammo count, battery level
<JProgress value={7} max={10} segments={10} color="green" />
<JProgress value={3} max={10} segments={10} color="red" />
```

### Progress with label

```tsx
<JProgress value={65} max={100} showLabel color="amber" />
// shows "65%" alongside the bar
```

### In a data table cell

```tsx
// As a cell renderer for a "health" column
function HealthCell({ value }: { value: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 80 }}>
        <JProgress
          value={value}
          max={100}
          color={value > 70 ? 'green' : value > 30 ? 'amber' : 'red'}
        />
      </div>
      <span style={{ fontSize: 8, color: 'var(--j-text-muted)' }}>{value}%</span>
    </div>
  )
}
```

### Multiple systems overview

```tsx
const systems = [
  { name: 'CPU',    value: 45, color: 'cyan'  },
  { name: 'MEMORY', value: 82, color: 'amber' },
  { name: 'DISK',   value: 23, color: 'green' },
  { name: 'NET',    value: 91, color: 'red'   },
]

<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  {systems.map(s => (
    <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 8, color: 'var(--j-text-muted)', width: 60 }}>{s.name}</span>
      <div style={{ flex: 1 }}>
        <JProgress value={s.value} max={100} color={s.color as JColor} />
      </div>
      <span style={{ fontSize: 8, color: 'var(--j-text-muted)', width: 32 }}>{s.value}%</span>
    </div>
  ))}
</div>
```

## Notes

- `value` must be between `0` and `max`
- `segments` prop switches to block rendering — good for discrete quantities
- Does not animate on value change by default — wrap in `useEffect` + `useState` for animated fill
