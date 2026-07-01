import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JTaskManager } from './JTaskManager'
import type { JProcess } from './JTaskManager'

const processes: JProcess[] = [
  { pid: 1001, name: 'chrome.exe',   cpu: 45, memory: 512,  status: 'running' },
  { pid: 1002, name: 'node.exe',     cpu: 12, memory: 128,  status: 'running' },
  { pid: 1003, name: 'python.exe',   cpu: 0,  memory: 64,   status: 'suspended' },
  { pid: 1004, name: 'notepad.exe',  cpu: 0,  memory: 8,    status: 'stopped' },
]

describe('JTaskManager', () => {
  it('renders all processes', () => {
    render(<JTaskManager processes={processes} />)
    expect(screen.getByText('chrome.exe')).toBeInTheDocument()
    expect(screen.getByText('node.exe')).toBeInTheDocument()
    expect(screen.getByText('python.exe')).toBeInTheDocument()
    expect(screen.getByText('notepad.exe')).toBeInTheDocument()
  })

  it('renders PID column', () => {
    render(<JTaskManager processes={processes} />)
    expect(screen.getByText('1001')).toBeInTheDocument()
  })

  it('renders CPU percentage', () => {
    render(<JTaskManager processes={processes} />)
    expect(screen.getByText('45%')).toBeInTheDocument()
  })

  it('renders memory in MB', () => {
    render(<JTaskManager processes={processes} />)
    expect(screen.getByText('512 MB')).toBeInTheDocument()
  })

  it('renders status badge', () => {
    render(<JTaskManager processes={processes} />)
    expect(screen.getAllByText('running')).toHaveLength(2)
    expect(screen.getByText('suspended')).toBeInTheDocument()
    expect(screen.getByText('stopped')).toBeInTheDocument()
  })

  it('clicking column header sorts by that column ascending', () => {
    render(<JTaskManager processes={processes} />)
    fireEvent.click(screen.getByText('CPU'))
    const rows = document.querySelectorAll('tbody tr')
    // After ascending sort by cpu, first row should have cpu=0
    expect(rows[0].textContent).toContain('0%')
  })

  it('clicking same column header twice sorts descending', () => {
    render(<JTaskManager processes={processes} />)
    fireEvent.click(screen.getByText('CPU'))
    fireEvent.click(screen.getByText('CPU'))
    const rows = document.querySelectorAll('tbody tr')
    // After descending sort by cpu, first row should have cpu=45
    expect(rows[0].textContent).toContain('45%')
  })

  it('calls onKill with pid when kill button clicked', () => {
    const onKill = vi.fn()
    render(<JTaskManager processes={processes} onKill={onKill} />)
    const killBtns = screen.getAllByText('Kill')
    fireEvent.click(killBtns[0])
    expect(onKill).toHaveBeenCalledWith(expect.any(Number))
  })

  it('no kill buttons when onKill is not provided', () => {
    render(<JTaskManager processes={processes} />)
    expect(screen.queryByText('Kill')).not.toBeInTheDocument()
  })
})
