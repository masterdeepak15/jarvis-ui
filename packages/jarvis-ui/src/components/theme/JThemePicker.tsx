import { useState } from 'react'
import { useTheme } from '../../theme/JThemeContext'
import { PRESETS } from '../../theme/JarvisTheme'
import type { JThemePreset } from '../../theme/JarvisTheme'

interface JThemePickerProps {
  compact?: boolean
  showCustom?: boolean
}

const PRESET_SWATCHES: Array<{ preset: JThemePreset; color: string; label: string }> = [
  { preset: 'cyan',   color: 'var(--j-accent)',      label: 'Cyan'   },
  { preset: 'amber',  color: 'var(--j-warn)',         label: 'Amber'  },
  { preset: 'green',  color: 'var(--j-ok)',           label: 'Green'  },
  { preset: 'red',    color: 'var(--j-err)',          label: 'Red'    },
  { preset: 'purple', color: PRESETS['purple'].accent, label: 'Purple' },
  { preset: 'white',  color: 'var(--j-accent-deep)',  label: 'White'  },
]

export function JThemePicker({ compact = false, showCustom = true }: JThemePickerProps) {
  const { theme, setPreset, setTheme } = useTheme()
  const [isCustom,     setIsCustom]    = useState(false)
  const [customAccent, setCustomAccent] = useState(theme.accent)
  const [customBg,     setCustomBg]     = useState(theme.bg)
  const [customCard,   setCustomCard]   = useState(theme.bgCard)

  function swatchStyle(color: string, active: boolean): React.CSSProperties {
    const size = compact ? '20px' : '48px'
    const clip = compact ? '4px' : '6px'
    return {
      width:          size,
      height:         compact ? '20px' : '32px',
      background:     color,
      border:         `2px solid ${active ? 'var(--j-text-primary)' : 'transparent'}`,
      boxShadow:      active ? `0 0 12px ${color}` : 'none',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      cursor:         'pointer',
      clipPath:       `polygon(${clip} 0,100% 0,calc(100% - ${clip}) 100%,0 100%)`,
      transition:     'all .15s',
    }
  }

  function applyCustom() {
    setIsCustom(true)
    setTheme({
      ...theme,
      name:      'Custom',
      preset:    'cyan',
      accent:    customAccent,
      accentMid: customAccent,
      accentDim: customAccent,
      bg:        customBg,
      bgCard:    customCard,
      bgCardAlt: customCard,
    })
  }

  return (
    <div style={{
      fontFamily: "'Courier New', monospace",
      padding:    compact ? '0' : '12px 14px',
    }}>
      {!compact && (
        <div style={{
          fontSize: '9px', color: 'var(--j-accent-70)', letterSpacing: '.14em',
          textTransform: 'uppercase', marginBottom: '8px',
        }}>
          Theme
        </div>
      )}

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {PRESET_SWATCHES.map(({ preset, color, label }) => {
          const active = !isCustom && theme.preset === preset
          return (
            <button
              key={preset}
              title={label}
              aria-pressed={active}
              onClick={() => { setIsCustom(false); setPreset(preset) }}
              style={swatchStyle(color, active)}
            >
              {!compact && (
                <span style={{
                  fontSize:      '9px',
                  fontFamily:    "'Courier New', monospace",
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color:         active ? 'var(--j-bg)' : color,
                  marginTop:     '2px',
                }}>
                  {label}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {showCustom && !compact && (
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{
            fontSize: '9px', color: 'var(--j-accent-70)', letterSpacing: '.14em',
            textTransform: 'uppercase', marginBottom: '2px',
          }}>
            Custom accent
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="color"
              value={customAccent}
              onChange={e => setCustomAccent(e.target.value)}
              style={{
                width: '36px', height: '28px', background: 'transparent',
                border: '1px solid var(--j-border)', cursor: 'pointer',
                clipPath: 'polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)',
              }}
            />
            <span style={{
              fontSize: '10px', color: 'var(--j-text-muted)',
              fontFamily: "'Courier New', monospace",
            }}>
              {customAccent}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '8px', color: 'var(--j-text-dim)', marginBottom: '3px' }}>Background</div>
              <input
                type="color"
                value={customBg}
                onChange={e => setCustomBg(e.target.value)}
                style={{
                  width: '100%', height: '24px', background: 'transparent',
                  border: '1px solid var(--j-border)', cursor: 'pointer',
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '8px', color: 'var(--j-text-dim)', marginBottom: '3px' }}>Card</div>
              <input
                type="color"
                value={customCard}
                onChange={e => setCustomCard(e.target.value)}
                style={{
                  width: '100%', height: '24px', background: 'transparent',
                  border: '1px solid var(--j-border)', cursor: 'pointer',
                }}
              />
            </div>
          </div>
          <button
            onClick={applyCustom}
            style={{
              padding: '7px 14px', background: 'var(--j-accent-12)',
              border: '1px solid var(--j-border)',
              color: 'var(--j-accent)', fontFamily: "'Courier New', monospace",
              fontSize: '10px', letterSpacing: '.10em', textTransform: 'uppercase',
              cursor: 'pointer',
              clipPath: 'polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)',
            }}
          >
            Apply Custom
          </button>
        </div>
      )}
    </div>
  )
}
