# JHudCanvas

The **root canvas for Movies / HUD mode**. Renders a dark fixed-size viewport where every widget floats at an absolute `(x, y)` position with drag-to-reposition built in.

> **Use this as the top-level container for every Movies-mode page.** Do not use `JPageLayout` or any flex/grid wrapper in Movies mode.

## Import

```tsx
import { JHudCanvas } from '@masterdeepak15/jarvis-ui'
import type { JWidgetSlot } from '@masterdeepak15/jarvis-ui'
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `widgets` | `JWidgetSlot[]` | — | Array of widget definitions (see below) |
| `height` | `number \| string` | `600` | Canvas height — use `'100vh'` for full screen |
| `showGrid` | `boolean` | `false` | Show subtle dot/line grid overlay |
| `gridSize` | `number` | `20` | Grid cell size in px |
| `snapToGrid` | `boolean` | `false` | Snap widgets to grid on drag |
| `background` | `string` | `var(--j-bg)` | Canvas background color |
| `onWidgetMove` | `(id, x, y) => void` | — | Callback when a widget is dragged |

## JWidgetSlot Shape

```tsx
interface JWidgetSlot {
  id: string              // unique key
  x: number               // left position in px
  y: number               // top position in px
  width?: number          // widget width in px (default 260)
  title?: string          // title bar label
  color?: 'cyan' | 'amber' | 'green' | 'red' | 'blue'
  content: React.ReactNode // the widget's inner content
}
```

---

## Examples

### Full SHIELD-style HUD page

```tsx
import {
  JHudCanvas, JHudClock, JArcReactor, JArcMeter,
  JActivityFeed, JKPITicker, JDataRow, JWaveform,
} from '@masterdeepak15/jarvis-ui'

const kpis = [
  { label: 'AGENTS',   value: '47',   delta: '+3',  trend: 'up'   },
  { label: 'THREATS',  value: '3',    delta: '+1',  trend: 'down' },
  { label: 'UPTIME',   value: '99.8%',delta: '',    trend: 'flat' },
  { label: 'ALTITUDE', value: 'FL380',delta: '',    trend: 'flat' },
]

const log = [
  { id: '1', time: '14:02', level: 'warning', message: 'Sector 7 breach detected',   source: 'RADAR'  },
  { id: '2', time: '14:01', level: 'success', message: 'Agent Romanoff check-in OK', source: 'COMMS'  },
  { id: '3', time: '13:59', level: 'error',   message: 'Engine 2 temp spike',         source: 'ENG'    },
  { id: '4', time: '13:58', level: 'active',  message: 'Target lock confirmed',        source: 'RADAR'  },
]

export function HUDPage() {
  return (
    <>
      <JHudCanvas
        height="calc(100vh - 32px)"
        showGrid
        widgets={[
          // TOP-LEFT — clock
          {
            id: 'clock', x: 32, y: 28, width: 160, color: 'cyan',
            title: 'SYSTEM CLOCK',
            content: <JHudClock analog size={120} showDate />,
          },
          // LEFT — arc reactor
          {
            id: 'power', x: 32, y: 230, width: 160, color: 'cyan',
            title: 'ARC REACTOR',
            content: <JArcReactor level={87} size={110} label="POWER" />,
          },
          // LEFT — system meters
          {
            id: 'meters', x: 32, y: 430, width: 200, color: 'cyan',
            title: 'SYSTEMS',
            content: (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <JArcMeter value={91} label="SHIELDS" color="cyan"  />
                <JArcMeter value={67} label="ENGINES" color="green" />
                <JArcMeter value={44} label="FUEL"    color="amber" />
                <JArcMeter value={23} label="HULL"    color="red"   />
              </div>
            ),
          },
          // CENTER — primary radar (largest widget)
          {
            id: 'radar', x: 260, y: 28, width: 340, color: 'cyan',
            title: 'TACTICAL RADAR',
            content: <div style={{ height: 300, background: 'var(--j-bg)' }}>{ /* RadarWidget */ }</div>,
          },
          // RIGHT — activity feed
          {
            id: 'log', x: 650, y: 28, width: 280, color: 'amber',
            title: 'ACTIVITY LOG',
            content: <JActivityFeed items={log} maxRows={8} autoScroll />,
          },
          // RIGHT — contacts
          {
            id: 'contacts', x: 650, y: 320, width: 280, color: 'green',
            title: 'CONTACTS',
            content: (
              <>
                <JDataRow label="HOSTILE"  value="3"  state="error"   />
                <JDataRow label="NEUTRAL"  value="5"                  />
                <JDataRow label="FRIENDLY" value="12" state="success" />
              </>
            ),
          },
          // RIGHT — comms
          {
            id: 'comms', x: 650, y: 480, width: 280, color: 'cyan',
            title: 'COMMS',
            content: <JWaveform bars={20} color="cyan" height={40} />,
          },
        ]}
      />
      {/* KPI ticker pinned to bottom */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50 }}>
        <JKPITicker items={kpis} color="cyan" height={32} />
      </div>
    </>
  )
}
```

### Saving / restoring widget positions

```tsx
const [positions, setPositions] = useState<Record<string, {x:number,y:number}>>({})

<JHudCanvas
  widgets={widgets}
  onWidgetMove={(id, x, y) => setPositions(prev => ({ ...prev, [id]: { x, y } }))}
/>
```

---

## Notes

- Each widget renders with `position: absolute` on the canvas — this is intentional. Do not fight it.
- Widgets are draggable by their title bar via pointer capture — touch and mouse both work.
- The z-order updates on each drag: the last-dragged widget surfaces to the top.
- `showGrid` renders an SVG pattern grid at 6% opacity — enough to aid alignment, invisible at a glance.
- `snapToGrid` rounds drag positions to the nearest `gridSize` px increment.
- Every widget is collapsible (▾/▸ button in title bar) to save screen space.
- **Never use `JHudCanvas` inside a scrollable container** — it is designed for fixed-height viewports.

## Known Limits

**Widget overflow is silent.** `JHudCanvas` clips its content with `overflow: hidden`. If a widget's `x + width` exceeds the canvas width, or `y + height` exceeds the canvas height, the widget is **silently invisible** — it does not scroll, wrap, or throw an error. This is the most common cause of "widget disappeared" bugs.

Before placing widgets, verify your layout fits:
```
// Widget at x=650, width=280 → rightmost pixel = 930
// Canvas must be at least 930px wide or the widget clips
```

If you're using `height="100vh"` and placing widgets near the bottom, remember the canvas height changes with the viewport — use `onWidgetMove` to save positions and let users reposition.

