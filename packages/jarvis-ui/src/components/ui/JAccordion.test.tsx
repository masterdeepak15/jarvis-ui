import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JAccordion } from './JAccordion'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JAccordion', () => {
  it('renders the title', () => {
    render(<W><JAccordion title="System Info">Content</JAccordion></W>)
    expect(screen.getByText('System Info')).toBeInTheDocument()
  })

  it('body is hidden by default', () => {
    render(<W><JAccordion title="Test">Body text</JAccordion></W>)
    expect(screen.queryByText('Body text')).not.toBeInTheDocument()
  })

  it('defaultOpen=true shows body on mount', () => {
    render(<W><JAccordion title="Test" defaultOpen>Body text</JAccordion></W>)
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('clicking header once opens body', () => {
    render(<W><JAccordion title="Test">Body text</JAccordion></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('clicking header twice closes body again', () => {
    render(<W><JAccordion title="Test">Body text</JAccordion></W>)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('button'))
    expect(screen.queryByText('Body text')).not.toBeInTheDocument()
  })

  it('onIsOpenChange fires with true when opened', () => {
    const onChange = vi.fn()
    render(<W><JAccordion title="Test" onIsOpenChange={onChange}>Body</JAccordion></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('onIsOpenChange fires with false when closed', () => {
    const onChange = vi.fn()
    render(<W><JAccordion title="Test" defaultOpen onIsOpenChange={onChange}>Body</JAccordion></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('controlled mode: isOpen=true shows body', () => {
    render(<W><JAccordion title="Test" isOpen>Body text</JAccordion></W>)
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('controlled mode: isOpen=false hides body', () => {
    render(<W><JAccordion title="Test" isOpen={false}>Body text</JAccordion></W>)
    expect(screen.queryByText('Body text')).not.toBeInTheDocument()
  })

  it('icon renders when provided', () => {
    render(<W><JAccordion title="Test" icon="⚡">Body</JAccordion></W>)
    expect(screen.getByText('⚡')).toBeInTheDocument()
  })

  it('badge renders when provided', () => {
    render(<W><JAccordion title="Test" badge="NEW">Body</JAccordion></W>)
    expect(screen.getByText('NEW')).toBeInTheDocument()
  })

  it('header button has aria-expanded=false when closed', () => {
    render(<W><JAccordion title="Test">Body</JAccordion></W>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('header button has aria-expanded=true when open', () => {
    render(<W><JAccordion title="Test" defaultOpen>Body</JAccordion></W>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('open body has role=region', () => {
    const { container } = render(<W><JAccordion title="Test" defaultOpen>Body</JAccordion></W>)
    expect(container.querySelector('[role="region"]')).toBeInTheDocument()
  })

  it('warning state: left rail uses j-warn color', () => {
    const { container } = render(<W><JAccordion title="Test" state="warning">Body</JAccordion></W>)
    const rail = container.querySelector('button > div:first-child') as HTMLElement
    expect(rail.style.background).toContain('j-warn')
  })

  it('error state: left rail uses j-err color', () => {
    const { container } = render(<W><JAccordion title="Test" state="error">Body</JAccordion></W>)
    const rail = container.querySelector('button > div:first-child') as HTMLElement
    expect(rail.style.background).toContain('j-err')
  })

  it('success state: left rail uses j-ok color', () => {
    const { container } = render(<W><JAccordion title="Test" state="success">Body</JAccordion></W>)
    const rail = container.querySelector('button > div:first-child') as HTMLElement
    expect(rail.style.background).toContain('j-ok')
  })
})
