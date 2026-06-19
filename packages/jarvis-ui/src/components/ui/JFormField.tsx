import type { ReactNode } from 'react'

export interface JFormFieldProps {
  label?:    string
  error?:    string
  hint?:     string
  required?: boolean
  children:  ReactNode
}

export function JFormField({ label, error, hint, required, children }: JFormFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: "'Courier New', monospace" }}>
      {label && (
        <label style={{
          fontSize:      10,
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color:         'var(--j-text-muted)',
        }}>
          {label}
          {required && <span style={{ color: 'var(--j-err)', marginLeft: 2 }}>*</span>}
        </label>
      )}
      {children}
      {error && (
        <span style={{ fontSize: 10, color: 'var(--j-err)', letterSpacing: '.06em' }}>{error}</span>
      )}
      {!error && hint && (
        <span style={{ fontSize: 10, color: 'var(--j-text-dim)', letterSpacing: '.06em' }}>{hint}</span>
      )}
    </div>
  )
}
