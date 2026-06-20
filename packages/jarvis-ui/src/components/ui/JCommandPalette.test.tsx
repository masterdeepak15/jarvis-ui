import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JCommandPalette } from './JCommandPalette'
import type { JCommand } from './JCommandPalette'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

const CMDS: JCommand[] = [
  { label: 'Open Dashboard', key: 'open-dashboard', group: 'Navigation', icon: '⊞' },
  { label: 'New Report',     key: 'new-report',     group: 'Navigation', description: 'Create a new report' },
  { label: 'Toggle Theme',   key: 'toggle-theme',   group: 'Settings',   icon: '◐' },
  { label: 'Export Data',    key: 'export-data',    group: 'Settings' },
  { label: 'Show Logs',      key: 'show-logs',      group: 'Debug',    state: 'warning' },
]

const noop = () => {}

describe('JCommandPalette', () => {
  it('visible=false renders nothing', () => {
    const { container } = render(
      <W><JCommandPalette visible={false} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    expect(container.querySelector('input')).not.toBeInTheDocument()
  })

  it('visible=true renders input', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    expect(container.querySelector('input')).toBeInTheDocument()
  })

  it('all commands shown when query empty', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    expect(container.querySelector('[data-cmd="open-dashboard"]')).toBeInTheDocument()
    expect(container.querySelector('[data-cmd="toggle-theme"]')).toBeInTheDocument()
    expect(container.querySelector('[data-cmd="show-logs"]')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-cmd]').length).toBe(CMDS.length)
  })

  it('filtering by query shows matching commands only', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    const input = container.querySelector('input')!
    fireEvent.change(input, { target: { value: 'theme' } })
    expect(container.querySelector('[data-cmd="toggle-theme"]')).toBeInTheDocument()
    expect(container.querySelector('[data-cmd="open-dashboard"]')).not.toBeInTheDocument()
  })

  it('filter matches description field', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    fireEvent.change(container.querySelector('input')!, { target: { value: 'create' } })
    expect(container.querySelector('[data-cmd="new-report"]')).toBeInTheDocument()
    expect(container.querySelector('[data-cmd="open-dashboard"]')).not.toBeInTheDocument()
  })

  it('group headers render for each group', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    const groups = container.querySelectorAll('[data-group-header]')
    expect(groups.length).toBe(3)
  })

  it('first item is selected by default (data-selected=true)', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    const rows = container.querySelectorAll('[data-cmd]')
    expect(rows[0].getAttribute('data-selected')).toBe('true')
  })

  it('ArrowDown selects second item', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    const input = container.querySelector('input')!
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    const rows = container.querySelectorAll('[data-cmd]')
    expect(rows[1].getAttribute('data-selected')).toBe('true')
    expect(rows[0].getAttribute('data-selected')).toBe('false')
  })

  it('ArrowUp on first item stays at first', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    const input = container.querySelector('input')!
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    const rows = container.querySelectorAll('[data-cmd]')
    expect(rows[0].getAttribute('data-selected')).toBe('true')
  })

  it('Enter key calls onExecute with first command', () => {
    const onExecute = vi.fn()
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={onExecute} /></W>
    )
    fireEvent.keyDown(container.querySelector('input')!, { key: 'Enter' })
    expect(onExecute).toHaveBeenCalledWith(CMDS[0])
  })

  it('Enter executes the currently selected (not always first) command', () => {
    const onExecute = vi.fn()
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={onExecute} /></W>
    )
    const input = container.querySelector('input')!
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onExecute).toHaveBeenCalledWith(CMDS[1])
  })

  it('Escape key calls onClose', () => {
    const onClose = vi.fn()
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={onClose} commands={CMDS} onExecute={noop} /></W>
    )
    fireEvent.keyDown(container.querySelector('input')!, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })

  it('clicking backdrop calls onClose', () => {
    const onClose = vi.fn()
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={onClose} commands={CMDS} onExecute={noop} /></W>
    )
    fireEvent.click(container.querySelector('[data-backdrop]')!)
    expect(onClose).toHaveBeenCalled()
  })

  it('clicking a command calls onExecute', () => {
    const onExecute = vi.fn()
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={onExecute} /></W>
    )
    fireEvent.click(container.querySelector('[data-cmd="toggle-theme"]')!)
    expect(onExecute).toHaveBeenCalledWith(CMDS[2])
  })

  it('clear button not shown when query empty', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    expect(container.querySelector('[data-clear]')).not.toBeInTheDocument()
  })

  it('clear button shown when query non-empty', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    fireEvent.change(container.querySelector('input')!, { target: { value: 'x' } })
    expect(container.querySelector('[data-clear]')).toBeInTheDocument()
  })

  it('clear button click resets query and shows all commands', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    const input = container.querySelector('input')!
    fireEvent.change(input, { target: { value: 'theme' } })
    expect(container.querySelector('[data-cmd="open-dashboard"]')).not.toBeInTheDocument()
    fireEvent.click(container.querySelector('[data-clear]')!)
    expect(container.querySelector('[data-cmd="open-dashboard"]')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-cmd]').length).toBe(CMDS.length)
  })

  it('no match renders NO COMMANDS FOUND', () => {
    const { getByText, container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    fireEvent.change(container.querySelector('input')!, { target: { value: 'zzznomatch' } })
    expect(getByText(/NO COMMANDS FOUND/i)).toBeInTheDocument()
  })

  it('placeholder prop shown in input', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} placeholder="Search commands..." /></W>
    )
    expect(container.querySelector('input')!.placeholder).toBe('Search commands...')
  })

  it('default placeholder shown when not specified', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    expect(container.querySelector('input')!.placeholder).toBeTruthy()
  })

  it('footer shows NAVIGATE and EXECUTE hints', () => {
    const { getByText } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    expect(getByText(/NAVIGATE/)).toBeInTheDocument()
    expect(getByText(/EXECUTE/)).toBeInTheDocument()
  })

  it('isListening=true shows mic icon', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} isListening={true} /></W>
    )
    expect(container.querySelector('[data-search-icon]')!.textContent).toContain('🎙')
  })

  it('isListening=false (default) shows search icon', () => {
    const { container } = render(
      <W><JCommandPalette visible={true} onClose={noop} commands={CMDS} onExecute={noop} /></W>
    )
    expect(container.querySelector('[data-search-icon]')!.textContent).toContain('⌕')
  })
})
