import { useState } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

export interface JSliderProps {
  value?:        number
  defaultValue?: number
  onChange?:     (value: number) => void
  min?:          number
  max?:          number
  step?:         number
  disabled?:     boolean
  showValue?:    boolean
  color?:        JColor
}

export function JSlider({
  value,
  defaultValue,
  onChange,
  min       = 0,
  max       = 100,
  step      = 1,
  disabled  = false,
  showValue = true,
}: JSliderProps) {
  const [internal, setInternal] = useState(defaultValue ?? min)
  const current = value !== undefined ? value : internal
  const pct     = max > min ? ((current - min) / (max - min)) * 100 : 0

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const n = Number(e.target.value)
    if (value === undefined) setInternal(n)
    onChange?.(n)
  }

  return (
    <div style={{
      display:    'flex',
      alignItems: 'center',
      gap:        10,
      fontFamily: "'Courier New', monospace",
      opacity:    disabled ? 0.4 : 1,
    }}>
      <div style={{ position: 'relative', flex: 1, height: 20 }}>
        {/* Track */}
        <div style={{
          position:  'absolute', top: '50%', left: 0, right: 0,
          height:    2, transform: 'translateY(-50%)',
          background: 'var(--j-border)',
        }} />
        {/* Fill */}
        <div style={{
          position:   'absolute', top: '50%', left: 0,
          width:      `${pct}%`, height: 2,
          transform:  'translateY(-50%)',
          background: 'var(--j-accent)',
          boxShadow:  '0 0 6px var(--j-accent-25)',
          transition: 'width .1s ease',
        }} />
        {/* Invisible native range input handles interaction */}
        <input
          type="range"
          min={min} max={max} step={step}
          value={current}
          onChange={handleChange}
          disabled={disabled}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            opacity:  0, cursor: disabled ? 'not-allowed' : 'pointer', margin: 0,
          }}
        />
        {/* Custom diamond thumb */}
        <div style={{
          position:      'absolute', top: '50%', left: `${pct}%`,
          transform:     'translate(-50%, -50%)',
          width:         12, height: 12, pointerEvents: 'none',
          background:    'var(--j-accent)',
          clipPath:      'polygon(50% 0,100% 50%,50% 100%,0 50%)',
          boxShadow:     '0 0 8px var(--j-accent)',
        }} />
      </div>
      {showValue && (
        <span style={{
          fontSize:   11,
          color:      'var(--j-accent)',
          letterSpacing: '.06em',
          minWidth:   32,
          textAlign:  'right',
        }}>
          {current}
        </span>
      )}
    </div>
  )
}
