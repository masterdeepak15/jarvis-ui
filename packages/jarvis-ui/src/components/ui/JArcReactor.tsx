export interface JArcReactorProps {
  /** Power level 0-100 */
  level?: number
  /** Size in px */
  size?: number
  /** Color */
  color?: 'cyan' | 'amber' | 'green' | 'red' | 'blue'
  /** Show label */
  label?: string
  /** Animate outer ring */
  animated?: boolean
  className?: string
  style?: React.CSSProperties
}

const COLORS: Record<string, string> = {
  cyan:  '#00e5ff',
  amber: '#f97316',
  green: '#22c55e',
  red:   '#ef4444',
  blue:  '#3b82f6',
}

export function JArcReactor({
  level = 100,
  size = 120,
  color = 'cyan',
  label,
  animated = true,
  className,
  style,
}: JArcReactorProps) {
  const hex   = COLORS[color] ?? COLORS.cyan
  const cx    = size / 2
  const cy    = size / 2
  const pct   = Math.max(0, Math.min(100, level)) / 100

  // Rings radii
  const r1 = size * 0.46   // outer ring
  const r2 = size * 0.34   // middle
  const r3 = size * 0.22   // inner
  const r4 = size * 0.10   // core

  // Arc for level (circumference of middle ring)
  const circum2 = 2 * Math.PI * r2
  const dash2   = circum2 * pct
  const gap2    = circum2 * (1 - pct)

  // Triangle "petals" (3 triangles at 120° each)
  const petals = [0, 120, 240].map(deg => {
    const rad = (deg * Math.PI) / 180
    const tip = { x: cx + r3 * Math.cos(rad - Math.PI / 2), y: cy + r3 * Math.sin(rad - Math.PI / 2) }
    const b1  = { x: cx + r4 * Math.cos(rad - Math.PI / 2 + 0.6), y: cy + r4 * Math.sin(rad - Math.PI / 2 + 0.6) }
    const b2  = { x: cx + r4 * Math.cos(rad - Math.PI / 2 - 0.6), y: cy + r4 * Math.sin(rad - Math.PI / 2 - 0.6) }
    return `M ${tip.x} ${tip.y} L ${b1.x} ${b1.y} L ${b2.x} ${b2.y} Z`
  })

  const durOuter = '4s'
  const durInner = '2.5s'

  return (
    <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6, ...style }}>
      <svg width={size} height={size}>
        {/* Glow filter */}
        <defs>
          <filter id={`arc-glow-${color}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Outer static ring */}
        <circle cx={cx} cy={cy} r={r1} fill="none" stroke={hex} strokeWidth={1} opacity={.3} />

        {/* Rotating outer ring with dashes */}
        <circle cx={cx} cy={cy} r={r1} fill="none" stroke={hex} strokeWidth={1.5}
          strokeDasharray="4 8" opacity={.5}>
          {animated && (
            <animateTransform attributeName="transform" type="rotate"
              values={`0 ${cx} ${cy};360 ${cx} ${cy}`} dur={durOuter} repeatCount="indefinite" />
          )}
        </circle>

        {/* Level arc (middle ring) */}
        <circle cx={cx} cy={cy} r={r2} fill="none" stroke={hex} strokeWidth={2.5}
          strokeDasharray={`${dash2} ${gap2}`}
          strokeDashoffset={circum2 * 0.25}
          strokeLinecap="round"
          opacity={.85}
          transform={`rotate(-90 ${cx} ${cy})`}
          filter={`url(#arc-glow-${color})`}
        />
        {/* Middle ring background */}
        <circle cx={cx} cy={cy} r={r2} fill="none" stroke={hex} strokeWidth={.5} opacity={.15} />

        {/* Inner rotating ring */}
        <circle cx={cx} cy={cy} r={r3 + 4} fill="none" stroke={hex} strokeWidth={.8}
          strokeDasharray="2 5" opacity={.4}>
          {animated && (
            <animateTransform attributeName="transform" type="rotate"
              values={`360 ${cx} ${cy};0 ${cx} ${cy}`} dur={durInner} repeatCount="indefinite" />
          )}
        </circle>

        {/* Petal triangles */}
        {petals.map((d, i) => (
          <path key={i} d={d} fill={hex} opacity={.7 * pct} filter={`url(#arc-glow-${color})`} />
        ))}

        {/* Core circle */}
        <circle cx={cx} cy={cy} r={r4} fill={hex} opacity={.15 + .6 * pct} />
        <circle cx={cx} cy={cy} r={r4} fill="none" stroke={hex} strokeWidth={1.5} opacity={.8} />
        <circle cx={cx} cy={cy} r={r4 - 3} fill="none" stroke={hex} strokeWidth={.7} opacity={.4} />

        {/* Core glow pulse */}
        {animated && (
          <circle cx={cx} cy={cy} r={r4} fill={hex} opacity={0}>
            <animate attributeName="opacity" values="0;0.3;0" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="r" values={`${r4};${r4 + 4};${r4}`} dur="1.8s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Level text in core */}
        <text x={cx} y={cy + 4} textAnchor="middle" fill={hex}
          fontSize={r4 * 0.9} fontFamily="'Courier New'" fontWeight="700">
          {Math.round(level)}
        </text>
      </svg>

      {label && (
        <div style={{
          fontSize: 8, color: hex, letterSpacing: '0.18em',
          fontFamily: "'Courier New', monospace",
        }}>
          {label}
        </div>
      )}
    </div>
  )
}
