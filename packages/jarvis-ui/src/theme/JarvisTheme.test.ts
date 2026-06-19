import { describe, it, expect } from 'vitest'
import { toCss, PRESETS } from './JarvisTheme'

describe('PRESETS', () => {
  it('has exactly 6 presets', () => {
    expect(Object.keys(PRESETS)).toHaveLength(6)
    expect(Object.keys(PRESETS)).toEqual(['cyan', 'amber', 'green', 'red', 'purple', 'white'])
  })

  it('cyan preset has correct accent', () => {
    expect(PRESETS.cyan.accent).toBe('#00e5ff')
  })

  it('amber preset has correct accent', () => {
    expect(PRESETS.amber.accent).toBe('#f97316')
  })

  it('green preset has correct accent', () => {
    expect(PRESETS.green.accent).toBe('#22c55e')
  })

  it('red preset has correct accent', () => {
    expect(PRESETS.red.accent).toBe('#ef4444')
  })

  it('purple preset has correct accent', () => {
    expect(PRESETS.purple.accent).toBe('#a855f7')
  })

  it('white preset has light background', () => {
    expect(PRESETS.white.bg).toBe('#f0f9ff')
    expect(PRESETS.white.textPrimary).toBe('#0c1a2e')
  })

  it('all presets have animation duration properties', () => {
    Object.values(PRESETS).forEach((preset) => {
      expect(preset.durScan).toBe('3.5s')
      expect(preset.durPulse).toBe('2.8s')
      expect(preset.notch).toBe('14px')
    })
  })
})

describe('toCss', () => {
  it('generates --j-accent variable', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-accent:')
    expect(css).toContain('#00e5ff')
  })

  it('generates opacity variants for accent (rgba format r,g,b space alpha)', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-accent-05:')
    expect(css).toContain('rgba(0,229,255, 0.05)')
    expect(css).toContain('--j-accent-50:')
    expect(css).toContain('rgba(0,229,255, 0.50)')
    expect(css).toContain('--j-accent-70:')
    expect(css).toContain('rgba(0,229,255, 0.70)')
  })

  it('generates warn opacity variants', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-warn:')
    expect(css).toContain('--j-warn-05:')
    expect(css).toContain('--j-warn-50:')
  })

  it('generates background variables', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-bg:')
    expect(css).toContain('#020d18')
    expect(css).toContain('--j-bg-card:')
    expect(css).toContain('--j-bg-card-alt:')
    expect(css).toContain('--j-bg-danger:')
    expect(css).toContain('--j-bg-overlay:')
  })

  it('generates border variables derived from accent', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-border-dim:')
    expect(css).toContain('rgba(0,229,255, 0.07)')
    expect(css).toContain('--j-border:')
    expect(css).toContain('rgba(0,229,255, 0.18)')
  })

  it('generates text variables', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-text-primary:')
    expect(css).toContain('#e0f7ff')
    expect(css).toContain('--j-text-secondary:')
    expect(css).toContain('--j-text-muted:')
    expect(css).toContain('--j-text-dim:')
  })

  it('generates animation duration variables', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-dur-scan:')
    expect(css).toContain('3.5s')
    expect(css).toContain('--j-dur-pulse:')
    expect(css).toContain('2.8s')
    expect(css).toContain('--j-dur-spin:')
    expect(css).toContain('--j-dur-shine:')
    expect(css).toContain('--j-dur-corner:')
  })

  it('generates shape token variables', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-notch:')
    expect(css).toContain('14px')
    expect(css).toContain('--j-notch-lg:')
    expect(css).toContain('20px')
    expect(css).toContain('--j-rail-w:')
    expect(css).toContain('3px')
  })

  it('wraps output in :root block', () => {
    const css = toCss(PRESETS.cyan)
    expect(css.trim()).toMatch(/^:root\s*\{/)
    expect(css.trim()).toMatch(/\}\s*$/)
  })

  it('generates correct amber rgba from amber accent', () => {
    const css = toCss(PRESETS.amber)
    // amber accent #f97316 → rgb(249,115,22)
    expect(css).toContain('rgba(249,115,22, 0.05)')
  })
})
