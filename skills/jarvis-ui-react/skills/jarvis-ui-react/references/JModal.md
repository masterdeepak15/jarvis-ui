# JModal

Overlay modal dialog with title, content area, and optional footer.

## Import

```tsx
import { JModal } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controls visibility |
| `onClose` | `() => void` | — | Called when user closes |
| `title` | `string` | — | Modal header text |
| `children` | `ReactNode` | — | Modal body content |
| `footer` | `ReactNode` | — | Footer content (buttons) |

## Use Cases

### Basic confirm dialog

```tsx
const [open, setOpen] = useState(false)

<JButton color="amber" onClick={() => setOpen(true)}>CONFIRM ACTION</JButton>

<JModal
  open={open}
  onClose={() => setOpen(false)}
  title="CONFIRM OPERATION"
  footer={
    <div style={{ display: 'flex', gap: 8 }}>
      <JButton color="cyan"  onClick={() => { executeAction(); setOpen(false) }}>CONFIRM</JButton>
      <JButton color="ghost" onClick={() => setOpen(false)}>CANCEL</JButton>
    </div>
  }
>
  <p style={{ color: 'var(--j-text-primary)', fontSize: 11 }}>
    Are you sure you want to proceed? This action cannot be undone.
  </p>
</JModal>
```

### Alert modal with JAlert inside

```tsx
<JModal open={alertOpen} onClose={() => setAlertOpen(false)} title="SYSTEM WARNING">
  <JAlert
    state="warning"
    title="CONNECTION UNSTABLE"
    message="Radar feed degraded to 43% signal strength. Manual verification required."
  />
  <JButton color="amber" onClick={() => setAlertOpen(false)} style={{ marginTop: 12 }}>
    ACKNOWLEDGE
  </JButton>
</JModal>
```

### Danger / destructive action modal

```tsx
const [dangerOpen, setDangerOpen] = useState(false)

<JButton color="red" onClick={() => setDangerOpen(true)}>DELETE RECORD</JButton>

<JModal
  open={dangerOpen}
  onClose={() => setDangerOpen(false)}
  title="⚠ PERMANENT DELETE"
  footer={
    <div style={{ display: 'flex', gap: 8 }}>
      <JButton color="red"   onClick={() => { deleteRecord(); setDangerOpen(false) }}>
        DELETE
      </JButton>
      <JButton color="ghost" onClick={() => setDangerOpen(false)}>ABORT</JButton>
    </div>
  }
>
  <JAlert state="error" title="IRREVERSIBLE" message="This will permanently delete the record." />
</JModal>
```

### Detail / info modal

```tsx
<JModal open={detailOpen} onClose={() => setDetailOpen(false)} title={`UNIT DETAIL — ${unit.id}`}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <JDataRow label="DEVICE ID"  value={unit.id} />
    <JDataRow label="STATUS"     value={unit.status} state={unit.status === 'Online' ? 'active' : 'error'} />
    <JDataRow label="LOCATION"   value={unit.location} />
    <JDataRow label="LAST SEEN"  value={unit.lastSeen} />
    <JProgress value={unit.health} max={100} color="cyan" showLabel />
  </div>
</JModal>
```

### Form modal

```tsx
<JModal
  open={formOpen}
  onClose={() => setFormOpen(false)}
  title="ADD NEW UNIT"
  footer={
    <div style={{ display: 'flex', gap: 8 }}>
      <JButton color="cyan" type="submit" onClick={handleSubmit}>SAVE</JButton>
      <JButton color="ghost" onClick={() => setFormOpen(false)}>CANCEL</JButton>
    </div>
  }
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <JFormField label="UNIT ID">
      <JInput value={id} onChange={setId} placeholder="CCTV-000" />
    </JFormField>
    <JFormField label="LOCATION">
      <JSelect value={loc} onChange={setLoc} options={locationOptions} />
    </JFormField>
  </div>
</JModal>
```

## Notes

- `open` is fully controlled — the modal doesn't close itself
- `onClose` is called when clicking the backdrop or the × button
- `footer` renders in a dedicated section below the body — use for action buttons
- Clicking outside the modal (backdrop) triggers `onClose`
- Content scrolls if it overflows the modal height
