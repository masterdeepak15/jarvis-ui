import { useState } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

export interface JToggleProps {
  checked?:        boolean
  defaultChecked?: boolean
  onChange?:       (checked: boolean) => void
  label?:          string
  disabled?:       boolean
  color?:          JColor
}

export function JToggle({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
}: JToggleProps) {
  const [internal, setInternal] = useState(defaultChecked)
  const isOn = checked !== undefined ? checked : internal

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (disabled) return
    if (checked === undefined) setInternal(e.target.checked)
    onChange?.(e.target.checked)
  }

  return (
    <label style={{
      display:    'inline-flex',
      alignItems: 'center',
      gap:        8,
      cursor:     disabled ? 'not-allowed' : 'pointer',
      opacity:    disabled ? 0.4 : 1,
      fontFamily: "'Courier New', monospace",
      fontSize:   11,
      color:      'var(--j-text-primary)',
      userSelect: 'none',
    }}>
      <input
        type="checkbox"
        checked={isOn}
        onChange={handleChange}
        disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <div style={{
        width:      36, height: 18, flexShrink: 0, position: 'relative',
        background: isOn ? 'var(--j-accent-25)' : 'var(--j-bg-panel)',
        border:     `1px solid ${isOn ? 'var(--j-accent)' : 'var(--j-border)'}`,
        clipPath:   'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
        boxShadow:  isOn ? '0 0 8px var(--j-accent-25)' : 'none',
        transition: 'all .2s ease',
      }}>
        <div style={{
          position:   'absolute',
          top:        2,
          width:      12, height: 12,
          left:       isOn ? 'calc(100% - 15px)' : '3px',
          background: isOn ? 'var(--j-accent)' : 'var(--j-border)',
          clipPath:   'polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%)',
          boxShadow:  isOn ? '0 0 6px var(--j-accent)' : 'none',
          transition: 'left .2s ease',
        }} />
      </div>
      {label && <span>{label}</span>}
    </label>
  )
}
