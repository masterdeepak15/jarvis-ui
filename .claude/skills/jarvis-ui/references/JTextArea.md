# JTextArea

HUD-styled multi-line text input.

## Import

```tsx
import { JTextArea } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value |
| `onChange` | `(v: string) => void` | — | Change handler |
| `placeholder` | `string` | — | Placeholder text |
| `rows` | `number` | `4` | Number of visible rows |
| `color` | `JColor` | `'cyan'` | Accent color |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `boolean` | `false` | Error highlight state |
| `readOnly` | `boolean` | `false` | Read-only state |

## Use Cases

### Basic textarea

```tsx
const [notes, setNotes] = useState('')

<JTextArea
  value={notes}
  onChange={setNotes}
  placeholder="Enter mission briefing..."
  rows={5}
/>
```

### Color variants

```tsx
<JTextArea value={v} onChange={setV} color="cyan"  rows={3} placeholder="CYAN" />
<JTextArea value={v} onChange={setV} color="amber" rows={3} placeholder="AMBER" />
```

### Read-only intelligence report

```tsx
<JTextArea
  value="CLASSIFIED: Grid ref 28.6N 77.2E. Assets confirmed. Proceed with caution."
  onChange={() => {}}
  readOnly
  rows={4}
  color="amber"
/>
```

### Error state with form field

```tsx
<JFormField label="MISSION NOTES" error={!notes ? 'Notes required' : undefined}>
  <JTextArea
    value={notes}
    onChange={setNotes}
    error={!notes}
    rows={4}
    placeholder="Enter mission briefing..."
  />
</JFormField>
```

### Character counter

```tsx
const MAX = 500
<div>
  <JTextArea value={text} onChange={setText} rows={5} placeholder="Situation report..." />
  <div style={{ fontSize: 8, color: 'var(--j-text-muted)', textAlign: 'right', marginTop: 4 }}>
    {text.length} / {MAX}
  </div>
</div>
```

## Notes

- Controlled component — always pass `value` + `onChange`
- `rows` controls height; component does not auto-resize
- Pair with `JFormField` for labels, hints, and error messages
