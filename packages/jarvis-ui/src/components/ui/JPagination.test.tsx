import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JPagination } from './JPagination'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

// ── Tick mode (totalPages ≤ 10) ───────────────────────────────────
describe('JPagination — tick mode (totalPages ≤ 10)', () => {
  it('renders 5 tick bars for totalPages=5', () => {
    const { container } = render(<W><JPagination page={1} onPageChange={vi.fn()} totalPages={5} /></W>)
    expect(container.querySelectorAll('[role="button"]').length).toBe(5)
  })

  it('renders 10 tick bars for totalPages=10', () => {
    const { container } = render(<W><JPagination page={1} onPageChange={vi.fn()} totalPages={10} /></W>)
    expect(container.querySelectorAll('[role="button"]').length).toBe(10)
  })

  it('active tick has aria-current=page', () => {
    const { container } = render(<W><JPagination page={3} onPageChange={vi.fn()} totalPages={5} /></W>)
    const ticks = container.querySelectorAll('[role="button"]')
    expect(ticks[2]).toHaveAttribute('aria-current', 'page')
  })

  it('inactive ticks do not have aria-current', () => {
    const { container } = render(<W><JPagination page={2} onPageChange={vi.fn()} totalPages={5} /></W>)
    const ticks = container.querySelectorAll('[role="button"]')
    expect(ticks[0]).not.toHaveAttribute('aria-current', 'page')
    expect(ticks[2]).not.toHaveAttribute('aria-current', 'page')
  })

  it('clicking a tick calls onPageChange with correct page number', () => {
    const onChange = vi.fn()
    const { container } = render(<W><JPagination page={1} onPageChange={onChange} totalPages={5} /></W>)
    fireEvent.click(container.querySelectorAll('[role="button"]')[2])
    expect(onChange).toHaveBeenCalledWith(3)
  })
})

// ── Ellipsis mode (totalPages > 10) ──────────────────────────────
describe('JPagination — ellipsis mode (totalPages > 10)', () => {
  it('renders numbered page buttons when totalPages=20', () => {
    render(<W><JPagination page={10} onPageChange={vi.fn()} totalPages={20} /></W>)
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('renders ··· ellipsis separator', () => {
    render(<W><JPagination page={10} onPageChange={vi.fn()} totalPages={20} /></W>)
    expect(screen.getAllByText('···').length).toBeGreaterThanOrEqual(1)
  })

  it('always shows page 1 when window does not include it', () => {
    render(<W><JPagination page={10} onPageChange={vi.fn()} totalPages={20} /></W>)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('always shows last page when window does not reach it', () => {
    render(<W><JPagination page={10} onPageChange={vi.fn()} totalPages={20} /></W>)
    expect(screen.getByText('20')).toBeInTheDocument()
  })

  it('active page button has aria-current=page', () => {
    render(<W><JPagination page={5} onPageChange={vi.fn()} totalPages={20} /></W>)
    const btn = screen.getByText('5').closest('button') as HTMLElement
    expect(btn).toHaveAttribute('aria-current', 'page')
  })

  it('clicking a page button calls onPageChange', () => {
    const onChange = vi.fn()
    render(<W><JPagination page={10} onPageChange={onChange} totalPages={20} /></W>)
    fireEvent.click(screen.getByText('11'))
    expect(onChange).toHaveBeenCalledWith(11)
  })
})

// ── Nav buttons ───────────────────────────────────────────────────
describe('JPagination — nav buttons', () => {
  it('‹ prev button is disabled on page 1', () => {
    render(<W><JPagination page={1} onPageChange={vi.fn()} totalPages={5} /></W>)
    expect(screen.getByText('‹')).toBeDisabled()
  })

  it('› next button is disabled on last page', () => {
    render(<W><JPagination page={5} onPageChange={vi.fn()} totalPages={5} /></W>)
    expect(screen.getByText('›')).toBeDisabled()
  })

  it('clicking › increments page', () => {
    const onChange = vi.fn()
    render(<W><JPagination page={3} onPageChange={onChange} totalPages={5} /></W>)
    fireEvent.click(screen.getByText('›'))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('clicking ‹ decrements page', () => {
    const onChange = vi.fn()
    render(<W><JPagination page={3} onPageChange={onChange} totalPages={5} /></W>)
    fireEvent.click(screen.getByText('‹'))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('showFirstLast=true shows « and » buttons', () => {
    render(<W><JPagination page={5} onPageChange={vi.fn()} totalPages={10} showFirstLast /></W>)
    expect(screen.getByText('«')).toBeInTheDocument()
    expect(screen.getByText('»')).toBeInTheDocument()
  })

  it('showFirstLast defaults to false — no « or »', () => {
    render(<W><JPagination page={5} onPageChange={vi.fn()} totalPages={10} /></W>)
    expect(screen.queryByText('«')).not.toBeInTheDocument()
    expect(screen.queryByText('»')).not.toBeInTheDocument()
  })

  it('showInfo=true renders page info label', () => {
    render(<W><JPagination page={3} onPageChange={vi.fn()} totalPages={10} showInfo /></W>)
    expect(screen.getByText('3 / 10')).toBeInTheDocument()
  })

  it('showInfo=false hides page info label', () => {
    render(<W><JPagination page={3} onPageChange={vi.fn()} totalPages={10} showInfo={false} /></W>)
    expect(screen.queryByText('3 / 10')).not.toBeInTheDocument()
  })

  it('wrapper has role=navigation with aria-label', () => {
    const { container } = render(<W><JPagination page={1} onPageChange={vi.fn()} totalPages={5} /></W>)
    expect(container.querySelector('nav[aria-label="Pagination"]')).toBeInTheDocument()
  })
})
