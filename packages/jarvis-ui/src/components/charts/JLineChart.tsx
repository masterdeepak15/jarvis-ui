import type { JChartPoint } from './JChartTypes'

export interface JLineChartProps {
  data:            JChartPoint[]
  height?:         string
  colorVar?:       string
  showArea?:       boolean
  showDots?:       boolean
  showAxisLabels?: boolean
  showGrid?:       boolean
  gridLines?:      number
}

const VW = 400, VH = 200
const PAD_L = 36, PAD_R = 8, PAD_T = 10, PAD_B = 20
const INNER_W = VW - PAD_L - PAD_R  // 356
const INNER_H = VH - PAD_T - PAD_B  // 170

function fmt(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000)     return `${(v / 1_000).toFixed(1)}K`
  return v.toFixed(1)
}

export function JLineChart({
  data,
  height         = '200px',
  colorVar       = '--j-accent',
  showArea       = false,
  showDots       = true,
  showAxisLabels = true,
  showGrid       = true,
  gridLines      = 4,
}: JLineChartProps) {
  if (data.length === 0) {
    return <div className="j-chart-wrap" style={{ height, position: 'relative' }} />
  }

  const values = data.map(d => d.value)
  const min    = Math.min(...values)
  const max    = Math.max(...values)
  const range  = max - min === 0 ? 1 : max - min
  const color  = `var(${colorVar})`

  const pts = data.map((d, i) => ({
    x: PAD_L + i * (INNER_W / Math.max(data.length - 1, 1)),
    y: PAD_T + INNER_H - (INNER_H * (d.value - min) / range),
  }))

  const ptStr = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

  let areaPath = ''
  if (pts.length >= 2) {
    areaPath = `M ${pts[0].x.toFixed(1)} ${PAD_T + INNER_H}`
    for (const p of pts) areaPath += ` L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
    areaPath += ` L ${pts[pts.length - 1].x.toFixed(1)} ${PAD_T + INNER_H} Z`
  }

  return (
    <div className="j-chart-wrap" style={{ height, position: 'relative' }}>
      <div className="j-chart-scan" />
      <svg className="j-chart-svg" viewBox={`0 0 ${VW} ${VH}`}
           preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {showGrid && Array.from({ length: gridLines + 1 }, (_, i) => {
          const gy = PAD_T + i * (INNER_H / gridLines)
          const gv = max - i * (range / gridLines)
          return (
            <g key={`grid-${i}`}>
              <line x1={PAD_L} y1={gy} x2={VW - PAD_R} y2={gy}
                    className="j-chart-grid" />
              {showAxisLabels && (
                <text x={PAD_L - 4} y={gy + 3}
                      className="j-chart-axis-label" textAnchor="end">
                  {fmt(gv)}
                </text>
              )}
            </g>
          )
        })}
        {showArea && pts.length >= 2 && (
          <path d={areaPath} className="j-chart-area" style={{ fill: color }} />
        )}
        {pts.length >= 2 && (
          <polyline points={ptStr} className="j-chart-line"
                    style={{ stroke: color, fill: 'none' }} />
        )}
        {showDots && pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3}
                  className="j-chart-dot" style={{ fill: color }} />
        ))}
        {showAxisLabels && data.map((d, i) => (
          <text key={`xlbl-${i}`} x={pts[i].x} y={VH - 2}
                className="j-chart-axis-label" textAnchor="middle">
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  )
}
