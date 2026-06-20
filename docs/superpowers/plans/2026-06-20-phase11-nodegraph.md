# Phase 11: JNodeGraph Implementation Plan

> **Status:** In progress

**Goal:** Port Blazor JNodeGraph to React — draggable nodes, SVG bezier edges, 4 node types.

**Architecture:** `useState(positions)` for absolute node positions initialized from props in `useEffect`. `useRef(dragRef)` for stable drag context (avoids stale closure). `useState(selectedId)` for visual selected state. SVG edge layer with bezier curves, `animateMotion` dots, arrow markers.

**Tech Stack:** React 18 (`useId`, `useRef`, `useEffect`, `useState`), Vitest, RTL, TypeScript

## Global Constraints

- No CSS file edits
- All colors via `var(--j-*)` — no hardcoded hex
- Hub/Hex/Diamond inner accent ring uses `border-radius:50%` (circles — acceptable per spec)
- Hub outer shell also uses `border-radius:50%` (circle shape — acceptable)
- Font: `'Courier New', monospace`
- `fireEvent` only — no `@testing-library/user-event`
- `data-*` attributes for test hooks

---

## Task 1: JNodeGraph

**Files:**
- Create: `packages/jarvis-ui/src/components/ui/JNodeGraph.tsx`
- Create: `packages/jarvis-ui/src/components/ui/JNodeGraph.test.tsx`
- Modify: `packages/jarvis-ui/src/index.ts`

### Steps

- [x] Write test file (RED)
- [x] Write implementation (GREEN)
- [x] Append index.ts exports
- [x] Run tests — all pass
- [x] Commit
