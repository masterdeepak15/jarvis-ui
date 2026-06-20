import type { CSSProperties } from 'react'
import type { JSparkTrend } from './JChartTypes'

export interface JSparklineProps {
  data:       number[]
  width?:     string
  height?:    string
  showArea?:  boolean
  showTrend?: boolean
  trend?:     JSparkTrend
  colorVar?:  string
}

const VW = 80, VH = 28, PH = 2, PV = 3
const INNER_W = VW - PH * 2   // 76
const INNER_H = VH - PV * 2   // 22
const BOTTOM  = PV + INNER_H  // 25

function computePoints(data: number[]): { x: number; y: number }[] {
  if (data.length === 0) return []
  const min   = Math.min(...data)
  const max   = Math.max(...data)
  const range = max - min === 0 ? 1 : max - min
  return data.map((v, i) => ({
    x: PH + i * (INNER_W / Math.max(data.length - 1, 1)),
    y: PV + INNER_H - (INNER_H * (v - min) / range),
  }))
}

function resolveTrend(data: number[], trend: JSparkTrend): JSparkTrend {
  if (trend !== 'auto') return trend
  if (data.length < 2) return 'flat'
  const min   = Math.min(...data)
  const max   = Math.max(...data)
  const range = max - min
  const last  = data[data.length - 1]
  if (last > data[0] + range * 0.05) return 'up'
  if (last < data[0] - range * 0.05) return 'down'
  return 'flat'
}

export function JSparkline({
  data,
  width     = '80px',
  height    = '28px',
  showArea  = true,
  showTrend = false,
  trend     = 'auto',
  colorVar,
}: JSparklineProps) {
  const pts      = computePoints(data)
  const resolved = resolveTrend(data, trend)
  const cv       = colorVar ?? (resolved === 'up' ? '--j-ok' : resolved === 'down' ? '--j-err' : '--j-accent')
  const color    = `var(${cv})`
  const ptStr    = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

  const trendIcon = resolved === 'up' ? '▲' : resolved === 'down' ? '▼' : '─'
  const trendCls  = resolved === 'up' ? 'j-text-ok' : resolved === 'down' ? 'j-text-err' : 'j-text-accent'

  let areaPath = ''
  if (pts.length >= 2) {
    areaPath = `M ${pts[0].x.toFixed(1)} ${BOTTOM} L ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
    for (let i = 1; i < pts.length; i++) {
      areaPath += ` L ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`
    }
    areaPath += ` L ${pts[pts.length - 1].x.toFixed(1)} ${BOTTOM} Z`
  }

  const last = pts[pts.length - 1]

  return (
    <span
      className="j-sparkline-wrap"
      style={{ width, height, display: 'inline-block', position: 'relative' } as CSSProperties}
    >
      <svg
        viewBox="0 0 80 28"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' } as CSSProperties}
        preserveAspectRatio="none"
      >
        {showArea && pts.length >= 2 && (
          <path d={areaPath} className="j-sparkline-area"
                style={{ fill: color } as CSSProperties} />
        )}
        {pts.length >= 2 && (
          <polyline points={ptStr} className="j-sparkline-line"
                    style={{ stroke: color, fill: 'none' } as CSSProperties} />
        )}
        {last && (
          <circle cx={last.x} cy={last.y} r={2} className="j-sparkline-dot"
                  style={{ fill: color } as CSSProperties} />
        )}
      </svg>
      {showTrend && (
        <span className={`j-sparkline-trend ${trendCls}`}>{trendIcon}</span>
      )}
    </span>
  )
}
