# Phase 10: JRadialMenu + JRadialItem Implementation Plan

> **Status:** COMPLETE — all tasks executed and 525 tests passing

**Goal:** Port Blazor JRadialMenu + JRadialItem to React using Context + registration pattern.

**Architecture:** JRadialMenu provides `RadialMenuContext` (register function). JRadialItem children consume it via `useEffect` to register themselves. JRadialMenu renders visual circles from accumulated `items` state array, completely independent of the children's null DOM output.

**Tech Stack:** React 18, Vitest, RTL, TypeScript, CSS custom properties

## Global Constraints

- No CSS file edits — read-only
- All colors via `var(--j-*)` — no hardcoded hex
- No `border-radius` on containers (item circles use `border-radius: 50%` — acceptable per spec)
- Font: `'Courier New', monospace`
- `fireEvent` only — no `@testing-library/user-event`
- `data-*` attributes for test hooks

---

## Task 1: JRadialMenu + JRadialItem ✅

**Files:**
- Created: `packages/jarvis-ui/src/components/ui/JRadialMenu.tsx`
- Created: `packages/jarvis-ui/src/components/ui/JRadialMenu.test.tsx` (17 tests)
- Created: `packages/jarvis-ui/src/components/ui/JRadialItem.tsx`
- Created: `packages/jarvis-ui/src/components/ui/JRadialItem.test.tsx` (5 tests)
- Modified: `packages/jarvis-ui/src/index.ts` (appended exports)

**Key interfaces:**
```ts
interface JRadialItemDef { key: string; icon: string; label: string; angle: number; state: JState; onClick: () => void }
interface JRadialMenuProps { open?: boolean; onOpenChange?: (open: boolean) => void; triggerLabel?: string; radius?: number; centerSize?: string; children?: ReactNode }
interface JRadialItemProps { icon?: string; label?: string; angle?: number; state?: JState; onClick?: () => void }
```

**Positioning:** `rad = (angleDeg - 90) * PI / 180` → 0° = 12 o'clock

**Spring easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` for item fly-out

**Test hooks:** `data-trigger`, `data-open`, `data-item-key`, `data-hover-label`, `data-connector`

**Result:** 22 new tests, all GREEN. Total: 525 tests across 52 test files.
