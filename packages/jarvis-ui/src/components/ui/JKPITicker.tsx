import { useEffect, useRef } from 'react'

export interface JKPITickerItem {
  label: string
  value: string
  /** Change delta e.g. "+2.4%" */
  delta?: string
  /** positive / negative / neutral */
  trend?: 'up' | 'down' | 'flat'
}

export interface JKPITickerProps {
  items: JKPITickerItem[]
  /** Scroll speed px/s */
  speed?: number
  /** Color */
  color?: 'cyan' | 'amber' | 'green' | 'red'
  /** Height px */
  height?: number
  /** Pause on hover */
  pauseOnHover?: boolean
  className?: string
  style?: React.CSSProperties
}

const COLORS: Record<string, string> = {
  cyan:  'var(--j-accent)',
  amber: 'var(--j-warn)',
  green: 'var(--j-ok)',
  red:   'var(--j-err)',
}

export function JKPITicker({
  items,
  speed = 40,
  color = 'cyan',
  height = 32,
  pauseOnHover = true,
  className,
  style,
}: JKPITickerProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const accent   = COLORS[color] ?? COLORS.cyan

  // CSS keyframe animation — duplicate items for seamless loop
  const uid = `ticker-${color}-${items.length}`

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    // width of half the track (one copy of items)
    const totalW = track.scrollWidth / 2
    const dur    = totalW / speed

    // Inject or update keyframe
    let sheet = document.getElementById('j-ticker-style') as HTMLStyleElement | null
    if (!sheet) {
      sheet = document.createElement('style')
      sheet.id = 'j-ticker-style'
      document.head.appendChild(sheet)
    }
    const rule = `@keyframes ${uid} { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`
    sheet.textContent = (sheet.textContent ?? '') + rule
    track.style.animation = `${uid} ${dur}s linear infinite`
  }, [items, speed, uid])

  const trendColor = (t?: string) =>
    t === 'up' ? 'var(--j-ok)' : t === 'down' ? 'var(--j-err)' : 'var(--j-text-muted)'

  const renderItems = () =>
    items.map((item, i) => (
      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginRight: 40, flexShrink: 0 }}>
        <span style={{ fontSize: 7, color: 'var(--j-text-muted)', letterSpacing: '.15em' }}>{item.label}</span>
        <span style={{ fontSize: 11, color: accent, letterSpacing: '.1em', fontWeight: 700 }}>{item.value}</span>
        {item.delta && (
          <span style={{ fontSize: 8, color: trendColor(item.trend), letterSpacing: '.08em' }}>
            {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '–'} {item.delta}
          </span>
        )}
        <span style={{ color: 'var(--j-border)', fontSize: 10, marginLeft: 8 }}>|</span>
      </span>
    ))

  return (
    <div
      className={className}
      style={{
        height,
        overflow:   'hidden',
        background: 'var(--j-bg-card)',
        border:     `1px solid ${accent}44`,
        display:    'flex',
        alignItems: 'center',
        ...style,
      }}
      onMouseEnter={() => pauseOnHover && trackRef.current && (trackRef.current.style.animationPlayState = 'paused')}
      onMouseLeave={() => pauseOnHover && trackRef.current && (trackRef.current.style.animationPlayState = 'running')}
    >
      {/* Left fade */}
      <div style={{
        position: 'absolute', left: 0, width: 40, height, zIndex: 1,
        background: `linear-gradient(to right, var(--j-bg-card), transparent)`,
        pointerEvents: 'none',
      }} />
      <div ref={trackRef} style={{ display: 'inline-flex', whiteSpace: 'nowrap', fontFamily: "'Courier New', monospace", willChange: 'transform' }}>
        {renderItems()}
        {renderItems()}
      </div>
      {/* Right fade */}
      <div style={{
        position: 'absolute', right: 0, width: 40, height, zIndex: 1,
        background: `linear-gradient(to left, var(--j-bg-card), transparent)`,
        pointerEvents: 'none',
      }} />
    </div>
  )
}
