import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { JThemeProvider, useTheme } from '../../theme/JThemeContext'
import { JThemePicker } from './JThemePicker'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JThemePicker', () => {
  it('renders without crashing', () => {
    render(<Wrapper><JThemePicker /></Wrapper>)
  })

  it('renders all 6 preset swatch buttons', () => {
    render(<Wrapper><JThemePicker /></Wrapper>)
    const buttons = screen.getAllByRole('button')
    const swatchButtons = buttons.filter(b => b.getAttribute('title'))
    expect(swatchButtons).toHaveLength(6)
    expect(swatchButtons.map(b => b.getAttribute('title'))).toEqual(
      ['Cyan', 'Amber', 'Green', 'Red', 'Purple', 'White']
    )
  })

  it('renders custom accent input when showCustom=true (default)', () => {
    render(<Wrapper><JThemePicker /></Wrapper>)
    const colorInputs = screen.getAllByDisplayValue(/./)
    expect(colorInputs.some(i => i.getAttribute('type') === 'color')).toBe(true)
  })

  it('does not render custom controls when showCustom=false', () => {
    render(<Wrapper><JThemePicker showCustom={false} /></Wrapper>)
    const applyButtons = screen.queryByText(/apply/i)
    expect(applyButtons).toBeNull()
  })

  it('clicking a swatch calls setPreset and updates theme', async () => {
    const user = userEvent.setup()
    function DisplayInner() {
      const { theme } = useTheme()
      return <span data-testid="accent">{theme.accent}</span>
    }
    render(
      <JThemeProvider>
        <JThemePicker />
        <DisplayInner />
      </JThemeProvider>
    )
    const amberSwatch = screen.getByTitle('Amber')
    await user.click(amberSwatch)
    expect(screen.getByTestId('accent')).toHaveTextContent('#f97316')
  })

  it('compact mode renders swatch buttons without label spans', () => {
    render(<Wrapper><JThemePicker compact /></Wrapper>)
    const buttons = screen.getAllByRole('button').filter(b => b.getAttribute('title'))
    buttons.forEach(b => {
      expect(b.querySelector('span')).toBeNull()
    })
  })
})
