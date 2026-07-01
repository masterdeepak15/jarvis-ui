# OS Shell Kit — Plan 2: App Components + Skill Docs

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `JOSNotification`, `JFileExplorer`, `JTaskManager`, `JControlPanel`, complete the export wiring, and write all skill reference docs.

**Architecture:** App components live under `components/os/apps/`. `JOSNotification` uses `createPortal` and reads the active OS theme from `JOSThemeProvider` context to pick its position. All app components are pure renderers — the consumer passes data props and event handlers; no internal network or filesystem access.

**Tech Stack:** React 18, TypeScript, Vitest + React Testing Library, `createPortal`, CSS custom properties.

> **Prerequisite:** Plan 1 must be complete and all tests passing before starting Plan 2. Run `pnpm --filter @masterdeepak15/jarvis-ui test` and confirm zero failures.

> **This is Plan 2 of 2.**

## Global Constraints

- All new source files under `packages/jarvis-ui/src/components/os/`
- CSS tokens use existing `--os-*` namespace from `jarvis-os.css` — no new token files
- No new npm dependencies — pointer events, ResizeObserver, createPortal only
- Test wrapper for notification tests: always wrap in `JOSThemeProvider` + `JWindowManager` + `JOSNotificationProvider`
- `ReactNode` app content always comes from props — no JSX generated inside components
- TypeScript strict — no `any`

---

## File Map

| File | Purpose |
|---|---|
| `src/components/os/shared/JOSNotification.tsx` | Portal-based toast stack, theme-aware position, `useOSNotify()` hook |
| `src/components/os/shared/JOSNotification.test.tsx` | Tests: notify call, stack, auto-dismiss, position by theme |
| `src/components/os/apps/JFileExplorer.tsx` | Two-pane tree browser |
| `src/components/os/apps/JFileExplorer.test.tsx` | Tests: tree render, expand/collapse, selection, open callback |
| `src/components/os/apps/JTaskManager.tsx` | Sortable process table with bars |
| `src/components/os/apps/JTaskManager.test.tsx` | Tests: process render, sort, kill callback |
| `src/components/os/apps/JControlPanel.tsx` | Icon grid + section content pane + search |
| `src/components/os/apps/JControlPanel.test.tsx` | Tests: section render, selection, search filter |
| `src/index.ts` | Add remaining OS exports |
| `skills/jarvis-ui-react/references/JOSShell.md` | Combined OS shell skill reference doc |

---

## Task 1: JOSNotification

**Files:**
- Create: `packages/jarvis-ui/src/components/os/shared/JOSNotification.tsx`
- Create: `packages/jarvis-ui/src/components/os/shared/JOSNotification.test.tsx`

**Interfaces:**
- Consumes: `useOSTheme()` from `JOSThemeProvider`
- Produces: `JOSNotificationProvider`, `useOSNotify()`, `OSNotifyConfig` type

---

- [ ] **Step 1: Add notification CSS to jarvis-os.css**

Append to `packages/jarvis-ui/src/styles/jarvis-os.css`:

```css
/* Notifications */
.j-os-notif-stack {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

/* Windows 11: bottom-right */
[data-os-theme="windows11"] .j-os-notif-stack {
  bottom: calc(var(--os-taskbar-h, 48px) + 12px);
  right: 12px;
  align-items: flex-end;
}

/* macOS: top-right */
[data-os-theme="macos"] .j-os-notif-stack {
  top: calc(var(--os-menubar-h, 24px) + 8px);
  right: 12px;
  align-items: flex-end;
}

.j-os-notif {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 320px;
  padding: 12px 14px;
  background: var(--os-surface-alt);
  border: 1px solid var(--os-border);
  border-radius: var(--os-radius);
  box-shadow: var(--os-shadow);
  backdrop-filter: var(--os-backdrop);
  pointer-events: all;
  animation: j-os-notif-in 0.2s ease;
}

@keyframes j-os-notif-in {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}

.j-os-notif__icon  { font-size: 20px; flex-shrink: 0; }
.j-os-notif__body  { flex: 1; min-width: 0; }
.j-os-notif__title { font-size: 13px; font-weight: 600; color: var(--os-text); margin-bottom: 2px; }
.j-os-notif__text  { font-size: 12px; color: var(--os-text-muted); word-break: break-word; }

.j-os-notif__close {
  background: transparent;
  border: none;
  color: var(--os-text-muted);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  padding: 0;
  flex-shrink: 0;
}

.j-os-notif__close:hover { color: var(--os-text); }
```

- [ ] **Step 2: Write failing tests**

Create `packages/jarvis-ui/src/components/os/shared/JOSNotification.test.tsx`:

```tsx
import { describe, it, expect, vi, act } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JOSThemeProvider } from '../shell/JOSThemeProvider'
import { JWindowManager } from '../shell/JWindowManager'
import { JOSNotificationProvider, useOSNotify } from './JOSNotification'
import type { ReactNode } from 'react'

function W({ children, theme = 'windows11' as const }: { children: ReactNode; theme?: 'windows11' | 'macos' }) {
  return (
    <JOSThemeProvider theme={theme}>
      <JWindowManager>
        <JOSNotificationProvider>
          {children}
        </JOSNotificationProvider>
      </JWindowManager>
    </JOSThemeProvider>
  )
}

function NotifyButton({ title, body, icon, duration }: { title: string; body?: string; icon?: string; duration?: number }) {
  const { notify } = useOSNotify()
  return <button onClick={() => notify({ title, body, icon, duration })}>notify</button>
}

describe('JOSNotification', () => {
  it('renders notification after notify() call', () => {
    render(<W><NotifyButton title="Test Alert" body="Something happened" /></W>)
    fireEvent.click(screen.getByText('notify'))
    expect(screen.getByText('Test Alert')).toBeInTheDocument()
    expect(screen.getByText('Something happened')).toBeInTheDocument()
  })

  it('renders icon if provided', () => {
    render(<W><NotifyButton title="Alert" icon="🔔" /></W>)
    fireEvent.click(screen.getByText('notify'))
    expect(screen.getByText('🔔')).toBeInTheDocument()
  })

  it('close button dismisses notification', () => {
    render(<W><NotifyButton title="Dismiss Me" /></W>)
    fireEvent.click(screen.getByText('notify'))
    fireEvent.click(screen.getByTitle('Dismiss'))
    expect(screen.queryByText('Dismiss Me')).not.toBeInTheDocument()
  })

  it('stacks multiple notifications', () => {
    render(
      <W>
        <NotifyButton title="First"  />
        <NotifyButton title="Second" />
      </W>
    )
    const buttons = screen.getAllByText('notify')
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[1])
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('caps visible notifications at 4', () => {
    function MultiNotify() {
      const { notify } = useOSNotify()
      return (
        <button onClick={() => {
          for (let i = 0; i < 6; i++) {
            notify({ title: `Alert ${i}`, duration: 0 })
          }
        }}>multi</button>
      )
    }
    render(<W><MultiNotify /></W>)
    fireEvent.click(screen.getByText('multi'))
    // Max 4 visible; extras queued
    const notifs = document.querySelectorAll('.j-os-notif')
    expect(notifs.length).toBeLessThanOrEqual(4)
  })

  it('notification stack has correct data-testid', () => {
    render(<W><NotifyButton title="Ping" /></W>)
    fireEvent.click(screen.getByText('notify'))
    expect(document.querySelector('[data-testid="j-os-notif-stack"]')).toBeInTheDocument()
  })

  it('throws if useOSNotify used outside JOSNotificationProvider', () => {
    // Suppress console.error for this test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    function BadConsumer() {
      useOSNotify()
      return null
    }
    expect(() => render(<BadConsumer />)).toThrow()
    spy.mockRestore()
  })
})
```

- [ ] **Step 3: Run tests — expect FAIL**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JOSNotification
```

Expected: FAIL — `JOSNotification` not found.

- [ ] **Step 4: Implement JOSNotification**

Create `packages/jarvis-ui/src/components/os/shared/JOSNotification.tsx`:

```tsx
import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { useOSTheme } from '../shell/JOSThemeProvider'

export interface OSNotifyConfig {
  title:     string
  body?:     string
  icon?:     string
  duration?: number  // ms, default 4000; 0 = persistent
}

interface NotifEntry extends OSNotifyConfig {
  id: string
}

interface OSNotifyContextValue {
  notify: (config: OSNotifyConfig) => void
}

const OSNotifyContext = createContext<OSNotifyContextValue | null>(null)

export function useOSNotify(): OSNotifyContextValue {
  const ctx = useContext(OSNotifyContext)
  if (!ctx) throw new Error('useOSNotify must be used inside JOSNotificationProvider')
  return ctx
}

const MAX_VISIBLE = 4
let _notifId = 1

export function JOSNotificationProvider({ children }: { children: ReactNode }) {
  const [queue,   setQueue]   = useState<NotifEntry[]>([])
  const [visible, setVisible] = useState<NotifEntry[]>([])
  const theme = useOSTheme()

  const dismiss = useCallback((id: string) => {
    setVisible(prev => prev.filter(n => n.id !== id))
  }, [])

  // Drain queue into visible when slots are free
  useEffect(() => {
    if (queue.length > 0 && visible.length < MAX_VISIBLE) {
      const take = Math.min(queue.length, MAX_VISIBLE - visible.length)
      setVisible(prev => [...prev, ...queue.slice(0, take)])
      setQueue(prev => prev.slice(take))
    }
  }, [queue, visible.length])

  // Auto-dismiss
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    for (const n of visible) {
      const dur = n.duration ?? 4000
      if (dur > 0) {
        timers.push(setTimeout(() => dismiss(n.id), dur))
      }
    }
    return () => timers.forEach(clearTimeout)
  }, [visible, dismiss])

  const notify = useCallback((config: OSNotifyConfig) => {
    const entry: NotifEntry = { ...config, id: `notif-${_notifId++}` }
    setVisible(prev => {
      if (prev.length < MAX_VISIBLE) return [...prev, entry]
      // queue it
      setQueue(q => [...q, entry])
      return prev
    })
  }, [])

  const stack = (
    <div
      data-testid="j-os-notif-stack"
      data-os-theme={theme}
      className="j-os-notif-stack"
    >
      {visible.map(n => (
        <div key={n.id} className="j-os-notif" role="alert">
          {n.icon && <span className="j-os-notif__icon">{n.icon}</span>}
          <div className="j-os-notif__body">
            <div className="j-os-notif__title">{n.title}</div>
            {n.body && <div className="j-os-notif__text">{n.body}</div>}
          </div>
          <button className="j-os-notif__close" title="Dismiss" onClick={() => dismiss(n.id)}>✕</button>
        </div>
      ))}
    </div>
  )

  return (
    <OSNotifyContext.Provider value={{ notify }}>
      {children}
      {createPortal(stack, document.body)}
    </OSNotifyContext.Provider>
  )
}
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JOSNotification
```

Expected: 7 passing.

- [ ] **Step 6: Commit**

```bash
git add packages/jarvis-ui/src/components/os/shared/ packages/jarvis-ui/src/styles/jarvis-os.css
git commit -m "feat(os): add JOSNotification with portal, stack, auto-dismiss, theme position"
```

---

## Task 2: JFileExplorer

**Files:**
- Create: `packages/jarvis-ui/src/components/os/apps/JFileExplorer.tsx`
- Create: `packages/jarvis-ui/src/components/os/apps/JFileExplorer.test.tsx`

**Interfaces:**
- Consumes: CSS tokens (`--os-*`)
- Produces: `JFileNode` type, `JFileExplorerProps`, `JFileExplorer` component

---

- [ ] **Step 1: Add file explorer CSS to jarvis-os.css**

Append to `packages/jarvis-ui/src/styles/jarvis-os.css`:

```css
/* File Explorer */
.j-os-fileexplorer {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: var(--os-font);
  color: var(--os-text);
  background: var(--os-bg);
}

.j-os-fileexplorer__breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--os-border);
  font-size: 12px;
  color: var(--os-text-muted);
  flex-shrink: 0;
  overflow-x: auto;
  white-space: nowrap;
}

.j-os-fileexplorer__breadcrumb-sep { margin: 0 2px; }
.j-os-fileexplorer__breadcrumb-item {
  cursor: pointer;
  color: var(--os-text-muted);
  background: transparent;
  border: none;
  font-family: var(--os-font);
  font-size: 12px;
  padding: 2px 4px;
  border-radius: var(--os-radius-sm);
}
.j-os-fileexplorer__breadcrumb-item:hover { color: var(--os-text); background: rgba(255,255,255,0.06); }

.j-os-fileexplorer__body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.j-os-fileexplorer__tree {
  width: 200px;
  min-width: 140px;
  border-right: 1px solid var(--os-border);
  overflow-y: auto;
  padding: 8px 0;
  flex-shrink: 0;
}

.j-os-fileexplorer__pane {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
  gap: 8px;
  align-content: start;
}

.j-os-tree-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  color: var(--os-text);
  border-radius: var(--os-radius-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.j-os-tree-item:hover    { background: rgba(255,255,255,0.06); }
.j-os-tree-item--active  { background: rgba(255,255,255,0.12); }
.j-os-tree-item__caret   { font-size: 10px; flex-shrink: 0; }

.j-os-pane-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  cursor: pointer;
  border-radius: var(--os-radius-sm);
  text-align: center;
  user-select: none;
}

.j-os-pane-item:hover   { background: rgba(255,255,255,0.08); }
.j-os-pane-item--active { background: rgba(255,255,255,0.14); }
.j-os-pane-item__icon   { font-size: 28px; line-height: 1; }
.j-os-pane-item__name   { font-size: 11px; color: var(--os-text); word-break: break-word; }
```

- [ ] **Step 2: Write failing tests**

Create `packages/jarvis-ui/src/components/os/apps/JFileExplorer.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JFileExplorer } from './JFileExplorer'
import type { JFileNode } from './JFileExplorer'

const tree: JFileNode[] = [
  {
    id: 'root', name: 'Root', type: 'folder',
    children: [
      {
        id: 'docs', name: 'Documents', type: 'folder',
        children: [
          { id: 'report', name: 'report.pdf', type: 'file', meta: { size: '4 KB' } },
        ],
      },
      { id: 'img', name: 'image.png', type: 'file' },
    ],
  },
]

describe('JFileExplorer', () => {
  it('renders top-level folder in tree', () => {
    render(<JFileExplorer tree={tree} />)
    expect(screen.getByText('Root')).toBeInTheDocument()
  })

  it('clicking folder expands its children in tree', () => {
    render(<JFileExplorer tree={tree} />)
    fireEvent.click(screen.getByText('Root'))
    expect(screen.getByText('Documents')).toBeInTheDocument()
  })

  it('clicking folder again collapses it', () => {
    render(<JFileExplorer tree={tree} />)
    fireEvent.click(screen.getByText('Root'))
    expect(screen.getByText('Documents')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Root'))
    expect(screen.queryByText('Documents')).not.toBeInTheDocument()
  })

  it('selecting a folder shows its children in right pane', () => {
    render(<JFileExplorer tree={tree} />)
    fireEvent.click(screen.getByText('Root'))
    fireEvent.click(screen.getByText('Documents'))
    expect(screen.getByText('report.pdf')).toBeInTheDocument()
  })

  it('onSelect is called when clicking a pane item', () => {
    const onSelect = vi.fn()
    render(<JFileExplorer tree={tree} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Root'))
    fireEvent.click(screen.getByText('Documents'))
    fireEvent.click(screen.getByText('report.pdf'))
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'report' }))
  })

  it('onOpen is called on double-click of a pane item', () => {
    const onOpen = vi.fn()
    render(<JFileExplorer tree={tree} onOpen={onOpen} />)
    fireEvent.click(screen.getByText('Root'))
    fireEvent.dblClick(screen.getByText('image.png'))
    expect(onOpen).toHaveBeenCalledWith(expect.objectContaining({ id: 'img' }))
  })

  it('shows breadcrumb path for selected folder', () => {
    render(<JFileExplorer tree={tree} />)
    fireEvent.click(screen.getByText('Root'))
    fireEvent.click(screen.getByText('Documents'))
    expect(screen.getByText('Documents')).toBeInTheDocument()
  })

  it('renders folder icon for folders and file icon for files', () => {
    render(<JFileExplorer tree={tree} />)
    fireEvent.click(screen.getByText('Root'))
    fireEvent.click(screen.getByText('Documents'))
    // default icons are emoji — folder=📁, file=📄
    expect(document.querySelector('.j-os-pane-item__icon')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run tests — expect FAIL**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JFileExplorer
```

Expected: FAIL — `JFileExplorer` not found.

- [ ] **Step 4: Implement JFileExplorer**

Create `packages/jarvis-ui/src/components/os/apps/JFileExplorer.tsx`:

```tsx
import { useState } from 'react'

export interface JFileNode {
  id:        string
  name:      string
  type:      'file' | 'folder'
  icon?:     string
  children?: JFileNode[]
  meta?:     Record<string, string>
}

export interface JFileExplorerProps {
  tree:          JFileNode[]
  onOpen?:       (node: JFileNode) => void
  onSelect?:     (node: JFileNode) => void
  initialPath?:  string[]
}

function nodeIcon(node: JFileNode): string {
  if (node.icon) return node.icon
  return node.type === 'folder' ? '📁' : '📄'
}

interface TreeNodeProps {
  node:         JFileNode
  depth:        number
  expanded:     Set<string>
  selected:     string | null
  onExpand:     (id: string) => void
  onSelect:     (node: JFileNode) => void
}

function TreeNode({ node, depth, expanded, selected, onExpand, onSelect }: TreeNodeProps) {
  const isFolder   = node.type === 'folder'
  const isExpanded = expanded.has(node.id)
  const isActive   = selected === node.id

  function handleClick() {
    if (isFolder) {
      onExpand(node.id)
      onSelect(node)
    }
  }

  return (
    <>
      <div
        data-testid={`tree-${node.id}`}
        className={`j-os-tree-item${isActive ? ' j-os-tree-item--active' : ''}`}
        style={{ paddingLeft: 8 + depth * 14 }}
        onClick={handleClick}
      >
        {isFolder && (
          <span className="j-os-tree-item__caret">{isExpanded ? '▾' : '▸'}</span>
        )}
        <span>{nodeIcon(node)}</span>
        <span>{node.name}</span>
      </div>
      {isFolder && isExpanded && (node.children ?? []).filter(c => c.type === 'folder').map(child => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          expanded={expanded}
          selected={selected}
          onExpand={onExpand}
          onSelect={onSelect}
        />
      ))}
    </>
  )
}

function findNode(tree: JFileNode[], id: string): JFileNode | null {
  for (const node of tree) {
    if (node.id === id) return node
    if (node.children) {
      const found = findNode(node.children, id)
      if (found) return found
    }
  }
  return null
}

function buildBreadcrumb(tree: JFileNode[], targetId: string): JFileNode[] {
  function search(nodes: JFileNode[], path: JFileNode[]): JFileNode[] | null {
    for (const node of nodes) {
      const next = [...path, node]
      if (node.id === targetId) return next
      if (node.children) {
        const found = search(node.children, next)
        if (found) return found
      }
    }
    return null
  }
  return search(tree, []) ?? []
}

export function JFileExplorer({ tree, onOpen, onSelect: onSelectProp, initialPath }: JFileExplorerProps) {
  const [expanded,  setExpanded]  = useState<Set<string>>(new Set(initialPath ?? []))
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [paneItemId, setPaneItemId] = useState<string | null>(null)

  function handleExpand(id: string) {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  function handleTreeSelect(node: JFileNode) {
    setSelectedId(node.id)
  }

  function handlePaneSelect(node: JFileNode) {
    setPaneItemId(node.id)
    onSelectProp?.(node)
    if (node.type === 'folder') {
      handleExpand(node.id)
      setSelectedId(node.id)
    }
  }

  function handlePaneOpen(node: JFileNode) {
    onOpen?.(node)
  }

  const selectedNode = selectedId ? findNode(tree, selectedId) : null
  const paneItems: JFileNode[] = selectedNode?.children ?? []
  const breadcrumb = selectedId ? buildBreadcrumb(tree, selectedId) : []

  return (
    <div className="j-os-fileexplorer">
      {/* Breadcrumb */}
      <div className="j-os-fileexplorer__breadcrumb">
        {breadcrumb.length === 0 ? (
          <span>Home</span>
        ) : (
          breadcrumb.map((n, i) => (
            <span key={n.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {i > 0 && <span className="j-os-fileexplorer__breadcrumb-sep">/</span>}
              <button
                className="j-os-fileexplorer__breadcrumb-item"
                onClick={() => { setSelectedId(n.id); setExpanded(prev => { const s = new Set(prev); s.add(n.id); return s }) }}
              >
                {n.name}
              </button>
            </span>
          ))
        )}
      </div>

      <div className="j-os-fileexplorer__body">
        {/* Left tree */}
        <div className="j-os-fileexplorer__tree">
          {tree.map(node => (
            <TreeNode
              key={node.id}
              node={node}
              depth={0}
              expanded={expanded}
              selected={selectedId}
              onExpand={handleExpand}
              onSelect={handleTreeSelect}
            />
          ))}
        </div>

        {/* Right pane */}
        <div className="j-os-fileexplorer__pane">
          {paneItems.map(item => (
            <div
              key={item.id}
              className={`j-os-pane-item${paneItemId === item.id ? ' j-os-pane-item--active' : ''}`}
              onClick={() => handlePaneSelect(item)}
              onDoubleClick={() => handlePaneOpen(item)}
            >
              <span className="j-os-pane-item__icon">{nodeIcon(item)}</span>
              <span className="j-os-pane-item__name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JFileExplorer
```

Expected: 8 passing.

- [ ] **Step 6: Commit**

```bash
git add packages/jarvis-ui/src/components/os/apps/JFileExplorer.tsx packages/jarvis-ui/src/components/os/apps/JFileExplorer.test.tsx packages/jarvis-ui/src/styles/jarvis-os.css
git commit -m "feat(os): add JFileExplorer with tree, pane, breadcrumb"
```

---

## Task 3: JTaskManager

**Files:**
- Create: `packages/jarvis-ui/src/components/os/apps/JTaskManager.tsx`
- Create: `packages/jarvis-ui/src/components/os/apps/JTaskManager.test.tsx`

**Interfaces:**
- Consumes: CSS tokens (`--os-*`)
- Produces: `JProcess` type, `JTaskManagerProps`, `JTaskManager` component

---

- [ ] **Step 1: Add task manager CSS to jarvis-os.css**

Append to `packages/jarvis-ui/src/styles/jarvis-os.css`:

```css
/* Task Manager */
.j-os-taskmanager {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: var(--os-font);
  color: var(--os-text);
  background: var(--os-bg);
}

.j-os-taskmanager__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.j-os-taskmanager__table th {
  text-align: left;
  padding: 8px 10px;
  border-bottom: 1px solid var(--os-border);
  color: var(--os-text-muted);
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.j-os-taskmanager__table th:hover { color: var(--os-text); }

.j-os-taskmanager__table td {
  padding: 6px 10px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  white-space: nowrap;
}

.j-os-taskmanager__table tbody tr:hover { background: rgba(255,255,255,0.04); }

.j-os-tm-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 100px;
}

.j-os-tm-bar__track {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(255,255,255,0.10);
  overflow: hidden;
}

.j-os-tm-bar__fill {
  height: 100%;
  border-radius: 3px;
  background: var(--os-accent);
  transition: width 0.3s;
}

.j-os-tm-bar__fill--warn   { background: #febc2e; }
.j-os-tm-bar__fill--danger { background: #ff5f57; }
.j-os-tm-bar__label { font-size: 11px; color: var(--os-text-muted); min-width: 36px; text-align: right; }

.j-os-tm-status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
}

.j-os-tm-status__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.j-os-tm-status--running   .j-os-tm-status__dot { background: #28c840; }
.j-os-tm-status--suspended .j-os-tm-status__dot { background: #febc2e; }
.j-os-tm-status--stopped   .j-os-tm-status__dot { background: #ff5f57; }

.j-os-tm-kill {
  padding: 2px 8px;
  background: transparent;
  border: 1px solid rgba(255,95,87,0.4);
  color: #ff5f57;
  border-radius: var(--os-radius-sm);
  font-size: 11px;
  cursor: pointer;
  font-family: var(--os-font);
  transition: background 0.1s;
}

.j-os-tm-kill:hover { background: rgba(255,95,87,0.15); }
```

- [ ] **Step 2: Write failing tests**

Create `packages/jarvis-ui/src/components/os/apps/JTaskManager.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JTaskManager } from './JTaskManager'
import type { JProcess } from './JTaskManager'

const processes: JProcess[] = [
  { pid: 1001, name: 'chrome.exe',   cpu: 45, memory: 512,  status: 'running' },
  { pid: 1002, name: 'node.exe',     cpu: 12, memory: 128,  status: 'running' },
  { pid: 1003, name: 'python.exe',   cpu: 0,  memory: 64,   status: 'suspended' },
  { pid: 1004, name: 'notepad.exe',  cpu: 0,  memory: 8,    status: 'stopped' },
]

describe('JTaskManager', () => {
  it('renders all processes', () => {
    render(<JTaskManager processes={processes} />)
    expect(screen.getByText('chrome.exe')).toBeInTheDocument()
    expect(screen.getByText('node.exe')).toBeInTheDocument()
    expect(screen.getByText('python.exe')).toBeInTheDocument()
    expect(screen.getByText('notepad.exe')).toBeInTheDocument()
  })

  it('renders PID column', () => {
    render(<JTaskManager processes={processes} />)
    expect(screen.getByText('1001')).toBeInTheDocument()
  })

  it('renders CPU percentage', () => {
    render(<JTaskManager processes={processes} />)
    expect(screen.getByText('45%')).toBeInTheDocument()
  })

  it('renders memory in MB', () => {
    render(<JTaskManager processes={processes} />)
    expect(screen.getByText('512 MB')).toBeInTheDocument()
  })

  it('renders status badge', () => {
    render(<JTaskManager processes={processes} />)
    expect(screen.getAllByText('running')).toHaveLength(2)
    expect(screen.getByText('suspended')).toBeInTheDocument()
    expect(screen.getByText('stopped')).toBeInTheDocument()
  })

  it('clicking column header sorts by that column ascending', () => {
    render(<JTaskManager processes={processes} />)
    fireEvent.click(screen.getByText('CPU'))
    const rows = document.querySelectorAll('tbody tr')
    // After ascending sort by cpu, first row should have cpu=0
    expect(rows[0].textContent).toContain('0%')
  })

  it('clicking same column header twice sorts descending', () => {
    render(<JTaskManager processes={processes} />)
    fireEvent.click(screen.getByText('CPU'))
    fireEvent.click(screen.getByText('CPU'))
    const rows = document.querySelectorAll('tbody tr')
    // After descending sort by cpu, first row should have cpu=45
    expect(rows[0].textContent).toContain('45%')
  })

  it('calls onKill with pid when kill button clicked', () => {
    const onKill = vi.fn()
    render(<JTaskManager processes={processes} onKill={onKill} />)
    const killBtns = screen.getAllByText('Kill')
    fireEvent.click(killBtns[0])
    expect(onKill).toHaveBeenCalledWith(expect.any(Number))
  })

  it('no kill buttons when onKill is not provided', () => {
    render(<JTaskManager processes={processes} />)
    expect(screen.queryByText('Kill')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run tests — expect FAIL**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JTaskManager
```

Expected: FAIL — `JTaskManager` not found.

- [ ] **Step 4: Implement JTaskManager**

Create `packages/jarvis-ui/src/components/os/apps/JTaskManager.tsx`:

```tsx
import { useState } from 'react'

export interface JProcess {
  pid:    number
  name:   string
  cpu:    number
  memory: number
  status: 'running' | 'suspended' | 'stopped'
}

export interface JTaskManagerProps {
  processes: JProcess[]
  onKill?:   (pid: number) => void
}

type SortKey = 'name' | 'pid' | 'cpu' | 'memory' | 'status'

function barColorClass(value: number): string {
  if (value >= 80) return 'j-os-tm-bar__fill--danger'
  if (value >= 50) return 'j-os-tm-bar__fill--warn'
  return ''
}

function ResourceBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="j-os-tm-bar">
      <div className="j-os-tm-bar__track">
        <div className={`j-os-tm-bar__fill ${barColorClass(value)}`} style={{ width: `${Math.min(100, value)}%` }} />
      </div>
      <span className="j-os-tm-bar__label">{label}</span>
    </div>
  )
}

function StatusBadge({ status }: { status: JProcess['status'] }) {
  return (
    <span className={`j-os-tm-status j-os-tm-status--${status}`}>
      <span className="j-os-tm-status__dot" />
      {status}
    </span>
  )
}

export function JTaskManager({ processes, onKill }: JTaskManagerProps) {
  const [sortKey, setSortKey] = useState<SortKey>('cpu')
  const [sortAsc, setSortAsc] = useState(false)

  function handleSort(key: SortKey) {
    if (sortKey === key) { setSortAsc(p => !p) }
    else { setSortKey(key); setSortAsc(true) }
  }

  const sorted = [...processes].sort((a, b) => {
    let va: string | number = a[sortKey]
    let vb: string | number = b[sortKey]
    if (typeof va === 'string') va = va.toLowerCase()
    if (typeof vb === 'string') vb = vb.toLowerCase()
    if (va < vb) return sortAsc ? -1 : 1
    if (va > vb) return sortAsc ? 1 : -1
    return 0
  })

  function sortLabel(key: SortKey): string {
    const labels: Record<SortKey, string> = { name: 'Name', pid: 'PID', cpu: 'CPU', memory: 'Memory', status: 'Status' }
    const arrow = sortKey === key ? (sortAsc ? ' ↑' : ' ↓') : ''
    return labels[key] + arrow
  }

  return (
    <div className="j-os-taskmanager">
      <div style={{ flex: 1, overflow: 'auto' }}>
        <table className="j-os-taskmanager__table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>   {sortLabel('name')}   </th>
              <th onClick={() => handleSort('pid')}>    {sortLabel('pid')}    </th>
              <th onClick={() => handleSort('cpu')}>    {sortLabel('cpu')}    </th>
              <th onClick={() => handleSort('memory')}> {sortLabel('memory')} </th>
              <th onClick={() => handleSort('status')}> {sortLabel('status')} </th>
              {onKill && <th></th>}
            </tr>
          </thead>
          <tbody>
            {sorted.map(p => (
              <tr key={p.pid}>
                <td>{p.name}</td>
                <td>{p.pid}</td>
                <td><ResourceBar value={p.cpu} label={`${p.cpu}%`} /></td>
                <td><ResourceBar value={(p.memory / 2048) * 100} label={`${p.memory} MB`} /></td>
                <td><StatusBadge status={p.status} /></td>
                {onKill && (
                  <td>
                    <button className="j-os-tm-kill" onClick={() => onKill(p.pid)}>Kill</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JTaskManager
```

Expected: 9 passing.

- [ ] **Step 6: Commit**

```bash
git add packages/jarvis-ui/src/components/os/apps/JTaskManager.tsx packages/jarvis-ui/src/components/os/apps/JTaskManager.test.tsx packages/jarvis-ui/src/styles/jarvis-os.css
git commit -m "feat(os): add JTaskManager with sortable table, CPU/mem bars, kill button"
```

---

## Task 4: JControlPanel

**Files:**
- Create: `packages/jarvis-ui/src/components/os/apps/JControlPanel.tsx`
- Create: `packages/jarvis-ui/src/components/os/apps/JControlPanel.test.tsx`

**Interfaces:**
- Consumes: CSS tokens (`--os-*`)
- Produces: `JControlSection` type, `JControlPanelProps`, `JControlPanel` component

---

- [ ] **Step 1: Add control panel CSS to jarvis-os.css**

Append to `packages/jarvis-ui/src/styles/jarvis-os.css`:

```css
/* Control Panel */
.j-os-controlpanel {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: var(--os-font);
  color: var(--os-text);
  background: var(--os-bg);
}

.j-os-controlpanel__search {
  padding: 8px 12px;
  border-bottom: 1px solid var(--os-border);
  flex-shrink: 0;
}

.j-os-controlpanel__search input {
  width: 100%;
  padding: 6px 10px;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--os-border);
  border-radius: var(--os-radius-sm);
  color: var(--os-text);
  font-family: var(--os-font);
  font-size: 12px;
  outline: none;
}

.j-os-controlpanel__search input:focus {
  border-color: var(--os-accent);
}

.j-os-controlpanel__search input::placeholder { color: var(--os-text-muted); }

.j-os-controlpanel__body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.j-os-controlpanel__grid {
  width: 220px;
  overflow-y: auto;
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  align-content: start;
  border-right: 1px solid var(--os-border);
  flex-shrink: 0;
}

.j-os-controlpanel__pane {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.j-os-cp-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  border-radius: var(--os-radius-sm);
  cursor: pointer;
  background: transparent;
  border: none;
  font-family: var(--os-font);
  color: var(--os-text);
  text-align: center;
  transition: background 0.1s;
}

.j-os-cp-item:hover   { background: rgba(255,255,255,0.08); }
.j-os-cp-item--active { background: rgba(255,255,255,0.14); }
.j-os-cp-item__icon   { font-size: 24px; }
.j-os-cp-item__label  { font-size: 10px; word-break: break-word; }
```

- [ ] **Step 2: Write failing tests**

Create `packages/jarvis-ui/src/components/os/apps/JControlPanel.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JControlPanel } from './JControlPanel'
import type { JControlSection } from './JControlPanel'

const sections: JControlSection[] = [
  { id: 'display',  icon: '🖥',  label: 'Display',  component: <div data-testid="display-content">Display settings</div> },
  { id: 'network',  icon: '🌐',  label: 'Network',  component: <div data-testid="network-content">Network settings</div> },
  { id: 'sound',    icon: '🔊',  label: 'Sound',    component: <div data-testid="sound-content">Sound settings</div> },
]

describe('JControlPanel', () => {
  it('renders section icons in grid', () => {
    render(<JControlPanel sections={sections} />)
    expect(screen.getByText('🖥')).toBeInTheDocument()
    expect(screen.getByText('🌐')).toBeInTheDocument()
    expect(screen.getByText('🔊')).toBeInTheDocument()
  })

  it('renders section labels', () => {
    render(<JControlPanel sections={sections} />)
    expect(screen.getByText('Display')).toBeInTheDocument()
    expect(screen.getByText('Network')).toBeInTheDocument()
  })

  it('clicking a section shows its content in right pane', () => {
    render(<JControlPanel sections={sections} />)
    fireEvent.click(screen.getByText('Display').closest('button')!)
    expect(screen.getByTestId('display-content')).toBeInTheDocument()
  })

  it('defaultSection opens section on mount', () => {
    render(<JControlPanel sections={sections} defaultSection="network" />)
    expect(screen.getByTestId('network-content')).toBeInTheDocument()
  })

  it('clicking another section switches content', () => {
    render(<JControlPanel sections={sections} defaultSection="display" />)
    expect(screen.getByTestId('display-content')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Network').closest('button')!)
    expect(screen.getByTestId('network-content')).toBeInTheDocument()
    expect(screen.queryByTestId('display-content')).not.toBeInTheDocument()
  })

  it('search input filters sections by label', () => {
    render(<JControlPanel sections={sections} />)
    fireEvent.change(screen.getByPlaceholderText('Search settings...'), { target: { value: 'net' } })
    expect(screen.getByText('Network')).toBeInTheDocument()
    expect(screen.queryByText('Display')).not.toBeInTheDocument()
    expect(screen.queryByText('Sound')).not.toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<JControlPanel sections={sections} />)
    expect(screen.getByPlaceholderText('Search settings...')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run tests — expect FAIL**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JControlPanel
```

Expected: FAIL — `JControlPanel` not found.

- [ ] **Step 4: Implement JControlPanel**

Create `packages/jarvis-ui/src/components/os/apps/JControlPanel.tsx`:

```tsx
import { useState } from 'react'
import type { ReactNode } from 'react'

export interface JControlSection {
  id:        string
  icon:      string
  label:     string
  component: ReactNode
}

export interface JControlPanelProps {
  sections:        JControlSection[]
  defaultSection?: string
}

export function JControlPanel({ sections, defaultSection }: JControlPanelProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultSection ?? null)
  const [search,   setSearch]   = useState('')

  const filtered = sections.filter(s =>
    s.label.toLowerCase().includes(search.toLowerCase())
  )

  const active = sections.find(s => s.id === activeId)

  return (
    <div className="j-os-controlpanel">
      <div className="j-os-controlpanel__search">
        <input
          type="text"
          placeholder="Search settings..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="j-os-controlpanel__body">
        <div className="j-os-controlpanel__grid">
          {filtered.map(s => (
            <button
              key={s.id}
              className={`j-os-cp-item${activeId === s.id ? ' j-os-cp-item--active' : ''}`}
              onClick={() => setActiveId(s.id)}
            >
              <span className="j-os-cp-item__icon">{s.icon}</span>
              <span className="j-os-cp-item__label">{s.label}</span>
            </button>
          ))}
        </div>

        <div className="j-os-controlpanel__pane">
          {active ? active.component : (
            <div style={{ color: 'var(--os-text-muted)', fontSize: 13, marginTop: 16 }}>
              Select a setting from the left panel.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test -- --reporter=verbose JControlPanel
```

Expected: 7 passing.

- [ ] **Step 6: Commit**

```bash
git add packages/jarvis-ui/src/components/os/apps/JControlPanel.tsx packages/jarvis-ui/src/components/os/apps/JControlPanel.test.tsx packages/jarvis-ui/src/styles/jarvis-os.css
git commit -m "feat(os): add JControlPanel with icon grid, search filter, content pane"
```

---

## Task 5: Complete Export Wiring

**Files:**
- Modify: `packages/jarvis-ui/src/index.ts`

---

- [ ] **Step 1: Extend index.ts with remaining exports**

At the bottom of `packages/jarvis-ui/src/index.ts`, add after the Plan 1 OS exports:

```ts
// Components — os shared
export { JOSNotificationProvider, useOSNotify } from './components/os/shared/JOSNotification'
export type { OSNotifyConfig }                   from './components/os/shared/JOSNotification'

// Components — os apps
export type { JFileNode, JFileExplorerProps }    from './components/os/apps/JFileExplorer'
export { JFileExplorer }                         from './components/os/apps/JFileExplorer'
export type { JProcess, JTaskManagerProps }      from './components/os/apps/JTaskManager'
export { JTaskManager }                          from './components/os/apps/JTaskManager'
export type { JControlSection, JControlPanelProps } from './components/os/apps/JControlPanel'
export { JControlPanel }                         from './components/os/apps/JControlPanel'
```

- [ ] **Step 2: Run full test suite — expect zero failures**

```bash
pnpm --filter @masterdeepak15/jarvis-ui test
```

Expected: all tests pass (Plan 1 + Plan 2 combined).

- [ ] **Step 3: Build and verify TypeScript**

```bash
pnpm --filter @masterdeepak15/jarvis-ui build
```

Expected: build succeeds, no type errors.

- [ ] **Step 4: Commit**

```bash
git add packages/jarvis-ui/src/index.ts
git commit -m "feat(os): complete export wiring for all OS shell components"
```

---

## Task 6: Skill Reference Docs

**Files:**
- Create: `skills/jarvis-ui-react/references/JOSShell.md`

---

- [ ] **Step 1: Write the skill reference doc**

Create `skills/jarvis-ui-react/references/JOSShell.md`:

```markdown
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
```

- [ ] **Step 2: Verify file was created**

```bash
ls skills/jarvis-ui-react/references/JOSShell.md
```

- [ ] **Step 3: Commit**

```bash
git add skills/jarvis-ui-react/references/JOSShell.md
git commit -m "docs(os): add JOSShell skill reference doc for all OS shell components"
```

---

## Done — Plan 2 Complete

At this point the full OS Shell Kit is complete:

| Component | Status |
|---|---|
| `JOSNotification` + `useOSNotify` | ✅ |
| `JFileExplorer` | ✅ |
| `JTaskManager` | ✅ |
| `JControlPanel` | ✅ |
| All types exported from index.ts | ✅ |
| Skill reference doc `JOSShell.md` | ✅ |

**Final check:** Run `pnpm --filter @masterdeepak15/jarvis-ui test` and `pnpm --filter @masterdeepak15/jarvis-ui build` — both must pass with zero errors before the feature is shippable.
