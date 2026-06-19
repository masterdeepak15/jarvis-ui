import type { ReactNode } from 'react'
import type { JColor } from '../../theme/JarvisTokens'
import { JarvisTokens } from '../../theme/JarvisTokens'

export type JFrameStyle = 'Alpha' | 'Beta' | 'Gamma' | 'Delta'

export interface JHudFrameCardProps {
  frameStyle?:     JFrameStyle
  color?:          JColor
  title?:          string
  frameId?:        string
  showStatusDot?:  boolean
  width?:          string
  height?:         string
  children?:       ReactNode
}

function AlphaCorners() {
  return (
    <>
      <div className="j-hfc-corner j-hfc-tl">
        <div className="j-hfc-corner-outer" />
        <div className="j-hfc-corner-inner" />
        <div className="j-hfc-tick-h" />
        <div className="j-hfc-tick-v" />
      </div>
      <div className="j-hfc-corner j-hfc-tr">
        <div className="j-hfc-corner-outer" />
        <div className="j-hfc-circ" />
      </div>
      <div className="j-hfc-corner j-hfc-bl">
        <div className="j-hfc-corner-outer" />
        <div className="j-hfc-circ" />
      </div>
      <div className="j-hfc-corner j-hfc-br">
        <div className="j-hfc-corner-outer" />
        <div className="j-hfc-corner-inner" />
        <div className="j-hfc-tick-h" />
        <div className="j-hfc-tick-v" />
      </div>
    </>
  )
}

function BetaLayout() {
  return (
    <>
      <div className="j-hfc-beta-rail-t" />
      <div className="j-hfc-beta-rail-b" />
      <div className="j-hfc-beta-notch-tl" />
      <div className="j-hfc-beta-notch-br" />
      <div className="j-hfc-beta-pip-l" />
      <div className="j-hfc-beta-pip-r" />
      <div className="j-hfc-scan-h" />
    </>
  )
}

function GammaLayout() {
  return (
    <>
      {['tl1','tl2','tr1','tr2','bl1','bl2','br1','br2'].map(seg => (
        <div key={seg} className={`j-hfc-g-seg-${seg}`} />
      ))}
      <div className="j-hfc-g-center-ring" />
      <div className="j-hfc-scan-v" />
    </>
  )
}

function DeltaLayout() {
  return (
    <>
      <div className="j-hfc-d-top-bar" />
      <div className="j-hfc-d-bot-bar" />
      <div className="j-hfc-d-l-rail" />
      <div className="j-hfc-d-r-rail" />
      <div className="j-hfc-d-tl-block" />
      <div className="j-hfc-d-tr-block" />
      <div className="j-hfc-d-bl-block" />
      <div className="j-hfc-d-br-block" />
      <div className="j-hfc-scan-h" />
      <div className="j-hfc-scan-v" />
    </>
  )
}

const STYLE_CLASS: Record<JFrameStyle, string> = {
  Alpha: 'j-hfc-alpha',
  Beta:  'j-hfc-beta',
  Gamma: 'j-hfc-gamma',
  Delta: 'j-hfc-delta',
}

export function JHudFrameCard({
  frameStyle    = 'Alpha',
  color         = 'cyan',
  title,
  frameId,
  showStatusDot = true,
  width         = '100%',
  height        = '100%',
  children,
}: JHudFrameCardProps) {
  return (
    <div
      className={JarvisTokens.cls('j-hfc', STYLE_CLASS[frameStyle], JarvisTokens.color(color))}
      style={{ width, height }}
    >
      {frameStyle === 'Alpha' && <AlphaCorners />}
      {frameStyle === 'Beta'  && <BetaLayout />}
      {frameStyle === 'Gamma' && <GammaLayout />}
      {frameStyle === 'Delta' && <DeltaLayout />}

      {frameStyle === 'Alpha' && (
        <>
          <div className="j-hfc-scan-h" />
          <div className="j-hfc-scan-v" />
        </>
      )}

      {title && (
        <div className="j-hfc-title">
          {showStatusDot && <span className="j-hfc-dot" />}
          {title}
        </div>
      )}

      {frameId && <div className="j-hfc-id">{frameId}</div>}

      <div className="j-hfc-body">{children}</div>
    </div>
  )
}
