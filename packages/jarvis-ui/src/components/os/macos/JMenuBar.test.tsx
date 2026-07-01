import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JOSThemeProvider } from '../shell/JOSThemeProvider'
import { JWindowManager } from '../shell/JWindowManager'
import { JMenuBar } from './JMenuBar'
import type { JMenuBarMenu } from './JMenuBar'

const menus: JMenuBarMenu[] = [
  { label: 'File', items: [{ label: 'New', shortcut: '⌘N', onClick: vi.fn() }, { label: 'Open', shortcut: '⌘O', onClick: vi.fn() }] },
]

function W() {
  return <JOSThemeProvider theme="macos"><JWindowManager><JMenuBar appName="MyApp" menus={menus} /></JWindowManager></JOSThemeProvider>
}

describe('JMenuBar', () => {
  it('renders app name', () => {
    render(<W />)
    expect(screen.getByText('MyApp')).toBeInTheDocument()
  })

  it('renders menu labels', () => {
    render(<W />)
    expect(screen.getByText('File')).toBeInTheDocument()
  })

  it('clicking menu label shows dropdown items', () => {
    render(<W />)
    fireEvent.click(screen.getByText('File'))
    expect(screen.getByText('New')).toBeInTheDocument()
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('clicking a menu item calls its onClick', () => {
    const onClick = vi.fn()
    render(
      <JOSThemeProvider theme="macos">
        <JWindowManager>
          <JMenuBar appName="App" menus={[{ label: 'Edit', items: [{ label: 'Copy', onClick }] }]} />
        </JWindowManager>
      </JOSThemeProvider>
    )
    fireEvent.click(screen.getByText('Edit'))
    fireEvent.click(screen.getByText('Copy'))
    expect(onClick).toHaveBeenCalled()
  })

  it('renders clock', () => {
    render(<W />)
    expect(screen.getByTestId('j-os-menubar-clock')).toBeInTheDocument()
  })
})
