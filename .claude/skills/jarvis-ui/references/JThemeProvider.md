# JThemeProvider · JThemePicker · useTheme

Root theme system. Wraps the entire app, provides CSS custom properties, and exposes `useTheme()` hook.

## Import

```tsx
import { JThemeProvider, JThemePicker, useTheme } from '@masterdeepak15/jarvis-ui'
```

## JThemeProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `preset` | `JThemePreset` | `'cyan'` | Initial color preset |
| `children` | `ReactNode` | — | App content |

`JThemePreset`: `'cyan'` | `'amber'` | `'green'` | `'red'` | `'purple'` | `'white'`

## JThemePicker

No props — floating color-scheme switcher, renders a pill of 6 preset buttons.

## useTheme Hook

```tsx
const { preset, setPreset } = useTheme()
```

| Field | Type | Description |
|-------|------|-------------|
| `preset` | `JThemePreset` | Current active preset |
| `setPreset` | `(p: JThemePreset) => void` | Switch to a new preset |

## Use Cases

### Basic app setup

```tsx
// main.tsx
import '@masterdeepak15/jarvis-ui/styles'
import { JThemeProvider } from '@masterdeepak15/jarvis-ui'

ReactDOM.render(
  <JThemeProvider preset="cyan">
    <App />
  </JThemeProvider>,
  document.getElementById('root')
)
```

### Runtime theme switching

```tsx
import { useTheme, JButton } from '@masterdeepak15/jarvis-ui'

function ThemeSwitcher() {
  const { preset, setPreset } = useTheme()
  const presets = ['cyan', 'amber', 'green', 'red', 'purple'] as const
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {presets.map(p => (
        <JButton
          key={p}
          size="sm"
          color={preset === p ? 'cyan' : 'ghost'}
          onClick={() => setPreset(p)}
        >
          {p.toUpperCase()}
        </JButton>
      ))}
    </div>
  )
}
```

### Floating picker

```tsx
// Drop anywhere inside JThemeProvider — shows 6 preset swatches
<JThemePicker />
```

## Notes

- Must be at the root — all other components must be inside `JThemeProvider`
- `useTheme()` throws if called outside `JThemeProvider`
- Theme change injects updated `--j-*` CSS custom properties on `:root`
- Preset `'white'` is the light/bright variant — use for light mode
