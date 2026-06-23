# JToggle

HUD-styled on/off toggle switch.

## Import

```tsx
import { JToggle } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Toggle state |
| `onChange` | `(v: boolean) => void` | — | Change handler |
| `label` | `string` | — | Label text beside toggle |
| `color` | `JColor` | `'cyan'` | Accent color when on |
| `disabled` | `boolean` | `false` | Disabled state |

## Use Cases

### Basic toggle

```tsx
const [nightVision, setNightVision] = useState(false)

<JToggle
  checked={nightVision}
  onChange={setNightVision}
  label="NIGHT VISION"
/>
```

### Color variants (status-coded toggles)

```tsx
<JToggle checked={radar}   onChange={setRadar}   label="RADAR SWEEP"  color="cyan"  />
<JToggle checked={warning} onChange={setWarning} label="AUTO LOCK"    color="amber" />
<JToggle checked={safe}    onChange={setSafe}    label="SAFE MODE"    color="green" />
<JToggle checked={armed}   onChange={setArmed}   label="ARMED"        color="red"   />
```

### System settings grid

```tsx
const [settings, setSettings] = useState({
  radar: true, nvision: false, jamming: false, autolock: true,
})

function toggle(key: keyof typeof settings) {
  setSettings(s => ({ ...s, [key]: !s[key] }))
}

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
  <JToggle checked={settings.radar}    onChange={() => toggle('radar')}    label="RADAR"      />
  <JToggle checked={settings.nvision}  onChange={() => toggle('nvision')}  label="NIGHT MODE" color="green" />
  <JToggle checked={settings.jamming}  onChange={() => toggle('jamming')}  label="JAMMING"    color="amber" />
  <JToggle checked={settings.autolock} onChange={() => toggle('autolock')} label="AUTO LOCK"  color="red"   />
</div>
```

### Disabled toggles

```tsx
<JToggle checked={true}  onChange={() => {}} label="COMMS ACTIVE (LOCKED)" disabled />
<JToggle checked={false} onChange={() => {}} label="OFFLINE MODE (LOCKED)" disabled />
```

## Notes

- Controlled component — always pass `checked` + `onChange`
- `color` applies only when toggle is ON; OFF state is always dim/gray
- `label` appears to the right of the toggle
