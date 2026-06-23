# JCard · JHudFrame · JHudFrameCard

Container components with HUD border styling.

## Import

```tsx
import { JCard, JHudFrame, JHudFrameCard } from '@masterdeepak15/jarvis-ui'
```

---

## JCard

General-purpose card container with HUD background styling.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Card content |
| `className` | `string` | — | Additional CSS class |
| `style` | `CSSProperties` | — | Inline styles |

### Examples

```tsx
<JCard style={{ padding: 16 }}>
  <h3 style={{ color: 'var(--j-accent)', fontSize: 11 }}>UNIT STATUS</h3>
  <JDataRow label="CALLSIGN" value="ALPHA-1" />
  <JDataRow label="STATUS"   value="ONLINE" state="active" />
</JCard>
```

```tsx
// Cards in a grid
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
  {units.map(u => (
    <JCard key={u.id} style={{ padding: 14 }}>
      <JDataRow label="ID"     value={u.id} />
      <JDataRow label="STATUS" value={u.status} />
    </JCard>
  ))}
</div>
```

---

## JHudFrame

Adds corner-bracket HUD framing around content. The "brackets" aesthetic.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Framed content |
| `label` | `string` | — | Small label in the top-left bracket |

### Examples

```tsx
<JHudFrame label="RADAR OUTPUT">
  <div style={{ padding: 16 }}>
    {/* chart, map, or visualization */}
    <JRadarChart data={radarData} />
  </div>
</JHudFrame>
```

```tsx
// Framing a stat block
<JHudFrame label="SYSTEM VITALS">
  <div style={{ padding: 12 }}>
    <JDataRow label="CPU"    value="45%" />
    <JDataRow label="MEMORY" value="2.1 GB" />
    <JDataRow label="UPTIME" value="14:32:07" />
  </div>
</JHudFrame>
```

---

## JHudFrameCard

Combined HUD frame + card background. Most common card variant for dashboard sections.

### Props

Same as `JCard` — accepts `children`, `className`, `style`.

### Examples

```tsx
<JHudFrameCard style={{ padding: 16 }}>
  <div style={{ fontSize: 9, color: 'var(--j-accent)', marginBottom: 10 }}>
    ◈ INTEL SUMMARY
  </div>
  <JDataRow label="THREATS"   value="3 ACTIVE" state="error" />
  <JDataRow label="CIVILIANS" value="CLEAR"    state="success" />
  <JDataRow label="ASSETS"    value="8 ONLINE" state="active" />
</JHudFrameCard>
```

```tsx
// Dashboard layout with JHudFrameCard panels
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
  <JHudFrameCard style={{ padding: 14 }}>
    <JLineChart data={tempData} />
  </JHudFrameCard>
  <JHudFrameCard style={{ padding: 14 }}>
    <JDonutChart data={donutData} />
  </JHudFrameCard>
</div>
```

## Notes

- All three are wrapper/container components — they don't manage state
- `JHudFrameCard` is the recommended default for most dashboard panels
- `JHudFrame` (without fill) is better when you need the bracket aesthetic without a card background
- Never add `border-radius` — these use `clip-path` polygon borders
