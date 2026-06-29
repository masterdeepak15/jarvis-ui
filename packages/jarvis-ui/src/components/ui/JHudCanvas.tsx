import { useState, useRef, useCallback } from 'react'

export interface JWidgetSlot {
  id: string
  x: number
  y: number
  width?: number
  title?: string
  color?: 'cyan' | 'amber' | 'green' | 'red' | 'blue'
  content: React.ReactNode
}

export interface JHudCanvasProps {
  /** Initial widget positions */
  widgets: JWidgetSlot[]
  /** Canvas height */
  height?: number | string
  /** Show grid overlay */
  showGrid?: boolean
  /** Grid size px */
  gridSize?: number
  /** Snap to grid */
  snapToGrid?: boolean
  /** Background color */
  background?: string
  className?: string
  style?: React.CSSProperties
  /** Called when any widget is moved */
  onWidgetMove?: (id: string, x: number, y: number) => void
}

const COLOR_MAP: Record<string, string> = {
  cyan:  'var(--j-cyan)',
  amber: 'var(--j-amber)',
  green: 'var(--j-green)',
  red:   'var(--j-red)',
  blue:  'var(--j-blue)',
}

export function JHudCanvas({
  widgets: initialWidgets,
  height = 600,
  showGrid = true,
  gridSize = 20,
  snapToGrid = false,
  background,
  className,
  style,
  onWidgetMove,
}: JHudCanvasProps) {
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    const map: Record<string, { x: number; y: number }> = {}
    initialWidgets.forEach(w => { map[w.id] = { x: w.x, y: w.y } })
    return map
  })
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [dragging, setDragging] = useState<string | null>(null)
  const [zOrder, setZOrder] = useState<string[]>(initialWidgets.map(w => w.id))
  const dragData = useRef<{ mx: number; my: number; px: number; py: number } | null>(null)

  const snap = (v: number) => snapToGrid ? Math.round(v / gridSize) * gridSize : v

  const onTitlePointerDown = useCallback((id: string, e: React.PointerEvent) => {
    e.preventDefault()
    const pos = positions[id] ?? { x: 0, y: 0 }
    dragData.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y }
    setDragging(id)
    setZOrder(prev => [...prev.filter(i => i !== id), id])
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [positions])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging || !dragData.current) return
    const nx = snap(dragData.current.px + e.clientX - dragData.current.mx)
    const ny = snap(dragData.current.py + e.clientY - dragData.current.my)
    setPositions(prev => ({ ...prev, [dragging]: { x: nx, y: ny } }))
    onWidgetMove?.(dragging, nx, ny)
  }, [dragging, snap, onWidgetMove])

  const onPointerUp = useCallback(() => {
    setDragging(null)
    dragData.current = null
  }, [])

  return (
    <div
      className={className}
      style={{
        position:   'relative',
        width:      '100%',
        height,
        background: background ?? 'var(--j-bg)',
        overflow:   'hidden',
        fontFamily: "'Courier New', monospace",
        ...style,
      }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Grid overlay */}
      {showGrid && (
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: .06 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hud-grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
              <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke="var(--j-accent)" strokeWidth=".5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hud-grid)" />
        </svg>
      )}

      {/* Widgets in z-order */}
      {initialWidgets.map(w => {
        const pos    = positions[w.id] ?? { x: w.x, y: w.y }
        const accent = COLOR_MAP[w.color ?? 'cyan'] ?? 'var(--j-accent)'
        const isCollapsed = collapsed[w.id]
        const z      = zOrder.indexOf(w.id)

        return (
          <div
            key={w.id}
            style={{
              position:   'absolute',
              left:       pos.x,
              top:        pos.y,
              width:      w.width ?? 260,
              zIndex:     z + 1,
              background: 'var(--j-bg-card)',
              border:     `1px solid ${accent}`,
              boxShadow:  dragging === w.id ? `0 0 20px ${accent}44` : `0 0 8px ${accent}18`,
              transition: dragging === w.id ? 'none' : 'box-shadow .2s',
              clipPath:   'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
            }}
          >
            {/* Title / drag handle */}
            <div
              onPointerDown={e => onTitlePointerDown(w.id, e)}
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                padding:        '4px 10px',
                background:     `${accent}18`,
                borderBottom:   isCollapsed ? 'none' : `1px solid ${accent}44`,
                cursor:         dragging === w.id ? 'grabbing' : 'grab',
                userSelect:     'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width={7} height={7}><rect width={7} height={7} fill={accent} opacity={.8} transform="rotate(45 3.5 3.5)" /></svg>
                <span style={{ fontSize: 8, color: accent, letterSpacing: '.18em' }}>{w.title ?? w.id.toUpperCase()}</span>
              </div>
              <button
                onPointerDown={e => e.stopPropagation()}
                onClick={() => setCollapsed(prev => ({ ...prev, [w.id]: !prev[w.id] }))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: accent, fontSize: 9, padding: '0 2px' }}
              >
                {isCollapsed ? '▸' : '▾'}
              </button>
            </div>

            {/* Content */}
            {!isCollapsed && (
              <div style={{ padding: '8px 10px' }}>
                {w.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
