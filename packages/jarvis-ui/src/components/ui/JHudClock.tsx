import { useState, useEffect } from 'react'

export interface JHudClockProps {
  /** Show analog ring */
  analog?: boolean
  /** Color */
  color?: 'cyan' | 'amber' | 'green' | 'red' | 'blue' | 'white'
  /** Size of analog ring in px */
  size?: number
  /** Show date below */
  showDate?: boolean
  className?: string
  style?: React.CSSProperties
}

const COLOR_MAP: Record<string, string> = {
  cyan:  'var(--j-accent)',
  amber: 'var(--j-warn)',
  green: 'var(--j-ok)',
  red:   'var(--j-err)',
  blue:  'var(--j-accent)',
  white: 'var(--j-text-primary)',
}

export function JHudClock({
  analog = true,
  color = 'cyan',
  size = 120,
  showDate = true,
  className,
  style,
}: JHudClockProps) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const accent = COLOR_MAP[color] ?? 'var(--j-accent)'
  const pad = (n: number) => String(n).padStart(2, '0')
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()

  // Analog angles
  const secAngle  = (now.getSeconds() / 60) * 360
  const minAngle  = ((now.getMinutes() + now.getSeconds() / 60) / 60) * 360
  const hourAngle = ((now.getHours() % 12 + now.getMinutes() / 60) / 12) * 360

  const cx = size / 2
  const cy = size / 2
  const R  = size / 2 - 4

  const handEnd = (angle: number, len: number) => ({
    x: cx + len * Math.sin((angle * Math.PI) / 180),
    y: cy - len * Math.cos((angle * Math.PI) / 180),
  })

  const hEnd = handEnd(hourAngle, R * 0.48)
  const mEnd = handEnd(minAngle,  R * 0.65)
  const sEnd = handEnd(secAngle,  R * 0.80)

  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2
    const major = i % 5 === 0
    const ri = R - (major ? 10 : 5)
    return {
      x1: cx + R  * Math.cos(a), y1: cy + R  * Math.sin(a),
      x2: cx + ri * Math.cos(a), y2: cy + ri * Math.sin(a),
      major,
    }
  })

  return (
    <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontFamily: "'Courier New', monospace", ...style }}>
      {analog && (
        <svg width={size} height={size}>
          {/* Outer ring */}
          <circle cx={cx} cy={cy} r={R} fill="none" stroke={accent} strokeWidth={1.5} opacity={.5} />
          <circle cx={cx} cy={cy} r={R - 14} fill="none" stroke={accent} strokeWidth={.5} opacity={.2} />

          {/* Ticks */}
          {ticks.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={accent} strokeWidth={t.major ? 1.5 : 0.6} opacity={t.major ? 0.8 : 0.3} />
          ))}

          {/* Hour markers (12, 3, 6, 9) */}
          {[0, 3, 6, 9].map(i => {
            const a = (i / 12) * Math.PI * 2
            const pr = R - 18
            return (
              <text key={i} x={cx + pr * Math.sin(a)} y={cy - pr * Math.cos(a) + 4}
                textAnchor="middle" fill={accent} fontSize={8} fontFamily="'Courier New'" opacity={.7}>
                {i === 0 ? '12' : i * 3}
              </text>
            )
          })}

          {/* Hands */}
          <line x1={cx} y1={cy} x2={hEnd.x} y2={hEnd.y} stroke={accent} strokeWidth={2.5} strokeLinecap="round" opacity={.9} />
          <line x1={cx} y1={cy} x2={mEnd.x} y2={mEnd.y} stroke={accent} strokeWidth={1.8} strokeLinecap="round" opacity={.85} />
          <line x1={cx} y1={cy} x2={sEnd.x} y2={sEnd.y} stroke="var(--j-err)" strokeWidth={1} strokeLinecap="round" />

          {/* Center dot */}
          <circle cx={cx} cy={cy} r={3} fill={accent} />
          <circle cx={cx} cy={cy} r={6} fill="none" stroke={accent} strokeWidth={.7} opacity={.4} />
        </svg>
      )}

      {/* Digital readout */}
      <div style={{ fontSize: analog ? 13 : 22, color: accent, letterSpacing: '0.15em', lineHeight: 1 }}>
        {timeStr}
      </div>

      {showDate && (
        <div style={{ fontSize: 8, color: 'var(--j-text-muted)', letterSpacing: '0.12em' }}>
          {dateStr}
        </div>
      )}
    </div>
  )
}
