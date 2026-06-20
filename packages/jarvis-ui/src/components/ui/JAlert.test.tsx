import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JAlert } from './JAlert'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JAlert', () => {
  it('renders children', () => {
    render(<W><JAlert>System is online.</JAlert></W>)
    expect(screen.getByText('System is online.')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<W><JAlert title="STATUS">Content</JAlert></W>)
    expect(screen.getByText('STATUS')).toBeInTheDocument()
  })

  it('no title element when title omitted', () => {
    render(<W><JAlert>Content</JAlert></W>)
    expect(screen.queryByText('STATUS')).not.toBeInTheDocument()
  })

  it('warning state uses warn CSS var in left rail', () => {
    const { container } = render(<W><JAlert state="warning">Warn</JAlert></W>)
    const rail = container.querySelectorAll('div')[1] as HTMLElement
    expect(rail.style.background).toContain('j-warn')
  })

  it('error state uses err CSS var in left rail', () => {
    const { container } = render(<W><JAlert state="error">Error</JAlert></W>)
    const rail = container.querySelectorAll('div')[1] as HTMLElement
    expect(rail.style.background).toContain('j-err')
  })

  it('dismissible=true shows dismiss button', () => {
    render(<W><JAlert dismissible>Content</JAlert></W>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('dismissible=false shows no button', () => {
    render(<W><JAlert>Content</JAlert></W>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('clicking dismiss button removes alert from DOM', () => {
    render(<W><JAlert dismissible>ToRemove</JAlert></W>)
    expect(screen.getByText('ToRemove')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    expect(screen.queryByText('ToRemove')).not.toBeInTheDocument()
  })

  it('onDismiss callback called on dismiss', () => {
    const onDismiss = vi.fn()
    render(<W><JAlert dismissible onDismiss={onDismiss}>Content</JAlert></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('blink=true adds j-blink-slow class', () => {
    const { container } = render(<W><JAlert blink>Content</JAlert></W>)
    expect(container.querySelector('.j-blink-slow')).toBeInTheDocument()
  })

  it('warning icon renders ⚠', () => {
    render(<W><JAlert state="warning">Warn</JAlert></W>)
    expect(screen.getByText('⚠')).toBeInTheDocument()
  })

  it('error icon renders ✕', () => {
    render(<W><JAlert state="error">Err</JAlert></W>)
    expect(screen.getAllByText('✕')[0]).toBeInTheDocument()
  })

  it('success icon renders ✓', () => {
    render(<W><JAlert state="success">Ok</JAlert></W>)
    expect(screen.getByText('✓')).toBeInTheDocument()
  })
})
