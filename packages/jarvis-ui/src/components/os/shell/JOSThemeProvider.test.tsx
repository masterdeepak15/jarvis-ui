import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JOSThemeProvider, useOSTheme } from './JOSThemeProvider'

function ThemeReader() {
  const theme = useOSTheme()
  return <div data-testid="theme-value">{theme}</div>
}

describe('JOSThemeProvider', () => {
  it('sets data-os-theme="windows11" on root div', () => {
    render(<JOSThemeProvider theme="windows11"><div /></JOSThemeProvider>)
    expect(screen.getByTestId('j-os-root')).toHaveAttribute('data-os-theme', 'windows11')
  })

  it('sets data-os-theme="macos" on root div', () => {
    render(<JOSThemeProvider theme="macos"><div /></JOSThemeProvider>)
    expect(screen.getByTestId('j-os-root')).toHaveAttribute('data-os-theme', 'macos')
  })

  it('exposes theme value via useOSTheme()', () => {
    render(<JOSThemeProvider theme="macos"><ThemeReader /></JOSThemeProvider>)
    expect(screen.getByTestId('theme-value').textContent).toBe('macos')
  })

  it('applies j-os-root class', () => {
    render(<JOSThemeProvider theme="windows11"><div /></JOSThemeProvider>)
    expect(screen.getByTestId('j-os-root')).toHaveClass('j-os-root')
  })
})
