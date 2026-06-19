import { useState } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

export interface JCheckboxProps {
  checked?:        boolean
  defaultChecked?: boolean
  onChange?:       (checked: boolean) => void
  label?:          string
  disabled?:       boolean
  color?:          JColor
}

export function JCheckbox({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
}: JCheckboxProps) {
  const [internal, setInternal] = useState(defaultChecked)
  const isChecked = checked !== undefined ? checked : internal

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
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <div style={{
        width:      14, height: 14, flexShrink: 0,
        background: isChecked ? 'var(--j-accent)' : 'transparent',
        border:     `1px solid ${isChecked ? 'var(--j-accent)' : 'var(--j-border)'}`,
        clipPath:   'polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%)',
        display:    'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow:  isChecked ? '0 0 6px var(--j-accent-25)' : 'none',
        transition: 'all .15s ease',
      }}>
        {isChecked && (
          <div style={{
            width:    6, height: 6,
            background: 'var(--j-bg)',
            clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)',
          }} />
        )}
      </div>
      {label && <span>{label}</span>}
    </label>
  )
}
