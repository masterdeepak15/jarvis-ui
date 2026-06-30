import { useEffect, useRef, useState } from 'react'

export interface JActivityFeedItem {
  id: string
  time?: string
  level?: 'active' | 'warning' | 'error' | 'success' | 'info'
  message: string
  source?: string
}

export interface JActivityFeedProps {
  items: JActivityFeedItem[]
  /** Max visible rows before scroll */
  maxRows?: number
  /** Row height in px */
  rowHeight?: number
  /** Auto scroll to bottom on new items */
  autoScroll?: boolean
  /** Show timestamp */
  showTime?: boolean
  /** Show source label */
  showSource?: boolean
  className?: string
  style?: React.CSSProperties
}

const LEVEL_COLOR: Record<string, string> = {
  active:  'var(--j-accent)',
  warning: 'var(--j-warn)',
  error:   'var(--j-err)',
  success: 'var(--j-ok)',
  info:    'var(--j-text-muted)',
}

const LEVEL_ICON: Record<string, string> = {
  active:  '●',
  warning: '▲',
  error:   '✕',
  success: '✓',
  info:    '○',
}

export function JActivityFeed({
  items,
  maxRows = 8,
  rowHeight = 28,
  autoScroll = true,
  showTime = true,
  showSource = true,
  className,
  style,
}: JActivityFeedProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!autoScroll || paused) return
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [items, autoScroll, paused])

  const maxH = maxRows * rowHeight

  return (
    <div className={className} style={{ fontFamily: "'Courier New', monospace", ...style }}>
      <div
        ref={scrollRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          maxHeight:  maxH,
          overflowY:  'auto',
          overflowX:  'hidden',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--j-accent-50) transparent',
        }}
      >
        {items.map(item => {
          const col  = LEVEL_COLOR[item.level ?? 'info']
          const icon = LEVEL_ICON[item.level ?? 'info']
          return (
            <div
              key={item.id}
              style={{
                display:     'flex',
                alignItems:  'center',
                gap:         8,
                height:      rowHeight,
                padding:     '0 4px',
                borderBottom: '1px solid var(--j-border)',
                fontSize:    9,
                letterSpacing: '0.05em',
              }}
            >
              {/* Icon */}
              <span style={{ color: col, fontSize: 8, width: 10, flexShrink: 0 }}>{icon}</span>

              {/* Time */}
              {showTime && item.time && (
                <span style={{ color: 'var(--j-text-muted)', width: 52, flexShrink: 0, fontSize: 8 }}>
                  {item.time}
                </span>
              )}

              {/* Message */}
              <span style={{
                flex: 1, color: 'var(--j-text-primary)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {item.message}
              </span>

              {/* Source */}
              {showSource && item.source && (
                <span style={{
                  color: col, opacity: .7, fontSize: 7, letterSpacing: '.1em',
                  flexShrink: 0, maxWidth: 64,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  [{item.source}]
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Paused indicator */}
      {paused && (
        <div style={{ fontSize: 7, color: 'var(--j-text-muted)', letterSpacing: '.12em', textAlign: 'right', paddingTop: 4 }}>
          ⏸ HOVER PAUSED
        </div>
      )}
    </div>
  )
}
