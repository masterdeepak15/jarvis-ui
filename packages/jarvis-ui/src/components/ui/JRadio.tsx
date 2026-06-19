import type { JColor } from '../../theme/JarvisTokens'

export interface JRadioProps {
  checked?:  boolean
  onChange?: (value: string) => void
  label?:    string
  value:     string
  name?:     string
  disabled?: boolean
  color?:    JColor
}

export function JRadio({ checked, onChange, label, value, name, disabled = false }: JRadioProps) {
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
        type="radio"
        checked={checked}
        value={value}
        name={name}
        disabled={disabled}
        onChange={() => { if (!disabled) onChange?.(value) }}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <div style={{
        width:      14, height: 14, flexShrink: 0,
        border:     `1px solid ${checked ? 'var(--j-accent)' : 'var(--j-border)'}`,
        clipPath:   'polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)',
        display:    'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .15s ease',
      }}>
        {checked && (
          <div style={{
            width:     6, height: 6,
            background: 'var(--j-accent)',
            clipPath:   'polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)',
            boxShadow:  '0 0 4px var(--j-accent)',
          }} />
        )}
      </div>
      {label && <span>{label}</span>}
    </label>
  )
}
