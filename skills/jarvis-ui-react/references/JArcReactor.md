# JArcReactor

Iron Man arc reactor SVG — a power/capacity display with animated rotating rings, petal triangles, and a glowing core. Designed as a **cockpit power instrument**. Use it anywhere you need to show energy level, battery, capacity, or a single critical percentage.

## Import

```tsx
import { JArcReactor } from '@masterdeepak15/jarvis-ui'
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `number` | `100` | Power level 0–100 |
| `size` | `number` | `120` | Overall diameter in px |
| `color` | `'cyan'\|'amber'\|'green'\|'red'\|'blue'` | `'cyan'` | Accent color for all elements |
| `label` | `string` | — | Label below the reactor (e.g. `'POWER'`) |
| `animated` | `boolean` | `true` | Enable rotating rings and core pulse |
| `className` | `string` | — | Extra CSS class |
| `style` | `CSSProperties` | — | Extra styles |

---

## Examples

### Standard power display

```tsx
<JArcReactor level={87} size={120} color="cyan" label="POWER" />
```

### Battery / energy states

```tsx
<JArcReactor level={92} color="green" label="FULL"     />
<JArcReactor level={54} color="amber" label="MODERATE" />
<JArcReactor level={18} color="red"   label="CRITICAL" />
```

### Large featured reactor (center of a widget)

```tsx
<JArcReactor level={powerLevel} size={200} color="cyan" label="ARC REACTOR" />
```

### Static (no animation) — for screenshots or low-power mode

```tsx
<JArcReactor level={45} animated={false} color="amber" label="STANDBY" />
```

### Inside JHudCanvas — left column power widget

```tsx
{
  id: 'power',
  x: 32, y: 230,
  width: 160,
  color: 'cyan',
  title: 'ARC REACTOR',
  content: <JArcReactor level={powerLevel} size={110} color="cyan" label="POWER" />,
}
```

### Pairing with JArcMeter — power + subsystem breakdown

```tsx
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
  <JArcReactor level={87} size={120} label="MAIN POWER" />
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
    <JArcMeter value={91} label="SHIELDS" color="cyan"  />
    <JArcMeter value={67} label="ENGINES" color="green" />
    <JArcMeter value={44} label="WEAPONS" color="amber" />
    <JArcMeter value={23} label="HULL"    color="red"   />
  </div>
</div>
```

---

## Anatomy

```
  Outer ring  ─── thin dashed ring (rotates clockwise)
  Level arc   ─── thick arc on middle ring showing level %
  Middle ring ─── background track for level arc
  Inner ring  ─── small dashed ring (rotates counter-clockwise)
  Petals      ─── 3 triangles at 120° intervals (opacity scales with level)
  Core        ─── filled circle with pulse animation + level number
```

---

## Notes

- `level` is clamped to 0–100 internally.
- Petal opacity scales with `level` — at 0% petals are invisible, at 100% fully bright.
- Core pulse animation runs on a 1.8s loop — radius and opacity animate.
- The outer ring rotates at ~4s/revolution, inner ring at ~2.5s (counter-clockwise).
- Uses an SVG `<filter>` glow on the level arc and petals — works in all modern browsers.
- The level number is drawn as SVG `<text>` inside the core — always readable.
- `color` affects all elements uniformly — ring, arc, petals, core, glow filter, label.
