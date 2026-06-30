import { useState, useEffect, useRef } from 'react'
import {
  JArcMeter, JStatCard, JBadge, JStatusPill, JProgress,
  JDataRow, JDivider, JWaveform, JOrb, JHudLabel,
} from '@masterdeepak15/jarvis-ui'

// ─── SHIELD-style Rainmeter HUD page ─────────────────────────────────────────
// Inspired by SHIELD OS Rainmeter skin — concentric rings, radar sweep,
// hex grid, target locks, rotating arcs, tactical readouts.

// ─── Radar SVG widget ────────────────────────────────────────────────────────
function RadarWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const sweepRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2
    const R = Math.min(W, H) / 2 - 8

    // Static blips — colors resolved live from theme each frame below,
    // these tags just classify which semantic token each blip uses.
    const blips = [
      { angle: 0.4, dist: 0.35, tag: 'ok'   as const, size: 3 },
      { angle: 1.2, dist: 0.62, tag: 'accent' as const, size: 4 },
      { angle: 2.1, dist: 0.48, tag: 'warn' as const, size: 3 },
      { angle: 3.5, dist: 0.75, tag: 'ok'   as const, size: 3 },
      { angle: 4.2, dist: 0.28, tag: 'accent' as const, size: 5 },
      { angle: 5.1, dist: 0.58, tag: 'err'  as const, size: 4 },
    ]

    // Reads live CSS custom properties from the DOM — re-evaluated every
    // frame so theme preset switches AND light/dark mode swaps reflect
    // immediately in the canvas, since canvas context can't use var()
    // directly the way regular DOM styles can.
    const readThemeColors = () => {
      const cs = getComputedStyle(canvas)
      const get = (name: string, fallback: string) => {
        const v = cs.getPropertyValue(name).trim()
        return v || fallback
      }
      return {
        accent: get('--j-accent', '#00e5ff'),
        warn:   get('--j-warn',   '#f97316'),
        err:    get('--j-err',    '#ef4444'),
        ok:     get('--j-ok',     '#22c55e'),
        bg:     get('--j-bg',     '#020d18'),
        bgCard: get('--j-bg-card', '#030f1e'),
      }
    }

    // Convert a hex color + alpha (0-1) into rgba() string — works with
    // any live theme hex value, no hardcoded colors.
    const hexToRgba = (hex: string, alpha: number) => {
      const h = hex.replace('#', '')
      const bigint = parseInt(h.length === 3
        ? h.split('').map(c => c + c).join('')
        : h, 16)
      const r = (bigint >> 16) & 255
      const g = (bigint >> 8) & 255
      const b = bigint & 255
      return `rgba(${r},${g},${b},${alpha})`
    }

    const draw = () => {
      sweepRef.current = (sweepRef.current + 0.015) % (Math.PI * 2)
      const sweep = sweepRef.current
      const theme = readThemeColors()
      const accent = theme.accent

      ctx.clearRect(0, 0, W, H)

      // Dark bg — pulled from live theme background, not hardcoded
      ctx.fillStyle = hexToRgba(theme.bg, 0.95)
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill()

      // Concentric rings
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath()
        ctx.arc(cx, cy, R * (i / 4), 0, Math.PI * 2)
        ctx.strokeStyle = hexToRgba(accent, i === 4 ? 0.5 : 0.15)
        ctx.lineWidth = i === 4 ? 1.5 : 0.7
        ctx.stroke()
      }

      // Cross hairs
      ctx.strokeStyle = hexToRgba(accent, 0.15)
      ctx.lineWidth = 0.7
      ctx.setLineDash([4, 4])
      ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.stroke()
      ctx.setLineDash([])

      // Hex grid overlay (subtle)
      ctx.strokeStyle = hexToRgba(accent, 0.06)
      ctx.lineWidth = 0.5
      const hexSize = 18
      for (let row = -10; row < 10; row++) {
        for (let col = -10; col < 10; col++) {
          const hx = col * hexSize * 1.732 + (row % 2) * hexSize * 0.866
          const hy = row * hexSize * 1.5
          const px = cx + hx; const py = cy + hy
          if (Math.sqrt((px-cx)**2+(py-cy)**2) > R + 5) continue
          ctx.beginPath()
          for (let a = 0; a < 6; a++) {
            const angle = (a * Math.PI) / 3
            const x2 = px + hexSize * 0.5 * Math.cos(angle)
            const y2 = py + hexSize * 0.5 * Math.sin(angle)
            a === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2)
          }
          ctx.closePath(); ctx.stroke()
        }
      }

      // Draw sweep as filled wedge
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(sweep)
      const sweepGrad = ctx.createLinearGradient(0, 0, R, 0)
      sweepGrad.addColorStop(0,   hexToRgba(accent, 0))
      sweepGrad.addColorStop(0.6, hexToRgba(accent, 0.08))
      sweepGrad.addColorStop(1,   hexToRgba(accent, 0.22))
      ctx.fillStyle = sweepGrad
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, R, -0.35, 0)
      ctx.closePath()
      ctx.fill()
      // Sweep line
      ctx.strokeStyle = hexToRgba(accent, 0.8)
      ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(R, 0); ctx.stroke()
      ctx.restore()

      // Blips — fade based on angle difference from sweep, colored from
      // live theme tokens (accent/warn/err/ok), not hardcoded hex
      const tagColor = { accent: theme.accent, warn: theme.warn, err: theme.err, ok: theme.ok }
      blips.forEach(b => {
        const bx = cx + R * b.dist * Math.cos(b.angle)
        const by = cy + R * b.dist * Math.sin(b.angle)
        let da = ((b.angle - sweep) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)
        if (da > Math.PI) da = Math.PI * 2 - da
        const alpha = Math.max(0, 1 - da / (Math.PI * 0.6))
        if (alpha < 0.01) return
        const col = tagColor[b.tag]
        ctx.beginPath()
        ctx.arc(bx, by, b.size, 0, Math.PI * 2)
        ctx.fillStyle = hexToRgba(col, alpha)
        ctx.fill()
        // Glow ring
        ctx.beginPath(); ctx.arc(bx, by, b.size + 3, 0, Math.PI * 2)
        ctx.strokeStyle = hexToRgba(col, alpha * 0.47)
        ctx.lineWidth = 1; ctx.stroke()
      })

      // Center dot
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2)
      ctx.fillStyle = accent; ctx.fill()
      ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2)
      ctx.strokeStyle = hexToRgba(accent, 0.4); ctx.lineWidth = 1; ctx.stroke()

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={280}
      style={{ display: 'block', borderRadius: '50%', background: 'var(--j-bg)' }}
    />
  )
}

function RotatingRingSVG({
  size = 240, rpm = 8, reverse = false, tickCount = 48, label = '', sublabel = '', children
}: {
  size?: number, rpm?: number, reverse?: boolean, tickCount?: number,
  label?: string, sublabel?: string, children?: React.ReactNode
}) {
  const dur = `${60 / rpm}s`
  const r = size / 2 - 6
  const cx = size / 2
  const cy = size / 2

  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const angle = (i / tickCount) * Math.PI * 2
    const major = i % 6 === 0
    const ri = r - (major ? 12 : 6)
    const ro = r
    return {
      x1: cx + ri * Math.cos(angle),
      y1: cy + ri * Math.sin(angle),
      x2: cx + ro * Math.cos(angle),
      y2: cy + ro * Math.sin(angle),
      major,
    }
  })

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ position: 'absolute', inset: 0 }}>
        {/* Outer static ring */}
        <circle cx={cx} cy={cy} r={r + 4} fill="none"
          stroke="var(--j-border)" strokeWidth={0.8} />

        {/* Rotating ring with ticks */}
        <g style={{
          transformOrigin: `${cx}px ${cy}px`,
          animation: `spin${reverse ? 'R' : 'F'} ${dur} linear infinite`,
        }}>
          <circle cx={cx} cy={cy} r={r} fill="none"
            stroke="var(--j-accent-50)" strokeWidth={1.5}
            strokeDasharray="3 6" />
          {ticks.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={t.major ? 'var(--j-accent)' : 'var(--j-border)'}
              strokeWidth={t.major ? 1.5 : 0.6} />
          ))}
        </g>

        {/* Inner glow ring */}
        <circle cx={cx} cy={cy} r={r - 18} fill="none"
          stroke="var(--j-accent-18)" strokeWidth={8} />
        <circle cx={cx} cy={cy} r={r - 18} fill="none"
          stroke="var(--j-accent-50)" strokeWidth={1} />
      </svg>

      {/* Center content */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
      }}>
        {children}
        {label && (
          <div style={{ fontSize: 9, color: 'var(--j-accent)', letterSpacing: '0.2em', textAlign: 'center' }}>
            {label}
          </div>
        )}
        {sublabel && (
          <div style={{ fontSize: 8, color: 'var(--j-text-muted)', letterSpacing: '0.15em', textAlign: 'center' }}>
            {sublabel}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spinF { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinR { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  )
}

// ─── Target lock brackets ─────────────────────────────────────────────────────
function TargetLock({ size = 80, active = true, label = '' }: {
  size?: number, active?: boolean, label?: string
}) {
  const s = size
  const c = 12
  return (
    <div style={{ position: 'relative', width: s, height: s, flexShrink: 0 }}>
      <svg width={s} height={s} style={{ position: 'absolute', inset: 0 }}>
        {/* Corner brackets */}
        {[
          [0,0, 1,0, 0,1],
          [s,0, -1,0, 0,1],
          [0,s, 1,0, 0,-1],
          [s,s, -1,0, 0,-1],
        ].map(([x,y,dx,dy,ex,ey], i) => (
          <g key={i} stroke={active ? 'var(--j-accent)' : 'var(--j-border)'}
            strokeWidth={active ? 1.5 : 1} fill="none"
            style={{ transition: 'stroke 0.3s', opacity: active ? 1 : 0.5 }}>
            <line x1={x} y1={y} x2={x + dx*c} y2={y} />
            <line x1={x} y1={y} x2={x} y2={y + ey*c} />
          </g>
        ))}
        {/* Center cross */}
        {active && <>
          <line x1={s/2-6} y1={s/2} x2={s/2+6} y2={s/2}
            stroke="var(--j-accent)" strokeWidth={1} opacity={0.6} />
          <line x1={s/2} y1={s/2-6} x2={s/2} y2={s/2+6}
            stroke="var(--j-accent)" strokeWidth={1} opacity={0.6} />
          <circle cx={s/2} cy={s/2} r={3} fill="none"
            stroke="var(--j-accent)" strokeWidth={1} />
        </>}
        {/* Scan line */}
        {active && (
          <line x1={0} y1={s/2} x2={s} y2={s/2}
            stroke="var(--j-accent)" strokeWidth={0.5} opacity={0.3}
            strokeDasharray="4 4">
            <animateTransform attributeName="transform" type="translate"
              values={`0 -${s/2};0 ${s/2}`} dur="1.8s" repeatCount="indefinite" />
          </line>
        )}
      </svg>
      {label && (
        <div style={{
          position: 'absolute', bottom: -18, left: '50%', transform: 'translateX(-50%)',
          fontSize: 7, color: active ? 'var(--j-accent)' : 'var(--j-text-muted)',
          letterSpacing: '0.15em', whiteSpace: 'nowrap',
        }}>{label}</div>
      )}
    </div>
  )
}

// ─── Hex stat cell ────────────────────────────────────────────────────────────
function HexCell({ value, label, state }: { value: string, label: string, state?: 'ok'|'warn'|'err' }) {
  const col = state === 'warn' ? 'var(--j-warn)' : state === 'err' ? 'var(--j-err)' : 'var(--j-accent)'
  return (
    <div style={{
      position: 'relative', width: 90, height: 80, display: 'flex',
      alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2, flexShrink: 0,
    }}>
      <svg width={90} height={80} style={{ position: 'absolute', inset: 0 }}>
        <polygon
          points="45,4 82,22 82,58 45,76 8,58 8,22"
          fill="rgba(0,10,20,0.8)" stroke={col} strokeWidth={1}
          style={{ opacity: 0.7 }}
        />
        <polygon
          points="45,4 82,22 82,58 45,76 8,58 8,22"
          fill="none" stroke={col} strokeWidth={0.4}
          style={{ opacity: 0.4 }}
          transform="scale(0.88) translate(5.85,4.4)"
        />
      </svg>
      <div style={{ fontSize: 14, color: col, fontFamily: "'Courier New',monospace", fontWeight: 700, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: 7, color: 'var(--j-text-muted)', letterSpacing: '0.15em', lineHeight: 1 }}>
        {label}
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function PageShield() {
  const [threatLevel, setThreatLevel] = useState<'LOW'|'MODERATE'|'HIGH'|'CRITICAL'>('MODERATE')
  const [time, setTime] = useState(new Date())
  const [scanLine, setScanLine] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setScanLine(p => (p + 1) % 100), 30)
    return () => clearInterval(t)
  }, [])

  const threatColor = {
    LOW: 'var(--j-ok)', MODERATE: 'var(--j-warn)',
    HIGH: 'var(--j-err)', CRITICAL: 'var(--j-err)',
  }[threatLevel]

  const pad2 = (n: number) => String(n).padStart(2, '0')
  const timeStr = `${pad2(time.getHours())}:${pad2(time.getMinutes())}:${pad2(time.getSeconds())}`

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 24,
      fontFamily: "'Courier New',monospace",
    }}>

      {/* ── Top identity bar ──────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--j-border)', paddingBottom: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* SHIELD logo */}
          <svg width={48} height={48} viewBox="0 0 48 48">
            <polygon points="24,2 46,12 46,26 24,46 2,26 2,12"
              fill="none" stroke="var(--j-accent)" strokeWidth={1.5} />
            <polygon points="24,6 42,14 42,26 24,42 6,26 6,14"
              fill="var(--j-accent-18)" stroke="var(--j-accent-50)" strokeWidth={1} />
            <text x="24" y="29" textAnchor="middle"
              style={{ fill: 'var(--j-accent)', fontSize: 13, fontWeight: 700, fontFamily: 'Courier New' }}>
              S
            </text>
          </svg>
          <div>
            <div style={{ fontSize: 16, color: 'var(--j-accent)', letterSpacing: '0.3em', fontWeight: 700 }}>
              S.H.I.E.L.D.
            </div>
            <div style={{ fontSize: 7, color: 'var(--j-text-muted)', letterSpacing: '0.2em' }}>
              STRATEGIC HOMELAND INTERVENTION ENFORCEMENT
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 20, color: 'var(--j-accent)', letterSpacing: '0.1em' }}>{timeStr}</div>
            <div style={{ fontSize: 7, color: 'var(--j-text-muted)', letterSpacing: '0.15em' }}>UTC +00:00</div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexDirection: 'column' }}>
            {['cyan','amber','green'].map(c => (
              <div key={c} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%',
                  background: `var(--j-${c})`,
                  boxShadow: `0 0 4px var(--j-${c})`,
                  animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ fontSize: 7, color: 'var(--j-text-muted)', letterSpacing: '0.1em' }}>
                  {c === 'cyan' ? 'ONLINE' : c === 'amber' ? 'RELAY' : 'SECURE'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main HUD row ──────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* Left: Arc meters column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 180 }}>
          <div style={{ fontSize: 8, color: 'var(--j-accent)', letterSpacing: '0.2em' }}>▶ SYSTEM STATUS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <JArcMeter level={91} label="SHIELDS" color="cyan" />
            <JArcMeter level={67} label="POWER" color="green" />
            <JArcMeter level={44} label="FUEL" color="amber" />
            <JArcMeter level={23} label="HULL" color="red" />
          </div>
          <JDivider />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <JHudLabel text="ALTITUDE" value="FL 380" />
            <JHudLabel text="VELOCITY" value="M 0.82" />
            <JHudLabel text="HEADING"  value="047° NE" />
          </div>
        </div>

        {/* Center: Radar + rotating rings */}
        <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            {/* Outer rotating ring */}
            <RotatingRingSVG size={320} rpm={4} tickCount={60}>
              <div style={{ width: 280, height: 280, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <RadarWidget />
              </div>
            </RotatingRingSVG>
            {/* Threat level badge */}
            <div style={{
              position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
              background: 'var(--j-bg)', border: `1px solid ${threatColor}`,
              padding: '2px 12px', fontSize: 9, color: threatColor,
              letterSpacing: '0.2em', clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 50%, calc(100% - 6px) 100%, 6px 100%, 0 50%)',
            }}>
              THREAT: {threatLevel}
            </div>
          </div>

          {/* Threat level controls */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            {(['LOW','MODERATE','HIGH','CRITICAL'] as const).map(t => (
              <button key={t} onClick={() => setThreatLevel(t)} style={{
                padding: '4px 10px', fontFamily: "'Courier New',monospace", fontSize: 7,
                letterSpacing: '0.12em', cursor: 'pointer',
                background: threatLevel === t ? 'var(--j-accent-18)' : 'var(--j-bg-card)',
                border: `1px solid ${threatLevel === t ? 'var(--j-accent)' : 'var(--j-border-dim)'}`,
                color: threatLevel === t ? 'var(--j-accent)' : 'var(--j-text-muted)',
                clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Right: Target locks + stats */}
        <div style={{ flex: 1, minWidth: 180, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 8, color: 'var(--j-accent)', letterSpacing: '0.2em', marginBottom: 12 }}>▶ TARGET ACQUISITION</div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <TargetLock size={72} active={true}  label="ALPHA-01" />
              <TargetLock size={72} active={true}  label="BRAVO-04" />
              <TargetLock size={72} active={false} label="CHARLIE-09" />
            </div>
          </div>

          <JDivider />

          <div>
            <div style={{ fontSize: 8, color: 'var(--j-accent)', letterSpacing: '0.2em', marginBottom: 10 }}>▶ CONTACTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <JDataRow label="HOSTILE" value="3"  state="error" />
              <JDataRow label="NEUTRAL" value="5"  />
              <JDataRow label="FRIENDLY" value="12" state="success" />
              <JDataRow label="UNKNOWN"  value="2"  state="warning" />
            </div>
          </div>

          <JDivider />

          <div>
            <div style={{ fontSize: 8, color: 'var(--j-accent)', letterSpacing: '0.2em', marginBottom: 10 }}>▶ COMMS</div>
            <JWaveform barCount={20} />
            <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
              <JBadge color="green">ENCRYPTED</JBadge>
              <JBadge color="cyan">CH-7</JBadge>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hex stat grid ─────────────────────────────────────────────── */}
      <div>
        <div style={{ fontSize: 8, color: 'var(--j-accent)', letterSpacing: '0.2em', marginBottom: 16 }}>▶ TACTICAL GRID</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <HexCell value="18"   label="UNITS"   state="ok" />
          <HexCell value="94%"  label="ONLINE"  state="ok" />
          <HexCell value="3"    label="HOSTILE" state="err" />
          <HexCell value="M1.8" label="SPEED"   state="ok" />
          <HexCell value="38k"  label="ALTITUDE" state="ok" />
          <HexCell value="47%"  label="FUEL"    state="warn" />
          <HexCell value="L5"   label="CLEARANCE" state="ok" />
        </div>
      </div>

      {/* ── Bottom status row ─────────────────────────────────────────── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16,
        borderTop: '1px solid var(--j-border)', paddingTop: 16,
      }}>
        <JStatCard
          title="HELICARRIER STATUS"
          value="OPERATIONAL"
          sub="all systems nominal"
          state="active"
          dataRows={[
            { label: 'Engines', value: '4 / 4' },
            { label: 'Lift Rotors', value: 'ONLINE' },
            { label: 'Stealth Field', value: 'ACTIVE' },
          ]}
        />
        <JStatCard
          title="AGENTS IN FIELD"
          value="47"
          sub="active deployment"
          dataRows={[
            { label: 'Level 7+', value: '12' },
            { label: 'Level 4-6', value: '23' },
            { label: 'Support', value: '12' },
          ]}
        />
        <JStatCard
          title="ACTIVE THREATS"
          value="3"
          sub="requiring immediate action"
          state="warning"
          dataRows={[
            { label: 'Hydra Contacts', value: '2' },
            { label: 'Rogue AI', value: '1' },
            { label: 'Neutralized', value: '14' },
          ]}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
