# JHeatmap

A 2D grid of color-interpolated cells for visualizing data density, activity patterns, frequency matrices, or any value that maps to a grid position. Each cell transitions from a dark base color to a bright accent based on its value (0–100).

## Import

```tsx
import { JHeatmap } from '@masterdeepak15/jarvis-ui'
import type { JHeatmapCell } from '@masterdeepak15/jarvis-ui'
```

---

## Types

```tsx
interface JHeatmapCell {
  value: number      // 0–100 — controls color intensity
  label?: string     // shown inside cell (if showValue=false)
  tooltip?: string   // shown on hover (falls back to label or value%)
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `JHeatmapCell[][]` | — | 2D array — rows × columns |
| `color` | `'cyan'\|'amber'\|'green'\|'red'` | `'cyan'` | Color palette (dark base → bright accent) |
| `cellSize` | `number` | `28` | Each cell's width and height in px |
| `gap` | `number` | `3` | Gap between cells in px |
| `showValue` | `boolean` | `false` | Show numeric value inside each cell |
| `title` | `string` | — | Section label above the heatmap |
| `className` | `string` | — | Extra CSS class |
| `style` | `CSSProperties` | — | Extra styles |

---

## Examples

### Activity heatmap — 7 days × 24 hours

```tsx
// Generate activity data
const hours = Array.from({ length: 24 }, (_, h) =>
  Array.from({ length: 7 }, (_, d) => ({
    value: Math.round(Math.random() * 100),
    tooltip: `Day ${d + 1}, ${h}:00 — ${Math.round(Math.random() * 100)} events`,
  }))
)

<JHeatmap
  data={hours}
  color="cyan"
  cellSize={18}
  gap={2}
  title="ACTIVITY — 24H × 7D"
/>
```

### Server load matrix — rows = servers, cols = hours

```tsx
const serverLoad: JHeatmapCell[][] = servers.map(s =>
  hours.map(h => ({
    value: s.load[h],
    label: s.name,
    tooltip: `${s.name} at ${h}:00 — ${s.load[h]}% load`,
  }))
)

<JHeatmap
  data={serverLoad}
  color="amber"
  cellSize={24}
  showValue
  title="SERVER LOAD MATRIX"
/>
```

### Threat density grid

```tsx
const threatGrid: JHeatmapCell[][] = Array.from({ length: 8 }, (_, row) =>
  Array.from({ length: 12 }, (_, col) => ({
    value: threatData[row][col],
    tooltip: `Sector ${row}-${col}: ${threatData[row][col]}% threat`,
  }))
)

<JHeatmap data={threatGrid} color="red" cellSize={30} title="THREAT DENSITY" />
```

### Inside JHudCanvas — center or right zone widget

```tsx
{
  id: 'heatmap',
  x: 260, y: 340,
  width: 320,
  color: 'cyan',
  title: 'REQUEST DENSITY',
  content: (
    <JHeatmap
      data={requestGrid}
      color="cyan"
      cellSize={20}
      gap={2}
    />
  ),
}
```

### Small compact heatmap

```tsx
<JHeatmap
  data={miniData}
  color="green"
  cellSize={14}
  gap={1}
/>
```

---

## Notes

- `value` is clamped to 0–100. Values above 100 render as 100% intensity.
- Color interpolation uses linear RGB lerp between a dark base (e.g. `#002233` for cyan) and the bright accent (`#00e5ff`). Text inside cells switches from accent to black when the background is bright enough (`value > 55`).
- Cells scale up 115% on hover with a smooth transition — tooltip shows via native `title` attribute.
- `label` inside a cell is only shown when `showValue={false}` — it renders the label string, not the value.
- For very large grids (>200 cells), consider reducing `cellSize` to 12–14px to keep the widget compact.
- The heatmap has no built-in scroll — if the grid exceeds the widget width, wrap it in an `overflow: auto` container.
