# Phase 5: Navigation Components — Design Spec

**Date:** 2026-06-20
**Phase:** 5 of N
**Components:** JTabs, JTab, JAccordion, JPagination
**Status:** Approved

---

## Overview

Four navigation components ported from Blazor to React. All follow the established inline-style pattern (no new CSS). Production-grade: ARIA roles, keyboard navigation, both controlled and uncontrolled API modes.

**Blazor sources (read-only reference):**
- `JarvisUI/Components/JTabs.razor`
- `JarvisUI/Components/JTab.razor`
- `JarvisUI/Components/JAccordion.razor`
- `JarvisUI/Components/JPagination.razor`

---

## Global Constraints

- Repo root: `D:\Claude\HUD Theme\HUDtheme\`
- Library: `packages/jarvis-ui/src/`
- All colors via `var(--j-*)` — no hardcoded hex
- No `border-radius` — use `clip-path` polygons everywhere
- Font: `'Courier New', monospace` on all elements
- CSS files are read-only — no edits
- Inline style pattern: all new components use `React.CSSProperties` objects
- TDD: write failing test first, confirm RED, implement, confirm GREEN, commit
- Test wrapper: `function W({ children }: { children: ReactNode }) { return <JThemeProvider>{children}</JThemeProvider> }`
- Test command: `pnpm --filter jarvis-ui test`
- Exact JState values: `'idle' | 'active' | 'processing' | 'warning' | 'error' | 'success'`
- Exact JColor values: `'cyan' | 'blue' | 'amber' | 'red' | 'green' | 'ghost' | 'white'`

---

## Architecture

### Registration Pattern (JTabs + JTab)

In Blazor, `JTab` registers itself with `JTabs` via `CascadingParameter.RegisterTab()`. The React equivalent uses two mechanisms together:

1. **`React.Children` scan** — JTabs reads child element props synchronously to build the tab strip. No async flicker.
2. **`JTabsContext`** — JTabs provides `{ activeTab, selectTab }` so JTab can read which tab is active and gate its content.
3. **`JTab._isJTab = true`** — static marker lets JTabs filter only `JTab` children from arbitrary `ReactNode`.

This keeps the JSX composition API (`<JTab>` inside `<JTabs>`) while avoiding the `useEffect`-registration timing issues that plagued the `JToastProvider` pattern on first render.

### JAccordion

Self-contained controlled/uncontrolled toggle. When `isOpen` prop is provided, the caller owns state. When omitted, internal `useState(defaultOpen ?? false)` governs. No parent context needed — multiple accordions are independent.

### JPagination

Fully controlled — no internal state. Caller owns `page`. Two display modes switch automatically on `totalPages`:
- `≤ 10`: tick bar mode (parallelogram SVG-style bars)
- `> 10`: numbered ellipsis mode (window of `pageSize` buttons, `···` separator)

---

## Component Contracts

### JTabs

```tsx
export interface JTabsProps {
  activeTab?:    string                     // controlled: caller owns active tab
  onTabChange?:  (key: string) => void      // fires on tab switch
  color?:        JColor                     // default: 'cyan'
  children:      ReactNode                  // JTab children
}
```

**Behavior:**
- **Uncontrolled** (`activeTab` omitted): internal `useState`, auto-selects first JTab on mount
- **Controlled** (`activeTab` provided): caller must update on `onTabChange`
- Tab strip: horizontal flex row, `borderBottom: '1px solid var(--j-accent-12)'`, `overflowX: 'auto'`
- Each tab button:
  - `clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)` — angular parallelogram
  - Active: `color: var(--j-accent)`, `textShadow: '0 0 8px var(--j-accent-50)'`
  - Inactive: `color: var(--j-text-muted)`
  - Hover (via `onMouseOver`): `color: var(--j-text-secondary)`
  - Active underline: `position:absolute; bottom:-1px; left:0; right:0; height:2px; background:var(--j-accent); boxShadow: 0 0 8px var(--j-accent)` + nested scan div `animation: j-scan-h 2s ease-in-out infinite`
- Icon: rendered as `<span style={{ fontStyle:'normal', fontSize:13 }}>` with glow filter when active
- Badge: `clip-path: polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)`, `background: var(--j-accent-12)`, `color: var(--j-accent-mid)`, `fontSize: 8`
- Content area: `<div style={{ paddingTop: 4 }}>{children}</div>` below the strip

**ARIA:**
- Tab strip `<div>`: `role="tablist"`
- Each tab `<button>`: `role="tab"`, `aria-selected={active}`, `id={`tab-${tabKey}`}`, `aria-controls={`panel-${tabKey}`}`
- Content area `<div>` for JTab: `role="tabpanel"`, `id={`panel-${tabKey}`}`, `aria-labelledby={`tab-${tabKey}`}`

**Keyboard:**
- `ArrowLeft` / `ArrowRight` on a tab button: moves focus + selects adjacent tab (wraps)
- `Home`: jump to first tab
- `End`: jump to last tab

**Disabled tabs:** tab `<button>` accepts `disabled?: boolean` on JTab — grayed out, not focusable, keyboard skips it

---

### JTab

```tsx
export interface JTabProps {
  tabKey:     string         // unique identifier within parent JTabs
  label:      string         // text shown on tab button
  icon?:      string         // emoji or symbol (optional)
  badge?:     string         // count or short label on tab (optional)
  disabled?:  boolean        // default: false
  children?:  ReactNode      // panel content
}
// Static marker so JTabs can identify JTab children
JTab._isJTab = true
```

**Behavior:**
- No visible markup of its own — purely a content gate
- Reads `JTabsContext`; renders `children` only when `ctx.activeTab === tabKey`
- When not active: returns `null`
- Wraps content in `<div role="tabpanel" id={`panel-${tabKey}`} aria-labelledby={`tab-${tabKey}`}>`

**Note:** `tabKey` is named `tabKey` (not `key`) because `key` is a reserved React prop and cannot be read as a regular prop.

---

### JAccordion

```tsx
export interface JAccordionProps {
  title:            string
  icon?:            string        // emoji/symbol before title
  badge?:           string        // short label right of title
  defaultOpen?:     boolean       // default: false — uncontrolled initial state
  isOpen?:          boolean       // controlled mode
  onIsOpenChange?:  (open: boolean) => void
  state?:           JState        // default: 'active'
  color?:           JColor        // default: 'cyan'
  children?:        ReactNode
}
```

**Accent color resolution:**
```ts
state === 'warning'  → 'var(--j-warn)'
state === 'error'    → 'var(--j-err)'
state === 'success'  → 'var(--j-ok)'
color === 'amber'    → 'var(--j-warn)'
color === 'red'      → 'var(--j-err)'
else                 → 'var(--j-accent)'
```

**Header layout** (`display:flex; alignItems:center; gap:10; padding:10px 14px 10px 16px; cursor:pointer`):
- **Left rail**: `position:absolute; top:0; bottom:0; left:0; width:2px; background:<accent>; boxShadow: 0 0 8px <accent>; clipPath: polygon(0 6px, 2px 0, 2px 100%, 0 calc(100% - 6px))`
- **Icon** (optional): `fontSize:13, color:<accent>, filter:drop-shadow(0 0 4px <accent>)`
- **Title**: `flex:1; fontSize:11; letterSpacing:0.10em; textTransform:uppercase; color: isOpen ? var(--j-text-primary) : var(--j-text-secondary); transition:color 0.2s`
- **Badge** (optional): `fontSize:8; color:<accent>; background:<accent>18; padding:1px 6px; clipPath:polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)`
- **Diamond chevron**: `width:8; height:8; background:<accent>; clipPath:polygon(50% 0%,100% 50%,50% 100%,0% 50%); opacity: isOpen ? 1 : 0.4; transform: isOpen ? rotate(0deg) : rotate(45deg); transition:transform 0.3s, opacity 0.2s; boxShadow: isOpen ? 0 0 8px <accent> : none`
- Header element is a `<button type="button">` for keyboard + accessibility

**Wrapper**: `border: 1px solid var(--j-accent-12); overflow:hidden; fontFamily: 'Courier New', monospace`

**Body** (rendered when open):
- `position:relative; padding:12px 14px 12px 16px; borderTop:1px solid var(--j-accent-12); background:var(--j-accent-05); overflow:hidden; animation:j-slide-in 0.25s ease-out`
- Scan line: `position:absolute; left:0; right:0; height:1px; top:-1px; background:linear-gradient(90deg, transparent, <accent>, transparent); animation:j-scan-v 3s ease-in-out infinite; pointerEvents:none`

**ARIA:**
- Header `<button>`: `aria-expanded={isOpen}`, `aria-controls="accordion-body-{id}"`
- Body `<div>`: `id="accordion-body-{id}"`, `role="region"`, `aria-labelledby="accordion-header-{id}"`
- Unique `id` generated via `useId()` (React 18)

---

### JPagination

```tsx
export interface JPaginationProps {
  page:           number
  onPageChange:   (page: number) => void
  totalPages:     number
  showFirstLast?: boolean    // default: false — show «/» first/last buttons
  showInfo?:      boolean    // default: true — "3 / 12" page info label
  pageSize?:      number     // default: 5 — visible page window in ellipsis mode
  color?:         JColor     // default: 'cyan'
}
```

**Container**: `display:flex; alignItems:center; gap:6; fontFamily:'Courier New',monospace`

**Nav buttons** (‹/›/«/»): `clip-path:polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%); padding:5px 10px; fontSize:11; letterSpacing:0.08em`
- Active: `background:var(--j-accent-12); border:1px solid var(--j-accent); color:var(--j-accent); boxShadow:0 0 8px var(--j-accent-44)`
- Normal: `background:transparent; border:1px solid var(--j-accent-18); color:var(--j-text-muted)`
- Disabled: `border:1px solid var(--j-accent-08); color:var(--j-accent-18); cursor:not-allowed`
- `disabled` HTML attribute when at boundary

**Tick bar mode** (`totalPages ≤ 10`):
- Container: `display:flex; alignItems:flex-end; gap:3`
- Each tick: `width:6px; cursor:pointer; clipPath:polygon(0 15%, 100% 0, 100% 100%, 0 85%); transition:all 0.2s`
  - Active: `height:18px; background:var(--j-accent); boxShadow:0 0 8px var(--j-accent); animation:j-pulse 2s ease-in-out infinite`
  - Inactive: `height:10px; background:var(--j-accent-18)`
- ARIA: `role="button"`, `aria-label={`Page ${p}`}`, `aria-current="page"` on active

**Ellipsis mode** (`totalPages > 10`):
- `pageSize` determines visible window centered on current page
- Window algorithm: `start = clamp(page - floor(pageSize/2), 1, totalPages - pageSize + 1)`, `end = start + pageSize - 1`
- Add 1 + `···` if start > 1; add `···` + totalPages if end < totalPages
- `···` rendered as `<span style={{ color:'var(--j-text-dim)', fontSize:10, padding:'0 4px' }}>···</span>`
- Page number buttons: same clip-path angular style as nav buttons; active = accent fill

**Info label**: `<span style={{ fontSize:9, color:'var(--j-text-dim)', letterSpacing:'0.10em', textTransform:'uppercase', marginLeft:8 }}>{page} / {totalPages}</span>`

**ARIA:**
- Wrapper `<nav>`: `aria-label="Pagination"`
- Active page button: `aria-current="page"`

---

## File Structure

```
packages/jarvis-ui/src/components/ui/
├── JTabs.tsx              (new)
├── JTabs.test.tsx         (new)
├── JTab.tsx               (new)
├── JTab.test.tsx          (new)
├── JAccordion.tsx         (new)
├── JAccordion.test.tsx    (new)
├── JPagination.tsx        (new)
├── JPagination.test.tsx   (new)
```

`JTabsContext` is defined inside `JTabs.tsx` (not a separate file) — it's an implementation detail, not part of the public API. It is **not** exported from `index.ts`.

---

## Index Exports (to add)

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

---

## Production Quality Checklist

These requirements apply to every component in this phase:

| Requirement | JTabs/JTab | JAccordion | JPagination |
|---|---|---|---|
| ARIA roles | tablist/tab/tabpanel | button/aria-expanded/region | nav/aria-current |
| Keyboard nav | ←→ Home End | Space/Enter (native button) | native buttons |
| Disabled state | per-tab `disabled` | header click guard | boundary buttons |
| Controlled mode | yes (`activeTab`) | yes (`isOpen`) | yes (always) |
| Uncontrolled mode | yes (internal state) | yes (`defaultOpen`) | n/a |
| Animation | scan underline | j-slide-in + scan-v | j-pulse on tick |
| useId() | tab/panel id pairs | accordion body id | — |

---

## Testing Strategy

- **JTabs/JTab**: test tab switching, keyboard navigation, badge render, disabled tab skip, controlled mode, uncontrolled auto-select
- **JAccordion**: test toggle, defaultOpen, controlled mode, state colors, icon/badge render, ARIA expanded attribute
- **JPagination**: test tick mode (≤10), ellipsis mode (>10), disabled nav at boundaries, showFirstLast, showInfo, pageSize window, onPageChange calls
- All tests wrapped in `W` (`JThemeProvider`)
- No `@testing-library/user-event` — use `fireEvent` (consistent with existing tests)

---

## Dependency on Existing Code

- Imports `JColor`, `JState` from `../../theme/JarvisTokens`
- Imports `JarvisTokens.cls()` for className composition
- No new npm dependencies
- `useId()` is React 18 built-in — already in use (`react ^18`)
