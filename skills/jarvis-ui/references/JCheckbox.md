# JCheckbox

HUD-styled animated checkbox.

## Import

```tsx
import { JCheckbox } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Checked state |
| `onChange` | `(v: boolean) => void` | — | Change handler |
| `label` | `string` | — | Label text |
| `color` | `JColor` | `'cyan'` | Accent color |
| `disabled` | `boolean` | `false` | Disabled state |

## Use Cases

### Basic checkbox

```tsx
const [radar, setRadar] = useState(true)

<JCheckbox checked={radar} onChange={setRadar} label="ENABLE RADAR" />
```

### Color-coded checklist

```tsx
const [items, setItems] = useState({
  radar: true, comms: false, nightmode: true, armament: false,
})

const toggle = (k: keyof typeof items) =>
  setItems(s => ({ ...s, [k]: !s[k] }))

<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  <JCheckbox checked={items.radar}     onChange={() => toggle('radar')}     label="RADAR ACTIVE"   color="cyan"  />
  <JCheckbox checked={items.comms}     onChange={() => toggle('comms')}     label="COMMS ONLINE"   color="green" />
  <JCheckbox checked={items.nightmode} onChange={() => toggle('nightmode')} label="NIGHT MODE"     color="amber" />
  <JCheckbox checked={items.armament}  onChange={() => toggle('armament')}  label="ARMED"          color="red"   />
</div>
```

### Pre-flight checklist

```tsx
const checks = [
  { id: 'fuel',   label: 'FUEL LEVEL OK'     },
  { id: 'comms',  label: 'COMMS VERIFIED'    },
  { id: 'nav',    label: 'NAV SYSTEM READY'  },
  { id: 'weapon', label: 'WEAPON SAFE'       },
]
const [done, setDone] = useState<string[]>([])

const toggle = (id: string) =>
  setDone(d => d.includes(id) ? d.filter(x => x !== id) : [...d, id])

<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  {checks.map(c => (
    <JCheckbox
      key={c.id}
      checked={done.includes(c.id)}
      onChange={() => toggle(c.id)}
      label={c.label}
      color="green"
    />
  ))}
  <JBadge color={done.length === checks.length ? 'green' : 'amber'}>
    {done.length}/{checks.length} COMPLETE
  </JBadge>
</div>
```

### Disabled

```tsx
<JCheckbox checked={true} onChange={() => {}} label="SYSTEM REQUIRED" disabled />
```

## Notes

- Controlled component — always pass `checked` + `onChange`
- Renders a checkmark animation on check
- For mutually exclusive options, use `JRadio` instead
