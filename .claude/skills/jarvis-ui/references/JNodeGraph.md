# JNodeGraph

Draggable node graph with SVG bezier edges, animated flow, and multiple node types.

## Import

```tsx
import { JNodeGraph } from '@masterdeepak15/jarvis-ui'
import type { NodeDef, EdgeDef, NType, EdgeStyle } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `nodes` | `NodeDef[]` | — | Node definitions |
| `edges` | `EdgeDef[]` | — | Edge/connection definitions |
| `title` | `string` | — | Graph title (shown in header) |
| `height` | `string` | `'400px'` | Container height |
| `showLegend` | `boolean` | `false` | Show node type legend |

## NodeDef Type

```tsx
type NodeDef = {
  id:     string   // unique identifier
  label:  string   // display text
  x:      number   // horizontal position (pixels)
  y:      number   // vertical position (pixels)
  type?:  NType    // 'default' | 'hub' | 'hex' | 'diamond'
  color?: JColor   // 'cyan' | 'amber' | 'red' | 'green' | 'blue' | 'ghost' | 'white'
  pulse?: boolean  // glowing pulse animation
}
```

## EdgeDef Type

```tsx
type EdgeDef = {
  from:      string      // source node id
  to:        string      // target node id
  color?:    JColor      // edge line color
  style?:    EdgeStyle   // 'solid' | 'dashed'
  animDur?:  number      // flow animation duration in seconds (lower = faster)
  label?:    string      // edge label
}
```

## Node Types

| Type | Shape | Use case |
|------|-------|----------|
| `'default'` | Rectangle/chip | Regular nodes, endpoints |
| `'hub'` | Octagon | Central hubs, aggregators |
| `'hex'` | Hexagon | Outputs, servers, final nodes |
| `'diamond'` | Diamond | Decision points, zones, routers |

## Use Cases

### Simple hub and spokes

```tsx
const nodes: NodeDef[] = [
  { id: 'hub', label: 'CORE HUB', x: 300, y: 200, type: 'hub' },
  { id: 'n1',  label: 'SENSOR-1', x: 60,  y: 60,  pulse: true },
  { id: 'n2',  label: 'SENSOR-2', x: 60,  y: 200 },
  { id: 'n3',  label: 'SENSOR-3', x: 60,  y: 340 },
  { id: 'out', label: 'OUTPUT',   x: 520, y: 200, type: 'hex', color: 'green' },
]
const edges: EdgeDef[] = [
  { from: 'n1', to: 'hub' },
  { from: 'n2', to: 'hub' },
  { from: 'n3', to: 'hub' },
  { from: 'hub', to: 'out', color: 'green', animDur: 1.2 },
]

<JNodeGraph nodes={nodes} edges={edges} title="SENSOR NETWORK" height="420px" showLegend />
```

### NH-90 ITS device flow

```tsx
const nodes: NodeDef[] = [
  { id: 'c0',  label: 'CCTV-000', x: 40,  y: 40,  pulse: true },
  { id: 'c1',  label: 'CCTV-001', x: 40,  y: 120 },
  { id: 'v1',  label: 'VMS-001',  x: 40,  y: 200, color: 'amber' },
  { id: 'hub', label: 'NH-90 HUB', x: 280, y: 120, type: 'hub' },
  { id: 'toll', label: 'ECB TOLL', x: 480, y: 60,  type: 'hex', color: 'red' },
  { id: 'ctrl', label: 'CTRL ROOM',x: 480, y: 200, type: 'hub', color: 'amber' },
]
const edges: EdgeDef[] = [
  { from: 'c0', to: 'hub' },
  { from: 'c1', to: 'hub' },
  { from: 'v1', to: 'hub', color: 'amber', style: 'dashed' },
  { from: 'hub', to: 'toll', color: 'red',   animDur: 1.0 },
  { from: 'hub', to: 'ctrl', color: 'amber', animDur: 1.4 },
]

<JNodeGraph nodes={nodes} edges={edges} title="NH-90 ITS DEVICE FLOW" height="300px" showLegend />
```

### Alert/fault propagation tree

```tsx
const nodes: NodeDef[] = [
  { id: 'fault', label: 'CCTV-005',  x: 40,  y: 120, color: 'red', pulse: true },
  { id: 'zone',  label: 'ZONE-3',    x: 200, y: 120, type: 'diamond', color: 'red' },
  { id: 'hub',   label: 'NH-90 HUB', x: 360, y: 120, type: 'hub', color: 'amber' },
  { id: 'ops',   label: 'OPS CENTER',x: 520, y: 60,  color: 'red' },
  { id: 'log',   label: 'LOG SRV',   x: 520, y: 180, color: 'amber' },
]
const edges: EdgeDef[] = [
  { from: 'fault', to: 'zone', color: 'red',   animDur: 0.8 },
  { from: 'zone',  to: 'hub',  color: 'red',   animDur: 0.9 },
  { from: 'hub',   to: 'ops',  color: 'red',   animDur: 0.8 },
  { from: 'hub',   to: 'log',  color: 'amber', style: 'dashed' },
]
```

### Org hierarchy tree

```tsx
const nodes: NodeDef[] = [
  { id: 'ceo',  label: 'CMD CENTER', x: 260, y: 20,  type: 'hub' },
  { id: 'ops',  label: 'OPS DEPT',   x: 80,  y: 120 },
  { id: 'intel',label: 'INTEL DEPT', x: 260, y: 120 },
  { id: 'log',  label: 'LOGISTICS',  x: 440, y: 120 },
]
const edges: EdgeDef[] = [
  { from: 'ceo', to: 'ops',   animDur: 2.5 },
  { from: 'ceo', to: 'intel', animDur: 2.5 },
  { from: 'ceo', to: 'log',   animDur: 2.5 },
]
```

### Interactive / live graph

```tsx
const [nodes, setNodes] = useState<NodeDef[]>(initialNodes)
const [edges, setEdges] = useState<EdgeDef[]>(initialEdges)
const [count, setCount] = useState(0)

function addNode(type: NType = 'default') {
  const id = `n${count + 1}`
  setNodes(prev => [...prev, {
    id, label: `NODE-${count + 1}`, x: 50 + Math.random() * 400, y: 50 + Math.random() * 300, type,
  }])
  setCount(c => c + 1)
}

function connectRandom() {
  if (nodes.length < 2) return
  const a = nodes[Math.floor(Math.random() * nodes.length)]
  const b = nodes[Math.floor(Math.random() * nodes.length)]
  if (a.id !== b.id) {
    setEdges(prev => [...prev, { from: a.id, to: b.id, animDur: 1 + Math.random() * 2 }])
  }
}

<div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
  <JButton size="sm" color="cyan"  onClick={() => addNode('default')}>+ NODE</JButton>
  <JButton size="sm" color="amber" onClick={() => addNode('hub')}>+ HUB</JButton>
  <JButton size="sm" color="red"   onClick={connectRandom}>⇄ CONNECT</JButton>
</div>
<JNodeGraph nodes={nodes} edges={edges} title="LIVE GRAPH" height="440px" showLegend />
```

## Notes

- Nodes are draggable by default — positions update in-memory only (no callback for drag end)
- `animDur` on edges controls animated flow speed: lower = faster (0.8 is fast, 3.0 is slow)
- `pulse: true` adds a glow/pulse ring around the node — use for live/active nodes
- `style: 'dashed'` on edges indicates optional/degraded connections
- Edges draw a bezier curve between node centers — positions are pixel values relative to the canvas
- For dynamic graphs, manage `nodes` + `edges` in state and mutate them with `useState`
