import type { ReactNode } from 'react'
import type { JColor, JAnimSpeed } from '../../theme/JarvisTokens'
import { JarvisTokens } from '../../theme/JarvisTokens'

export type JHudBarPosition = 'top' | 'bottom'

export interface JHudBarProps {
  position?:    JHudBarPosition
  color?:       JColor
  animSpeed?:   JAnimSpeed
  systemLabel?: string
  showDots?:    boolean
  showWaveform?: boolean
  showTicks?:   boolean
  showLive?:    boolean
  showRec?:     boolean
  tickCount?:   number
  tickActive?:  number
  children?:    ReactNode
}

const DOT_TYPES: Array<'n' | 'sq' | 'tall'> = [
  'n', 'n', 'sq', 'n', 'n', 'tall', 'n', 'sq', 'n',
  'n', 'sq', 'n', 'tall', 'n', 'n', 'sq', 'n',
]

const TICK_HEIGHTS = [12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10]

const WAVE_BARS = Array.from({ length: 20 }, (_, i) => ({
  h:   8 + ((i * 7 + 3) % 11),
  dur: `${0.8 + ((i * 13) % 10) / 10}s`,
  dly: `${((i * 7) % 10) / 10}s`,
}))

export function JHudBar({
  position    = 'top',
  color       = 'cyan',
  animSpeed   = 'normal',
  systemLabel,
  showDots    = true,
  showWaveform = false,
  showTicks   = false,
  showLive    = false,
  showRec     = false,
  tickCount   = 16,
  tickActive  = 12,
  children,
}: JHudBarProps) {
  return (
    <div className={JarvisTokens.cls(
      position === 'top' ? 'j-hud-bar-top' : 'j-hud-bar-bot',
      JarvisTokens.color(color),
      JarvisTokens.animSpeed(animSpeed),
    )}>
      {systemLabel && <span className="j-text-xs">{systemLabel}</span>}

      {showDots && (
        <div className="j-dot-seq">
          {DOT_TYPES.map((type, i) => (
            <div
              key={i}
              className={JarvisTokens.cls('j-d', type === 'sq' && 'sq', type === 'tall' && 'tall')}
              style={{ animationDelay: `${(i * 0.08).toFixed(2)}s` }}
            />
          ))}
        </div>
      )}

      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,var(--j-accent-25),transparent)' }} />

      {showTicks && (
        <>
          <div className="j-tick-row">
            {Array.from({ length: tickCount }, (_, i) => (
              <div
                key={i}
                className={JarvisTokens.cls('j-tk', i >= tickActive && 'off')}
                style={{ height: TICK_HEIGHTS[i % TICK_HEIGHTS.length] }}
              />
            ))}
          </div>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--j-accent)', animation: 'j-pulse var(--j-dur-pulse) ease-in-out infinite', flexShrink: 0 }} />
        </>
      )}

      {showWaveform && (
        <>
          <div className="j-waveform" style={{ flex: 1, maxWidth: 260 }}>
            {WAVE_BARS.map((bar, i) => (
              <div
                key={i}
                className="j-wv"
                style={{ height: bar.h, '--j-wv-dur': bar.dur, '--j-wv-dly': bar.dly } as React.CSSProperties}
              />
            ))}
          </div>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--j-accent)', animation: 'j-pulse var(--j-dur-pulse) ease-in-out infinite', flexShrink: 0 }} />
        </>
      )}

      {children}

      {showLive && <span className="j-text-xs j-blink">● LIVE</span>}
      {showRec  && <span className="j-text-xs j-blink" style={{ color: 'var(--j-err)' }}>● REC</span>}
    </div>
  )
}
