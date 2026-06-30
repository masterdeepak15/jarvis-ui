export interface JHeatmapCell {
  value: number   // 0-100
  label?: string
  tooltip?: string
}

export interface JHeatmapProps {
  /** 2D grid data. rows × cols */
  data: JHeatmapCell[][]
  /** Color palette — maps to theme accent tokens, not hardcoded hex */
  color?: 'cyan' | 'amber' | 'green' | 'red'
  /** Cell size in px */
  cellSize?: number
  /** Gap between cells */
  gap?: number
  /** Show value inside cell */
  showValue?: boolean
  /** Title */
  title?: string
  className?: string
  style?: React.CSSProperties
}

// Maps to real theme CSS variables — these swap automatically with
// JThemeProvider preset changes and light/dark mode, unlike raw hex.
const ACCENT_VAR: Record<string, string> = {
  cyan:  'var(--j-accent)',
  amber: 'var(--j-warn)',
  green: 'var(--j-ok)',
  red:   'var(--j-err)',
}

export function JHeatmap({
  data,
  color = 'cyan',
  cellSize = 28,
  gap = 3,
  showValue = false,
  title,
  className,
  style,
}: JHeatmapProps) {
  const accent = ACCENT_VAR[color] ?? ACCENT_VAR.cyan

  return (
    <div className={className} style={{ fontFamily: "'Courier New', monospace", ...style }}>
      {title && (
        <div style={{ fontSize: 8, color: accent, letterSpacing: '0.18em', marginBottom: 8 }}>
          {title}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap }}>
        {data.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap }}>
            {row.map((cell, ci) => {
              const t = Math.max(0, Math.min(100, cell.value)) / 100
              // color-mix() blends the live theme accent with the card
              // background — this re-renders correctly across every
              // theme preset AND light/dark mode with zero hardcoded hex.
              const bg  = `color-mix(in srgb, ${accent} ${Math.round(t * 100)}%, var(--j-bg-card))`
              const txt = t > 0.55 ? 'var(--j-bg)' : accent
              return (
                <div
                  key={ci}
                  title={cell.tooltip ?? cell.label ?? `${cell.value}%`}
                  style={{
                    width:          cellSize,
                    height:         cellSize,
                    background:     bg,
                    border:         `1px solid ${accent}`,
                    borderColor:    `color-mix(in srgb, ${accent} 35%, transparent)`,
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    fontSize:       9,
                    color:          txt,
                    cursor:         'default',
                    transition:     'transform .15s, background .2s, color .2s',
                    flexShrink:     0,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.15)'; (e.currentTarget as HTMLDivElement).style.zIndex = '5' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.zIndex = '' }}
                >
                  {showValue ? Math.round(cell.value) : cell.label ?? ''}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
