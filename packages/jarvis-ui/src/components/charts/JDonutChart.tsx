import type { JDonutSegment } from './JChartTypes'

export interface JDonutChartProps {
  data:          JDonutSegment[]
  size?:         string
  thickness?:    number
  centerValue?:  string
  centerLabel?:  string
  showLegend?:   boolean
}

const CX = 50, CY = 50

export function JDonutChart({
  data,
  size        = '160px',
  thickness   = 20,
  centerValue = '',
  centerLabel = '',
  showLegend  = true,
}: JDonutChartProps) {
  const r     = CX - thickness / 2 - 2
  const circ  = 2 * Math.PI * r
  const total = data.reduce((s, d) => s + d.value, 0)

  let offset = -90
  const segments = data.map(seg => {
    const pct    = total > 0 ? seg.value / total : 0
    const dash   = pct * circ
    const gap    = circ - dash
    const rotate = offset
    offset      += pct * 360
    return { seg, dash, gap, rotate }
  })

  return (
    <div className="j-chart-donut-wrap" style={{ width: size, maxWidth: '100%' }}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
           style={{ width: '100%', height: '100%' }}>
        {/* Track */}
        <circle cx={CX} cy={CY} r={r} fill="none"
                stroke="var(--j-accent-10)" strokeWidth={thickness} />
        {/* Segments */}
        {total > 0 && segments.map(({ seg, dash, gap, rotate }, i) => (
          <circle
            key={i} cx={CX} cy={CY} r={r} fill="none"
            stroke={seg.color ?? 'var(--j-accent)'}
            strokeWidth={thickness}
            strokeDasharray={`${dash.toFixed(2)} ${gap.toFixed(2)}`}
            transform={`rotate(${rotate} ${CX} ${CY})`}
            className="j-chart-donut-seg"
          />
        ))}
        {/* Center value */}
        {centerValue && (
          <text x={CX} y={centerLabel ? 46 : 54} textAnchor="middle"
                className="j-chart-donut-center-val">
            {centerValue}
          </text>
        )}
        {/* Center label */}
        {centerLabel && (
          <text x={CX} y={58} textAnchor="middle"
                className="j-chart-donut-center-lbl">
            {centerLabel}
          </text>
        )}
      </svg>
      {showLegend && (
        <div className="j-chart-donut-legend">
          {data.map((seg, i) => (
            <div key={i} className="j-chart-donut-legend-row">
              <span className="j-chart-donut-legend-dot"
                    style={{ background: seg.color ?? 'var(--j-accent)' }} />
              <span className="j-chart-donut-legend-label">{seg.label}</span>
              <span className="j-chart-donut-legend-pct">
                {total > 0 ? Math.round(seg.value / total * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
