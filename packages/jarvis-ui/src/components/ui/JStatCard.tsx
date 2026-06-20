import type { ReactNode } from 'react'
import type { JCardStyle, JColor, JState } from '../../theme/JarvisTokens'
import { JarvisTokens } from '../../theme/JarvisTokens'
import { JCard } from './JCard'
import { JBadge } from './JBadge'
import { JProgress } from './JProgress'
import { JDataRow } from './JDataRow'

export interface JStatCardDataRow {
  label:       string
  value:       string
  barPercent?: number
}

export interface JStatCardProps {
  cardStyle?: JCardStyle
  color?:     JColor
  padding?:   string

  title:           string
  value:           string
  sub?:            string
  state?:          JState
  badge?:          string
  badgeColor?:     JColor
  showStatusDot?:  boolean
  barValue?:       number
  dataRows?:       JStatCardDataRow[]
  children?:       ReactNode
}

const STATE_VAL_CLS: Partial<Record<string, string>> = {
  warning: 'j-text-warn',
  error:   'j-text-err',
  success: 'j-text-ok',
}

const DOT_COLOR: Partial<Record<string, React.CSSProperties>> = {
  warning: { background: 'var(--j-amber)' },
  error:   { background: 'var(--j-red)'   },
  success: { background: 'var(--j-green)' },
}

export function JStatCard({
  cardStyle    = 'CornerBracket',
  color        = 'cyan',
  padding      = '14px 16px',
  title,
  value,
  sub,
  state        = 'active',
  badge,
  badgeColor   = 'cyan',
  showStatusDot = false,
  barValue,
  dataRows,
  children,
}: JStatCardProps) {
  const valCls  = JarvisTokens.cls('j-text-val', STATE_VAL_CLS[state] ?? null)
  const dotStyle = DOT_COLOR[state]

  return (
    <JCard cardStyle={cardStyle} color={color} padding={padding}>
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div className="j-text-xs">{title}</div>
        {badge && <JBadge color={badgeColor} size="xs">{badge}</JBadge>}
      </div>

      {/* Value */}
      <div className={valCls}>{value}</div>

      {/* Sub */}
      {sub && (
        <div className="j-text-sub" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {showStatusDot && <span className="j-status-dot" style={dotStyle} />}
          {sub}
        </div>
      )}

      {/* Progress bar */}
      {barValue !== undefined && (
        <div style={{ marginTop: 8 }}>
          <JProgress value={barValue} variant="bar" showPercent={false} />
        </div>
      )}

      {/* Data rows */}
      {dataRows && dataRows.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {dataRows.map(r => (
            <JDataRow key={r.label} label={r.label} value={r.value} barPercent={r.barPercent} />
          ))}
        </div>
      )}

      {children}
    </JCard>
  )
}
