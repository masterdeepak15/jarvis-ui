# Phase 4: Display Atoms + Feedback Overlays — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port 11 Blazor display/feedback components to React — JBadge, JStatusPill, JProgress, JDivider, JHudLabel, JAlert, JDataRow, JModal, JToast, JToastProvider + useToast, JStatCard — all following established inline-style and CSS-class patterns.

**Architecture:** All atoms (JBadge, JStatusPill, JProgress, JDivider, JAlert) use inline `React.CSSProperties` — no new CSS written. JHudLabel and JDataRow use existing `j-hl-*` / `j-data-*` CSS classes already in `jarvis-ui.css`. JModal is the first portal component (`ReactDOM.createPortal`). JToastProvider introduces the library's first global context + `useToast()` hook. JStatCard is a composite that wraps JCard.

**Tech Stack:** React 18, TypeScript, Vitest + React Testing Library, existing `jarvis-ui.css`/`jarvis-maps.css`/`jarvis-charts.css` (read-only).

## Global Constraints

- Repo root: `D:\Claude\HUD Theme\HUDtheme\`
- Library source: `packages/jarvis-ui/src/`
- Blazor reference (read-only): `D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI\Components\`
- All colors via `var(--j-*)` CSS variables — **no hardcoded hex**
- **No `border-radius`** on HUD components — use `clip-path` polygons (only exception: `JBadge` shape `'pill'` uses `borderRadius:'999px'`)
- Font: `'Courier New', monospace` everywhere
- CSS files are read-only — do not edit any `.css` file
- Inline style pattern for all new atoms — `React.CSSProperties` objects
- CSS class pattern for JHudLabel + JDataRow — apply existing class names from `jarvis-ui.css`
- TDD: write failing test first, confirm RED, implement, confirm GREEN, commit
- Test wrapper: `function W({ children }: { children: ReactNode }) { return <JThemeProvider>{children}</JThemeProvider> }`
- PowerShell PATH fix (run before every command): `$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH`
- Test command: `pnpm --filter jarvis-ui test`
- Exact JState values: `'idle' | 'active' | 'processing' | 'warning' | 'error' | 'success'`
- Exact JColor values: `'cyan' | 'blue' | 'amber' | 'red' | 'green' | 'ghost' | 'white'`
- Exact JCardStyle values: `'CornerBracket' | 'Notched' | 'SideRail' | 'GlowBorder' | 'PartialBorder' | 'DangerPulse' | 'Hexagonal' | 'Radar' | 'DoubleFrame'`
- JCard props consumed by JStatCard: `cardStyle?`, `color?`, `header?`, `footer?`, `padding?`, `children?` — **no `state` or `showScan` on JCard**

---

## Task 1: JBadge + JStatusPill

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JBadge.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JBadge.test.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JStatusPill.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JStatusPill.test.tsx`

**Interfaces:**
- Consumes: `JColor`, `JSize`, `JState` from `../../theme/JarvisTokens`; `JThemeProvider` from `../../theme/JThemeContext`
- Produces:
  - `JBadge(props: JBadgeProps)` — inline-styled `<span>` badge
  - `JStatusPill(props: JStatusPillProps)` — parallelogram status indicator div
  - `JBadgeShape = 'angular' | 'hex' | 'diamond' | 'pill'`

- [ ] **Step 1: Write failing tests for JBadge**

Create `packages/jarvis-ui/src/components/ui/JBadge.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JBadge } from './JBadge'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JBadge', () => {
  it('renders children', () => {
    render(<W><JBadge>Active</JBadge></W>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('angular shape has clip-path polygon', () => {
    const { container } = render(<W><JBadge shape="angular">Tag</JBadge></W>)
    expect((container.querySelector('span') as HTMLElement).style.clipPath).toContain('polygon')
  })

  it('pill shape has border-radius 999px', () => {
    const { container } = render(<W><JBadge shape="pill">Tag</JBadge></W>)
    expect((container.querySelector('span') as HTMLElement).style.borderRadius).toBe('999px')
  })

  it('hex shape has clip-path polygon', () => {
    const { container } = render(<W><JBadge shape="hex">Hex</JBadge></W>)
    expect((container.querySelector('span') as HTMLElement).style.clipPath).toContain('polygon')
  })

  it('diamond shape has 36px size', () => {
    const { container } = render(<W><JBadge shape="diamond">X</JBadge></W>)
    const span = container.querySelector('span') as HTMLElement
    expect(span.style.width).toBe('36px')
    expect(span.style.height).toBe('36px')
  })

  it('amber color applies warn CSS vars', () => {
    const { container } = render(<W><JBadge color="amber">Warn</JBadge></W>)
    expect((container.querySelector('span') as HTMLElement).style.background).toContain('j-warn-12')
  })

  it('red color applies err CSS vars', () => {
    const { container } = render(<W><JBadge color="red">Err</JBadge></W>)
    expect((container.querySelector('span') as HTMLElement).style.color).toContain('j-red')
  })

  it('blink=true adds j-blink class', () => {
    const { container } = render(<W><JBadge blink>Tag</JBadge></W>)
    expect(container.querySelector('.j-blink')).toBeInTheDocument()
  })

  it('blink=false (default) has no j-blink class', () => {
    const { container } = render(<W><JBadge>Tag</JBadge></W>)
    expect(container.querySelector('.j-blink')).not.toBeInTheDocument()
  })

  it('showDot=true renders j-status-dot', () => {
    const { container } = render(<W><JBadge showDot>Tag</JBadge></W>)
    expect(container.querySelector('.j-status-dot')).toBeInTheDocument()
  })

  it('showDot=false (default) has no j-status-dot', () => {
    const { container } = render(<W><JBadge>Tag</JBadge></W>)
    expect(container.querySelector('.j-status-dot')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Write failing tests for JStatusPill**

Append to the same file OR create `packages/jarvis-ui/src/components/ui/JStatusPill.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JStatusPill } from './JStatusPill'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JStatusPill', () => {
  it('renders children', () => {
    render(<W><JStatusPill>System Online</JStatusPill></W>)
    expect(screen.getByText('System Online')).toBeInTheDocument()
  })

  it('active state (default) uses accent border', () => {
    const { container } = render(<W><JStatusPill>Active</JStatusPill></W>)
    expect((container.querySelector('div') as HTMLElement).style.borderLeft).toContain('j-accent')
  })

  it('error state uses err color in border', () => {
    const { container } = render(<W><JStatusPill state="error">Error</JStatusPill></W>)
    expect((container.querySelector('div') as HTMLElement).style.borderLeft).toContain('j-err')
  })

  it('warning state uses warn color in border', () => {
    const { container } = render(<W><JStatusPill state="warning">Warn</JStatusPill></W>)
    expect((container.querySelector('div') as HTMLElement).style.borderLeft).toContain('j-warn')
  })

  it('success state uses ok color in border', () => {
    const { container } = render(<W><JStatusPill state="success">Ok</JStatusPill></W>)
    expect((container.querySelector('div') as HTMLElement).style.borderLeft).toContain('j-ok')
  })

  it('blink=true adds j-blink-slow class', () => {
    const { container } = render(<W><JStatusPill blink>Status</JStatusPill></W>)
    expect(container.querySelector('.j-blink-slow')).toBeInTheDocument()
  })

  it('renders j-status-dot', () => {
    const { container } = render(<W><JStatusPill>Online</JStatusPill></W>)
    expect(container.querySelector('.j-status-dot')).toBeInTheDocument()
  })

  it('idle state removes dot animation', () => {
    const { container } = render(<W><JStatusPill state="idle">Idle</JStatusPill></W>)
    expect((container.querySelector('.j-status-dot') as HTMLElement).style.animation).toBe('none')
  })
})
```

- [ ] **Step 3: Run tests — confirm RED**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test 2>&1 | Select-String "JBadge|JStatusPill|FAIL|Cannot find module"
```

Expected: FAIL — `Cannot find module './JBadge'` and `Cannot find module './JStatusPill'`

- [ ] **Step 4: Implement JBadge**

Create `packages/jarvis-ui/src/components/ui/JBadge.tsx`:

```tsx
import type { ReactNode } from 'react'
import type { JColor, JSize } from '../../theme/JarvisTokens'

export type JBadgeShape = 'angular' | 'hex' | 'diamond' | 'pill'

export interface JBadgeProps {
  color?:    JColor
  size?:     JSize
  shape?:    JBadgeShape
  blink?:    boolean
  showDot?:  boolean
  children?: ReactNode
}

const COLOR_STYLE: Record<string, React.CSSProperties> = {
  cyan:  { background: 'var(--j-accent-12)', color: 'var(--j-cyan)',      border: '1px solid var(--j-accent-35)'   },
  amber: { background: 'var(--j-warn-12)',   color: 'var(--j-amber)',     border: '1px solid var(--j-warn-25)'     },
  red:   { background: 'var(--j-err-12)',    color: 'var(--j-red)',       border: '1px solid var(--j-err-25)'      },
  green: { background: 'var(--j-ok-12)',     color: 'var(--j-green)',     border: '1px solid var(--j-ok-25)'       },
  ghost: { background: 'var(--j-accent-05)', color: 'var(--j-text-muted)',border: '1px solid var(--j-border-dim)'  },
}

const SIZE_STYLE: Record<string, React.CSSProperties> = {
  xs: { fontSize: 8,  padding: '2px 7px'  },
  sm: { fontSize: 9,  padding: '3px 9px'  },
  md: { fontSize: 10, padding: '4px 12px' },
  lg: { fontSize: 11, padding: '5px 14px' },
  xl: { fontSize: 12, padding: '6px 16px' },
}

const SHAPE_STYLE: Record<JBadgeShape, React.CSSProperties> = {
  angular: { clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' },
  hex:     { clipPath: 'polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)', paddingLeft: 14, paddingRight: 14 },
  diamond: { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 },
  pill:    { borderRadius: '999px' },
}

const DOT_COLOR: Partial<Record<string, React.CSSProperties>> = {
  amber: { background: 'var(--j-amber)' },
  red:   { background: 'var(--j-red)'   },
  green: { background: 'var(--j-green)' },
}

export function JBadge({ color = 'cyan', size = 'sm', shape = 'angular', blink = false, showDot = false, children }: JBadgeProps) {
  const style: React.CSSProperties = {
    display:       'inline-flex',
    alignItems:    'center',
    letterSpacing: '0.10em',
    textTransform: 'uppercase',
    fontFamily:    "'Courier New', monospace",
    ...(COLOR_STYLE[color] ?? COLOR_STYLE.cyan),
    ...(SIZE_STYLE[size]   ?? SIZE_STYLE.sm),
    ...SHAPE_STYLE[shape],
  }
  return (
    <span className={blink ? 'j-blink' : undefined} style={style}>
      {showDot && (
        <span
          className="j-status-dot"
          style={{ marginRight: 5, display: 'inline-block', flexShrink: 0, ...(DOT_COLOR[color] ?? {}) }}
        />
      )}
      {children}
    </span>
  )
}
```

- [ ] **Step 5: Implement JStatusPill**

Create `packages/jarvis-ui/src/components/ui/JStatusPill.tsx`:

```tsx
import type { ReactNode } from 'react'
import type { JState } from '../../theme/JarvisTokens'

export interface JStatusPillProps {
  state?:    JState
  blink?:    boolean
  children?: ReactNode
}

const STATE_MAP: Record<string, { bg: string; accent: string }> = {
  active:     { bg: 'var(--j-accent-08)',  accent: 'var(--j-accent)'    },
  processing: { bg: 'var(--j-accent-08)',  accent: 'var(--j-accent)'    },
  warning:    { bg: 'var(--j-warn-05)',    accent: 'var(--j-warn)'      },
  error:      { bg: 'var(--j-err-05)',     accent: 'var(--j-err)'       },
  success:    { bg: 'var(--j-ok-05)',      accent: 'var(--j-ok)'        },
  idle:       { bg: 'var(--j-accent-05)', accent: 'var(--j-accent-18)' },
}

const DOT_OVERRIDE: Partial<Record<string, React.CSSProperties>> = {
  warning: { background: 'var(--j-amber)', animationDuration: '1.8s' },
  error:   { background: 'var(--j-red)',   animationDuration: '0.7s' },
  success: { background: 'var(--j-green)', animationDuration: '2.5s' },
  idle:    { background: 'var(--j-accent-25)', animation: 'none'    },
}

export function JStatusPill({ state = 'active', blink = false, children }: JStatusPillProps) {
  const { bg, accent } = STATE_MAP[state] ?? STATE_MAP.active

  return (
    <div
      className={blink ? 'j-blink-slow' : undefined}
      style={{
        display:    'flex',
        alignItems: 'center',
        gap:        8,
        padding:    '7px 16px 7px 12px',
        background: bg,
        borderLeft: `2px solid ${accent}`,
        clipPath:   'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
        fontFamily: "'Courier New', monospace",
      }}
    >
      <span className="j-status-dot" style={DOT_OVERRIDE[state]} />
      <span style={{ fontSize: 11, letterSpacing: '0.08em', color: accent }}>{children}</span>
    </div>
  )
}
```

- [ ] **Step 6: Run tests — confirm GREEN**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test 2>&1 | Select-String "JBadge|JStatusPill|Tests|passed|failed"
```

Expected: all JBadge and JStatusPill tests pass, all prior tests still pass.

- [ ] **Step 7: Commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/components/ui/JBadge.tsx packages/jarvis-ui/src/components/ui/JBadge.test.tsx packages/jarvis-ui/src/components/ui/JStatusPill.tsx packages/jarvis-ui/src/components/ui/JStatusPill.test.tsx
git commit -m "feat: add JBadge + JStatusPill"
```

---

## Task 2: JProgress + JDivider + JHudLabel

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JProgress.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JProgress.test.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JDivider.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JDivider.test.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JHudLabel.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JHudLabel.test.tsx`

**Interfaces:**
- Consumes: `JColor`, `JState` from tokens; `JThemeProvider` for tests
- Produces:
  - `JProgress(props: JProgressProps)` — bar or ticks progress indicator
  - `JDivider(props: JDividerProps)` — horizontal/vertical gradient divider
  - `JHudLabel(props: JHudLabelProps)` — 5-variant HUD label using `j-hl-*` CSS classes
  - `JProgressVariant = 'bar' | 'ticks'`
  - `JDividerOrientation = 'horizontal' | 'vertical'`
  - `JHudLabelVariant = 'chip' | 'callout' | 'circuit' | 'badge' | 'panel'`

- [ ] **Step 1: Write failing tests for JProgress**

Create `packages/jarvis-ui/src/components/ui/JProgress.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JProgress } from './JProgress'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JProgress - bar variant', () => {
  it('renders label', () => {
    render(<W><JProgress value={50} label="CPU Load" /></W>)
    expect(screen.getByText('CPU Load')).toBeInTheDocument()
  })

  it('value=75 sets fill width to 75%', () => {
    const { container } = render(<W><JProgress value={75} /></W>)
    // The fill div is the first child of the track div (second div inside the root)
    const fills = container.querySelectorAll('div')
    const fill = Array.from(fills).find(d => d.style.width === '75%')
    expect(fill).toBeInTheDocument()
  })

  it('showPercent=true (default) shows percentage when label provided', () => {
    render(<W><JProgress value={42} label="RAM" showPercent /></W>)
    expect(screen.getByText('42%')).toBeInTheDocument()
  })

  it('showPercent=false hides percentage', () => {
    render(<W><JProgress value={42} label="RAM" showPercent={false} /></W>)
    expect(screen.queryByText('42%')).not.toBeInTheDocument()
  })

  it('indeterminate=true shows no percentage even when showPercent=true', () => {
    render(<W><JProgress value={50} label="Loading" indeterminate showPercent /></W>)
    expect(screen.queryByText('50%')).not.toBeInTheDocument()
  })

  it('indeterminate hides width fill', () => {
    const { container } = render(<W><JProgress value={50} indeterminate /></W>)
    const fills = container.querySelectorAll('div')
    const widthFill = Array.from(fills).find(d => d.style.width === '50%')
    expect(widthFill).not.toBeInTheDocument()
  })
})

describe('JProgress - ticks variant', () => {
  it('renders total tick divs (default 16)', () => {
    const { container } = render(<W><JProgress value={50} variant="ticks" /></W>)
    expect(container.querySelectorAll('.j-tk').length).toBe(16)
  })

  it('active ticks = Math.round(50/100*16) = 8 — no "off" class', () => {
    const { container } = render(<W><JProgress value={50} variant="ticks" /></W>)
    const active = Array.from(container.querySelectorAll('.j-tk')).filter(el => !el.className.includes('off'))
    expect(active.length).toBe(8)
  })

  it('custom total=10 renders 10 ticks', () => {
    const { container } = render(<W><JProgress value={50} variant="ticks" total={10} /></W>)
    expect(container.querySelectorAll('.j-tk').length).toBe(10)
  })

  it('error state applies red background to active ticks', () => {
    const { container } = render(<W><JProgress value={100} variant="ticks" state="error" /></W>)
    const activeTick = container.querySelector('.j-tk:not(.off)') as HTMLElement
    expect(activeTick?.style.background).toContain('j-red')
  })
})
```

- [ ] **Step 2: Write failing tests for JDivider**

Create `packages/jarvis-ui/src/components/ui/JDivider.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JDivider } from './JDivider'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JDivider', () => {
  it('horizontal (default) renders two gradient line divs', () => {
    const { container } = render(<W><JDivider /></W>)
    const lines = Array.from(container.querySelectorAll('div')).filter(d =>
      d.style.background?.includes('linear-gradient')
    )
    expect(lines.length).toBeGreaterThanOrEqual(2)
  })

  it('label renders label text', () => {
    render(<W><JDivider label="SECTION" /></W>)
    expect(screen.getByText('SECTION')).toBeInTheDocument()
  })

  it('showDot=true renders diamond dot div', () => {
    const { container } = render(<W><JDivider showDot /></W>)
    const dots = Array.from(container.querySelectorAll('div')).filter(d =>
      d.style.clipPath?.includes('50%')
    )
    expect(dots.length).toBeGreaterThanOrEqual(1)
  })

  it('showDot=false with no label — no dot rendered', () => {
    const { container } = render(<W><JDivider showDot={false} /></W>)
    const dots = Array.from(container.querySelectorAll('div')).filter(d =>
      d.style.clipPath?.includes('50%')
    )
    expect(dots.length).toBe(0)
  })

  it('label takes priority over dot', () => {
    render(<W><JDivider label="TEST" showDot /></W>)
    expect(screen.getByText('TEST')).toBeInTheDocument()
  })

  it('vertical orientation sets flex-direction column', () => {
    const { container } = render(<W><JDivider orientation="vertical" /></W>)
    const root = container.querySelector('div') as HTMLElement
    expect(root.style.flexDirection).toBe('column')
  })
})
```

- [ ] **Step 3: Write failing tests for JHudLabel**

Create `packages/jarvis-ui/src/components/ui/JHudLabel.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JHudLabel } from './JHudLabel'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JHudLabel', () => {
  it('chip variant renders j-hl-chip class', () => {
    const { container } = render(<W><JHudLabel variant="chip" text="UPLOAD" /></W>)
    expect(container.querySelector('.j-hl-chip')).toBeInTheDocument()
  })

  it('chip variant renders text', () => {
    render(<W><JHudLabel variant="chip" text="SENSOR-04" /></W>)
    expect(screen.getByText('SENSOR-04')).toBeInTheDocument()
  })

  it('callout variant renders j-hl-callout class', () => {
    const { container } = render(<W><JHudLabel variant="callout" text="NH-90" /></W>)
    expect(container.querySelector('.j-hl-callout')).toBeInTheDocument()
  })

  it('circuit variant renders j-hl-circuit class', () => {
    const { container } = render(<W><JHudLabel variant="circuit" text="SENSOR" /></W>)
    expect(container.querySelector('.j-hl-circuit')).toBeInTheDocument()
  })

  it('badge variant renders j-hl-badge class', () => {
    const { container } = render(<W><JHudLabel variant="badge" text="90" /></W>)
    expect(container.querySelector('.j-hl-badge')).toBeInTheDocument()
  })

  it('panel variant renders j-hl-panel class', () => {
    const { container } = render(<W><JHudLabel variant="panel" text="DATA" /></W>)
    expect(container.querySelector('.j-hl-panel')).toBeInTheDocument()
  })

  it('outer div has j-hl class', () => {
    const { container } = render(<W><JHudLabel variant="chip" text="X" /></W>)
    expect(container.querySelector('.j-hl')).toBeInTheDocument()
  })

  it('showLine=false omits line element for chip', () => {
    const { container } = render(<W><JHudLabel variant="chip" text="X" showLine={false} /></W>)
    expect(container.querySelector('.j-hl-line-h')).not.toBeInTheDocument()
  })

  it('subText renders in callout variant', () => {
    render(<W><JHudLabel variant="callout" text="MAIN" subText="SUB" /></W>)
    expect(screen.getByText('SUB')).toBeInTheDocument()
  })

  it('value renders in circuit variant', () => {
    render(<W><JHudLabel variant="circuit" text="SENSOR" value="99.8%" /></W>)
    expect(screen.getByText('99.8%')).toBeInTheDocument()
  })
})
```

- [ ] **Step 4: Run tests — confirm RED**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test 2>&1 | Select-String "JProgress|JDivider|JHudLabel|Cannot find"
```

Expected: FAIL — module not found errors for all three.

- [ ] **Step 5: Implement JProgress**

Create `packages/jarvis-ui/src/components/ui/JProgress.tsx`:

```tsx
import type { JState } from '../../theme/JarvisTokens'

export type JProgressVariant = 'bar' | 'ticks'

export interface JProgressProps {
  value?:         number
  label?:         string
  state?:         JState
  variant?:       JProgressVariant
  indeterminate?: boolean
  showPercent?:   boolean
  total?:         number
}

const TICK_H = [12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10] as const

const STATE_TICK: Partial<Record<string, string>> = {
  warning: 'var(--j-amber)',
  error:   'var(--j-red)',
  success: 'var(--j-green)',
}

const trackStyle: React.CSSProperties = {
  height:    5,
  background:'var(--j-accent-08)',
  clipPath:  'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)',
  position:  'relative',
  overflow:  'hidden',
}

export function JProgress({
  value         = 0,
  label,
  state         = 'active',
  variant       = 'bar',
  indeterminate = false,
  showPercent   = true,
  total         = 16,
}: JProgressProps) {
  const labelRow = label && (
    <div style={{ fontSize: 9, color: 'var(--j-accent-50)', letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
      <span>{label}</span>
      {showPercent && !indeterminate && <span style={{ color: 'var(--j-text-primary)' }}>{value}%</span>}
    </div>
  )

  if (variant === 'ticks') {
    const active   = Math.round(value / 100 * total)
    const tickColor = STATE_TICK[state]
    return (
      <div>
        {labelRow}
        <div className="j-tick-row">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`j-tk${i < active ? '' : ' off'}`}
              style={{ height: TICK_H[i % TICK_H.length], ...(tickColor ? { background: tickColor } : {}) }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {labelRow}
      <div style={trackStyle}>
        {indeterminate ? (
          <>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--j-accent)', opacity: 0.15, clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)' }} />
            <div style={{ position: 'absolute', top: 0, left: -40, bottom: 0, width: 40, background: 'linear-gradient(90deg, transparent, var(--j-accent), transparent)', animation: 'j-scan-h 1.4s ease-in-out infinite' }} />
          </>
        ) : (
          <div style={{ width: `${value}%`, height: '100%', background: 'linear-gradient(90deg, var(--j-accent-deep), var(--j-accent))', clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)', transition: 'width 0.6s ease-out' }} />
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Implement JDivider**

Create `packages/jarvis-ui/src/components/ui/JDivider.tsx`:

```tsx
export type JDividerOrientation = 'horizontal' | 'vertical'

export interface JDividerProps {
  orientation?: JDividerOrientation
  label?:       string
  showDot?:     boolean
  height?:      string
  margin?:      string
  opacity?:     number
}

const DOT: React.CSSProperties = {
  width:     5,
  height:    5,
  flexShrink:0,
  background:'var(--j-accent)',
  clipPath:  'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  boxShadow: '0 0 6px var(--j-accent)',
  animation: 'j-pulse 2.5s ease-in-out infinite',
}

export function JDivider({ orientation = 'horizontal', label, showDot = true, height = '40px', margin = '8px 0', opacity = 0.30 }: JDividerProps) {
  const acc = 'var(--j-accent)'

  if (orientation === 'vertical') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height, margin: '0 8px' }}>
        <div style={{ flex: 1, width: 1, background: `linear-gradient(180deg, transparent, ${acc})`, opacity }} />
        {showDot && <div style={{ ...DOT, margin: '6px 0' }} />}
        <div style={{ flex: 1, width: 1, background: `linear-gradient(180deg, ${acc}, transparent)`, opacity }} />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin, width: '100%' }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${acc})`, opacity }} />
      {label
        ? <span style={{ fontSize: 8, color: acc, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0 10px', opacity: 0.7, whiteSpace: 'nowrap' }}>{label}</span>
        : showDot && <div style={{ ...DOT, margin: '0 8px' }} />
      }
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${acc}, transparent)`, opacity }} />
    </div>
  )
}
```

- [ ] **Step 7: Implement JHudLabel**

Create `packages/jarvis-ui/src/components/ui/JHudLabel.tsx`:

```tsx
import type { JColor } from '../../theme/JarvisTokens'
import { JarvisTokens } from '../../theme/JarvisTokens'

export type JHudLabelVariant = 'chip' | 'callout' | 'circuit' | 'badge' | 'panel'

export interface JHudLabelProps {
  variant?:  JHudLabelVariant
  text:      string
  subText?:  string
  value?:    string
  color?:    JColor
  showDot?:  boolean
  showLine?: boolean
}

export function JHudLabel({ variant = 'chip', text, subText, value, color = 'cyan', showDot = true, showLine = true }: JHudLabelProps) {
  const outerClass = JarvisTokens.cls('j-hl', `j-hl-${variant}`, JarvisTokens.color(color))

  let inner: React.ReactNode

  switch (variant) {
    case 'chip':
      inner = (
        <div className="j-hl-chip">
          {showDot && <span className="j-hl-pip" />}
          <span className="j-hl-text">{text}</span>
          {value && <span className="j-hl-val">{value}</span>}
          {showLine && <div className="j-hl-line-h" />}
        </div>
      )
      break

    case 'callout':
      inner = (
        <div className="j-hl-callout">
          <div className="j-hl-callout-inner">
            {subText && <div className="j-hl-sub">{subText}</div>}
            <div className="j-hl-main">{text}</div>
          </div>
          {showLine && (
            <div className="j-hl-callout-line">
              <div className="j-hl-line-seg" />
              <div className="j-hl-line-dot" />
            </div>
          )}
        </div>
      )
      break

    case 'circuit':
      inner = (
        <div className="j-hl-circuit">
          <div className="j-hl-cir-bracket">
            <div className="j-hl-cir-label">{text}</div>
            {value && <div className="j-hl-cir-val">{value}</div>}
          </div>
          {showLine && (
            <div className="j-hl-cir-arm">
              <div className="j-hl-cir-node" />
              <div className="j-hl-cir-track" />
              <div className="j-hl-cir-node j-hl-cir-node-end" />
            </div>
          )}
        </div>
      )
      break

    case 'badge':
      inner = (
        <div className="j-hl-badge">
          <div className="j-hl-badge-ring">
            <span className="j-hl-badge-val">{value ?? text}</span>
          </div>
          <div className="j-hl-badge-label">{text}</div>
        </div>
      )
      break

    case 'panel':
      inner = (
        <div className="j-hl-panel">
          <div className="j-hl-panel-top">
            {subText && <span className="j-hl-panel-sub">{subText}</span>}
          </div>
          <div className="j-hl-panel-body">
            <span className="j-hl-panel-main">{text}</span>
            {value && <span className="j-hl-panel-val">{value}</span>}
          </div>
          <div className="j-hl-panel-scan" />
        </div>
      )
      break
  }

  return <div className={outerClass}>{inner}</div>
}
```

- [ ] **Step 8: Run tests — confirm GREEN**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test 2>&1 | Select-String "JProgress|JDivider|JHudLabel|Tests|passed|failed"
```

Expected: all Task 2 tests pass, all prior tests still pass.

- [ ] **Step 9: Commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/components/ui/JProgress.tsx packages/jarvis-ui/src/components/ui/JProgress.test.tsx packages/jarvis-ui/src/components/ui/JDivider.tsx packages/jarvis-ui/src/components/ui/JDivider.test.tsx packages/jarvis-ui/src/components/ui/JHudLabel.tsx packages/jarvis-ui/src/components/ui/JHudLabel.test.tsx
git commit -m "feat: add JProgress + JDivider + JHudLabel"
```

---

## Task 3: JAlert + JDataRow

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JAlert.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JAlert.test.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JDataRow.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JDataRow.test.tsx`

**Interfaces:**
- Consumes: `JState` from tokens; `JThemeProvider` for tests
- Produces:
  - `JAlert(props: JAlertProps)` — dismissible state-driven alert panel
  - `JDataRow(props: JDataRowProps)` — key/value row with optional progress bar, uses `j-data-*` classes

- [ ] **Step 1: Write failing tests for JAlert**

Create `packages/jarvis-ui/src/components/ui/JAlert.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JAlert } from './JAlert'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JAlert', () => {
  it('renders children', () => {
    render(<W><JAlert>System is online.</JAlert></W>)
    expect(screen.getByText('System is online.')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<W><JAlert title="STATUS">Content</JAlert></W>)
    expect(screen.getByText('STATUS')).toBeInTheDocument()
  })

  it('no title element when title omitted', () => {
    render(<W><JAlert>Content</JAlert></W>)
    expect(screen.queryByText('STATUS')).not.toBeInTheDocument()
  })

  it('warning state uses warn CSS var in left rail', () => {
    const { container } = render(<W><JAlert state="warning">Warn</JAlert></W>)
    // The left rail is the first absolutely positioned div inside the outer div
    const rail = container.querySelectorAll('div')[1] as HTMLElement
    expect(rail.style.background).toContain('j-warn')
  })

  it('error state uses err CSS var in left rail', () => {
    const { container } = render(<W><JAlert state="error">Error</JAlert></W>)
    const rail = container.querySelectorAll('div')[1] as HTMLElement
    expect(rail.style.background).toContain('j-err')
  })

  it('dismissible=true shows dismiss button', () => {
    render(<W><JAlert dismissible>Content</JAlert></W>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('dismissible=false shows no button', () => {
    render(<W><JAlert>Content</JAlert></W>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('clicking dismiss button removes alert from DOM', () => {
    render(<W><JAlert dismissible>ToRemove</JAlert></W>)
    expect(screen.getByText('ToRemove')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    expect(screen.queryByText('ToRemove')).not.toBeInTheDocument()
  })

  it('onDismiss callback called on dismiss', () => {
    const onDismiss = vi.fn()
    render(<W><JAlert dismissible onDismiss={onDismiss}>Content</JAlert></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('blink=true adds j-blink-slow class', () => {
    const { container } = render(<W><JAlert blink>Content</JAlert></W>)
    expect(container.querySelector('.j-blink-slow')).toBeInTheDocument()
  })

  it('warning icon renders ⚠', () => {
    render(<W><JAlert state="warning">Warn</JAlert></W>)
    expect(screen.getByText('⚠')).toBeInTheDocument()
  })

  it('error icon renders ✕', () => {
    render(<W><JAlert state="error">Err</JAlert></W>)
    expect(screen.getAllByText('✕')[0]).toBeInTheDocument()
  })

  it('success icon renders ✓', () => {
    render(<W><JAlert state="success">Ok</JAlert></W>)
    expect(screen.getByText('✓')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Write failing tests for JDataRow**

Create `packages/jarvis-ui/src/components/ui/JDataRow.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JDataRow } from './JDataRow'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JDataRow', () => {
  it('renders label and value', () => {
    render(<W><JDataRow label="CPU" value="74%" /></W>)
    expect(screen.getByText('CPU')).toBeInTheDocument()
    expect(screen.getByText('74%')).toBeInTheDocument()
  })

  it('uses j-data-row class on root', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" /></W>)
    expect(container.querySelector('.j-data-row')).toBeInTheDocument()
  })

  it('label uses j-data-key class', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" /></W>)
    expect(container.querySelector('.j-data-key')).toBeInTheDocument()
  })

  it('value uses j-data-val class', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" /></W>)
    expect(container.querySelector('.j-data-val')).toBeInTheDocument()
  })

  it('barPercent=50 renders j-data-bar with --j-w set', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" barPercent={50} /></W>)
    expect(container.querySelector('.j-data-bar')).toBeInTheDocument()
    const fill = container.querySelector('.j-data-bar-fill') as HTMLElement
    expect(fill.style.getPropertyValue('--j-w')).toBe('50%')
  })

  it('no barPercent — no j-data-bar rendered', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" /></W>)
    expect(container.querySelector('.j-data-bar')).not.toBeInTheDocument()
  })

  it('error state applies red color to value', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" state="error" /></W>)
    const val = container.querySelector('.j-data-val') as HTMLElement
    expect(val.style.color).toContain('j-red')
  })

  it('warning state applies amber color to value', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" state="warning" /></W>)
    const val = container.querySelector('.j-data-val') as HTMLElement
    expect(val.style.color).toContain('j-amber')
  })

  it('success state applies green color to bar', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" barPercent={80} state="success" /></W>)
    const fill = container.querySelector('.j-data-bar-fill') as HTMLElement
    expect(fill.style.background).toContain('j-ok')
  })
})
```

- [ ] **Step 3: Run tests — confirm RED**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test 2>&1 | Select-String "JAlert|JDataRow|Cannot find"
```

Expected: FAIL — module not found.

- [ ] **Step 4: Implement JAlert**

Create `packages/jarvis-ui/src/components/ui/JAlert.tsx`:

```tsx
import { useState } from 'react'
import type { ReactNode } from 'react'
import type { JState } from '../../theme/JarvisTokens'

export interface JAlertProps {
  state?:       JState
  title?:       string
  children?:    ReactNode
  dismissible?: boolean
  blink?:       boolean
  onDismiss?:   () => void
}

const STATE_COLOR: Record<string, string> = {
  active:     'var(--j-accent)',
  processing: 'var(--j-accent)',
  warning:    'var(--j-warn)',
  error:      'var(--j-err)',
  success:    'var(--j-ok)',
  idle:       'var(--j-accent-35)',
}

const STATE_BG: Record<string, string> = {
  active:     'var(--j-accent-05)',
  processing: 'var(--j-accent-05)',
  warning:    'var(--j-warn-05)',
  error:      'var(--j-err-05)',
  success:    'var(--j-ok-05)',
  idle:       'var(--j-accent-05)',
}

const ICON: Record<string, string> = {
  warning: '⚠',
  error:   '✕',
  success: '✓',
}

const RAIL_ANIM: Partial<Record<string, string>> = {
  error:   'j-pulse 0.8s ease-in-out infinite',
  warning: 'j-pulse 1.5s ease-in-out infinite',
}

export function JAlert({ state = 'active', title, children, dismissible = false, blink = false, onDismiss }: JAlertProps) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  const accent = STATE_COLOR[state] ?? STATE_COLOR.active
  const bg     = STATE_BG[state]    ?? STATE_BG.active
  const icon   = ICON[state] ?? 'ℹ'
  const railAnim = RAIL_ANIM[state]

  function dismiss() {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <div
      className={blink ? 'j-blink-slow' : undefined}
      style={{
        position:    'relative',
        display:     'flex',
        alignItems:  'flex-start',
        gap:         10,
        padding:     '10px 14px 10px 16px',
        background:  bg,
        clipPath:    'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
        fontFamily:  "'Courier New', monospace",
      }}
    >
      {/* Left accent rail */}
      <div style={{
        position:  'absolute',
        top:       0,
        bottom:    0,
        left:      0,
        width:     2,
        background: accent,
        boxShadow: `0 0 8px ${accent}`,
        ...(railAnim ? { animation: railAnim } : {}),
      }} />

      {/* Icon */}
      <span style={{ fontStyle: 'normal', fontSize: 13, flexShrink: 0, color: accent, textShadow: `0 0 8px ${accent}` }}>
        {icon}
      </span>

      {/* Content */}
      <div style={{ flex: 1, fontSize: 11, color: accent, letterSpacing: '0.04em', lineHeight: 1.5 }}>
        {title && (
          <div style={{ fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 2 }}>
            {title}
          </div>
        )}
        {children}
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          type="button"
          onClick={dismiss}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: accent, opacity: 0.6, fontSize: 14, padding: '0 0 0 8px', flexShrink: 0, fontFamily: 'inherit' }}
        >
          ✕
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Implement JDataRow**

Create `packages/jarvis-ui/src/components/ui/JDataRow.tsx`:

```tsx
import type { JState } from '../../theme/JarvisTokens'

export interface JDataRowProps {
  label:       string
  value:       string
  barPercent?: number
  state?:      JState
}

const BAR_GRADIENT: Partial<Record<string, string>> = {
  warning: 'linear-gradient(90deg, var(--j-warn-12), var(--j-warn))',
  error:   'linear-gradient(90deg, var(--j-err-12),  var(--j-err))',
  success: 'linear-gradient(90deg, var(--j-ok-12),   var(--j-ok))',
}

const VAL_COLOR: Partial<Record<string, string>> = {
  warning: 'var(--j-amber)',
  error:   'var(--j-red)',
  success: 'var(--j-green)',
}

export function JDataRow({ label, value, barPercent, state = 'active' }: JDataRowProps) {
  const barGrad  = BAR_GRADIENT[state]
  const valColor = VAL_COLOR[state]

  return (
    <div className="j-data-row">
      <span className="j-data-key">{label}</span>
      {barPercent !== undefined && (
        <div className="j-data-bar">
          <div
            className="j-data-bar-fill"
            style={{
              '--j-w': `${barPercent}%`,
              ...(barGrad ? { background: barGrad } : {}),
            } as React.CSSProperties}
          />
        </div>
      )}
      <span className="j-data-val" style={valColor ? { color: valColor } : undefined}>{value}</span>
    </div>
  )
}
```

- [ ] **Step 6: Run tests — confirm GREEN**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test 2>&1 | Select-String "JAlert|JDataRow|Tests|passed|failed"
```

Expected: all tests pass.

- [ ] **Step 7: Commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/components/ui/JAlert.tsx packages/jarvis-ui/src/components/ui/JAlert.test.tsx packages/jarvis-ui/src/components/ui/JDataRow.tsx packages/jarvis-ui/src/components/ui/JDataRow.test.tsx
git commit -m "feat: add JAlert + JDataRow"
```

---

## Task 4: JModal

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JModal.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JModal.test.tsx`

**Interfaces:**
- Consumes: `createPortal` from `react-dom`; `JThemeProvider` for tests
- Produces: `JModal(props: JModalProps)` — portal-rendered backdrop + notched dialog

- [ ] **Step 1: Write failing tests**

Create `packages/jarvis-ui/src/components/ui/JModal.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JModal } from './JModal'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JModal', () => {
  it('open=false renders nothing', () => {
    render(<W><JModal open={false} onClose={vi.fn()} title="Test">Body</JModal></W>)
    expect(screen.queryByText('Test')).not.toBeInTheDocument()
    expect(screen.queryByText('Body')).not.toBeInTheDocument()
  })

  it('open=true renders title', () => {
    render(<W><JModal open onClose={vi.fn()} title="Shutdown">Body</JModal></W>)
    expect(screen.getByText('Shutdown')).toBeInTheDocument()
  })

  it('open=true renders body children', () => {
    render(<W><JModal open onClose={vi.fn()} title="X">Modal body content</JModal></W>)
    expect(screen.getByText('Modal body content')).toBeInTheDocument()
  })

  it('subTitle renders when provided', () => {
    render(<W><JModal open onClose={vi.fn()} title="X" subTitle="SYSTEM">Body</JModal></W>)
    expect(screen.getByText('SYSTEM')).toBeInTheDocument()
  })

  it('no subTitle element when omitted', () => {
    render(<W><JModal open onClose={vi.fn()} title="X">Body</JModal></W>)
    expect(screen.queryByText('SYSTEM')).not.toBeInTheDocument()
  })

  it('footer renders when provided', () => {
    render(<W><JModal open onClose={vi.fn()} title="X" footer={<button>Confirm</button>}>Body</JModal></W>)
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('no footer div when footer omitted', () => {
    render(<W><JModal open onClose={vi.fn()} title="X">Body</JModal></W>)
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument()
  })

  it('closable=true (default) shows close button', () => {
    render(<W><JModal open onClose={vi.fn()} title="X">Body</JModal></W>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('close button click calls onClose', () => {
    const onClose = vi.fn()
    render(<W><JModal open onClose={onClose} title="X">Body</JModal></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('closable=false hides close button', () => {
    render(<W><JModal open onClose={vi.fn()} title="X" closable={false}>Body</JModal></W>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('backdrop click calls onClose when closeOnBackdrop=true (default)', () => {
    const onClose = vi.fn()
    const { container } = render(<W><JModal open onClose={onClose} title="X">Body</JModal></W>)
    // backdrop is first fixed div rendered into body
    const backdrop = document.body.querySelector('div[style*="position: fixed"][style*="z-index: 1000"]') as HTMLElement
    fireEvent.click(backdrop)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('backdrop click does NOT call onClose when closeOnBackdrop=false', () => {
    const onClose = vi.fn()
    render(<W><JModal open onClose={onClose} title="X" closeOnBackdrop={false}>Body</JModal></W>)
    const backdrop = document.body.querySelector('div[style*="position: fixed"][style*="z-index: 1000"]') as HTMLElement
    fireEvent.click(backdrop)
    expect(onClose).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run tests — confirm RED**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test 2>&1 | Select-String "JModal|Cannot find"
```

Expected: FAIL — `Cannot find module './JModal'`

- [ ] **Step 3: Implement JModal**

Create `packages/jarvis-ui/src/components/ui/JModal.tsx`:

```tsx
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface JModalProps {
  open:             boolean
  onClose:          () => void
  title:            string
  subTitle?:        string
  closable?:        boolean
  closeOnBackdrop?: boolean
  width?:           string
  notchSize?:       string
  children?:        ReactNode
  footer?:          ReactNode
}

function corner(pos: React.CSSProperties): React.CSSProperties {
  return {
    position:   'absolute',
    width:      14,
    height:     14,
    borderColor:'var(--j-accent)',
    borderStyle:'solid',
    borderWidth:0,
    filter:     'drop-shadow(0 0 4px var(--j-accent))',
    animation:  'j-corner-blink 3s ease-in-out infinite',
    ...pos,
  }
}

export function JModal({ open, onClose, title, subTitle, closable = true, closeOnBackdrop = true, width = '480px', notchSize = '18px', children, footer }: JModalProps) {
  if (!open) return null

  const backdropStyle: React.CSSProperties = {
    position:       'fixed',
    inset:          0,
    zIndex:         1000,
    background:     'var(--j-bg-overlay)',
    backdropFilter: 'blur(2px)',
  }

  const dialogStyle: React.CSSProperties = {
    position:   'fixed',
    zIndex:     1001,
    top:        '50%',
    left:       '50%',
    transform:  'translate(-50%, -50%)',
    width,
    maxWidth:   'calc(100vw - 32px)',
    background: 'var(--j-bg-card)',
    overflow:   'hidden',
    clipPath:   `polygon(${notchSize} 0%, 100% 0%, 100% calc(100% - ${notchSize}), calc(100% - ${notchSize}) 100%, 0% 100%, 0% ${notchSize})`,
    border:     '1px solid var(--j-accent)',
    fontFamily: "'Courier New', monospace",
  }

  return createPortal(
    <>
      {/* Backdrop */}
      <div style={backdropStyle} onClick={closeOnBackdrop ? onClose : undefined} />

      {/* Dialog */}
      <div style={dialogStyle}>
        {/* Scan line */}
        <div style={{ position: 'absolute', left: 0, right: 0, height: 1, top: -1, background: 'linear-gradient(90deg, transparent, var(--j-cyan), transparent)', animation: 'j-scan-v 3s ease-in-out infinite', pointerEvents: 'none' }} />

        {/* Corner brackets */}
        <div style={corner({ top: 0,    left:  0, borderTopWidth: 2, borderLeftWidth:  2 })} />
        <div style={corner({ top: 0,    right: 0, borderTopWidth: 2, borderRightWidth: 2 })} />
        <div style={corner({ bottom: 0, left:  0, borderBottomWidth: 2, borderLeftWidth:  2 })} />
        <div style={corner({ bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 })} />

        {/* Triangle accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, border: `${notchSize} solid transparent`, borderTopColor: 'var(--j-accent)', borderLeftColor: 'var(--j-accent)', animation: 'j-pulse var(--j-dur-pulse) ease-in-out infinite', pointerEvents: 'none' }} />

        {/* Header */}
        <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid var(--j-accent-12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {subTitle && (
              <div style={{ fontSize: 8, color: 'var(--j-accent)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 3, opacity: 0.7 }}>
                {subTitle}
              </div>
            )}
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--j-text-primary)', letterSpacing: '0.10em', textTransform: 'uppercase' }}>
              {title}
            </div>
          </div>
          {closable && (
            <button
              type="button"
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--j-text-muted)', fontSize: 16, padding: 0, fontFamily: 'inherit' }}
              onMouseOver={e => { (e.target as HTMLButtonElement).style.color = 'var(--j-accent)' }}
              onMouseOut={e  => { (e.target as HTMLButtonElement).style.color = 'var(--j-text-muted)' }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '16px 18px', color: 'var(--j-text-secondary)', fontSize: 12, lineHeight: 1.6, letterSpacing: '0.04em' }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{ padding: '10px 18px 14px', borderTop: '1px solid var(--j-accent-08)', display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
            {footer}
          </div>
        )}
      </div>
    </>,
    document.body
  )
}
```

- [ ] **Step 4: Run tests — confirm GREEN**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test 2>&1 | Select-String "JModal|Tests|passed|failed"
```

Expected: all JModal tests pass, all prior tests still pass.

- [ ] **Step 5: Commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/components/ui/JModal.tsx packages/jarvis-ui/src/components/ui/JModal.test.tsx
git commit -m "feat: add JModal (portal dialog)"
```

---

## Task 5: JToast + JToastProvider + useToast

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JToastProvider.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JToastProvider.test.tsx`

**Interfaces:**
- Consumes: `JState` from tokens; `JThemeProvider` for tests
- Produces:
  - `JToastProvider(props: JToastProviderProps)` — context provider + fixed overlay
  - `useToast(): { show(state, message, title?, duration?): string, dismiss(id): void }` — context hook
  - `JToastProviderProps = { children: ReactNode }`
  - `JToast` (internal only, not exported)

- [ ] **Step 1: Write failing tests**

Create `packages/jarvis-ui/src/components/ui/JToastProvider.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JToastProvider, useToast } from './JToastProvider'
import type { JState } from '../../theme/JarvisTokens'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

// Helper: auto-fires show() on mount
function AutoShow({ state, message, title, duration }: { state: JState; message: string; title?: string; duration?: number }) {
  const { show } = useToast()
  React.useEffect(() => { show(state, message, title, duration) }, [])
  return null
}

// Helper: button-triggered show + dismiss
function ManualControl() {
  const { show, dismiss } = useToast()
  const idRef = React.useRef('')
  return (
    <>
      <button onClick={() => { idRef.current = show('active', 'Persistent', undefined, 0) }}>Add</button>
      <button onClick={() => dismiss(idRef.current)}>Remove</button>
    </>
  )
}

describe('JToastProvider + useToast', () => {
  it('show() adds toast message to DOM', () => {
    render(
      <W>
        <JToastProvider>
          <AutoShow state="active" message="Hello World" duration={0} />
        </JToastProvider>
      </W>
    )
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('show() with title renders title', () => {
    render(
      <W>
        <JToastProvider>
          <AutoShow state="warning" message="Check disk" title="WARNING" duration={0} />
        </JToastProvider>
      </W>
    )
    expect(screen.getByText('WARNING')).toBeInTheDocument()
    expect(screen.getByText('Check disk')).toBeInTheDocument()
  })

  it('dismiss(id) removes toast from DOM', () => {
    render(
      <W>
        <JToastProvider>
          <ManualControl />
        </JToastProvider>
      </W>
    )
    fireEvent.click(screen.getByText('Add'))
    expect(screen.getByText('Persistent')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Remove'))
    expect(screen.queryByText('Persistent')).not.toBeInTheDocument()
  })

  it('duration > 0 auto-dismisses after timeout', async () => {
    vi.useFakeTimers()
    render(
      <W>
        <JToastProvider>
          <AutoShow state="active" message="Timed Out" duration={3000} />
        </JToastProvider>
      </W>
    )
    expect(screen.getByText('Timed Out')).toBeInTheDocument()
    await act(async () => { vi.advanceTimersByTime(3100) })
    expect(screen.queryByText('Timed Out')).not.toBeInTheDocument()
    vi.useRealTimers()
  })

  it('duration=0 does NOT auto-dismiss', async () => {
    vi.useFakeTimers()
    render(
      <W>
        <JToastProvider>
          <AutoShow state="active" message="Stays" duration={0} />
        </JToastProvider>
      </W>
    )
    await act(async () => { vi.advanceTimersByTime(10000) })
    expect(screen.getByText('Stays')).toBeInTheDocument()
    vi.useRealTimers()
  })

  it('useToast() outside JToastProvider throws', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    function Bad() { useToast(); return null }
    expect(() => render(<Bad />)).toThrow('useToast must be used within JToastProvider')
    spy.mockRestore()
  })

  it('multiple toasts stack in DOM', () => {
    function MultiShow() {
      const { show } = useToast()
      React.useEffect(() => {
        show('active',  'First',  undefined, 0)
        show('warning', 'Second', undefined, 0)
        show('error',   'Third',  undefined, 0)
      }, [])
      return null
    }
    render(
      <W>
        <JToastProvider>
          <MultiShow />
        </JToastProvider>
      </W>
    )
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getByText('Third')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests — confirm RED**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test 2>&1 | Select-String "JToast|Cannot find"
```

Expected: FAIL — `Cannot find module './JToastProvider'`

- [ ] **Step 3: Implement JToastProvider.tsx**

Create `packages/jarvis-ui/src/components/ui/JToastProvider.tsx`:

```tsx
import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { JState } from '../../theme/JarvisTokens'

// ── Internal types ──────────────────────────────────────────────
interface ToastItem {
  id:       string
  state:    JState
  message:  string
  title?:   string
  duration: number
}

interface ToastCtxValue {
  show:    (state: JState, message: string, title?: string, duration?: number) => string
  dismiss: (id: string) => void
}

// ── Context ─────────────────────────────────────────────────────
const JToastContext = createContext<ToastCtxValue | null>(null)

export function useToast(): ToastCtxValue {
  const ctx = useContext(JToastContext)
  if (!ctx) throw new Error('useToast must be used within JToastProvider')
  return ctx
}

// ── Individual toast (internal) ──────────────────────────────────
interface ToastProps extends ToastItem { onDismiss: () => void }

const STATE_COLOR: Record<string, string> = {
  active:     'var(--j-accent)',
  processing: 'var(--j-accent)',
  warning:    'var(--j-warn)',
  error:      'var(--j-err)',
  success:    'var(--j-ok)',
  idle:       'var(--j-accent)',
}

const ICON: Record<string, string> = {
  warning: '⚠',
  error:   '✕',
  success: '✓',
}

const RAIL_ANIM: Partial<Record<string, string>> = {
  error:   'j-pulse 0.7s ease-in-out infinite',
  warning: 'j-pulse 1.3s ease-in-out infinite',
}

function JToast({ id: _id, state, message, title, duration, onDismiss }: ToastProps) {
  const color = STATE_COLOR[state] ?? STATE_COLOR.active
  const icon  = ICON[state] ?? 'ℹ'
  const anim  = RAIL_ANIM[state]

  useEffect(() => {
    if (duration <= 0) return
    const t = setTimeout(onDismiss, duration)
    return () => clearTimeout(t)
  }, [duration, onDismiss])

  return (
    <div
      onClick={onDismiss}
      style={{
        position:   'relative',
        overflow:   'hidden',
        cursor:     'pointer',
        background: 'var(--j-bg-card)',
        border:     `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
        clipPath:   'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)',
        boxShadow:  `0 0 16px color-mix(in srgb, ${color} 18%, transparent)`,
        fontFamily: "'Courier New', monospace",
        animation:  'j-slide-in 0.3s ease-out both',
        pointerEvents: 'all',
      }}
    >
      {/* Left rail */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 2, background: color, boxShadow: `0 0 8px ${color}`, ...(anim ? { animation: anim } : {}) }} />

      {/* Scan line */}
      <div style={{ position: 'absolute', left: 0, right: 0, height: 1, top: -1, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, animation: 'j-scan-v 2.5s ease-in-out infinite', pointerEvents: 'none' }} />

      {/* Corner accent */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 0, height: 0, border: '8px solid transparent', borderTopColor: color, borderRightColor: color, opacity: 0.5 }} />

      {/* Content */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 14px 10px 16px' }}>
        <span style={{ fontStyle: 'normal', fontSize: 13, color, flexShrink: 0, filter: `drop-shadow(0 0 4px ${color})` }}>{icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <div style={{ fontSize: 9, color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2, fontWeight: 600 }}>{title}</div>
          )}
          <div style={{ fontSize: 11, color: 'var(--j-text-secondary)', letterSpacing: '0.04em', lineHeight: 1.4 }}>{message}</div>
        </div>
      </div>

      {/* Progress bar */}
      {duration > 0 && (
        <div style={{ height: 2, background: `color-mix(in srgb, ${color} 8%, transparent)`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: `linear-gradient(90deg, color-mix(in srgb, ${color} 80%, transparent), ${color})`, animation: `j-bar-grow ${duration}ms linear forwards`, ['--j-w' as string]: '100%' }} />
        </div>
      )}
    </div>
  )
}

// ── Provider ─────────────────────────────────────────────────────
export interface JToastProviderProps { children: ReactNode }

export function JToastProvider({ children }: JToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  function show(state: JState, message: string, title?: string, duration = 4000): string {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    setToasts(prev => [...prev, { id, state, message, title, duration }])
    return id
  }

  function dismiss(id: string) {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <JToastContext.Provider value={{ show, dismiss }}>
      {children}
      {/* Fixed overlay */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 2000, display: 'flex', flexDirection: 'column-reverse', gap: 8, pointerEvents: 'none', width: 320 }}>
        {toasts.map(t => (
          <JToast key={t.id} {...t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </JToastContext.Provider>
  )
}
```

- [ ] **Step 4: Run tests — confirm GREEN**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test 2>&1 | Select-String "JToast|Tests|passed|failed"
```

Expected: all JToastProvider tests pass, all prior tests still pass.

- [ ] **Step 5: Commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/components/ui/JToastProvider.tsx packages/jarvis-ui/src/components/ui/JToastProvider.test.tsx
git commit -m "feat: add JToast + JToastProvider + useToast"
```

---

## Task 6: JStatCard

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JStatCard.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JStatCard.test.tsx`

**Interfaces:**
- Consumes:
  - `JCard` from `./JCard` — props: `cardStyle?`, `color?`, `header?`, `footer?`, `padding?`, `children?`
  - `JCardStyle` from `../../theme/JarvisTokens` — values: `'CornerBracket' | 'Notched' | 'SideRail' | 'GlowBorder' | 'PartialBorder' | 'DangerPulse' | 'Hexagonal' | 'Radar' | 'DoubleFrame'`
  - `JBadge` from `./JBadge` — renders badge top-right when `badge` prop set
  - `JProgress` from `./JProgress` — renders bar below value when `barValue` set
  - `JDataRow` from `./JDataRow` — renders key/value rows when `dataRows` set
- Produces:
  - `JStatCard(props: JStatCardProps)` — composite metric card
  - `JStatCardDataRow = { label: string; value: string; barPercent?: number }`

- [ ] **Step 1: Write failing tests**

Create `packages/jarvis-ui/src/components/ui/JStatCard.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JStatCard } from './JStatCard'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JStatCard', () => {
  it('renders title', () => {
    render(<W><JStatCard title="CPU" value="74%" /></W>)
    expect(screen.getByText('CPU')).toBeInTheDocument()
  })

  it('renders value', () => {
    render(<W><JStatCard title="CPU" value="74%" /></W>)
    expect(screen.getByText('74%')).toBeInTheDocument()
  })

  it('renders sub when provided', () => {
    render(<W><JStatCard title="CPU" value="74%" sub="8 cores" /></W>)
    expect(screen.getByText('8 cores')).toBeInTheDocument()
  })

  it('no sub element when sub omitted', () => {
    render(<W><JStatCard title="CPU" value="74%" /></W>)
    expect(screen.queryByText('8 cores')).not.toBeInTheDocument()
  })

  it('badge prop renders badge text', () => {
    render(<W><JStatCard title="CPU" value="74%" badge="ONLINE" /></W>)
    expect(screen.getByText('ONLINE')).toBeInTheDocument()
  })

  it('no badge when badge prop omitted', () => {
    render(<W><JStatCard title="CPU" value="74%" /></W>)
    expect(screen.queryByText('ONLINE')).not.toBeInTheDocument()
  })

  it('barValue prop renders a progress track div', () => {
    const { container } = render(<W><JStatCard title="CPU" value="74%" barValue={74} /></W>)
    // JProgress renders a track div with j-accent-08 background
    const tracks = Array.from(container.querySelectorAll('div')).filter(d =>
      d.style.background?.includes('j-accent-08')
    )
    expect(tracks.length).toBeGreaterThanOrEqual(1)
  })

  it('no progress track when barValue omitted', () => {
    const { container } = render(<W><JStatCard title="CPU" value="74%" /></W>)
    const tracks = Array.from(container.querySelectorAll('div')).filter(d =>
      d.style.background?.includes('j-accent-08')
    )
    expect(tracks.length).toBe(0)
  })

  it('dataRows renders j-data-row elements', () => {
    render(
      <W>
        <JStatCard
          title="CPU"
          value="74%"
          dataRows={[
            { label: 'Core 1', value: '80%', barPercent: 80 },
            { label: 'Core 2', value: '60%' },
          ]}
        />
      </W>
    )
    expect(screen.getByText('Core 1')).toBeInTheDocument()
    expect(screen.getByText('Core 2')).toBeInTheDocument()
  })

  it('no data rows when dataRows omitted', () => {
    render(<W><JStatCard title="CPU" value="74%" /></W>)
    expect(screen.queryAllByText('Core 1').length).toBe(0)
  })

  it('children slot renders', () => {
    render(<W><JStatCard title="CPU" value="74%"><span>Custom</span></JStatCard></W>)
    expect(screen.getByText('Custom')).toBeInTheDocument()
  })

  it('warning state colors value div', () => {
    const { container } = render(<W><JStatCard title="CPU" value="HIGH" state="warning" /></W>)
    const val = container.querySelector('.j-text-warn')
    expect(val).toBeInTheDocument()
  })

  it('error state colors value div', () => {
    const { container } = render(<W><JStatCard title="CPU" value="FAIL" state="error" /></W>)
    expect(container.querySelector('.j-text-err')).toBeInTheDocument()
  })

  it('showStatusDot=true renders j-status-dot in sub row', () => {
    const { container } = render(<W><JStatCard title="CPU" value="74%" sub="nominal" showStatusDot /></W>)
    expect(container.querySelector('.j-status-dot')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests — confirm RED**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test 2>&1 | Select-String "JStatCard|Cannot find"
```

Expected: FAIL — `Cannot find module './JStatCard'`

- [ ] **Step 3: Implement JStatCard**

Create `packages/jarvis-ui/src/components/ui/JStatCard.tsx`:

```tsx
import type { ReactNode } from 'react'
import type { JCardStyle, JColor, JState } from '../../theme/JarvisTokens'
import { JarvisTokens } from '../../theme/JarvisTokens'
import { JCard } from './JCard'
import { JBadge } from './JBadge'
import { JProgress } from './JProgress'
import { JDataRow } from './JDataRow'

export interface JStatCardDataRow {
  label:       string
  value:       string
  barPercent?: number
}

export interface JStatCardProps {
  // Card frame
  cardStyle?: JCardStyle
  color?:     JColor
  padding?:   string

  // Content
  title:          string
  value:          string
  sub?:           string
  state?:         JState
  badge?:         string
  badgeColor?:    JColor
  showStatusDot?: boolean
  barValue?:      number
  dataRows?:      JStatCardDataRow[]
  children?:      ReactNode
}

const STATE_VAL_CLS: Partial<Record<string, string>> = {
  warning: 'j-text-warn',
  error:   'j-text-err',
  success: 'j-text-ok',
}

const DOT_COLOR: Partial<Record<string, React.CSSProperties>> = {
  warning: { background: 'var(--j-amber)' },
  error:   { background: 'var(--j-red)'   },
  success: { background: 'var(--j-green)' },
}

export function JStatCard({
  cardStyle    = 'CornerBracket',
  color        = 'cyan',
  padding      = '14px 16px',
  title,
  value,
  sub,
  state        = 'active',
  badge,
  badgeColor   = 'cyan',
  showStatusDot = false,
  barValue,
  dataRows,
  children,
}: JStatCardProps) {
  const valCls = JarvisTokens.cls('j-text-val', STATE_VAL_CLS[state] ?? null)
  const dotStyle = DOT_COLOR[state]

  return (
    <JCard cardStyle={cardStyle} color={color} padding={padding}>
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div className="j-text-xs">{title}</div>
        {badge && <JBadge color={badgeColor} size="xs">{badge}</JBadge>}
      </div>

      {/* Value */}
      <div className={valCls}>{value}</div>

      {/* Sub */}
      {sub && (
        <div className="j-text-sub" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {showStatusDot && <span className="j-status-dot" style={dotStyle} />}
          {sub}
        </div>
      )}

      {/* Progress bar */}
      {barValue !== undefined && (
        <div style={{ marginTop: 8 }}>
          <JProgress value={barValue} variant="bar" showPercent={false} />
        </div>
      )}

      {/* Data rows */}
      {dataRows && dataRows.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {dataRows.map(r => (
            <JDataRow key={r.label} label={r.label} value={r.value} barPercent={r.barPercent} />
          ))}
        </div>
      )}

      {/* Children slot */}
      {children}
    </JCard>
  )
}
```

- [ ] **Step 4: Run tests — confirm GREEN**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test 2>&1 | Select-String "JStatCard|Tests|passed|failed"
```

Expected: all JStatCard tests pass, all prior tests still pass.

- [ ] **Step 5: Commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/components/ui/JStatCard.tsx packages/jarvis-ui/src/components/ui/JStatCard.test.tsx
git commit -m "feat: add JStatCard (composite)"
```

---

## Task 7: index.ts exports + final verification

**Files:**
- Modify: `packages/jarvis-ui/src/index.ts`

**Interfaces:**
- Consumes: all 11 component files from Tasks 1–6
- Produces: public API exports for the entire library

- [ ] **Step 1: Add exports to index.ts**

Open `packages/jarvis-ui/src/index.ts` and append the following block after the last `// Components — ui` export line (after the `export { JTimePicker }` line):

```ts
// Components — display atoms
export type { JBadgeShape, JBadgeProps } from './components/ui/JBadge'
export { JBadge } from './components/ui/JBadge'
export type { JStatusPillProps } from './components/ui/JStatusPill'
export { JStatusPill } from './components/ui/JStatusPill'
export type { JProgressVariant, JProgressProps } from './components/ui/JProgress'
export { JProgress } from './components/ui/JProgress'
export type { JDividerOrientation, JDividerProps } from './components/ui/JDivider'
export { JDivider } from './components/ui/JDivider'
export type { JHudLabelVariant, JHudLabelProps } from './components/ui/JHudLabel'
export { JHudLabel } from './components/ui/JHudLabel'

// Components — feedback
export type { JAlertProps } from './components/ui/JAlert'
export { JAlert } from './components/ui/JAlert'
export type { JDataRowProps } from './components/ui/JDataRow'
export { JDataRow } from './components/ui/JDataRow'

// Components — modal
export type { JModalProps } from './components/ui/JModal'
export { JModal } from './components/ui/JModal'

// Components — toast
export type { JToastProviderProps } from './components/ui/JToastProvider'
export { JToastProvider, useToast } from './components/ui/JToastProvider'

// Components — composite
export type { JStatCardDataRow, JStatCardProps } from './components/ui/JStatCard'
export { JStatCard } from './components/ui/JStatCard'
```

- [ ] **Step 2: Run full test suite**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test 2>&1 | Select-String "Tests|passed|failed|Error"
```

Expected: all tests pass (target: previous 214 + new Phase 4 tests).

- [ ] **Step 3: Run build to verify no type errors**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui build 2>&1 | Select-String "error|warning|built in"
```

Expected: `✓ built in` with no errors.

- [ ] **Step 4: Update progress ledger**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
$ledger = git rev-parse --git-path sdd
$ledger = $ledger.Trim() + "/progress.md"
$entry = "`n## Phase 4: Display Atoms + Feedback Overlays`nTask 1: JBadge + JStatusPill — complete`nTask 2: JProgress + JDivider + JHudLabel — complete`nTask 3: JAlert + JDataRow — complete`nTask 4: JModal — complete`nTask 5: JToast + JToastProvider + useToast — complete`nTask 6: JStatCard — complete`nTask 7: Exports — complete"
Add-Content -Path $ledger -Value $entry
```

- [ ] **Step 5: Final commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/index.ts
git commit -m "feat: export Phase 4 display atoms + feedback overlay components"
```

---

## Self-Review Checklist

**Spec coverage:**
- JBadge (shape, color, size, blink, showDot) ✓ Task 1
- JStatusPill (state, blink, dot animation) ✓ Task 1
- JProgress (bar + ticks, indeterminate, state tick color) ✓ Task 2
- JDivider (horizontal/vertical, label, dot) ✓ Task 2
- JHudLabel (5 variants, CSS classes) ✓ Task 2
- JAlert (state colors, dismissible, blink, onDismiss) ✓ Task 3
- JDataRow (j-data-* classes, --j-w custom prop, state colors) ✓ Task 3
- JModal (portal, backdrop, notch, corners, scan, header/body/footer, closable/closeOnBackdrop) ✓ Task 4
- JToast (auto-dismiss, state color, rail, scan, progress bar) ✓ Task 5
- JToastProvider (context, show/dismiss, fixed overlay) ✓ Task 5
- useToast (hook, throws outside provider) ✓ Task 5
- JStatCard (wraps JCard, title/value/sub/badge/statusDot/barValue/dataRows/children, state value class) ✓ Task 6
- index.ts exports ✓ Task 7

**No placeholders found.**

**Type consistency:**
- `JState` values match exactly: `'idle' | 'active' | 'processing' | 'warning' | 'error' | 'success'`
- `JCardStyle` values in JStatCard match JarvisTokens exactly
- `JCard` props used in JStatCard: `cardStyle`, `color`, `padding`, `children` — all valid (no `state`/`showScan`)
- `JDataRow.label` (not `key`) used throughout — `key` is reserved in React
- `--j-w` custom property set via `style` cast to `React.CSSProperties` in JDataRow ✓
- `JToastProvider` exports `JToastProviderProps` as declared ✓
