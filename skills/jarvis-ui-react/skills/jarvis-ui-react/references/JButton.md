# JButton

HUD-styled button with parallelogram / notch shapes in 7 colors.

## Import

```tsx
import { JButton } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `JColor` | `'cyan'` | Button accent color |
| `size` | `'sm'`\|`'md'`\|`'lg'` | `'md'` | Button size |
| `shape` | `'Default'`\|`'LeftNotch'`\|`'RightNotch'` | `'Default'` | Clip-path shape |
| `disabled` | `boolean` | `false` | Disabled state |
| `onClick` | `() => void` | — | Click handler |
| `children` | `ReactNode` | — | Button label |
| `type` | `'button'`\|`'submit'`\|`'reset'` | `'button'` | HTML button type |

`JColor`: `'cyan'` | `'blue'` | `'amber'` | `'red'` | `'green'` | `'ghost'` | `'white'`

## Use Cases

### Standard action buttons

```tsx
<JButton color="cyan" onClick={handleEngage}>ENGAGE</JButton>
<JButton color="amber" onClick={handleWarn}>WARNING</JButton>
<JButton color="red" onClick={handleAbort}>ABORT</JButton>
<JButton color="green" onClick={handleConfirm}>CONFIRM</JButton>
<JButton color="ghost" onClick={handleCancel}>CANCEL</JButton>
```

### Sizes

```tsx
<JButton size="sm" color="cyan">SMALL</JButton>
<JButton size="md" color="cyan">MEDIUM</JButton>
<JButton size="lg" color="cyan">LARGE</JButton>
```

### Notch shapes (HUD aesthetic)

```tsx
// Left-cut parallelogram
<JButton shape="LeftNotch" color="amber">◀ BACK</JButton>

// Right-cut parallelogram
<JButton shape="RightNotch" color="cyan">NEXT ▶</JButton>
```

### Button group / toolbar

```tsx
<div style={{ display: 'flex', gap: 8 }}>
  <JButton color="cyan"  size="sm" shape="LeftNotch">SCAN</JButton>
  <JButton color="amber" size="sm">TRACK</JButton>
  <JButton color="red"   size="sm" shape="RightNotch">LOCK</JButton>
</div>
```

### Disabled state

```tsx
<JButton color="cyan" disabled>OFFLINE</JButton>
```

### Form submit

```tsx
<JButton type="submit" color="green" size="lg">SUBMIT REPORT</JButton>
```

## Notes

- Uses `clip-path: polygon(...)` — never add `border-radius`
- `'ghost'` color = transparent background, dim border — good for secondary/cancel actions
- Font is always `'Courier New', monospace` — don't override
- Letter-spacing is built in at `0.12em`
