# Phase 4: Display Atoms + Feedback Overlays — Design Spec

> **For agentic workers:** After this spec is approved, use `superpowers:writing-plans` to create the implementation plan.

**Goal:** Port 11 Blazor components covering display atoms (JBadge, JStatusPill, JProgress, JDivider, JHudLabel), feedback widgets (JAlert, JDataRow), overlay system (JModal, JToast, JToastProvider + useToast hook), and the composite stat card (JStatCard).

**Phase context:**
- Phase 1 (Foundation): JThemeProvider, JarvisTokens, PRESETS — DONE
- Phase 2 (Layout): JHudBar, JSpinner, JNavItem, JSidebar, JPageLayout, JHudFrame, JHudFrameCard — DONE
- Phase 3 (Core UI): JButton, JCard, JInput, JTextArea, JSelect, JCheckbox, JRadio, JToggle, JSlider, JFormField, JDatePicker, JDateRangePicker, JTimePicker — DONE
- **Phase 4 (this spec):** Display Atoms + Feedback Overlays — 11 components
- Phase 5 (future): Charts (recharts)
- Phase 6 (future): Data Table (JTable, JPagination)

---

## Global Constraints

- **Repo root:** `D:\Claude\HUD Theme\HUDtheme\`
- **Library package:** `packages/jarvis-ui/src/`
- **Blazor source (read-only reference):** `D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI\Components\`
- **All colors:** `var(--j-*)` CSS variables only — no hardcoded hex in TSX
- **No `border-radius`** on HUD components — use `clip-path` polygons instead (exception: `JBadge` Pill shape uses `borderRadius: '999px'` as that is the Blazor source's intent)
- **Font:** `'Courier New', monospace` everywhere
- **CSS files:** copied verbatim — do not edit `jarvis-ui.css`, `jarvis-charts.css`, `jarvis-maps.css`, `jarvis-theme.css`
- **Inline style pattern:** All new atoms use `React.CSSProperties` inline (no CSS class for the component's own styling) — same as JInput/JCheckbox/JToggle from Phase 3
- **CSS class pattern:** JHudLabel and JDataRow render using existing `j-hl-*` / `j-data-*` classes already in `jarvis-ui.css` — same read-only class pattern as JCard's decoration classes
- **TDD:** Write failing test first, verify it fails, implement, verify it passes, commit
- **Test wrapper:** `function W({ children }) { return <JThemeProvider>{children}</JThemeProvider> }`
- **PowerShell PATH:** `$env:PATH = "C:\Program Files\nodejs;C:\Users\DCHOUGALE\AppData\Roaming\npm;" + $env:PATH`
- **Test run command:** `pnpm --filter jarvis-ui test`
- **No `border-radius` anywhere except JBadge Pill shape**

---

## Architecture

### Pattern Continuity

Two styling patterns are carried forward from earlier phases:

**Inline style pattern** (JInput origin): components whose look has no CSS class equivalent use `React.CSSProperties` objects. All clip-paths, backgrounds, borders are expressed as inline style properties.

**CSS class pattern** (JCard origin): components that already have CSS classes in `jarvis-ui.css` use those class names directly. The implementer reads the Blazor `.razor` source and applies the identical class names. Do not add new CSS.

### New Patterns Introduced in Phase 4

**Portal pattern (JModal):** `JModal` is the first component to use `ReactDOM.createPortal`. The backdrop and dialog are rendered into `document.body` to escape any parent stacking context. Import: `import { createPortal } from 'react-dom'`.

**Context/hook pattern (JToastProvider + useToast):** Phase 4 introduces the library's first global context. Structure:
```
JToastContext  (React.createContext, holds { show, dismiss })
JToastProvider (component: manages ToastItem[] state, renders fixed overlay, provides context)
useToast()     (hook: calls useContext(JToastContext), throws if used outside provider)
```
All three live in `packages/jarvis-ui/src/components/ui/JToastProvider.tsx`.

**Composite pattern (JStatCard):** `JStatCard` wraps `JCard` and internally renders `JBadge`, `JProgress`, and `JDataRow` — the first fully composite component in the library.

### Build Order (Task Sequence)

Components must be built in dependency order:

```
Task 1: JBadge + JStatusPill        — state-color atoms (prerequisite for JStatCard)
Task 2: JProgress + JDivider + JHudLabel  — display primitives (JProgress needed by JStatCard)
Task 3: JAlert + JDataRow           — feedback atom + data row (JDataRow needed by JStatCard)
Task 4: JModal                      — first portal component
Task 5: JToast + JToastProvider + useToast  — toast context system
Task 6: JStatCard                   — composite (wraps JCard + JBadge + JProgress + JDataRow)
Task 7: index.ts exports + final commit
```

---

## Component Specifications

### JBadge

**File:** `packages/jarvis-ui/src/components/ui/JBadge.tsx`
**Blazor source:** `Components/JBadge.razor`

**Props:**
```ts
export type JBadgeShape = 'angular' | 'hex' | 'diamond' | 'pill'

export interface JBadgeProps {
  color?:    JColor        // default: 'cyan'
  size?:     JSize         // default: 'sm'
  shape?:    JBadgeShape   // default: 'angular'
  state?:    JState        // overrides color when set to Warning/Error/Success
  blink?:    boolean       // default: false
  showDot?:  boolean       // default: false
  children?: ReactNode
}
```

**Behavior:**
- Rendered as `<span>` with inline CSSProperties
- `color` determines background/text/border from this exact map:
  - `cyan`:  `background: var(--j-accent-12)`, `color: var(--j-cyan)`, `border: 1px solid var(--j-accent-35)`
  - `amber`: `background: var(--j-warn-12)`, `color: var(--j-amber)`, `border: 1px solid var(--j-warn-25)`
  - `red`:   `background: var(--j-err-12)`, `color: var(--j-red)`, `border: 1px solid var(--j-err-25)`
  - `green`: `background: var(--j-ok-12)`, `color: var(--j-green)`, `border: 1px solid var(--j-ok-25)`
  - `ghost`: `background: var(--j-accent-05)`, `color: var(--j-text-muted)`, `border: 1px solid var(--j-border-dim)`
- `size` determines font + padding:
  - `xs`: fontSize 8, padding `2px 7px`
  - `sm`: fontSize 9, padding `3px 9px`
  - `md`: fontSize 10, padding `4px 12px`
  - `lg`: fontSize 11, padding `5px 14px`
- `shape` determines clip-path (all inline):
  - `angular`: `clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)`
  - `hex`:     `clip-path: polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)`, extra side padding `14px`
  - `diamond`: `clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`, `width: 36px`, `height: 36px`, `display: inline-flex`, `alignItems: center`, `justifyContent: center`, `padding: 0`
  - `pill`:    `borderRadius: '999px'` (only exception to no-border-radius rule)
- `blink=true` adds CSS class `j-blink` on the span
- `showDot=true` renders a `<span className="j-status-dot">` before children with dot color per `color`
- `letterSpacing: '0.10em'`, `fontFamily: "'Courier New', monospace"`, `textTransform: 'uppercase'`

---

### JStatusPill

**File:** `packages/jarvis-ui/src/components/ui/JStatusPill.tsx`
**Blazor source:** `Components/JStatusPill.razor`

**Props:**
```ts
export interface JStatusPillProps {
  state?:    JState    // default: 'active'
  blink?:    boolean   // default: false
  children?: ReactNode
}
```

**Behavior:**
- Outer `<div>` with inline style: `display:flex; alignItems:center; gap:8; padding:7px 16px 7px 12px; clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)`
- Left border: `borderLeft: '2px solid <stateColor>'`
- Background per state: `active` → `var(--j-accent-08)`, `warning` → `var(--j-warn-05)`, `error` → `var(--j-err-05)`, `success` → `var(--j-ok-05)`, `idle` → `var(--j-accent-05)`
- State accent color (`stateColor`):
  - `active`: `var(--j-accent)`
  - `warning`: `var(--j-warn)`
  - `error`: `var(--j-err)`
  - `success`: `var(--j-ok)`
  - `idle`: `var(--j-accent-18)`
- Inner dot: `<span className="j-status-dot">` — the CSS class handles pulse animation. Override `animationDuration` per state: `warning` → `1.8s`, `error` → `0.7s`, `success` → `2.5s`, `idle` → remove animation entirely (`animation: 'none'`)
- Text: `<span>` with `fontSize:11, letterSpacing:'0.08em'`, color = stateColor
- `blink=true` adds CSS class `j-blink-slow` on outer div

---

### JProgress

**File:** `packages/jarvis-ui/src/components/ui/JProgress.tsx`
**Blazor source:** `Components/JProgress.razor`

**Props:**
```ts
export type JProgressVariant = 'bar' | 'ticks'

export interface JProgressProps {
  value?:         number           // 0–100, default: 0
  label?:         string
  color?:         JColor           // default: 'cyan'
  state?:         JState           // default: 'active'
  variant?:       JProgressVariant // default: 'bar'
  indeterminate?: boolean          // default: false — bar variant only
  showPercent?:   boolean          // default: true
  total?:         number           // default: 16 — ticks variant only
}
```

**Behavior — Bar variant:**
- Optional label row: `fontSize:9, letterSpacing:'0.10em', textTransform:'uppercase', color:'var(--j-accent-50)'` with right-aligned percentage when `showPercent && !indeterminate`
- Track: `height:5, background:'var(--j-accent-08)', clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)`
- Fill (normal): `width: value%`, `background: linear-gradient(90deg, var(--j-accent-deep), var(--j-accent))`, same clip-path, `transition: 'width 0.6s ease-out'`
- Indeterminate: full-width base `opacity:0.15` + absolutely positioned scan `div` animating via CSS class `j-scan-h` (`animation: j-scan-h 1.4s ease-in-out infinite`)

**Behavior — Ticks variant:**
- Renders `total` tick divs in a row using CSS class `j-tick-row` / `j-tk`
- Active ticks: `Math.round(value / 100 * total)`
- Tick heights cycle: `[12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10]` repeating (index % 12)
- Inactive ticks get class `off`
- State color overrides tick background via inline style on each tick: `warning` → `background:var(--j-amber)`, `error` → `background:var(--j-red)`, `success` → `background:var(--j-green)`, default → none (CSS handles)

---

### JDivider

**File:** `packages/jarvis-ui/src/components/ui/JDivider.tsx`
**Blazor source:** `Components/JDivider.razor`

**Props:**
```ts
export type JDividerOrientation = 'horizontal' | 'vertical'

export interface JDividerProps {
  orientation?: JDividerOrientation  // default: 'horizontal'
  label?:       string
  showDot?:     boolean              // default: true
  height?:      string               // default: '40px' — vertical only
  margin?:      string               // default: '8px 0'
  opacity?:     number               // default: 0.30
}
```

**Behavior:**
- Horizontal: `display:flex; alignItems:center; margin` — two gradient lines flanking center
  - Left line: `flex:1; height:1; background: linear-gradient(90deg, transparent, var(--j-accent)); opacity`
  - Center: if `label` → `<span>` (fontSize:8, uppercase, color:var(--j-accent), opacity:0.7); else if `showDot` → `<div>` with diamond clip-path + `j-pulse` animation
  - Right line: mirrored (gradient reversed)
- Vertical: `display:flex; flexDirection:column; alignItems:center; height`
  - Top line: `flex:1; width:1; background: linear-gradient(180deg, transparent, var(--j-accent)); opacity`
  - Center dot (if showDot): same diamond
  - Bottom line: mirrored

---

### JHudLabel

**File:** `packages/jarvis-ui/src/components/ui/JHudLabel.tsx`
**Blazor source:** `Components/JHudLabel.razor`

**Props:**
```ts
export type JHudLabelVariant = 'chip' | 'callout' | 'circuit' | 'badge' | 'panel'

export interface JHudLabelProps {
  variant?:  JHudLabelVariant  // default: 'chip'
  text:      string
  subText?:  string
  value?:    string
  color?:    JColor            // default: 'cyan'
  showDot?:  boolean           // default: true
  showLine?: boolean           // default: true
}
```

**Behavior:**
- Outer div: className `j-hl j-hl-{variant} j-color-{color}` (uses existing CSS classes)
- Each variant renders its internal structure using `j-hl-*` CSS classes matching the Blazor source exactly:
  - `chip`: `j-hl-chip` > optional `j-hl-pip` + `j-hl-text` + optional `j-hl-val` + optional `j-hl-line-h`
  - `callout`: `j-hl-callout` > `j-hl-callout-inner` (sub + main) + optional `j-hl-callout-line` (seg + dot)
  - `circuit`: `j-hl-circuit` > `j-hl-cir-bracket` (label + val) + optional `j-hl-cir-arm` (node + track + node-end)
  - `badge`: `j-hl-badge` > `j-hl-badge-ring` (val) + `j-hl-badge-label`
  - `panel`: `j-hl-panel` > `j-hl-panel-top` (sub) + `j-hl-panel-body` (main + val) + `j-hl-panel-scan`

---

### JAlert

**File:** `packages/jarvis-ui/src/components/ui/JAlert.tsx`
**Blazor source:** `Components/JAlert.razor`

**Props:**
```ts
export interface JAlertProps {
  state?:       JState     // default: 'active'
  title?:       string
  children?:    ReactNode
  dismissible?: boolean    // default: false
  blink?:       boolean    // default: false
  onDismiss?:   () => void
}
```

**Behavior:**
- Manages internal `visible` boolean state (initially `true`)
- When `visible=false`, renders nothing
- Outer div inline style: `position:relative; display:flex; alignItems:flex-start; gap:10; padding:10px 14px 10px 16px; clip-path:polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)`
- Background per state: `active` → `var(--j-accent-05)`, `warning` → `var(--j-warn-05)`, `error` → `var(--j-err-05)`, `success` → `var(--j-ok-05)`, `idle` → `var(--j-accent-05)`
- Left accent rail: `position:absolute; top:0; bottom:0; left:0; width:2px; background:<accentColor>; boxShadow:0 0 8px <accentColor>` + optional pulse animation for `error` (0.8s) and `warning` (1.5s)
- Icon: `<span>` — `active`/`idle` → `ℹ`, `warning` → `⚠`, `error` → `✕`, `success` → `✓`; color = accentColor, textShadow glow
- Content: `<div flex:1>` — optional title (uppercase, fontWeight:600, letterSpacing:0.10em, marginBottom:2) + children; color = accentColor
- Dismiss button (if `dismissible`): transparent bg, `color:<accentColor>`, `opacity:0.6`, renders `✕`, calls `setVisible(false)` + `onDismiss?.()`
- `blink=true` adds class `j-blink-slow` on outer div

State accent colors:
- `active`: `var(--j-accent)`
- `warning`: `var(--j-warn)`
- `error`: `var(--j-err)`
- `success`: `var(--j-ok)`
- `idle`: `var(--j-accent-35)`

---

### JDataRow

**File:** `packages/jarvis-ui/src/components/ui/JDataRow.tsx`
**Blazor source:** `Components/JDataRow.razor`

**Props:**
```ts
export interface JDataRowProps {
  label:       string
  value:       string
  barPercent?: number   // 0–100; if omitted, no bar rendered
  state?:      JState   // default: 'active'
}
```

**Behavior:**
- Renders `<div className="j-data-row">` (CSS class handles layout — flex row with gap)
- `<span className="j-data-key">` for label
- Optional `<div className="j-data-bar">` containing `<div className="j-data-bar-fill" style={{ '--j-w': `${barPercent}%`, ...stateBarColor }}>` — note CSS custom property `--j-w` drives the bar width via existing CSS
- `<span className="j-data-val" style={stateValColor}>` for value
- State bar gradient: `warning` → `linear-gradient(90deg,var(--j-warn-12),var(--j-warn))`, `error` → err variant, `success` → ok variant, default → none
- State val color: `warning` → `var(--j-amber)`, `error` → `var(--j-red)`, `success` → `var(--j-green)`, default → none

---

### JModal

**File:** `packages/jarvis-ui/src/components/ui/JModal.tsx`
**Blazor source:** `Components/JModal.razor`

**Props:**
```ts
export interface JModalProps {
  open:              boolean
  onClose:           () => void
  title:             string
  subTitle?:         string
  closable?:         boolean    // default: true
  closeOnBackdrop?:  boolean    // default: true
  width?:            string     // default: '480px'
  notchSize?:        string     // default: '18px'
  children?:         ReactNode
  footer?:           ReactNode
}
```

**Behavior:**
- When `open=false` → returns `null`
- When `open=true` → `createPortal(jsx, document.body)`
- Backdrop: `position:fixed; inset:0; zIndex:1000; background:var(--j-bg-overlay); backdropFilter:blur(2px)` — click calls `onClose` if `closeOnBackdrop=true`
- Dialog: `position:fixed; zIndex:1001; top:50%; left:50%; transform:translate(-50%,-50%); width:<width>; maxWidth:calc(100vw - 32px); background:var(--j-bg-card); overflow:hidden; clip-path:polygon(<notchSize> 0%, 100% 0%, 100% calc(100% - <notchSize>), calc(100% - <notchSize>) 100%, 0% 100%, 0% <notchSize>); border:1px solid var(--j-accent); fontFamily:'Courier New',monospace`
- Scan line: `position:absolute; left:0; right:0; height:1px; top:-1px; background:linear-gradient(90deg,transparent,var(--j-cyan),transparent); animation:j-scan-v 3s ease-in-out infinite`
- Four corner brackets (absolute positioned, each 14×14): `borderColor:var(--j-accent); borderStyle:solid; borderWidth:0; filter:drop-shadow(0 0 4px var(--j-accent)); animation:j-corner-blink 3s ease-in-out infinite` — each corner gets 2px border on its two relevant sides (tl: top+left, tr: top+right, bl: bottom+left, br: bottom+right)
- Triangle top-left accent: absolute, `border:<notchSize> solid transparent; borderTopColor:var(--j-accent); borderLeftColor:var(--j-accent); animation:j-pulse`
- Header: `padding:14px 18px 10px; borderBottom:1px solid var(--j-accent-12); display:flex; alignItems:center; justifyContent:space-between`
  - Left: optional subTitle (fontSize:8, opacity:0.7, uppercase) above title (fontSize:13, fontWeight:600, uppercase)
  - Right: close button if `closable=true` — calls `onClose`, hover color `var(--j-accent)` via onMouseOver/onMouseOut
- Body: `padding:16px 18px; color:var(--j-text-secondary); fontSize:12; lineHeight:1.6; letterSpacing:0.04em`
- Footer (if `footer` prop provided): `padding:10px 18px 14px; borderTop:1px solid var(--j-accent-08); display:flex; alignItems:center; gap:10; justifyContent:flex-end`

---

### JToast + JToastProvider + useToast

**File:** `packages/jarvis-ui/src/components/ui/JToastProvider.tsx`
**Blazor source:** `Components/JToast.razor`, `Components/JToastProvider.razor`

All three exports live in the same file.

**ToastItem model (internal):**
```ts
interface ToastItem {
  id:       string
  state:    JState
  message:  string
  title?:   string
  duration: number   // ms; 0 = persistent
}
```

**JToastContext:**
```ts
interface ToastContextValue {
  show:    (state: JState, message: string, title?: string, duration?: number) => string
  dismiss: (id: string) => void
}
const JToastContext = React.createContext<ToastContextValue | null>(null)
```

**JToastProvider component:**
- Manages `ToastItem[]` state
- `show`: creates `ToastItem` with `id = Date.now().toString() + Math.random()`, appends to state, returns id
- `dismiss`: removes item by id from state
- Provides context value `{ show, dismiss }`
- Renders `{children}` + fixed overlay: `position:fixed; bottom:24px; right:24px; zIndex:2000; display:flex; flexDirection:column-reverse; gap:8; pointerEvents:none; width:320px`
- Overlay maps `toasts` to `<JToast key={id} ...model onDismiss={() => dismiss(id)} />`

**JToast component (internal, not exported):**
- Props: `ToastItem & { onDismiss: () => void }`
- `useEffect(() => { if (duration <= 0) return; const t = setTimeout(onDismiss, duration); return () => clearTimeout(t) }, [duration, onDismiss])`
- State color (`stateColor`): `active` → `var(--j-accent)`, `warning` → `var(--j-warn)`, `error` → `var(--j-err)`, `success` → `var(--j-ok)`
- Icon: same mapping as JAlert
- Rail animation: `error` → `j-pulse 0.7s`, `warning` → `j-pulse 1.3s`, others → none
- Outer style: `position:relative; overflow:hidden; cursor:pointer; background:var(--j-bg-card); border:1px solid color-mix(in srgb,<stateColor> 25%,transparent); clip-path:polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px); boxShadow:0 0 16px color-mix(in srgb,<stateColor> 18%,transparent); fontFamily:'Courier New',monospace; animation:j-slide-in 0.3s ease-out both; pointerEvents:all`
- Left rail: `position:absolute; top:0; bottom:0; left:0; width:2; background:<stateColor>; boxShadow:0 0 8px <stateColor>` + optional rail animation
- Scan line: `position:absolute; left:0; right:0; height:1px; top:-1px; animation:j-scan-v 2.5s`
- Corner accent (top-right): `position:absolute; top:0; right:0; width:0; height:0; border:8px solid transparent; borderTopColor:<stateColor>; borderRightColor:<stateColor>; opacity:0.5`
- Content area: icon + title (optional, fontSize:9 uppercase) + message (fontSize:11)
- Progress bar at bottom (if `duration > 0`): `height:2; background:color-mix(in srgb,<stateColor> 8%,transparent)` > inner div: `animation:j-bar-grow <duration>ms linear forwards; --j-w:100%`

**`useToast()` hook (exported):**
```ts
export function useToast(): ToastContextValue {
  const ctx = useContext(JToastContext)
  if (!ctx) throw new Error('useToast must be used within JToastProvider')
  return ctx
}
```

**Exports from this file:** `JToastProvider`, `useToast`. `JToast` and `JToastContext` remain internal.

**JToastProviderProps** (exported for index.ts):
```ts
export interface JToastProviderProps { children: ReactNode }
```

---

### JStatCard

**File:** `packages/jarvis-ui/src/components/ui/JStatCard.tsx`
**Blazor source:** `Components/JStatCard.razor`

**Props:**
```ts
export interface JStatCardDataRow {
  label:       string
  value:       string
  barPercent?: number
}

export interface JStatCardProps {
  // Card frame (passed to JCard)
  cardStyle?:  JCardStyle      // default: 's1'
  color?:      JColor          // default: 'cyan'
  state?:      JState          // default: 'active'
  showScan?:   boolean         // default: true

  // Content
  title:       string
  value:       string
  sub?:        string
  badge?:      string          // text; if set, renders JBadge top-right
  badgeColor?: JColor          // default: 'cyan'
  showStatusDot?: boolean      // default: false — renders j-status-dot before sub text
  barValue?:   number          // 0–100; renders JProgress bar below value if set
  dataRows?:   JStatCardDataRow[]  // renders JDataRow list below value
  children?:   ReactNode       // extra content slot at bottom
}
```

**Behavior:**
- Wraps `<JCard cardStyle={cardStyle} color={color} state={state} showScan={showScan}>`
- Title row: `display:flex; alignItems:center; justifyContent:space-between; marginBottom:4` — `<div className="j-text-xs">{title}</div>` left, optional `<JBadge color={badgeColor} size="xs">{badge}</JBadge>` right
- Value: `<div className={valueClass}>` where valueClass maps state to `j-text-val` + optional `j-text-warn` / `j-text-err` / `j-text-ok`
- Sub (if provided): `<div className="j-text-sub">` + optional `<span className="j-status-dot">` when `showStatusDot=true` with state-driven dot color
- Progress bar (if `barValue` provided): `<div style={{marginTop:8}}><JProgress value={barValue} variant="bar" showPercent={false} /></div>`
- Data rows (if `dataRows?.length`): `<div style={{marginTop:8}}>` wrapping `dataRows.map(r => <JDataRow key={r.label} label={r.label} value={r.value} barPercent={r.barPercent} />)`
- Children slot at bottom if provided

State-driven value class:
- `warning` → add `j-text-warn`
- `error` → add `j-text-err`
- `success` → add `j-text-ok`
- default → just `j-text-val`

---

## Testing Strategy

### Pattern
Same TDD as Phases 2–3: write failing test → verify RED → implement → verify GREEN → commit.

### Test wrapper
```ts
function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}
```

### Per-component test cases

**JBadge:**
- Renders children
- `shape="angular"` → clip-path polygon in style
- `shape="pill"` → borderRadius in style
- `color="amber"` → `var(--j-warn-12)` background in style
- `blink=true` → element has class `j-blink`
- `showDot=true` → dot element present

**JStatusPill:**
- Renders children
- `state="error"` → `var(--j-err)` in border style
- `blink=true` → class `j-blink-slow` present
- State dot animation duration overridden per state

**JProgress:**
- Bar variant: value=75 → fill div has width `75%` in style
- Bar variant: indeterminate=true → no width%, scan div present
- Bar variant: label rendered, percent shown when showPercent=true
- Ticks variant: renders `total` tick divs; activeTicks = Math.round(75/100*16) = 12 of 16 have no `off` class
- State error → `var(--j-red)` background on ticks

**JDivider:**
- Horizontal (default) → two gradient line divs
- `label="Test"` → label span rendered, no dot
- Vertical → flex-direction column container
- `showDot=false` → no diamond dot rendered

**JHudLabel:**
- `variant="chip"` → `j-hl-chip` class present
- `variant="callout"` → `j-hl-callout` class present
- `text="SENSOR-04"` → text rendered inside correct class
- `showLine=false` → line element absent

**JAlert:**
- Renders children and title
- `state="warning"` → `var(--j-warn)` in rail style
- `dismissible=true` → dismiss button present; click → component removed from DOM
- `blink=true` → class `j-blink-slow` present
- `onDismiss` called on dismiss

**JDataRow:**
- Renders label and value
- `barPercent=50` → bar fill div rendered with `--j-w: 50%`
- `state="error"` → `var(--j-red)` value color in style
- No barPercent → no bar div

**JModal:**
- `open=false` → nothing in DOM
- `open=true` → backdrop and dialog rendered via portal into document.body
- Dialog contains title text
- `subTitle` rendered when provided
- `footer` slot rendered when provided
- Backdrop click → `onClose` called (when `closeOnBackdrop=true`)
- `closeOnBackdrop=false` → backdrop click does NOT call `onClose`
- Close button click → `onClose` called
- `closable=false` → no close button

**JToastProvider + useToast:**
Setup: `vi.useFakeTimers()` / `vi.useRealTimers()` in before/after.
- `show()` → toast appears in DOM
- `dismiss(id)` → toast removed from DOM
- `duration=3000` → after `vi.advanceTimersByTime(3001)`, toast removed
- `duration=0` → after `vi.advanceTimersByTime(5000)`, toast still present
- `useToast()` outside provider → throws

**JStatCard:**
- title and value rendered
- `sub` rendered when provided; absent when not
- `badge` prop → JBadge rendered top-right
- `barValue=60` → JProgress present
- `dataRows` → JDataRow rows rendered
- `children` slot rendered

---

## File List

### Created
```
packages/jarvis-ui/src/components/ui/JBadge.tsx
packages/jarvis-ui/src/components/ui/JBadge.test.tsx
packages/jarvis-ui/src/components/ui/JStatusPill.tsx
packages/jarvis-ui/src/components/ui/JStatusPill.test.tsx
packages/jarvis-ui/src/components/ui/JProgress.tsx
packages/jarvis-ui/src/components/ui/JProgress.test.tsx
packages/jarvis-ui/src/components/ui/JDivider.tsx
packages/jarvis-ui/src/components/ui/JDivider.test.tsx
packages/jarvis-ui/src/components/ui/JHudLabel.tsx
packages/jarvis-ui/src/components/ui/JHudLabel.test.tsx
packages/jarvis-ui/src/components/ui/JAlert.tsx
packages/jarvis-ui/src/components/ui/JAlert.test.tsx
packages/jarvis-ui/src/components/ui/JDataRow.tsx
packages/jarvis-ui/src/components/ui/JDataRow.test.tsx
packages/jarvis-ui/src/components/ui/JModal.tsx
packages/jarvis-ui/src/components/ui/JModal.test.tsx
packages/jarvis-ui/src/components/ui/JToastProvider.tsx
packages/jarvis-ui/src/components/ui/JToastProvider.test.tsx
packages/jarvis-ui/src/components/ui/JStatCard.tsx
packages/jarvis-ui/src/components/ui/JStatCard.test.tsx
```

### Modified
```
packages/jarvis-ui/src/index.ts   (add exports for all 11 components + useToast hook)
```

---

## Exports to add to index.ts

```ts
// Display atoms
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

// Feedback
export type { JAlertProps } from './components/ui/JAlert'
export { JAlert } from './components/ui/JAlert'
export type { JDataRowProps } from './components/ui/JDataRow'
export { JDataRow } from './components/ui/JDataRow'

// Modal
export type { JModalProps } from './components/ui/JModal'
export { JModal } from './components/ui/JModal'

// Toast system
export type { JToastProviderProps } from './components/ui/JToastProvider'
export { JToastProvider, useToast } from './components/ui/JToastProvider'

// Composite
export type { JStatCardDataRow, JStatCardProps } from './components/ui/JStatCard'
export { JStatCard } from './components/ui/JStatCard'
```
