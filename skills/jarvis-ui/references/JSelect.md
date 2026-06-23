# JSelect

HUD-styled custom dropdown select.

## Import

```tsx
import { JSelect } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Selected value |
| `onChange` | `(v: string) => void` | — | Change handler |
| `options` | `{ value: string; label: string }[]` | — | List of options |
| `color` | `JColor` | `'cyan'` | Accent color |
| `disabled` | `boolean` | `false` | Disabled state |
| `placeholder` | `string` | — | Placeholder text when no value |

## Use Cases

### Basic select

```tsx
const [sector, setSector] = useState('alpha')

<JSelect
  value={sector}
  onChange={setSector}
  options={[
    { value: 'alpha',   label: 'ALPHA SECTOR' },
    { value: 'bravo',   label: 'BRAVO SECTOR' },
    { value: 'charlie', label: 'CHARLIE SECTOR' },
  ]}
/>
```

### Filter select (with empty "All" option)

```tsx
const [status, setStatus] = useState('')

<JSelect
  value={status}
  onChange={setStatus}
  options={[
    { value: '',        label: 'ALL STATUSES' },
    { value: 'active',  label: 'Active' },
    { value: 'warning', label: 'Warning' },
    { value: 'error',   label: 'Error' },
    { value: 'offline', label: 'Offline' },
  ]}
/>
```

### Color variants

```tsx
<JSelect value={v} onChange={setV} options={opts} color="cyan"  />
<JSelect value={v} onChange={setV} options={opts} color="amber" />
<JSelect value={v} onChange={setV} options={opts} color="green" />
```

### Disabled

```tsx
<JSelect
  value="locked"
  onChange={() => {}}
  disabled
  options={[{ value: 'locked', label: 'SYSTEM LOCKED' }]}
/>
```

### With JFormField

```tsx
<JFormField label="OPERATIONAL ZONE">
  <JSelect value={zone} onChange={setZone} options={zoneOptions} />
</JFormField>
```

### Page-size selector

```tsx
const [pageSize, setPageSize] = useState('10')

<JSelect
  value={pageSize}
  onChange={setPageSize}
  options={['5','10','20','50'].map(n => ({ value: n, label: `${n} / PAGE` }))}
/>
```

## Notes

- Controlled component — always pass `value` + `onChange`
- Empty string `''` value is valid and useful for "all / none selected" states
- Uses native `<select>` under the hood with custom styling
