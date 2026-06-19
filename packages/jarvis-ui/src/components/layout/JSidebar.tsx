import { useState, useEffect, type ReactNode } from 'react'
import type { JColor } from '../../theme/JarvisTokens'
import { JarvisTokens } from '../../theme/JarvisTokens'
import { JSpinner } from './JSpinner'

export interface JSidebarProps {
  systemName?: string
  version?:    string
  navLabel?:   string
  width?:      string
  color?:      JColor
  children?:   ReactNode
  footer?:     ReactNode
}

function clock(): string {
  const d = new Date()
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

export function JSidebar({
  systemName = 'JARVIS',
  version    = 'v4.2.1',
  navLabel   = 'Navigation',
  width      = '220px',
  color      = 'cyan',
  children,
  footer,
}: JSidebarProps) {
  const [time, setTime] = useState(clock)

  useEffect(() => {
    const id = setInterval(() => setTime(clock()), 10_000)
    return () => clearInterval(id)
  }, [])

  return (
    <aside
      className={JarvisTokens.cls('j-sidebar', JarvisTokens.color(color))}
      style={{ width, flexShrink: 0 }}
    >
      {/* Vertical scan line */}
      <div style={{
        position:   'absolute', top: 0, left: 0, right: 0,
        height:     2,
        background: 'linear-gradient(90deg,transparent,var(--j-accent),transparent)',
        opacity:    0.7,
        animation:  'j-scan-v var(--j-dur-scan) linear infinite',
        pointerEvents: 'none',
        zIndex:     1,
      }} />

      {/* Brand header */}
      <div style={{
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        padding:       '20px 14px 14px',
        borderBottom:  '1px solid var(--j-accent-12)',
        gap:           8,
      }}>
        <JSpinner size="36px" color={color} />
        <div className="j-glitch" style={{
          fontSize:      13,
          letterSpacing: '.20em',
          textTransform: 'uppercase',
          color:         'var(--j-accent)',
          fontFamily:    "'Courier New', monospace",
        }}>
          {systemName}
        </div>
        <div style={{ fontSize: 8, color: 'var(--j-text-dim)', letterSpacing: '.12em' }}>
          {version}
        </div>
        <div className="j-status-dot" />
      </div>

      {/* Nav label */}
      {navLabel && (
        <div style={{
          fontSize:      8,
          color:         'var(--j-accent-70)',
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          padding:       '10px 14px 6px',
        }}>
          {navLabel}
        </div>
      )}

      {/* Nav slot */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {children}
      </nav>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,var(--j-accent-25),transparent)', margin: '0 8px' }} />

      {/* Footer slot */}
      {footer && <div style={{ padding: '8px 14px' }}>{footer}</div>}

      {/* System time footer */}
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        padding:        '8px 14px',
        fontFamily:     "'Courier New', monospace",
        fontSize:       8,
        color:          'var(--j-text-dim)',
        letterSpacing:  '.08em',
      }}>
        <span>SYS · {time}</span>
        <span className="j-blink" style={{ color: 'var(--j-ok)', letterSpacing: '.10em' }}>● LIVE</span>
      </div>
    </aside>
  )
}
