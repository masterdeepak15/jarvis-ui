# JBadge

Inline badge chip with 7 colors and optional blinking animation.

## Import

```tsx
import { JBadge } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `JColor` | `'cyan'` | Badge color |
| `blink` | `boolean` | `false` | Blinking animation |
| `children` | `ReactNode` | — | Badge text/content |

## Use Cases

### Status badges

```tsx
<JBadge color="green">ONLINE</JBadge>
<JBadge color="amber">WARNING</JBadge>
<JBadge color="red">OFFLINE</JBadge>
<JBadge color="cyan">ACTIVE</JBadge>
<JBadge color="ghost">IDLE</JBadge>
```

### Blinking alert badge

```tsx
// Blink to draw attention to critical status
<JBadge color="red" blink>CRITICAL</JBadge>
<JBadge color="amber" blink>ALERT</JBadge>
```

### Count / metric badges

```tsx
<JBadge color="cyan">{records.length} RECORDS</JBadge>
<JBadge color="amber">{warnings} WARNINGS</JBadge>
<JBadge color="red">{errors} ERRORS</JBadge>
```

### Type badges

```tsx
// Consistent color per device/item type
function typeBadge(type: string) {
  const colorMap: Record<string, JColor> = {
    CCTV: 'cyan', VMS: 'amber', PTZ: 'green', TOLL: 'red',
  }
  return <JBadge color={colorMap[type] ?? 'ghost'}>{type}</JBadge>
}
```

### Header with badge row

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
  <div style={{ fontSize: 9, color: 'var(--j-accent)', letterSpacing: '0.18em' }}>
    ▶ SYSTEM STATUS
  </div>
  <JBadge color="green">RADAR ACTIVE</JBadge>
  <JBadge color="cyan" blink>TRACKING</JBadge>
  <JBadge color="amber">2 WARNINGS</JBadge>
</div>
```

### Alongside slider value

```tsx
const [gain, setGain] = useState(72)

<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <JSlider value={gain} onChange={setGain} />
  <JBadge color="cyan">{gain}%</JBadge>
</div>
```

## Notes

- `blink` causes CSS opacity animation — good for live/alert indicators
- `'ghost'` color gives a transparent/dim style — use for inactive/unknown states
- Content renders inline with small padding — works with text, numbers, or short strings
