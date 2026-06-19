import type { JColor, JSize } from '../../theme/JarvisTokens'

export interface JInputProps {
  type?:         'text' | 'email' | 'password' | 'number' | 'search'
  value?:        string
  defaultValue?: string
  onChange?:     (value: string) => void
  placeholder?:  string
  disabled?:     boolean
  readOnly?:     boolean
  error?:        boolean
  color?:        JColor
  size?:         JSize
}

const SIZE_H:    Record<string, number> = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }
const SIZE_FONT: Record<string, number> = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 }

export function JInput({
  type         = 'text',
  value,
  defaultValue,
  onChange,
  placeholder  = '',
  disabled     = false,
  readOnly     = false,
  error        = false,
  size         = 'md',
}: JInputProps) {
  const style: React.CSSProperties = {
    height:        SIZE_H[size] ?? 38,
    width:         '100%',
    boxSizing:     'border-box',
    background:    'var(--j-bg-panel)',
    border:        `1px solid ${error ? 'var(--j-err)' : 'var(--j-border)'}`,
    borderColor:   error ? 'var(--j-err)' : 'var(--j-border)',
    color:         error ? 'var(--j-err)' : 'var(--j-accent)',
    fontFamily:    "'Courier New', monospace",
    fontSize:      SIZE_FONT[size] ?? 12,
    letterSpacing: '.08em',
    padding:       '0 12px',
    outline:       'none',
    clipPath:      'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
    opacity:       disabled ? 0.4 : 1,
    cursor:        disabled ? 'not-allowed' : 'text',
    boxShadow:     error ? '0 0 8px var(--j-err-25)' : 'none',
  }

  const controlled = value !== undefined
    ? { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value) }
    : { defaultValue }

  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      style={style}
      {...controlled}
    />
  )
}
