# JCommandPalette

Spotlight-style command palette with fuzzy search and grouped commands. Opens with Ctrl+K or programmatically.

## Import

```tsx
import { JCommandPalette } from '@masterdeepak15/jarvis-ui'
import type { JCommand } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | — | Controls palette visibility |
| `onClose` | `() => void` | — | Called when palette closes |
| `commands` | `JCommand[]` | — | List of available commands |
| `onExecute` | `(cmd: JCommand) => void` | — | Called with selected command |
| `placeholder` | `string` | `'Search commands...'` | Input placeholder |

## JCommand Type

```tsx
type JCommand = {
  key:    string   // unique command identifier
  label:  string   // display text
  group?: string   // group header (e.g. 'Navigate', 'Actions')
  icon?:  string   // icon/emoji before the label
  hint?:  string   // secondary hint text (shortcut, description)
}
```

## Use Cases

### Basic command palette with Ctrl+K

```tsx
const [open, setOpen] = useState(false)

// Listen for Ctrl+K globally
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      setOpen(true)
    }
  }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [])

const commands: JCommand[] = [
  { key: 'nav-dash',     label: 'Go to Dashboard',    group: 'Navigate', icon: '⊞' },
  { key: 'nav-map',      label: 'Go to Tactical Map', group: 'Navigate', icon: '🌐' },
  { key: 'nav-data',     label: 'Go to Data Table',   group: 'Navigate', icon: '▣' },
  { key: 'action-scan',  label: 'Start Radar Scan',   group: 'Actions',  icon: '📡' },
  { key: 'action-alert', label: 'Send Alert',         group: 'Actions',  icon: '🚨' },
  { key: 'theme-cyan',   label: 'Theme: Cyan',        group: 'Theme',    icon: '🎨' },
  { key: 'theme-amber',  label: 'Theme: Amber',       group: 'Theme',    icon: '🎨' },
]

function handleCommand(cmd: JCommand) {
  setOpen(false)
  switch (cmd.key) {
    case 'nav-dash':     setPage('dashboard'); break
    case 'nav-map':      setPage('map');       break
    case 'action-scan':  startScan();          break
    case 'theme-cyan':   setPreset('cyan');    break
    case 'theme-amber':  setPreset('amber');   break
  }
}

<>
  <JButton size="sm" color="ghost" onClick={() => setOpen(true)}>
    ⌨ CTRL+K
  </JButton>

  <JCommandPalette
    visible={open}
    onClose={() => setOpen(false)}
    commands={commands}
    onExecute={handleCommand}
    placeholder="Search commands..."
  />
</>
```

### Full app with search + navigation

```tsx
const ALL_COMMANDS: JCommand[] = [
  // Navigate
  { key: 'go-dashboard',  group: 'Navigate', icon: '⊞', label: 'Dashboard' },
  { key: 'go-map',        group: 'Navigate', icon: '🌐', label: 'Tactical Map' },
  { key: 'go-intel',      group: 'Navigate', icon: '⚡', label: 'Intelligence' },
  { key: 'go-comms',      group: 'Navigate', icon: '📡', label: 'Communications' },
  { key: 'go-settings',   group: 'Navigate', icon: '⚙', label: 'Settings' },
  // Actions
  { key: 'scan-area',     group: 'Actions',  icon: '🔍', label: 'Scan Current Area' },
  { key: 'send-alert',    group: 'Actions',  icon: '🚨', label: 'Broadcast Alert' },
  { key: 'export-report', group: 'Actions',  icon: '📄', label: 'Export Mission Report' },
  { key: 'lock-zone',     group: 'Actions',  icon: '🔒', label: 'Lock Operational Zone' },
  // Theme
  { key: 'theme-cyan',    group: 'Theme',    icon: '🎨', label: 'Switch to Cyan' },
  { key: 'theme-amber',   group: 'Theme',    icon: '🎨', label: 'Switch to Amber' },
  { key: 'theme-green',   group: 'Theme',    icon: '🎨', label: 'Switch to Green' },
]
```

### Dynamic commands from data

```tsx
// Generate commands from a list of units
const unitCommands: JCommand[] = units.map(unit => ({
  key:   `view-${unit.id}`,
  label: `View ${unit.id} — ${unit.location}`,
  group: 'Units',
  icon:  unit.status === 'Online' ? '🟢' : '🔴',
}))

const commands = [...staticCommands, ...unitCommands]
```

## Notes

- Fuzzy search filters by `label` and `group` as you type
- Commands are grouped under their `group` header in the list
- `onExecute` fires and the palette does NOT auto-close — call `onClose()` inside your handler
- Works best with 5–50 commands — beyond that, grouping and search are critical
- Mount at the app root level (inside `JToastProvider` if you use toasts in handlers)
