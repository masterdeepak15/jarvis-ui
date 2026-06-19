import { useState, useEffect, useRef } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import type { JColor } from '../../theme/JarvisTokens'

export interface JDatePickerProps {
  value?:       Date
  onChange?:    (date: Date | undefined) => void
  placeholder?: string
  disabled?:    boolean
  minDate?:     Date
  maxDate?:     Date
  color?:       JColor
}

function fmt(d: Date | undefined): string {
  if (!d) return ''
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function JDatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  disabled    = false,
  minDate,
  maxDate,
}: JDatePickerProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const triggerStyle: React.CSSProperties = {
    display:       'inline-flex',
    alignItems:    'center',
    gap:           8,
    height:        38,
    padding:       '0 12px',
    background:    'var(--j-bg-panel)',
    border:        '1px solid var(--j-border)',
    color:         value ? 'var(--j-accent)' : 'var(--j-text-dim)',
    fontFamily:    "'Courier New', monospace",
    fontSize:      12,
    letterSpacing: '.08em',
    cursor:        disabled ? 'not-allowed' : 'pointer',
    clipPath:      'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
    opacity:       disabled ? 0.4 : 1,
  }

  const popoverStyle: React.CSSProperties = {
    position:   'absolute',
    zIndex:     100,
    top:        '100%',
    left:       0,
    marginTop:  4,
    background: 'var(--j-bg-overlay, var(--j-bg-panel))',
    border:     '1px solid var(--j-border)',
    clipPath:   'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
    padding:    '8px 12px',
    color:      'var(--j-text-primary)',
    fontFamily: "'Courier New', monospace",
  }

  const disabled_matchers = [
    ...(minDate ? [{ before: minDate }] : []),
    ...(maxDate ? [{ after:  maxDate }] : []),
  ]

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        style={triggerStyle}
        disabled={disabled}
        onClick={() => { if (!disabled) setOpen(o => !o) }}
      >
        <span style={{ fontSize: 10 }}>◈</span>
        <span>{fmt(value) || placeholder}</span>
      </button>
      {open && (
        <div style={popoverStyle}>
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(d) => { onChange?.(d); setOpen(false) }}
            disabled={disabled_matchers.length > 0 ? disabled_matchers : undefined}
          />
        </div>
      )}
    </div>
  )
}
