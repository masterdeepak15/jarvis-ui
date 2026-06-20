import type { ReactNode } from 'react'
import type { JState } from '../../theme/JarvisTokens'

export interface JStatusPillProps {
  state?:    JState
  blink?:    boolean
  children?: ReactNode
}

const STATE_MAP: Record<string, { bg: string; accent: string }> = {
  active:     { bg: 'var(--j-accent-08)',  accent: 'var(--j-accent)'    },
  processing: { bg: 'var(--j-accent-08)',  accent: 'var(--j-accent)'    },
  warning:    { bg: 'var(--j-warn-05)',    accent: 'var(--j-warn)'      },
  error:      { bg: 'var(--j-err-05)',     accent: 'var(--j-err)'       },
  success:    { bg: 'var(--j-ok-05)',      accent: 'var(--j-ok)'        },
  idle:       { bg: 'var(--j-accent-05)', accent: 'var(--j-accent-18)' },
}

const DOT_OVERRIDE: Partial<Record<string, React.CSSProperties>> = {
  warning: { background: 'var(--j-amber)', animationDuration: '1.8s' },
  error:   { background: 'var(--j-red)',   animationDuration: '0.7s' },
  success: { background: 'var(--j-green)', animationDuration: '2.5s' },
  idle:    { background: 'var(--j-accent-25)', animation: 'none'    },
}

export function JStatusPill({ state = 'active', blink = false, children }: JStatusPillProps) {
  const { bg, accent } = STATE_MAP[state] ?? STATE_MAP.active

  return (
    <div
      className={blink ? 'j-blink-slow' : undefined}
      style={{
        display:    'flex',
        alignItems: 'center',
        gap:        8,
        padding:    '7px 16px 7px 12px',
        background: bg,
        borderLeft: `2px solid ${accent}`,
        clipPath:   'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
        fontFamily: "'Courier New', monospace",
      }}
    >
      <span className="j-status-dot" style={DOT_OVERRIDE[state]} />
      <span style={{ fontSize: 11, letterSpacing: '0.08em', color: accent }}>{children}</span>
    </div>
  )
}
