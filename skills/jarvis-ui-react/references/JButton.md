# JButton

HUD-styled button with 7 clip-path shapes, 7 colors, loading state, and icon slots.

## Import

```tsx
import { JButton } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `JColor` | `'cyan'` | Button accent color |
| `size` | `'sm'`\|`'md'`\|`'lg'` | `'md'` | Button size |
| `shape` | `JButtonShape` | `'LeftNotch'` | Clip-path shape (see below) |
| `variant` | `JVariant` | — | Style variant override |
| `loading` | `boolean` | `false` | Replaces label with `···` spinner, disables click |
| `disabled` | `boolean` | `false` | Disabled state |
| `icon` | `ReactNode` | — | Icon before the label |
| `iconRight` | `ReactNode` | — | Icon after the label |
| `onClick` | `() => void` | — | Click handler |
| `children` | `ReactNode` | — | Button label |
| `type` | `'button'`\|`'submit'`\|`'reset'` | `'button'` | HTML button type |

`JColor`: `'cyan'` | `'blue'` | `'amber'` | `'red'` | `'green'` | `'ghost'` | `'white'`

`JButtonShape`: `'LeftNotch'` | `'RightNotch'` | `'BothNotch'` | `'Parallelogram'` | `'GhostSkew'` | `'BracketFrame'` | `'Hexagonal'` | `'IconSquare'` | `'ScanFull'`

> **Note:** Default shape is `'LeftNotch'`, not `'Default'`. There is no `style` prop — never add `border-radius`.

## Use Cases

### Standard action buttons

```tsx
<JButton color="cyan"  onClick={handleEngage}>ENGAGE</JButton>
<JButton color="amber" onClick={handleWarn}>WARNING</JButton>
<JButton color="red"   onClick={handleAbort}>ABORT</JButton>
<JButton color="green" onClick={handleConfirm}>CONFIRM</JButton>
<JButton color="ghost" onClick={handleCancel}>CANCEL</JButton>
```

### Sizes

```tsx
<JButton size="sm" color="cyan">SMALL</JButton>
<JButton size="md" color="cyan">MEDIUM</JButton>
<JButton size="lg" color="cyan">LARGE</JButton>
```

### Notch shapes

```tsx
<JButton shape="LeftNotch"  color="amber">◀ BACK</JButton>
<JButton shape="RightNotch" color="cyan">NEXT ▶</JButton>
<JButton shape="BothNotch"  color="red">ABORT</JButton>
```

### With icons

```tsx
<JButton icon="📡" color="cyan">SCAN</JButton>
<JButton iconRight="▶" color="green">LAUNCH</JButton>
```

### Loading state

```tsx
<JButton color="cyan" loading>SCANNING</JButton>
```

### Button group / toolbar

```tsx
<div style={{ display: 'flex', gap: 8 }}>
  <JButton color="cyan"  size="sm" shape="LeftNotch">SCAN</JButton>
  <JButton color="amber" size="sm">TRACK</JButton>
  <JButton color="red"   size="sm" shape="RightNotch">LOCK</JButton>
</div>
```

### Disabled and form submit

```tsx
<JButton color="cyan" disabled>OFFLINE</JButton>
<JButton type="submit" color="green" size="lg">SUBMIT REPORT</JButton>
```

## Notes

- Uses `clip-path: polygon(...)` — never add `border-radius`
- `'ghost'` color = transparent background, dim border — good for secondary/cancel actions
- Font is always `'Courier New', monospace` — don't override
- Letter-spacing is built in at `0.12em`
- `loading` disables the button and replaces label with `···` — no need to also set `disabled`
