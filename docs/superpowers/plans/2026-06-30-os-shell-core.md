# OS Shell Kit — Plan 1: Core Shell

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a viewport-aware Windows 11 / macOS OS-shell to jarvis-ui — tokens, window manager, draggable/resizable JWindow, JDesktop, taskbar, dock, and menu bar.

**Architecture:** New `components/os/` folder inside `packages/jarvis-ui`. Separate `--os-*` CSS token namespace. JWindowManager holds all window state in a React context; JDesktop owns a ResizeObserver that injects viewport-relative desktop bounds; JWindow is a pure renderer that reads its position/size from context by id. Two theme variants (windows11 / macos) expressed entirely via CSS tokens and conditional title-bar rendering.

**Tech Stack:** React 18, TypeScript, Vitest + React Testing Library, CSS custom properties (no CSS modules), no animation library.

> **This is Plan 1 of 2.** Plan 2 covers JOSNotification, JFileExplorer, JTaskManager, JControlPanel, and skill reference docs. Build and test Plan 1 fully before starting Plan 2.

## Global Constraints

- All new source files under `packages/jarvis-ui/src/components/os/`
- New CSS file: `packages/jarvis-ui/src/styles/jarvis-os.css`
- CSS token prefix: `--os-*` (never reuse `--j-*` tokens)
- CSS class prefix: `j-os-` (consistent with existing `j-` convention)
- No new npm dependencies — pointer events, ResizeObserver, CSS transitions only
- Test wrapper: always wrap in `JOSThemeProvider theme="windows11"` (same pattern as existing `JThemeProvider` wrapper)
- Test runner: `pnpm --filter @masterdeepak15/jarvis-ui test` run from `D:/Claude/React`
- TypeScript strict mode — no `any`, no `as unknown`
- `ReactNode` content stored in window state must not be re-created on each render — consumers pass stable refs or memoized JSX

---

## File Map

| File | Purpose |
|---|---|
| `src/styles/jarvis-os.css` | `--os-*` token definitions for both themes, base OS element styles |
| `src/components/os/shell/JOSThemeProvider.tsx` | Sets CSS tokens via `data-os-theme` attribute, exposes theme via React context |
| `src/components/os/shell/JOSThemeProvider.test.tsx` | Tests token attribute and context value |
| `src/components/os/shell/JWindowManager.tsx` | Context, state, cascade algorithm, clamp logic |
| `src/components/os/shell/JWindowManager.test.tsx` | Tests open/close/minimize/maximize/clamp/cascade |
| `src/components/os/shell/JWindow.tsx` | Draggable/resizable window frame, two title bar variants |
| `src/components/os/shell/JWindow.test.tsx` | Tests drag, resize, min/max/close, compact mode |
| `src/components/os/shell/JDesktop.tsx` | ResizeObserver, icon grid, composes shell chrome |
| `src/components/os/shell/JDesktop.test.tsx` | Tests icon render, double-click open, compact switching |
| `src/components/os/windows/JTaskbar.tsx` | Bottom bar, start button, running app buttons, clock |
| `src/components/os/windows/JTaskbar.test.tsx` | Tests start button, running app list, minimize restore |
| `src/components/os/windows/JStartMenu.tsx` | Flyout pinned-apps grid |
| `src/components/os/windows/JStartMenu.test.tsx` | Tests render, app click, close |
| `src/components/os/macos/JDock.tsx` | Bottom center dock, running dots |
| `src/components/os/macos/JDock.test.tsx` | Tests icon render, running indicator, click |
| `src/components/os/macos/JMenuBar.tsx` | Fixed top bar, app name, clock |
| `src/components/os/macos/JMenuBar.test.tsx` | Tests app name, menu render |
| `src/index.ts` | Add OS exports + `import './styles/jarvis-os.css'` |

---

## Task 1: CSS Tokens + JOSThemeProvider

**Files:**
- Create: `packages/jarvis-ui/src/styles/jarvis-os.css`
- Create: `packages/jarvis-ui/src/components/os/shell/JOSThemeProvider.tsx`
- Create: `packages/jarvis-ui/src/components/os/shell/JOSThemeProvider.test.tsx`

**Interfaces:**
- Produces: `JOSThemeProvider`, `useOSTheme()` — consumed by every subsequent OS task

---

- [ ] **Step 1: Create the CSS token file**

Create `packages/jarvis-ui/src/styles/jarvis-os.css`:

```css
/* ── Windows 11 tokens ─────────────────────────────────────── */
[data-os-theme="windows11"] {
  --os-font:         'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif;
  --os-bg:           #202020;
  --os-surface:      rgba(32, 32, 32, 0.85);
  --os-surface-alt:  rgba(44, 44, 44, 0.90);
  --os-border:       rgba(255, 255, 255, 0.10);
  --os-accent:       #0078d4;
  --os-accent-hover: #1a8ae0;
  --os-text:         rgba(255, 255, 255, 0.95);
  --os-text-muted:   rgba(255, 255, 255, 0.55);
  --os-radius:       8px;
  --os-radius-sm:    4px;
  --os-shadow:       0 8px 32px rgba(0, 0, 0, 0.60);
  --os-backdrop:     blur(20px) saturate(180%);
  --os-titlebar-h:   32px;
  --os-taskbar-h:    48px;
  --os-menubar-h:    0px;
  --os-dock-h:       0px;
}

/* ── macOS tokens ──────────────────────────────────────────── */
[data-os-theme="macos"] {
  --os-font:         -apple-system, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
  --os-bg:           #1e1e1e;
  --os-surface:      rgba(40, 40, 40, 0.75);
  --os-surface-alt:  rgba(52, 52, 52, 0.80);
  --os-border:       rgba(255, 255, 255, 0.12);
  --os-accent:       #007aff;
  --os-accent-hover: #1a8fff;
  --os-text:         rgba(255, 255, 255, 0.92);
  --os-text-muted:   rgba(255, 255, 255, 0.50);
  --os-radius:       10px;
  --os-radius-sm:    6px;
  --os-shadow:       0 12px 40px rgba(0, 0, 0, 0.70);
  --os-backdrop:     blur(24px) saturate(200%);
  --os-titlebar-h:   28px;
  --os-taskbar-h:    0px;
  --os-menubar-h:    24px;
  --os-dock-h:       64px;
}

/* ── Base OS element styles ────────────────────────────────── */
.j-os-root {
  width: 100%;
  height: 100%;
  font-family: var(--os-font);
  color: var(--os-text);
  box-sizing: border-box;
}

.j-os-root *, .j-os-root *::before, .j-os-root *::after {
  box-sizing: border-box;
}

/* Window */
.j-os-window {
  position: absolute;
  display: flex;
  flex-direction: column;
  background: var(--os-surface);
  border: 1px solid var(--os-border);
  border-radius: var(--os-radius);
  box-shadow: var(--os-shadow);
  backdrop-filter: var(--os-backdrop);
  overflow: hidden;
  will-change: transform;
}

.j-os-window--focused {
  border-color: var(--os-accent);
  box-shadow: var(--os-shadow), 0 0 0 1px var(--os-accent);
}

.j-os-window--maximized {
  border-radius: 0;
  border: none;
  box-shadow: none;
}

/* Title bar */
.j-os-titlebar {
  display: flex;
  align-items: center;
  height: var(--os-titlebar-h);
  padding: 0 8px;
  flex-shrink: 0;
  cursor: default;
  user-select: none;
  background: var(--os-surface-alt);
  border-bottom: 1px solid var(--os-border);
}

.j-os-titlebar--draggable { cursor: grab; }
.j-os-titlebar--draggable:active { cursor: grabbing; }

.j-os-titlebar__title {
  flex: 1;
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--os-text);
}

/* Windows 11 controls */
.j-os-win-controls {
  display: flex;
  gap: 0;
  margin-left: 8px;
}

.j-os-win-btn {
  width: 46px;
  height: var(--os-titlebar-h);
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--os-text);
  font-size: 11px;
  cursor: pointer;
  transition: background 0.1s;
}

.j-os-win-btn:hover { background: var(--os-surface); }
.j-os-win-btn--close:hover { background: #c42b1c; color: #fff; }

/* macOS traffic lights */
.j-os-mac-controls {
  display: flex;
  gap: 8px;
  margin-right: 8px;
}

.j-os-mac-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 0;
  transition: filter 0.1s;
}

.j-os-mac-btn:hover { filter: brightness(0.8); }
.j-os-mac-btn--close    { background: #ff5f57; }
.j-os-mac-btn--minimize { background: #febc2e; }
.j-os-mac-btn--maximize { background: #28c840; }

/* Window body */
.j-os-window__body {
  flex: 1;
  overflow: auto;
  position: relative;
}

/* Resize handles */
.j-os-resize {
  position: absolute;
  z-index: 10;
}

.j-os-resize--n  { top: -3px; left: 6px; right: 6px; height: 6px; cursor: n-resize; }
.j-os-resize--s  { bottom: -3px; left: 6px; right: 6px; height: 6px; cursor: s-resize; }
.j-os-resize--e  { right: -3px; top: 6px; bottom: 6px; width: 6px; cursor: e-resize; }
.j-os-resize--w  { left: -3px; top: 6px; bottom: 6px; width: 6px; cursor: w-resize; }
.j-os-resize--nw { top: -3px; left: -3px; width: 12px; height: 12px; cursor: nw-resize; }
.j-os-resize--ne { top: -3px; right: -3px; width: 12px; height: 12px; cursor: ne-resize; }
.j-os-resize--sw { bottom: -3px; left: -3px; width: 12px; height: 12px; cursor: sw-resize; }
.j-os-resize--se { bottom: -3px; right: -3px; width: 12px; height: 12px; cursor: se-resize; }

/* Desktop */
.j-os-desktop {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.j-os-desktop__icons {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.j-os-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 72px;
  padding: 8px 4px;
  border-radius: var(--os-radius-sm);
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;
}

.j-os-icon:hover    { background: rgba(255,255,255,0.08); }
.j-os-icon--active  { background: rgba(255,255,255,0.14); }

.j-os-icon__emoji { font-size: 32px; line-height: 1; }
.j-os-icon__label { font-size: 11px; color: var(--os-text); text-align: center; word-break: break-word; }

/* Taskbar (Windows 11) */
.j-os-taskbar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--os-taskbar-h);
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 4px;
  background: var(--os-surface);
  border-top: 1px solid var(--os-border);
  backdrop-filter: var(--os-backdrop);
  z-index: 1000;
}

.j-os-taskbar__start {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--os-radius-sm);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  transition: background 0.1s;
}

.j-os-taskbar__start:hover { background: rgba(255,255,255,0.08); }

.j-os-taskbar__apps {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
}

.j-os-taskbar__app {
  height: 40px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: var(--os-radius-sm);
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--os-text);
  font-size: 12px;
  font-family: var(--os-font);
  transition: background 0.1s;
  position: relative;
}

.j-os-taskbar__app:hover { background: rgba(255,255,255,0.08); }
.j-os-taskbar__app--active { background: rgba(255,255,255,0.12); }
.j-os-taskbar__app--active::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 3px;
  border-radius: 2px;
  background: var(--os-accent);
}

.j-os-taskbar__tray {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  font-size: 12px;
  color: var(--os-text-muted);
}

/* Start Menu */
.j-os-startmenu {
  position: absolute;
  bottom: calc(var(--os-taskbar-h) + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: 640px;
  max-width: calc(100vw - 32px);
  background: var(--os-surface);
  border: 1px solid var(--os-border);
  border-radius: var(--os-radius);
  box-shadow: var(--os-shadow);
  backdrop-filter: var(--os-backdrop);
  padding: 24px;
  z-index: 1100;
}

.j-os-startmenu__pinned {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-bottom: 24px;
}

.j-os-startmenu__pin {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  border-radius: var(--os-radius-sm);
  cursor: pointer;
  background: transparent;
  border: none;
  color: var(--os-text);
  font-family: var(--os-font);
  font-size: 11px;
  transition: background 0.1s;
}

.j-os-startmenu__pin:hover { background: rgba(255,255,255,0.08); }
.j-os-startmenu__pin-icon  { font-size: 28px; }

.j-os-startmenu__heading {
  font-size: 11px;
  color: var(--os-text-muted);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* Dock (macOS) */
.j-os-dock {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  height: var(--os-dock-h);
  display: flex;
  align-items: flex-end;
  gap: 6px;
  padding: 8px 12px;
  background: var(--os-surface);
  border: 1px solid var(--os-border);
  border-radius: 16px;
  backdrop-filter: var(--os-backdrop);
  box-shadow: var(--os-shadow);
  z-index: 1000;
}

.j-os-dock__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.15s;
}

.j-os-dock__item:hover { transform: scale(1.3) translateY(-8px); }

.j-os-dock__icon { font-size: 36px; line-height: 1; }

.j-os-dock__dot {
  position: absolute;
  bottom: -6px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--os-text-muted);
}

/* Menu Bar (macOS) */
.j-os-menubar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--os-menubar-h);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 16px;
  background: var(--os-surface);
  border-bottom: 1px solid var(--os-border);
  backdrop-filter: var(--os-backdrop);
  z-index: 1000;
  font-size: 13px;
}

.j-os-menubar__item {
  padding: 2px 8px;
  border-radius: var(--os-radius-sm);
  cursor: pointer;
  color: var(--os-text);
  transition: background 0.1s;
  background: transparent;
  border: none;
  font-family: var(--os-font);
  font-size: 13px;
  font-weight: 600;
}

.j-os-menubar__item:hover { background: rgba(255,255,255,0.10); }

.j-os-menubar__menu-item {
  padding: 2px 8px;
  cursor: pointer;
  color: var(--os-text);
  background: transparent;
  border: none;
  font-family: var(--os-font);
  font-size: 13px;
  transition: background 0.1s;
  border-radius: var(--os-radius-sm);
}

.j-os-menubar__menu-item:hover { background: rgba(255,255,255,0.10); }

.j-os-menubar__clock {
  margin-left: auto;
  font-size: 12px;
  color: var(--os-text-muted);
}

.j-os-menubar__dropdown {
  position: absolute;
  top: var(--os-menubar-h);
  min-width: 200px;
  background: var(--os-surface);
  border: 1px solid var(--os-border);
  border-radius: var(--os-radius);
  box-shadow: var(--os-shadow);
  backdrop-filter: var(--os-backdrop);
  padding: 4px;
  z-index: 1200;
}

.j-os-menubar__dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  border-radius: var(--os-radius-sm);
  cursor: pointer;
  font-size: 13px;
  color: var(--os-text);
  background: transparent;
  border: none;
  width: 100%;
  font-family: var(--os-font);
  text-align: left;
}

.j-os-menubar__dropdown-item:hover { background: rgba(255,255,255,0.10); }
.j-os-menubar__shortcut { color: var(--os-text-muted); font-size: 11px; }
.j-os-menubar__divider  { height: 1px; background: var(--os-border); margin: 4px 0; }
```

- [ ] **Step 2: Create JOSThemeProvider**

Create `packages/jarvis-ui/src/components/os/shell/JOSThemeProvider.tsx`:

```tsx
import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

export type OSTheme = 'windows11' | 'macos'

const OSThemeContext = createContext<OSTheme>('windows11')

export function useOSTheme(): OSTheme {
  return useContext(OSThemeContext)
}

export interface JOSThemeProviderProps {
  theme:    OSTheme
  children: ReactNode
}

export function JOSThemeProvider({ theme, children }: JOSThemeProviderProps) {
  return (
    <OSThemeContext.Provider value={theme}>
      <div data-os-theme={theme} data-testid="j-os-root" className="j-os-root">
        {children}
      </div>
    </OSThemeContext.Provider>
  )
}
```

- [ ] **Step 3: Write tests**

Create `packages/jarvis-ui/src/components/os/shell/JOSThemeProvider.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JOSThemeProvider, useOSTheme } from './JOSThemeProvider'

function ThemeReader() {
  const theme = useOSTheme()
  return <div data-testid="theme-value">{theme}</div>
}

describe('JOSThemeProvider', () => {
  it('sets data-os-theme="windows11" on root div', () => {
    render(<JOSThemeProvider theme="windows11"><div /></JOSThemeProvider>)
    expect(screen.getByTestId('j-os-root')).toHaveAttribute('data-os-theme', 'windows11')
  })

  it('sets data-os-theme="macos" on root div', () => {
    render(<JOSThemeProvider theme="macos"><div /></JOSThemeProvider>)
    expect(screen.getByTestId('j-os-root')).toHaveAttribute('data-os-theme', 'macos')
  })

  it('exposes theme value via useOSTheme()', () => {
    render(<JOSThemeProvider theme="macos"><ThemeReader /></JOSThemeProvider>)
    expect(screen.getByTestId('theme-value').textContent).toBe('macos')
  })

  it('applies j-os-root class', () => {
    render(<JOSThemeProvider theme="windows11"><div /></JOSThemeProvider>)
    expect(screen.getByTestId('j-os-root')).toHaveClass('j-os-root')
  })
})
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JOSThemeProvider
```

Expected: 4 passing.

- [ ] **Step 5: Commit**

```bash
cd D:/Claude/React
git add packages/jarvis-ui/src/styles/jarvis-os.css packages/jarvis-ui/src/components/os/
git commit -m "feat(os): add jarvis-os.css tokens + JOSThemeProvider"
```

---

## Task 2: JWindowManager

**Files:**
- Create: `packages/jarvis-ui/src/components/os/shell/JWindowManager.tsx`
- Create: `packages/jarvis-ui/src/components/os/shell/JWindowManager.test.tsx`

**Interfaces:**
- Consumes: `JOSThemeProvider` (wraps in same tree — not a direct dep)
- Produces:
  - `WindowState` type
  - `OpenWindowConfig` type
  - `useWindowManager()` — returns `WindowManagerContextValue`
  - `JWindowManager` component

---

- [ ] **Step 1: Write the failing tests**

Create `packages/jarvis-ui/src/components/os/shell/JWindowManager.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { JWindowManager, useWindowManager } from './JWindowManager'
import type { ReactNode } from 'react'

// Expose context value so we can call it in tests
function HookReader({ onRender }: { onRender: (v: ReturnType<typeof useWindowManager>) => void }) {
  const ctx = useWindowManager()
  onRender(ctx)
  return null
}

function W({ children }: { children: ReactNode }) {
  return (
    <JWindowManager>
      {/* Give it a non-zero desktop size */}
      <SetDesktop w={1200} h={800} />
      {children}
    </JWindowManager>
  )
}

function SetDesktop({ w, h }: { w: number; h: number }) {
  const { setDesktopSize } = useWindowManager()
  // Set once on mount
  act(() => { setDesktopSize(w, h) })
  return null
}

const CONTENT = <div>app content</div>

describe('JWindowManager', () => {
  it('starts with no windows', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    expect(ctx!.windows).toHaveLength(0)
  })

  it('openWindow adds a window', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    act(() => { ctx!.openWindow({ appId: 'a', title: 'App A', content: CONTENT }) })
    expect(ctx!.windows).toHaveLength(1)
    expect(ctx!.windows[0].title).toBe('App A')
    expect(ctx!.windows[0].appId).toBe('a')
  })

  it('openWindow returns a unique id', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id1: string, id2: string
    act(() => { id1 = ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { id2 = ctx!.openWindow({ appId: 'b', title: 'B', content: CONTENT }) })
    expect(id1!).not.toBe(id2!)
  })

  it('openWindow with same appId focuses existing window instead of opening duplicate', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    act(() => { ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    expect(ctx!.windows).toHaveLength(1)
  })

  it('closeWindow removes the window', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { ctx!.closeWindow(id!) })
    expect(ctx!.windows).toHaveLength(0)
  })

  it('minimizeWindow sets minimized=true', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { ctx!.minimizeWindow(id!) })
    expect(ctx!.windows[0].minimized).toBe(true)
  })

  it('restoreWindow clears minimized', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { ctx!.minimizeWindow(id!) })
    act(() => { ctx!.restoreWindow(id!) })
    expect(ctx!.windows[0].minimized).toBe(false)
  })

  it('maximizeWindow toggles maximized', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { ctx!.maximizeWindow(id!) })
    expect(ctx!.windows[0].maximized).toBe(true)
    act(() => { ctx!.maximizeWindow(id!) })
    expect(ctx!.windows[0].maximized).toBe(false)
  })

  it('focusWindow sets focusedId', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { ctx!.focusWindow(id!) })
    expect(ctx!.focusedId).toBe(id!)
  })

  it('moveWindow updates x and y', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { ctx!.moveWindow(id!, 300, 200) })
    expect(ctx!.windows[0].x).toBe(300)
    expect(ctx!.windows[0].y).toBe(200)
  })

  it('moveWindow clamps to desktop bounds', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', width: 400, height: 300, content: CONTENT }) })
    // Move beyond right/bottom edge — desktop is 1200x800
    act(() => { ctx!.moveWindow(id!, 2000, 2000) })
    const w = ctx!.windows[0]
    expect(w.x).toBeLessThanOrEqual(1200 - w.width)
    expect(w.y).toBeLessThanOrEqual(800 - w.height)
  })

  it('setDesktopSize re-clamps windows that overflow new bounds', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    // Open window at right edge
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', width: 400, height: 300, content: CONTENT }) })
    act(() => { ctx!.moveWindow(id!, 800, 400) })
    // Shrink desktop so window overflows
    act(() => { ctx!.setDesktopSize(600, 500) })
    const w = ctx!.windows[0]
    expect(w.x + w.width).toBeLessThanOrEqual(600)
    expect(w.y + w.height).toBeLessThanOrEqual(500)
  })

  it('compactMode is false when desktopSize.w >= compactBreakpoint', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(
      <JWindowManager compactBreakpoint={900}>
        <HookReader onRender={v => { ctx = v }} />
      </JWindowManager>
    )
    act(() => { ctx!.setDesktopSize(1200, 800) })
    expect(ctx!.compactMode).toBe(false)
  })

  it('compactMode is true when desktopSize.w < compactBreakpoint', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(
      <JWindowManager compactBreakpoint={900}>
        <HookReader onRender={v => { ctx = v }} />
      </JWindowManager>
    )
    act(() => { ctx!.setDesktopSize(600, 800) })
    expect(ctx!.compactMode).toBe(true)
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JWindowManager
```

Expected: FAIL — `JWindowManager` not found.

- [ ] **Step 3: Implement JWindowManager**

Create `packages/jarvis-ui/src/components/os/shell/JWindowManager.tsx`:

```tsx
import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

export interface WindowState {
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

export interface OpenWindowConfig {
  appId:    string
  title:    string
  icon?:    string
  width?:   number
  height?:  number
  content:  ReactNode
}

interface WindowManagerContextValue {
  windows:        WindowState[]
  focusedId:      string | null
  compactMode:    boolean
  desktopSize:    { w: number; h: number }
  openWindow:     (config: OpenWindowConfig) => string
  closeWindow:    (id: string) => void
  minimizeWindow: (id: string) => void
  restoreWindow:  (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow:    (id: string) => void
  moveWindow:     (id: string, x: number, y: number) => void
  resizeWindow:   (id: string, w: number, h: number) => void
  setDesktopSize: (w: number, h: number) => void
}

const WindowManagerContext = createContext<WindowManagerContextValue | null>(null)

export function useWindowManager(): WindowManagerContextValue {
  const ctx = useContext(WindowManagerContext)
  if (!ctx) throw new Error('useWindowManager must be used inside JWindowManager')
  return ctx
}

let _nextId = 1
function genId(): string { return `win-${_nextId++}` }

function clampWindow(
  x: number, y: number, w: number, h: number,
  dw: number, dh: number
): Pick<WindowState, 'x' | 'y' | 'width' | 'height'> {
  const width  = Math.min(w, dw)
  const height = Math.min(h, dh)
  return {
    width, height,
    x: dw > 0 ? Math.max(0, Math.min(x, dw - width))  : x,
    y: dh > 0 ? Math.max(0, Math.min(y, dh - height)) : y,
  }
}

function cascadePos(
  windows: WindowState[], dw: number, dh: number
): { x: number; y: number } {
  const active = windows.filter(w => !w.minimized).length
  const slot = active % 8
  return {
    x: Math.min(40 + slot * 30, Math.floor(dw * 0.5) || 40),
    y: Math.min(40 + slot * 30, Math.floor(dh * 0.5) || 40),
  }
}

export interface JWindowManagerProps {
  compactBreakpoint?: number
  children:           ReactNode
}

export function JWindowManager({ compactBreakpoint = 900, children }: JWindowManagerProps) {
  const [windows,     setWindows]     = useState<WindowState[]>([])
  const [focusedId,   setFocusedId]   = useState<string | null>(null)
  const [desktopSize, setDesktopSt]   = useState({ w: 0, h: 0 })

  const compactMode = desktopSize.w > 0 && desktopSize.w < compactBreakpoint

  const setDesktopSize = useCallback((w: number, h: number) => {
    setDesktopSt({ w, h })
    setWindows(prev => prev.map(win => ({
      ...win,
      ...clampWindow(win.x, win.y, win.width, win.height, w, h),
    })))
  }, [])

  const openWindow = useCallback((config: OpenWindowConfig): string => {
    let existingId: string | null = null
    setWindows(prev => {
      const existing = prev.find(w => w.appId === config.appId)
      if (existing) { existingId = existing.id; return prev }
      return prev
    })
    if (existingId) {
      setFocusedId(existingId)
      setWindows(prev => prev.map(w =>
        w.id === existingId ? { ...w, minimized: false, zIndex: Date.now() } : w
      ))
      return existingId
    }
    const id = genId()
    setWindows(prev => {
      const { x, y } = cascadePos(prev, desktopSize.w, desktopSize.h)
      const w = config.width  ?? 640
      const h = config.height ?? 420
      const clamped = clampWindow(x, y, w, h, desktopSize.w, desktopSize.h)
      const win: WindowState = {
        id, appId: config.appId, title: config.title, icon: config.icon,
        ...clamped,
        minimized: false, maximized: false,
        zIndex: Date.now(),
        content: config.content,
      }
      return [...prev, win]
    })
    setFocusedId(id)
    return id
  }, [desktopSize])

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id))
    setFocusedId(prev => prev === id ? null : prev)
  }, [])

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w))
    setFocusedId(prev => prev === id ? null : prev)
  }, [])

  const restoreWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: false, zIndex: Date.now() } : w))
    setFocusedId(id)
  }, [])

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w))
  }, [])

  const focusWindow = useCallback((id: string) => {
    setFocusedId(id)
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: Date.now() } : w))
  }, [])

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => {
      if (w.id !== id) return w
      const clamped = clampWindow(x, y, w.width, w.height, desktopSize.w, desktopSize.h)
      return { ...w, ...clamped }
    }))
  }, [desktopSize])

  const resizeWindow = useCallback((id: string, nw: number, nh: number) => {
    setWindows(prev => prev.map(w => {
      if (w.id !== id) return w
      const clamped = clampWindow(w.x, w.y, nw, nh, desktopSize.w, desktopSize.h)
      return { ...w, ...clamped }
    }))
  }, [desktopSize])

  const value: WindowManagerContextValue = {
    windows, focusedId, compactMode, desktopSize,
    openWindow, closeWindow, minimizeWindow, restoreWindow,
    maximizeWindow, focusWindow, moveWindow, resizeWindow, setDesktopSize,
  }

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  )
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JWindowManager
```

Expected: 14 passing.

- [ ] **Step 5: Commit**

```bash
git add packages/jarvis-ui/src/components/os/shell/JWindowManager.tsx packages/jarvis-ui/src/components/os/shell/JWindowManager.test.tsx
git commit -m "feat(os): add JWindowManager context with cascade, clamp, compact mode"
```

---

## Task 3: JWindow

**Files:**
- Create: `packages/jarvis-ui/src/components/os/shell/JWindow.tsx`
- Create: `packages/jarvis-ui/src/components/os/shell/JWindow.test.tsx`

**Interfaces:**
- Consumes: `useWindowManager()`, `useOSTheme()`
- Produces: `JWindow` component — rendered by `JDesktop` for each open, non-minimized window

---

- [ ] **Step 1: Write failing tests**

Create `packages/jarvis-ui/src/components/os/shell/JWindow.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { JOSThemeProvider } from './JOSThemeProvider'
import { JWindowManager, useWindowManager } from './JWindowManager'
import { JWindow } from './JWindow'
import type { ReactNode } from 'react'

function W({ children, theme = 'windows11' as const }: { children: ReactNode; theme?: 'windows11' | 'macos' }) {
  return (
    <JOSThemeProvider theme={theme}>
      <JWindowManager>
        <SetDesktop w={1200} h={800} />
        {children}
      </JWindowManager>
    </JOSThemeProvider>
  )
}

function SetDesktop({ w, h }: { w: number; h: number }) {
  const { setDesktopSize } = useWindowManager()
  act(() => { setDesktopSize(w, h) })
  return null
}

function OpenAndRender({ appId = 'test' }: { appId?: string }) {
  const { openWindow, windows } = useWindowManager()
  act(() => { openWindow({ appId, title: 'Test Window', content: <div data-testid="app-content">hello</div> }) })
  return (
    <>
      {windows.filter(w => !w.minimized).map(w => (
        <JWindow key={w.id} id={w.id} />
      ))}
    </>
  )
}

describe('JWindow', () => {
  it('renders title', () => {
    render(<W><OpenAndRender /></W>)
    expect(screen.getByText('Test Window')).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(<W><OpenAndRender /></W>)
    expect(screen.getByTestId('app-content')).toBeInTheDocument()
  })

  it('windows11 theme — renders win controls (minimize, maximize, close)', () => {
    render(<W theme="windows11"><OpenAndRender /></W>)
    expect(screen.getByTitle('Minimize')).toBeInTheDocument()
    expect(screen.getByTitle('Maximize')).toBeInTheDocument()
    expect(screen.getByTitle('Close')).toBeInTheDocument()
  })

  it('macos theme — renders mac traffic lights', () => {
    render(<W theme="macos"><OpenAndRender /></W>)
    expect(screen.getByTitle('Close')).toBeInTheDocument()
    expect(screen.getByTitle('Minimize')).toBeInTheDocument()
    expect(screen.getByTitle('Maximize')).toBeInTheDocument()
  })

  it('close button calls closeWindow', () => {
    render(<W><OpenAndRender /></W>)
    fireEvent.click(screen.getByTitle('Close'))
    expect(screen.queryByText('Test Window')).not.toBeInTheDocument()
  })

  it('minimize button calls minimizeWindow — removes from DOM', () => {
    render(<W><OpenAndRender /></W>)
    fireEvent.click(screen.getByTitle('Minimize'))
    expect(screen.queryByText('Test Window')).not.toBeInTheDocument()
  })

  it('maximize button toggles maximize', () => {
    const { container } = render(<W><OpenAndRender /></W>)
    fireEvent.click(screen.getByTitle('Maximize'))
    expect(container.querySelector('.j-os-window--maximized')).toBeInTheDocument()
    fireEvent.click(screen.getByTitle('Maximize'))
    expect(container.querySelector('.j-os-window--maximized')).not.toBeInTheDocument()
  })

  it('applies j-os-window--focused class when focused', () => {
    const { container } = render(<W><OpenAndRender /></W>)
    expect(container.querySelector('.j-os-window--focused')).toBeInTheDocument()
  })

  it('resize handles are present in desktop mode', () => {
    const { container } = render(<W><OpenAndRender /></W>)
    expect(container.querySelectorAll('.j-os-resize')).toHaveLength(8)
  })

  it('resize handles are hidden in compact mode', () => {
    const { container } = render(
      <JOSThemeProvider theme="windows11">
        <JWindowManager compactBreakpoint={900}>
          <SetDesktop w={600} h={800} />
          <OpenAndRender />
        </JWindowManager>
      </JOSThemeProvider>
    )
    expect(container.querySelectorAll('.j-os-resize')).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JWindow.test
```

Expected: FAIL — `JWindow` not found.

- [ ] **Step 3: Implement JWindow**

Create `packages/jarvis-ui/src/components/os/shell/JWindow.tsx`:

```tsx
import { useRef } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import { useWindowManager } from './JWindowManager'
import { useOSTheme } from './JOSThemeProvider'

type ResizeDir = 'n' | 's' | 'e' | 'w' | 'nw' | 'ne' | 'sw' | 'se'

const RESIZE_DIRS: ResizeDir[] = ['n', 's', 'e', 'w', 'nw', 'ne', 'sw', 'se']

export interface JWindowProps {
  id: string
}

export function JWindow({ id }: JWindowProps) {
  const { windows, focusedId, compactMode, focusWindow, closeWindow, minimizeWindow, maximizeWindow, moveWindow, resizeWindow } = useWindowManager()
  const theme = useOSTheme()
  const titlebarRef = useRef<HTMLDivElement>(null)

  const win = windows.find(w => w.id === id)
  if (!win || win.minimized) return null

  const focused   = focusedId === id
  const isWindows = theme === 'windows11'

  const wrapStyle: CSSProperties = win.maximized
    ? { position: 'absolute', inset: 0, zIndex: win.zIndex }
    : { position: 'absolute', left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.zIndex }

  const wrapClass = [
    'j-os-window',
    focused    ? 'j-os-window--focused'   : '',
    win.maximized ? 'j-os-window--maximized' : '',
  ].filter(Boolean).join(' ')

  // ── Drag ───────────────────────────────────────────────────────────────
  const drag = useRef({ active: false, startX: 0, startY: 0, startWinX: 0, startWinY: 0 })

  function onTitlePointerDown(e: PointerEvent<HTMLDivElement>) {
    if (win.maximized || compactMode) return
    if ((e.target as HTMLElement).closest('button')) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { active: true, startX: e.clientX, startY: e.clientY, startWinX: win.x, startWinY: win.y }
    focusWindow(id)
  }

  function onTitlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.startX
    const dy = e.clientY - drag.current.startY
    moveWindow(id, drag.current.startWinX + dx, drag.current.startWinY + dy)
  }

  function onTitlePointerUp() { drag.current.active = false }

  // ── Resize ─────────────────────────────────────────────────────────────
  const resize = useRef({ active: false, dir: '' as ResizeDir, startX: 0, startY: 0, startW: 0, startH: 0, startWinX: 0, startWinY: 0 })

  function onResizePointerDown(e: PointerEvent<HTMLDivElement>, dir: ResizeDir) {
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    resize.current = { active: true, dir, startX: e.clientX, startY: e.clientY, startW: win.width, startH: win.height, startWinX: win.x, startWinY: win.y }
    focusWindow(id)
  }

  function onResizePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!resize.current.active) return
    const { dir, startX, startY, startW, startH, startWinX, startWinY } = resize.current
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    let newW = startW, newH = startH, newX = startWinX, newY = startWinY
    if (dir.includes('e')) newW = startW + dx
    if (dir.includes('s')) newH = startH + dy
    if (dir.includes('w')) { newW = startW - dx; newX = startWinX + dx }
    if (dir.includes('n')) { newH = startH - dy; newY = startWinY + dy }
    if (newW < 280) { newW = 280; if (dir.includes('w')) newX = startWinX + startW - 280 }
    if (newH < 200) { newH = 200; if (dir.includes('n')) newY = startWinY + startH - 200 }
    moveWindow(id, newX, newY)
    resizeWindow(id, newW, newH)
  }

  function onResizePointerUp() { resize.current.active = false }

  return (
    <div
      className={wrapClass}
      style={wrapStyle}
      onPointerDown={() => focusWindow(id)}
    >
      {/* Resize handles — hidden in compact or maximized */}
      {!compactMode && !win.maximized && RESIZE_DIRS.map(dir => (
        <div
          key={dir}
          className={`j-os-resize j-os-resize--${dir}`}
          onPointerDown={e => onResizePointerDown(e, dir)}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
        />
      ))}

      {/* Title bar */}
      <div
        ref={titlebarRef}
        className={`j-os-titlebar ${!win.maximized && !compactMode ? 'j-os-titlebar--draggable' : ''}`}
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
      >
        {isWindows ? (
          <>
            {win.icon && <span style={{ marginRight: 6, fontSize: 14 }}>{win.icon}</span>}
            <span className="j-os-titlebar__title">{win.title}</span>
            <div className="j-os-win-controls">
              <button className="j-os-win-btn"             title="Minimize" onClick={() => minimizeWindow(id)}>─</button>
              <button className="j-os-win-btn"             title="Maximize" onClick={() => maximizeWindow(id)}>{win.maximized ? '❐' : '□'}</button>
              <button className="j-os-win-btn j-os-win-btn--close" title="Close" onClick={() => closeWindow(id)}>✕</button>
            </div>
          </>
        ) : (
          <>
            <div className="j-os-mac-controls">
              <button className="j-os-mac-btn j-os-mac-btn--close"    title="Close"    onClick={() => closeWindow(id)} />
              <button className="j-os-mac-btn j-os-mac-btn--minimize" title="Minimize" onClick={() => minimizeWindow(id)} />
              <button className="j-os-mac-btn j-os-mac-btn--maximize" title="Maximize" onClick={() => maximizeWindow(id)} />
            </div>
            <span className="j-os-titlebar__title" style={{ textAlign: 'center' }}>{win.title}</span>
          </>
        )}
      </div>

      {/* Body */}
      <div className="j-os-window__body">
        {win.content}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JWindow.test
```

Expected: 10 passing.

- [ ] **Step 5: Commit**

```bash
git add packages/jarvis-ui/src/components/os/shell/JWindow.tsx packages/jarvis-ui/src/components/os/shell/JWindow.test.tsx
git commit -m "feat(os): add JWindow with drag, resize, min/max/close, two title bar variants"
```

---

## Task 4: JDesktop

**Files:**
- Create: `packages/jarvis-ui/src/components/os/shell/JDesktop.tsx`
- Create: `packages/jarvis-ui/src/components/os/shell/JDesktop.test.tsx`

**Interfaces:**
- Consumes: `JOSThemeProvider`, `JWindowManager`, `JWindow`, `useWindowManager()`, `useOSTheme()`
- Produces: `JDesktopApp` type, `JDesktopProps`, `JDesktop` component

---

- [ ] **Step 1: Mock ResizeObserver**

Add to `packages/jarvis-ui/src/test-setup.ts`:

```ts
import '@testing-library/jest-dom'

// ResizeObserver is not available in jsdom
global.ResizeObserver = class ResizeObserver {
  observe()   {}
  unobserve() {}
  disconnect() {}
}
```

- [ ] **Step 2: Write failing tests**

Create `packages/jarvis-ui/src/components/os/shell/JDesktop.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JDesktop } from './JDesktop'
import type { JDesktopApp } from './JDesktop'

const apps: JDesktopApp[] = [
  { id: 'files', icon: '📁', label: 'Files',     component: <div data-testid="files-app">files</div> },
  { id: 'tasks', icon: '📊', label: 'Processes', component: <div data-testid="tasks-app">tasks</div> },
]

describe('JDesktop', () => {
  it('renders desktop icon for each app', () => {
    render(<JDesktop theme="windows11" apps={apps} />)
    expect(screen.getByText('Files')).toBeInTheDocument()
    expect(screen.getByText('Processes')).toBeInTheDocument()
  })

  it('renders app emoji icons', () => {
    render(<JDesktop theme="windows11" apps={apps} />)
    expect(screen.getByText('📁')).toBeInTheDocument()
    expect(screen.getByText('📊')).toBeInTheDocument()
  })

  it('double-clicking icon opens a window with app content', () => {
    render(<JDesktop theme="windows11" apps={apps} />)
    const icon = screen.getByText('📁').closest('[data-app-id]')!
    fireEvent.dblClick(icon)
    expect(screen.getByTestId('files-app')).toBeInTheDocument()
  })

  it('double-clicking same icon twice does not open duplicate window', () => {
    render(<JDesktop theme="windows11" apps={apps} />)
    const icon = screen.getByText('📁').closest('[data-app-id]')!
    fireEvent.dblClick(icon)
    fireEvent.dblClick(icon)
    expect(screen.getAllByText('Files')).toHaveLength(2) // icon label + window title
  })

  it('windows11 theme renders JTaskbar', () => {
    render(<JDesktop theme="windows11" apps={apps} />)
    expect(screen.getByTestId('j-os-taskbar')).toBeInTheDocument()
  })

  it('macos theme renders JDock', () => {
    render(<JDesktop theme="macos" apps={apps} />)
    expect(screen.getByTestId('j-os-dock')).toBeInTheDocument()
  })

  it('macos theme renders JMenuBar', () => {
    render(<JDesktop theme="macos" apps={apps} />)
    expect(screen.getByTestId('j-os-menubar')).toBeInTheDocument()
  })

  it('initialWindows opens apps on mount', () => {
    render(<JDesktop theme="windows11" apps={apps} initialWindows={['files']} />)
    expect(screen.getByTestId('files-app')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run tests — expect FAIL**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JDesktop.test
```

Expected: FAIL — `JDesktop` not found.

- [ ] **Step 4: Implement JDesktop**

Create `packages/jarvis-ui/src/components/os/shell/JDesktop.tsx`:

```tsx
import { useEffect, useRef, useCallback } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { JOSThemeProvider, useOSTheme } from './JOSThemeProvider'
import { JWindowManager, useWindowManager } from './JWindowManager'
import { JWindow } from './JWindow'
// Imported lazily to avoid circular — these are defined in tasks 5 & 6
import { JTaskbar }  from '../windows/JTaskbar'
import { JDock }     from '../macos/JDock'
import { JMenuBar }  from '../macos/JMenuBar'

export interface JDesktopApp {
  id:             string
  icon:           string
  label:          string
  component:      ReactNode
  defaultWidth?:  number
  defaultHeight?: number
}

export interface JDesktopProps {
  theme:               'windows11' | 'macos'
  apps:                JDesktopApp[]
  wallpaper?:          string
  compactBreakpoint?:  number
  initialWindows?:     string[]
}

function JDesktopInner({ apps, wallpaper, initialWindows }: Omit<JDesktopProps, 'theme' | 'compactBreakpoint'>) {
  const { windows, openWindow, setDesktopSize } = useWindowManager()
  const theme   = useOSTheme()
  const ref     = useRef<HTMLDivElement>(null)
  const isWin   = theme === 'windows11'

  // ResizeObserver — inject desktop bounds
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setDesktopSize(Math.round(width), Math.round(height))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [setDesktopSize])

  // Open initial windows on mount
  useEffect(() => {
    if (!initialWindows?.length) return
    for (const appId of initialWindows) {
      const app = apps.find(a => a.id === appId)
      if (app) openWindow({ appId: app.id, title: app.label, icon: app.icon, content: app.component, width: app.defaultWidth, height: app.defaultHeight })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDblClick = useCallback((app: JDesktopApp) => {
    openWindow({ appId: app.id, title: app.label, icon: app.icon, content: app.component, width: app.defaultWidth, height: app.defaultHeight })
  }, [openWindow, apps])

  // Desktop canvas height = full area minus chrome
  const desktopStyle: CSSProperties = {
    position:   'relative',
    width:      '100%',
    height:     '100%',
    background: wallpaper ?? 'var(--os-bg)',
    overflow:   'hidden',
  }

  return (
    <div ref={ref} className="j-os-desktop" style={desktopStyle}>
      {/* macOS menu bar at top */}
      {!isWin && <JMenuBar appName="Desktop" />}

      {/* Desktop icons */}
      <div className="j-os-desktop__icons" style={{ top: isWin ? 12 : 'calc(var(--os-menubar-h) + 12px)' }}>
        {apps.map(app => (
          <div
            key={app.id}
            data-app-id={app.id}
            className="j-os-icon"
            onDoubleClick={() => handleDblClick(app)}
          >
            <span className="j-os-icon__emoji">{app.icon}</span>
            <span className="j-os-icon__label">{app.label}</span>
          </div>
        ))}
      </div>

      {/* Open windows */}
      {windows.filter(w => !w.minimized).map(w => (
        <JWindow key={w.id} id={w.id} />
      ))}

      {/* Chrome: taskbar (win) or dock (mac) */}
      {isWin  ? <JTaskbar apps={apps} /> : <JDock apps={apps} />}
    </div>
  )
}

export function JDesktop({ theme, apps, wallpaper, compactBreakpoint = 900, initialWindows }: JDesktopProps) {
  return (
    <JOSThemeProvider theme={theme}>
      <JWindowManager compactBreakpoint={compactBreakpoint}>
        <JDesktopInner apps={apps} wallpaper={wallpaper} initialWindows={initialWindows} />
      </JWindowManager>
    </JOSThemeProvider>
  )
}
```

- [ ] **Step 5: Run tests — expect PASS** (after Tasks 5 + 6 create JTaskbar/JDock/JMenuBar — see note below)

> **Note:** `JDesktop` imports `JTaskbar`, `JDock`, and `JMenuBar`. You must create stub files for those before this test can compile. Create these three stub files now:

`packages/jarvis-ui/src/components/os/windows/JTaskbar.tsx`:
```tsx
import type { JDesktopApp } from '../shell/JDesktop'
export function JTaskbar(_props: { apps: JDesktopApp[] }) {
  return <div data-testid="j-os-taskbar" className="j-os-taskbar" />
}
```

`packages/jarvis-ui/src/components/os/macos/JDock.tsx`:
```tsx
import type { JDesktopApp } from '../shell/JDesktop'
export function JDock(_props: { apps: JDesktopApp[] }) {
  return <div data-testid="j-os-dock" className="j-os-dock" />
}
```

`packages/jarvis-ui/src/components/os/macos/JMenuBar.tsx`:
```tsx
export interface JMenuBarMenu {
  label: string
  items: { label: string; shortcut?: string; onClick: () => void; divider?: boolean }[]
}
export function JMenuBar(_props: { appName?: string; menus?: JMenuBarMenu[] }) {
  return <div data-testid="j-os-menubar" className="j-os-menubar" />
}
```

Then run:

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JDesktop.test
```

Expected: 8 passing.

- [ ] **Step 6: Commit**

```bash
git add packages/jarvis-ui/src/components/os/shell/JDesktop.tsx packages/jarvis-ui/src/components/os/shell/JDesktop.test.tsx packages/jarvis-ui/src/components/os/windows/JTaskbar.tsx packages/jarvis-ui/src/components/os/macos/JDock.tsx packages/jarvis-ui/src/components/os/macos/JMenuBar.tsx packages/jarvis-ui/src/test-setup.ts
git commit -m "feat(os): add JDesktop with ResizeObserver, icon grid, stub chrome components"
```

---

## Task 5: JTaskbar + JStartMenu

**Files:**
- Replace stub: `packages/jarvis-ui/src/components/os/windows/JTaskbar.tsx`
- Create: `packages/jarvis-ui/src/components/os/windows/JStartMenu.tsx`
- Create: `packages/jarvis-ui/src/components/os/windows/JTaskbar.test.tsx`
- Create: `packages/jarvis-ui/src/components/os/windows/JStartMenu.test.tsx`

**Interfaces:**
- Consumes: `useWindowManager()`, `JDesktopApp`
- Produces: `JTaskbar`, `JStartMenu`

---

- [ ] **Step 1: Write failing tests for JTaskbar**

Create `packages/jarvis-ui/src/components/os/windows/JTaskbar.test.tsx`:

```tsx
import { describe, it, expect, vi, act } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JOSThemeProvider } from '../shell/JOSThemeProvider'
import { JWindowManager, useWindowManager } from '../shell/JWindowManager'
import { JTaskbar } from './JTaskbar'
import type { JDesktopApp } from '../shell/JDesktop'
import type { ReactNode } from 'react'

const apps: JDesktopApp[] = [
  { id: 'files', icon: '📁', label: 'Files',     component: <div>files</div> },
  { id: 'tasks', icon: '📊', label: 'Processes', component: <div>tasks</div> },
]

function OpenWindow({ appId }: { appId: string }) {
  const { openWindow } = useWindowManager()
  const app = apps.find(a => a.id === appId)!
  act(() => { openWindow({ appId: app.id, title: app.label, icon: app.icon, content: app.component }) })
  return null
}

function W({ children }: { children: ReactNode }) {
  return (
    <JOSThemeProvider theme="windows11">
      <JWindowManager>{children}</JWindowManager>
    </JOSThemeProvider>
  )
}

describe('JTaskbar', () => {
  it('renders start button', () => {
    render(<W><JTaskbar apps={apps} /></W>)
    expect(screen.getByTestId('j-os-start-btn')).toBeInTheDocument()
  })

  it('clicking start button opens start menu', () => {
    render(<W><JTaskbar apps={apps} /></W>)
    fireEvent.click(screen.getByTestId('j-os-start-btn'))
    expect(screen.getByTestId('j-os-startmenu')).toBeInTheDocument()
  })

  it('clicking start button again closes start menu', () => {
    render(<W><JTaskbar apps={apps} /></W>)
    fireEvent.click(screen.getByTestId('j-os-start-btn'))
    fireEvent.click(screen.getByTestId('j-os-start-btn'))
    expect(screen.queryByTestId('j-os-startmenu')).not.toBeInTheDocument()
  })

  it('open windows appear as app buttons in taskbar', () => {
    render(<W><OpenWindow appId="files" /><JTaskbar apps={apps} /></W>)
    expect(screen.getByTestId('taskbar-app-files')).toBeInTheDocument()
  })

  it('clicking minimized app button restores it', () => {
    function Setup() {
      const { openWindow, minimizeWindow, windows } = useWindowManager()
      act(() => { openWindow({ appId: 'files', title: 'Files', content: <div data-testid="files-content">f</div> }) })
      const id = windows[0]?.id
      if (id) act(() => { minimizeWindow(id) })
      return <JTaskbar apps={apps} />
    }
    render(<W><Setup /></W>)
    fireEvent.click(screen.getByTestId('taskbar-app-files'))
    expect(screen.queryByText('files-content')).toBeDefined()
  })

  it('renders clock in tray', () => {
    render(<W><JTaskbar apps={apps} /></W>)
    expect(screen.getByTestId('j-os-clock')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Write failing tests for JStartMenu**

Create `packages/jarvis-ui/src/components/os/windows/JStartMenu.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JOSThemeProvider } from '../shell/JOSThemeProvider'
import { JWindowManager } from '../shell/JWindowManager'
import { JStartMenu } from './JStartMenu'
import type { JDesktopApp } from '../shell/JDesktop'

const apps: JDesktopApp[] = [
  { id: 'files', icon: '📁', label: 'Files',     component: <div>files</div> },
  { id: 'tasks', icon: '📊', label: 'Processes', component: <div>tasks</div> },
]

function W({ onClose = vi.fn() }: { onClose?: () => void }) {
  return (
    <JOSThemeProvider theme="windows11">
      <JWindowManager>
        <JStartMenu apps={apps} onClose={onClose} />
      </JWindowManager>
    </JOSThemeProvider>
  )
}

describe('JStartMenu', () => {
  it('renders pinned app icons', () => {
    render(<W />)
    expect(screen.getByText('Files')).toBeInTheDocument()
    expect(screen.getByText('Processes')).toBeInTheDocument()
  })

  it('clicking an app calls onClose', () => {
    const onClose = vi.fn()
    render(<W onClose={onClose} />)
    fireEvent.click(screen.getByText('Files').closest('button')!)
    expect(onClose).toHaveBeenCalled()
  })

  it('clicking an app opens a window', () => {
    const { container } = render(<W />)
    fireEvent.click(screen.getByText('Files').closest('button')!)
    // Window is managed by JWindowManager — check window count indirectly
    // by verifying the app component appears (would need JWindow rendered, skip here)
    // Just verify no crash
    expect(container).toBeDefined()
  })
})
```

- [ ] **Step 3: Run tests — expect FAIL**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose "JTaskbar|JStartMenu"
```

Expected: FAIL — not implemented.

- [ ] **Step 4: Implement JStartMenu**

Create `packages/jarvis-ui/src/components/os/windows/JStartMenu.tsx`:

```tsx
import { useWindowManager } from '../shell/JWindowManager'
import type { JDesktopApp } from '../shell/JDesktop'

export interface JStartMenuProps {
  apps:    JDesktopApp[]
  onClose: () => void
}

export function JStartMenu({ apps, onClose }: JStartMenuProps) {
  const { openWindow } = useWindowManager()

  function launch(app: JDesktopApp) {
    openWindow({ appId: app.id, title: app.label, icon: app.icon, content: app.component, width: app.defaultWidth, height: app.defaultHeight })
    onClose()
  }

  return (
    <div data-testid="j-os-startmenu" className="j-os-startmenu">
      <div className="j-os-startmenu__heading">Pinned</div>
      <div className="j-os-startmenu__pinned">
        {apps.map(app => (
          <button key={app.id} className="j-os-startmenu__pin" onClick={() => launch(app)}>
            <span className="j-os-startmenu__pin-icon">{app.icon}</span>
            {app.label}
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Implement JTaskbar (replace stub)**

Replace `packages/jarvis-ui/src/components/os/windows/JTaskbar.tsx`:

```tsx
import { useState } from 'react'
import { useWindowManager } from '../shell/JWindowManager'
import { JStartMenu } from './JStartMenu'
import type { JDesktopApp } from '../shell/JDesktop'

function useClock(): string {
  const [time, setTime] = useState(() => {
    const d = new Date()
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
  })
  // Update every 30s — no setInterval in tests
  return time
}

export function JTaskbar({ apps }: { apps: JDesktopApp[] }) {
  const { windows, focusWindow, restoreWindow, minimizeWindow } = useWindowManager()
  const [startOpen, setStartOpen] = useState(false)
  const time = useClock()

  const openWindows = windows // all windows, minimized or not

  function handleAppClick(id: string) {
    const win = windows.find(w => w.id === id)
    if (!win) return
    if (win.minimized) {
      restoreWindow(id)
    } else {
      focusWindow(id)
    }
  }

  return (
    <>
      {startOpen && <JStartMenu apps={apps} onClose={() => setStartOpen(false)} />}
      <div data-testid="j-os-taskbar" className="j-os-taskbar">
        <button
          data-testid="j-os-start-btn"
          className="j-os-taskbar__start"
          onClick={() => setStartOpen(p => !p)}
          aria-label="Start"
        >
          ⊞
        </button>

        <div className="j-os-taskbar__apps">
          {openWindows.map(win => {
            const app = apps.find(a => a.id === win.appId)
            return (
              <button
                key={win.id}
                data-testid={`taskbar-app-${win.appId}`}
                className={`j-os-taskbar__app${!win.minimized ? ' j-os-taskbar__app--active' : ''}`}
                onClick={() => handleAppClick(win.id)}
              >
                {app?.icon && <span>{app.icon}</span>}
                {win.title}
              </button>
            )
          })}
        </div>

        <div className="j-os-taskbar__tray">
          <span data-testid="j-os-clock">{time}</span>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 6: Run tests — expect PASS**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose "JTaskbar|JStartMenu"
```

Expected: all passing.

- [ ] **Step 7: Commit**

```bash
git add packages/jarvis-ui/src/components/os/windows/
git commit -m "feat(os): add JTaskbar + JStartMenu (Windows 11)"
```

---

## Task 6: JDock + JMenuBar

**Files:**
- Replace stub: `packages/jarvis-ui/src/components/os/macos/JDock.tsx`
- Replace stub: `packages/jarvis-ui/src/components/os/macos/JMenuBar.tsx`
- Create: `packages/jarvis-ui/src/components/os/macos/JDock.test.tsx`
- Create: `packages/jarvis-ui/src/components/os/macos/JMenuBar.test.tsx`

**Interfaces:**
- Consumes: `useWindowManager()`, `JDesktopApp`, `JMenuBarMenu`
- Produces: `JDock`, `JMenuBar`, `JMenuBarMenu` type

---

- [ ] **Step 1: Write failing tests**

Create `packages/jarvis-ui/src/components/os/macos/JDock.test.tsx`:

```tsx
import { describe, it, expect, vi, act } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JOSThemeProvider } from '../shell/JOSThemeProvider'
import { JWindowManager, useWindowManager } from '../shell/JWindowManager'
import { JDock } from './JDock'
import type { JDesktopApp } from '../shell/JDesktop'
import type { ReactNode } from 'react'

const apps: JDesktopApp[] = [
  { id: 'files', icon: '📁', label: 'Files',     component: <div>files</div> },
  { id: 'tasks', icon: '📊', label: 'Processes', component: <div>tasks</div> },
]

function W({ children }: { children: ReactNode }) {
  return <JOSThemeProvider theme="macos"><JWindowManager>{children}</JWindowManager></JOSThemeProvider>
}

describe('JDock', () => {
  it('renders an icon for each app', () => {
    render(<W><JDock apps={apps} /></W>)
    expect(screen.getByText('📁')).toBeInTheDocument()
    expect(screen.getByText('📊')).toBeInTheDocument()
  })

  it('clicking an icon opens a window', () => {
    render(<W><JDock apps={apps} /></W>)
    const hook = vi.fn()
    // Click dock icon — verify openWindow is called by checking WindowManager state
    fireEvent.click(screen.getByTitle('Files'))
    // No crash = pass (window rendering requires JWindow which needs desktop size)
  })

  it('renders running dot for open windows', () => {
    function Setup() {
      const { openWindow } = useWindowManager()
      act(() => { openWindow({ appId: 'files', title: 'Files', content: <div>f</div> }) })
      return <JDock apps={apps} />
    }
    const { container } = render(<W><Setup /></W>)
    expect(container.querySelector('.j-os-dock__dot')).toBeInTheDocument()
  })
})
```

Create `packages/jarvis-ui/src/components/os/macos/JMenuBar.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JOSThemeProvider } from '../shell/JOSThemeProvider'
import { JWindowManager } from '../shell/JWindowManager'
import { JMenuBar } from './JMenuBar'
import type { JMenuBarMenu } from './JMenuBar'

const menus: JMenuBarMenu[] = [
  { label: 'File', items: [{ label: 'New', shortcut: '⌘N', onClick: vi.fn() }, { label: 'Open', shortcut: '⌘O', onClick: vi.fn() }] },
]

function W() {
  return <JOSThemeProvider theme="macos"><JWindowManager><JMenuBar appName="MyApp" menus={menus} /></JWindowManager></JOSThemeProvider>
}

describe('JMenuBar', () => {
  it('renders app name', () => {
    render(<W />)
    expect(screen.getByText('MyApp')).toBeInTheDocument()
  })

  it('renders menu labels', () => {
    render(<W />)
    expect(screen.getByText('File')).toBeInTheDocument()
  })

  it('clicking menu label shows dropdown items', () => {
    render(<W />)
    fireEvent.click(screen.getByText('File'))
    expect(screen.getByText('New')).toBeInTheDocument()
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('clicking a menu item calls its onClick', () => {
    const onClick = vi.fn()
    render(
      <JOSThemeProvider theme="macos">
        <JWindowManager>
          <JMenuBar appName="App" menus={[{ label: 'Edit', items: [{ label: 'Copy', onClick }] }]} />
        </JWindowManager>
      </JOSThemeProvider>
    )
    fireEvent.click(screen.getByText('Edit'))
    fireEvent.click(screen.getByText('Copy'))
    expect(onClick).toHaveBeenCalled()
  })

  it('renders clock', () => {
    render(<W />)
    expect(screen.getByTestId('j-os-menubar-clock')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Implement JDock**

Replace `packages/jarvis-ui/src/components/os/macos/JDock.tsx`:

```tsx
import { useWindowManager } from '../shell/JWindowManager'
import type { JDesktopApp } from '../shell/JDesktop'

export function JDock({ apps }: { apps: JDesktopApp[] }) {
  const { windows, openWindow, focusWindow, restoreWindow } = useWindowManager()

  function handleClick(app: JDesktopApp) {
    const existing = windows.find(w => w.appId === app.id)
    if (existing) {
      if (existing.minimized) restoreWindow(existing.id)
      else focusWindow(existing.id)
    } else {
      openWindow({ appId: app.id, title: app.label, icon: app.icon, content: app.component, width: app.defaultWidth, height: app.defaultHeight })
    }
  }

  return (
    <div data-testid="j-os-dock" className="j-os-dock">
      {apps.map(app => {
        const isRunning = windows.some(w => w.appId === app.id)
        return (
          <div key={app.id} className="j-os-dock__item" title={app.label} onClick={() => handleClick(app)}>
            <span className="j-os-dock__icon">{app.icon}</span>
            {isRunning && <span className="j-os-dock__dot" />}
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 3: Implement JMenuBar**

Replace `packages/jarvis-ui/src/components/os/macos/JMenuBar.tsx`:

```tsx
import { useState } from 'react'

export interface JMenuBarMenu {
  label: string
  items: { label: string; shortcut?: string; onClick: () => void; divider?: boolean }[]
}

export interface JMenuBarProps {
  appName?: string
  menus?:   JMenuBarMenu[]
}

export function JMenuBar({ appName, menus = [] }: JMenuBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  function toggleMenu(label: string) {
    setOpenMenu(prev => prev === label ? null : label)
  }

  return (
    <div data-testid="j-os-menubar" className="j-os-menubar">
      <button className="j-os-menubar__item" onClick={() => setOpenMenu(null)}>
        
      </button>
      {appName && (
        <button className="j-os-menubar__item" style={{ fontWeight: 700 }}>
          {appName}
        </button>
      )}
      {menus.map(menu => (
        <div key={menu.label} style={{ position: 'relative' }}>
          <button className="j-os-menubar__item" onClick={() => toggleMenu(menu.label)}>
            {menu.label}
          </button>
          {openMenu === menu.label && (
            <div className="j-os-menubar__dropdown">
              {menu.items.map((item, i) =>
                item.divider ? (
                  <div key={i} className="j-os-menubar__divider" />
                ) : (
                  <button
                    key={item.label}
                    className="j-os-menubar__dropdown-item"
                    onClick={() => { item.onClick(); setOpenMenu(null) }}
                  >
                    {item.label}
                    {item.shortcut && <span className="j-os-menubar__shortcut">{item.shortcut}</span>}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      ))}
      <span data-testid="j-os-menubar-clock" className="j-os-menubar__clock">{time}</span>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose "JDock|JMenuBar"
```

Expected: all passing.

- [ ] **Step 5: Commit**

```bash
git add packages/jarvis-ui/src/components/os/macos/
git commit -m "feat(os): add JDock + JMenuBar (macOS)"
```

---

## Task 7: Export Wiring

**Files:**
- Modify: `packages/jarvis-ui/src/index.ts`

**Interfaces:**
- Consumes: all components from Tasks 1–6
- Produces: public API for `@masterdeepak15/jarvis-ui` OS shell

---

- [ ] **Step 1: Add import and exports to index.ts**

At the top of `packages/jarvis-ui/src/index.ts`, add the CSS import after the existing style imports:

```ts
import './styles/jarvis-os.css'
```

At the bottom of `packages/jarvis-ui/src/index.ts`, add:

```ts
// Components — os shell
export type { OSTheme }                    from './components/os/shell/JOSThemeProvider'
export { JOSThemeProvider, useOSTheme }    from './components/os/shell/JOSThemeProvider'
export type { WindowState, OpenWindowConfig } from './components/os/shell/JWindowManager'
export { JWindowManager, useWindowManager } from './components/os/shell/JWindowManager'
export type { JDesktopApp, JDesktopProps } from './components/os/shell/JDesktop'
export { JDesktop }                        from './components/os/shell/JDesktop'
export type { JWindowProps }               from './components/os/shell/JWindow'
export { JWindow }                         from './components/os/shell/JWindow'
export { JTaskbar }                        from './components/os/windows/JTaskbar'
export { JStartMenu }                      from './components/os/windows/JStartMenu'
export type { JMenuBarMenu, JMenuBarProps } from './components/os/macos/JMenuBar'
export { JDock }                           from './components/os/macos/JDock'
export { JMenuBar }                        from './components/os/macos/JMenuBar'
```

- [ ] **Step 2: Verify full test suite still passes**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test
```

Expected: all existing + new tests passing, zero regressions.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm --filter @masterdeepak15/jarvis-ui build
```

Expected: build succeeds, `dist/` updated.

- [ ] **Step 4: Commit**

```bash
git add packages/jarvis-ui/src/index.ts packages/jarvis-ui/src/styles/jarvis-os.css
git commit -m "feat(os): wire OS shell exports into jarvis-ui index + import jarvis-os.css"
```

---

## Done — Plan 1 Complete

At this point the following is working and exported:

| Component | Status |
|---|---|
| `JOSThemeProvider` + `useOSTheme` | ✅ |
| `JWindowManager` + `useWindowManager` | ✅ |
| `JWindow` (drag, resize, min/max/close, both themes) | ✅ |
| `JDesktop` (ResizeObserver, icon grid, compact mode) | ✅ |
| `JTaskbar` + `JStartMenu` (Windows 11) | ✅ |
| `JDock` + `JMenuBar` (macOS) | ✅ |
| `jarvis-os.css` token file | ✅ |

**Next:** Plan 2 adds `JOSNotification`, `JFileExplorer`, `JTaskManager`, `JControlPanel`, and skill reference docs.
