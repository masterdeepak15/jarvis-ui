import type { JState } from '../../theme/JarvisTokens'

export interface JDataRowProps {
  label:       string
  value:       string
  barPercent?: number
  state?:      JState
}

const BAR_GRADIENT: Partial<Record<string, string>> = {
  warning: 'linear-gradient(90deg, var(--j-warn-12), var(--j-warn))',
  error:   'linear-gradient(90deg, var(--j-err-12),  var(--j-err))',
  success: 'linear-gradient(90deg, var(--j-ok-12),   var(--j-ok))',
}

const VAL_COLOR: Partial<Record<string, string>> = {
  warning: 'var(--j-amber)',
  error:   'var(--j-red)',
  success: 'var(--j-green)',
}

export function JDataRow({ label, value, barPercent, state = 'active' }: JDataRowProps) {
  const barGrad  = BAR_GRADIENT[state]
  const valColor = VAL_COLOR[state]

  return (
    <div className="j-data-row">
      <span className="j-data-key">{label}</span>
      {barPercent !== undefined && (
        <div className="j-data-bar">
          <div
            className="j-data-bar-fill"
            style={{
              '--j-w': `${barPercent}%`,
              ...(barGrad ? { background: barGrad } : {}),
            } as React.CSSProperties}
          />
        </div>
      )}
      <span className="j-data-val" style={valColor ? { color: valColor } : undefined}>{value}</span>
    </div>
  )
}
