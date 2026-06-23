# JToastProvider · useToast

Toast notification system. Provider wraps the app; hook dispatches toasts from anywhere.

## Import

```tsx
import { JToastProvider, useToast } from '@masterdeepak15/jarvis-ui'
```

## Setup

Add `JToastProvider` inside `JThemeProvider`, typically at the app root:

```tsx
<JThemeProvider preset="cyan">
  <JToastProvider>
    <App />
  </JToastProvider>
</JThemeProvider>
```

## useToast Hook

```tsx
const { toast } = useToast()
```

### toast() Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | — | Toast headline (required) |
| `message` | `string` | — | Optional body text |
| `state` | `JState` | `'active'` | Color state |
| `duration` | `number` | `3000` | Auto-dismiss in ms |

`JState`: `'active'` | `'warning'` | `'error'` | `'success'`

## Use Cases

### Basic toasts

```tsx
const { toast } = useToast()

toast({ title: 'SCAN COMPLETE' })
toast({ title: 'CONNECTION LOST',    state: 'error'   })
toast({ title: 'LOW BATTERY',        state: 'warning' })
toast({ title: 'MISSION CONFIRMED',  state: 'success' })
```

### With message body

```tsx
toast({
  title:   'UNIT OFFLINE',
  message: 'CCTV-005 has not responded for 5 minutes.',
  state:   'error',
})
```

### Custom duration

```tsx
// Show for 6 seconds
toast({ title: 'PROCESSING...', state: 'warning', duration: 6000 })

// Show for only 1.5 seconds
toast({ title: 'SAVED', state: 'success', duration: 1500 })
```

### On button click

```tsx
function ActionButton() {
  const { toast } = useToast()

  return (
    <JButton
      color="cyan"
      onClick={() => {
        executeScan()
        toast({ title: 'RADAR SCAN STARTED', state: 'active' })
      }}
    >
      START SCAN
    </JButton>
  )
}
```

### After async operations

```tsx
const { toast } = useToast()

async function saveRecord() {
  try {
    await api.save(formData)
    toast({ title: 'RECORD SAVED', state: 'success' })
  } catch (err) {
    toast({ title: 'SAVE FAILED', message: err.message, state: 'error' })
  }
}
```

### In radial menu items

```tsx
<JRadialMenu open={open} onOpenChange={setOpen} triggerLabel="QUICK ACT">
  <JRadialItem
    icon="🚨"
    label="Send Alert"
    angle={0}
    color="red"
    onClick={() => {
      dispatchAlert()
      toast({ title: 'ALERT SENT', state: 'error' })
      setOpen(false)
    }}
  />
  <JRadialItem
    icon="✅"
    label="Confirm OK"
    angle={180}
    color="green"
    onClick={() => {
      confirmClear()
      toast({ title: 'AREA CLEARED', state: 'success' })
      setOpen(false)
    }}
  />
</JRadialMenu>
```

## Notes

- `JToastProvider` must be in the tree above any component calling `useToast()`
- Multiple toasts stack and auto-dismiss
- `useToast()` throws if called outside `JToastProvider`
- Toast position is fixed by the provider — typically bottom-right or top-right
- `state` maps to colors: `active`→cyan, `warning`→amber, `error`→red, `success`→green
