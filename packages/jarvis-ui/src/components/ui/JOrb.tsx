import type { JColor, JState } from '../../theme/JarvisTokens'

export interface JOrbProps {
  systemName?: string
  size?:       string
  color?:      JColor
  state?:      JState
  listening?:  boolean
  onClick?:    () => void
}

function getRingSpeeds(state: JState): { r1: string; r2: string; r3: string } {
  if (state === 'processing') return { r1: '2s',  r2: '1.2s', r3: '1.8s' }
  if (state === 'idle')       return { r1: '8s',  r2: '6s',   r3: '9s'   }
  return                             { r1: '4s',  r2: '3s',   r3: '5s'   }
}

function getStateLabel(state: JState, listening: boolean): string {
  if (state === 'idle')       return 'Idle'
  if (state === 'processing') return 'Processing'
  if (state === 'warning')    return 'Warning'
  if (state === 'error')      return 'Error'
  return listening ? 'Listening' : 'Online'
}

// Pre-compute 12 tick angles (every 30°)
const TICK_ANGLES = Array.from({ length: 12 }, (_, i) => i * 30)

export function JOrb({
  systemName = 'JARVIS',
  size       = '160px',
  state      = 'active',
  listening  = false,
  onClick,
}: JOrbProps) {
  const speeds     = getRingSpeeds(state)
  const stateLabel = getStateLabel(state, listening)

  return (
    <div
      onClick={onClick}
      style={{
        position:       'relative',
        width:          size,
        height:         size,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        cursor:         onClick ? 'pointer' : 'default',
        flexShrink:     0,
        fontFamily:     "'Courier New', monospace",
      }}
    >
      {/* Outer dashed ring — slowest */}
      <div style={{
        position:     'absolute',
        borderRadius: '50%',
        inset:        0,
        border:       '1px dashed var(--j-accent)',
        opacity:      0.08,
        animation:    'j-spin 10s linear infinite',
      }} />

      {/* 12 tick marks at 30° intervals */}
      {TICK_ANGLES.map((angle) => {
        const rad = angle * Math.PI / 180
        const r   = 48
        const x   = 50 + r * Math.sin(rad)
        const y   = 50 - r * Math.cos(rad)
        return (
          <div
            key={angle}
            data-testid="orb-tick"
            style={{
              position:   'absolute',
              width:      2,
              height:     4,
              background: 'var(--j-accent)',
              opacity:    0.35,
              left:       `${x.toFixed(1)}%`,
              top:        `${y.toFixed(1)}%`,
              transform:  `translate(-50%, -50%) rotate(${angle}deg)`,
            }}
          />
        )
      })}

      {/* Ring 1 — solid, state-speed */}
      <div style={{
        position:     'absolute',
        borderRadius: '50%',
        inset:        8,
        border:       '1px solid var(--j-accent)',
        opacity:      0.35,
        animation:    `j-spin ${speeds.r1} linear infinite`,
      }} />

      {/* Ring 2 — split top/bottom color */}
      <div style={{
        position:          'absolute',
        borderRadius:      '50%',
        inset:             16,
        border:            '1.5px solid transparent',
        borderTopColor:    'var(--j-accent)',
        borderBottomColor: 'var(--j-accent)66',
        boxShadow:         '0 0 6px var(--j-accent-25)',
        animation:         `j-spin ${speeds.r2} linear infinite`,
      }} />

      {/* Ring 3 — counter-rotating */}
      <div style={{
        position:          'absolute',
        borderRadius:      '50%',
        inset:             24,
        border:            '1.5px solid transparent',
        borderTopColor:    'var(--j-accent)',
        borderBottomColor: 'var(--j-accent)66',
        boxShadow:         '0 0 6px var(--j-accent-25)',
        animation:         `j-spin-rev ${speeds.r3} linear infinite`,
      }} />

      {/* Inner circle */}
      <div style={{
        position:       'absolute',
        borderRadius:   '50%',
        inset:          32,
        background:     'radial-gradient(circle at 38% 36%, var(--j-accent-12), var(--j-bg) 70%)',
        border:         '1px solid var(--j-accent)44',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        boxShadow:      'inset 0 0 20px var(--j-accent-25), 0 0 16px var(--j-accent-25)',
        overflow:       'hidden',
      }}>
        {/* Inner radial glow overlay */}
        <div style={{
          position:      'absolute',
          inset:         0,
          borderRadius:  '50%',
          background:    'radial-gradient(circle at 40% 35%, var(--j-accent-25) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* System name + state label */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div
            className="j-glitch"
            style={{
              fontSize:      14,
              fontWeight:    600,
              color:         'var(--j-text-primary)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textShadow:    '0 0 16px var(--j-accent)',
              fontFamily:    "'Courier New', monospace",
            }}
          >
            {systemName}
          </div>
          <div style={{
            fontSize:      9,
            color:         'var(--j-accent)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginTop:     2,
            fontFamily:    "'Courier New', monospace",
            animation:     'j-pulse var(--j-dur-pulse) ease-in-out infinite',
          }}>
            {stateLabel}
          </div>
        </div>
      </div>

      {/* Listening indicator */}
      <div style={{
        position:       'absolute',
        bottom:         '18%',
        left:           '50%',
        transform:      'translateX(-50%)',
        width:          24,
        height:         24,
        borderRadius:   '50%',
        background:     'var(--j-bg)',
        border:         '1px solid var(--j-accent)44',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        zIndex:         2,
      }}>
        <div style={{
          width:        10,
          height:       10,
          borderRadius: '50%',
          background:   listening ? 'var(--j-accent)' : 'var(--j-text-dim)',
          boxShadow:    listening
            ? '0 0 12px var(--j-accent), 0 0 24px var(--j-accent-25)'
            : 'none',
          animation:    listening ? 'j-pulse 1.2s ease-in-out infinite' : 'none',
          transition:   'all 0.3s',
        }} />
      </div>
    </div>
  )
}
