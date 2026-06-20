# Phase 6: HUD Visualizations — Design Spec

**Date:** 2026-06-20
**Phase:** 6 of N
**Components:** JArcMeter, JWaveform, JOrb
**Status:** Approved

---

## Overview

Three pure-CSS HUD visualization components ported from Blazor. These are the most JARVIS-distinctive components in the library — they define the aesthetic. No SVG, no external dependencies. All animation via existing CSS keyframes already in the stylesheet.

**Blazor sources (read-only reference):**
- `JarvisUI/Components/JArcMeter.razor`
- `JarvisUI/Components/JWaveform.razor`
- `JarvisUI/Components/JOrb.razor`

---

## Global Constraints

- Repo root: `D:\Claude\HUD Theme\HUDtheme\`
- Library: `packages/jarvis-ui/src/`
- All colors via `var(--j-*)` — no hardcoded hex
- No `border-radius` on HUD panels/cards/buttons — exception: `border-radius:50%` is intentional for JOrb rings and listening indicator (circles by design)
- Font: `'Courier New', monospace` on all text elements
- CSS files are read-only — no edits
- Inline style pattern: all new components use `React.CSSProperties` objects
- Existing CSS classes in use: `j-waveform`, `j-wv`, `j-glitch` — already in `jarvis-ui.css` and `jarvis-theme.css`
- TDD: write failing test first, confirm RED, implement, confirm GREEN, commit
- Test wrapper: `function W({ children }: { children: ReactNode }) { return <JThemeProvider>{children}</JThemeProvider> }`
- Test command: `pnpm --filter jarvis-ui test`
- PowerShell PATH: `$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH`
- Exact JState values: `'idle' | 'active' | 'processing' | 'warning' | 'error' | 'success'`
- Exact JColor values: `'cyan' | 'blue' | 'amber' | 'red' | 'green' | 'ghost' | 'white'`

---

## CSS Classes Already Available

These exist in the stylesheet — components must use them, not replicate them in styles:

| Class | Purpose |
|---|---|
| `j-waveform` | Flex container for waveform bars |
| `j-wv` | Individual waveform bar — animation driven by `--j-wv-dur` + `--j-wv-dly` |
| `j-glitch` | Glitch flicker animation (used on JOrb system name) |

Animations already defined (do not redefine inline):
- `j-wave` — waveform bar oscillation
- `j-spin` / `j-spin-rev` — ring rotation / counter-rotation
- `j-pulse` — glow pulse
- `j-glitch` — text flicker

---

## Architecture

All three components are standalone — no context, no composition, no external dependencies. Each renders a single root `<div>` with inline styles and optional existing CSS classes.

**JArcMeter** renders N `<div>` segments inside a flex row or column. Segment heights are drawn from a fixed height lookup array that produces the arc shape. Color is driven entirely by `var(--j-accent)` (resolved by `JColor` via theme).

**JWaveform** renders N `<div>` bars inside a `<div className="j-waveform">`. Each bar is `<div className="j-wv">` with inline CSS custom properties `--j-wv-dur` and `--j-wv-dly`. The CSS handles the animation. When inactive, bars collapse via inline override.

**JOrb** renders a single `position:relative` container holding 4 ring divs, 12 tick mark divs, 1 inner circle div, and 1 listening indicator div. Ring rotation speeds are computed from `state`. Tick mark positions are computed with `Math.sin/cos` at render time (no DOM measurement needed).

---

## Component Contracts

### JArcMeter

```tsx
export interface JArcMeterProps {
  level:        number                         // 0–totalArcs, how many segments are lit
  totalArcs?:   number                         // default: 6
  color?:       JColor                         // default: 'cyan'
  orientation?: 'horizontal' | 'vertical'     // default: 'horizontal'
  showLabel?:   boolean                        // default: false
  label?:       string                         // default: 'LEVEL'
  showValue?:   boolean                        // default: false
  arcWidth?:    string                         // default: '8px'
  arcGap?:      string                        // default: '3px'
}
```

**Height lookup array** (creates arc shape — taller in center):
```ts
const ARC_HEIGHTS = [6, 10, 14, 14, 10, 6, 8, 12, 16, 16, 12, 8]
// index wraps: heights[i % ARC_HEIGHTS.length]
```

**Segment shape:** `clipPath: 'polygon(1px 15%, 100% 0, 100% 100%, 1px 85%)'` — the LINKS Mark II parallelogram.

**Segment styles:**
- Inactive: `background: 'var(--j-accent-05)'`
- Active: `background: 'var(--j-accent)'`, `boxShadow: '0 0 5px var(--j-accent-25)'`
- Peak (index === level - 1 when level > 0): `background: 'linear-gradient(0deg, var(--j-accent-12), var(--j-accent))'`, `boxShadow: '0 0 10px var(--j-accent), 0 0 20px var(--j-accent-25)'`, `animation: 'j-pulse 0.6s ease-in-out infinite'`

**Horizontal mode** (default):
- Segment: `width: arcWidth; height: ${ARC_HEIGHTS[i % ARC_HEIGHTS.length]}px`
- Flex container: `display:flex; alignItems:flex-end; gap:arcGap`

**Vertical mode:**
- Segment: `width: ${ARC_HEIGHTS[i % ARC_HEIGHTS.length]}px; height: 4px`
- Flex container: `display:flex; flexDirection:column-reverse; alignItems:center; gap:arcGap`

**Label** (above segments, when `showLabel=true`):
```
fontSize: 8, color: 'var(--j-accent-12)', letterSpacing: '0.12em',
textTransform: 'uppercase', marginBottom: 4, textAlign: 'center'
```

**Numeric readout** (below segments, when `showValue=true`):
```
fontSize: 9, letterSpacing: '0.10em', marginTop: 4, textAlign: 'center',
color: level > 0 ? 'var(--j-accent)' : 'var(--j-text-dim)', transition: 'color 0.2s'
text: `${level} / ${totalArcs}`
```

**Wrapper:** `display:inline-flex; flexDirection:column; alignItems:center`

---

### JWaveform

```tsx
export interface JWaveformProps {
  barCount?: number    // default: 20
  height?:   string    // default: '32px'
  color?:    JColor    // default: 'cyan'
  active?:   boolean   // default: true
}
```

**Bar heights lookup** (index wraps):
```ts
const WV_HEIGHTS = [6, 14, 22, 18, 28, 20, 30, 24, 28, 22, 16, 20, 26, 18, 12, 22, 28, 18, 10, 14]
```

**Duration lookup** (index wraps):
```ts
const WV_DURS = ['.4s', '.5s', '.6s', '.4s', '.7s', '.5s', '.6s', '.4s', '.8s', '.5s']
```

**Delay per bar:** `${(i * 0.04).toFixed(2)}s`

**Container:**
```tsx
<div
  className="j-waveform"
  style={{ height, opacity: active ? 1 : 0.3 }}
>
```

**Each bar:**
```tsx
<div
  className="j-wv"
  style={{
    height:    `${WV_HEIGHTS[i % WV_HEIGHTS.length]}px`,
    background: 'var(--j-accent)',
    '--j-wv-dur': WV_DURS[i % WV_DURS.length],
    '--j-wv-dly': `${(i * 0.04).toFixed(2)}s`,
    ...(active ? {} : { transform: 'scaleY(0.15)', animationPlayState: 'paused' }),
  } as React.CSSProperties}
/>
```

**Note on color:** `JColor` prop is accepted for API consistency but the `j-waveform` CSS class always resolves to `var(--j-accent)`. The color prop controls the theme-level accent, not per-component. This matches Blazor behavior where `_colorClass` maps to theme color and background is always `var(--j-accent)`.

---

### JOrb

```tsx
export interface JOrbProps {
  systemName?: string      // default: 'JARVIS'
  size?:       string      // default: '160px'
  color?:      JColor      // default: 'cyan'
  state?:      JState      // default: 'active'
  listening?:  boolean     // default: false
  onClick?:    () => void
}
```

**Ring speed lookup:**
```ts
function getRingSpeeds(state: JState): { r1: string; r2: string; r3: string } {
  if (state === 'processing') return { r1: '2s',  r2: '1.2s', r3: '1.8s' }
  if (state === 'idle')       return { r1: '8s',  r2: '6s',   r3: '9s'   }
  return                             { r1: '4s',  r2: '3s',   r3: '5s'   }
}
```

**State label:**
```ts
function getStateLabel(state: JState, listening: boolean): string {
  if (state === 'idle')       return 'Idle'
  if (state === 'processing') return 'Processing'
  if (state === 'warning')    return 'Warning'
  if (state === 'error')      return 'Error'
  return listening ? 'Listening' : 'Online'
}
```

**DOM tree (all children `position:absolute` inside wrapper):**

```
<div> ← wrapper: position:relative, width:size, height:size, cursor:pointer
  <div> ← outer dashed ring (inset:0, border-radius:50%, border:1px dashed)
  {12 tick marks} ← width:2px, height:4px, trig-positioned
  <div> ← ring 1 (inset:8px, border-radius:50%, border:1px solid)
  <div> ← ring 2 (inset:16px, border-radius:50%, split top/bottom)
  <div> ← ring 3 (inset:24px, border-radius:50%, split, counter-rotating)
  <div> ← inner circle (inset:32px, border-radius:50%, radial-gradient)
    <div> ← inner glow overlay
    <div> ← text block
      <div> ← systemName (j-glitch animation)
      <div> ← stateLabel (j-pulse animation)
  <div> ← listening indicator (position:absolute, bottom:18%, centered)
    <div> ← dot (10px circle, accent or dim)
```

**Outer dashed ring:**
```ts
{
  position: 'absolute', borderRadius: '50%', inset: 0,
  border: '1px dashed var(--j-accent)', opacity: 0.08,
  animation: `j-spin 10s linear infinite`,
}
```

**12 tick marks** (i = 0..11, angle = i * 30):
```ts
const rad = angle * Math.PI / 180
const r   = 48  // % of half-size
const x   = 50 + r * Math.sin(rad)
const y   = 50 - r * Math.cos(rad)
{
  position: 'absolute', width: 2, height: 4,
  background: 'var(--j-accent)', opacity: 0.35,
  left: `${x.toFixed(1)}%`, top: `${y.toFixed(1)}%`,
  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
}
```

**Ring 1 (inset 8px):**
```ts
{
  position: 'absolute', borderRadius: '50%', inset: 8,
  border: '1px solid var(--j-accent)', opacity: 0.35,
  animation: `j-spin ${speeds.r1} linear infinite`,
}
```

**Ring 2 (inset 16px):**
```ts
{
  position: 'absolute', borderRadius: '50%', inset: 16,
  border: '1.5px solid transparent',
  borderTopColor: 'var(--j-accent)', borderBottomColor: 'var(--j-accent)66',
  boxShadow: '0 0 6px var(--j-accent-25)',
  animation: `j-spin ${speeds.r2} linear infinite`,
}
```

**Ring 3 (inset 24px, counter-rotating):**
```ts
{
  position: 'absolute', borderRadius: '50%', inset: 24,
  border: '1.5px solid transparent',
  borderTopColor: 'var(--j-accent)', borderBottomColor: 'var(--j-accent)66',
  boxShadow: '0 0 6px var(--j-accent-25)',
  animation: `j-spin-rev ${speeds.r3} linear infinite`,
}
```

**Inner circle (inset 32px):**
```ts
{
  position: 'absolute', borderRadius: '50%', inset: 32,
  background: 'radial-gradient(circle at 38% 36%, var(--j-accent-12), var(--j-bg) 70%)',
  border: '1px solid var(--j-accent)44',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  boxShadow: 'inset 0 0 20px var(--j-accent-25), 0 0 16px var(--j-accent-25)',
  overflow: 'hidden',
}
```

**System name div:**
```ts
{
  fontSize: 14, fontWeight: 600, color: 'var(--j-text-primary)',
  letterSpacing: '0.16em', textTransform: 'uppercase',
  textShadow: '0 0 16px var(--j-accent)',
  fontFamily: "'Courier New', monospace",
  animation: 'j-glitch 8s ease-in-out infinite',
}
```

**State label div:**
```ts
{
  fontSize: 9, color: 'var(--j-accent)', letterSpacing: '0.14em',
  textTransform: 'uppercase', marginTop: 2,
  fontFamily: "'Courier New', monospace",
  animation: 'j-pulse var(--j-dur-pulse) ease-in-out infinite',
}
```

**Listening indicator** (`position:absolute, bottom:'18%', left:'50%', transform:'translateX(-50%)'`):
- Outer: `width:24px; height:24px; borderRadius:50%; background:var(--j-bg); border:1px solid var(--j-accent)44; display:flex; alignItems:center; justifyContent:center`
- Dot: `width:10px; height:10px; borderRadius:50%; background: listening ? var(--j-accent) : var(--j-text-dim); boxShadow: listening ? 0 0 12px var(--j-accent)... : none; animation: listening ? j-pulse 1.2s ease-in-out infinite : none; transition:all 0.3s`

---

## File Structure

```
packages/jarvis-ui/src/components/ui/
├── JArcMeter.tsx           (new)
├── JArcMeter.test.tsx      (new)
├── JWaveform.tsx           (new)
├── JWaveform.test.tsx      (new)
├── JOrb.tsx                (new)
├── JOrb.test.tsx           (new)
```

---

## Index Exports (to add)

```ts
// Components — HUD visualizations
export type { JArcMeterProps } from './components/ui/JArcMeter'
export { JArcMeter } from './components/ui/JArcMeter'
export type { JWaveformProps } from './components/ui/JWaveform'
export { JWaveform } from './components/ui/JWaveform'
export type { JOrbProps } from './components/ui/JOrb'
export { JOrb } from './components/ui/JOrb'
```

---

## Testing Strategy

**JArcMeter:**
- Renders correct number of segments
- Active segments styled with accent (check background style)
- Inactive segments styled with accent-05
- Peak segment (level-1) has animation
- `showLabel=true` renders label text
- `showValue=true` renders "N / M" readout
- Vertical orientation renders (smoke test)
- level=0 renders all inactive

**JWaveform:**
- Renders correct barCount divs with `j-wv` class
- Container has `j-waveform` class
- Inactive: wrapper has reduced opacity
- Inactive: bars have `animationPlayState:'paused'` in style
- Active (default): bars do not have paused state
- Custom barCount respected

**JOrb:**
- Renders systemName text
- Renders stateLabel for each state variant
- `listening=true` renders "Listening" label
- `listening=false` renders "Online" for active state
- `onClick` fires on click
- Renders 12 tick marks
- Has `j-glitch` class on system name span

---

## Production Quality Notes

- `border-radius:50%` on rings and indicator is intentional — circles by design
- Animation play state toggled via inline style override on `j-wv` bars (not CSS edit)
- Ring speeds recompute on every render — no memo needed (tiny string comparisons)
- Tick mark trig computed at render time — 12 iterations of `Math.sin/cos`, negligible cost
- No `useEffect`, no `useRef`, no subscriptions — all components are pure render functions
