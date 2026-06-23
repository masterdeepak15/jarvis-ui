# JStatusPill

Status dot + label pill — a compact visual indicator for system/item state.

## Import

```tsx
import { JStatusPill } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `JState` | — | State determines color and dot |
| `label` | `string` | — | Text label beside the dot |

`JState`: `'active'` | `'warning'` | `'error'` | `'success'`

## State → Color Mapping

| State | Color | Use for |
|-------|-------|---------|
| `'active'` | cyan | Online, running, live |
| `'warning'` | amber | Degraded, slow, needs attention |
| `'error'` | red | Down, failed, critical |
| `'success'` | green | Healthy, complete, confirmed |

## Use Cases

### Device status column in a table

```tsx
// Inside a table cell renderer
<JStatusPill state={row.status === 'Online' ? 'active' : 'error'} label={row.status} />
```

### Status mapping function

```tsx
function statusPill(status: string) {
  const map: Record<string, JState> = {
    Online:  'active',
    Warning: 'warning',
    Error:   'error',
    Offline: 'error',
    OK:      'success',
  }
  return <JStatusPill state={map[status] ?? 'warning'} label={status} />
}
```

### System health overview

```tsx
const systems = [
  { name: 'RADAR',   status: 'active'  },
  { name: 'COMMS',   status: 'warning' },
  { name: 'SENSORS', status: 'active'  },
  { name: 'FUEL',    status: 'error'   },
]

<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
  {systems.map(s => (
    <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 8, color: 'var(--j-text-muted)', width: 80 }}>{s.name}</span>
      <JStatusPill state={s.status as JState} label={s.status.toUpperCase()} />
    </div>
  ))}
</div>
```

### Inline status beside device name

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <span style={{ fontSize: 9 }}>CCTV-001</span>
  <JStatusPill state="active" label="ONLINE" />
</div>
```

## Notes

- The dot color matches the state — no `color` prop needed
- Combines dot + text in a single pill container
- Lighter-weight than `JBadge` — use when status = the primary info
- Use `JBadge` when displaying type/category labels; use `JStatusPill` for live state
