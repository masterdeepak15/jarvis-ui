# JAccordion

Expand/collapse accordion panel with optional color and state.

## Import

```tsx
import { JAccordion } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Accordion header text |
| `children` | `ReactNode` | — | Panel content (shown when expanded) |
| `defaultOpen` | `boolean` | `false` | Open by default |
| `color` | `JColor` | `'cyan'` | Accent color |
| `state` | `JState` | — | Optional state for color override |

## Use Cases

### Basic accordion

```tsx
<JAccordion title="MISSION BRIEFING">
  <p style={{ color: 'var(--j-text-primary)', fontSize: 11 }}>
    Proceed to grid ref 28.6N, 77.2E. Secure the perimeter.
  </p>
</JAccordion>
```

### Pre-expanded accordion

```tsx
<JAccordion title="SYSTEM STATUS" defaultOpen>
  <JDataRow label="RADAR"  value="ONLINE"  state="active" />
  <JDataRow label="COMMS"  value="WARNING" state="warning" />
  <JDataRow label="VISION" value="OFFLINE" state="error" />
</JAccordion>
```

### Color variants

```tsx
<JAccordion title="RADAR SETTINGS"    color="cyan"  defaultOpen>...</JAccordion>
<JAccordion title="WEAPON SYSTEMS"    color="red"              >...</JAccordion>
<JAccordion title="COMMS CHANNELS"    color="green"            >...</JAccordion>
<JAccordion title="WARNINGS ACTIVE"   color="amber"            >...</JAccordion>
```

### State-coded accordion with alert inside

```tsx
<JAccordion title="⚠ ACTIVE FAULTS (3)" state="error" color="red" defaultOpen>
  <JAlert state="error"   title="CCTV-005 OFFLINE"  message="Last seen 14:32 UTC" />
  <JAlert state="warning" title="VMS-001 DEGRADED"  message="Signal at 43%" />
  <JAlert state="error"   title="PTZ-002 TIMEOUT"   message="No response for 5 minutes" />
</JAccordion>
```

### FAQ / help sections

```tsx
const faqs = [
  { q: 'HOW TO RESET A UNIT?',  a: 'Navigate to the unit detail page and click RESET.' },
  { q: 'WHAT IS GREEN STATUS?', a: 'Green means all systems nominal — no action required.' },
  { q: 'HOW TO ADD A NEW ZONE?', a: 'Go to Settings → Zones → Add New Zone.' },
]

<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  {faqs.map(f => (
    <JAccordion key={f.q} title={f.q}>
      <p style={{ color: 'var(--j-text-primary)', fontSize: 11 }}>{f.a}</p>
    </JAccordion>
  ))}
</div>
```

### Settings sections

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  <JAccordion title="RADAR CONFIGURATION" color="cyan" defaultOpen>
    <JFormField label="SCAN FREQUENCY">
      <JSlider value={freq} onChange={setFreq} min={1} max={60} />
    </JFormField>
    <JFormField label="RANGE (KM)">
      <JSlider value={range} onChange={setRange} min={5} max={500} />
    </JFormField>
  </JAccordion>

  <JAccordion title="ALERT THRESHOLDS" color="amber">
    <JFormField label="WARNING LEVEL">
      <JSlider value={warn} onChange={setWarn} min={0} max={100} color="amber" />
    </JFormField>
  </JAccordion>
</div>
```

## Notes

- Toggle state is managed internally — no controlled open/close prop
- `defaultOpen` only sets the initial state; user can toggle freely after that
- `state` overrides `color` for the header accent
- Children are unmounted when collapsed and remounted when expanded
