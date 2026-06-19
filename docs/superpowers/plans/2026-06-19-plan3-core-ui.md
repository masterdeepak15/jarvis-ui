# JarvisUI Plan 3 — Core UI Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 13 interactive UI components (JButton, JCard, all form inputs, date/time pickers) in `packages/jarvis-ui/src/components/ui/`.

**Architecture:** Button and Card use existing CSS class-based rendering with shape-specific inner markup. Form inputs (JInput through JFormField) use the JNavItem inline-style pattern — no CSS classes exist for them. Date pickers use react-day-picker; JTimePicker is a custom two-input implementation.

**Tech Stack:** React 18, TypeScript 5, Vitest + React Testing Library, react-day-picker (added in Task 5)

## Global Constraints

- Blazor source root: `D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI\` — read matching `.razor` file before implementing each component
- Repo root: `D:\Claude\HUD Theme\HUDtheme\`
- All colors via `var(--j-*)` CSS variables — zero hardcoded hex in TSX
- No `border-radius` — use `clip-path` polygons
- Font: `'Courier New', monospace` everywhere
- PowerShell PATH required before any pnpm: `$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH`
- Run tests from `packages/jarvis-ui/`: `pnpm test`
- Build from repo root: `pnpm --filter jarvis-ui build`
- All new components exported from `packages/jarvis-ui/src/index.ts`
- Test wrapper: `function W({ children }: { children: React.ReactNode }) { return <JThemeProvider>{children}</JThemeProvider> }`
- **No CSS classes exist** for: JInput, JTextArea, JSelect, JCheckbox, JRadio, JToggle, JSlider, JFormField — use inline styles
- **No CSS exists** for `j-btn-right-notch` / `j-btn-both-notch` — implement with clip-path inline styles
- Progress ledger: `.git/sdd/progress.md` — append one line per completed task

---

## File Map

| File | Action |
|------|--------|
| `packages/jarvis-ui/src/components/ui/JButton.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JButton.test.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JCard.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JCard.test.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JInput.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JInput.test.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JTextArea.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JTextArea.test.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JSelect.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JSelect.test.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JCheckbox.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JCheckbox.test.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JRadio.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JRadio.test.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JToggle.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JToggle.test.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JSlider.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JSlider.test.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JFormField.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JFormField.test.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JDatePicker.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JDatePicker.test.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JDateRangePicker.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JDateRangePicker.test.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JTimePicker.tsx` | Create |
| `packages/jarvis-ui/src/components/ui/JTimePicker.test.tsx` | Create |
| `packages/jarvis-ui/src/index.ts` | Modify (add exports after each task) |

---

## CSS Inner-Markup Reference

**Button shapes and their required child elements** (from jarvis-ui.css lines 703–845):

All shapes need these children inside `<button>`:
- `<div className="j-btn-shine" />` — animated scan shimmer
- `<div className="j-btn-c tl" />` `<div className="j-btn-c tr" />` `<div className="j-btn-c bl" />` `<div className="j-btn-c br" />` — corner ticks

Shape-specific additional children:
- `LeftNotch` — `<div style={{ position:'absolute',inset:0,background:'var(--j-accent-dim)' }} />` (clip-path on button; see implementation)
- `RightNotch` — same background div, different clip-path
- `BothNotch` — same background div, different clip-path
- `Parallelogram` — `<div className="j-btn-bg-fill" />` + `<div className="j-btn-rail" />`
- `GhostSkew` — `<div className="j-btn-bg-fill" />`
- `BracketFrame` — `<div className="j-btn-bg-fill" />` + `<div className="j-btn-top-line" />` + `<div className="j-btn-bot-line" />`
- `Hexagonal` — `<div className="j-btn-bg-fill" />`
- `IconSquare` — `<div className="j-btn-bg-fill" />`
- `ScanFull` — `<div className="j-btn-bg-fill" />`

**Card styles and their required child elements** (from jarvis-ui.css lines 346–669):

- `CornerBracket` (s1) — `<div className="j-c-tl" />` `<div className="j-c-tr" />` `<div className="j-c-bl" />` `<div className="j-c-br" />` `<div className="j-inner-border" />`
- `Notched` (s2) — `<div className="j-notch-border" />` `<div className="j-tri-tl" />` `<div className="j-tri-br" />`
- `SideRail` (s3) — `<div className="j-rail" />` `<div className="j-tab-top" />` `<div className="j-tab-bot" />`
- `GlowBorder` (s4) — `<div className="j-inner-radial" />`
- `PartialBorder` (s5) — `<div className="j-pb-tl" />` `<div className="j-pb-br" />` `<div className="j-pb-roving-dot" />`
- `DangerPulse` (s6) — `<div className="j-tri-tl" />`
- `Hexagonal` (s7) — `<div className="j-hex-ring" />`
- `Radar` (s8) — `<div className="j-radar-sweep" />` `<div className="j-radar-r1" />` `<div className="j-radar-r2" />` `<div className="j-radar-r3" />` `<div className="j-radar-center" />` `<div className="j-radar-ping" />`
- `DoubleFrame` (s9) — outer `<div className="j-df-corner" />` + children inside `<div className="j-inner-frame">`

---

### Task 1: JButton

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JButton.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JButton.test.tsx`
- Modify: `packages/jarvis-ui/src/index.ts` (append exports)

**Interfaces:**
- Consumes: `JarvisTokens`, `JButtonShape`, `JColor`, `JSize`, `JVariant` from `../../theme/JarvisTokens`
- Produces: `JButton`, `JButtonProps` — used directly in docs app and composed in later tasks

- [ ] **Step 1: Write the failing test**

Create `packages/jarvis-ui/src/components/ui/JButton.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JButton } from './JButton'
import type { JButtonProps } from './JButton'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JButton', () => {
  it('renders children', () => {
    render(<W><JButton>Launch</JButton></W>)
    expect(screen.getByText('Launch')).toBeInTheDocument()
  })

  it('applies default shape class j-btn-left-notch', () => {
    const { container } = render(<W><JButton>X</JButton></W>)
    expect(container.querySelector('.j-btn-left-notch')).toBeTruthy()
  })

  it('applies specified shape class j-btn-hex for Hexagonal', () => {
    const { container } = render(<W><JButton shape="Hexagonal">X</JButton></W>)
    expect(container.querySelector('.j-btn-hex')).toBeTruthy()
  })

  it('applies specified shape class j-btn-bracket for BracketFrame', () => {
    const { container } = render(<W><JButton shape="BracketFrame">X</JButton></W>)
    expect(container.querySelector('.j-btn-bracket')).toBeTruthy()
  })

  it('applies color class j-color-red', () => {
    const { container } = render(<W><JButton color="red">X</JButton></W>)
    expect(container.querySelector('.j-color-red')).toBeTruthy()
  })

  it('applies size class j-size-lg', () => {
    const { container } = render(<W><JButton size="lg">X</JButton></W>)
    expect(container.querySelector('.j-size-lg')).toBeTruthy()
  })

  it('calls onClick when clicked', () => {
    const fn = vi.fn()
    render(<W><JButton onClick={fn}>X</JButton></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const fn = vi.fn()
    render(<W><JButton disabled onClick={fn}>X</JButton></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(fn).not.toHaveBeenCalled()
  })

  it('does not call onClick when loading', () => {
    const fn = vi.fn()
    render(<W><JButton loading onClick={fn}>X</JButton></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(fn).not.toHaveBeenCalled()
  })

  it('shows loading indicator and hides children when loading', () => {
    render(<W><JButton loading>Submit</JButton></W>)
    expect(screen.queryByText('Submit')).toBeNull()
    expect(screen.getByText('···')).toBeInTheDocument()
  })

  it('passes type=submit attribute', () => {
    render(<W><JButton type="submit">X</JButton></W>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('renders icon slot', () => {
    render(<W><JButton icon={<span data-testid="icon" />}>X</JButton></W>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders iconRight slot', () => {
    render(<W><JButton iconRight={<span data-testid="ir" />}>X</JButton></W>)
    expect(screen.getByTestId('ir')).toBeInTheDocument()
  })

  it('renders all 9 shapes without throwing', () => {
    const shapes: JButtonProps['shape'][] = [
      'LeftNotch','RightNotch','BothNotch','Parallelogram',
      'GhostSkew','BracketFrame','Hexagonal','IconSquare','ScanFull',
    ]
    for (const shape of shapes) {
      expect(() => render(<W><JButton shape={shape}>X</JButton></W>)).not.toThrow()
    }
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
Set-Location "D:\Claude\HUD Theme\HUDtheme\packages\jarvis-ui"
pnpm test -- --reporter=verbose 2>&1 | Select-String "JButton|Cannot find|FAIL"
```

Expected: `Cannot find module './JButton'`

- [ ] **Step 3: Implement JButton**

Create `packages/jarvis-ui/src/components/ui/JButton.tsx`:

```tsx
import type { ReactNode } from 'react'
import type { JButtonShape, JColor, JSize, JVariant } from '../../theme/JarvisTokens'
import { JarvisTokens } from '../../theme/JarvisTokens'

export interface JButtonProps {
  shape?:     JButtonShape
  color?:     JColor
  size?:      JSize
  variant?:   JVariant
  loading?:   boolean
  disabled?:  boolean
  icon?:      ReactNode
  iconRight?: ReactNode
  type?:      'button' | 'submit' | 'reset'
  onClick?:   () => void
  children?:  ReactNode
}

const NOTCH_SHAPES = new Set<JButtonShape>(['LeftNotch', 'RightNotch', 'BothNotch'])
const FILL_SHAPES  = new Set<JButtonShape>(['Parallelogram','GhostSkew','BracketFrame','Hexagonal','IconSquare','ScanFull'])

const NOTCH_CLIP: Partial<Record<JButtonShape, string>> = {
  LeftNotch:  'polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)',
  RightNotch: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
  BothNotch:  'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
}

export function JButton({
  shape    = 'LeftNotch',
  color    = 'cyan',
  size     = 'md',
  variant  = 'solid',
  loading  = false,
  disabled = false,
  icon,
  iconRight,
  type     = 'button',
  onClick,
  children,
}: JButtonProps) {
  const shapeClass = JarvisTokens.buttonShape(shape)
  const isNotch    = NOTCH_SHAPES.has(shape)
  const isFill     = FILL_SHAPES.has(shape)

  const notchStyle: React.CSSProperties = isNotch ? {
    clipPath: NOTCH_CLIP[shape],
    border:   '1px solid var(--j-accent)',
  } : {}

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={JarvisTokens.cls('j-btn', shapeClass, JarvisTokens.color(color), JarvisTokens.size(size))}
      style={notchStyle}
      aria-busy={loading || undefined}
    >
      {isNotch && (
        <div style={{ position: 'absolute', inset: 0, background: 'var(--j-accent-dim)' }} />
      )}
      {isFill && <div className="j-btn-bg-fill" />}
      {shape === 'Parallelogram' && <div className="j-btn-rail" />}
      {shape === 'BracketFrame'  && <><div className="j-btn-top-line" /><div className="j-btn-bot-line" /></>}

      <div className="j-btn-shine" />
      <div className="j-btn-c tl" /><div className="j-btn-c tr" />
      <div className="j-btn-c bl" /><div className="j-btn-c br" />

      <div className="j-btn-label">
        {!loading && icon     && <span>{icon}</span>}
        {loading ? <span style={{ letterSpacing: '.2em' }}>···</span> : children}
        {!loading && iconRight && <span>{iconRight}</span>}
      </div>
    </button>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```powershell
pnpm test -- --reporter=verbose 2>&1 | Select-String "JButton|pass|fail" | head -20
```

Expected: 13 JButton tests pass, existing tests still pass.

- [ ] **Step 5: Add exports to index.ts**

Append to `packages/jarvis-ui/src/index.ts` after the layout block:

```ts
// Components — ui
export type { JButtonProps } from './components/ui/JButton'
export { JButton } from './components/ui/JButton'
```

- [ ] **Step 6: Commit**

```powershell
git add packages/jarvis-ui/src/components/ui/JButton.tsx packages/jarvis-ui/src/components/ui/JButton.test.tsx packages/jarvis-ui/src/index.ts
git commit -m "feat(ui): add JButton — 9 shapes, loading state, icon slots"
```

- [ ] **Step 7: Update progress ledger**

Append to `.git/sdd/progress.md`:
```
Task 1 (Plan 3): JButton complete (commit above, 13 tests pass)
```

---

### Task 2: JCard

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JCard.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JCard.test.tsx`
- Modify: `packages/jarvis-ui/src/index.ts`

**Interfaces:**
- Consumes: `JarvisTokens`, `JCardStyle`, `JColor` from `../../theme/JarvisTokens`
- Produces: `JCard`, `JCardProps`

- [ ] **Step 1: Write the failing test**

Create `packages/jarvis-ui/src/components/ui/JCard.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JCard } from './JCard'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JCard', () => {
  it('renders children', () => {
    render(<W><JCard>Content</JCard></W>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies default style class j-card-s1', () => {
    const { container } = render(<W><JCard /></W>)
    expect(container.querySelector('.j-card-s1')).toBeTruthy()
  })

  it('applies color class', () => {
    const { container } = render(<W><JCard color="amber" /></W>)
    expect(container.querySelector('.j-color-amber')).toBeTruthy()
  })

  it('renders s1 corner bracket inner elements', () => {
    const { container } = render(<W><JCard cardStyle="CornerBracket" /></W>)
    expect(container.querySelector('.j-c-tl')).toBeTruthy()
    expect(container.querySelector('.j-c-br')).toBeTruthy()
    expect(container.querySelector('.j-inner-border')).toBeTruthy()
  })

  it('renders s2 notched inner elements', () => {
    const { container } = render(<W><JCard cardStyle="Notched" /></W>)
    expect(container.querySelector('.j-notch-border')).toBeTruthy()
    expect(container.querySelector('.j-tri-tl')).toBeTruthy()
  })

  it('renders s3 side rail inner elements', () => {
    const { container } = render(<W><JCard cardStyle="SideRail" /></W>)
    expect(container.querySelector('.j-rail')).toBeTruthy()
    expect(container.querySelector('.j-tab-top')).toBeTruthy()
  })

  it('renders s7 hexagonal ring', () => {
    const { container } = render(<W><JCard cardStyle="Hexagonal" /></W>)
    expect(container.querySelector('.j-hex-ring')).toBeTruthy()
  })

  it('renders s8 radar inner elements', () => {
    const { container } = render(<W><JCard cardStyle="Radar" /></W>)
    expect(container.querySelector('.j-radar-sweep')).toBeTruthy()
    expect(container.querySelector('.j-radar-center')).toBeTruthy()
  })

  it('renders s9 double frame with inner-frame wrapper', () => {
    const { container } = render(<W><JCard cardStyle="DoubleFrame">Hello</JCard></W>)
    expect(container.querySelector('.j-inner-frame')).toBeTruthy()
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders header slot', () => {
    render(<W><JCard header={<span>HDR</span>} /></W>)
    expect(screen.getByText('HDR')).toBeInTheDocument()
  })

  it('renders footer slot', () => {
    render(<W><JCard footer={<span>FTR</span>} /></W>)
    expect(screen.getByText('FTR')).toBeInTheDocument()
  })

  it('renders all 9 card styles without throwing', () => {
    const styles: import('./JCard').JCardProps['cardStyle'][] = [
      'CornerBracket','Notched','SideRail','GlowBorder','PartialBorder',
      'DangerPulse','Hexagonal','Radar','DoubleFrame',
    ]
    for (const cardStyle of styles) {
      expect(() => render(<W><JCard cardStyle={cardStyle} /></W>)).not.toThrow()
    }
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```powershell
pnpm test -- --reporter=verbose 2>&1 | Select-String "JCard|Cannot find"
```

Expected: `Cannot find module './JCard'`

- [ ] **Step 3: Implement JCard**

Create `packages/jarvis-ui/src/components/ui/JCard.tsx`:

```tsx
import type { ReactNode } from 'react'
import type { JCardStyle, JColor } from '../../theme/JarvisTokens'
import { JarvisTokens } from '../../theme/JarvisTokens'

export interface JCardProps {
  cardStyle?: JCardStyle
  color?:     JColor
  header?:    ReactNode
  footer?:    ReactNode
  padding?:   string
  children?:  ReactNode
}

function CardDecor({ cardStyle }: { cardStyle: JCardStyle }) {
  switch (cardStyle) {
    case 'CornerBracket':
      return (
        <>
          <div className="j-c-tl" /><div className="j-c-tr" />
          <div className="j-c-bl" /><div className="j-c-br" />
          <div className="j-inner-border" />
        </>
      )
    case 'Notched':
      return <><div className="j-notch-border" /><div className="j-tri-tl" /><div className="j-tri-br" /></>
    case 'SideRail':
      return <><div className="j-rail" /><div className="j-tab-top" /><div className="j-tab-bot" /></>
    case 'GlowBorder':
      return <div className="j-inner-radial" />
    case 'PartialBorder':
      return <><div className="j-pb-tl" /><div className="j-pb-br" /><div className="j-pb-roving-dot" /></>
    case 'DangerPulse':
      return <div className="j-tri-tl" />
    case 'Hexagonal':
      return <div className="j-hex-ring" />
    case 'Radar':
      return (
        <>
          <div className="j-radar-sweep" />
          <div className="j-radar-r1" /><div className="j-radar-r2" /><div className="j-radar-r3" />
          <div className="j-radar-center" />
          <div className="j-radar-ping" />
        </>
      )
    default:
      return null
  }
}

const HDR: React.CSSProperties = {
  paddingBottom: 10,
  marginBottom:  10,
  borderBottom:  '1px solid var(--j-border-dim)',
  position:      'relative',
  zIndex:        1,
}
const FTR: React.CSSProperties = {
  paddingTop:  10,
  marginTop:   10,
  borderTop:   '1px solid var(--j-border-dim)',
  position:    'relative',
  zIndex:      1,
}

export function JCard({
  cardStyle = 'CornerBracket',
  color     = 'cyan',
  header,
  footer,
  padding   = '14px 16px',
  children,
}: JCardProps) {
  const className = JarvisTokens.cls('j-card', JarvisTokens.cardStyle(cardStyle), JarvisTokens.color(color))

  if (cardStyle === 'DoubleFrame') {
    return (
      <div className={className}>
        <div className="j-df-corner" />
        <div className="j-inner-frame">
          {header && <div style={HDR}>{header}</div>}
          {children}
          {footer && <div style={FTR}>{footer}</div>}
        </div>
      </div>
    )
  }

  return (
    <div className={className} style={{ padding }}>
      <CardDecor cardStyle={cardStyle} />
      {header && <div style={HDR}>{header}</div>}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      {footer && <div style={FTR}>{footer}</div>}
    </div>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```powershell
pnpm test -- --reporter=verbose 2>&1 | Select-String "JCard|pass|fail" | head -20
```

Expected: 12 JCard tests pass.

- [ ] **Step 5: Add exports to index.ts**

Append after JButton exports:

```ts
export type { JCardProps } from './components/ui/JCard'
export { JCard } from './components/ui/JCard'
```

- [ ] **Step 6: Commit**

```powershell
git add packages/jarvis-ui/src/components/ui/JCard.tsx packages/jarvis-ui/src/components/ui/JCard.test.tsx packages/jarvis-ui/src/index.ts
git commit -m "feat(ui): add JCard — 9 styles with correct inner markup"
```

- [ ] **Step 7: Update progress ledger**

Append to `.git/sdd/progress.md`:
```
Task 2 (Plan 3): JCard complete (commit above, 12 tests pass)
```

---

### Task 3: JInput · JTextArea · JSelect

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JInput.tsx` + `.test.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JTextArea.tsx` + `.test.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JSelect.tsx` + `.test.tsx`
- Modify: `packages/jarvis-ui/src/index.ts`

**Interfaces:**
- Consumes: `JColor`, `JSize` from `../../theme/JarvisTokens`; React controlled/uncontrolled patterns
- Produces: `JInput`, `JTextArea`, `JSelect` and their prop interfaces
- **Critical:** No CSS classes exist for any of these. All styling is inline.

**Shared style constants** (define once in each file):

```ts
const SIZE_H:    Record<string, number> = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }
const SIZE_FONT: Record<string, number> = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 }
```

- [ ] **Step 1: Write failing tests for all three**

Create `packages/jarvis-ui/src/components/ui/JInput.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JInput } from './JInput'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JInput', () => {
  it('renders an input element', () => {
    const { container } = render(<W><JInput /></W>)
    expect(container.querySelector('input')).toBeTruthy()
  })

  it('shows placeholder', () => {
    render(<W><JInput placeholder="Enter value" /></W>)
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument()
  })

  it('calls onChange with string value', () => {
    const fn = vi.fn()
    render(<W><JInput value="" onChange={fn} /></W>)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } })
    expect(fn).toHaveBeenCalledWith('hello')
  })

  it('controlled: value prop sets input value', () => {
    render(<W><JInput value="preset" onChange={() => {}} /></W>)
    expect(screen.getByDisplayValue('preset')).toBeInTheDocument()
  })

  it('disabled input cannot be interacted with', () => {
    const { container } = render(<W><JInput disabled /></W>)
    expect((container.querySelector('input') as HTMLInputElement).disabled).toBe(true)
  })

  it('error state applies error border color via inline style', () => {
    const { container } = render(<W><JInput error /></W>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.style.borderColor).toContain('var(--j-err)')
  })

  it('passes type attribute', () => {
    const { container } = render(<W><JInput type="password" /></W>)
    expect((container.querySelector('input') as HTMLInputElement).type).toBe('password')
  })
})
```

Create `packages/jarvis-ui/src/components/ui/JTextArea.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JTextArea } from './JTextArea'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JTextArea', () => {
  it('renders a textarea element', () => {
    const { container } = render(<W><JTextArea /></W>)
    expect(container.querySelector('textarea')).toBeTruthy()
  })

  it('shows placeholder', () => {
    render(<W><JTextArea placeholder="Type here" /></W>)
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
  })

  it('calls onChange with string value', () => {
    const fn = vi.fn()
    render(<W><JTextArea value="" onChange={fn} /></W>)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hi' } })
    expect(fn).toHaveBeenCalledWith('hi')
  })

  it('controlled: value sets textarea content', () => {
    render(<W><JTextArea value="abc" onChange={() => {}} /></W>)
    expect(screen.getByDisplayValue('abc')).toBeInTheDocument()
  })

  it('disabled textarea cannot be interacted with', () => {
    const { container } = render(<W><JTextArea disabled /></W>)
    expect((container.querySelector('textarea') as HTMLTextAreaElement).disabled).toBe(true)
  })

  it('applies rows attribute', () => {
    const { container } = render(<W><JTextArea rows={8} /></W>)
    expect((container.querySelector('textarea') as HTMLTextAreaElement).rows).toBe(8)
  })

  it('error state applies error border color', () => {
    const { container } = render(<W><JTextArea error /></W>)
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    expect(ta.style.borderColor).toContain('var(--j-err)')
  })
})
```

Create `packages/jarvis-ui/src/components/ui/JSelect.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JSelect } from './JSelect'

const OPTIONS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma', disabled: true },
]

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JSelect', () => {
  it('renders a select element', () => {
    const { container } = render(<W><JSelect options={OPTIONS} /></W>)
    expect(container.querySelector('select')).toBeTruthy()
  })

  it('renders all options', () => {
    render(<W><JSelect options={OPTIONS} /></W>)
    expect(screen.getByRole('option', { name: 'Alpha' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Beta'  })).toBeInTheDocument()
  })

  it('calls onChange with string value', () => {
    const fn = vi.fn()
    render(<W><JSelect options={OPTIONS} value="a" onChange={fn} /></W>)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'b' } })
    expect(fn).toHaveBeenCalledWith('b')
  })

  it('controlled: value prop selects the matching option', () => {
    render(<W><JSelect options={OPTIONS} value="b" onChange={() => {}} /></W>)
    expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('b')
  })

  it('disabled prevents interaction', () => {
    const { container } = render(<W><JSelect options={OPTIONS} disabled /></W>)
    expect((container.querySelector('select') as HTMLSelectElement).disabled).toBe(true)
  })

  it('shows placeholder as first disabled option', () => {
    render(<W><JSelect options={OPTIONS} placeholder="Pick one" /></W>)
    expect(screen.getByRole('option', { name: 'Pick one' })).toBeInTheDocument()
  })

  it('error state applies error border color', () => {
    const { container } = render(<W><JSelect options={OPTIONS} error /></W>)
    const sel = container.querySelector('select') as HTMLSelectElement
    expect(sel.style.borderColor).toContain('var(--j-err)')
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```powershell
pnpm test -- --reporter=verbose 2>&1 | Select-String "JInput|JTextArea|JSelect|Cannot find"
```

Expected: three "Cannot find module" errors.

- [ ] **Step 3: Implement JInput**

Create `packages/jarvis-ui/src/components/ui/JInput.tsx`:

```tsx
import type { JColor, JSize } from '../../theme/JarvisTokens'

export interface JInputProps {
  type?:         'text' | 'email' | 'password' | 'number' | 'search'
  value?:        string
  defaultValue?: string
  onChange?:     (value: string) => void
  placeholder?:  string
  disabled?:     boolean
  readOnly?:     boolean
  error?:        boolean
  color?:        JColor
  size?:         JSize
}

const SIZE_H:    Record<string, number> = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }
const SIZE_FONT: Record<string, number> = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 }

export function JInput({
  type         = 'text',
  value,
  defaultValue,
  onChange,
  placeholder  = '',
  disabled     = false,
  readOnly     = false,
  error        = false,
  size         = 'md',
}: JInputProps) {
  const style: React.CSSProperties = {
    height:        SIZE_H[size] ?? 38,
    width:         '100%',
    boxSizing:     'border-box',
    background:    'var(--j-bg-panel)',
    border:        `1px solid ${error ? 'var(--j-err)' : 'var(--j-border)'}`,
    borderColor:   error ? 'var(--j-err)' : 'var(--j-border)',
    color:         error ? 'var(--j-err)' : 'var(--j-accent)',
    fontFamily:    "'Courier New', monospace",
    fontSize:      SIZE_FONT[size] ?? 12,
    letterSpacing: '.08em',
    padding:       '0 12px',
    outline:       'none',
    clipPath:      'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
    opacity:       disabled ? 0.4 : 1,
    cursor:        disabled ? 'not-allowed' : 'text',
    boxShadow:     error ? '0 0 8px var(--j-err-25)' : 'none',
  }

  const controlled = value !== undefined
    ? { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value) }
    : { defaultValue }

  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      style={style}
      {...controlled}
    />
  )
}
```

- [ ] **Step 4: Implement JTextArea**

Create `packages/jarvis-ui/src/components/ui/JTextArea.tsx`:

```tsx
import type { JColor, JSize } from '../../theme/JarvisTokens'

export interface JTextAreaProps {
  value?:        string
  defaultValue?: string
  onChange?:     (value: string) => void
  placeholder?:  string
  disabled?:     boolean
  readOnly?:     boolean
  error?:        boolean
  rows?:         number
  resize?:       'none' | 'vertical' | 'both'
  color?:        JColor
  size?:         JSize
}

const SIZE_FONT: Record<string, number> = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 }

export function JTextArea({
  value,
  defaultValue,
  onChange,
  placeholder  = '',
  disabled     = false,
  readOnly     = false,
  error        = false,
  rows         = 4,
  resize       = 'none',
  size         = 'md',
}: JTextAreaProps) {
  const style: React.CSSProperties = {
    width:         '100%',
    boxSizing:     'border-box',
    background:    'var(--j-bg-panel)',
    border:        `1px solid ${error ? 'var(--j-err)' : 'var(--j-border)'}`,
    borderColor:   error ? 'var(--j-err)' : 'var(--j-border)',
    color:         error ? 'var(--j-err)' : 'var(--j-accent)',
    fontFamily:    "'Courier New', monospace",
    fontSize:      SIZE_FONT[size] ?? 12,
    letterSpacing: '.08em',
    padding:       '10px 12px',
    outline:       'none',
    clipPath:      'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
    opacity:       disabled ? 0.4 : 1,
    cursor:        disabled ? 'not-allowed' : 'text',
    resize,
    boxShadow:     error ? '0 0 8px var(--j-err-25)' : 'none',
  }

  const controlled = value !== undefined
    ? { value, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange?.(e.target.value) }
    : { defaultValue }

  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      style={style}
      {...controlled}
    />
  )
}
```

- [ ] **Step 5: Implement JSelect**

Create `packages/jarvis-ui/src/components/ui/JSelect.tsx`:

```tsx
import type { JColor, JSize } from '../../theme/JarvisTokens'

export interface JSelectOption {
  value:     string
  label:     string
  disabled?: boolean
}

export interface JSelectProps {
  options:       JSelectOption[]
  value?:        string
  defaultValue?: string
  onChange?:     (value: string) => void
  placeholder?:  string
  disabled?:     boolean
  error?:        boolean
  color?:        JColor
  size?:         JSize
}

const SIZE_H:    Record<string, number> = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }
const SIZE_FONT: Record<string, number> = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 }

export function JSelect({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  error    = false,
  size     = 'md',
}: JSelectProps) {
  const style: React.CSSProperties = {
    height:        SIZE_H[size] ?? 38,
    width:         '100%',
    boxSizing:     'border-box',
    background:    'var(--j-bg-panel)',
    border:        `1px solid ${error ? 'var(--j-err)' : 'var(--j-border)'}`,
    borderColor:   error ? 'var(--j-err)' : 'var(--j-border)',
    color:         error ? 'var(--j-err)' : 'var(--j-accent)',
    fontFamily:    "'Courier New', monospace",
    fontSize:      SIZE_FONT[size] ?? 12,
    letterSpacing: '.08em',
    padding:       '0 12px',
    outline:       'none',
    clipPath:      'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
    opacity:       disabled ? 0.4 : 1,
    cursor:        disabled ? 'not-allowed' : 'pointer',
    boxShadow:     error ? '0 0 8px var(--j-err-25)' : 'none',
  }

  const controlled = value !== undefined
    ? { value, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value) }
    : { defaultValue }

  return (
    <select disabled={disabled} style={style} {...controlled}>
      {placeholder && <option value="" disabled hidden>{placeholder}</option>}
      {options.map(o => (
        <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
      ))}
    </select>
  )
}
```

- [ ] **Step 6: Run all tests — verify they pass**

```powershell
pnpm test -- --reporter=verbose 2>&1 | Select-String "JInput|JTextArea|JSelect|pass|fail" | head -30
```

Expected: 7 JInput + 7 JTextArea + 7 JSelect tests pass.

- [ ] **Step 7: Add exports to index.ts**

Append:

```ts
export type { JInputProps } from './components/ui/JInput'
export { JInput } from './components/ui/JInput'
export type { JTextAreaProps } from './components/ui/JTextArea'
export { JTextArea } from './components/ui/JTextArea'
export type { JSelectOption, JSelectProps } from './components/ui/JSelect'
export { JSelect } from './components/ui/JSelect'
```

- [ ] **Step 8: Commit**

```powershell
git add packages/jarvis-ui/src/components/ui/JInput.tsx packages/jarvis-ui/src/components/ui/JInput.test.tsx packages/jarvis-ui/src/components/ui/JTextArea.tsx packages/jarvis-ui/src/components/ui/JTextArea.test.tsx packages/jarvis-ui/src/components/ui/JSelect.tsx packages/jarvis-ui/src/components/ui/JSelect.test.tsx packages/jarvis-ui/src/index.ts
git commit -m "feat(ui): add JInput, JTextArea, JSelect — inline-styled, controlled/uncontrolled"
```

- [ ] **Step 9: Update progress ledger**

```
Task 3 (Plan 3): JInput + JTextArea + JSelect complete (commit above, 21 tests pass)
```

---

### Task 4: JCheckbox · JRadio · JToggle · JSlider

**Files:**
- Create: all 4 component files + 4 test files
- Modify: `packages/jarvis-ui/src/index.ts`

**Interfaces:**
- Consumes: `useState` from React; `JColor` from tokens
- Produces: `JCheckbox`, `JRadio`, `JToggle`, `JSlider` and their prop interfaces
- **Note:** All styling inline. Controlled = prop; uncontrolled = internal `useState`.

- [ ] **Step 1: Write failing tests**

Create `packages/jarvis-ui/src/components/ui/JCheckbox.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JCheckbox } from './JCheckbox'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JCheckbox', () => {
  it('renders a checkbox input', () => {
    const { container } = render(<W><JCheckbox /></W>)
    expect(container.querySelector('input[type="checkbox"]')).toBeTruthy()
  })

  it('shows label text', () => {
    render(<W><JCheckbox label="Accept terms" /></W>)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('calls onChange with true when checked', () => {
    const fn = vi.fn()
    render(<W><JCheckbox onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(fn).toHaveBeenCalledWith(true)
  })

  it('calls onChange with false when unchecked', () => {
    const fn = vi.fn()
    render(<W><JCheckbox defaultChecked onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(fn).toHaveBeenCalledWith(false)
  })

  it('controlled: checked prop controls state', () => {
    render(<W><JCheckbox checked onChange={() => {}} /></W>)
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(true)
  })

  it('disabled prevents onChange', () => {
    const fn = vi.fn()
    render(<W><JCheckbox disabled onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(fn).not.toHaveBeenCalled()
  })
})
```

Create `packages/jarvis-ui/src/components/ui/JRadio.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JRadio } from './JRadio'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JRadio', () => {
  it('renders a radio input', () => {
    const { container } = render(<W><JRadio value="opt1" /></W>)
    expect(container.querySelector('input[type="radio"]')).toBeTruthy()
  })

  it('shows label text', () => {
    render(<W><JRadio value="opt1" label="Option A" /></W>)
    expect(screen.getByText('Option A')).toBeInTheDocument()
  })

  it('calls onChange with the value string when clicked', () => {
    const fn = vi.fn()
    render(<W><JRadio value="opt1" onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('radio'))
    expect(fn).toHaveBeenCalledWith('opt1')
  })

  it('controlled: checked prop reflects state', () => {
    render(<W><JRadio value="opt1" checked onChange={() => {}} /></W>)
    expect((screen.getByRole('radio') as HTMLInputElement).checked).toBe(true)
  })

  it('disabled prevents onChange', () => {
    const fn = vi.fn()
    render(<W><JRadio value="opt1" disabled onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('radio'))
    expect(fn).not.toHaveBeenCalled()
  })

  it('passes name attribute', () => {
    const { container } = render(<W><JRadio value="opt1" name="group1" /></W>)
    expect((container.querySelector('input') as HTMLInputElement).name).toBe('group1')
  })
})
```

Create `packages/jarvis-ui/src/components/ui/JToggle.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JToggle } from './JToggle'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JToggle', () => {
  it('renders a checkbox input with role switch', () => {
    const { container } = render(<W><JToggle /></W>)
    expect(container.querySelector('input[type="checkbox"]')).toBeTruthy()
  })

  it('shows label text', () => {
    render(<W><JToggle label="Enable feature" /></W>)
    expect(screen.getByText('Enable feature')).toBeInTheDocument()
  })

  it('calls onChange with true when turned on', () => {
    const fn = vi.fn()
    render(<W><JToggle onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(fn).toHaveBeenCalledWith(true)
  })

  it('calls onChange with false when turned off', () => {
    const fn = vi.fn()
    render(<W><JToggle defaultChecked onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(fn).toHaveBeenCalledWith(false)
  })

  it('controlled: checked prop controls state', () => {
    render(<W><JToggle checked onChange={() => {}} /></W>)
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(true)
  })

  it('disabled prevents onChange', () => {
    const fn = vi.fn()
    render(<W><JToggle disabled onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(fn).not.toHaveBeenCalled()
  })
})
```

Create `packages/jarvis-ui/src/components/ui/JSlider.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JSlider } from './JSlider'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JSlider', () => {
  it('renders a range input', () => {
    const { container } = render(<W><JSlider /></W>)
    expect(container.querySelector('input[type="range"]')).toBeTruthy()
  })

  it('shows current value label by default', () => {
    render(<W><JSlider value={42} onChange={() => {}} /></W>)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('hides value label when showValue=false', () => {
    render(<W><JSlider value={42} onChange={() => {}} showValue={false} /></W>)
    expect(screen.queryByText('42')).toBeNull()
  })

  it('calls onChange with numeric value', () => {
    const fn = vi.fn()
    render(<W><JSlider value={50} onChange={fn} /></W>)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '75' } })
    expect(fn).toHaveBeenCalledWith(75)
  })

  it('respects min and max props', () => {
    const { container } = render(<W><JSlider min={10} max={50} /></W>)
    const input = container.querySelector('input[type="range"]') as HTMLInputElement
    expect(input.min).toBe('10')
    expect(input.max).toBe('50')
  })

  it('disabled prevents interaction', () => {
    const { container } = render(<W><JSlider disabled /></W>)
    expect((container.querySelector('input[type="range"]') as HTMLInputElement).disabled).toBe(true)
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```powershell
pnpm test -- --reporter=verbose 2>&1 | Select-String "JCheckbox|JRadio|JToggle|JSlider|Cannot find"
```

Expected: four "Cannot find module" errors.

- [ ] **Step 3: Implement JCheckbox**

Create `packages/jarvis-ui/src/components/ui/JCheckbox.tsx`:

```tsx
import { useState } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

export interface JCheckboxProps {
  checked?:        boolean
  defaultChecked?: boolean
  onChange?:       (checked: boolean) => void
  label?:          string
  disabled?:       boolean
  color?:          JColor
}

export function JCheckbox({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
}: JCheckboxProps) {
  const [internal, setInternal] = useState(defaultChecked)
  const isChecked = checked !== undefined ? checked : internal

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (checked === undefined) setInternal(e.target.checked)
    onChange?.(e.target.checked)
  }

  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      cursor:  disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      fontFamily: "'Courier New', monospace", fontSize: 11,
      color: 'var(--j-text-primary)',
      userSelect: 'none',
    }}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <div style={{
        width: 14, height: 14, flexShrink: 0,
        background:  isChecked ? 'var(--j-accent)' : 'transparent',
        border:      `1px solid ${isChecked ? 'var(--j-accent)' : 'var(--j-border)'}`,
        clipPath:    'polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%)',
        display:     'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow:   isChecked ? '0 0 6px var(--j-accent-25)' : 'none',
        transition:  'all .15s ease',
      }}>
        {isChecked && (
          <div style={{
            width: 6, height: 6,
            background: 'var(--j-bg)',
            clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)',
          }} />
        )}
      </div>
      {label && <span>{label}</span>}
    </label>
  )
}
```

- [ ] **Step 4: Implement JRadio**

Create `packages/jarvis-ui/src/components/ui/JRadio.tsx`:

```tsx
import type { JColor } from '../../theme/JarvisTokens'

export interface JRadioProps {
  checked?:  boolean
  onChange?: (value: string) => void
  label?:    string
  value:     string
  name?:     string
  disabled?: boolean
  color?:    JColor
}

export function JRadio({ checked, onChange, label, value, name, disabled = false }: JRadioProps) {
  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      cursor:  disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      fontFamily: "'Courier New', monospace", fontSize: 11,
      color: 'var(--j-text-primary)',
      userSelect: 'none',
    }}>
      <input
        type="radio"
        checked={checked}
        value={value}
        name={name}
        disabled={disabled}
        onChange={() => onChange?.(value)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <div style={{
        width: 14, height: 14, flexShrink: 0,
        border:   `1px solid ${checked ? 'var(--j-accent)' : 'var(--j-border)'}`,
        clipPath: 'polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)',
        display:  'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .15s ease',
      }}>
        {checked && (
          <div style={{
            width: 6, height: 6,
            background: 'var(--j-accent)',
            clipPath:   'polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)',
            boxShadow:  '0 0 4px var(--j-accent)',
          }} />
        )}
      </div>
      {label && <span>{label}</span>}
    </label>
  )
}
```

- [ ] **Step 5: Implement JToggle**

Create `packages/jarvis-ui/src/components/ui/JToggle.tsx`:

```tsx
import { useState } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

export interface JToggleProps {
  checked?:        boolean
  defaultChecked?: boolean
  onChange?:       (checked: boolean) => void
  label?:          string
  disabled?:       boolean
  color?:          JColor
}

export function JToggle({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
}: JToggleProps) {
  const [internal, setInternal] = useState(defaultChecked)
  const isOn = checked !== undefined ? checked : internal

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (checked === undefined) setInternal(e.target.checked)
    onChange?.(e.target.checked)
  }

  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      cursor:  disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      fontFamily: "'Courier New', monospace", fontSize: 11,
      color: 'var(--j-text-primary)',
      userSelect: 'none',
    }}>
      <input
        type="checkbox"
        checked={isOn}
        onChange={handleChange}
        disabled={disabled}
        role="switch"
        aria-checked={isOn}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <div style={{
        width:      36, height: 18, flexShrink: 0, position: 'relative',
        background: isOn ? 'var(--j-accent-25)' : 'var(--j-bg-panel)',
        border:     `1px solid ${isOn ? 'var(--j-accent)' : 'var(--j-border)'}`,
        clipPath:   'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
        boxShadow:  isOn ? '0 0 8px var(--j-accent-25)' : 'none',
        transition: 'all .2s ease',
      }}>
        <div style={{
          position:   'absolute',
          top: 2, width: 12, height: 12,
          left:       isOn ? 'calc(100% - 15px)' : 3,
          background: isOn ? 'var(--j-accent)' : 'var(--j-border)',
          clipPath:   'polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%)',
          boxShadow:  isOn ? '0 0 6px var(--j-accent)' : 'none',
          transition: 'left .2s ease',
        }} />
      </div>
      {label && <span>{label}</span>}
    </label>
  )
}
```

- [ ] **Step 6: Implement JSlider**

Create `packages/jarvis-ui/src/components/ui/JSlider.tsx`:

```tsx
import { useState } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

export interface JSliderProps {
  value?:        number
  defaultValue?: number
  onChange?:     (value: number) => void
  min?:          number
  max?:          number
  step?:         number
  disabled?:     boolean
  showValue?:    boolean
  color?:        JColor
}

export function JSlider({
  value,
  defaultValue,
  onChange,
  min       = 0,
  max       = 100,
  step      = 1,
  disabled  = false,
  showValue = true,
}: JSliderProps) {
  const [internal, setInternal] = useState(defaultValue ?? min)
  const current = value !== undefined ? value : internal
  const pct     = max > min ? ((current - min) / (max - min)) * 100 : 0

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const n = Number(e.target.value)
    if (value === undefined) setInternal(n)
    onChange?.(n)
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: "'Courier New', monospace",
      opacity: disabled ? 0.4 : 1,
    }}>
      <div style={{ position: 'relative', flex: 1, height: 20 }}>
        {/* Track */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, transform: 'translateY(-50%)', background: 'var(--j-border)' }} />
        {/* Fill */}
        <div style={{ position: 'absolute', top: '50%', left: 0, width: `${pct}%`, height: 2, transform: 'translateY(-50%)', background: 'var(--j-accent)', boxShadow: '0 0 6px var(--j-accent-25)', transition: 'width .1s ease' }} />
        {/* Invisible native range (handles interaction) */}
        <input
          type="range"
          min={min} max={max} step={step}
          value={current}
          onChange={handleChange}
          disabled={disabled}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: disabled ? 'not-allowed' : 'pointer', margin: 0 }}
        />
        {/* Custom thumb */}
        <div style={{
          position: 'absolute', top: '50%', left: `${pct}%`,
          transform: 'translate(-50%, -50%)',
          width: 12, height: 12, pointerEvents: 'none',
          background: 'var(--j-accent)',
          clipPath:   'polygon(50% 0,100% 50%,50% 100%,0 50%)',
          boxShadow:  '0 0 8px var(--j-accent)',
        }} />
      </div>
      {showValue && (
        <span style={{ fontSize: 11, color: 'var(--j-accent)', letterSpacing: '.06em', minWidth: 32, textAlign: 'right' }}>
          {current}
        </span>
      )}
    </div>
  )
}
```

- [ ] **Step 7: Run all tests — verify they pass**

```powershell
pnpm test -- --reporter=verbose 2>&1 | Select-String "JCheckbox|JRadio|JToggle|JSlider|pass|fail" | head -40
```

Expected: 6+6+6+6 = 24 tests pass.

- [ ] **Step 8: Add exports to index.ts**

Append:

```ts
export type { JCheckboxProps } from './components/ui/JCheckbox'
export { JCheckbox } from './components/ui/JCheckbox'
export type { JRadioProps } from './components/ui/JRadio'
export { JRadio } from './components/ui/JRadio'
export type { JToggleProps } from './components/ui/JToggle'
export { JToggle } from './components/ui/JToggle'
export type { JSliderProps } from './components/ui/JSlider'
export { JSlider } from './components/ui/JSlider'
```

- [ ] **Step 9: Commit**

```powershell
git add packages/jarvis-ui/src/components/ui/JCheckbox.tsx packages/jarvis-ui/src/components/ui/JCheckbox.test.tsx packages/jarvis-ui/src/components/ui/JRadio.tsx packages/jarvis-ui/src/components/ui/JRadio.test.tsx packages/jarvis-ui/src/components/ui/JToggle.tsx packages/jarvis-ui/src/components/ui/JToggle.test.tsx packages/jarvis-ui/src/components/ui/JSlider.tsx packages/jarvis-ui/src/components/ui/JSlider.test.tsx packages/jarvis-ui/src/index.ts
git commit -m "feat(ui): add JCheckbox, JRadio, JToggle, JSlider — inline-styled binary inputs"
```

- [ ] **Step 10: Update progress ledger**

```
Task 4 (Plan 3): JCheckbox + JRadio + JToggle + JSlider complete (commit above, 24 tests pass)
```

---

### Task 5: JFormField · JDatePicker · JDateRangePicker · JTimePicker + Final Exports + Build

**Files:**
- Create: all 4 component files + 4 test files
- Modify: `packages/jarvis-ui/src/index.ts`
- Modify: `packages/jarvis-ui/package.json` (add react-day-picker dependency)

**Interfaces:**
- Consumes: `react-day-picker` `DayPicker` component (after install)
- Produces: `JFormField`, `JDatePicker`, `JDateRangePicker`, `JTimePicker` and their prop interfaces

- [ ] **Step 1: Install react-day-picker**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
Set-Location "D:\Claude\HUD Theme\HUDtheme\packages\jarvis-ui"
pnpm add react-day-picker
```

Expected: `packages/jarvis-ui/package.json` now has `"react-day-picker": "^8.x.x"` (or v9) in `dependencies`.

- [ ] **Step 2: Write failing tests for all four**

Create `packages/jarvis-ui/src/components/ui/JFormField.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JFormField } from './JFormField'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JFormField', () => {
  it('renders children', () => {
    render(<W><JFormField><input data-testid="inp" /></JFormField></W>)
    expect(screen.getByTestId('inp')).toBeInTheDocument()
  })

  it('shows label text', () => {
    render(<W><JFormField label="Email"><input /></JFormField></W>)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('shows required asterisk when required=true', () => {
    render(<W><JFormField label="Email" required><input /></JFormField></W>)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<W><JFormField error="Required field"><input /></JFormField></W>)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('shows hint text', () => {
    render(<W><JFormField hint="Max 50 chars"><input /></JFormField></W>)
    expect(screen.getByText('Max 50 chars')).toBeInTheDocument()
  })

  it('does not show hint when error is present', () => {
    render(<W><JFormField error="Oops" hint="Max 50"><input /></JFormField></W>)
    expect(screen.queryByText('Max 50')).toBeNull()
    expect(screen.getByText('Oops')).toBeInTheDocument()
  })
})
```

Create `packages/jarvis-ui/src/components/ui/JDatePicker.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JDatePicker } from './JDatePicker'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JDatePicker', () => {
  it('renders a trigger button', () => {
    render(<W><JDatePicker /></W>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows placeholder when no value', () => {
    render(<W><JDatePicker placeholder="Pick a date" /></W>)
    expect(screen.getByText('Pick a date')).toBeInTheDocument()
  })

  it('shows formatted date when value is set', () => {
    render(<W><JDatePicker value={new Date(2026, 5, 19)} onChange={() => {}} /></W>)
    expect(screen.getByText(/19 Jun 2026/)).toBeInTheDocument()
  })

  it('opens calendar popover on trigger click', () => {
    render(<W><JDatePicker /></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('disabled button cannot be clicked to open calendar', () => {
    render(<W><JDatePicker disabled /></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.queryByRole('grid')).toBeNull()
  })
})
```

Create `packages/jarvis-ui/src/components/ui/JDateRangePicker.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JDateRangePicker } from './JDateRangePicker'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JDateRangePicker', () => {
  it('renders a trigger button', () => {
    render(<W><JDateRangePicker /></W>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows placeholder when no range selected', () => {
    render(<W><JDateRangePicker placeholder="Select range" /></W>)
    expect(screen.getByText('Select range')).toBeInTheDocument()
  })

  it('shows formatted from date when from is set', () => {
    render(<W><JDateRangePicker value={{ from: new Date(2026, 5, 1) }} onChange={() => {}} /></W>)
    expect(screen.getByText(/01 Jun 2026/)).toBeInTheDocument()
  })

  it('opens calendar on trigger click', () => {
    render(<W><JDateRangePicker /></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('disabled prevents opening', () => {
    render(<W><JDateRangePicker disabled /></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.queryByRole('grid')).toBeNull()
  })
})
```

Create `packages/jarvis-ui/src/components/ui/JTimePicker.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JTimePicker } from './JTimePicker'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JTimePicker', () => {
  it('renders two number inputs', () => {
    const { container } = render(<W><JTimePicker /></W>)
    const inputs = container.querySelectorAll('input[type="number"]')
    expect(inputs.length).toBe(2)
  })

  it('shows hours and minutes from value prop', () => {
    render(<W><JTimePicker value="14:30" onChange={() => {}} /></W>)
    expect(screen.getByDisplayValue('14')).toBeInTheDocument()
    expect(screen.getByDisplayValue('30')).toBeInTheDocument()
  })

  it('calls onChange with HH:mm string on minute blur', () => {
    const fn = vi.fn()
    render(<W><JTimePicker value="10:00" onChange={fn} /></W>)
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[1], { target: { value: '45' } })
    fireEvent.blur(inputs[1])
    expect(fn).toHaveBeenCalledWith('10:45')
  })

  it('clamps hours to 0-23 on blur', () => {
    const fn = vi.fn()
    render(<W><JTimePicker value="10:00" onChange={fn} /></W>)
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '99' } })
    fireEvent.blur(inputs[0])
    expect(fn).toHaveBeenCalledWith('23:00')
  })

  it('clamps minutes to 0-59 on blur', () => {
    const fn = vi.fn()
    render(<W><JTimePicker value="10:00" onChange={fn} /></W>)
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[1], { target: { value: '99' } })
    fireEvent.blur(inputs[1])
    expect(fn).toHaveBeenCalledWith('10:59')
  })

  it('disabled inputs cannot be changed', () => {
    const { container } = render(<W><JTimePicker disabled /></W>)
    const inputs = container.querySelectorAll('input[type="number"]')
    inputs.forEach(i => expect((i as HTMLInputElement).disabled).toBe(true))
  })
})
```

- [ ] **Step 3: Run tests — verify they fail**

```powershell
pnpm test -- --reporter=verbose 2>&1 | Select-String "JFormField|JDatePicker|JDateRange|JTimePicker|Cannot find"
```

Expected: four "Cannot find module" errors.

- [ ] **Step 4: Implement JFormField**

Create `packages/jarvis-ui/src/components/ui/JFormField.tsx`:

```tsx
import type { ReactNode } from 'react'

export interface JFormFieldProps {
  label?:    string
  error?:    string
  hint?:     string
  required?: boolean
  children:  ReactNode
}

export function JFormField({ label, error, hint, required, children }: JFormFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: "'Courier New', monospace" }}>
      {label && (
        <label style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--j-text-muted)' }}>
          {label}
          {required && <span style={{ color: 'var(--j-err)', marginLeft: 2 }}>*</span>}
        </label>
      )}
      {children}
      {error && (
        <span style={{ fontSize: 10, color: 'var(--j-err)', letterSpacing: '.06em' }}>{error}</span>
      )}
      {!error && hint && (
        <span style={{ fontSize: 10, color: 'var(--j-text-dim)', letterSpacing: '.06em' }}>{hint}</span>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Implement JDatePicker**

Create `packages/jarvis-ui/src/components/ui/JDatePicker.tsx`:

```tsx
import { useState, useEffect, useRef } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import type { JColor } from '../../theme/JarvisTokens'

export interface JDatePickerProps {
  value?:       Date
  onChange?:    (date: Date | undefined) => void
  placeholder?: string
  disabled?:    boolean
  minDate?:     Date
  maxDate?:     Date
  color?:       JColor
}

function fmt(d: Date | undefined): string {
  if (!d) return ''
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function JDatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  disabled    = false,
  minDate,
  maxDate,
}: JDatePickerProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const triggerStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    height: 38, padding: '0 12px',
    background: 'var(--j-bg-panel)',
    border:     '1px solid var(--j-border)',
    color:      value ? 'var(--j-accent)' : 'var(--j-text-dim)',
    fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: '.08em',
    cursor:     disabled ? 'not-allowed' : 'pointer',
    clipPath:   'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
    opacity:    disabled ? 0.4 : 1,
  }

  const popoverStyle: React.CSSProperties = {
    position:   'absolute', zIndex: 100, top: '100%', left: 0, marginTop: 4,
    background: 'var(--j-bg-overlay)',
    border:     '1px solid var(--j-border)',
    clipPath:   'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
    padding:    '8px 12px',
    '--rdp-accent-color':     'var(--j-accent)',
    '--rdp-background-color': 'var(--j-accent-08)',
    color: 'var(--j-text-primary)',
    fontFamily: "'Courier New', monospace",
  } as React.CSSProperties

  const disabledDays = [
    ...(minDate ? [{ before: minDate }] : []),
    ...(maxDate ? [{ after:  maxDate }] : []),
  ]

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        style={triggerStyle}
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
      >
        <span style={{ fontSize: 10 }}>◈</span>
        <span>{fmt(value) || placeholder}</span>
      </button>
      {open && (
        <div style={popoverStyle}>
          <DayPicker
            mode="single"
            selected={value}
            onSelect={d => { onChange?.(d); setOpen(false) }}
            disabled={disabledDays}
          />
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 6: Implement JDateRangePicker**

Create `packages/jarvis-ui/src/components/ui/JDateRangePicker.tsx`:

```tsx
import { useState, useEffect, useRef } from 'react'
import { DayPicker } from 'react-day-picker'
import type { DateRange as RdpRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import type { JColor } from '../../theme/JarvisTokens'

export interface DateRange { from?: Date; to?: Date }

export interface JDateRangePickerProps {
  value?:       DateRange
  onChange?:    (range: DateRange) => void
  placeholder?: string
  disabled?:    boolean
  color?:       JColor
}

function fmt(d: Date | undefined): string {
  if (!d) return ''
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function JDateRangePicker({
  value,
  onChange,
  placeholder = 'Select range',
  disabled    = false,
}: JDateRangePickerProps) {
  const [internal, setInternal] = useState<DateRange>({})
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = value !== undefined ? value : internal

  useEffect(() => {
    if (!open) return
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  function handleSelect(r: RdpRange | undefined) {
    const next: DateRange = r ?? {}
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }

  const label = current.from
    ? `${fmt(current.from)} — ${current.to ? fmt(current.to) : '...'}`
    : placeholder

  const triggerStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    height: 38, padding: '0 12px',
    background: 'var(--j-bg-panel)',
    border:     '1px solid var(--j-border)',
    color:      current.from ? 'var(--j-accent)' : 'var(--j-text-dim)',
    fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: '.08em',
    cursor:     disabled ? 'not-allowed' : 'pointer',
    clipPath:   'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
    opacity:    disabled ? 0.4 : 1,
  }

  const popoverStyle: React.CSSProperties = {
    position:   'absolute', zIndex: 100, top: '100%', left: 0, marginTop: 4,
    background: 'var(--j-bg-overlay)',
    border:     '1px solid var(--j-border)',
    clipPath:   'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
    padding:    '8px 12px',
    '--rdp-accent-color':     'var(--j-accent)',
    '--rdp-background-color': 'var(--j-accent-08)',
    color: 'var(--j-text-primary)',
    fontFamily: "'Courier New', monospace",
  } as React.CSSProperties

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        style={triggerStyle}
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
      >
        <span style={{ fontSize: 10 }}>◈</span>
        <span>{label}</span>
      </button>
      {open && (
        <div style={popoverStyle}>
          <DayPicker
            mode="range"
            selected={current as RdpRange}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 7: Implement JTimePicker**

Create `packages/jarvis-ui/src/components/ui/JTimePicker.tsx`:

```tsx
import { useState, useEffect } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

export interface JTimePickerProps {
  value?:       string
  onChange?:    (time: string) => void
  placeholder?: string
  disabled?:    boolean
  format?:      '12h' | '24h'
  color?:       JColor
}

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }
function pad(n: number) { return String(n).padStart(2, '0') }

export function JTimePicker({
  value,
  onChange,
  disabled = false,
  format   = '24h',
}: JTimePickerProps) {
  const [hStr, setHStr] = useState(value ? value.split(':')[0] : '')
  const [mStr, setMStr] = useState(value ? value.split(':')[1] : '')

  useEffect(() => {
    if (value) {
      setHStr(value.split(':')[0])
      setMStr(value.split(':')[1])
    }
  }, [value])

  const maxH = format === '12h' ? 12 : 23

  function commitH(raw: string) {
    const n = clamp(parseInt(raw || '0', 10), 0, maxH)
    const h = pad(n)
    setHStr(h)
    if (mStr) onChange?.(`${h}:${mStr}`)
    else onChange?.(`${h}:00`)
  }

  function commitM(raw: string) {
    const n = clamp(parseInt(raw || '0', 10), 0, 59)
    const m = pad(n)
    setMStr(m)
    onChange?.(`${hStr || '00'}:${m}`)
  }

  const numStyle: React.CSSProperties = {
    width: 44, height: 38, textAlign: 'center',
    background:    'var(--j-bg-panel)',
    border:        '1px solid var(--j-border)',
    color:         'var(--j-accent)',
    fontFamily:    "'Courier New', monospace",
    fontSize:      16, letterSpacing: '.1em',
    outline:       'none',
    clipPath:      'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
    MozAppearance: 'textfield',
  } as React.CSSProperties

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, opacity: disabled ? 0.4 : 1 }}>
      <input
        type="number"
        min={0} max={maxH}
        value={hStr}
        placeholder="HH"
        disabled={disabled}
        onChange={e => setHStr(e.target.value)}
        onBlur={e => commitH(e.target.value)}
        style={numStyle}
      />
      <span style={{ color: 'var(--j-accent)', fontFamily: "'Courier New', monospace", fontSize: 16, userSelect: 'none' }}>:</span>
      <input
        type="number"
        min={0} max={59}
        value={mStr}
        placeholder="MM"
        disabled={disabled}
        onChange={e => setMStr(e.target.value)}
        onBlur={e => commitM(e.target.value)}
        style={numStyle}
      />
    </div>
  )
}
```

- [ ] **Step 8: Run all tests — verify they pass**

```powershell
pnpm test -- --reporter=verbose 2>&1 | Select-String "JFormField|JDatePicker|JDateRange|JTimePicker|pass|fail" | head -40
```

Expected: 6+5+5+6 = 22 tests pass, all previous tests still pass.

- [ ] **Step 9: Add all Task 5 exports to index.ts**

Append to `packages/jarvis-ui/src/index.ts`:

```ts
export type { JFormFieldProps } from './components/ui/JFormField'
export { JFormField } from './components/ui/JFormField'
export type { JDatePickerProps } from './components/ui/JDatePicker'
export { JDatePicker } from './components/ui/JDatePicker'
export type { DateRange, JDateRangePickerProps } from './components/ui/JDateRangePicker'
export { JDateRangePicker } from './components/ui/JDateRangePicker'
export type { JTimePickerProps } from './components/ui/JTimePicker'
export { JTimePicker } from './components/ui/JTimePicker'
```

- [ ] **Step 10: Run full test suite one final time**

```powershell
pnpm test
```

Expected: all tests pass (previous 121 layout tests + ~80 new ui tests = 200+).

- [ ] **Step 11: Build library**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
Set-Location "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui build
```

Expected: `packages/jarvis-ui/dist/` updated, no TypeScript errors.

- [ ] **Step 12: Commit everything**

```powershell
git add packages/jarvis-ui/src/components/ui/ packages/jarvis-ui/src/index.ts packages/jarvis-ui/package.json packages/jarvis-ui/pnpm-lock.yaml packages/jarvis-ui/dist/
git commit -m "feat(ui): add JFormField, JDatePicker, JDateRangePicker, JTimePicker + build"
```

- [ ] **Step 13: Update progress ledger**

Append to `.git/sdd/progress.md`:

```
Task 5 (Plan 3): JFormField + pickers complete (commit above). Plan 3 DONE.
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|-----------------|------|
| JButton — 9 shapes, loading, icon slots | Task 1 ✅ |
| JCard — 9 styles with inner markup | Task 2 ✅ |
| JInput — controlled/uncontrolled, error | Task 3 ✅ |
| JTextArea — rows, resize | Task 3 ✅ |
| JSelect — options, placeholder | Task 3 ✅ |
| JCheckbox — controlled/uncontrolled | Task 4 ✅ |
| JRadio — value, name, controlled | Task 4 ✅ |
| JToggle — controlled/uncontrolled | Task 4 ✅ |
| JSlider — min/max/step, showValue | Task 4 ✅ |
| JFormField — wrapper, label, error, hint, required | Task 5 ✅ |
| JDatePicker — react-day-picker, outside-click close | Task 5 ✅ |
| JDateRangePicker — range mode | Task 5 ✅ |
| JTimePicker — inline two-input, clamp on blur | Task 5 ✅ |
| All 13 exported from index.ts | Tasks 1–5 ✅ |
| react-day-picker install | Task 5 Step 1 ✅ |
| No hardcoded hex, clip-path not border-radius, Courier New | All tasks ✅ |

**Placeholder scan:** No TBD, no TODO, no "similar to task N". All code blocks are complete.

**Type consistency:** `JButtonProps['shape']` matches `JButtonShape` from tokens. `DateRange` in JDateRangePicker matches react-day-picker's `RdpRange` shape. `JSelectOption` defined once in JSelect.tsx and exported. `onChange` signatures are consistent: string for text inputs, boolean for checkbox/toggle, number for slider, `string` for radio (the value), `Date | undefined` for date picker, `DateRange` for range picker, `string` (HH:mm) for time picker.
