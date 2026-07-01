import { useState, useCallback, useEffect, createContext, useContext } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import type { JState } from '../../theme/JarvisTokens'

export interface JRadialItemDef {
  key:     string
  icon:    string
  label:   string
  angle:   number
  state:   JState
  onClick: () => void
}

type RegisterFn = (item: JRadialItemDef) => void

export const RadialMenuContext = createContext<RegisterFn | null>(null)
export function useRadialMenu() { return useContext(RadialMenuContext) }

export interface JRadialMenuProps {
  open?:          boolean
  onOpenChange?:  (open: boolean) => void
  triggerLabel?:  string
  radius?:        number
  centerSize?:    string
  children?:      ReactNode
}

function itemAccentFull(state: JState): string {
  if (state === 'warning') return 'var(--j-warn)'
  if (state === 'error')   return 'var(--j-err)'
  if (state === 'success') return 'var(--j-ok)'
  return 'var(--j-accent)'
}

function itemAccentFaint(state: JState): string {
  if (state === 'warning') return 'var(--j-warn-25)'
  if (state === 'error')   return 'var(--j-err-25)'
  if (state === 'success') return 'var(--j-ok-25)'
  return 'var(--j-accent-25)'
}

function itemAccentGlow(state: JState): string {
  if (state === 'warning') return 'var(--j-warn-12)'
  if (state === 'error')   return 'var(--j-err-12)'
  if (state === 'success') return 'var(--j-ok-12)'
  return 'var(--j-accent-12)'
}

function getPosition(angleDeg: number, radius: number): { x: number; y: number } {
  const rad = (angleDeg - 90) * Math.PI / 180
  return {
    x: Math.round(radius * Math.cos(rad)),
    y: Math.round(radius * Math.sin(rad)),
  }
}

export function JRadialMenu({
  open:         _open,
  onOpenChange,
  triggerLabel = 'MENU',
  radius       = 90,
  centerSize   = '64px',
  children,
}: JRadialMenuProps) {
  const [items,      setItems]      = useState<JRadialItemDef[]>([])
  const [isOpen,     setIsOpen]     = useState(_open ?? false)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [hoverLabel, setHoverLabel] = useState<string | null>(null)

  useEffect(() => {
    if (_open !== undefined) setIsOpen(_open)
  }, [_open])

  const register = useCallback<RegisterFn>((item) => {
    setItems(prev => prev.some(i => i.key === item.key) ? prev : [...prev, item])
  }, [])

  function toggle() {
    const next = !isOpen
    setIsOpen(next)
    if (!next) { setHoveredKey(null); setHoverLabel(null) }
    onOpenChange?.(next)
  }

  function closeMenu() {
    setIsOpen(false)
    setHoveredKey(null)
    setHoverLabel(null)
    onOpenChange?.(false)
  }

  return (
    <div
      style={{
        position:       'relative',
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        fontFamily:     "'Courier New', monospace",
      } as CSSProperties}
    >
      {/* Context provider — children (JRadialItem) register here, render null */}
      <RadialMenuContext.Provider value={register}>
        {children}
      </RadialMenuContext.Provider>

      {/* Visual item circles — rendered from registered items state */}
      {items.map(item => {
        const { x, y } = getPosition(item.angle, radius)
        const hovered  = hoveredKey === item.key
        const full     = itemAccentFull(item.state)
        const faint    = itemAccentFaint(item.state)
        const glow     = itemAccentGlow(item.state)
        const wrapTransform = isOpen
          ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
          : 'translate(-50%, -50%)'

        return (
          <div
            key={item.key}
            data-item-key={item.key}
            style={{
              position:   'absolute',
              top:        '50%',
              left:       '50%',
              transform:  wrapTransform,
              transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
              opacity:    isOpen ? 1 : 0,
              cursor:     'pointer',
              zIndex:     10,
            } as CSSProperties}
            onMouseEnter={() => { setHoveredKey(item.key); setHoverLabel(item.label) }}
            onMouseLeave={() => { setHoveredKey(null); setHoverLabel(null) }}
            onClick={() => { item.onClick(); closeMenu() }}
          >
            {/* Item circle — 40×40 */}
            <div style={{
              width:          40,
              height:         40,
              borderRadius:   '50%',
              background:     hovered ? glow : 'var(--j-bg-card)',
              border:         `1.5px solid ${hovered ? full : faint}`,
              boxShadow:      hovered ? `0 0 16px ${faint}, inset 0 0 12px ${glow}` : 'none',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              transition:     'all 0.2s',
            } as CSSProperties}>
              <span style={{
                fontSize:   16,
                fontStyle:  'normal',
                filter:     hovered ? `drop-shadow(0 0 6px ${full})` : 'none',
              }}>
                {item.icon}
              </span>
            </div>

            {/* Connector line — only when open */}
            {isOpen && (
              <div
                data-connector=""
                style={{
                  position:        'absolute',
                  top:             '50%',
                  left:            '50%',
                  width:           radius - 20,
                  height:          1,
                  transformOrigin: '0 50%',
                  transform:       `rotate(${item.angle - 90}deg)`,
                  background:      `linear-gradient(90deg, ${faint}, transparent)`,
                  opacity:         hovered ? 0.8 : 0.2,
                  transition:      'opacity 0.2s',
                  pointerEvents:   'none',
                } as CSSProperties}
              />
            )}
          </div>
        )
      })}

      {/* Center trigger button */}
      <div
        data-trigger=""
        data-open={isOpen ? 'true' : 'false'}
        onClick={toggle}
        style={{
          position:       'relative',
          width:          centerSize,
          height:         centerSize,
          borderRadius:   '50%',
          background:     'radial-gradient(circle at 40% 36%, var(--j-accent-18), var(--j-bg) 70%)',
          border:         '1.5px solid var(--j-accent-50)',
          boxShadow:      '0 0 20px var(--j-accent-12), inset 0 0 16px var(--j-accent-05)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          cursor:         'pointer',
          zIndex:         20,
          flexShrink:     0,
          userSelect:     'none',
        } as CSSProperties}
      >
        {/* Rotating outer ring */}
        <div style={{
          position:     'absolute',
          inset:        '-4px',
          borderRadius: '50%',
          border:       '1px solid var(--j-accent)',
          opacity:      0.3,
          animation:    `j-spin ${isOpen ? '2s' : '4s'} linear infinite`,
        } as CSSProperties} />

        {/* Rotating inner ring (reverse) */}
        <div style={{
          position:     'absolute',
          inset:        '-10px',
          borderRadius: '50%',
          border:       '1px dashed var(--j-accent)',
          opacity:      0.15,
          animation:    'j-spin-rev 6s linear infinite',
        } as CSSProperties} />

        {/* Label */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{
            fontSize:      10,
            fontWeight:    600,
            color:         'var(--j-text-primary)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            animation:     isOpen ? 'j-glitch 3s ease-in-out infinite' : 'none',
          } as CSSProperties}>
            {isOpen ? 'CLOSE' : triggerLabel}
          </div>
        </div>
      </div>

      {/* Hover label — only when open and an item is hovered */}
      {hoverLabel && isOpen && (
        <div
          data-hover-label=""
          style={{
            position:      'absolute',
            top:           'calc(50% + 70px)',
            left:          '50%',
            transform:     'translateX(-50%)',
            fontSize:      9,
            color:         'var(--j-accent)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            whiteSpace:    'nowrap',
            pointerEvents: 'none',
            textShadow:    '0 0 8px var(--j-accent)',
            animation:     'j-pulse 1s ease-in-out infinite',
          } as CSSProperties}
        >
          {hoverLabel}
        </div>
      )}
    </div>
  )
}
