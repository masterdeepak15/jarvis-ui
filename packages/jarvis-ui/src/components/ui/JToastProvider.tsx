import { createContext, useContext, useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import type { JState } from '../../theme/JarvisTokens'

// ── Internal types ───────────────────────────────────────────────
interface ToastItem {
  id:       string
  state:    JState
  message:  string
  title?:   string
  duration: number
}

interface ToastCtxValue {
  show:    (state: JState, message: string, title?: string, duration?: number) => string
  dismiss: (id: string) => void
}

// ── Context ──────────────────────────────────────────────────────
const JToastContext = createContext<ToastCtxValue | null>(null)

export function useToast(): ToastCtxValue {
  const ctx = useContext(JToastContext)
  if (!ctx) throw new Error('useToast must be used within JToastProvider')
  return ctx
}

// ── Individual toast (internal) ──────────────────────────────────
interface ToastProps extends ToastItem { onDismiss: () => void }

const STATE_COLOR: Record<string, string> = {
  active:     'var(--j-accent)',
  processing: 'var(--j-accent)',
  warning:    'var(--j-warn)',
  error:      'var(--j-err)',
  success:    'var(--j-ok)',
  idle:       'var(--j-accent)',
}

const ICON: Record<string, string> = {
  warning: '⚠',
  error:   '✕',
  success: '✓',
}

const RAIL_ANIM: Partial<Record<string, string>> = {
  error:   'j-pulse 0.7s ease-in-out infinite',
  warning: 'j-pulse 1.3s ease-in-out infinite',
}

function JToast({ id: _id, state, message, title, duration, onDismiss }: ToastProps) {
  const color = STATE_COLOR[state] ?? STATE_COLOR.active
  const icon  = ICON[state] ?? 'ℹ'
  const anim  = RAIL_ANIM[state]

  useEffect(() => {
    if (duration <= 0) return
    const t = setTimeout(onDismiss, duration)
    return () => clearTimeout(t)
  }, [duration, onDismiss])

  return (
    <div
      onClick={onDismiss}
      style={{
        position:      'relative',
        overflow:      'hidden',
        cursor:        'pointer',
        background:    'var(--j-bg-card)',
        border:        `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
        clipPath:      'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)',
        boxShadow:     `0 0 16px color-mix(in srgb, ${color} 18%, transparent)`,
        fontFamily:    "'Courier New', monospace",
        animation:     'j-slide-in 0.3s ease-out both',
        pointerEvents: 'all',
      }}
    >
      {/* Left rail */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 2, background: color, boxShadow: `0 0 8px ${color}`, ...(anim ? { animation: anim } : {}) }} />

      {/* Scan line */}
      <div style={{ position: 'absolute', left: 0, right: 0, height: 1, top: -1, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, animation: 'j-scan-v 2.5s ease-in-out infinite', pointerEvents: 'none' }} />

      {/* Corner accent */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 0, height: 0, border: '8px solid transparent', borderTopColor: color, borderRightColor: color, opacity: 0.5 }} />

      {/* Content */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 14px 10px 16px' }}>
        <span style={{ fontStyle: 'normal', fontSize: 13, color, flexShrink: 0, filter: `drop-shadow(0 0 4px ${color})` }}>{icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <div style={{ fontSize: 9, color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2, fontWeight: 600 }}>{title}</div>
          )}
          <div style={{ fontSize: 11, color: 'var(--j-text-secondary)', letterSpacing: '0.04em', lineHeight: 1.4 }}>{message}</div>
        </div>
      </div>

      {/* Progress bar */}
      {duration > 0 && (
        <div style={{ height: 2, background: `color-mix(in srgb, ${color} 8%, transparent)`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: `linear-gradient(90deg, color-mix(in srgb, ${color} 80%, transparent), ${color})`, animation: `j-bar-grow ${duration}ms linear forwards`, ['--j-w' as string]: '100%' }} />
        </div>
      )}
    </div>
  )
}

// ── Provider ─────────────────────────────────────────────────────
export interface JToastProviderProps { children: ReactNode }

export function JToastProvider({ children }: JToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const counter = useRef(0)

  function show(state: JState, message: string, title?: string, duration = 4000): string {
    const id = `toast-${++counter.current}`
    setToasts(prev => [...prev, { id, state, message, title, duration }])
    return id
  }

  function dismiss(id: string) {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <JToastContext.Provider value={{ show, dismiss }}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 2000, display: 'flex', flexDirection: 'column-reverse', gap: 8, pointerEvents: 'none', width: 320 }}>
        {toasts.map(t => (
          <JToast key={t.id} {...t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </JToastContext.Provider>
  )
}
