# JAlert

Dismissible alert banner with 5 states (active/processing/warning/error/success).

## Import

```tsx
import { JAlert } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `JState` | `'active'` | Alert severity/type |
| `title` | `string` | — | Bold header line |
| `children` | `ReactNode` | — | Body content (text or JSX) |
| `dismissible` | `boolean` | `false` | Show × dismiss button |
| `onDismiss` | `() => void` | — | Called when dismissed |
| `blink` | `boolean` | `false` | Slow blink animation on the whole alert |

`JState`: `'active'` | `'processing'` | `'warning'` | `'error'` | `'success'` | `'idle'`

> **Note:** Body content goes in `children`, not a `message` prop. There is no `message` prop.

## Use Cases

### Four alert states

```tsx
<JAlert state="active"  title="SYSTEM ACTIVE">All sensors online and reporting.</JAlert>
<JAlert state="warning" title="LOW SIGNAL">Radar signal degraded — 43% strength.</JAlert>
<JAlert state="error"   title="CONNECTION LOST">CCTV-005 offline since 14:32 UTC.</JAlert>
<JAlert state="success" title="MISSION COMPLETE">All objectives confirmed.</JAlert>
```

### Dismissible alerts

```tsx
const [alerts, setAlerts] = useState([
  { id: 1, state: 'error'   as JState, title: 'SENSOR FAILURE', body: 'CCTV-002 offline.' },
  { id: 2, state: 'warning' as JState, title: 'LOW BATTERY',    body: 'PTZ-001 at 12%.' },
])

{alerts.map(a => (
  <JAlert
    key={a.id}
    state={a.state}
    title={a.title}
    dismissible
    onDismiss={() => setAlerts(prev => prev.filter(x => x.id !== a.id))}
  >
    {a.body}
  </JAlert>
))}
```

### Blinking critical alert

```tsx
const [critical, setCritical] = useState(true)

{critical && (
  <JAlert
    state="error"
    title="INTRUSION DETECTED"
    blink
    dismissible
    onDismiss={() => setCritical(false)}
  >
    Zone 3 perimeter breach — unit dispatched.
  </JAlert>
)}
```

### Alert inside a modal

```tsx
<JModal open={open} onClose={() => setOpen(false)} title="WARNING">
  <JAlert state="warning" title="UNSAVED CHANGES">
    You have unsaved changes. Closing will discard them.
  </JAlert>
  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
    <JButton color="red"   onClick={discardAndClose}>DISCARD</JButton>
    <JButton color="ghost" onClick={() => setOpen(false)}>CANCEL</JButton>
  </div>
</JModal>
```

### Dynamic alert feed

```tsx
const [log, setLog] = useState<string[]>([])

function addAlert(msg: string) {
  setLog(prev => [msg, ...prev.slice(0, 4)])
}

<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
  {log.map((msg, i) => (
    <JAlert key={i} state="warning" title="ALERT">{msg}</JAlert>
  ))}
</div>
```

## Notes

- `state` maps to: `active`/`processing` → cyan, `warning` → amber, `error` → red, `success` → green, `idle` → dim cyan
- `blink` animates the whole alert slowly — use sparingly for critical alerts only
- `dismissible` manages its own visibility internally; wire `onDismiss` to remove it from your list state
- Stacks vertically naturally — render multiple alerts in a `flex-column` container
