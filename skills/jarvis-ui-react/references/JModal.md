# JModal

Overlay modal dialog with title, content area, and optional footer.

## Import

```tsx
import { JModal } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controls visibility (required) |
| `onClose` | `() => void` | — | Called when user closes (required) |
| `title` | `string` | — | Modal header text (required) |
| `subTitle` | `string` | — | Small label above the title |
| `closable` | `boolean` | `true` | Show × close button |
| `closeOnBackdrop` | `boolean` | `true` | Close when clicking the backdrop |
| `width` | `string` | `'480px'` | Dialog width (CSS string) |
| `notchSize` | `string` | `'18px'` | Corner notch size |
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
  <JAlert state="warning" title="CONNECTION UNSTABLE">
    Radar feed degraded to 43% signal strength. Manual verification required.
  </JAlert>
  <div style={{ marginTop: 12 }}>
    <JButton color="amber" onClick={() => setAlertOpen(false)}>ACKNOWLEDGE</JButton>
  </div>
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
      <JButton color="red"   onClick={() => { deleteRecord(); setDangerOpen(false) }}>DELETE</JButton>
      <JButton color="ghost" onClick={() => setDangerOpen(false)}>ABORT</JButton>
    </div>
  }
>
  <JAlert state="error" title="IRREVERSIBLE">
    This will permanently delete the record.
  </JAlert>
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
    <JProgress value={unit.health} label="HEALTH" />
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
- `closeOnBackdrop={false}` is useful for required-action dialogs that can't be dismissed
- The modal uses `createPortal` — it renders directly in `document.body`, outside your React tree

## Known Limits

**No max-height, no internal scroll.** `JModal` has `overflow: hidden` on the dialog container and no `maxHeight` set. If your body content is taller than the viewport, it will overflow the screen with no scrollbar — the bottom gets cut off and there is no way to reach it.

For tall content (long data tables, multi-section forms, image+details views), wrap the body in a scrollable container yourself:

```tsx
<JModal open={open} onClose={onClose} title="UNIT RECORDS">
  <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: 4 }}>
    {/* tall content here */}
  </div>
</JModal>
```

`60vh` leaves room for the header, footer, and viewport breathing space. Adjust as needed.
