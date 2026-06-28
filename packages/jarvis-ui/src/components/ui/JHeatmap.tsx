export interface JHeatmapCell {
  value: number   // 0-100
  label?: string
  tooltip?: string
}

export interface JHeatmapProps {
  /** 2D grid data. rows × cols */
  data: JHeatmapCell[][]
  /** Color palette */
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

const PALETTES: Record<string, [string, string]> = {
  cyan:  ['#002233', '#00e5ff'],
  amber: ['#1a0800', '#f97316'],
  green: ['#001a08', '#22c55e'],
  red:   ['#1a0000', '#ef4444'],
}

function lerp(a: string, b: string, t: number): string {
  const hex = (h: string) => parseInt(h.slice(1), 16)
  const r1 = (hex(a) >> 16) & 0xff, g1 = (hex(a) >> 8) & 0xff, b1 = hex(a) & 0xff
  const r2 = (hex(b) >> 16) & 0xff, g2 = (hex(b) >> 8) & 0xff, b2 = hex(b) & 0xff
  const ri = Math.round(r1 + (r2 - r1) * t)
  const gi = Math.round(g1 + (g2 - g1) * t)
  const bi = Math.round(b1 + (b2 - b1) * t)
  return `#${ri.toString(16).padStart(2,'0')}${gi.toString(16).padStart(2,'0')}${bi.toString(16).padStart(2,'0')}`
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
  const [lo, hi] = PALETTES[color] ?? PALETTES.cyan
  const accent = hi

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
              const t   = Math.max(0, Math.min(100, cell.value)) / 100
              const bg  = lerp(lo, hi, t)
              const txt = t > 0.55 ? '#000' : hi
              return (
                <div
                  key={ci}
                  title={cell.tooltip ?? cell.label ?? `${cell.value}%`}
                  style={{
                    width:          cellSize,
                    height:         cellSize,
                    background:     bg,
                    border:         `1px solid ${accent}33`,
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    fontSize:       9,
                    color:          txt,
                    cursor:         'default',
                    transition:     'transform .15s',
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
