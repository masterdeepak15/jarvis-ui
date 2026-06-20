export type JDividerOrientation = 'horizontal' | 'vertical'

export interface JDividerProps {
  orientation?: JDividerOrientation
  label?:       string
  showDot?:     boolean
  height?:      string
  margin?:      string
  opacity?:     number
}

const DOT: React.CSSProperties = {
  width:     5,
  height:    5,
  flexShrink:0,
  background:'var(--j-accent)',
  clipPath:  'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  boxShadow: '0 0 6px var(--j-accent)',
}

export function JDivider({ orientation = 'horizontal', label, showDot = true, height = '40px', margin = '8px 0', opacity = 0.30 }: JDividerProps) {
  const acc = 'var(--j-accent)'

  if (orientation === 'vertical') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height, margin: '0 8px' }}>
        <div style={{ flex: 1, width: 1, background: `linear-gradient(180deg, transparent, ${acc})`, opacity }} />
        {showDot && <div style={{ ...DOT, margin: '6px 0' }} />}
        <div style={{ flex: 1, width: 1, background: `linear-gradient(180deg, ${acc}, transparent)`, opacity }} />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin, width: '100%' }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${acc})`, opacity }} />
      {label
        ? <span style={{ fontSize: 8, color: acc, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0 10px', opacity: 0.7, whiteSpace: 'nowrap' }}>{label}</span>
        : showDot && <div style={{ ...DOT, margin: '0 8px' }} />
      }
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${acc}, transparent)`, opacity }} />
    </div>
  )
}
