# JInput

HUD-styled single-line text input.

## Import

```tsx
import { JInput } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value |
| `onChange` | `(v: string) => void` | — | Change handler |
| `placeholder` | `string` | — | Placeholder text |
| `type` | `'text'`\|`'password'`\|`'number'`\|`'email'` | `'text'` | Input type |
| `color` | `JColor` | `'cyan'` | Accent color |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `boolean` | `false` | Error highlight state |
| `readOnly` | `boolean` | `false` | Read-only state |

## Use Cases

### Basic controlled input

```tsx
const [callsign, setCallsign] = useState('')

<JInput
  value={callsign}
  onChange={setCallsign}
  placeholder="Enter callsign..."
/>
```

### Password input

```tsx
const [code, setCode] = useState('')

<JInput
  type="password"
  value={code}
  onChange={setCode}
  placeholder="Access code..."
/>
```

### Color variants

```tsx
<JInput value={v} onChange={setV} color="cyan"  placeholder="CYAN (default)" />
<JInput value={v} onChange={setV} color="amber" placeholder="AMBER" />
<JInput value={v} onChange={setV} color="green" placeholder="GREEN" />
<JInput value={v} onChange={setV} color="red"   placeholder="RED" />
```

### States

```tsx
// Error state (red border highlight)
<JInput value={v} onChange={setV} error placeholder="Required field..." />

// Disabled
<JInput value="NH-90-CTRL-001" onChange={() => {}} disabled />

// Read-only
<JInput value="CLASSIFIED" onChange={() => {}} readOnly />
```

### With JFormField wrapper (recommended for forms)

```tsx
<JFormField label="CALL SIGN" error={hasError ? 'Required field' : undefined}>
  <JInput
    value={value}
    onChange={setValue}
    error={hasError}
    placeholder="Enter call sign..."
  />
</JFormField>
```

## Notes

- Always pass both `value` and `onChange` (controlled component)
- `error` prop adds red border — pair with `JFormField` error prop for the error message
- Font is always `'Courier New', monospace`
