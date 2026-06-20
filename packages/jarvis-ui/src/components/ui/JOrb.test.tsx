import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JOrb } from './JOrb'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JOrb', () => {
  it('renders systemName text', () => {
    render(<W><JOrb systemName="JARVIS" /></W>)
    expect(screen.getByText('JARVIS')).toBeInTheDocument()
  })

  it('default systemName is JARVIS', () => {
    render(<W><JOrb /></W>)
    expect(screen.getByText('JARVIS')).toBeInTheDocument()
  })

  it('state=active without listening shows Online', () => {
    render(<W><JOrb state="active" listening={false} /></W>)
    expect(screen.getByText('Online')).toBeInTheDocument()
  })

  it('listening=true shows Listening label', () => {
    render(<W><JOrb state="active" listening /></W>)
    expect(screen.getByText('Listening')).toBeInTheDocument()
  })

  it('state=idle shows Idle label', () => {
    render(<W><JOrb state="idle" /></W>)
    expect(screen.getByText('Idle')).toBeInTheDocument()
  })

  it('state=processing shows Processing label', () => {
    render(<W><JOrb state="processing" /></W>)
    expect(screen.getByText('Processing')).toBeInTheDocument()
  })

  it('state=warning shows Warning label', () => {
    render(<W><JOrb state="warning" /></W>)
    expect(screen.getByText('Warning')).toBeInTheDocument()
  })

  it('state=error shows Error label', () => {
    render(<W><JOrb state="error" /></W>)
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('onClick fires when wrapper is clicked', () => {
    const onClick = vi.fn()
    const { container } = render(<W><JOrb onClick={onClick} /></W>)
    fireEvent.click(container.firstChild as HTMLElement)
    expect(onClick).toHaveBeenCalled()
  })

  it('renders 12 tick marks', () => {
    const { container } = render(<W><JOrb /></W>)
    expect(container.querySelectorAll('[data-testid="orb-tick"]').length).toBe(12)
  })

  it('system name element has j-glitch class', () => {
    const { container } = render(<W><JOrb systemName="TEST" /></W>)
    expect(container.querySelector('.j-glitch')).toBeInTheDocument()
  })
})
