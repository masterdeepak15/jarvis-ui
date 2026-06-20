import type { JRadarAxis } from './JChartTypes'

export interface JRadarChartProps {
  axes:        JRadarAxis[]
  size?:       string
  colorVar?:   string
  rings?:      number
  showLabels?: boolean
}

const CX = 100, CY = 100, R = 78

function toRad(deg: number) { return (deg * Math.PI) / 180 }
function axisAng(i: number, n: number): number { return toRad(360 * i / n - 90) }
function axisXY(i: number, n: number, radius: number): [number, number] {
  const a = axisAng(i, n)
  return [CX + radius * Math.cos(a), CY + radius * Math.sin(a)]
}
function pt(i: number, n: number, radius: number): string {
  const [x, y] = axisXY(i, n, radius)
  return `${x.toFixed(2)},${y.toFixed(2)}`
}
function clamp01(v: number): number { return Math.max(0, Math.min(1, v)) }

export function JRadarChart({
  axes,
  size       = '200px',
  colorVar   = '--j-accent',
  rings      = 4,
  showLabels = true,
}: JRadarChartProps) {
  const n     = Math.max(axes.length, 3)
  const color = `var(${colorVar},var(--j-accent))`

  const webRings = Array.from({ length: rings }, (_, k) => {
    const rr  = R * (k + 1) / rings
    const pts = Array.from({ length: n }, (_, i) => pt(i, n, rr)).join(' ')
    return <polygon key={k} points={pts} className="j-chart-radar-web" />
  })

  const spokes = Array.from({ length: n }, (_, i) => {
    const [ex, ey] = axisXY(i, n, R)
    return (
      <line key={i} x1={CX} y1={CY} x2={ex} y2={ey}
            className="j-chart-radar-spoke" />
    )
  })

  const dataPts = axes.map((a, i) => {
    const pct = clamp01(a.value / ((a.max ?? 100) || 1))
    return pt(i, n, R * pct)
  }).join(' ')

  const dots = axes.map((a, i) => {
    const pct      = clamp01(a.value / ((a.max ?? 100) || 1))
    const [dx, dy] = axisXY(i, n, R * pct)
    return (
      <circle key={i} cx={dx} cy={dy} r={3}
              className="j-chart-dot"
              style={{ fill: color }} />
    )
  })

  const labels = showLabels
    ? axes.map((a, i) => {
        const [lx, ly] = axisXY(i, n, R + 14)
        const anchor   = lx < 98 ? 'end' : lx > 102 ? 'start' : 'middle'
        return (
          <text key={i} x={lx} y={ly + 4}
                className="j-chart-axis-label" textAnchor={anchor}>
            {a.label}
          </text>
        )
      })
    : null

  return (
    <div style={{ width: size, maxWidth: '100%', aspectRatio: '1' }}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
           style={{ width: '100%', height: '100%' }}>
        {webRings}
        {spokes}
        <polygon points={dataPts} className="j-chart-radar-data"
                 style={{ fill: color, stroke: color }} />
        {dots}
        {labels}
      </svg>
    </div>
  )
}
