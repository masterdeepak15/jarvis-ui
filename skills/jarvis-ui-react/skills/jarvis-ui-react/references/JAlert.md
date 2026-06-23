# JAlert

Dismissable alert banner with 4 states (active/warning/error/success).

## Import

```tsx
import { JAlert } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `JState` | `'active'` | Alert severity/type |
| `title` | `string` | — | Bold header line |
| `message` | `string` | — | Body text |
| `dismissable` | `boolean` | `false` | Show × dismiss button |
| `onDismiss` | `() => void` | — | Called when dismissed |
| `blink` | `boolean` | `false` | Blinking border animation |

`JState`: `'active'` | `'warning'` | `'error'` | `'success'`

## Use Cases

### Four alert states

```tsx
<JAlert state="active"  title="SYSTEM ACTIVE"   message="All sensors online and reporting." />
<JAlert state="warning" title="LOW SIGNAL"       message="Radar signal degraded — 43% strength." />
<JAlert state="error"   title="CONNECTION LOST"  message="CCTV-005 offline since 14:32 UTC." />
<JAlert state="success" title="MISSION COMPLETE" message="All objectives confirmed." />
```

### Dismissable alerts

```tsx
const [alerts, setAlerts] = useState([
  { id: 1, state: 'error'   as JState, title: 'SENSOR FAILURE', message: 'CCTV-002 offline.' },
  { id: 2, state: 'warning' as JState, title: 'LOW BATTERY',    message: 'PTZ-001 at 12%.' },
])

{alerts.map(a => (
  <JAlert
    key={a.id}
    state={a.state}
    title={a.title}
    message={a.message}
    dismissable
    onDismiss={() => setAlerts(prev => prev.filter(x => x.id !== a.id))}
  />
))}
```

### Blinking critical alert

```tsx
const [critical, setCritical] = useState(true)

{critical && (
  <JAlert
    state="error"
    title="INTRUSION DETECTED"
    message="Zone 3 perimeter breach — unit dispatched."
    blink
    dismissable
    onDismiss={() => setCritical(false)}
  />
)}
```

### Alert inside a modal

```tsx
<JModal open={open} onClose={() => setOpen(false)} title="WARNING">
  <JAlert
    state="warning"
    title="UNSAVED CHANGES"
    message="You have unsaved changes. Closing will discard them."
  />
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
    <JAlert key={i} state="warning" title="ALERT" message={msg} />
  ))}
</div>
```

## Notes

- `state` maps to: `active` → cyan, `warning` → amber, `error` → red, `success` → green
- `blink` animates the border — use sparingly for critical alerts only
- `dismissable` requires wiring up `onDismiss` to remove the alert from state
- Stacks vertically naturally — render multiple alerts in a `flex-column` container
