import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JControlPanel } from './JControlPanel'
import type { JControlSection } from './JControlPanel'

const sections: JControlSection[] = [
  { id: 'display',  icon: '🖥',  label: 'Display',  component: <div data-testid="display-content">Display settings</div> },
  { id: 'network',  icon: '🌐',  label: 'Network',  component: <div data-testid="network-content">Network settings</div> },
  { id: 'sound',    icon: '🔊',  label: 'Sound',    component: <div data-testid="sound-content">Sound settings</div> },
]

describe('JControlPanel', () => {
  it('renders section icons in grid', () => {
    render(<JControlPanel sections={sections} />)
    expect(screen.getByText('🖥')).toBeInTheDocument()
    expect(screen.getByText('🌐')).toBeInTheDocument()
    expect(screen.getByText('🔊')).toBeInTheDocument()
  })

  it('renders section labels', () => {
    render(<JControlPanel sections={sections} />)
    expect(screen.getByText('Display')).toBeInTheDocument()
    expect(screen.getByText('Network')).toBeInTheDocument()
  })

  it('clicking a section shows its content in right pane', () => {
    render(<JControlPanel sections={sections} />)
    fireEvent.click(screen.getByText('Display').closest('button')!)
    expect(screen.getByTestId('display-content')).toBeInTheDocument()
  })

  it('defaultSection opens section on mount', () => {
    render(<JControlPanel sections={sections} defaultSection="network" />)
    expect(screen.getByTestId('network-content')).toBeInTheDocument()
  })

  it('clicking another section switches content', () => {
    render(<JControlPanel sections={sections} defaultSection="display" />)
    expect(screen.getByTestId('display-content')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Network').closest('button')!)
    expect(screen.getByTestId('network-content')).toBeInTheDocument()
    expect(screen.queryByTestId('display-content')).not.toBeInTheDocument()
  })

  it('search input filters sections by label', () => {
    render(<JControlPanel sections={sections} />)
    fireEvent.change(screen.getByPlaceholderText('Search settings...'), { target: { value: 'net' } })
    expect(screen.getByText('Network')).toBeInTheDocument()
    expect(screen.queryByText('Display')).not.toBeInTheDocument()
    expect(screen.queryByText('Sound')).not.toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<JControlPanel sections={sections} />)
    expect(screen.getByPlaceholderText('Search settings...')).toBeInTheDocument()
  })
})
