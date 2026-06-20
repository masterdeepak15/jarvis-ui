# Phase 10: JRadialMenu + JRadialItem — Design Spec

**Date:** 2026-06-20  
**Components:** JRadialMenu, JRadialItem  
**Status:** Approved

---

## Architecture

Blazor uses `CascadingValue<JRadialMenu>` to inject the parent into children. React equivalent: **Context + registration pattern**.

- `RadialMenuContext` — `createContext<RegisterFn | null>(null)` exported from JRadialMenu
- `JRadialItem` — consumes context, calls `register(itemDef)` in `useEffect(()=>{...}, [])`, returns `null`
- `JRadialMenu` — provides context, accumulates items in `useState<JRadialItemDef[]>([])`, renders visual circles from `items` array

Items order = order children are rendered (effects run top-to-bottom within same flush).

---

## Types

```ts
// Exported from JRadialMenu (needed by JRadialItem)
export interface JRadialItemDef {
  key:     string   // `${label}-${angle}`
  icon:    string
  label:   string
  angle:   number
  state:   JState
  onClick: () => void
}

export interface JRadialMenuProps {
  open?:          boolean
  onOpenChange?:  (open: boolean) => void
  triggerLabel?:  string      // default: 'MENU'
  radius?:        number      // default: 90
  centerSize?:    string      // default: '64px'
  children?:      ReactNode
}

// JRadialItem.tsx
export interface JRadialItemProps {
  icon?:    string    // default: '⊞'
  label?:   string    // default: ''
  angle?:   number    // default: 0
  state?:   JState    // default: 'active'
  onClick?: () => void
}
```

---

## Positioning Math (identical to Blazor)

```ts
function getPosition(angleDeg: number, radius: number) {
  const rad = (angleDeg - 90) * Math.PI / 180
  return { x: Math.round(radius * Math.cos(rad)), y: Math.round(radius * Math.sin(rad)) }
}
```
`-90` rotation makes 0° = 12 o'clock (top).

---

## Color Helpers

No hardcoded hex alpha — use existing CSS vars:

```ts
function itemAccentFull(state: JState): string  // var(--j-warn) | var(--j-err) | var(--j-ok) | var(--j-accent)
function itemAccentFaint(state: JState): string // var(--j-warn-25) | ... | var(--j-accent-25)
function itemAccentGlow(state: JState): string  // var(--j-warn-12) | ... | var(--j-accent-12)
```

---

## DOM Structure (JRadialMenu)

```
<div relative inline-flex center>

  <RadialMenuContext.Provider value={register}>
    {children}    ← JRadialItem components run effects here, return null
  </RadialMenuContext.Provider>

  {items.map(item => {
    const {x,y} = getPosition(item.angle, radius)
    const isHovered = hoveredKey === item.key
    return (
      <div data-item-key={item.key}
           position:absolute top:50% left:50%
           transform: open ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` : 'translate(-50%,-50%)'
           transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease
           opacity: open ? 1 : 0
           onMouseEnter/Leave: setHoveredKey/setHoverLabel
           onClick: item.onClick() + close()>

        {/* item circle — 40×40 round */}
        <div borderRadius:50%
             background: hovered ? glow(state) : var(--j-bg-card)
             border: hovered ? full(state) : faint(state)
             boxShadow: hovered ? glow combo : none
             transition: all 0.2s>
          <span fontSize:16 filter:drop-shadow when hovered>
            {item.icon}
          </span>
        </div>

        {/* connector line — only when open */}
        {open && (
          <div position:absolute top:50% left:50%
               width:radius-20 height:1
               transformOrigin:0 50%
               transform:`rotate(${item.angle - 90}deg)`
               background:linear-gradient(90deg, faint(state), transparent)
               opacity: hovered ? 0.8 : 0.2 />
        )}
      </div>
    )
  })}

  {/* Center trigger */}
  <div data-trigger data-open={open ? 'true' : 'false'}
       width:centerSize height:centerSize borderRadius:50%
       background:radial-gradient(circle at 40% 36%, var(--j-accent-18), var(--j-bg) 70%)
       border: 1.5px var(--j-accent-50)
       boxShadow: glow + inset
       onClick:toggle z-index:20>

    <div absolute inset:-4 border-radius:50% border:1px var(--j-accent) opacity:0.3
         animation:j-spin (2s when open, 4s when closed) linear infinite />
    <div absolute inset:-10 border-radius:50% border:1px dashed var(--j-accent) opacity:0.15
         animation:j-spin-rev 6s linear infinite />

    <div relative z-index:1 textAlign:center>
      <div fontSize:10 fontWeight:600 letterSpacing:0.12em uppercase
           animation:j-glitch 3s when open, none when closed>
        {open ? 'CLOSE' : triggerLabel}
      </div>
    </div>
  </div>

  {/* Hover label — shown only when open and item is hovered */}
  {hoverLabel && open && (
    <div data-hover-label
         absolute top:calc(50%+70px) left:50% translateX(-50%)
         fontSize:9 color:var(--j-accent) letterSpacing:0.14em uppercase
         textShadow:glow animation:j-pulse 1s infinite>
      {hoverLabel}
    </div>
  )}
</div>
```

---

## CSS Animations Used (all confirmed)

- `j-spin` — center ring forward spin
- `j-spin-rev` — center ring reverse spin
- `j-glitch` — trigger label glitch when open
- `j-pulse` — hover label pulse

---

## Testing Strategy

### JRadialMenu
1. renders `[data-trigger]`
2. shows default triggerLabel "MENU"
3. shows custom triggerLabel
4. `data-open="false"` initially
5. click trigger → `data-open="true"`
6. shows "CLOSE" when open
7. click trigger again → `data-open="false"`
8. 3 JRadialItem children → 3 `[data-item-key]` elements
9. items have opacity 0 when closed
10. items have opacity 1 when open
11. mouseenter on item → `[data-hover-label]` shows with label text
12. mouseleave → hover label gone
13. click item → calls onClick
14. click item → closes menu
15. onOpenChange called with true/false

### JRadialItem
1. registers with `[data-item-key="label-angle"]` inside JRadialMenu
2. `[data-item-key="Test-0"]` for default angle=0
3. renders null (no own DOM node — visual is from JRadialMenu)

---

## File Map

```
packages/jarvis-ui/src/components/ui/
├── JRadialMenu.tsx      (new — exports RadialMenuContext, useRadialMenu, JRadialItemDef)
├── JRadialMenu.test.tsx (new)
├── JRadialItem.tsx      (new — imports useRadialMenu from JRadialMenu)
└── JRadialItem.test.tsx (new)
packages/jarvis-ui/src/index.ts  (append exports)
```
