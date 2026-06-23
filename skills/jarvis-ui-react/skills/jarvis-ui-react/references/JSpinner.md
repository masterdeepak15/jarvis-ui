# JSpinner

Arc loading spinner with optional label — for async loading states.

## Import

```tsx
import { JSpinner } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Text label below the spinner |
| `color` | `JColor` | `'cyan'` | Spinner arc color |
| `size` | `'sm'`\|`'md'`\|`'lg'` | `'md'` | Spinner size |

## Use Cases

### Basic loading spinner

```tsx
{loading && <JSpinner label="LOADING..." />}
```

### Full-page loading overlay

```tsx
{loading && (
  <div style={{
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000,
  }}>
    <JSpinner label="INITIALIZING SYSTEMS..." size="lg" color="cyan" />
  </div>
)}
```

### Inside a card while data loads

```tsx
<JHudFrameCard style={{ padding: 24, minHeight: 200 }}>
  {loading ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
      <JSpinner label="FETCHING DATA..." color="amber" />
    </div>
  ) : (
    <JLineChart data={chartData} />
  )}
</JHudFrameCard>
```

### Table loading state

```tsx
const [loading, setLoading] = useState(false)
const [rows, setRows]       = useState([])

async function fetchData() {
  setLoading(true)
  const data = await api.getDevices()
  setRows(data)
  setLoading(false)
}

<>
  {loading
    ? <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
        <JSpinner label="LOADING RECORDS..." />
      </div>
    : <JTable columns={cols} rows={rows} stateColumn="status" />
  }
</>
```

### Color variants for different operations

```tsx
<JSpinner color="cyan"  label="SCANNING..." />
<JSpinner color="amber" label="PROCESSING..." />
<JSpinner color="red"   label="ABORT SEQUENCE..." />
<JSpinner color="green" label="SYNCING..." />
```

### Small inline spinner

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <JSpinner size="sm" />
  <span style={{ fontSize: 9, color: 'var(--j-text-muted)' }}>CONNECTING TO RADAR...</span>
</div>
```

## Notes

- Spinner animates continuously — does not need data
- `label` renders centered below the arc
- Use `size="lg"` for full-page overlays, `size="sm"` for inline use
- Color defaults to `'cyan'` — change to `'amber'` for warning/processing states
