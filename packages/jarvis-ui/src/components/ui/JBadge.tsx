import type { ReactNode } from 'react'
import type { JColor, JSize } from '../../theme/JarvisTokens'

export type JBadgeShape = 'angular' | 'hex' | 'diamond' | 'pill'

export interface JBadgeProps {
  color?:    JColor
  size?:     JSize
  shape?:    JBadgeShape
  blink?:    boolean
  showDot?:  boolean
  children?: ReactNode
}

const COLOR_STYLE: Record<string, React.CSSProperties> = {
  cyan:  { background: 'var(--j-accent-12)', color: 'var(--j-cyan)',       border: '1px solid var(--j-accent-35)'  },
  amber: { background: 'var(--j-warn-12)',   color: 'var(--j-amber)',      border: '1px solid var(--j-warn-25)'    },
  red:   { background: 'var(--j-err-12)',    color: 'var(--j-red)',        border: '1px solid var(--j-err-25)'     },
  green: { background: 'var(--j-ok-12)',     color: 'var(--j-green)',      border: '1px solid var(--j-ok-25)'      },
  ghost: { background: 'var(--j-accent-05)', color: 'var(--j-text-muted)', border: '1px solid var(--j-border-dim)' },
  blue:  { background: 'var(--j-accent-12)', color: 'var(--j-accent)',     border: '1px solid var(--j-accent-35)'  },
  white: { background: 'var(--j-accent-05)', color: 'var(--j-text-primary)',border: '1px solid var(--j-border)'    },
}

const SIZE_STYLE: Record<string, React.CSSProperties> = {
  xs: { fontSize: 8,  padding: '2px 7px'  },
  sm: { fontSize: 9,  padding: '3px 9px'  },
  md: { fontSize: 10, padding: '4px 12px' },
  lg: { fontSize: 11, padding: '5px 14px' },
  xl: { fontSize: 12, padding: '6px 16px' },
}

const SHAPE_STYLE: Record<JBadgeShape, React.CSSProperties> = {
  angular: { clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' },
  hex:     { clipPath: 'polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)', paddingLeft: 14, paddingRight: 14 },
  diamond: { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 },
  pill:    { borderRadius: '999px' },
}

const DOT_COLOR: Partial<Record<string, React.CSSProperties>> = {
  amber: { background: 'var(--j-amber)' },
  red:   { background: 'var(--j-red)'   },
  green: { background: 'var(--j-green)' },
}

export function JBadge({ color = 'cyan', size = 'sm', shape = 'angular', blink = false, showDot = false, children }: JBadgeProps) {
  const style: React.CSSProperties = {
    display:       'inline-flex',
    alignItems:    'center',
    letterSpacing: '0.10em',
    textTransform: 'uppercase',
    fontFamily:    "'Courier New', monospace",
    ...(COLOR_STYLE[color] ?? COLOR_STYLE.cyan),
    ...(SIZE_STYLE[size]   ?? SIZE_STYLE.sm),
    ...SHAPE_STYLE[shape],
  }
  return (
    <span className={blink ? 'j-blink' : undefined} style={style}>
      {showDot && (
        <span
          className="j-status-dot"
          style={{ marginRight: 5, display: 'inline-block', flexShrink: 0, ...(DOT_COLOR[color] ?? {}) }}
        />
      )}
      {children}
    </span>
  )
}
