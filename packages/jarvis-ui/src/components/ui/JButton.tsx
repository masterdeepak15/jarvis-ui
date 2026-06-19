import type { ReactNode } from 'react'
import type { JButtonShape, JColor, JSize, JVariant } from '../../theme/JarvisTokens'
import { JarvisTokens } from '../../theme/JarvisTokens'

export interface JButtonProps {
  shape?:     JButtonShape
  color?:     JColor
  size?:      JSize
  variant?:   JVariant
  loading?:   boolean
  disabled?:  boolean
  icon?:      ReactNode
  iconRight?: ReactNode
  type?:      'button' | 'submit' | 'reset'
  onClick?:   () => void
  children?:  ReactNode
}

const NOTCH_SHAPES = new Set<JButtonShape>(['LeftNotch', 'RightNotch', 'BothNotch'])
const FILL_SHAPES  = new Set<JButtonShape>(['Parallelogram','GhostSkew','BracketFrame','Hexagonal','IconSquare','ScanFull'])

const NOTCH_CLIP: Partial<Record<JButtonShape, string>> = {
  LeftNotch:  'polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)',
  RightNotch: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
  BothNotch:  'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
}

export function JButton({
  shape    = 'LeftNotch',
  color    = 'cyan',
  size     = 'md',
  variant,
  loading  = false,
  disabled = false,
  icon,
  iconRight,
  type     = 'button',
  onClick,
  children,
}: JButtonProps) {
  const shapeClass = JarvisTokens.buttonShape(shape)
  const isNotch    = NOTCH_SHAPES.has(shape)
  const isFill     = FILL_SHAPES.has(shape)

  const notchStyle: React.CSSProperties = isNotch ? {
    clipPath: NOTCH_CLIP[shape],
    border:   '1px solid var(--j-accent)',
  } : {}

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={JarvisTokens.cls('j-btn', shapeClass, JarvisTokens.color(color), JarvisTokens.size(size), variant ? JarvisTokens.variant(variant) : '')}
      style={notchStyle}
      aria-busy={loading || undefined}
    >
      {isNotch && (
        <div style={{ position: 'absolute', inset: 0, background: 'var(--j-accent-dim)' }} />
      )}
      {isFill && <div className="j-btn-bg-fill" />}
      {shape === 'Parallelogram' && <div className="j-btn-rail" />}
      {shape === 'BracketFrame'  && <><div className="j-btn-top-line" /><div className="j-btn-bot-line" /></>}

      <div className="j-btn-shine" />
      <div className="j-btn-c tl" /><div className="j-btn-c tr" />
      <div className="j-btn-c bl" /><div className="j-btn-c br" />

      <div className="j-btn-label">
        {!loading && icon      && <span>{icon}</span>}
        {loading ? <span style={{ letterSpacing: '.2em' }}>···</span> : children}
        {!loading && iconRight && <span>{iconRight}</span>}
      </div>
    </button>
  )
}
