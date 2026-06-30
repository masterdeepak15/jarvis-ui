import { useState, useRef, useCallback } from 'react'

export interface JDragWidgetProps {
  title?: string
  /** Initial X position (px) */
  defaultX?: number
  /** Initial Y position (px) */
  defaultY?: number
  /** Width of the widget */
  width?: number | string
  /** Accent color variant */
  color?: 'cyan' | 'amber' | 'green' | 'red' | 'blue' | 'white'
  /** Show minimize button */
  collapsible?: boolean
  /** Extra class for outer div */
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  /** Called when position changes */
  onMove?: (x: number, y: number) => void
}

const COLOR_MAP: Record<string, string> = {
  cyan:  'var(--j-accent)',
  amber: 'var(--j-warn)',
  green: 'var(--j-ok)',
  red:   'var(--j-err)',
  blue:  'var(--j-accent)',
  white: 'var(--j-text-primary)',
}

export function JDragWidget({
  title = 'WIDGET',
  defaultX = 0,
  defaultY = 0,
  width = 280,
  color = 'cyan',
  collapsible = true,
  className,
  style,
  children,
  onMove,
}: JDragWidgetProps) {
  const [pos, setPos] = useState({ x: defaultX, y: defaultY })
  const [collapsed, setCollapsed] = useState(false)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef<{ mx: number; my: number; px: number; py: number } | null>(null)
  const elRef = useRef<HTMLDivElement>(null)

  const accent = COLOR_MAP[color] ?? 'var(--j-accent)'

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y }
    setDragging(true)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [pos])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragStart.current) return
    const nx = dragStart.current.px + e.clientX - dragStart.current.mx
    const ny = dragStart.current.py + e.clientY - dragStart.current.my
    setPos({ x: nx, y: ny })
    onMove?.(nx, ny)
  }, [onMove])

  const onPointerUp = useCallback(() => {
    dragStart.current = null
    setDragging(false)
  }, [])

  return (
    <div
      ref={elRef}
      className={className}
      style={{
        position: 'absolute',
        left: pos.x,
        top:  pos.y,
        width,
        background:   'var(--j-bg-card)',
        border:       `1px solid ${accent}`,
        boxShadow:    `0 0 12px ${accent}22`,
        fontFamily:   "'Courier New', monospace",
        userSelect:   'none',
        transition:   dragging ? 'none' : 'box-shadow .2s',
        zIndex:       dragging ? 100 : 10,
        clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
        ...style,
      }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Title bar — drag handle */}
      <div
        onPointerDown={onPointerDown}
        style={{
          display:       'flex',
          alignItems:    'center',
          justifyContent:'space-between',
          padding:       '5px 12px',
          background:    `${accent}18`,
          borderBottom:  collapsed ? 'none' : `1px solid ${accent}44`,
          cursor:        dragging ? 'grabbing' : 'grab',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <svg width={8} height={8}><rect width={8} height={8} fill={accent} opacity={.7} transform="rotate(45 4 4)" /></svg>
          <span style={{ fontSize: 8, color: accent, letterSpacing: '0.18em', fontWeight: 700 }}>{title}</span>
        </div>
        {collapsible && (
          <button
            onPointerDown={e => e.stopPropagation()}
            onClick={() => setCollapsed(p => !p)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: accent, fontSize: 9, letterSpacing: '.1em', padding: '0 2px',
            }}
          >
            {collapsed ? '▸' : '▾'}
          </button>
        )}
      </div>

      {/* Content */}
      {!collapsed && (
        <div style={{ padding: '10px 12px' }}>
          {children}
        </div>
      )}
    </div>
  )
}
