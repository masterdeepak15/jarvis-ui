import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface JModalProps {
  open:             boolean
  onClose:          () => void
  title:            string
  subTitle?:        string
  closable?:        boolean
  closeOnBackdrop?: boolean
  width?:           string
  notchSize?:       string
  children?:        ReactNode
  footer?:          ReactNode
}

function corner(pos: React.CSSProperties): React.CSSProperties {
  return {
    position:   'absolute',
    width:      14,
    height:     14,
    borderColor:'var(--j-accent)',
    borderStyle:'solid',
    borderWidth:0,
    filter:     'drop-shadow(0 0 4px var(--j-accent))',
    animation:  'j-corner-blink 3s ease-in-out infinite',
    ...pos,
  }
}

export function JModal({ open, onClose, title, subTitle, closable = true, closeOnBackdrop = true, width = '480px', notchSize = '18px', children, footer }: JModalProps) {
  if (!open) return null

  const dialogStyle: React.CSSProperties = {
    position:   'fixed',
    zIndex:     1001,
    top:        '50%',
    left:       '50%',
    transform:  'translate(-50%, -50%)',
    width,
    maxWidth:   'calc(100vw - 32px)',
    background: 'var(--j-bg-card)',
    overflow:   'hidden',
    clipPath:   `polygon(${notchSize} 0%, 100% 0%, 100% calc(100% - ${notchSize}), calc(100% - ${notchSize}) 100%, 0% 100%, 0% ${notchSize})`,
    border:     '1px solid var(--j-accent)',
    fontFamily: "'Courier New', monospace",
  }

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        data-testid="j-modal-backdrop"
        onClick={closeOnBackdrop ? onClose : undefined}
        style={{
          position:       'fixed',
          inset:          0,
          zIndex:         1000,
          background:     'var(--j-bg-overlay)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Dialog */}
      <div style={dialogStyle}>
        {/* Scan line */}
        <div style={{ position: 'absolute', left: 0, right: 0, height: 1, top: -1, background: 'linear-gradient(90deg, transparent, var(--j-cyan), transparent)', animation: 'j-scan-v 3s ease-in-out infinite', pointerEvents: 'none' }} />

        {/* Corner brackets */}
        <div style={corner({ top: 0,    left:  0, borderTopWidth: 2, borderLeftWidth:  2 })} />
        <div style={corner({ top: 0,    right: 0, borderTopWidth: 2, borderRightWidth: 2 })} />
        <div style={corner({ bottom: 0, left:  0, borderBottomWidth: 2, borderLeftWidth:  2 })} />
        <div style={corner({ bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 })} />

        {/* Triangle accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, border: `${notchSize} solid transparent`, borderTopColor: 'var(--j-accent)', borderLeftColor: 'var(--j-accent)', animation: 'j-pulse var(--j-dur-pulse) ease-in-out infinite', pointerEvents: 'none' }} />

        {/* Header */}
        <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid var(--j-accent-12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {subTitle && (
              <div style={{ fontSize: 8, color: 'var(--j-accent)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 3, opacity: 0.7 }}>
                {subTitle}
              </div>
            )}
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--j-text-primary)', letterSpacing: '0.10em', textTransform: 'uppercase' }}>
              {title}
            </div>
          </div>
          {closable && (
            <button
              type="button"
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--j-text-muted)', fontSize: 16, padding: 0, fontFamily: 'inherit' }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '16px 18px', color: 'var(--j-text-secondary)', fontSize: 12, lineHeight: 1.6, letterSpacing: '0.04em' }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{ padding: '10px 18px 14px', borderTop: '1px solid var(--j-accent-08)', display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
            {footer}
          </div>
        )}
      </div>
    </>,
    document.body
  )
}
