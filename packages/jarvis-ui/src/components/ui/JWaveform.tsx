import type { CSSProperties } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

export interface JWaveformProps {
  barCount?: number
  height?:   string
  color?:    JColor    // accepted for API consistency; bar color driven by j-wv CSS class
  active?:   boolean
}

// Height and duration arrays — wrap with % length
const WV_HEIGHTS = [6, 14, 22, 18, 28, 20, 30, 24, 28, 22, 16, 20, 26, 18, 12, 22, 28, 18, 10, 14]
const WV_DURS    = ['.4s', '.5s', '.6s', '.4s', '.7s', '.5s', '.6s', '.4s', '.8s', '.5s']

export function JWaveform({
  barCount = 20,
  height   = '32px',
  active   = true,
}: JWaveformProps) {
  return (
    <div
      className="j-waveform"
      style={{
        height,
        ...(active ? {} : { opacity: 0.3 }),
      }}
    >
      {Array.from({ length: barCount }, (_, i) => {
        const barStyle: CSSProperties = {
          height:           `${WV_HEIGHTS[i % WV_HEIGHTS.length]}px`,
          background:       'var(--j-accent)',
          '--j-wv-dur':     WV_DURS[i % WV_DURS.length],
          '--j-wv-dly':     `${(i * 0.04).toFixed(2)}s`,
          ...(!active ? { transform: 'scaleY(0.15)', animationPlayState: 'paused' } : {}),
        } as CSSProperties
        return <div key={i} className="j-wv" style={barStyle} />
      })}
    </div>
  )
}
