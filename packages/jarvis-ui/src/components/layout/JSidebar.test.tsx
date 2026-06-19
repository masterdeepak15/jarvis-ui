import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JSidebar } from './JSidebar'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JSidebar', () => {
  it('renders without crashing', () => {
    render(<W><JSidebar /></W>)
  })

  it('shows systemName', () => {
    render(<W><JSidebar systemName="ATLAS" /></W>)
    expect(screen.getByText('ATLAS')).toBeInTheDocument()
  })

  it('shows navLabel', () => {
    render(<W><JSidebar navLabel="MODULES" /></W>)
    expect(screen.getByText('MODULES')).toBeInTheDocument()
  })

  it('renders nav children', () => {
    render(
      <W>
        <JSidebar>
          <span>Nav Item 1</span>
        </JSidebar>
      </W>
    )
    expect(screen.getByText('Nav Item 1')).toBeInTheDocument()
  })

  it('renders footer slot', () => {
    render(
      <W>
        <JSidebar footer={<span>Footer Content</span>} />
      </W>
    )
    expect(screen.getByText('Footer Content')).toBeInTheDocument()
  })

  it('applies sidebar CSS class', () => {
    const { container } = render(<W><JSidebar /></W>)
    expect(container.querySelector('.j-sidebar')).toBeTruthy()
  })

  it('shows version', () => {
    render(<W><JSidebar version="v9.0.0" /></W>)
    expect(screen.getByText('v9.0.0')).toBeInTheDocument()
  })
})
