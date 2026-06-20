import { useState, useId } from 'react'
import type { ReactNode } from 'react'
import type { JColor, JState } from '../../theme/JarvisTokens'

export interface JAccordionProps {
  title:            string
  icon?:            string
  badge?:           string
  defaultOpen?:     boolean
  isOpen?:          boolean
  onIsOpenChange?:  (open: boolean) => void
  state?:           JState
  color?:           JColor
  children?:        ReactNode
}

function resolveAccent(state: JState, color: JColor): string {
  if (state === 'warning') return 'var(--j-warn)'
  if (state === 'error')   return 'var(--j-err)'
  if (state === 'success') return 'var(--j-ok)'
  if (color === 'amber')   return 'var(--j-warn)'
  if (color === 'red')     return 'var(--j-err)'
  return 'var(--j-accent)'
}

export function JAccordion({
  title,
  icon,
  badge,
  defaultOpen = false,
  isOpen: controlledOpen,
  onIsOpenChange,
  state = 'active',
  color = 'cyan',
  children,
}: JAccordionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const id = useId()

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
  const accent = resolveAccent(state, color)

  function toggle() {
    const next = !isOpen
    if (controlledOpen === undefined) setInternalOpen(next)
    onIsOpenChange?.(next)
  }

  return (
    <div style={{
      border:     '1px solid var(--j-accent-12)',
      overflow:   'hidden',
      fontFamily: "'Courier New', monospace",
    }}>
      {/* Header */}
      <button
        type="button"
        id={`accordion-header-${id}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-body-${id}`}
        onClick={toggle}
        style={{
          position:   'relative',
          display:    'flex',
          alignItems: 'center',
          gap:        10,
          padding:    '10px 14px 10px 16px',
          cursor:     'pointer',
          width:      '100%',
          background: isOpen ? 'var(--j-accent-05)' : 'transparent',
          border:     'none',
          fontFamily: "'Courier New', monospace",
          textAlign:  'left',
          userSelect: 'none',
          transition: 'background 0.2s',
        }}
      >
        {/* Left rail */}
        <div style={{
          position:   'absolute',
          top:        0,
          bottom:     0,
          left:       0,
          width:      2,
          background: accent,
          boxShadow:  `0 0 8px ${accent}`,
          clipPath:   'polygon(0 6px, 2px 0, 2px 100%, 0 calc(100% - 6px))',
        }} />

        {/* Icon */}
        {icon && (
          <span style={{
            fontStyle:  'normal',
            fontSize:   13,
            color:      accent,
            filter:     `drop-shadow(0 0 4px ${accent})`,
            flexShrink: 0,
          }}>
            {icon}
          </span>
        )}

        {/* Title */}
        <span style={{
          flex:          1,
          fontSize:      11,
          color:         isOpen ? 'var(--j-text-primary)' : 'var(--j-text-secondary)',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          transition:    'color 0.2s',
        }}>
          {title}
        </span>

        {/* Badge */}
        {badge && (
          <span style={{
            fontSize:   8,
            color:      accent,
            background: `${accent}18`,
            padding:    '1px 6px',
            clipPath:   'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
          }}>
            {badge}
          </span>
        )}

        {/* Diamond chevron */}
        <div style={{
          width:      8,
          height:     8,
          background: accent,
          clipPath:   'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          opacity:    isOpen ? 1 : 0.4,
          transform:  isOpen ? 'rotate(0deg)' : 'rotate(45deg)',
          boxShadow:  isOpen ? `0 0 8px ${accent}` : 'none',
          transition: 'transform 0.3s, opacity 0.2s',
          flexShrink: 0,
        }} />
      </button>

      {/* Body */}
      {isOpen && (
        <div
          id={`accordion-body-${id}`}
          role="region"
          aria-labelledby={`accordion-header-${id}`}
          style={{
            position:   'relative',
            padding:    '12px 14px 12px 16px',
            borderTop:  '1px solid var(--j-accent-12)',
            background: 'var(--j-accent-05)',
            overflow:   'hidden',
            animation:  'j-slide-in 0.25s ease-out',
          }}
        >
          {/* Scan line */}
          <div style={{
            position:      'absolute',
            left:          0,
            right:         0,
            height:        1,
            top:           -1,
            background:    `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            animation:     'j-scan-v 3s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
          {children}
        </div>
      )}
    </div>
  )
}
