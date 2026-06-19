import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JButton } from './JButton'
import type { JButtonProps } from './JButton'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JButton', () => {
  it('renders children', () => {
    render(<W><JButton>Launch</JButton></W>)
    expect(screen.getByText('Launch')).toBeInTheDocument()
  })

  it('applies default shape class j-btn-left-notch', () => {
    const { container } = render(<W><JButton>X</JButton></W>)
    expect(container.querySelector('.j-btn-left-notch')).toBeTruthy()
  })

  it('applies specified shape class j-btn-hex for Hexagonal', () => {
    const { container } = render(<W><JButton shape="Hexagonal">X</JButton></W>)
    expect(container.querySelector('.j-btn-hex')).toBeTruthy()
  })

  it('applies specified shape class j-btn-bracket for BracketFrame', () => {
    const { container } = render(<W><JButton shape="BracketFrame">X</JButton></W>)
    expect(container.querySelector('.j-btn-bracket')).toBeTruthy()
  })

  it('applies color class j-color-red', () => {
    const { container } = render(<W><JButton color="red">X</JButton></W>)
    expect(container.querySelector('.j-color-red')).toBeTruthy()
  })

  it('applies size class j-size-lg', () => {
    const { container } = render(<W><JButton size="lg">X</JButton></W>)
    expect(container.querySelector('.j-size-lg')).toBeTruthy()
  })

  it('calls onClick when clicked', () => {
    const fn = vi.fn()
    render(<W><JButton onClick={fn}>X</JButton></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const fn = vi.fn()
    render(<W><JButton disabled onClick={fn}>X</JButton></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(fn).not.toHaveBeenCalled()
  })

  it('does not call onClick when loading', () => {
    const fn = vi.fn()
    render(<W><JButton loading onClick={fn}>X</JButton></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(fn).not.toHaveBeenCalled()
  })

  it('shows loading indicator and hides children when loading', () => {
    render(<W><JButton loading>Submit</JButton></W>)
    expect(screen.queryByText('Submit')).toBeNull()
    expect(screen.getByText('···')).toBeInTheDocument()
  })

  it('passes type=submit attribute', () => {
    render(<W><JButton type="submit">X</JButton></W>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('renders icon slot', () => {
    render(<W><JButton icon={<span data-testid="icon" />}>X</JButton></W>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders iconRight slot', () => {
    render(<W><JButton iconRight={<span data-testid="ir" />}>X</JButton></W>)
    expect(screen.getByTestId('ir')).toBeInTheDocument()
  })

  it('renders all 9 shapes without throwing', () => {
    const shapes: JButtonProps['shape'][] = [
      'LeftNotch','RightNotch','BothNotch','Parallelogram',
      'GhostSkew','BracketFrame','Hexagonal','IconSquare','ScanFull',
    ]
    for (const shape of shapes) {
      expect(() => render(<W><JButton shape={shape}>X</JButton></W>)).not.toThrow()
    }
  })
})
