# Phase 6: HUD Visualizations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port JArcMeter, JWaveform, and JOrb from Blazor to React as pure-CSS HUD visualization components in the `jarvis-ui` library.

**Architecture:** All three are standalone pure-div components using only inline styles and existing CSS classes/keyframes. JArcMeter renders N clip-path parallelogram segments from a height-lookup array. JWaveform delegates animation entirely to the `j-waveform`/`j-wv` CSS classes already in the stylesheet, controlling play state via inline style override. JOrb positions 4 concentric rings and 12 tick marks using CSS `border-radius:50%` (intentional — circles by design) and trig for tick placement.

**Tech Stack:** React 18, TypeScript, Vitest, React Testing Library, pnpm workspaces monorepo

## Global Constraints

- Repo root: `D:\Claude\HUD Theme\HUDtheme\`
- Library source: `packages/jarvis-ui/src/`
- Test command: `pnpm --filter jarvis-ui test`
- All colors via `var(--j-*)` CSS custom properties — zero hardcoded hex
- No `border-radius` on HUD panels/buttons — **exception:** `border-radius:50%` is intentional for JOrb rings and indicator dots (circles by design)
- Font everywhere text appears: `'Courier New', monospace`
- CSS files are read-only — do not edit any `.css` file
- Inline style pattern: all components use `React.CSSProperties` objects
- Existing CSS classes confirmed present: `j-waveform`, `j-wv`, `j-glitch`
- Existing keyframes confirmed present: `j-wave`, `j-spin`, `j-spin-rev`, `j-pulse`, `j-glitch`
- CSS custom property `--j-dur-pulse` confirmed present in `:root`
- TDD: write failing test first, verify RED, implement, verify GREEN, commit
- Test wrapper: `function W({ children }: { children: ReactNode }) { return <JThemeProvider>{children}</JThemeProvider> }`
- `fireEvent` only — no `@testing-library/user-event`
- `JColor` and `JState` imported from `../../theme/JarvisTokens`
- `JThemeProvider` imported from `../../theme/JThemeContext`
- PowerShell PATH: `$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH`

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `packages/jarvis-ui/src/components/ui/JArcMeter.tsx` | Create | Segmented arc level meter |
| `packages/jarvis-ui/src/components/ui/JArcMeter.test.tsx` | Create | 11 tests |
| `packages/jarvis-ui/src/components/ui/JWaveform.tsx` | Create | Animated waveform bar visualizer |
| `packages/jarvis-ui/src/components/ui/JWaveform.test.tsx` | Create | 7 tests |
| `packages/jarvis-ui/src/components/ui/JOrb.tsx` | Create | Identity orb with rotating rings |
| `packages/jarvis-ui/src/components/ui/JOrb.test.tsx` | Create | 11 tests |
| `packages/jarvis-ui/src/index.ts` | Modify | Append 6 export lines |

---

## Task 1: JArcMeter

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JArcMeter.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JArcMeter.test.tsx`

**Interfaces:**
- Consumes: `JColor` from `../../theme/JarvisTokens`
- Produces: `JArcMeter` (named export), `JArcMeterProps` (type export)

- [ ] **Step 1: Write the failing tests**

Create `packages/jarvis-ui/src/components/ui/JArcMeter.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JArcMeter } from './JArcMeter'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JArcMeter', () => {
  it('renders totalArcs number of segments', () => {
    const { container } = render(<W><JArcMeter level={3} totalArcs={6} /></W>)
    expect(container.querySelectorAll('[data-testid^="arc-seg-"]').length).toBe(6)
  })

  it('custom totalArcs renders correct count', () => {
    const { container } = render(<W><JArcMeter level={2} totalArcs={8} /></W>)
    expect(container.querySelectorAll('[data-testid^="arc-seg-"]').length).toBe(8)
  })

  it('inactive segment has accent-05 background', () => {
    const { container } = render(<W><JArcMeter level={0} totalArcs={4} /></W>)
    const seg = container.querySelector('[data-testid="arc-seg-0"]') as HTMLElement
    expect(seg.style.background).toContain('j-accent-05')
  })

  it('active non-peak segment has accent background', () => {
    const { container } = render(<W><JArcMeter level={3} totalArcs={6} /></W>)
    // level=3: index 0 is active and non-peak (peak is index 2)
    const seg = container.querySelector('[data-testid="arc-seg-0"]') as HTMLElement
    expect(seg.style.background).toContain('var(--j-accent)')
    expect(seg.style.background).not.toContain('gradient')
  })

  it('peak segment (last active) has j-pulse animation', () => {
    const { container } = render(<W><JArcMeter level={3} totalArcs={6} /></W>)
    // peak is index 2 (level - 1)
    const seg = container.querySelector('[data-testid="arc-seg-2"]') as HTMLElement
    expect(seg.style.animation).toContain('j-pulse')
  })

  it('level=0 renders all segments inactive', () => {
    const { container } = render(<W><JArcMeter level={0} totalArcs={4} /></W>)
    container.querySelectorAll('[data-testid^="arc-seg-"]').forEach((seg) => {
      expect((seg as HTMLElement).style.background).toContain('j-accent-05')
    })
  })

  it('showLabel=true renders label text', () => {
    render(<W><JArcMeter level={2} showLabel label="MIC" /></W>)
    expect(screen.getByText('MIC')).toBeInTheDocument()
  })

  it('showLabel=false does not render label', () => {
    render(<W><JArcMeter level={2} showLabel={false} label="MIC" /></W>)
    expect(screen.queryByText('MIC')).not.toBeInTheDocument()
  })

  it('default label is LEVEL when showLabel=true', () => {
    render(<W><JArcMeter level={2} showLabel /></W>)
    expect(screen.getByText('LEVEL')).toBeInTheDocument()
  })

  it('showValue=true renders level/total readout', () => {
    render(<W><JArcMeter level={3} totalArcs={6} showValue /></W>)
    expect(screen.getByText('3 / 6')).toBeInTheDocument()
  })

  it('vertical orientation renders same segment count', () => {
    const { container } = render(<W><JArcMeter level={2} totalArcs={6} orientation="vertical" /></W>)
    expect(container.querySelectorAll('[data-testid^="arc-seg-"]').length).toBe(6)
  })
})
```

- [ ] **Step 2: Run tests to confirm RED**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test
```

Expected: 11 JArcMeter tests fail — `Cannot find module './JArcMeter'`.

- [ ] **Step 3: Implement JArcMeter.tsx**

Create `packages/jarvis-ui/src/components/ui/JArcMeter.tsx`:

```tsx
import type { CSSProperties } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

export interface JArcMeterProps {
  level:        number
  totalArcs?:   number
  color?:       JColor
  orientation?: 'horizontal' | 'vertical'
  showLabel?:   boolean
  label?:       string
  showValue?:   boolean
  arcWidth?:    string
  arcGap?:      string
}

// Creates arc shape — taller in the center. Wraps with % length.
const ARC_HEIGHTS = [6, 10, 14, 14, 10, 6, 8, 12, 16, 16, 12, 8]

export function JArcMeter({
  level,
  totalArcs   = 6,
  color: _color = 'cyan',
  orientation = 'horizontal',
  showLabel   = false,
  label       = 'LEVEL',
  showValue   = false,
  arcWidth    = '8px',
  arcGap      = '3px',
}: JArcMeterProps) {
  const isVertical = orientation === 'vertical'

  function segStyle(i: number): CSSProperties {
    const active = i < level
    const peak   = i === level - 1 && level > 0
    const h      = ARC_HEIGHTS[i % ARC_HEIGHTS.length]

    const size: CSSProperties = isVertical
      ? { width: h, height: 4 }
      : { width: arcWidth, height: h }

    let background: string
    let boxShadow: string
    let animation: string | undefined

    if (peak) {
      background = 'linear-gradient(0deg, var(--j-accent-12), var(--j-accent))'
      boxShadow  = '0 0 10px var(--j-accent), 0 0 20px var(--j-accent-25)'
      animation  = 'j-pulse 0.6s ease-in-out infinite'
    } else if (active) {
      background = 'var(--j-accent)'
      boxShadow  = '0 0 5px var(--j-accent-25)'
      animation  = undefined
    } else {
      background = 'var(--j-accent-05)'
      boxShadow  = 'none'
      animation  = undefined
    }

    return {
      ...size,
      background,
      boxShadow,
      clipPath:   'polygon(1px 15%, 100% 0, 100% 100%, 1px 85%)',
      transition: 'background 0.1s, box-shadow 0.1s',
      ...(animation ? { animation } : {}),
    }
  }

  const rowStyle: CSSProperties = isVertical
    ? { display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: arcGap }
    : { display: 'flex', alignItems: 'flex-end', gap: arcGap }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      {showLabel && (
        <div style={{
          fontSize:      8,
          color:         'var(--j-accent-12)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom:  4,
          textAlign:     'center',
          fontFamily:    "'Courier New', monospace",
        }}>
          {label}
        </div>
      )}

      <div style={rowStyle}>
        {Array.from({ length: totalArcs }, (_, i) => (
          <div key={i} data-testid={`arc-seg-${i}`} style={segStyle(i)} />
        ))}
      </div>

      {showValue && (
        <div style={{
          fontSize:      9,
          letterSpacing: '0.10em',
          marginTop:     4,
          textAlign:     'center',
          color:         level > 0 ? 'var(--j-accent)' : 'var(--j-text-dim)',
          transition:    'color 0.2s',
          fontFamily:    "'Courier New', monospace",
        }}>
          {level} / {totalArcs}
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

Expected: All 11 JArcMeter tests pass. All 366 prior tests still pass (377 total).

- [ ] **Step 5: Commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/components/ui/JArcMeter.tsx packages/jarvis-ui/src/components/ui/JArcMeter.test.tsx
git commit -m "feat(jarvis-ui): add JArcMeter HUD visualization component"
```

---

## Task 2: JWaveform

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JWaveform.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JWaveform.test.tsx`

**Interfaces:**
- Consumes: `JColor` from `../../theme/JarvisTokens` (accepted for API consistency; bar color always `var(--j-accent)` per CSS class)
- Produces: `JWaveform` (named export), `JWaveformProps` (type export)

**CSS dependency:** Uses `j-waveform` wrapper class and `j-wv` bar class from `jarvis-ui.css`. These classes drive the `j-wave` animation via CSS custom props `--j-wv-dur` (duration) and `--j-wv-dly` (delay) set per-bar as inline style.

- [ ] **Step 1: Write the failing tests**

Create `packages/jarvis-ui/src/components/ui/JWaveform.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JWaveform } from './JWaveform'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JWaveform', () => {
  it('container has j-waveform class', () => {
    const { container } = render(<W><JWaveform /></W>)
    expect(container.querySelector('.j-waveform')).toBeInTheDocument()
  })

  it('renders default 20 bars with j-wv class', () => {
    const { container } = render(<W><JWaveform /></W>)
    expect(container.querySelectorAll('.j-wv').length).toBe(20)
  })

  it('custom barCount renders correct number of bars', () => {
    const { container } = render(<W><JWaveform barCount={8} /></W>)
    expect(container.querySelectorAll('.j-wv').length).toBe(8)
  })

  it('active=false wrapper has 0.3 opacity', () => {
    const { container } = render(<W><JWaveform active={false} /></W>)
    const wrapper = container.querySelector('.j-waveform') as HTMLElement
    expect(wrapper.style.opacity).toBe('0.3')
  })

  it('active=true wrapper does not have reduced opacity', () => {
    const { container } = render(<W><JWaveform active /></W>)
    const wrapper = container.querySelector('.j-waveform') as HTMLElement
    expect(wrapper.style.opacity).not.toBe('0.3')
  })

  it('active=false bars have animationPlayState paused', () => {
    const { container } = render(<W><JWaveform active={false} /></W>)
    const bar = container.querySelectorAll('.j-wv')[0] as HTMLElement
    expect(bar.style.animationPlayState).toBe('paused')
  })

  it('active=true bars do not have paused animation', () => {
    const { container } = render(<W><JWaveform active /></W>)
    const bar = container.querySelectorAll('.j-wv')[0] as HTMLElement
    expect(bar.style.animationPlayState).not.toBe('paused')
  })
})
```

- [ ] **Step 2: Run tests to confirm RED**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test
```

Expected: 7 JWaveform tests fail — `Cannot find module './JWaveform'`.

- [ ] **Step 3: Implement JWaveform.tsx**

Create `packages/jarvis-ui/src/components/ui/JWaveform.tsx`:

```tsx
import type { CSSProperties } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

export interface JWaveformProps {
  barCount?: number
  height?:   string
  color?:    JColor    // accepted for API consistency; bar color driven by j-wv CSS class
  active?:   boolean
}

// Height and duration arrays — wrap with % length
const WV_HEIGHTS = [6, 14, 22, 18, 28, 20, 30, 24, 28, 22, 16, 20, 26, 18, 12, 22, 28, 18, 10, 14]
const WV_DURS    = ['.4s', '.5s', '.6s', '.4s', '.7s', '.5s', '.6s', '.4s', '.8s', '.5s']

export function JWaveform({
  barCount = 20,
  height   = '32px',
  active   = true,
}: JWaveformProps) {
  return (
    <div
      className="j-waveform"
      style={{
        height,
        ...(active ? {} : { opacity: 0.3 }),
      }}
    >
      {Array.from({ length: barCount }, (_, i) => {
        const barStyle: CSSProperties = {
          height:     `${WV_HEIGHTS[i % WV_HEIGHTS.length]}px`,
          background: 'var(--j-accent)',
          '--j-wv-dur': WV_DURS[i % WV_DURS.length],
          '--j-wv-dly': `${(i * 0.04).toFixed(2)}s`,
          ...(!active ? { transform: 'scaleY(0.15)', animationPlayState: 'paused' } : {}),
        } as CSSProperties
        return <div key={i} className="j-wv" style={barStyle} />
      })}
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

Expected: All 7 JWaveform tests pass. All 377 prior tests still pass (384 total).

- [ ] **Step 5: Commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/components/ui/JWaveform.tsx packages/jarvis-ui/src/components/ui/JWaveform.test.tsx
git commit -m "feat(jarvis-ui): add JWaveform HUD visualization component"
```

---

## Task 3: JOrb

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JOrb.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JOrb.test.tsx`

**Interfaces:**
- Consumes: `JColor`, `JState` from `../../theme/JarvisTokens`
- Produces: `JOrb` (named export), `JOrbProps` (type export)

**CSS dependency:** Uses `j-glitch` class on system name (keyframe defined in stylesheet). Rings use `j-spin` / `j-spin-rev` keyframes. State label uses `j-pulse` keyframe. All confirmed present.

- [ ] **Step 1: Write the failing tests**

Create `packages/jarvis-ui/src/components/ui/JOrb.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JOrb } from './JOrb'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JOrb', () => {
  it('renders systemName text', () => {
    render(<W><JOrb systemName="JARVIS" /></W>)
    expect(screen.getByText('JARVIS')).toBeInTheDocument()
  })

  it('default systemName is JARVIS', () => {
    render(<W><JOrb /></W>)
    expect(screen.getByText('JARVIS')).toBeInTheDocument()
  })

  it('state=active without listening shows Online', () => {
    render(<W><JOrb state="active" listening={false} /></W>)
    expect(screen.getByText('Online')).toBeInTheDocument()
  })

  it('listening=true shows Listening label', () => {
    render(<W><JOrb state="active" listening /></W>)
    expect(screen.getByText('Listening')).toBeInTheDocument()
  })

  it('state=idle shows Idle label', () => {
    render(<W><JOrb state="idle" /></W>)
    expect(screen.getByText('Idle')).toBeInTheDocument()
  })

  it('state=processing shows Processing label', () => {
    render(<W><JOrb state="processing" /></W>)
    expect(screen.getByText('Processing')).toBeInTheDocument()
  })

  it('state=warning shows Warning label', () => {
    render(<W><JOrb state="warning" /></W>)
    expect(screen.getByText('Warning')).toBeInTheDocument()
  })

  it('state=error shows Error label', () => {
    render(<W><JOrb state="error" /></W>)
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('onClick fires when wrapper is clicked', () => {
    const onClick = vi.fn()
    const { container } = render(<W><JOrb onClick={onClick} /></W>)
    fireEvent.click(container.firstChild as HTMLElement)
    expect(onClick).toHaveBeenCalled()
  })

  it('renders 12 tick marks', () => {
    const { container } = render(<W><JOrb /></W>)
    expect(container.querySelectorAll('[data-testid="orb-tick"]').length).toBe(12)
  })

  it('system name element has j-glitch class', () => {
    const { container } = render(<W><JOrb systemName="TEST" /></W>)
    expect(container.querySelector('.j-glitch')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to confirm RED**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test
```

Expected: 11 JOrb tests fail — `Cannot find module './JOrb'`.

- [ ] **Step 3: Implement JOrb.tsx**

Create `packages/jarvis-ui/src/components/ui/JOrb.tsx`:

```tsx
import type { JColor, JState } from '../../theme/JarvisTokens'

export interface JOrbProps {
  systemName?: string
  size?:       string
  color?:      JColor
  state?:      JState
  listening?:  boolean
  onClick?:    () => void
}

function getRingSpeeds(state: JState): { r1: string; r2: string; r3: string } {
  if (state === 'processing') return { r1: '2s',  r2: '1.2s', r3: '1.8s' }
  if (state === 'idle')       return { r1: '8s',  r2: '6s',   r3: '9s'   }
  return                             { r1: '4s',  r2: '3s',   r3: '5s'   }
}

function getStateLabel(state: JState, listening: boolean): string {
  if (state === 'idle')       return 'Idle'
  if (state === 'processing') return 'Processing'
  if (state === 'warning')    return 'Warning'
  if (state === 'error')      return 'Error'
  return listening ? 'Listening' : 'Online'
}

// Pre-compute 12 tick angles (every 30°)
const TICK_ANGLES = Array.from({ length: 12 }, (_, i) => i * 30)

export function JOrb({
  systemName = 'JARVIS',
  size       = '160px',
  state      = 'active',
  listening  = false,
  onClick,
}: JOrbProps) {
  const speeds     = getRingSpeeds(state)
  const stateLabel = getStateLabel(state, listening)

  return (
    <div
      onClick={onClick}
      style={{
        position:       'relative',
        width:          size,
        height:         size,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        cursor:         onClick ? 'pointer' : 'default',
        flexShrink:     0,
        fontFamily:     "'Courier New', monospace",
      }}
    >
      {/* Outer dashed ring — slowest */}
      <div style={{
        position:     'absolute',
        borderRadius: '50%',
        inset:        0,
        border:       '1px dashed var(--j-accent)',
        opacity:      0.08,
        animation:    'j-spin 10s linear infinite',
      }} />

      {/* 12 tick marks at 30° intervals */}
      {TICK_ANGLES.map((angle) => {
        const rad = angle * Math.PI / 180
        const r   = 48  // radius as % of half container
        const x   = 50 + r * Math.sin(rad)
        const y   = 50 - r * Math.cos(rad)
        return (
          <div
            key={angle}
            data-testid="orb-tick"
            style={{
              position:  'absolute',
              width:     2,
              height:    4,
              background: 'var(--j-accent)',
              opacity:   0.35,
              left:      `${x.toFixed(1)}%`,
              top:       `${y.toFixed(1)}%`,
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
            }}
          />
        )
      })}

      {/* Ring 1 — solid, state-speed */}
      <div style={{
        position:     'absolute',
        borderRadius: '50%',
        inset:        8,
        border:       '1px solid var(--j-accent)',
        opacity:      0.35,
        animation:    `j-spin ${speeds.r1} linear infinite`,
      }} />

      {/* Ring 2 — split top/bottom color */}
      <div style={{
        position:          'absolute',
        borderRadius:      '50%',
        inset:             16,
        border:            '1.5px solid transparent',
        borderTopColor:    'var(--j-accent)',
        borderBottomColor: 'var(--j-accent)66',
        boxShadow:         '0 0 6px var(--j-accent-25)',
        animation:         `j-spin ${speeds.r2} linear infinite`,
      }} />

      {/* Ring 3 — counter-rotating */}
      <div style={{
        position:          'absolute',
        borderRadius:      '50%',
        inset:             24,
        border:            '1.5px solid transparent',
        borderTopColor:    'var(--j-accent)',
        borderBottomColor: 'var(--j-accent)66',
        boxShadow:         '0 0 6px var(--j-accent-25)',
        animation:         `j-spin-rev ${speeds.r3} linear infinite`,
      }} />

      {/* Inner circle */}
      <div style={{
        position:       'absolute',
        borderRadius:   '50%',
        inset:          32,
        background:     'radial-gradient(circle at 38% 36%, var(--j-accent-12), var(--j-bg) 70%)',
        border:         '1px solid var(--j-accent)44',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        boxShadow:      'inset 0 0 20px var(--j-accent-25), 0 0 16px var(--j-accent-25)',
        overflow:       'hidden',
      }}>
        {/* Inner radial glow overlay */}
        <div style={{
          position:      'absolute',
          inset:         0,
          borderRadius:  '50%',
          background:    'radial-gradient(circle at 40% 35%, var(--j-accent-25) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* System name + state label */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div
            className="j-glitch"
            style={{
              fontSize:      14,
              fontWeight:    600,
              color:         'var(--j-text-primary)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textShadow:    '0 0 16px var(--j-accent)',
              fontFamily:    "'Courier New', monospace",
            }}
          >
            {systemName}
          </div>
          <div style={{
            fontSize:      9,
            color:         'var(--j-accent)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginTop:     2,
            fontFamily:    "'Courier New', monospace",
            animation:     'j-pulse var(--j-dur-pulse) ease-in-out infinite',
          }}>
            {stateLabel}
          </div>
        </div>
      </div>

      {/* Listening indicator */}
      <div style={{
        position:       'absolute',
        bottom:         '18%',
        left:           '50%',
        transform:      'translateX(-50%)',
        width:          24,
        height:         24,
        borderRadius:   '50%',
        background:     'var(--j-bg)',
        border:         '1px solid var(--j-accent)44',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        zIndex:         2,
      }}>
        <div style={{
          width:      10,
          height:     10,
          borderRadius: '50%',
          background: listening ? 'var(--j-accent)' : 'var(--j-text-dim)',
          boxShadow:  listening
            ? '0 0 12px var(--j-accent), 0 0 24px var(--j-accent-25)'
            : 'none',
          animation:  listening ? 'j-pulse 1.2s ease-in-out infinite' : 'none',
          transition: 'all 0.3s',
        }} />
      </div>
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

Expected: All 11 JOrb tests pass. All 384 prior tests still pass (395 total).

- [ ] **Step 5: Commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/components/ui/JOrb.tsx packages/jarvis-ui/src/components/ui/JOrb.test.tsx
git commit -m "feat(jarvis-ui): add JOrb identity orb HUD visualization component"
```

---

## Task 4: Wire Up Exports

**Files:**
- Modify: `packages/jarvis-ui/src/index.ts` (append 6 lines at end)

**Interfaces:**
- Consumes: All 3 components from Tasks 1–3
- Produces: Public API — consumers can `import { JArcMeter, JWaveform, JOrb } from 'jarvis-ui'`

- [ ] **Step 1: Append exports to index.ts**

Open `packages/jarvis-ui/src/index.ts` and append at the end:

```ts
// Components — HUD visualizations
export type { JArcMeterProps } from './components/ui/JArcMeter'
export { JArcMeter } from './components/ui/JArcMeter'
export type { JWaveformProps } from './components/ui/JWaveform'
export { JWaveform } from './components/ui/JWaveform'
export type { JOrbProps } from './components/ui/JOrb'
export { JOrb } from './components/ui/JOrb'
```

- [ ] **Step 2: Run full test suite**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui test
```

Expected: All 395 tests pass across 41 suites.

- [ ] **Step 3: Verify build**

```powershell
$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH
cd "D:\Claude\HUD Theme\HUDtheme"
pnpm --filter jarvis-ui build
```

Expected: `✓ built in Xs` — no TypeScript errors.

- [ ] **Step 4: Commit**

```powershell
cd "D:\Claude\HUD Theme\HUDtheme"
git add packages/jarvis-ui/src/index.ts
git commit -m "feat(jarvis-ui): export Phase 6 HUD visualization components from index"
```

---

## Self-Review

**1. Spec coverage:**
- JArcMeter: ARC_HEIGHTS lookup ✓, clip-path parallelogram ✓, active/peak/inactive styles ✓, peak pulse animation ✓, horizontal/vertical modes ✓, showLabel ✓, showValue ✓, level=0 ✓
- JWaveform: j-waveform class ✓, j-wv class per bar ✓, WV_HEIGHTS ✓, WV_DURS ✓, per-bar delay ✓, active=false opacity + paused ✓
- JOrb: 4 rings ✓, 12 tick marks with trig ✓, ring speeds by state ✓, state labels for all 6 states ✓, j-glitch on name ✓, j-pulse on state label ✓, listening indicator ✓, onClick ✓

**2. Placeholder scan:** None. All styles have exact values from spec.

**3. Type consistency:**
- `getRingSpeeds(state: JState)` returns `{ r1, r2, r3 }` — used as `speeds.r1/r2/r3` in animation strings ✓
- `getStateLabel(state: JState, listening: boolean)` covers all 6 JState values ✓
- `ARC_HEIGHTS` and `WV_HEIGHTS`/`WV_DURS` are module-level constants — not re-declared in tests ✓
- `data-testid="orb-tick"` set in implementation — queried as `[data-testid="orb-tick"]` in tests ✓
- `data-testid={`arc-seg-${i}`}` set in implementation — queried as `[data-testid^="arc-seg-"]` or `[data-testid="arc-seg-0"]` in tests ✓
