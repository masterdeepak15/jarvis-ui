import { useState } from 'react'
import type { ReactNode } from 'react'
import type { JState } from '../../theme/JarvisTokens'

export interface JAlertProps {
  state?:       JState
  title?:       string
  children?:    ReactNode
  dismissible?: boolean
  blink?:       boolean
  onDismiss?:   () => void
}

const STATE_COLOR: Record<string, string> = {
  active:     'var(--j-accent)',
  processing: 'var(--j-accent)',
  warning:    'var(--j-warn)',
  error:      'var(--j-err)',
  success:    'var(--j-ok)',
  idle:       'var(--j-accent-35)',
}

const STATE_BG: Record<string, string> = {
  active:     'var(--j-accent-05)',
  processing: 'var(--j-accent-05)',
  warning:    'var(--j-warn-05)',
  error:      'var(--j-err-05)',
  success:    'var(--j-ok-05)',
  idle:       'var(--j-accent-05)',
}

const ICON: Record<string, string> = {
  warning: '⚠',
  error:   '✕',
  success: '✓',
}

const RAIL_ANIM: Partial<Record<string, string>> = {
  error:   'j-pulse 0.8s ease-in-out infinite',
  warning: 'j-pulse 1.5s ease-in-out infinite',
}

export function JAlert({ state = 'active', title, children, dismissible = false, blink = false, onDismiss }: JAlertProps) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  const accent   = STATE_COLOR[state] ?? STATE_COLOR.active
  const bg       = STATE_BG[state]    ?? STATE_BG.active
  const icon     = ICON[state] ?? 'ℹ'
  const railAnim = RAIL_ANIM[state]

  function dismiss() {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <div
      className={blink ? 'j-blink-slow' : undefined}
      style={{
        position:    'relative',
        display:     'flex',
        alignItems:  'flex-start',
        gap:         10,
        padding:     '10px 14px 10px 16px',
        background:  bg,
        clipPath:    'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
        fontFamily:  "'Courier New', monospace",
      }}
    >
      {/* Left accent rail */}
      <div style={{
        position:   'absolute',
        top:        0,
        bottom:     0,
        left:       0,
        width:      2,
        background: accent,
        boxShadow:  `0 0 8px ${accent}`,
        ...(railAnim ? { animation: railAnim } : {}),
      }} />

      {/* Icon */}
      <span style={{ fontStyle: 'normal', fontSize: 13, flexShrink: 0, color: accent, textShadow: `0 0 8px ${accent}` }}>
        {icon}
      </span>

      {/* Content */}
      <div style={{ flex: 1, fontSize: 11, color: accent, letterSpacing: '0.04em', lineHeight: 1.5 }}>
        {title && (
          <div style={{ fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 2 }}>
            {title}
          </div>
        )}
        {children}
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          type="button"
          onClick={dismiss}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: accent, opacity: 0.6, fontSize: 14, padding: '0 0 0 8px', flexShrink: 0, fontFamily: 'inherit' }}
        >
          ✕
        </button>
      )}
    </div>
  )
}
