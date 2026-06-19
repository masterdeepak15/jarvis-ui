import type { JColor } from '../../theme/JarvisTokens'

export interface JNavItemProps {
  href?:    string
  icon?:    string
  label?:   string
  badge?:   string
  active?:  boolean
  color?:   JColor
  onClick?: () => void
}

const BASE_STYLE: React.CSSProperties = {
  position:       'relative',
  display:        'flex',
  alignItems:     'center',
  gap:            10,
  fontFamily:     "'Courier New', monospace",
  fontSize:       11,
  letterSpacing:  '.10em',
  textTransform:  'uppercase',
  textDecoration: 'none',
  transition:     'all .15s ease',
  cursor:         'pointer',
  border:         'none',
  width:          '100%',
  boxSizing:      'border-box',
  clipPath:       'polygon(0 0,100% 0,calc(100% - 6px) 100%,0 100%)',
}

export function JNavItem({ href, icon, label, badge, active = false, onClick }: JNavItemProps) {
  const style: React.CSSProperties = {
    ...BASE_STYLE,
    padding:    active ? '10px 14px 10px 16px' : '10px 14px',
    background: active ? 'var(--j-accent-08)' : 'transparent',
    color:      active ? 'var(--j-accent)'     : 'var(--j-text-muted)',
    borderLeft: `2px solid ${active ? 'var(--j-accent)' : 'transparent'}`,
    boxShadow:  active ? '-2px 0 12px var(--j-accent-12)' : 'none',
  }

  const inner = (
    <>
      {active && (
        <div style={{
          position: 'absolute',
          left:     0,
          top:      '50%',
          transform:'translateY(-50%)',
          width:    2,
          height:   '60%',
          background: 'var(--j-accent)',
          boxShadow:  '0 0 8px var(--j-accent)',
        }} />
      )}
      {icon && (
        <span style={{ fontSize: 14, color: active ? 'var(--j-accent)' : 'var(--j-text-dim)', flexShrink: 0 }}>
          {icon}
        </span>
      )}
      {label && <span style={{ flex: 1 }}>{label}</span>}
      {badge && (
        <span style={{
          fontSize:    9,
          letterSpacing: '.06em',
          padding:     '2px 6px',
          background:  'var(--j-accent-12)',
          color:       'var(--j-accent)',
          clipPath:    'polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)',
        }}>
          {badge}
        </span>
      )}
    </>
  )

  if (href) {
    return <a href={href} style={style}>{inner}</a>
  }
  return (
    <button type="button" onClick={onClick} style={style}>
      {inner}
    </button>
  )
}
