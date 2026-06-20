import type { CSSProperties } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

export interface JArcMeterProps {
  level:        number
  totalArcs?:   number
  color?:       JColor
  orientation?: 'horizontal' | 'vertical'
  showLabel?:   boolean
  label?:       string
  showValue?:   boolean
  arcWidth?:    string
  arcGap?:      string
}

// Creates arc shape — taller in center. Wraps with % length.
const ARC_HEIGHTS = [6, 10, 14, 14, 10, 6, 8, 12, 16, 16, 12, 8]

export function JArcMeter({
  level,
  totalArcs   = 6,
  color: _color = 'cyan',
  orientation = 'horizontal',
  showLabel   = false,
  label       = 'LEVEL',
  showValue   = false,
  arcWidth    = '8px',
  arcGap      = '3px',
}: JArcMeterProps) {
  const isVertical = orientation === 'vertical'

  function segStyle(i: number): CSSProperties {
    const active = i < level
    const peak   = i === level - 1 && level > 0
    const h      = ARC_HEIGHTS[i % ARC_HEIGHTS.length]

    const size: CSSProperties = isVertical
      ? { width: h, height: 4 }
      : { width: arcWidth, height: h }

    let background: string
    let boxShadow: string
    let animation: string | undefined

    if (peak) {
      background = 'linear-gradient(0deg, var(--j-accent-12), var(--j-accent))'
      boxShadow  = '0 0 10px var(--j-accent), 0 0 20px var(--j-accent-25)'
      animation  = 'j-pulse 0.6s ease-in-out infinite'
    } else if (active) {
      background = 'var(--j-accent)'
      boxShadow  = '0 0 5px var(--j-accent-25)'
      animation  = undefined
    } else {
      background = 'var(--j-accent-05)'
      boxShadow  = 'none'
      animation  = undefined
    }

    return {
      ...size,
      background,
      boxShadow,
      clipPath:   'polygon(1px 15%, 100% 0, 100% 100%, 1px 85%)',
      transition: 'background 0.1s, box-shadow 0.1s',
      ...(animation ? { animation } : {}),
    }
  }

  const rowStyle: CSSProperties = isVertical
    ? { display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: arcGap }
    : { display: 'flex', alignItems: 'flex-end', gap: arcGap }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      {showLabel && (
        <div style={{
          fontSize:      8,
          color:         'var(--j-accent-12)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom:  4,
          textAlign:     'center',
          fontFamily:    "'Courier New', monospace",
        }}>
          {label}
        </div>
      )}

      <div style={rowStyle}>
        {Array.from({ length: totalArcs }, (_, i) => (
          <div key={i} data-testid={`arc-seg-${i}`} style={segStyle(i)} />
        ))}
      </div>

      {showValue && (
        <div style={{
          fontSize:      9,
          letterSpacing: '0.10em',
          marginTop:     4,
          textAlign:     'center',
          color:         level > 0 ? 'var(--j-accent)' : 'var(--j-text-dim)',
          transition:    'color 0.2s',
          fontFamily:    "'Courier New', monospace",
        }}>
          {level} / {totalArcs}
        </div>
      )}
    </div>
  )
}
