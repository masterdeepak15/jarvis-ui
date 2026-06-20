import type { CSSProperties } from 'react'

export interface JGaugeChartProps {
  value:         number
  min?:          number
  max?:          number
  size?:         string
  colorVar?:     string
  thickness?:    number
  label?:        string
  displayValue?: string
  showNeedle?:   boolean
  showTicks?:    boolean
  showMinMax?:   boolean
  ticks?:        number
}

const CX = 100, CY = 95, R = 72
const START_DEG = 210, SWEEP = 120

function toRad(deg: number) { return (deg * Math.PI) / 180 }

function arcPath(startDeg: number, sweep: number): string {
  if (sweep <= 0) return ''
  const s  = toRad(startDeg)
  const e  = toRad(startDeg + sweep)
  const x1 = CX + R * Math.cos(s)
  const y1 = CY + R * Math.sin(s)
  const x2 = CX + R * Math.cos(e)
  const y2 = CY + R * Math.sin(e)
  const lg = sweep > 180 ? 1 : 0
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 ${lg} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

function fmt(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000)     return `${(v / 1_000).toFixed(1)}K`
  return v.toFixed(0)
}

export function JGaugeChart({
  value,
  min          = 0,
  max          = 100,
  size         = '200px',
  colorVar     = '--j-accent',
  thickness    = 14,
  label        = '',
  displayValue,
  showNeedle   = true,
  showTicks    = true,
  showMinMax   = true,
  ticks        = 8,
}: JGaugeChartProps) {
  const pct      = Math.max(0, Math.min(1, (value - min) / ((max - min) || 1)))
  const color    = `var(${colorVar})`
  const valueArc = SWEEP * pct

  const needleAng = toRad(START_DEG + pct * SWEEP)
  const needleX   = CX + (R - 2) * Math.cos(needleAng)
  const needleY   = CY + (R - 2) * Math.sin(needleAng)

  const innerR = R - thickness / 2 - 2
  const outerR = R + thickness / 2 + 4

  return (
    <div style={{ width: size, maxWidth: '100%' } as CSSProperties}>
      <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"
           style={{ width: '100%', height: '100%' } as CSSProperties}>
        {/* Track */}
        <path d={arcPath(START_DEG, SWEEP)} fill="none"
              stroke="var(--j-accent-10)" strokeWidth={thickness}
              strokeLinecap="round" />
        {/* Value arc */}
        {valueArc > 0 && (
          <path d={arcPath(START_DEG, valueArc)} fill="none"
                stroke={color} strokeWidth={thickness} strokeLinecap="round"
                className="j-chart-gauge-arc" />
        )}
        {/* Ticks */}
        {showTicks && Array.from({ length: ticks + 1 }, (_, t) => {
          const ang = toRad(START_DEG + (t / ticks) * SWEEP)
          return (
            <line
              key={t}
              x1={CX + innerR * Math.cos(ang)} y1={CY + innerR * Math.sin(ang)}
              x2={CX + outerR * Math.cos(ang)} y2={CY + outerR * Math.sin(ang)}
              stroke={color} strokeWidth={1}
              className="j-chart-gauge-tick"
            />
          )
        })}
        {/* Needle */}
        {showNeedle && (
          <>
            <line x1={CX} y1={CY} x2={needleX} y2={needleY}
                  stroke={color} strokeWidth={2} strokeLinecap="round"
                  className="j-chart-gauge-needle" />
            <circle cx={CX} cy={CY} r={5} fill={color}
                    className="j-chart-gauge-hub" />
          </>
        )}
        {/* Center value */}
        <text x={CX} y={100} textAnchor="middle"
              className="j-chart-donut-center-val"
              style={{ fontFamily: "'Courier New', monospace" }}>
          {displayValue ?? fmt(value)}
        </text>
        {/* Label */}
        {label && (
          <text x={CX} y={114} textAnchor="middle"
                className="j-chart-donut-center-lbl"
                style={{ fontFamily: "'Courier New', monospace" }}>
            {label}
          </text>
        )}
        {/* Min/Max */}
        {showMinMax && (
          <>
            <text x={14} y={114} textAnchor="start"
                  className="j-chart-axis-label">{fmt(min)}</text>
            <text x={186} y={114} textAnchor="end"
                  className="j-chart-axis-label">{fmt(max)}</text>
          </>
        )}
      </svg>
    </div>
  )
}
