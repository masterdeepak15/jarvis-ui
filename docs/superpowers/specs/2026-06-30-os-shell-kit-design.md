# OS Shell Kit — Design Spec

**Date:** 2026-06-30  
**Package:** `@masterdeepak15/jarvis-ui` (extended, not a new package)  
**Location:** `packages/jarvis-ui/src/components/os/`

---

## Goal

Add a Windows 11 / macOS themed OS-shell UI kit to jarvis-ui. Users can build web UIs that look and feel like a desktop OS — with real draggable/resizable windows, a taskbar or dock, a desktop icon launcher, and pre-built OS app shells (File Explorer, Task Manager, Control Panel). Every component is viewport-aware and responsive.

---

## Scope

### In scope
- `JOSThemeProvider` — CSS token layer for both themes
- `JWindowManager` — context that owns all window state
- `JWindow` — draggable, resizable, minimizable, maximizable window
- `JDesktop` — full-viewport desktop with icon grid and ResizeObserver
- `JTaskbar` + `JStartMenu` — Windows 11 bottom bar and start menu
- `JDock` + `JMenuBar` — macOS dock and top menu bar
- `JOSNotification` — slide-in toast notifications (shared, both themes)
- `JFileExplorer` — two-pane file browser (user supplies data)
- `JTaskManager` — process table with CPU/mem bars (user supplies data)
- `JControlPanel` — icon grid + settings pane (user supplies data)
- `jarvis-os.css` — new CSS file with `--os-*` tokens and component styles
- `index.ts` export wiring
- Skill reference docs for all new components

### Out of scope
- Actual file system access (browser security boundary)
- Real process data (user must supply)
- Mobile (< 600px) — compact mode covers tablet/small laptop down to ~600px
- Animations beyond CSS transitions (no animation library)

---

## Responsive Model

`JDesktop` fills its container with `width: 100%; height: 100%`. The consumer controls how tall it is (typically `100vh` minus any outer chrome). A `ResizeObserver` watches the desktop element and injects `{ desktopW, desktopH }` into `JWindowManager` context.

### Two modes

| Mode | Breakpoint | Behavior |
|---|---|---|
| **Desktop** | `desktopW ≥ compactBreakpoint` (default 900px) | Multi-window, drag/resize, z-order, cascade placement |
| **Compact** | `desktopW < compactBreakpoint` | All windows auto-maximize, one visible at a time, no drag/resize handles, switch via taskbar/dock |

### Viewport-clamping rules (desktop mode)

- Drag: `x ∈ [0, desktopW − windowW]`, `y ∈ [0, desktopH − windowH]`
- Resize: `w ∈ [minWidth, desktopW − x]`, `h ∈ [minHeight, desktopH − y]`
- On desktop resize → re-clamp all open windows to new bounds (slide to edge, never hide off-screen)

### Cascade placement

New windows open at a computed position — no hardcoded coordinates in user code:

```
slot = openWindowCount % 8
x = 40 + slot * 30, clamped to desktopW * 0.5
y = 40 + slot * 30, clamped to desktopH * 0.5
```

Default window size: `640 × 420px`, clamped to desktop bounds at open time.

---

## Token System

New `--os-*` namespace. Does not conflict with existing `--j-*` HUD tokens. Set by `JOSThemeProvider`.

### Windows 11 tokens

```css
--os-font:        'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif;
--os-bg:          #202020;
--os-surface:     rgba(32, 32, 32, 0.85);
--os-surface-alt: rgba(44, 44, 44, 0.9);
--os-border:      rgba(255, 255, 255, 0.10);
--os-accent:      #0078d4;
--os-accent-hover:#1a8ae0;
--os-text:        rgba(255, 255, 255, 0.95);
--os-text-muted:  rgba(255, 255, 255, 0.55);
--os-radius:      8px;
--os-radius-sm:   4px;
--os-shadow:      0 8px 32px rgba(0, 0, 0, 0.6);
--os-backdrop:    blur(20px) saturate(180%);
--os-titlebar-h:  32px;
--os-taskbar-h:   48px;
```

### macOS tokens

```css
--os-font:        -apple-system, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
--os-bg:          #1e1e1e;
--os-surface:     rgba(40, 40, 40, 0.75);
--os-surface-alt: rgba(52, 52, 52, 0.8);
--os-border:      rgba(255, 255, 255, 0.12);
--os-accent:      #007aff;
--os-accent-hover:#1a8fff;
--os-text:        rgba(255, 255, 255, 0.92);
--os-text-muted:  rgba(255, 255, 255, 0.50);
--os-radius:      10px;
--os-radius-sm:   6px;
--os-shadow:      0 12px 40px rgba(0, 0, 0, 0.7);
--os-backdrop:    blur(24px) saturate(200%);
--os-titlebar-h:  28px;
--os-dock-h:      64px;
--os-menubar-h:   24px;
```

---

## Component Specs

### JOSThemeProvider

Wraps OS shell content. Sets `--os-*` CSS variables on a root div via a `data-os-theme` attribute. Also exposes `theme` value via React context so child components (e.g. `JOSNotification`) can read which theme is active without CSS inspection. Does not replace `JThemeProvider` — they can coexist in the same app.

```tsx
interface JOSThemeProviderProps {
  theme:    'windows11' | 'macos'
  children: ReactNode
}
```

Sets a `data-os-theme="windows11"` attribute for CSS scoping.

---

### JWindowManager

Context provider. Owns all window state. Consumed by `JDesktop`, `JWindow`, `JTaskbar`, `JDock`.

```tsx
interface WindowState {
  id:        string
  appId:     string
  title:     string
  icon?:     string
  x:         number
  y:         number
  width:     number
  height:    number
  minimized: boolean
  maximized: boolean
  zIndex:    number
  content:   ReactNode
}

interface JWindowManagerProps {
  compactBreakpoint?: number   // default 900
  children:           ReactNode
}

// Hook
function useWindowManager(): {
  windows:         WindowState[]
  focusedId:       string | null
  compactMode:     boolean
  desktopSize:     { w: number; h: number }
  openWindow:      (config: OpenWindowConfig) => string   // returns id
  closeWindow:     (id: string) => void
  minimizeWindow:  (id: string) => void
  restoreWindow:   (id: string) => void
  maximizeWindow:  (id: string) => void
  focusWindow:     (id: string) => void
  moveWindow:      (id: string, x: number, y: number) => void
  resizeWindow:    (id: string, w: number, h: number) => void
  setDesktopSize:  (w: number, h: number) => void
}

interface OpenWindowConfig {
  appId:      string
  title:      string
  icon?:      string
  width?:     number
  height?:    number
  content:    ReactNode
}
```

---

### JWindow

The draggable, resizable window frame. Renders itself — position/size come from `JWindowManager` state. Does not manage its own position state.

**Title bar layout:**
- Windows 11: `[icon  Title                    ─  □  ✕]` (controls right-aligned)
- macOS: `[🔴🟡🟢  Title                         ]` (traffic lights left-aligned)

**Resize handles:** 8 hit zones (4 edges + 4 corners), `cursor` set per handle direction. Hidden in compact mode.

**Drag:** pointer capture on title bar. Clamped to desktop bounds from context. Disabled in compact mode.

```tsx
interface JWindowProps {
  id:         string
  // All other state (x, y, width, height, minimized, maximized, focused)
  // is read from JWindowManager context by id.
  // JWindow is a pure renderer — no position state of its own.
}
```

**Maximized behavior:** fills desktop area (`x:0, y:0, w:desktopW, h:desktopH`), resize handles hidden, maximize button toggles restore.

**Minimized behavior:** component renders null. Entry stays in taskbar/dock.

---

### JDesktop

Full-viewport desktop container. Integrates `JWindowManager`, observes its own size, renders icon grid and open windows.

```tsx
interface JDesktopApp {
  id:        string
  icon:      string           // emoji or URL
  label:     string
  component: ReactNode
  defaultWidth?:  number
  defaultHeight?: number
}

interface JDesktopProps {
  theme:               'windows11' | 'macos'
  apps:                JDesktopApp[]
  wallpaper?:          string        // CSS background value
  compactBreakpoint?:  number        // default 900
  initialWindows?:     string[]      // app ids to open on mount
}
```

- Renders `JOSThemeProvider` + `JWindowManager` internally
- Double-click app icon → `openWindow(app)`. If a window with that `appId` is already open, focus it instead of opening a duplicate.
- Renders `JTaskbar` (windows11) or `JDock` + `JMenuBar` (macos) automatically
- Desktop area height = container height minus taskbar/menubar/dock height

---

### JTaskbar (Windows 11)

Fixed bottom bar. Height: `--os-taskbar-h` (48px).

```tsx
interface JTaskbarProps {
  pinnedApps?: JDesktopApp[]
}
```

Sections (left → right):
1. **Start button** → opens/closes `JStartMenu`
2. **Pinned + running apps** — icon buttons, active app highlighted, click to focus/restore
3. **System tray** — clock (`HH:MM`), notification bell

Running app buttons come from `useWindowManager().windows`. Minimized windows show as dim icons.

---

### JStartMenu (Windows 11)

Flyout panel anchored to start button. Opens above taskbar.

```tsx
interface JStartMenuProps {
  apps:    JDesktopApp[]
  onClose: () => void
}
```

Layout:
- **Pinned apps grid** — 6-per-row icon + label
- **Recommended** section — recently opened (stored in `sessionStorage`)
- **Power button** row — placeholder (no real OS interaction)

Closes on backdrop click or Escape key.

---

### JDock (macOS)

Fixed bottom center dock. Height: `--os-dock-h` (64px).

```tsx
interface JDockProps {
  apps: JDesktopApp[]
}
```

- Icon magnification on hover (CSS `transform: scale()` with transition)
- Running indicator dot (small circle below icon) for open windows
- Click to open or focus existing window

---

### JMenuBar (macOS)

Fixed top bar. Height: `--os-menubar-h` (24px).

```tsx
interface JMenuBarProps {
  appName?: string     // active app name shown after Apple menu
  menus?:   JMenuBarMenu[]
}

interface JMenuBarMenu {
  label:   string
  items:   { label: string; shortcut?: string; onClick: () => void; divider?: boolean }[]
}
```

Right side: clock. Left side: Apple  → appName → menu items.

---

### JOSNotification

Slide-in toast notifications. Works for both themes. Rendered via portal into `document.body`.

```tsx
// Provider
<JOSNotificationProvider>
  {children}
</JOSNotificationProvider>

// Hook
const { notify } = useOSNotify()
notify({ title: 'File saved', body: 'report.pdf', icon: '📄', duration: 4000 })

interface OSNotifyConfig {
  title:     string
  body?:     string
  icon?:     string
  duration?: number    // ms, default 4000; 0 = persistent
}
```

Position: bottom-right (Windows 11), top-right (macOS) — read from `JOSThemeProvider` context.
Stack: newest on top, max 4 visible, older ones slide out.

---

### JFileExplorer

Two-pane file browser. User supplies tree data.

```tsx
interface JFileNode {
  id:        string
  name:      string
  type:      'file' | 'folder'
  icon?:     string           // emoji override
  children?: JFileNode[]      // folders only
  meta?:     Record<string, string>   // e.g. { size: '4 KB', modified: '...' }
}

interface JFileExplorerProps {
  tree:            JFileNode[]
  onOpen?:         (node: JFileNode) => void
  onSelect?:       (node: JFileNode) => void
  initialPath?:    string[]    // array of node ids forming the expanded path
}
```

Layout:
- Left pane: collapsible folder tree, indented, folder expand/collapse
- Right pane: grid or list of selected folder's children, file icons
- Top: breadcrumb path bar
- Both panes scroll independently

---

### JTaskManager

Process table. User supplies process list.

```tsx
interface JProcess {
  pid:     number
  name:    string
  cpu:     number        // 0–100
  memory:  number        // MB
  status:  'running' | 'suspended' | 'stopped'
}

interface JTaskManagerProps {
  processes: JProcess[]
  onKill?:   (pid: number) => void
}
// Note: update the processes prop from outside to refresh data — no internal polling
```

Columns: Name, PID, CPU (bar + %), Memory (bar + MB), Status, Kill button.  
Click column header to sort. Status badge uses `JState` color logic.

---

### JControlPanel

Icon grid + settings content pane. User supplies sections.

```tsx
interface JControlSection {
  id:        string
  icon:      string
  label:     string
  component: ReactNode
}

interface JControlPanelProps {
  sections:       JControlSection[]
  defaultSection?: string    // id of section open on mount
}
```

Layout:
- Left: icon grid (3-per-row on desktop, 4-per-row on compact)
- Right: selected section's component rendered in a content pane
- Top: search input — filters icon grid by label

---

## File Structure

```
packages/jarvis-ui/src/
  components/os/
    shell/
      JOSThemeProvider.tsx
      JWindowManager.tsx
      JDesktop.tsx
      JWindow.tsx
    windows/
      JTaskbar.tsx
      JStartMenu.tsx
    macos/
      JDock.tsx
      JMenuBar.tsx
    shared/
      JOSNotification.tsx
    apps/
      JFileExplorer.tsx
      JTaskManager.tsx
      JControlPanel.tsx
  styles/
    jarvis-os.css             ← new, imported in src/index.ts
```

---

## Export additions (`src/index.ts`)

```ts
import './styles/jarvis-os.css'

// Components — os shell
export { JOSThemeProvider }    from './components/os/shell/JOSThemeProvider'
export { JWindowManager, useWindowManager } from './components/os/shell/JWindowManager'
export { JDesktop }            from './components/os/shell/JDesktop'
export { JWindow }             from './components/os/shell/JWindow'
export { JTaskbar }            from './components/os/windows/JTaskbar'
export { JStartMenu }          from './components/os/windows/JStartMenu'
export { JDock }               from './components/os/macos/JDock'
export { JMenuBar }            from './components/os/macos/JMenuBar'
export { JOSNotificationProvider, useOSNotify } from './components/os/shared/JOSNotification'
export { JFileExplorer }       from './components/os/apps/JFileExplorer'
export { JTaskManager }        from './components/os/apps/JTaskManager'
export { JControlPanel }       from './components/os/apps/JControlPanel'

// Types
export type { JDesktopApp, JFileNode, JProcess, JControlSection, WindowState, OpenWindowConfig }
```

---

## Implementation Order

1. `jarvis-os.css` — `--os-*` tokens for both themes, base reset for OS elements
2. `JOSThemeProvider` — sets tokens via `data-os-theme` attribute
3. `JWindowManager` — context, state, cascade algorithm, compact mode flag
4. `JWindow` — drag (pointer capture), resize (8 handles), min/max/close, two title bar variants
5. `JDesktop` — ResizeObserver → setDesktopSize, icon grid, wires taskbar/dock
6. `JTaskbar` + `JStartMenu`
7. `JDock` + `JMenuBar`
8. `JOSNotification`
9. `JFileExplorer`
10. `JTaskManager`
11. `JControlPanel`
12. `index.ts` export wiring
13. Skill reference docs (one `.md` per component)
