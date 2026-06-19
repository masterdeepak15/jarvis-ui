import type { JColor, JSize } from '../../theme/JarvisTokens'

export interface JTextAreaProps {
  value?:        string
  defaultValue?: string
  onChange?:     (value: string) => void
  placeholder?:  string
  disabled?:     boolean
  readOnly?:     boolean
  error?:        boolean
  rows?:         number
  resize?:       'none' | 'vertical' | 'both'
  color?:        JColor
  size?:         JSize
}

const SIZE_FONT: Record<string, number> = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 }

export function JTextArea({
  value,
  defaultValue,
  onChange,
  placeholder  = '',
  disabled     = false,
  readOnly     = false,
  error        = false,
  rows         = 4,
  resize       = 'none',
  size         = 'md',
}: JTextAreaProps) {
  const style: React.CSSProperties = {
    width:         '100%',
    boxSizing:     'border-box',
    background:    'var(--j-bg-panel)',
    border:        `1px solid ${error ? 'var(--j-err)' : 'var(--j-border)'}`,
    borderColor:   error ? 'var(--j-err)' : 'var(--j-border)',
    color:         error ? 'var(--j-err)' : 'var(--j-accent)',
    fontFamily:    "'Courier New', monospace",
    fontSize:      SIZE_FONT[size] ?? 12,
    letterSpacing: '.08em',
    padding:       '10px 12px',
    outline:       'none',
    clipPath:      'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
    opacity:       disabled ? 0.4 : 1,
    cursor:        disabled ? 'not-allowed' : 'text',
    resize,
    boxShadow:     error ? '0 0 8px var(--j-err-25)' : 'none',
  }

  const controlled = value !== undefined
    ? { value, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange?.(e.target.value) }
    : { defaultValue }

  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      style={style}
      {...controlled}
    />
  )
}
