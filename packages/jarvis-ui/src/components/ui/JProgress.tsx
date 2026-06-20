import type { JState } from '../../theme/JarvisTokens'

export type JProgressVariant = 'bar' | 'ticks'

export interface JProgressProps {
  value?:         number
  label?:         string
  state?:         JState
  variant?:       JProgressVariant
  indeterminate?: boolean
  showPercent?:   boolean
  total?:         number
}

const TICK_H = [12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10] as const

const STATE_TICK: Partial<Record<string, string>> = {
  warning: 'var(--j-amber)',
  error:   'var(--j-red)',
  success: 'var(--j-green)',
}

const trackStyle: React.CSSProperties = {
  height:    5,
  background:'var(--j-accent-08)',
  clipPath:  'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)',
  position:  'relative',
  overflow:  'hidden',
}

export function JProgress({
  value         = 0,
  label,
  state         = 'active',
  variant       = 'bar',
  indeterminate = false,
  showPercent   = true,
  total         = 16,
}: JProgressProps) {
  const labelRow = label && (
    <div style={{ fontSize: 9, color: 'var(--j-accent-50)', letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
      <span>{label}</span>
      {showPercent && !indeterminate && <span style={{ color: 'var(--j-text-primary)' }}>{value}%</span>}
    </div>
  )

  if (variant === 'ticks') {
    const active   = Math.round(value / 100 * total)
    const tickColor = STATE_TICK[state]
    return (
      <div>
        {labelRow}
        <div className="j-tick-row">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`j-tk${i < active ? '' : ' off'}`}
              style={{ height: TICK_H[i % TICK_H.length], ...(tickColor ? { background: tickColor } : {}) }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {labelRow}
      <div style={trackStyle}>
        {indeterminate ? (
          <>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--j-accent)', opacity: 0.15, clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)' }} />
            <div style={{ position: 'absolute', top: 0, left: -40, bottom: 0, width: 40, background: 'linear-gradient(90deg, transparent, var(--j-accent), transparent)', animation: 'j-scan-h 1.4s ease-in-out infinite' }} />
          </>
        ) : (
          <div style={{ width: `${value}%`, height: '100%', background: 'linear-gradient(90deg, var(--j-accent-deep), var(--j-accent))', clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)', transition: 'width 0.6s ease-out' }} />
        )}
      </div>
    </div>
  )
}
