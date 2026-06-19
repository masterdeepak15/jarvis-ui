import { useState, useEffect } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

export interface JTimePickerProps {
  value?:       string
  onChange?:    (time: string) => void
  placeholder?: string
  disabled?:    boolean
  format?:      '12h' | '24h'
  color?:       JColor
}

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }
function pad(n: number) { return String(n).padStart(2, '0') }

export function JTimePicker({
  value,
  onChange,
  disabled = false,
  format   = '24h',
}: JTimePickerProps) {
  const [hStr, setHStr] = useState(value ? value.split(':')[0] : '')
  const [mStr, setMStr] = useState(value ? value.split(':')[1] : '')

  useEffect(() => {
    if (value) {
      setHStr(value.split(':')[0])
      setMStr(value.split(':')[1])
    }
  }, [value])

  const maxH = format === '12h' ? 12 : 23

  function commitH(raw: string) {
    const n = clamp(parseInt(raw || '0', 10), 0, maxH)
    const h = pad(n)
    setHStr(h)
    onChange?.(`${h}:${mStr || '00'}`)
  }

  function commitM(raw: string) {
    const n = clamp(parseInt(raw || '0', 10), 0, 59)
    const m = pad(n)
    setMStr(m)
    onChange?.(`${hStr || '00'}:${m}`)
  }

  const numStyle: React.CSSProperties = {
    width:         44,
    height:        38,
    textAlign:     'center',
    background:    'var(--j-bg-panel)',
    border:        '1px solid var(--j-border)',
    color:         'var(--j-accent)',
    fontFamily:    "'Courier New', monospace",
    fontSize:      16,
    letterSpacing: '.1em',
    outline:       'none',
    clipPath:      'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, opacity: disabled ? 0.4 : 1 }}>
      <input
        type="number"
        min={0} max={maxH}
        value={hStr}
        placeholder="HH"
        disabled={disabled}
        onChange={e => setHStr(e.target.value)}
        onBlur={e => commitH(e.target.value)}
        style={numStyle}
      />
      <span style={{ color: 'var(--j-accent)', fontFamily: "'Courier New', monospace", fontSize: 16, userSelect: 'none' }}>:</span>
      <input
        type="number"
        min={0} max={59}
        value={mStr}
        placeholder="MM"
        disabled={disabled}
        onChange={e => setMStr(e.target.value)}
        onBlur={e => commitM(e.target.value)}
        style={numStyle}
      />
    </div>
  )
}
