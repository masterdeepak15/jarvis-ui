import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JDesktop } from './JDesktop'
import type { JDesktopApp } from './JDesktop'

const apps: JDesktopApp[] = [
  { id: 'files', icon: '📁', label: 'Files',     component: <div data-testid="files-app">files</div> },
  { id: 'tasks', icon: '📊', label: 'Processes', component: <div data-testid="tasks-app">tasks</div> },
]

describe('JDesktop', () => {
  it('renders desktop icon for each app', () => {
    render(<JDesktop theme="windows11" apps={apps} />)
    expect(screen.getByText('Files')).toBeInTheDocument()
    expect(screen.getByText('Processes')).toBeInTheDocument()
  })

  it('renders app emoji icons', () => {
    render(<JDesktop theme="windows11" apps={apps} />)
    expect(screen.getByText('📁')).toBeInTheDocument()
    expect(screen.getByText('📊')).toBeInTheDocument()
  })

  it('double-clicking icon opens a window with app content', () => {
    render(<JDesktop theme="windows11" apps={apps} />)
    const icon = screen.getByText('📁').closest('[data-app-id]')!
    fireEvent.dblClick(icon)
    expect(screen.getByTestId('files-app')).toBeInTheDocument()
  })

  it('double-clicking same icon twice does not open duplicate window', () => {
    render(<JDesktop theme="windows11" apps={apps} />)
    const icon = screen.getByText('📁').closest('[data-app-id]')!
    fireEvent.dblClick(icon)
    fireEvent.dblClick(icon)
    expect(screen.getAllByText('Files')).toHaveLength(2) // icon label + window title
  })

  it('windows11 theme renders JTaskbar', () => {
    render(<JDesktop theme="windows11" apps={apps} />)
    expect(screen.getByTestId('j-os-taskbar')).toBeInTheDocument()
  })

  it('macos theme renders JDock', () => {
    render(<JDesktop theme="macos" apps={apps} />)
    expect(screen.getByTestId('j-os-dock')).toBeInTheDocument()
  })

  it('macos theme renders JMenuBar', () => {
    render(<JDesktop theme="macos" apps={apps} />)
    expect(screen.getByTestId('j-os-menubar')).toBeInTheDocument()
  })

  it('initialWindows opens apps on mount', () => {
    render(<JDesktop theme="windows11" apps={apps} initialWindows={['files']} />)
    expect(screen.getByTestId('files-app')).toBeInTheDocument()
  })
})
