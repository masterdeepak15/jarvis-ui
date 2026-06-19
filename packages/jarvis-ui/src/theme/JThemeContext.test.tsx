import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { JThemeProvider, useTheme } from './JThemeContext'
import { PRESETS } from './JarvisTheme'

function ThemeDisplay() {
  const { theme, setPreset, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme-name">{theme.name}</span>
      <span data-testid="theme-accent">{theme.accent}</span>
      <button onClick={() => setPreset('amber')}>Switch Amber</button>
      <button onClick={() => setTheme({ ...PRESETS.green })}>Switch Green</button>
    </div>
  )
}

beforeEach(() => {
  document.getElementById('jarvis-theme-vars')?.remove()
})

describe('JThemeProvider', () => {
  it('renders children', () => {
    render(<JThemeProvider><span>hello</span></JThemeProvider>)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('provides cyan theme by default', () => {
    render(<JThemeProvider><ThemeDisplay /></JThemeProvider>)
    expect(screen.getByTestId('theme-name')).toHaveTextContent('Cyan')
    expect(screen.getByTestId('theme-accent')).toHaveTextContent('#00e5ff')
  })

  it('accepts preset prop', () => {
    render(<JThemeProvider preset="amber"><ThemeDisplay /></JThemeProvider>)
    expect(screen.getByTestId('theme-name')).toHaveTextContent('Amber')
    expect(screen.getByTestId('theme-accent')).toHaveTextContent('#f97316')
  })

  it('accepts theme prop', () => {
    render(<JThemeProvider theme={PRESETS.purple}><ThemeDisplay /></JThemeProvider>)
    expect(screen.getByTestId('theme-name')).toHaveTextContent('Purple')
  })

  it('injects <style id="jarvis-theme-vars"> into document.head', () => {
    render(<JThemeProvider><div /></JThemeProvider>)
    const style = document.getElementById('jarvis-theme-vars')
    expect(style).not.toBeNull()
    expect(style?.tagName).toBe('STYLE')
  })

  it('style tag contains --j-accent CSS variable', () => {
    render(<JThemeProvider><div /></JThemeProvider>)
    const style = document.getElementById('jarvis-theme-vars')
    expect(style?.textContent).toContain('--j-accent:')
    expect(style?.textContent).toContain('#00e5ff')
  })

  it('updates style tag when setPreset is called', async () => {
    const user = userEvent.setup()
    render(<JThemeProvider><ThemeDisplay /></JThemeProvider>)
    await user.click(screen.getByText('Switch Amber'))
    const style = document.getElementById('jarvis-theme-vars')
    expect(style?.textContent).toContain('#f97316')
    expect(screen.getByTestId('theme-accent')).toHaveTextContent('#f97316')
  })

  it('updates style tag when setTheme is called', async () => {
    const user = userEvent.setup()
    render(<JThemeProvider><ThemeDisplay /></JThemeProvider>)
    await user.click(screen.getByText('Switch Green'))
    const style = document.getElementById('jarvis-theme-vars')
    expect(style?.textContent).toContain('#22c55e')
  })

  it('reuses existing style tag rather than creating a second one', async () => {
    const user = userEvent.setup()
    render(<JThemeProvider><ThemeDisplay /></JThemeProvider>)
    await user.click(screen.getByText('Switch Amber'))
    await user.click(screen.getByText('Switch Green'))
    const styleTags = document.querySelectorAll('#jarvis-theme-vars')
    expect(styleTags).toHaveLength(1)
  })
})

describe('useTheme', () => {
  it('throws when used outside JThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ThemeDisplay />)).toThrow('useTheme must be used inside JThemeProvider')
    spy.mockRestore()
  })
})
