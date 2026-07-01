# JRadialMenu · JRadialItem

Spring fly-out radial navigation ring. Trigger opens a circle of action items around the button.

## Import

```tsx
import { JRadialMenu, JRadialItem } from '@masterdeepak15/jarvis-ui'
```

## JRadialMenu Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controls whether the ring is open (controlled) |
| `onOpenChange` | `(open: boolean) => void` | — | Called when the menu opens or closes |
| `triggerLabel` | `string` | `'MENU'` | Text on the center trigger button |
| `radius` | `number` | `90` | Distance from center to items in px |
| `centerSize` | `string` | `'64px'` | Diameter of the center button |
| `children` | `JRadialItem[]` | — | The radial items |

> **Note:** There is no `triggerIcon` or `color` prop on `JRadialMenu`.

## JRadialItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `itemKey` | `string` | — | Unique key for this item |
| `icon` | `string` | — | Item icon/emoji |
| `label` | `string` | — | Item hover label |
| `angle` | `number` | — | Position in degrees (0 = top, clockwise) |
| `state` | `JState` | `'active'` | Item color state |
| `onClick` | `() => void` | — | Action handler |

> **Note:** Item color comes from `state: JState`, not a `color: JColor` prop.

## Controlled vs. uncontrolled

`JRadialMenu` is a **controlled component** when `open` is provided. Pass `open` + `onOpenChange` together:

```tsx
const [open, setOpen] = useState(false)

<JRadialMenu open={open} onOpenChange={setOpen} triggerLabel="MENU">
  ...
</JRadialMenu>
```

Omit `open` to let the menu manage its own open state internally (click-to-toggle only).

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
  <JRadialItem itemKey="dash"     icon="⊞" label="Dashboard" angle={0}   state="active"  onClick={() => navigate('/dash')} />
  <JRadialItem itemKey="network"  icon="📡" label="Network"   angle={90}  state="active"  onClick={() => navigate('/net')} />
  <JRadialItem itemKey="settings" icon="⚙" label="Settings"  angle={180} state="active"  onClick={() => navigate('/settings')} />
  <JRadialItem itemKey="map"      icon="🌐" label="Map"       angle={270} state="active"  onClick={() => navigate('/map')} />
</JRadialMenu>
```

### 6-item ring (every 60°) with state colors

```tsx
const [open, setOpen] = useState(false)

<JRadialMenu open={open} onOpenChange={setOpen} triggerLabel="ACTIONS">
  <JRadialItem itemKey="mark"   icon="📍" label="Mark Target"  angle={0}   state="error"   onClick={handleMark} />
  <JRadialItem itemKey="scan"   icon="📡" label="Scan Area"    angle={60}  state="active"  onClick={handleScan} />
  <JRadialItem itemKey="deploy" icon="⚡" label="Deploy Units" angle={120} state="warning" onClick={handleDeploy} />
  <JRadialItem itemKey="lock"   icon="🔒" label="Lock Zone"    angle={180} state="error"   onClick={handleLock} />
  <JRadialItem itemKey="status" icon="📊" label="Status"       angle={240} state="success" onClick={handleStatus} />
  <JRadialItem itemKey="home"   icon="🏠" label="Return Base"  angle={300} state="idle"    onClick={handleHome} />
</JRadialMenu>
```

### Driven by external trigger (keyboard shortcut, hotkey)

```tsx
const [open, setOpen] = useState(false)

useEffect(() => {
  function onKey(e: KeyboardEvent) {
    if (e.key === 'm') setOpen(prev => !prev)
  }
  window.addEventListener('keydown', onKey)
  return () => window.removeEventListener('keydown', onKey)
}, [])

<JRadialMenu open={open} onOpenChange={setOpen} triggerLabel="QUICK ACT">
  <JRadialItem itemKey="alert"   icon="🚨" label="Emergency Alert" angle={0}   state="error"   onClick={handleAlert} />
  <JRadialItem itemKey="confirm" icon="✅" label="Confirm Clear"   angle={180} state="success" onClick={handleConfirm} />
</JRadialMenu>
```

## Notes

- `angle` is in degrees, measured clockwise from 12 o'clock (0° = top)
- For evenly spaced N items: `angle = i * (360 / N)`
- Item `state` drives color: `active` → cyan, `warning` → amber, `error` → red, `success` → green
- Click the center button or any item to close; `onOpenChange(false)` is called on both
- Works best with 4–8 items; more than 8 gets crowded
