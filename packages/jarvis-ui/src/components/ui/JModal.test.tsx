import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JModal } from './JModal'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JModal', () => {
  it('open=false renders nothing', () => {
    render(<W><JModal open={false} onClose={vi.fn()} title="Test">Body</JModal></W>)
    expect(screen.queryByText('Test')).not.toBeInTheDocument()
    expect(screen.queryByText('Body')).not.toBeInTheDocument()
  })

  it('open=true renders title', () => {
    render(<W><JModal open onClose={vi.fn()} title="Shutdown">Body</JModal></W>)
    expect(screen.getByText('Shutdown')).toBeInTheDocument()
  })

  it('open=true renders body children', () => {
    render(<W><JModal open onClose={vi.fn()} title="X">Modal body content</JModal></W>)
    expect(screen.getByText('Modal body content')).toBeInTheDocument()
  })

  it('subTitle renders when provided', () => {
    render(<W><JModal open onClose={vi.fn()} title="X" subTitle="SYSTEM">Body</JModal></W>)
    expect(screen.getByText('SYSTEM')).toBeInTheDocument()
  })

  it('no subTitle element when omitted', () => {
    render(<W><JModal open onClose={vi.fn()} title="X">Body</JModal></W>)
    expect(screen.queryByText('SYSTEM')).not.toBeInTheDocument()
  })

  it('footer renders when provided', () => {
    render(<W><JModal open onClose={vi.fn()} title="X" footer={<button>Confirm</button>}>Body</JModal></W>)
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('no footer when footer omitted', () => {
    render(<W><JModal open onClose={vi.fn()} title="X">Body</JModal></W>)
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument()
  })

  it('closable=true (default) shows close button', () => {
    render(<W><JModal open onClose={vi.fn()} title="X">Body</JModal></W>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('close button click calls onClose', () => {
    const onClose = vi.fn()
    render(<W><JModal open onClose={onClose} title="X">Body</JModal></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('closable=false hides close button', () => {
    render(<W><JModal open onClose={vi.fn()} title="X" closable={false}>Body</JModal></W>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('backdrop click calls onClose when closeOnBackdrop=true (default)', () => {
    const onClose = vi.fn()
    render(<W><JModal open onClose={onClose} title="X">Body</JModal></W>)
    const backdrop = document.querySelector('[data-testid="j-modal-backdrop"]') as HTMLElement
    fireEvent.click(backdrop)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('backdrop click does NOT call onClose when closeOnBackdrop=false', () => {
    const onClose = vi.fn()
    render(<W><JModal open onClose={onClose} title="X" closeOnBackdrop={false}>Body</JModal></W>)
    const backdrop = document.querySelector('[data-testid="j-modal-backdrop"]') as HTMLElement
    fireEvent.click(backdrop)
    expect(onClose).not.toHaveBeenCalled()
  })
})
