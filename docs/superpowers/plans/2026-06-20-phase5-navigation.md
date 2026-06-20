# Phase 5: Navigation Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port JTabs/JTab, JAccordion, and JPagination from Blazor to React as production-grade, accessible, inline-style components in the `jarvis-ui` library.

**Architecture:** JTabs + JTab use a context-based composition pattern: JTabs scans `React.Children` synchronously to build its tab strip, provides `JTabsContext` for active-tab state, and each JTab gates its content by reading that context. JAccordion and JPagination are standalone controlled/uncontrolled components using only React built-ins.

**Tech Stack:** React 18, TypeScript, Vitest, React Testing Library, pnpm workspaces monorepo

## Global Constraints

- Repo root: `D:\Claude\HUD Theme\HUDtheme\`
- Library source: `packages/jarvis-ui/src/`
- Test command: `pnpm --filter jarvis-ui test`
- All colors via `var(--j-*)` CSS custom properties — zero hardcoded hex
- No `border-radius` — use `clip-path` polygons for angular shapes
- Font everywhere: `'Courier New', monospace`
- CSS files are read-only — do not edit any `.css` file
- Inline style pattern: all components use `React.CSSProperties` objects only
- TDD: write failing test first, verify RED, implement, verify GREEN, commit
- Test wrapper: `function W({ children }: { children: ReactNode }) { return <JThemeProvider>{children}</JThemeProvider> }`
- `fireEvent` only — no `@testing-library/user-event`
- `JColor` and `JState` imported from `../../theme/JarvisTokens`
- `JThemeProvider` imported from `../../theme/JThemeContext`
- PowerShell PATH required before test runs: `$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH`

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `packages/jarvis-ui/src/components/ui/JTabs.tsx` | Create | Tab strip + context provider; exports `JTabs`, `JTabsProps`, internal `useJTabsContext` |
| `packages/jarvis-ui/src/components/ui/JTabs.test.tsx` | Create | 14 tests for JTabs + JTab together |
| `packages/jarvis-ui/src/components/ui/JTab.tsx` | Create | Content gate; reads JTabsContext; `JTab._isJTab = true` marker |
| `packages/jarvis-ui/src/components/ui/JTab.test.tsx` | Create | (empty — JTab is co-tested in JTabs.test.tsx) |
| `packages/jarvis-ui/src/components/ui/JAccordion.tsx` | Create | Controlled/uncontrolled collapsible panel |
| `packages/jarvis-ui/src/components/ui/JAccordion.test.tsx` | Create | 16 tests |
| `packages/jarvis-ui/src/components/ui/JPagination.tsx` | Create | Tick-bar (≤10) + ellipsis (>10) page navigator |
| `packages/jarvis-ui/src/components/ui/JPagination.test.tsx` | Create | 17 tests |
| `packages/jarvis-ui/src/index.ts` | Modify | Append 8 export lines for all 4 components |

---

## Task 1: JTabs + JTab

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JTabs.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JTab.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JTabs.test.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JTab.test.tsx`

**Interfaces:**
- Produces: `JTabs` (named export), `JTabsProps` (type export), `useJTabsContext` (named export, used by JTab internally)
- Produces: `JTab` (named export), `JTabProps` (type export), `JTab._isJTab = true` (static marker)
- Later tasks do not depend on this task.

- [ ] **Step 1: Write the failing tests**

Create `packages/jarvis-ui/src/components/ui/JTabs.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JTabs } from './JTabs'
import { JTab } from './JTab'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JTabs', () => {
  it('renders tab labels in the strip', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha"><p>Alpha content</p></JTab>
          <JTab tabKey="b" label="Beta"><p>Beta content</p></JTab>
        </JTabs>
      </W>
    )
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
  })

  it('auto-selects first tab in uncontrolled mode', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha"><p>Alpha content</p></JTab>
          <JTab tabKey="b" label="Beta"><p>Beta content</p></JTab>
        </JTabs>
      </W>
    )
    expect(screen.getByText('Alpha content')).toBeInTheDocument()
    expect(screen.queryByText('Beta content')).not.toBeInTheDocument()
  })

  it('clicking a tab switches content', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha"><p>Alpha content</p></JTab>
          <JTab tabKey="b" label="Beta"><p>Beta content</p></JTab>
        </JTabs>
      </W>
    )
    fireEvent.click(screen.getByText('Beta'))
    expect(screen.getByText('Beta content')).toBeInTheDocument()
    expect(screen.queryByText('Alpha content')).not.toBeInTheDocument()
  })

  it('onTabChange fires with the clicked tab key', () => {
    const onChange = vi.fn()
    render(
      <W>
        <JTabs onTabChange={onChange}>
          <JTab tabKey="a" label="Alpha"><p>A</p></JTab>
          <JTab tabKey="b" label="Beta"><p>B</p></JTab>
        </JTabs>
      </W>
    )
    fireEvent.click(screen.getByText('Beta'))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('controlled mode: activeTab prop controls which panel shows', () => {
    render(
      <W>
        <JTabs activeTab="b">
          <JTab tabKey="a" label="Alpha"><p>Alpha content</p></JTab>
          <JTab tabKey="b" label="Beta"><p>Beta content</p></JTab>
        </JTabs>
      </W>
    )
    expect(screen.getByText('Beta content')).toBeInTheDocument()
    expect(screen.queryByText('Alpha content')).not.toBeInTheDocument()
  })

  it('icon renders on the tab button', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha" icon="⊞"><p>A</p></JTab>
        </JTabs>
      </W>
    )
    expect(screen.getByText('⊞')).toBeInTheDocument()
  })

  it('badge renders on the tab button', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha" badge="12"><p>A</p></JTab>
        </JTabs>
      </W>
    )
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('disabled tab cannot be clicked', () => {
    const onChange = vi.fn()
    render(
      <W>
        <JTabs onTabChange={onChange}>
          <JTab tabKey="a" label="Alpha"><p>A</p></JTab>
          <JTab tabKey="b" label="Beta" disabled><p>B</p></JTab>
        </JTabs>
      </W>
    )
    const betaBtn = screen.getByText('Beta').closest('button') as HTMLElement
    expect(betaBtn).toBeDisabled()
    fireEvent.click(betaBtn)
    expect(onChange).not.toHaveBeenCalledWith('b')
  })

  it('tab strip has role=tablist', () => {
    const { container } = render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="A"><p>A</p></JTab>
        </JTabs>
      </W>
    )
    expect(container.querySelector('[role="tablist"]')).toBeInTheDocument()
  })

  it('active tab button has aria-selected=true', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha"><p>A</p></JTab>
          <JTab tabKey="b" label="Beta"><p>B</p></JTab>
        </JTabs>
      </W>
    )
    expect(screen.getByText('Alpha').closest('button')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Beta').closest('button')).toHaveAttribute('aria-selected', 'false')
  })

  it('active panel has role=tabpanel', () => {
    const { container } = render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="A"><p>A content</p></JTab>
        </JTabs>
      </W>
    )
    expect(container.querySelector('[role="tabpanel"]')).toBeInTheDocument()
  })

  it('panel id matches aria-controls on its tab button', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="alpha" label="Alpha"><p>A content</p></JTab>
        </JTabs>
      </W>
    )
    const btn = screen.getByText('Alpha').closest('button') as HTMLElement
    const controls = btn.getAttribute('aria-controls')!
    expect(document.getElementById(controls)).toBeInTheDocument()
  })

  it('ArrowRight key moves to next tab', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha"><p>Alpha content</p></JTab>
          <JTab tabKey="b" label="Beta"><p>Beta content</p></JTab>
        </JTabs>
      </W>
    )
    const alphaBtn = screen.getByText('Alpha').closest('button') as HTMLElement
    fireEvent.keyDown(alphaBtn, { key: 'ArrowRight' })
    expect(screen.getByText('Beta content')).toBeInTheDocument()
  })

  it('ArrowLeft key wraps from first to last tab', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha"><p>Alpha content</p></JTab>
          <JTab tabKey="b" label="Beta"><p>Beta content</p></JTab>
        </JTabs>
      </W>
    )
    const alphaBtn = screen.getByText('Alpha').closest('button') as HTMLElement
    fireEvent.keyDown(alphaBtn, { key: 'ArrowLeft' })
    expect(screen.getByText('Beta content')).toBeInTheDocument()
  })
})
```

Create `packages/jarvis-ui/src/components/ui/JTab.test.tsx`:

```tsx
// JTab is co-tested in JTabs.test.tsx
// This file exists to satisfy the file structure convention.
```

- [ ] **Step 2: Run tests to confirm RED**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test
```

Expected: Tests fail — `Cannot find module './JTabs'` and `Cannot find module './JTab'`.

- [ ] **Step 3: Implement JTabs.tsx**

Create `packages/jarvis-ui/src/components/ui/JTabs.tsx`:

```tsx
import { useState, createContext, useContext, Children, isValidElement } from 'react'
import type { ReactNode, KeyboardEvent, ReactElement } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

// ── Internal context ──────────────────────────────────────────────
interface JTabsCtxValue {
  activeTab: string
  selectTab: (key: string) => void
}

const JTabsContext = createContext<JTabsCtxValue | null>(null)

export function useJTabsContext(): JTabsCtxValue | null {
  return useContext(JTabsContext)
}

// ── Public types ──────────────────────────────────────────────────
export interface JTabsProps {
  activeTab?:   string
  onTabChange?: (key: string) => void
  color?:       JColor
  children:     ReactNode
}

interface TabDef {
  key:       string
  label:     string
  icon?:     string
  badge?:    string
  disabled?: boolean
}

// ── Component ─────────────────────────────────────────────────────
export function JTabs({ activeTab: controlledTab, onTabChange, children }: JTabsProps) {
  // Scan children synchronously to build tab strip — no async flicker
  const tabDefs: TabDef[] = []
  Children.forEach(children, (child) => {
    if (isValidElement(child) && (child.type as any)._isJTab) {
      const p = (child as ReactElement<any>).props
      tabDefs.push({ key: p.tabKey, label: p.label, icon: p.icon, badge: p.badge, disabled: p.disabled })
    }
  })

  const [internalTab, setInternalTab] = useState<string | null>(null)

  // Controlled: use prop; Uncontrolled: use state; Fallback: first non-disabled
  const firstKey = tabDefs.find(t => !t.disabled)?.key ?? ''
  const active   = controlledTab ?? internalTab ?? firstKey

  function selectTab(key: string) {
    if (controlledTab === undefined) setInternalTab(key)
    onTabChange?.(key)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, currentKey: string) {
    const enabled = tabDefs.filter(t => !t.disabled)
    const idx     = enabled.findIndex(t => t.key === currentKey)
    let   nextKey: string | undefined

    if      (e.key === 'ArrowRight') nextKey = enabled[(idx + 1) % enabled.length]?.key
    else if (e.key === 'ArrowLeft')  nextKey = enabled[(idx - 1 + enabled.length) % enabled.length]?.key
    else if (e.key === 'Home')       nextKey = enabled[0]?.key
    else if (e.key === 'End')        nextKey = enabled[enabled.length - 1]?.key
    else return

    e.preventDefault()
    if (nextKey) {
      selectTab(nextKey)
      document.getElementById(`tab-${nextKey}`)?.focus()
    }
  }

  return (
    <JTabsContext.Provider value={{ activeTab: active, selectTab }}>
      {/* Tab strip */}
      <div
        role="tablist"
        style={{
          display:      'flex',
          borderBottom: '1px solid var(--j-accent-12)',
          overflowX:    'auto',
          gap:          0,
        }}
      >
        {tabDefs.map((def) => {
          const isActive = def.key === active
          return (
            <button
              key={def.key}
              id={`tab-${def.key}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`panel-${def.key}`}
              disabled={def.disabled}
              onClick={() => selectTab(def.key)}
              onKeyDown={(e) => handleKeyDown(e, def.key)}
              style={{
                position:      'relative',
                display:       'flex',
                alignItems:    'center',
                gap:           6,
                padding:       '10px 18px',
                background:    'transparent',
                border:        'none',
                cursor:        def.disabled ? 'not-allowed' : 'pointer',
                fontFamily:    "'Courier New', monospace",
                fontSize:      10,
                fontWeight:    600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                whiteSpace:    'nowrap',
                color:         def.disabled
                               ? 'var(--j-text-dim)'
                               : isActive
                               ? 'var(--j-accent)'
                               : 'var(--j-text-muted)',
                textShadow:    isActive ? '0 0 8px var(--j-accent-50)' : 'none',
                opacity:       def.disabled ? 0.4 : 1,
                transition:    'color 0.15s',
              }}
            >
              {def.icon && (
                <span style={{
                  fontStyle: 'normal',
                  fontSize:  13,
                  ...(isActive ? { filter: 'drop-shadow(0 0 4px var(--j-accent))' } : {}),
                }}>
                  {def.icon}
                </span>
              )}
              <span>{def.label}</span>
              {def.badge && (
                <span style={{
                  fontSize:   8,
                  padding:    '1px 5px',
                  background: 'var(--j-accent-12)',
                  color:      'var(--j-accent-mid)',
                  clipPath:   'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
                }}>
                  {def.badge}
                </span>
              )}
              {isActive && (
                <div style={{
                  position:   'absolute',
                  bottom:     -1,
                  left:       0,
                  right:      0,
                  height:     2,
                  background: 'var(--j-accent)',
                  boxShadow:  '0 0 8px var(--j-accent)',
                  overflow:   'hidden',
                }}>
                  <div style={{
                    position:   'absolute',
                    inset:      0,
                    width:      30,
                    background: 'linear-gradient(90deg, transparent, var(--j-text-primary), transparent)',
                    animation:  'j-scan-h 2s ease-in-out infinite',
                  }} />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Content area */}
      <div style={{ paddingTop: 4 }}>
        {children}
      </div>
    </JTabsContext.Provider>
  )
}
```

- [ ] **Step 4: Implement JTab.tsx**

Create `packages/jarvis-ui/src/components/ui/JTab.tsx`:

```tsx
import type { ReactNode } from 'react'
import { useJTabsContext } from './JTabs'

export interface JTabProps {
  tabKey:    string
  label:     string
  icon?:     string
  badge?:    string
  disabled?: boolean
  children?: ReactNode
}

export function JTab({ tabKey, children }: JTabProps) {
  const ctx = useJTabsContext()
  if (!ctx || ctx.activeTab !== tabKey) return null
  return (
    <div
      role="tabpanel"
      id={`panel-${tabKey}`}
      aria-labelledby={`tab-${tabKey}`}
    >
      {children}
    </div>
  )
}

// Static marker — JTabs uses this to identify JTab children during Children.forEach
;(JTab as any)._isJTab = true
```

- [ ] **Step 5: Run tests to confirm GREEN**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test
```

Expected: All 14 JTabs tests pass. Other existing tests unaffected.

- [ ] **Step 6: Commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/components/ui/JTabs.tsx packages/jarvis-ui/src/components/ui/JTab.tsx packages/jarvis-ui/src/components/ui/JTabs.test.tsx packages/jarvis-ui/src/components/ui/JTab.test.tsx
git commit -m "feat(jarvis-ui): add JTabs + JTab navigation components"
```

---

## Task 2: JAccordion

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JAccordion.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JAccordion.test.tsx`

**Interfaces:**
- Consumes: `JColor`, `JState` from `../../theme/JarvisTokens`; `useId` from `react`
- Produces: `JAccordion` (named export), `JAccordionProps` (type export)

- [ ] **Step 1: Write the failing tests**

Create `packages/jarvis-ui/src/components/ui/JAccordion.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JAccordion } from './JAccordion'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JAccordion', () => {
  it('renders the title', () => {
    render(<W><JAccordion title="System Info">Content</JAccordion></W>)
    expect(screen.getByText('System Info')).toBeInTheDocument()
  })

  it('body is hidden by default', () => {
    render(<W><JAccordion title="Test">Body text</JAccordion></W>)
    expect(screen.queryByText('Body text')).not.toBeInTheDocument()
  })

  it('defaultOpen=true shows body on mount', () => {
    render(<W><JAccordion title="Test" defaultOpen>Body text</JAccordion></W>)
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('clicking header once opens body', () => {
    render(<W><JAccordion title="Test">Body text</JAccordion></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('clicking header twice closes body again', () => {
    render(<W><JAccordion title="Test">Body text</JAccordion></W>)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('button'))
    expect(screen.queryByText('Body text')).not.toBeInTheDocument()
  })

  it('onIsOpenChange fires with true when opened', () => {
    const onChange = vi.fn()
    render(<W><JAccordion title="Test" onIsOpenChange={onChange}>Body</JAccordion></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('onIsOpenChange fires with false when closed', () => {
    const onChange = vi.fn()
    render(<W><JAccordion title="Test" defaultOpen onIsOpenChange={onChange}>Body</JAccordion></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('controlled mode: isOpen=true shows body', () => {
    render(<W><JAccordion title="Test" isOpen>Body text</JAccordion></W>)
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('controlled mode: isOpen=false hides body', () => {
    render(<W><JAccordion title="Test" isOpen={false}>Body text</JAccordion></W>)
    expect(screen.queryByText('Body text')).not.toBeInTheDocument()
  })

  it('icon renders when provided', () => {
    render(<W><JAccordion title="Test" icon="⚡">Body</JAccordion></W>)
    expect(screen.getByText('⚡')).toBeInTheDocument()
  })

  it('badge renders when provided', () => {
    render(<W><JAccordion title="Test" badge="NEW">Body</JAccordion></W>)
    expect(screen.getByText('NEW')).toBeInTheDocument()
  })

  it('header button has aria-expanded=false when closed', () => {
    render(<W><JAccordion title="Test">Body</JAccordion></W>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('header button has aria-expanded=true when open', () => {
    render(<W><JAccordion title="Test" defaultOpen>Body</JAccordion></W>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('open body has role=region', () => {
    const { container } = render(<W><JAccordion title="Test" defaultOpen>Body</JAccordion></W>)
    expect(container.querySelector('[role="region"]')).toBeInTheDocument()
  })

  it('warning state: left rail uses j-warn color', () => {
    const { container } = render(<W><JAccordion title="Test" state="warning">Body</JAccordion></W>)
    const rail = container.querySelector('button > div:first-child') as HTMLElement
    expect(rail.style.background).toContain('j-warn')
  })

  it('error state: left rail uses j-err color', () => {
    const { container } = render(<W><JAccordion title="Test" state="error">Body</JAccordion></W>)
    const rail = container.querySelector('button > div:first-child') as HTMLElement
    expect(rail.style.background).toContain('j-err')
  })

  it('success state: left rail uses j-ok color', () => {
    const { container } = render(<W><JAccordion title="Test" state="success">Body</JAccordion></W>)
    const rail = container.querySelector('button > div:first-child') as HTMLElement
    expect(rail.style.background).toContain('j-ok')
  })
})
```

- [ ] **Step 2: Run tests to confirm RED**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test
```

Expected: 17 JAccordion tests fail — `Cannot find module './JAccordion'`.

- [ ] **Step 3: Implement JAccordion.tsx**

Create `packages/jarvis-ui/src/components/ui/JAccordion.tsx`:

```tsx
import { useState, useId } from 'react'
import type { ReactNode } from 'react'
import type { JColor, JState } from '../../theme/JarvisTokens'

export interface JAccordionProps {
  title:            string
  icon?:            string
  badge?:           string
  defaultOpen?:     boolean
  isOpen?:          boolean
  onIsOpenChange?:  (open: boolean) => void
  state?:           JState
  color?:           JColor
  children?:        ReactNode
}

function resolveAccent(state: JState, color: JColor): string {
  if (state === 'warning') return 'var(--j-warn)'
  if (state === 'error')   return 'var(--j-err)'
  if (state === 'success') return 'var(--j-ok)'
  if (color === 'amber')   return 'var(--j-warn)'
  if (color === 'red')     return 'var(--j-err)'
  return 'var(--j-accent)'
}

export function JAccordion({
  title,
  icon,
  badge,
  defaultOpen = false,
  isOpen: controlledOpen,
  onIsOpenChange,
  state = 'active',
  color = 'cyan',
  children,
}: JAccordionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const id = useId()

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
  const accent = resolveAccent(state, color)

  function toggle() {
    const next = !isOpen
    if (controlledOpen === undefined) setInternalOpen(next)
    onIsOpenChange?.(next)
  }

  return (
    <div style={{
      border:     '1px solid var(--j-accent-12)',
      overflow:   'hidden',
      fontFamily: "'Courier New', monospace",
    }}>
      {/* Header */}
      <button
        type="button"
        id={`accordion-header-${id}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-body-${id}`}
        onClick={toggle}
        style={{
          position:   'relative',
          display:    'flex',
          alignItems: 'center',
          gap:        10,
          padding:    '10px 14px 10px 16px',
          cursor:     'pointer',
          width:      '100%',
          background: isOpen ? 'var(--j-accent-05)' : 'transparent',
          border:     'none',
          fontFamily: "'Courier New', monospace",
          textAlign:  'left',
          userSelect: 'none',
          transition: 'background 0.2s',
        }}
      >
        {/* Left rail */}
        <div style={{
          position:  'absolute',
          top:       0,
          bottom:    0,
          left:      0,
          width:     2,
          background: accent,
          boxShadow: `0 0 8px ${accent}`,
          clipPath:  'polygon(0 6px, 2px 0, 2px 100%, 0 calc(100% - 6px))',
        }} />

        {/* Icon */}
        {icon && (
          <span style={{
            fontStyle:  'normal',
            fontSize:   13,
            color:      accent,
            filter:     `drop-shadow(0 0 4px ${accent})`,
            flexShrink: 0,
          }}>
            {icon}
          </span>
        )}

        {/* Title */}
        <span style={{
          flex:          1,
          fontSize:      11,
          color:         isOpen ? 'var(--j-text-primary)' : 'var(--j-text-secondary)',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          transition:    'color 0.2s',
        }}>
          {title}
        </span>

        {/* Badge */}
        {badge && (
          <span style={{
            fontSize:   8,
            color:      accent,
            background: `${accent}18`,
            padding:    '1px 6px',
            clipPath:   'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
          }}>
            {badge}
          </span>
        )}

        {/* Diamond chevron */}
        <div style={{
          width:      8,
          height:     8,
          background: accent,
          clipPath:   'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          opacity:    isOpen ? 1 : 0.4,
          transform:  isOpen ? 'rotate(0deg)' : 'rotate(45deg)',
          boxShadow:  isOpen ? `0 0 8px ${accent}` : 'none',
          transition: 'transform 0.3s, opacity 0.2s',
          flexShrink: 0,
        }} />
      </button>

      {/* Body */}
      {isOpen && (
        <div
          id={`accordion-body-${id}`}
          role="region"
          aria-labelledby={`accordion-header-${id}`}
          style={{
            position:   'relative',
            padding:    '12px 14px 12px 16px',
            borderTop:  '1px solid var(--j-accent-12)',
            background: 'var(--j-accent-05)',
            overflow:   'hidden',
            animation:  'j-slide-in 0.25s ease-out',
          }}
        >
          {/* Scan line */}
          <div style={{
            position:      'absolute',
            left:          0,
            right:         0,
            height:        1,
            top:           -1,
            background:    `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            animation:     'j-scan-v 3s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
          {children}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run tests to confirm GREEN**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test
```

Expected: All 17 JAccordion tests pass. All previous tests still pass.

- [ ] **Step 5: Commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/components/ui/JAccordion.tsx packages/jarvis-ui/src/components/ui/JAccordion.test.tsx
git commit -m "feat(jarvis-ui): add JAccordion navigation component"
```

---

## Task 3: JPagination

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JPagination.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JPagination.test.tsx`

**Interfaces:**
- Consumes: `JColor` from `../../theme/JarvisTokens`
- Produces: `JPagination` (named export), `JPaginationProps` (type export)

- [ ] **Step 1: Write the failing tests**

Create `packages/jarvis-ui/src/components/ui/JPagination.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JPagination } from './JPagination'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

// ── Tick mode (totalPages ≤ 10) ───────────────────────────────────
describe('JPagination — tick mode (totalPages ≤ 10)', () => {
  it('renders 5 tick bars for totalPages=5', () => {
    const { container } = render(<W><JPagination page={1} onPageChange={vi.fn()} totalPages={5} /></W>)
    expect(container.querySelectorAll('[role="button"]').length).toBe(5)
  })

  it('renders 10 tick bars for totalPages=10', () => {
    const { container } = render(<W><JPagination page={1} onPageChange={vi.fn()} totalPages={10} /></W>)
    expect(container.querySelectorAll('[role="button"]').length).toBe(10)
  })

  it('active tick has aria-current=page', () => {
    const { container } = render(<W><JPagination page={3} onPageChange={vi.fn()} totalPages={5} /></W>)
    const ticks = container.querySelectorAll('[role="button"]')
    expect(ticks[2]).toHaveAttribute('aria-current', 'page')
  })

  it('inactive ticks do not have aria-current', () => {
    const { container } = render(<W><JPagination page={2} onPageChange={vi.fn()} totalPages={5} /></W>)
    const ticks = container.querySelectorAll('[role="button"]')
    expect(ticks[0]).not.toHaveAttribute('aria-current', 'page')
    expect(ticks[2]).not.toHaveAttribute('aria-current', 'page')
  })

  it('clicking a tick calls onPageChange with correct page number', () => {
    const onChange = vi.fn()
    const { container } = render(<W><JPagination page={1} onPageChange={onChange} totalPages={5} /></W>)
    fireEvent.click(container.querySelectorAll('[role="button"]')[2])
    expect(onChange).toHaveBeenCalledWith(3)
  })
})

// ── Ellipsis mode (totalPages > 10) ──────────────────────────────
describe('JPagination — ellipsis mode (totalPages > 10)', () => {
  it('renders numbered page buttons when totalPages=20', () => {
    render(<W><JPagination page={10} onPageChange={vi.fn()} totalPages={20} /></W>)
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('renders ··· ellipsis separator', () => {
    render(<W><JPagination page={10} onPageChange={vi.fn()} totalPages={20} /></W>)
    expect(screen.getAllByText('···').length).toBeGreaterThanOrEqual(1)
  })

  it('always shows page 1 when window does not include it', () => {
    render(<W><JPagination page={10} onPageChange={vi.fn()} totalPages={20} /></W>)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('always shows last page when window does not reach it', () => {
    render(<W><JPagination page={10} onPageChange={vi.fn()} totalPages={20} /></W>)
    expect(screen.getByText('20')).toBeInTheDocument()
  })

  it('active page button has aria-current=page', () => {
    render(<W><JPagination page={5} onPageChange={vi.fn()} totalPages={20} /></W>)
    const btn = screen.getByText('5').closest('button') as HTMLElement
    expect(btn).toHaveAttribute('aria-current', 'page')
  })

  it('clicking a page button calls onPageChange', () => {
    const onChange = vi.fn()
    render(<W><JPagination page={10} onPageChange={onChange} totalPages={20} /></W>)
    fireEvent.click(screen.getByText('11'))
    expect(onChange).toHaveBeenCalledWith(11)
  })
})

// ── Nav buttons ───────────────────────────────────────────────────
describe('JPagination — nav buttons', () => {
  it('‹ prev button is disabled on page 1', () => {
    render(<W><JPagination page={1} onPageChange={vi.fn()} totalPages={5} /></W>)
    expect(screen.getByText('‹')).toBeDisabled()
  })

  it('› next button is disabled on last page', () => {
    render(<W><JPagination page={5} onPageChange={vi.fn()} totalPages={5} /></W>)
    expect(screen.getByText('›')).toBeDisabled()
  })

  it('clicking › increments page', () => {
    const onChange = vi.fn()
    render(<W><JPagination page={3} onPageChange={onChange} totalPages={5} /></W>)
    fireEvent.click(screen.getByText('›'))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('clicking ‹ decrements page', () => {
    const onChange = vi.fn()
    render(<W><JPagination page={3} onPageChange={onChange} totalPages={5} /></W>)
    fireEvent.click(screen.getByText('‹'))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('showFirstLast=true shows « and » buttons', () => {
    render(<W><JPagination page={5} onPageChange={vi.fn()} totalPages={10} showFirstLast /></W>)
    expect(screen.getByText('«')).toBeInTheDocument()
    expect(screen.getByText('»')).toBeInTheDocument()
  })

  it('showFirstLast defaults to false — no « or »', () => {
    render(<W><JPagination page={5} onPageChange={vi.fn()} totalPages={10} /></W>)
    expect(screen.queryByText('«')).not.toBeInTheDocument()
    expect(screen.queryByText('»')).not.toBeInTheDocument()
  })

  it('showInfo=true renders page info label', () => {
    render(<W><JPagination page={3} onPageChange={vi.fn()} totalPages={10} showInfo /></W>)
    expect(screen.getByText('3 / 10')).toBeInTheDocument()
  })

  it('showInfo=false hides page info label', () => {
    render(<W><JPagination page={3} onPageChange={vi.fn()} totalPages={10} showInfo={false} /></W>)
    expect(screen.queryByText('3 / 10')).not.toBeInTheDocument()
  })

  it('wrapper has role=navigation with aria-label', () => {
    const { container } = render(<W><JPagination page={1} onPageChange={vi.fn()} totalPages={5} /></W>)
    expect(container.querySelector('nav[aria-label="Pagination"]')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to confirm RED**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test
```

Expected: 17 JPagination tests fail — `Cannot find module './JPagination'`.

- [ ] **Step 3: Implement JPagination.tsx**

Create `packages/jarvis-ui/src/components/ui/JPagination.tsx`:

```tsx
import type { CSSProperties } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

export interface JPaginationProps {
  page:           number
  onPageChange:   (page: number) => void
  totalPages:     number
  showFirstLast?: boolean
  showInfo?:      boolean
  pageSize?:      number
  color?:         JColor
}

// Build visible page list for ellipsis mode.
// Returns page numbers with -1 as the sentinel for "···"
function getVisiblePages(page: number, totalPages: number, pageSize: number): number[] {
  const half  = Math.floor(pageSize / 2)
  let   start = Math.max(1, page - half)
  let   end   = Math.min(totalPages, start + pageSize - 1)
  start = Math.max(1, end - pageSize + 1)

  const pages: number[] = []
  if (start > 1) {
    pages.push(1)
    if (start > 2) pages.push(-1)
  }
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push(-1)
    pages.push(totalPages)
  }
  return pages
}

const BASE_BTN: CSSProperties = {
  padding:       '5px 10px',
  fontSize:      11,
  fontFamily:    "'Courier New', monospace",
  letterSpacing: '0.08em',
  clipPath:      'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
  cursor:        'pointer',
  transition:    'all 0.15s',
  border:        'none',
}

function navStyle(disabled: boolean): CSSProperties {
  return {
    ...BASE_BTN,
    background: 'transparent',
    border:     `1px solid ${disabled ? 'var(--j-accent-08)' : 'var(--j-accent-18)'}`,
    color:      disabled ? 'var(--j-accent-18)' : 'var(--j-text-muted)',
    cursor:     disabled ? 'not-allowed' : 'pointer',
  }
}

function pageStyle(isActive: boolean): CSSProperties {
  return {
    ...BASE_BTN,
    background: isActive ? 'var(--j-accent-12)' : 'transparent',
    border:     `1px solid ${isActive ? 'var(--j-accent)' : 'var(--j-accent-18)'}`,
    color:      isActive ? 'var(--j-accent)' : 'var(--j-text-muted)',
    boxShadow:  isActive ? '0 0 8px var(--j-accent-44)' : 'none',
  }
}

export function JPagination({
  page,
  onPageChange,
  totalPages,
  showFirstLast = false,
  showInfo      = true,
  pageSize      = 5,
}: JPaginationProps) {
  const atStart = page <= 1
  const atEnd   = page >= totalPages

  function goTo(p: number) {
    const clamped = Math.max(1, Math.min(totalPages, p))
    if (clamped !== page) onPageChange(clamped)
  }

  return (
    <nav
      aria-label="Pagination"
      style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Courier New', monospace" }}
    >
      {showFirstLast && (
        <button type="button" disabled={atStart} onClick={() => goTo(1)} style={navStyle(atStart)}>
          «
        </button>
      )}

      <button type="button" disabled={atStart} onClick={() => goTo(page - 1)} style={navStyle(atStart)}>
        ‹
      </button>

      {totalPages <= 10 ? (
        /* Tick bar mode */
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
          {Array.from({ length: totalPages }, (_, i) => {
            const p      = i + 1
            const isCur  = p === page
            return (
              <div
                key={p}
                role="button"
                tabIndex={0}
                aria-label={`Page ${p}`}
                aria-current={isCur ? 'page' : undefined}
                onClick={() => goTo(p)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(p) } }}
                style={{
                  width:      6,
                  height:     isCur ? 18 : 10,
                  background: isCur ? 'var(--j-accent)' : 'var(--j-accent-18)',
                  clipPath:   'polygon(0 15%, 100% 0, 100% 100%, 0 85%)',
                  boxShadow:  isCur ? '0 0 8px var(--j-accent)' : 'none',
                  cursor:     'pointer',
                  transition: 'all 0.2s',
                  ...(isCur ? { animation: 'j-pulse 2s ease-in-out infinite' } : {}),
                }}
              />
            )
          })}
        </div>
      ) : (
        /* Ellipsis mode */
        <>
          {getVisiblePages(page, totalPages, pageSize).map((p, idx) =>
            p === -1 ? (
              <span
                key={`ellipsis-${idx}`}
                style={{ color: 'var(--j-text-dim)', fontSize: 10, padding: '0 4px' }}
              >
                ···
              </span>
            ) : (
              <button
                key={p}
                type="button"
                aria-current={p === page ? 'page' : undefined}
                onClick={() => goTo(p)}
                style={pageStyle(p === page)}
              >
                {p}
              </button>
            )
          )}
        </>
      )}

      <button type="button" disabled={atEnd} onClick={() => goTo(page + 1)} style={navStyle(atEnd)}>
        ›
      </button>

      {showFirstLast && (
        <button type="button" disabled={atEnd} onClick={() => goTo(totalPages)} style={navStyle(atEnd)}>
          »
        </button>
      )}

      {showInfo && (
        <span style={{
          fontSize:      9,
          color:         'var(--j-text-dim)',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          marginLeft:    8,
        }}>
          {page} / {totalPages}
        </span>
      )}
    </nav>
  )
}
```

- [ ] **Step 4: Run tests to confirm GREEN**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test
```

Expected: All 17 JPagination tests pass. All previous tests still pass.

- [ ] **Step 5: Commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/components/ui/JPagination.tsx packages/jarvis-ui/src/components/ui/JPagination.test.tsx
git commit -m "feat(jarvis-ui): add JPagination navigation component"
```

---

## Task 4: Wire Up Exports

**Files:**
- Modify: `packages/jarvis-ui/src/index.ts` (append 8 lines at the end)

**Interfaces:**
- Consumes: All 4 components from Tasks 1-3
- Produces: Public API — consumers can `import { JTabs, JTab, JAccordion, JPagination } from 'jarvis-ui'`

- [ ] **Step 1: Append exports to index.ts**

Open `packages/jarvis-ui/src/index.ts` and append these lines at the very end of the file:

```ts
// Components — navigation
export type { JTabsProps } from './components/ui/JTabs'
export { JTabs } from './components/ui/JTabs'
export type { JTabProps } from './components/ui/JTab'
export { JTab } from './components/ui/JTab'
export type { JAccordionProps } from './components/ui/JAccordion'
export { JAccordion } from './components/ui/JAccordion'
export type { JPaginationProps } from './components/ui/JPagination'
export { JPagination } from './components/ui/JPagination'
```

- [ ] **Step 2: Run full test suite to confirm nothing broke**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test
```

Expected: All tests pass — JTabs (14), JAccordion (17), JPagination (17), plus all Phase 1-4 tests.

- [ ] **Step 3: Verify build compiles**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui build
```

Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 4: Commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/index.ts
git commit -m "feat(jarvis-ui): export Phase 5 navigation components from index"
```

---

## Self-Review

**1. Spec coverage:**
- JTabs: tab strip clip-path ✓, aria-selected ✓, aria-controls ✓, ArrowLeft/Right/Home/End ✓, disabled tab ✓, icon ✓, badge ✓, uncontrolled ✓, controlled ✓, scan underline ✓
- JTab: content gate ✓, role=tabpanel ✓, aria-labelledby ✓, `_isJTab` marker ✓
- JAccordion: defaultOpen ✓, controlled isOpen ✓, onIsOpenChange ✓, left rail ✓, diamond chevron rotate ✓, scan-v ✓, slide-in ✓, warning/error/success state ✓, icon ✓, badge ✓, aria-expanded ✓, role=region ✓, useId ✓
- JPagination: tick mode ≤10 ✓, ellipsis mode >10 ✓, aria-current ✓, showFirstLast ✓, showInfo ✓, pageSize ✓, disabled at boundaries ✓, j-pulse on active tick ✓, role=navigation ✓

**2. Placeholder scan:** None found. Every step has complete code.

**3. Type consistency:**
- `useJTabsContext` defined in JTabs.tsx, imported in JTab.tsx ✓
- `JTab._isJTab` set after function definition, read in JTabs via `(child.type as any)._isJTab` ✓
- `getVisiblePages` returns `number[]` where `-1` = ellipsis; rendered with `p === -1` check ✓
- All `JColor` / `JState` imports match exact string literals from `JarvisTokens.ts` ✓
