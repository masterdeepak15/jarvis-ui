# Phase 11: JNodeGraph — Design Spec

**Date:** 2026-06-20  
**Component:** JNodeGraph  
**Status:** Approved

---

## Overview

Draggable node-relation graph. Nodes are positioned absolutely inside a container div.
SVG bezier edges connect nodes and redraw in real-time as nodes are dragged.

---

## Types

```ts
export type NType     = 'chip' | 'hub' | 'diamond' | 'hex'
export type EdgeStyle = 'solid' | 'dashed' | 'dotted'

export interface NodeDef {
  id:     string
  label:  string
  x:      number
  y:      number
  type?:  NType    // default: 'chip'
  color?: JColor   // default: 'cyan'
  sub?:   string
  value?: string   // shown on chip right-side panel
  pulse?: boolean
}

export interface EdgeDef {
  from:      string
  to:        string
  color?:    JColor      // default: 'cyan'
  style?:    EdgeStyle   // default: 'solid'
  arrow?:    boolean     // default: true
  animated?: boolean     // default: true
  animDur?:  number      // default: 2.0
  label?:    string
}

export interface JNodeGraphProps {
  nodes:       NodeDef[]
  edges:       EdgeDef[]
  width?:      string     // default: '100%'
  height?:     string     // default: '420px'
  title?:      string
  showLegend?: boolean    // default: true
}
```

---

## Node Sizing (identical to Blazor)

```ts
// Hub → 88×88   Diamond → 80×80   Hex → 82×82
// Chip → 144×36 (no sub) or 144×48 (has sub)
function nodeW(n: NodeDef): number
function nodeH(n: NodeDef): number
```

---

## Color Helpers

```ts
function getNodeAccent(color?: JColor): string
// amber→var(--j-warn), red→var(--j-err), green→var(--j-ok), else→var(--j-accent)

function getEdgeColor(color?: JColor): string  // same mapping
function markerSuffix(color?: JColor): string  // 'a'|'aw'|'ae'|'ag' (matches Blazor)
```

---

## State Architecture

```ts
// Internal mutable position per node (initialized from node.x/node.y on mount)
interface NodePos { x: number; y: number; w: number; h: number }

const [positions, setPositions] = useState<Record<string, NodePos>>({})
const [selectedId, setSelectedId] = useState<string | null>(null)
const dragRef = useRef<{ id: string; offX: number; offY: number } | null>(null)
```

### Position Initialization

`useEffect([nodes])` — for each node in `nodes`:
- If position already exists for `node.id` → skip (preserves drag state)
- If new → add `{ x: node.x, y: node.y, w: nodeW(node), h: nodeH(node) }`
- Remove stale keys not present in `nodes`

### Unique Grid ID

`useId()` from React 18 — cleaned of colons → `const gridId = \`ng\${uid}\``

---

## Drag Mechanism

```
onMouseDown(node) → setSelectedId(id), dragRef = { id, offX: clientX-p.x, offY: clientY-p.y }
onMouseMove(container) → if dragRef: setPositions prev[id].x = clientX-offX, y = clientY-offY (min 0)
onMouseUp / onMouseLeave(container) → setSelectedId(null), dragRef = null
```

`dragRef` (useRef) — avoids stale closure in onMouseMove  
`selectedId` (useState) — triggers re-render for visual selected state

---

## Port Calculation (identical to Blazor)

```ts
// Hub, Diamond, Hex → center (x+w/2, y+h/2)
// Chip isFrom: target_cx >= from_cx → right edge, else left edge
// Chip !isFrom: target_cx < from_cx → right edge, else left edge
function getPort(from: NodePos, to: NodePos, nodeId: string, isFrom: boolean, nodes: NodeDef[]): [number, number]
```

---

## SVG Edge Rendering (per edge)

```
d = "M x1 y1 C cpx1 cpy1 cpx2 cpy2 x2 y2"
cpx1 = x1 + (x2-x1)*0.5,  cpy1 = y1
cpx2 = x2 - (x2-x1)*0.5,  cpy2 = y2

<g data-edge="{from}-{to}">
  <path glow: stroke=col strokeWidth=5 strokeOpacity=0.1 />
  <path id=eid main: strokeWidth=1.5 strokeDasharray=(edge.style) markerEnd />
  {animated && <circle r=3 fill=col><animateMotion><mpath href="#eid"/></animateMotion></circle>}
  {label && <text textAnchor=middle x=mid y=mid-10>{label}</text>}
</g>
```

Arrow markers in `<defs>`:
- `${gridId}-a` → `var(--j-accent-50)` (cyan/default)
- `${gridId}-aw` → `var(--j-warn)`
- `${gridId}-ae` → `var(--j-err)`
- `${gridId}-ag` → `var(--j-ok)`

Dot-grid background: `<pattern id="${gridId}-grid" width=32 height=32>`  
`<circle cx=0 cy=0 r=0.8 fill=var(--j-accent-18)/>`

---

## Node Rendering

**Chip (default):**
- `clip-path: polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)`
- Left: 6px pulse dot (animated when `pulse=true`)
- Scan line: `animation: j-scan-v 3s ease-in-out infinite`
- Right panel: `node.value` separated by `border-left: 1px solid ac`
- Selected: `box-shadow: 0 0 16px {ac}` + `filter: brightness(1.2)`

**Hub:**
- `border-radius: 50%` (circle — acceptable per HUD rules)
- Inner spinning ring: `inset:5px border-radius:50% animation:j-spin 5s linear infinite`
- Selected: `filter: brightness(1.35)`

**Diamond:**
- `clip-path: polygon(50% 0%,100% 50%,50% 100%,0% 50%)`
- Selected: `filter: brightness(1.3)`

**Hex:**
- `clip-path: polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)`
- Selected: `filter: brightness(1.3)`

---

## DOM Structure

```
<div data-node-graph style={width, height, position:relative, bg-card, overflow:hidden, accent-18 border}>
  <svg> dot-grid background </svg>
  <svg z-index:1> defs (markers) + edges per EdgeDef </svg>
  {nodes.map(n => (
    <div data-node-id={n.id} data-node-type={n.type} data-selected={selectedId===n.id}
         style={{ position:absolute, left:p.x, top:p.y, width:p.w, height:p.h, cursor:grab }}>
      {node shape JSX}
    </div>
  ))}
  {title && <div data-graph-title>{title}</div>}
  {showLegend && <div data-legend>DRAG NODES · CONNECTIONS FOLLOW</div>}
</div>
```

---

## Test Strategy

1. renders `[data-node-graph]` container
2. all 4 nodes render with `[data-node-id]` after effect
3. chip node: `data-node-type="chip"`
4. hub node: `data-node-type="hub"`
5. diamond node: `data-node-type="diamond"`
6. hex node: `data-node-type="hex"`
7. SVG edges render: `[data-edge]` count matches edges array length
8. title renders `[data-graph-title]` with text
9. no title → no `[data-graph-title]`
10. `showLegend=true` → `[data-legend]` present
11. `showLegend=false` → no `[data-legend]`
12. drag: mouseDown on node + mouseMove on container → style.left/top updates
13. mouseLeave on container → subsequent mouseMove does NOT move node
14. node `sub` renders
15. chip `value` renders
16. edge `label` renders in SVG

---

## File Map

```
packages/jarvis-ui/src/components/ui/
├── JNodeGraph.tsx       (new)
└── JNodeGraph.test.tsx  (new)
packages/jarvis-ui/src/index.ts  (append exports)
```
