# JHudBar

Top or bottom HUD bar with animated waveform, tick marks, and REC indicator.

## Import

```tsx
import { JHudBar } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'top'`\|`'bottom'` | `'top'` | Where the bar is anchored |
| `color` | `JColor` | `'cyan'` | Accent color |
| `showWaveform` | `boolean` | `true` | Show animated waveform bars |
| `showTicks` | `boolean` | `true` | Show tick marks |
| `showDots` | `boolean` | `true` | Show scanning dots |
| `label` | `string` | — | Text label in the bar |
| `systemName` | `string` | — | System name displayed in the bar |

## Use Cases

### Top and bottom bars (full HUD layout)

```tsx
<div style={{ position: 'relative', minHeight: '100vh' }}>
  <JHudBar position="top"    label="JARVIS TACTICAL" showWaveform showTicks />
  <JHudBar position="bottom" color="amber" showDots />

  <main style={{ padding: '60px 24px' }}>
    {/* page content */}
  </main>
</div>
```

### Color variants

```tsx
<JHudBar position="top"    color="cyan"  label="SYSTEM ALPHA" />
<JHudBar position="top"    color="amber" label="SYSTEM BRAVO" />
<JHudBar position="bottom" color="green" />
<JHudBar position="bottom" color="red"   label="ALERT MODE" />
```

### Minimal bar (dots only)

```tsx
<JHudBar position="bottom" showWaveform={false} showTicks={false} showDots />
```

### With system name

```tsx
<JHudBar
  position="top"
  systemName="NH-90 TACTICAL OPS"
  label="v2.0.0"
  color="cyan"
  showWaveform
  showTicks
/>
```

### Using with JPageLayout

`JHudBar` is included automatically inside `JPageLayout`. Use standalone only for custom layouts.

```tsx
// JPageLayout handles top+bottom bars automatically
<JPageLayout topBarLabel="MY APP" sidebarItems={navItems}>
  {/* content */}
</JPageLayout>

// Manual layout if needed
<>
  <JHudBar position="top"    label="MY APP" />
  <div style={{ padding: '56px 0' }}>
    {/* content */}
  </div>
  <JHudBar position="bottom" showDots />
</>
```

## Notes

- Use `position: fixed` or absolute positioning for bars that stick to viewport edges
- `JPageLayout` already wraps content with top+bottom bars — don't double-wrap
- Waveform animation runs continuously — it doesn't require any data input
- Dots animate a left-to-right scanning sweep
