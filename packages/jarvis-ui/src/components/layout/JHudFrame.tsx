import type { ReactNode } from 'react'
import type { JColor } from '../../theme/JarvisTokens'
import { JHudBar } from './JHudBar'

export interface JHudFrameProps {
  color?:          JColor
  systemLabel?:    string
  showTop?:        boolean
  showBottom?:     boolean
  showDots?:       boolean
  showLive?:       boolean
  showWaveform?:   boolean
  showTicks?:      boolean
  showRec?:        boolean
  contentPadding?: string
  children?:       ReactNode
  topContent?:     ReactNode
  bottomContent?:  ReactNode
}

export function JHudFrame({
  color          = 'cyan',
  systemLabel    = 'JARVIS · SYS',
  showTop        = true,
  showBottom     = true,
  showDots       = true,
  showLive       = false,
  showWaveform   = false,
  showTicks      = false,
  showRec        = false,
  contentPadding = '16px',
  children,
  topContent,
  bottomContent,
}: JHudFrameProps) {
  return (
    <div className="j-hud-frame" style={{ position: 'relative', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 4 corner brackets */}
      <div className="j-hf-corner tl" />
      <div className="j-hf-corner tr" />
      <div className="j-hf-corner bl" />
      <div className="j-hf-corner br" />

      {/* Top edge line */}
      <div style={{
        position: 'absolute', top: 8, left: 36, right: 36,
        height: 1,
        background: 'linear-gradient(90deg,transparent,var(--j-accent-25),transparent)',
        opacity: 0.15,
        pointerEvents: 'none',
      }} />
      {/* Bottom edge line */}
      <div style={{
        position: 'absolute', bottom: 8, left: 36, right: 36,
        height: 1,
        background: 'linear-gradient(90deg,transparent,var(--j-accent-25),transparent)',
        opacity: 0.15,
        pointerEvents: 'none',
      }} />

      {showTop && (
        <JHudBar
          position="top"
          color={color}
          systemLabel={systemLabel}
          showDots={showDots}
          showLive={showLive}
          showWaveform={showWaveform}
          showTicks={showTicks}
          showRec={showRec}
        >
          {topContent}
        </JHudBar>
      )}

      <div style={{ flex: 1, padding: contentPadding }}>
        {children}
      </div>

      {showBottom && (
        <JHudBar position="bottom" color={color} showDots={false} showWaveform={showWaveform}>
          {bottomContent}
        </JHudBar>
      )}
    </div>
  )
}
