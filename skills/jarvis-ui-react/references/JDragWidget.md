# JDragWidget

A standalone draggable HUD panel with a title bar, collapse button, and accent border. Use this when you need **one or two floating widgets** without the full `JHudCanvas` setup.

> For full Movies-mode pages with multiple widgets, prefer `JHudCanvas` — it manages z-order and grid snapping automatically. `JDragWidget` is best for adding a single overlay widget to an existing page.

## Import

```tsx
import { JDragWidget } from '@masterdeepak15/jarvis-ui'
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'WIDGET'` | Title bar label (displayed in ALL CAPS style) |
| `defaultX` | `number` | `0` | Initial X position in px |
| `defaultY` | `number` | `0` | Initial Y position in px |
| `width` | `number \| string` | `280` | Widget width |
| `color` | `'cyan'\|'amber'\|'green'\|'red'\|'blue'\|'white'` | `'cyan'` | Accent color for border and title |
| `collapsible` | `boolean` | `true` | Show collapse toggle button |
| `onMove` | `(x, y) => void` | — | Called continuously while dragging |
| `className` | `string` | — | Extra CSS class on outer div |
| `style` | `CSSProperties` | — | Extra styles on outer div |
| `children` | `ReactNode` | — | Widget content |

---

## Examples

### Basic floating widget

```tsx
<div style={{ position: 'relative', height: '100vh' }}>
  <JDragWidget
    title="SYSTEM STATUS"
    defaultX={40}
    defaultY={40}
    color="cyan"
    width={240}
  >
    <JDataRow label="CPU"    value="34%" />
    <JDataRow label="MEMORY" value="61%" />
    <JDataRow label="TEMP"   value="72°C" state="warning" />
  </JDragWidget>
</div>
```

### Overlay on an existing page

```tsx
// Drop it anywhere — it positions itself absolutely
<JDragWidget
  title="LIVE FEED"
  defaultX={window.innerWidth - 320}
  defaultY={80}
  width={300}
  color="amber"
>
  <JActivityFeed items={events} maxRows={6} />
</JDragWidget>
```

### Persist position to state

```tsx
const [pos, setPos] = useState({ x: 60, y: 60 })

<JDragWidget
  title="METRICS"
  defaultX={pos.x}
  defaultY={pos.y}
  onMove={(x, y) => setPos({ x, y })}
  color="green"
>
  <JArcMeter value={cpu} label="CPU" />
</JDragWidget>
```

### Multiple widgets side by side

```tsx
<div style={{ position: 'relative', height: 600 }}>
  <JDragWidget title="CLOCK"  defaultX={20}  defaultY={20}  width={160} color="cyan">
    <JHudClock analog size={100} />
  </JDragWidget>

  <JDragWidget title="POWER"  defaultX={200} defaultY={20}  width={160} color="cyan">
    <JArcReactor level={82} size={100} />
  </JDragWidget>

  <JDragWidget title="ALERTS" defaultX={380} defaultY={20}  width={240} color="amber">
    <JActivityFeed items={alerts} maxRows={5} />
  </JDragWidget>
</div>
```

---

## Notes

- The parent container must have `position: relative` (or `position: fixed/absolute`) for the widget to position correctly.
- Dragging uses `setPointerCapture` — works on touch and mouse, no library needed.
- The title bar is the only drag handle — content area is not draggable, so interactions inside the widget work normally.
- `collapsible={false}` hides the ▾ button — useful for widgets that should always stay open.
- The outer div uses `clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)` — no `border-radius`.
- The z-index rises to 100 while dragging, returns to 10 after drop.
