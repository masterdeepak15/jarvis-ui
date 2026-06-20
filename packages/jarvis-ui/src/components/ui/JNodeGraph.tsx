import { useState, useEffect, useRef, useId } from 'react'
import type { CSSProperties } from 'react'
import type { JColor, JState } from '../../theme/JarvisTokens'

export type NType     = 'chip' | 'hub' | 'diamond' | 'hex'
export type EdgeStyle = 'solid' | 'dashed' | 'dotted'

export interface NodeDef {
  id:     string
  label:  string
  x:      number
  y:      number
  type?:  NType
  color?: JColor
  sub?:   string
  value?: string
  pulse?: boolean
}

export interface EdgeDef {
  from:      string
  to:        string
  color?:    JColor
  style?:    EdgeStyle
  arrow?:    boolean
  animated?: boolean
  animDur?:  number
  label?:    string
}

export interface JNodeGraphProps {
  nodes:       NodeDef[]
  edges:       EdgeDef[]
  width?:      string
  height?:     string
  title?:      string
  showLegend?: boolean
}

interface NodePos { x: number; y: number; w: number; h: number }

function nodeW(n: NodeDef): number {
  switch (n.type) {
    case 'hub':     return 88
    case 'diamond': return 80
    case 'hex':     return 82
    default:        return 144
  }
}

function nodeH(n: NodeDef): number {
  switch (n.type) {
    case 'hub':     return 88
    case 'diamond': return 80
    case 'hex':     return 82
    default:        return n.sub ? 48 : 36
  }
}

function getNodeAccent(color?: JColor): string {
  if (color === 'amber') return 'var(--j-warn)'
  if (color === 'red')   return 'var(--j-err)'
  if (color === 'green') return 'var(--j-ok)'
  return 'var(--j-accent)'
}

function getEdgeColor(color?: JColor): string {
  return getNodeAccent(color)
}

function markerSuffix(color?: JColor): string {
  if (color === 'amber') return 'aw'
  if (color === 'red')   return 'ae'
  if (color === 'green') return 'ag'
  return 'a'
}

function F(v: number): string {
  return v.toFixed(2)
}

export function JNodeGraph({
  nodes,
  edges,
  width       = '100%',
  height      = '420px',
  title,
  showLegend  = true,
}: JNodeGraphProps) {
  const rawId  = useId().replace(/:/g, '')
  const gridId = `ng${rawId}`

  const [positions, setPositions] = useState<Record<string, NodePos>>({})
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const dragRef = useRef<{ id: string; offX: number; offY: number } | null>(null)

  useEffect(() => {
    setPositions(prev => {
      const next = { ...prev }
      nodes.forEach(n => {
        if (!next[n.id]) next[n.id] = { x: n.x, y: n.y, w: nodeW(n), h: nodeH(n) }
      })
      Object.keys(next).forEach(k => {
        if (!nodes.some(n => n.id === k)) delete next[k]
      })
      return next
    })
  }, [nodes])

  function startDrag(e: React.MouseEvent, id: string) {
    e.stopPropagation()
    const p = positions[id]
    if (!p) return
    setSelectedId(id)
    dragRef.current = { id, offX: e.clientX - p.x, offY: e.clientY - p.y }
  }

  function onMouseMove(e: React.MouseEvent) {
    const drag = dragRef.current
    if (!drag) return
    const { id, offX, offY } = drag
    setPositions(prev => {
      const p = prev[id]
      if (!p) return prev
      const nx = Math.max(0, e.clientX - offX)
      const ny = Math.max(0, e.clientY - offY)
      if (p.x === nx && p.y === ny) return prev
      return { ...prev, [id]: { ...p, x: nx, y: ny } }
    })
  }

  function stopDrag() {
    setSelectedId(null)
    dragRef.current = null
  }

  function getPort(from: NodePos, to: NodePos, nodeId: string, isFrom: boolean): [number, number] {
    const node = nodes.find(n => n.id === nodeId)
    const type = node?.type
    if (type === 'hub' || type === 'diamond' || type === 'hex') {
      return [from.x + from.w / 2, from.y + from.h / 2]
    }
    const cy  = from.y + from.h / 2
    const tcx = to.x   + to.w   / 2
    const fcx = from.x + from.w / 2
    if (isFrom) {
      return tcx >= fcx ? [from.x + from.w, cy] : [from.x, cy]
    }
    return tcx < fcx ? [from.x + from.w, cy] : [from.x, cy]
  }

  return (
    <div
      data-node-graph=""
      style={{
        position:   'relative',
        width,
        height,
        background: 'var(--j-bg-card)',
        overflow:   'hidden',
        border:     '1px solid var(--j-accent-18)',
        fontFamily: "'Courier New', monospace",
      } as CSSProperties}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {/* ── dot-grid background ── */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' } as CSSProperties}>
        <defs>
          <pattern id={`${gridId}-grid`} width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="0.8" fill="var(--j-accent-18)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId}-grid)`} />
      </svg>

      {/* ── SVG edge layer ── */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'visible' } as CSSProperties}>
        <defs>
          <marker id={`${gridId}-a`}  markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="var(--j-accent-50)" />
          </marker>
          <marker id={`${gridId}-aw`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="var(--j-warn)" />
          </marker>
          <marker id={`${gridId}-ae`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="var(--j-err)" />
          </marker>
          <marker id={`${gridId}-ag`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="var(--j-ok)" />
          </marker>
        </defs>

        {edges.map(edge => {
          const fp = positions[edge.from]
          const tp = positions[edge.to]
          if (!fp || !tp) return null

          const [x1, y1] = getPort(fp, tp, edge.from, true)
          const [x2, y2] = getPort(tp, fp, edge.to,   false)
          const cpx1 = x1 + (x2 - x1) * 0.5
          const cpy1 = y1
          const cpx2 = x2 - (x2 - x1) * 0.5
          const cpy2 = y2
          const d    = `M ${F(x1)} ${F(y1)} C ${F(cpx1)} ${F(cpy1)} ${F(cpx2)} ${F(cpy2)} ${F(x2)} ${F(y2)}`
          const col  = getEdgeColor(edge.color)
          const eid  = `ep-${gridId}-${edge.from}-${edge.to}`
          const mEnd = (edge.arrow ?? true) ? `url(#${gridId}-${markerSuffix(edge.color)})` : 'none'
          const dash = edge.style === 'dashed' ? '6,4' : edge.style === 'dotted' ? '2,4' : undefined

          return (
            <g key={eid} data-edge={`${edge.from}-${edge.to}`}>
              {/* glow */}
              <path d={d} fill="none" stroke={col} strokeWidth={5} strokeOpacity={0.1} />
              {/* main */}
              <path id={eid} d={d} fill="none" stroke={col} strokeWidth={1.5}
                    strokeDasharray={dash} markerEnd={mEnd} />
              {/* animated dot */}
              {(edge.animated ?? true) && (
                <circle r="3" fill={col} opacity={0.9}
                        style={{ filter: `drop-shadow(0 0 3px ${col})` }}>
                  <animateMotion dur={`${edge.animDur ?? 2}s`} repeatCount="indefinite">
                    <mpath href={`#${eid}`} />
                  </animateMotion>
                </circle>
              )}
              {/* label */}
              {edge.label && (
                <text
                  x={F((x1 + x2) / 2)}
                  y={F((y1 + y2) / 2 - 10)}
                  textAnchor="middle"
                  fontFamily="'Courier New',monospace"
                  fontSize="8"
                  fill={col}
                  letterSpacing="1"
                  opacity="0.85"
                >
                  {edge.label}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* ── Node layer ── */}
      {nodes.map(node => {
        const p = positions[node.id]
        if (!p) return null
        const ac  = getNodeAccent(node.color)
        const sel = selectedId === node.id
        const type = node.type ?? 'chip'

        return (
          <div
            key={node.id}
            data-node-id={node.id}
            data-node-type={type}
            data-selected={sel ? 'true' : 'false'}
            style={{
              position:    'absolute',
              left:        p.x,
              top:         p.y,
              width:       p.w,
              height:      p.h,
              zIndex:      sel ? 20 : 3,
              cursor:      'grab',
              touchAction: 'none',
              userSelect:  'none',
            } as CSSProperties}
            onMouseDown={e => startDrag(e, node.id)}
          >
            {type === 'hub' && (
              <div style={{
                width:          '100%',
                height:         '100%',
                borderRadius:   '50%',
                background:     'var(--j-bg-card)',
                border:         `2px solid ${ac}`,
                boxShadow:      `0 0 18px ${ac}, inset 0 0 16px var(--j-accent-05)`,
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                justifyContent: 'center',
                textAlign:      'center',
                position:       'relative',
                overflow:       'hidden',
                filter:         sel ? 'brightness(1.35)' : 'none',
              } as CSSProperties}>
                <div style={{
                  position:     'absolute',
                  inset:        5,
                  borderRadius: '50%',
                  border:       `1px solid ${ac}`,
                  opacity:      0.25,
                  animation:    'j-spin 5s linear infinite',
                } as CSSProperties} />
                <div style={{ fontSize: 12, fontWeight: 700, color: ac, letterSpacing: '.05em', textShadow: `0 0 8px ${ac}`, zIndex: 1 }}>
                  {node.label}
                </div>
                {node.sub && (
                  <div style={{ fontSize: 7, color: 'var(--j-text-muted)', letterSpacing: '.10em', zIndex: 1 }}>
                    {node.sub}
                  </div>
                )}
              </div>
            )}

            {type === 'diamond' && (
              <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  position:  'absolute',
                  inset:     0,
                  clipPath:  'polygon(50% 0%,100% 50%,50% 100%,0% 50%)',
                  background: 'var(--j-bg-card)',
                  border:    `2px solid ${ac}`,
                  boxShadow: `0 0 12px ${ac}`,
                  filter:    sel ? 'brightness(1.3)' : 'none',
                } as CSSProperties} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 8, fontWeight: 700, color: ac, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                    {node.label}
                  </div>
                  {node.sub && (
                    <div style={{ fontSize: 7, color: 'var(--j-text-muted)' }}>
                      {node.sub}
                    </div>
                  )}
                </div>
              </div>
            )}

            {type === 'hex' && (
              <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  position:  'absolute',
                  inset:     0,
                  clipPath:  'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)',
                  background: 'var(--j-bg-card)',
                  border:    `2px solid ${ac}`,
                  boxShadow: `0 0 12px ${ac}`,
                  filter:    sel ? 'brightness(1.3)' : 'none',
                } as CSSProperties} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 8, fontWeight: 700, color: ac, letterSpacing: '.12em' }}>
                    {node.label}
                  </div>
                  {node.sub && (
                    <div style={{ fontSize: 7, color: 'var(--j-text-muted)' }}>
                      {node.sub}
                    </div>
                  )}
                </div>
              </div>
            )}

            {type === 'chip' && (
              <div style={{
                width:      '100%',
                height:     '100%',
                clipPath:   'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                background: 'var(--j-bg-card)',
                border:     `1px solid ${ac}`,
                borderLeft: `3px solid ${ac}`,
                boxShadow:  sel ? `0 0 16px ${ac}` : '0 0 5px var(--j-accent-12)',
                display:    'flex',
                alignItems: 'center',
                gap:        8,
                padding:    '0 12px',
                position:   'relative',
                overflow:   'hidden',
                filter:     sel ? 'brightness(1.2)' : 'none',
              } as CSSProperties}>
                {/* scan line */}
                <div style={{
                  position:   'absolute',
                  top:        0,
                  left:       0,
                  right:      0,
                  height:     1,
                  background: `linear-gradient(90deg,transparent,${ac},transparent)`,
                  animation:  'j-scan-v 3s ease-in-out infinite',
                } as CSSProperties} />
                {/* pulse dot */}
                <div style={{
                  width:       6,
                  height:      6,
                  borderRadius:'50%',
                  flexShrink:  0,
                  background:  ac,
                  boxShadow:   `0 0 5px ${ac}`,
                  animation:   node.pulse ? 'j-pulse 1.4s ease-in-out infinite' : 'none',
                } as CSSProperties} />
                {/* label + sub */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize:    9,
                    fontWeight:  700,
                    color:       ac,
                    letterSpacing: '.13em',
                    textTransform: 'uppercase',
                    whiteSpace:  'nowrap',
                    overflow:    'hidden',
                    textOverflow:'ellipsis',
                  } as CSSProperties}>
                    {node.label}
                  </div>
                  {node.sub && (
                    <div style={{ fontSize: 7, color: 'var(--j-text-muted)', letterSpacing: '.07em' }}>
                      {node.sub}
                    </div>
                  )}
                </div>
                {/* value panel */}
                {node.value && (
                  <div style={{
                    fontSize:   10,
                    fontWeight: 700,
                    color:      'var(--j-text-primary)',
                    flexShrink: 0,
                    paddingLeft:8,
                    borderLeft: `1px solid ${ac}`,
                  } as CSSProperties}>
                    {node.value}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}

      {/* ── Title ── */}
      {title && (
        <div
          data-graph-title=""
          style={{
            position:    'absolute',
            top:         8,
            left:        12,
            zIndex:      30,
            fontSize:    8,
            color:       'var(--j-accent)',
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            display:     'flex',
            alignItems:  'center',
            gap:         6,
            pointerEvents: 'none',
          } as CSSProperties}
        >
          <div style={{
            width:       6,
            height:      6,
            borderRadius:'50%',
            background:  'var(--j-accent)',
            animation:   'j-pulse 1.6s ease-in-out infinite',
          } as CSSProperties} />
          {title}
        </div>
      )}

      {/* ── Legend ── */}
      {showLegend && (
        <div style={{ position: 'absolute', bottom: 8, right: 10, zIndex: 30, pointerEvents: 'none', display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' } as CSSProperties}>
          <div
            data-legend=""
            style={{ fontSize: 7, color: 'var(--j-accent-50)', letterSpacing: '.11em' } as CSSProperties}
          >
            DRAG NODES · CONNECTIONS FOLLOW
          </div>
        </div>
      )}
    </div>
  )
}
