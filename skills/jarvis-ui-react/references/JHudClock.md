# JHudClock

Analog + digital clock with a rotating SVG tick ring, hour/minute/second hands, and an optional date readout. Designed as a self-contained HUD instrument — drop it into a `JHudCanvas` widget or a `JDragWidget`.

## Import

```tsx
import { JHudClock } from '@masterdeepak15/jarvis-ui'
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `analog` | `boolean` | `true` | Show the SVG analog clock ring |
| `color` | `'cyan'\|'amber'\|'green'\|'red'\|'blue'\|'white'` | `'cyan'` | Accent color for ring, hands, and text |
| `size` | `number` | `120` | Diameter of the analog ring in px |
| `showDate` | `boolean` | `true` | Show date string below the digital readout |
| `className` | `string` | — | Extra CSS class |
| `style` | `CSSProperties` | — | Extra styles |

---

## Examples

### Standard HUD clock (analog + digital)

```tsx
<JHudClock analog size={120} color="cyan" showDate />
```

### Digital-only (no ring)

```tsx
<JHudClock analog={false} color="amber" />
```

### Large featured clock

```tsx
<JHudClock analog size={200} color="cyan" showDate />
```

### Inside a JHudCanvas widget

```tsx
{
  id: 'clock',
  x: 32, y: 28,
  width: 160,
  color: 'cyan',
  title: 'SYSTEM CLOCK',
  content: <JHudClock analog size={120} showDate />,
}
```

### Inside a JDragWidget

```tsx
<JDragWidget title="ZULU TIME" defaultX={40} defaultY={40} width={170} color="cyan">
  <JHudClock analog size={130} color="cyan" showDate />
</JDragWidget>
```

### Multiple time zones

```tsx
// JHudClock always shows local time — for multi-TZ, pair with a label
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
  <JHudClock analog={false} color="cyan" showDate={false} />
  <div style={{ fontSize: 7, color: 'var(--j-text-muted)', letterSpacing: '.15em' }}>
    LOCAL / UTC+5:30
  </div>
</div>
```

---

## Anatomy

```
  ┌── Outer tick ring (SVG) ──────────────────────┐
  │   60 ticks — major every 5 (12 total)         │
  │   4 numeral markers: 12, 3, 6, 9              │
  │                                               │
  │        Hour hand  (thick, short)              │
  │        Minute hand (medium)                   │
  │        Second hand (thin, red)                │
  │        Center dot + small ring                │
  └───────────────────────────────────────────────┘
       HH:MM:SS  (digital, updates every second)
       MON DD YYYY  (date, when showDate=true)
```

---

## Notes

- Updates every 1 second via `setInterval` — cleans up on unmount.
- The second hand is always rendered in `var(--j-red)` regardless of `color` — matches Iron Man / cockpit convention.
- `size` controls only the analog SVG ring — digital text below is always the same proportional size.
- When `analog={false}`, only the digital time + date renders — good for compact widgets.
- Font is `'Courier New', monospace` — do not override.
