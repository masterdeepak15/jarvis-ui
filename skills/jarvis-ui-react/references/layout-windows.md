# Windows 11 OS Shell Layout

> Full component API: [JOSShell.md](JOSShell.md)

Use `theme="windows11"` when building a Windows 11-style desktop environment — with a centered taskbar, frosted-glass start menu, and draggable app windows.

---

## Minimal Setup

```tsx
import {
  JOSThemeProvider, JDesktop, JWindowManager,
  JTaskbar, JStartMenu
} from '@masterdeepak15/jarvis-ui'

export function Win11Desktop() {
  return (
    <JOSThemeProvider theme="windows11">
      <JWindowManager>
        <JDesktop theme="windows11" wallpaper="/wallpapers/win11.jpg">
          <JTaskbar position="bottom" centered apps={taskbarApps} />
          <JStartMenu apps={allApps} />
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
│                                                             │
│                     DESKTOP AREA                            │
│            JDesktop (wallpaper background)                  │
│                                                             │
│     [JWindow floating]     [JWindow floating]               │
│                                                             │
│  [desktop icons: JDesktopIcon × N]                          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│         [  ⊞  ⌕  🌐   [ pinned apps ]   🔔 ⏰ ]            │
│                   JTaskbar (centered, bottom)               │
└─────────────────────────────────────────────────────────────┘
        ↑ JStartMenu pops above taskbar on click
```

---

## Windows 11 Design Rules

**Taskbar is centered and at the bottom.** Use `position="bottom"` and `centered={true}`.

**Windows have frosted glass** — `JWindow` automatically applies `backdrop-filter: blur(12px)` and `background: rgba(32,32,32,0.85)` in Win11 mode. Don't override.

**Start menu pops from center-bottom.** `JStartMenu` renders above the taskbar — no placement needed.

**App windows tile left/right on snap.** `JWindowManager` handles snap zones; apps declare `defaultWidth`/`defaultHeight` in `JDesktopApp`.

**No dock.** Win11 uses taskbar only. Don't add `JDock`.

---

## Registering Apps

```tsx
const apps: JDesktopApp[] = [
  {
    id:           'file-explorer',
    label:        'File Explorer',
    icon:         '📁',
    defaultWidth:  680,
    defaultHeight: 460,
    content:      <JFileExplorer />,
  },
  {
    id:           'task-manager',
    label:        'Task Manager',
    icon:         '📊',
    defaultWidth:  720,
    defaultHeight: 520,
    content:      <JTaskManager />,
  },
  {
    id:           'settings',
    label:        'Settings',
    icon:         '⚙️',
    defaultWidth:  840,
    defaultHeight: 560,
    content:      <JControlPanel />,
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
      label="Send Notification"
      onClick={() => notify({
        title:    'Update Available',
        message:  'Windows 11 version 24H2 is ready to install.',
        icon:     '⊞',
        duration: 5000,
        theme:    'windows11',
      })}
    />
  )
}
```

Notifications appear in the bottom-right corner as Win11-style toast cards.

---

## CSS Token Namespace

Windows 11 theme uses `--os-*` tokens on the `[data-os-theme="windows11"]` root:

| Token | Value |
|---|---|
| `--os-bg` | `rgba(0,0,0,0.4)` (desktop overlay) |
| `--os-surface` | `rgba(32,32,32,0.85)` (window chrome) |
| `--os-surface-alt` | `rgba(48,48,48,0.9)` (hover state) |
| `--os-border` | `rgba(255,255,255,0.08)` |
| `--os-text` | `#ffffff` |
| `--os-text-muted` | `rgba(255,255,255,0.6)` |
| `--os-accent` | `#0067c0` (Win11 blue) |
| `--os-taskbar-h` | `48px` |

---

## Checklist

- [ ] `JOSThemeProvider` wraps everything with `theme="windows11"`
- [ ] `JWindowManager` is direct child of `JOSThemeProvider`
- [ ] `JDesktop` has `theme="windows11"`
- [ ] `JTaskbar` has `position="bottom"` and `centered={true}`
- [ ] All apps declared in `JDesktopApp[]` with `id`, `label`, `icon`, `defaultWidth`, `defaultHeight`, `content`
- [ ] `JOSNotificationProvider` in the tree if notifications are used
- [ ] No `JDock` or `JMenuBar` (those are macOS components)
