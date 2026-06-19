import type { JColor } from '../../theme/JarvisTokens'
import { JarvisTokens } from '../../theme/JarvisTokens'

export interface JSpinnerProps {
  size?:      string
  color?:     JColor
  label?:     string
  showLabel?: boolean
}

export function JSpinner({ size = '64px', color = 'cyan', label, showLabel = true }: JSpinnerProps) {
  const n = parseFloat(size)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div
        className={JarvisTokens.color(color)}
        style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}
      >
        {/* Ring 1 — outer, forward spin */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: '1px solid transparent',
          borderTopColor: 'var(--j-accent)',
          borderBottomColor: 'var(--j-accent-25)',
          animation: 'j-spin var(--j-dur-spin) linear infinite',
        }} />
        {/* Ring 2 — middle ~66%, reverse spin */}
        <div style={{
          position: 'absolute',
          inset: `${Math.round(n * 0.17)}px`,
          borderRadius: '50%',
          border: '1px dashed transparent',
          borderTopColor: 'var(--j-accent-dim)',
          borderRightColor: 'var(--j-accent-dim)',
          animation: 'j-spin-rev 6s linear infinite',
        }} />
        {/* Ring 3 — inner ~44%, forward spin */}
        <div style={{
          position: 'absolute',
          inset: `${Math.round(n * 0.28)}px`,
          borderRadius: '50%',
          border: '1px solid transparent',
          borderTopColor: 'var(--j-accent-mid)',
          animation: 'j-spin 3s linear infinite',
        }} />
        {/* Diamond center */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 8, height: 8,
          clipPath: 'polygon(50% 0%,100% 50%,50% 100%,0% 50%)',
          background: 'var(--j-accent)',
          animation: 'j-pulse var(--j-dur-pulse) ease-in-out infinite',
        }} />
      </div>
      {showLabel && label && (
        <span style={{
          fontSize: 9,
          color: 'var(--j-accent)',
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          fontFamily: "'Courier New', monospace",
        }}>
          {label}
        </span>
      )}
    </div>
  )
}
