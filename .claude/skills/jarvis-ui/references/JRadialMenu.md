# JRadialMenu · JRadialItem

Spring fly-out radial navigation ring. Trigger opens a circle of action items around the button.

## Import

```tsx
import { JRadialMenu, JRadialItem } from '@masterdeepak15/jarvis-ui'
```

## JRadialMenu Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controls whether ring is open |
| `onOpenChange` | `(open: boolean) => void` | — | Toggle callback |
| `triggerLabel` | `string` | — | Text on the trigger button |
| `triggerIcon` | `string` | — | Icon on the trigger button |
| `color` | `JColor` | `'cyan'` | Trigger button color |
| `children` | `JRadialItem[]` | — | The radial items |

## JRadialItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | — | Item icon/emoji |
| `label` | `string` | — | Item tooltip/label |
| `angle` | `number` | — | Position in degrees (0 = top, clockwise) |
| `onClick` | `() => void` | — | Action handler |
| `color` | `JColor` | `'cyan'` | Item color |

## Angle Guide

```
         0° (top)
    315°     45°
270° (left)  (right) 90°
    225°     135°
        180° (bottom)
```

## Use Cases

### 4-item radial menu (up/right/down/left)

```tsx
const [open, setOpen] = useState(false)

<JRadialMenu open={open} onOpenChange={setOpen} triggerLabel="MENU">
  <JRadialItem icon="⊞" label="Dashboard" angle={0}   onClick={() => navigate('/dash')} />
  <JRadialItem icon="📡" label="Network"   angle={90}  onClick={() => navigate('/net')} />
  <JRadialItem icon="⚙" label="Settings"  angle={180} onClick={() => navigate('/settings')} />
  <JRadialItem icon="🌐" label="Map"       angle={270} onClick={() => navigate('/map')} />
</JRadialMenu>
```

### 6-item ring (every 60°)

```tsx
const [open, setOpen] = useState(false)
const { toast } = useToast()

<JRadialMenu open={open} onOpenChange={setOpen} triggerLabel="ACTIONS" color="amber">
  <JRadialItem icon="📍" label="Mark Target"  angle={0}   color="red"   onClick={() => toast({ title: 'Target marked' })} />
  <JRadialItem icon="📡" label="Scan Area"    angle={60}  color="cyan"  onClick={() => toast({ title: 'Scanning...' })} />
  <JRadialItem icon="⚡" label="Deploy Units" angle={120} color="amber" onClick={() => toast({ title: 'Units deployed' })} />
  <JRadialItem icon="🔒" label="Lock Zone"    angle={180} color="red"   onClick={() => toast({ title: 'Zone locked' })} />
  <JRadialItem icon="📊" label="Status"       angle={240} color="green" onClick={() => toast({ title: 'Status OK' })} />
  <JRadialItem icon="🏠" label="Return Base"  angle={300} color="ghost" onClick={() => toast({ title: 'Returning...' })} />
</JRadialMenu>
```

### 5-item ring (every 72°)

```tsx
<JRadialMenu open={open} onOpenChange={setOpen} triggerIcon="⊕" triggerLabel="NAV">
  <JRadialItem icon="⊞" label="Home"    angle={0}   onClick={() => setPage('home')} />
  <JRadialItem icon="⚡" label="Intel"  angle={72}  onClick={() => setPage('intel')} />
  <JRadialItem icon="⚙" label="Config" angle={144} onClick={() => setPage('config')} />
  <JRadialItem icon="📡" label="Comms"  angle={216} onClick={() => setPage('comms')} />
  <JRadialItem icon="🔊" label="Audio"  angle={288} onClick={() => setPage('audio')} />
</JRadialMenu>
```

### With toast notifications

```tsx
import { useToast } from '@masterdeepak15/jarvis-ui'

function RadialNav() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  return (
    <JRadialMenu open={open} onOpenChange={setOpen} triggerLabel="QUICK ACT" color="cyan">
      <JRadialItem
        icon="🚨"
        label="Emergency Alert"
        angle={0}
        color="red"
        onClick={() => {
          toast({ title: 'ALERT DISPATCHED', state: 'error' })
          setOpen(false)
        }}
      />
      <JRadialItem
        icon="✅"
        label="Confirm Clear"
        angle={180}
        color="green"
        onClick={() => {
          toast({ title: 'AREA CLEARED', state: 'success' })
          setOpen(false)
        }}
      />
    </JRadialMenu>
  )
}
```

## Notes

- `angle` is in degrees, measured clockwise from 12 o'clock (0° = top)
- For evenly spaced N items: `angle = i * (360 / N)`
- Click outside or toggle trigger to close
- Works best with 4–8 items; more than 8 gets crowded
- Requires `JToastProvider` in the tree if `useToast` is used inside item handlers
