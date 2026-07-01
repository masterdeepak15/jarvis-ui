# macOS OS Shell Layout

> Full component API: [JOSShell.md](JOSShell.md)

Use `theme="macos"` when building a macOS-style desktop — with a top menu bar, a bottom dock, and windows that have traffic-light close/minimize/maximize buttons.

---

## Minimal Setup

```tsx
import {
  JOSThemeProvider, JDesktop, JWindowManager,
  JDock, JMenuBar
} from '@masterdeepak15/jarvis-ui'

export function MacOSDesktop() {
  return (
    <JOSThemeProvider theme="macos">
      <JWindowManager>
        <JDesktop theme="macos" wallpaper="/wallpapers/monterey.jpg">
          <JMenuBar appName="Finder" menus={appMenus} />
          <JDock apps={dockApps} />
        </JDesktop>
      </JWindowManager>
    </JOSThemeProvider>
  )
}
```

---

## Visual Structure

```
┌─────────────────────────────────────────────────────────────┐
│ Apple  File  Edit  View  Window  Help       🔋 📶 🕐 👤     │
│                    JMenuBar (top, full-width)                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                     DESKTOP AREA                            │
│              JDesktop (wallpaper background)                │
│                                                             │
│     [JWindow floating]     [JWindow floating]               │
│     ← traffic-light btns                                    │
│                                                             │
│  [desktop icons: JDesktopIcon × N]                          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │   [  📁  📊  ⚙️  🌐  ]   |   [ 🗑️ ]              │   │
│  │              JDock (centered, bottom)                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## macOS Design Rules

**Menu bar is always at the top.** `JMenuBar` renders full-width at the top with `position: fixed`. Don't add a `JTaskbar`.

**Dock is at the bottom, centered.** `JDock` renders as a floating rounded shelf above the desktop edge. It auto-shows a hover zoom effect.

**Window traffic lights.** `JWindow` in macOS mode shows `●●●` (red/yellow/green) close/minimize/zoom buttons in the top-left corner, not a title-bar X button.

**Windows are draggable from the title bar** — same as Win11 via `JWindowManager`, but the chrome style differs.

**No taskbar.** macOS uses dock + menu bar only. Don't add `JTaskbar`.

---

## Registering Apps

```tsx
const apps: JDesktopApp[] = [
  {
    id:           'finder',
    label:        'Finder',
    icon:         '📁',
    defaultWidth:  720,
    defaultHeight: 480,
    content:      <JFileExplorer />,
  },
  {
    id:           'activity-monitor',
    label:        'Activity Monitor',
    icon:         '📊',
    defaultWidth:  760,
    defaultHeight: 540,
    content:      <JTaskManager />,
  },
  {
    id:           'system-preferences',
    label:        'System Preferences',
    icon:         '⚙️',
    defaultWidth:  820,
    defaultHeight: 560,
    content:      <JControlPanel />,
  },
]
```

The `icon` appears in the dock as an emoji — in a real macOS clone you'd use `<img>` asset paths instead.

---

## Menu Bar Configuration

```tsx
const appMenus = [
  {
    label: 'File',
    items: [
      { label: 'New Window', shortcut: '⌘N', onClick: openWindow },
      { label: 'Close',      shortcut: '⌘W', onClick: closeWindow },
      { separator: true },
      { label: 'Quit Finder', shortcut: '⌘Q', onClick: quit },
    ],
  },
  {
    label: 'View',
    items: [
      { label: 'as Icons',   onClick: () => setView('icons') },
      { label: 'as List',    onClick: () => setView('list')  },
      { label: 'as Gallery', onClick: () => setView('gallery') },
    ],
  },
]
```

---

## Notifications

```tsx
import { useJOSNotification } from '@masterdeepak15/jarvis-ui'

function MyApp() {
  const { notify } = useJOSNotification()

  return (
    <JButton
      label="Notify"
      onClick={() => notify({
        title:    'Software Update',
        message:  'macOS Sequoia 15.3 is available.',
        icon:     '⚙️',
        duration: 5000,
        theme:    'macos',
      })}
    />
  )
}
```

Notifications appear in the top-right corner (Notification Center style).

---

## CSS Token Namespace

macOS theme uses `--os-*` tokens on `[data-os-theme="macos"]`:

| Token | Value |
|---|---|
| `--os-bg` | `rgba(0,0,0,0.25)` (desktop overlay) |
| `--os-surface` | `rgba(40,40,40,0.75)` (window chrome, vibrancy) |
| `--os-surface-alt` | `rgba(58,58,58,0.85)` |
| `--os-border` | `rgba(255,255,255,0.1)` |
| `--os-text` | `#ffffff` |
| `--os-text-muted` | `rgba(255,255,255,0.55)` |
| `--os-accent` | `#0a84ff` (macOS blue) |
| `--os-menubar-h` | `28px` |
| `--os-dock-h` | `72px` |

---

## Checklist

- [ ] `JOSThemeProvider` wraps everything with `theme="macos"`
- [ ] `JWindowManager` is direct child of `JOSThemeProvider`
- [ ] `JDesktop` has `theme="macos"`
- [ ] `JMenuBar` renders at top with `appName` + `menus`
- [ ] `JDock` renders at bottom with `apps` array
- [ ] All apps declared in `JDesktopApp[]` with `id`, `label`, `icon`, `defaultWidth`, `defaultHeight`, `content`
- [ ] `JOSNotificationProvider` in the tree if notifications are used
- [ ] No `JTaskbar` or `JStartMenu` (those are Windows 11 components)
