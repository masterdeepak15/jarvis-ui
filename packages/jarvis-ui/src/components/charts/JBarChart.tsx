import type { JChartPoint, JChartOrientation } from './JChartTypes'

export interface JBarChartProps {
  data:            JChartPoint[]
  height?:         string
  colorVar?:       string
  orientation?:    JChartOrientation
  showGrid?:       boolean
  showAxisLabels?: boolean
  showValues?:     boolean
  gridLines?:      number
}

const VW = 400, VH = 220
const PAD_L = 36, PAD_R = 8, PAD_T = 12, PAD_B = 22, GAP = 6
const INNER_W = VW - PAD_L - PAD_R  // 356
const INNER_H = VH - PAD_T - PAD_B  // 186

function fmt(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000)     return `${(v / 1_000).toFixed(1)}K`
  return v.toFixed(1)
}

export function JBarChart({
  data,
  height         = '220px',
  colorVar       = '--j-accent',
  orientation    = 'vertical',
  showGrid       = true,
  showAxisLabels = true,
  showValues     = false,
  gridLines      = 4,
}: JBarChartProps) {
  const max = data.length > 0 ? Math.max(...data.map(d => d.value)) : 1
  const col = `var(${colorVar}, var(--j-accent))`

  return (
    <div className="j-chart-wrap" style={{ height, position: 'relative' }}>
      <div className="j-chart-scan" />
      <svg className="j-chart-svg" viewBox={`0 0 ${VW} ${VH}`}
           preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {orientation === 'vertical' ? (
          <>
            {showGrid && Array.from({ length: gridLines + 1 }, (_, i) => {
              const gy = PAD_T + i * (INNER_H / gridLines)
              const gv = max - i * (max / gridLines)
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
            {data.map((d, i) => {
              const barW = INNER_W / data.length - GAP
              const barH = max > 0 ? INNER_H * (d.value / max) : 0
              const bx   = PAD_L + i * (INNER_W / data.length) + GAP / 2
              const by   = PAD_T + INNER_H - barH
              return (
                <g key={i} className="j-chart-bar-group">
                  <polygon
                    points={`${bx},${by + 6} ${bx + 4},${by} ${bx + barW - 4},${by} ${bx + barW},${by + 6}`}
                    style={{ fill: col }}
                  />
                  <rect x={bx} y={by + 5} width={barW} height={Math.max(barH - 5, 0)}
                        className="j-chart-bar" style={{ fill: col }}>
                    <title>{`${d.label}: ${d.value}`}</title>
                  </rect>
                  <rect x={bx} y={by + 5} width={barW} height={Math.max(barH - 5, 0)}
                        className="j-chart-bar-glow" style={{ fill: col }} />
                  {showAxisLabels && (
                    <text x={bx + barW / 2} y={VH - 2}
                          className="j-chart-axis-label" textAnchor="middle">
                      {d.label}
                    </text>
                  )}
                  {showValues && barH > 10 && (
                    <text x={bx + barW / 2} y={by - 3}
                          className="j-chart-value-label" textAnchor="middle">
                      {fmt(d.value)}
                    </text>
                  )}
                </g>
              )
            })}
          </>
        ) : (
          <>
            {showGrid && Array.from({ length: gridLines + 1 }, (_, i) => {
              const gx = PAD_L + i * (INNER_W / gridLines)
              const gv = i * (max / gridLines)
              return (
                <g key={`grid-${i}`}>
                  <line x1={gx} y1={PAD_T} x2={gx} y2={VH - PAD_B}
                        className="j-chart-grid" />
                  {showAxisLabels && (
                    <text x={gx} y={VH - 2}
                          className="j-chart-axis-label" textAnchor="middle">
                      {fmt(gv)}
                    </text>
                  )}
                </g>
              )
            })}
            {data.map((d, i) => {
              const rowH = INNER_H / data.length
              const barH = rowH - GAP
              const barW = max > 0 ? INNER_W * (d.value / max) : 0
              const by   = PAD_T + i * rowH + GAP / 2
              return (
                <g key={i} className="j-chart-bar-group">
                  <rect x={PAD_L} y={by} width={barW} height={barH}
                        className="j-chart-bar" style={{ fill: col }}>
                    <title>{`${d.label}: ${d.value}`}</title>
                  </rect>
                  <rect x={PAD_L} y={by} width={barW} height={barH}
                        className="j-chart-bar-glow" style={{ fill: col }} />
                  {showAxisLabels && (
                    <text x={PAD_L - 4} y={by + barH / 2 + 4}
                          className="j-chart-axis-label" textAnchor="end">
                      {d.label}
                    </text>
                  )}
                  {showValues && (
                    <text x={PAD_L + barW + 4} y={by + barH / 2 + 4}
                          className="j-chart-value-label" textAnchor="start">
                      {fmt(d.value)}
                    </text>
                  )}
                </g>
              )
            })}
          </>
        )}
      </svg>
    </div>
  )
}
