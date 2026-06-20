import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { JSpinner } from '../layout/JSpinner'
import { JHudBar } from '../layout/JHudBar'

export interface JBootScreenProps {
  systemName?: string
  version?:    string
  onComplete?: () => void
}

const BOOT_LINES = [
  '> LOADING NEURAL CORE............. [OK]',
  '> SPEECH ENGINE INIT.............. [OK]',
  '> SKILL REGISTRY SCAN............. [12 FOUND]',
  '> OLLAMA BRIDGE................... [CONNECTED]',
  '> VOICE PIPELINE.................. [READY]',
  '> MEMORY SUBSYSTEM................ [OK]',
  '> HUD CALIBRATION................. [OK]',
  '> ALL SYSTEMS NOMINAL............. [GO]',
]

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function JBootScreen({
  systemName  = 'JARVIS',
  version     = 'v4.2.1',
  onComplete,
}: JBootScreenProps) {
  const [visible,      setVisible]      = useState(true)
  const [phase,        setPhase]        = useState(0)
  const [scanPos,      setScanPos]      = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function boot() {
      // Phase 0: scanline sweeps down
      if (cancelled) return
      setPhase(0); setScanPos(0)
      await delay(100)
      if (cancelled) return
      setScanPos(95)
      await delay(700)

      // Phase 1: corner brackets draw in
      if (cancelled) return
      setPhase(1)
      await delay(600)

      // Phase 2: boot log lines type in
      if (cancelled) return
      setPhase(2)
      for (let i = 1; i <= BOOT_LINES.length; i++) {
        if (cancelled) return
        setVisibleLines(i)
        await delay(180)
      }
      await delay(200)

      // Phase 3: spinner + system name
      if (cancelled) return
      setPhase(3)
      await delay(900)

      // Phase 4: ready state
      if (cancelled) return
      setPhase(4)
      await delay(800)

      // Complete
      if (cancelled) return
      setVisible(false)
      onComplete?.()
    }

    boot()
    return () => { cancelled = true }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null

  const cornerBase: CSSProperties = {
    position:    'absolute',
    width:       phase >= 1 ? 24 : 0,
    height:      phase >= 1 ? 24 : 0,
    borderColor: 'var(--j-accent)',
    borderStyle: 'solid',
    borderWidth: 0,
    filter:      'drop-shadow(0 0 4px var(--j-accent))',
    transition:  'width 0.4s ease-out, height 0.4s ease-out',
    pointerEvents: 'none',
  }

  return (
    <div
      data-boot-phase={phase}
      style={{
        position:   'fixed',
        inset:      0,
        zIndex:     9999,
        background: 'var(--j-bg)',
        fontFamily: "'Courier New', monospace",
        overflow:   'hidden',
      }}
    >
      {/* Scanline — phases 0 and 1 */}
      {phase <= 1 && (
        <div
          data-scanline=""
          style={{
            position:   'absolute',
            left:       0,
            right:      0,
            height:     2,
            background: 'linear-gradient(90deg,transparent,var(--j-accent),transparent)',
            boxShadow:  '0 0 16px var(--j-accent)',
            top:        `${scanPos}%`,
            transition: 'top 0.8s linear',
            zIndex:     10,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Corner brackets */}
      <div style={{ ...cornerBase, top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 }} />
      <div style={{ ...cornerBase, top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 }} />
      <div style={{ ...cornerBase, bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 }} />
      <div style={{ ...cornerBase, bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 }} />

      {/* Phase 2: Boot log */}
      {phase >= 2 && (
        <div style={{ position: 'absolute', top: '30%', left: '10%', right: '10%' }}>
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              data-boot-line=""
              style={{
                fontSize:       10,
                color:          'var(--j-accent-mid)',
                letterSpacing:  '0.10em',
                marginBottom:   4,
                animation:      'j-slide-in 0.3s ease-out both',
                animationDelay: `${i * 0.12}s`,
              } as CSSProperties}
            >
              {line}
            </div>
          ))}
        </div>
      )}

      {/* Phase 3: Spinner */}
      {phase >= 3 && (
        <div style={{
          position:       'absolute',
          top:            '50%',
          left:           '50%',
          transform:      'translate(-50%,-50%)',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            16,
          textAlign:      'center',
        }}>
          <div data-spinner="">
            <JSpinner size="80px" color="cyan" label={systemName} showLabel={true} />
          </div>
          <div style={{
            fontSize:      11,
            color:         'var(--j-accent-mid)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            animation:     'j-pulse 1.5s ease-in-out infinite',
          } as CSSProperties}>
            INITIALISING SYSTEMS...
          </div>
        </div>
      )}

      {/* Phase 4: Ready state */}
      {phase >= 4 && (
        <>
          <div style={{ position: 'absolute', bottom: '12%', left: 0, right: 0, textAlign: 'center' }}>
            <div style={{
              fontSize:      22,
              fontWeight:    600,
              color:         'var(--j-text-primary)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textShadow:    '0 0 20px var(--j-accent)',
              animation:     'j-glitch 4s ease-in-out infinite',
            } as CSSProperties}>
              {systemName}
            </div>
            <div style={{
              fontSize:      9,
              color:         'var(--j-accent-mid)',
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              marginTop:     4,
            } as CSSProperties}>
              {version} · ONLINE
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <JHudBar position="bottom" showWaveform={true} showTicks={true} showRec={true} />
          </div>
        </>
      )}
    </div>
  )
}
