# JRadio

HUD-styled radio button for mutually exclusive selection.

## Import

```tsx
import { JRadio } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Radio group name (shared across all options) |
| `value` | `string` | — | This option's value |
| `checked` | `boolean` | — | Whether this option is selected |
| `onChange` | `(v: string) => void` | — | Called with this option's `value` when selected |
| `label` | `string` | — | Display label |
| `color` | `JColor` | `'cyan'` | Accent color |
| `disabled` | `boolean` | `false` | Disabled state |

## Use Cases

### Alert level selector

```tsx
const [level, setLevel] = useState('level2')

{[
  { value: 'level1', label: 'LEVEL 1 — LOW',      color: 'green' },
  { value: 'level2', label: 'LEVEL 2 — MODERATE', color: 'cyan'  },
  { value: 'level3', label: 'LEVEL 3 — HIGH',     color: 'amber' },
  { value: 'level4', label: 'LEVEL 4 — CRITICAL', color: 'red'   },
].map(opt => (
  <JRadio
    key={opt.value}
    name="alert-level"
    value={opt.value}
    label={opt.label}
    color={opt.color as JColor}
    checked={level === opt.value}
    onChange={setLevel}
  />
))}
```

### Mode selector

```tsx
const [mode, setMode] = useState('auto')

<div style={{ display: 'flex', gap: 16 }}>
  {['auto', 'manual', 'standby'].map(m => (
    <JRadio
      key={m}
      name="op-mode"
      value={m}
      label={m.toUpperCase()}
      checked={mode === m}
      onChange={setMode}
    />
  ))}
</div>
```

### With JFormField wrapper

```tsx
<JFormField label="PRIORITY LEVEL">
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
    {priorities.map(p => (
      <JRadio
        key={p.value}
        name="priority"
        value={p.value}
        label={p.label}
        checked={selected === p.value}
        onChange={setSelected}
        color={p.color}
      />
    ))}
  </div>
</JFormField>
```

## Notes

- All radios in a group must share the same `name` prop
- The `onChange` callback receives this option's `value` string
- Controlled — always pass `checked` using `selected === opt.value` pattern
- For non-exclusive booleans, use `JCheckbox` instead
