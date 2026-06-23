# JFormField

Form field wrapper that adds label, hint text, and error message around any input component.

## Import

```tsx
import { JFormField } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label (rendered above the input) |
| `hint` | `string` | — | Helper text below the input |
| `error` | `string` | — | Error message (shown in red below input; overrides hint) |
| `children` | `ReactNode` | — | The input component to wrap |

## Use Cases

### Basic field with label

```tsx
<JFormField label="CALL SIGN">
  <JInput value={v} onChange={setV} placeholder="Enter callsign..." />
</JFormField>
```

### With hint text

```tsx
<JFormField label="COORDINATES" hint="Format: Lat, Lng (decimal degrees)">
  <JInput value={coords} onChange={setCoords} placeholder="28.6139, 77.2090" />
</JFormField>
```

### With validation error

```tsx
const [target, setTarget] = useState('')
const [err, setErr]       = useState<string | undefined>()

<JFormField label="TARGET ID" error={err}>
  <JInput
    value={target}
    onChange={v => { setTarget(v); setErr(undefined) }}
    error={!!err}
    placeholder="TGT-000"
  />
</JFormField>

<JButton color="cyan" onClick={() => {
  if (!target) setErr('Required — enter a valid target ID')
}}>
  VALIDATE
</JButton>
```

### Full form with validation

```tsx
const [form, setForm] = useState({ id: '', zone: '', notes: '' })
const [errors, setErrors] = useState<Record<string, string>>({})

function validate() {
  const e: Record<string, string> = {}
  if (!form.id)    e.id    = 'Unit ID is required'
  if (!form.zone)  e.zone  = 'Zone must be selected'
  setErrors(e)
  return Object.keys(e).length === 0
}

<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
  <JFormField label="UNIT ID" error={errors.id}>
    <JInput value={form.id} onChange={v => setForm(f => ({ ...f, id: v }))} error={!!errors.id} />
  </JFormField>

  <JFormField label="ZONE" error={errors.zone}>
    <JSelect value={form.zone} onChange={v => setForm(f => ({ ...f, zone: v }))} options={zoneOptions} />
  </JFormField>

  <JFormField label="MISSION NOTES" hint="Optional — max 500 characters">
    <JTextArea value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} rows={4} />
  </JFormField>

  <JButton color="cyan" onClick={() => validate() && submitForm(form)}>SUBMIT</JButton>
</div>
```

### Wrapping any input type

```tsx
// Works with JInput, JTextArea, JSelect, JSlider, JDatePicker, etc.
<JFormField label="ALERT LEVEL">
  <JSelect value={level} onChange={setLevel} options={levelOptions} />
</JFormField>

<JFormField label="SIGNAL GAIN" hint="0–100%">
  <JSlider value={gain} onChange={setGain} min={0} max={100} />
</JFormField>
```

## Notes

- `error` overrides `hint` when both are provided — show only one at a time
- Pass `error={!!errorString}` on the input itself for the red border, and `error={errorString}` on `JFormField` for the message
- Does not manage state — just a visual wrapper
