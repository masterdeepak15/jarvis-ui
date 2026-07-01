# OS Shell Kit

Windows 11 / macOS themed OS-shell components. Build web UIs that look like a desktop operating system — with draggable/resizable windows, taskbar or dock, desktop icon grid, and pre-built OS app shells.

## Import

```tsx
import {
  JDesktop,
  JOSThemeProvider, useOSTheme,
  JWindowManager, useWindowManager,
  JWindow,
  JTaskbar, JStartMenu,
  JDock, JMenuBar,
  JOSNotificationProvider, useOSNotify,
  JFileExplorer,
  JTaskManager,
  JControlPanel,
} from '@masterdeepak15/jarvis-ui'
```

---

## Quick Start

The simplest usage: one `JDesktop` call renders everything.

```tsx
import { JDesktop } from '@masterdeepak15/jarvis-ui'

const apps = [
  {
    id: 'files',
    icon: '📁',
    label: 'Files',
    component: <JFileExplorer tree={myTree} />,
  },
  {
    id: 'tasks',
    icon: '📊',
    label: 'Task Manager',
    component: <JTaskManager processes={myProcesses} onKill={handleKill} />,
  },
]

export function MyDesktop() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <JDesktop theme="windows11" apps={apps} />
    </div>
  )
}
```

For macOS theme, pass `theme="macos"`. The components automatically switch title bar style, dock vs. taskbar, and menu bar.

---

## JDesktop

All-in-one desktop component. Renders `JOSThemeProvider` + `JWindowManager` internally. Use this when you want the simplest setup and don't need to share window state outside the desktop.

```tsx
interface JDesktopApp {
  id:            string
  icon:          string       // emoji
  label:         string
  component:     ReactNode    // app content shown inside the window
  defaultWidth?: number       // default 640
  defaultHeight?: number      // default 420
}

interface JDesktopProps {
  theme:              'windows11' | 'macos'
  apps:               JDesktopApp[]
  wallpaper?:         string         // CSS background value
  compactBreakpoint?: number         // default 900px — below this, compact mode
  initialWindows?:    string[]       // app ids to open on mount
}
```

**Double-click** a desktop icon to open an app window. If a window with that `appId` is already open, it focuses instead of opening a duplicate.

---

## JWindowManager + useWindowManager

If you need to control windows from outside `JDesktop` (e.g., open a window from a button elsewhere in your app), use `JWindowManager` directly and access its context via `useWindowManager()`.

```tsx
function App() {
  return (
    <JOSThemeProvider theme="windows11">
      <JWindowManager>
        <MyOpenWindowButton />
        <JDesktopInner apps={apps} />
      </JWindowManager>
    </JOSThemeProvider>
  )
}

function MyOpenWindowButton() {
  const { openWindow } = useWindowManager()
  return (
    <button onClick={() => openWindow({
      appId: 'settings',
      title: 'Settings',
      content: <SettingsPanel />,
    })}>
      Open Settings
    </button>
  )
}
```

### useWindowManager() API

| Method | Signature | Description |
|---|---|---|
| `openWindow` | `(config: OpenWindowConfig) => string` | Open a window, return its id. If appId already open, focus it instead. |
| `closeWindow` | `(id: string) => void` | Remove window |
| `minimizeWindow` | `(id: string) => void` | Hide window (stays in taskbar/dock) |
| `restoreWindow` | `(id: string) => void` | Un-minimize window |
| `maximizeWindow` | `(id: string) => void` | Toggle maximize |
| `focusWindow` | `(id: string) => void` | Bring to front |
| `moveWindow` | `(id, x, y) => void` | Move (clamped to desktop bounds) |
| `resizeWindow` | `(id, w, h) => void` | Resize (clamped to desktop bounds) |
| `setDesktopSize` | `(w, h) => void` | Called internally by JDesktop's ResizeObserver |

### State values

| Property | Type | Description |
|---|---|---|
| `windows` | `WindowState[]` | All open windows |
| `focusedId` | `string \| null` | Currently focused window id |
| `compactMode` | `boolean` | True when desktop width < compactBreakpoint |
| `desktopSize` | `{ w, h }` | Current desktop dimensions in px |

---

## OpenWindowConfig

```tsx
interface OpenWindowConfig {
  appId:   string       // unique app identifier — duplicate appId focuses existing window
  title:   string       // window title bar text
  icon?:   string       // emoji shown in title bar and taskbar
  width?:  number       // default 640px
  height?: number       // default 420px
  content: ReactNode    // the app UI rendered inside the window body
}
```

---

## Responsive / Compact Mode

Below `compactBreakpoint` (default 900px), all windows auto-maximize. Drag handles and resize handles are hidden. Users switch between apps via the taskbar or dock.

```tsx
<JDesktop theme="windows11" apps={apps} compactBreakpoint={700} />
```

`compactMode` is available from `useWindowManager()` if you need to adjust app layout:

```tsx
function MyApp() {
  const { compactMode } = useWindowManager()
  return compactMode ? <MobileLayout /> : <DesktopLayout />
}
```

---

## JOSNotification

Slide-in toast notifications. Renders via `createPortal` into `document.body`. Position is theme-aware: bottom-right (Windows 11), top-right (macOS).

```tsx
// Wrap your app (or desktop) with the provider
<JOSNotificationProvider>
  <JDesktop ... />
</JOSNotificationProvider>

// Anywhere inside:
function SaveButton() {
  const { notify } = useOSNotify()
  return (
    <button onClick={() => {
      save()
      notify({ title: 'Saved', body: 'report.pdf saved successfully', icon: '✅' })
    }}>
      Save
    </button>
  )
}
```

### notify() config

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | required | Notification heading |
| `body` | `string` | — | Body text |
| `icon` | `string` | — | Emoji icon shown left of title |
| `duration` | `number` | `4000` | Auto-dismiss in ms. `0` = persistent until dismissed |

Max 4 notifications visible at once. Extras queue and slide in when slots free up.

---

## JFileExplorer

Two-pane tree-based file browser. You supply the tree data — no file system access.

```tsx
interface JFileNode {
  id:        string
  name:      string
  type:      'file' | 'folder'
  icon?:     string                   // emoji — overrides default 📁/📄
  children?: JFileNode[]             // folders only
  meta?:     Record<string, string>  // e.g. { size: '4 KB', modified: '2026-06-30' }
}

interface JFileExplorerProps {
  tree:         JFileNode[]
  onOpen?:      (node: JFileNode) => void   // double-click on a pane item
  onSelect?:    (node: JFileNode) => void   // single-click on a pane item
  initialPath?: string[]                    // array of folder ids to expand on mount
}
```

Usage in a JDesktop app:

```tsx
const fileTree: JFileNode[] = [
  {
    id: 'home', name: 'Home', type: 'folder',
    children: [
      { id: 'docs', name: 'Documents', type: 'folder', children: [
        { id: 'r1', name: 'report.pdf', type: 'file', meta: { size: '2.4 MB' } },
      ]},
      { id: 'img1', name: 'photo.jpg', type: 'file', meta: { size: '1.2 MB' } },
    ],
  },
]

<JFileExplorer
  tree={fileTree}
  onOpen={node => {
    if (node.type === 'file') openInViewer(node)
  }}
/>
```

---

## JTaskManager

Sortable process table. You supply the process list and re-render to update.

```tsx
interface JProcess {
  pid:    number
  name:   string
  cpu:    number        // 0–100 percentage
  memory: number        // in MB
  status: 'running' | 'suspended' | 'stopped'
}

interface JTaskManagerProps {
  processes: JProcess[]
  onKill?:   (pid: number) => void   // if omitted, Kill buttons are hidden
}
```

Usage:

```tsx
const [procs, setProcs] = useState<JProcess[]>(initialProcesses)

<JTaskManager
  processes={procs}
  onKill={pid => setProcs(p => p.filter(x => x.pid !== pid))}
/>
```

Click column headers to sort. CPU and Memory columns render a progress bar. Status column shows a color-coded dot badge.

---

## JControlPanel

Icon grid + settings content pane with search filter.

```tsx
interface JControlSection {
  id:        string
  icon:      string
  label:     string
  component: ReactNode    // content shown in right pane when selected
}

interface JControlPanelProps {
  sections:        JControlSection[]
  defaultSection?: string    // id of section open on mount
}
```

Usage:

```tsx
<JControlPanel
  sections={[
    { id: 'theme',   icon: '🎨', label: 'Theme',    component: <ThemeSettings /> },
    { id: 'account', icon: '👤', label: 'Account',  component: <AccountSettings /> },
    { id: 'network', icon: '🌐', label: 'Network',  component: <NetworkSettings /> },
  ]}
  defaultSection="theme"
/>
```

---

## JTaskbar (Windows 11)

Rendered automatically by `JDesktop` when `theme="windows11"`. Also exported for manual composition.

- Start button opens/closes `JStartMenu`
- Running app buttons — click to focus, click again on minimized to restore
- Clock in system tray

---

## JStartMenu (Windows 11)

Rendered by `JTaskbar`. Flyout panel with pinned app grid. Clicking an app icon opens or focuses its window.

---

## JDock (macOS)

Rendered automatically by `JDesktop` when `theme="macos"`. Also exported for manual composition.

- Running indicator dot below icon for open apps
- Click to open or focus existing window
- Hover magnification via CSS transform

---

## JMenuBar (macOS)

Rendered automatically by `JDesktop` when `theme="macos"`. Also exported for manual composition.

```tsx
interface JMenuBarMenu {
  label:   string
  items:   { label: string; shortcut?: string; onClick: () => void; divider?: boolean }[]
}

interface JMenuBarProps {
  appName?: string
  menus?:   JMenuBarMenu[]
}
```

Usage (standalone):

```tsx
<JMenuBar
  appName="My App"
  menus={[
    {
      label: 'File',
      items: [
        { label: 'New',   shortcut: '⌘N', onClick: handleNew  },
        { label: 'Open',  shortcut: '⌘O', onClick: handleOpen },
        { divider: true,  label: '',       onClick: () => {} },
        { label: 'Quit',  shortcut: '⌘Q', onClick: handleQuit },
      ],
    },
  ]}
/>
```

---

## Known Limits

**No OS interaction:** These are UI shells only. There is no actual file system, process list, or clipboard access — the browser sandbox prevents it. Supply all data from your app state.

**Compact mode is one-at-a-time:** In compact mode (< `compactBreakpoint` wide), only one non-minimized window is shown at a time. Users switch via taskbar/dock. There is no slide animation — the switch is instant.

**No virtual desktop / workspace switching:** All windows exist in one desktop space. A multi-workspace system would need a custom `workspaceId` field on `WindowState`.

**Wallpaper is a CSS background string:** Pass any valid CSS background value — color, gradient, or `url(...)`. Images hosted on external domains must allow CORS.
