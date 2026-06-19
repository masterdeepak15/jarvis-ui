import type { ReactNode } from 'react'
import type { JCardStyle, JColor } from '../../theme/JarvisTokens'
import { JarvisTokens } from '../../theme/JarvisTokens'

export interface JCardProps {
  cardStyle?: JCardStyle
  color?:     JColor
  header?:    ReactNode
  footer?:    ReactNode
  padding?:   string
  children?:  ReactNode
}

function CardDecor({ cardStyle }: { cardStyle: JCardStyle }) {
  switch (cardStyle) {
    case 'CornerBracket':
      return (
        <>
          <div className="j-c-tl" /><div className="j-c-tr" />
          <div className="j-c-bl" /><div className="j-c-br" />
          <div className="j-inner-border" />
        </>
      )
    case 'Notched':
      return <><div className="j-notch-border" /><div className="j-tri-tl" /><div className="j-tri-br" /></>
    case 'SideRail':
      return <><div className="j-rail" /><div className="j-tab-top" /><div className="j-tab-bot" /></>
    case 'GlowBorder':
      return <div className="j-inner-radial" />
    case 'PartialBorder':
      return <><div className="j-pb-tl" /><div className="j-pb-br" /><div className="j-pb-roving-dot" /></>
    case 'DangerPulse':
      return <div className="j-tri-tl" />
    case 'Hexagonal':
      return <div className="j-hex-ring" />
    case 'Radar':
      return (
        <>
          <div className="j-radar-sweep" />
          <div className="j-radar-r1" /><div className="j-radar-r2" /><div className="j-radar-r3" />
          <div className="j-radar-center" />
          <div className="j-radar-ping" />
        </>
      )
    default:
      return null
  }
}

const HDR: React.CSSProperties = {
  paddingBottom: 10,
  marginBottom:  10,
  borderBottom:  '1px solid var(--j-border-dim)',
  position:      'relative',
  zIndex:        1,
}

const FTR: React.CSSProperties = {
  paddingTop:  10,
  marginTop:   10,
  borderTop:   '1px solid var(--j-border-dim)',
  position:    'relative',
  zIndex:      1,
}

export function JCard({
  cardStyle = 'CornerBracket',
  color     = 'cyan',
  header,
  footer,
  padding   = '14px 16px',
  children,
}: JCardProps) {
  const className = JarvisTokens.cls('j-card', JarvisTokens.cardStyle(cardStyle), JarvisTokens.color(color))

  if (cardStyle === 'DoubleFrame') {
    return (
      <div className={className}>
        <div className="j-df-corner" />
        <div className="j-inner-frame">
          {header && <div style={HDR}>{header}</div>}
          {children}
          {footer && <div style={FTR}>{footer}</div>}
        </div>
      </div>
    )
  }

  return (
    <div className={className} style={{ padding }}>
      <CardDecor cardStyle={cardStyle} />
      {header && <div style={HDR}>{header}</div>}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      {footer && <div style={FTR}>{footer}</div>}
    </div>
  )
}
