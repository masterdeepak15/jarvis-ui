import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JOSThemeProvider } from '../shell/JOSThemeProvider'
import { JWindowManager } from '../shell/JWindowManager'
import { JOSNotificationProvider, useOSNotify } from './JOSNotification'
import type { ReactNode } from 'react'

function W({ children, theme = 'windows11' as const }: { children: ReactNode; theme?: 'windows11' | 'macos' }) {
  return (
    <JOSThemeProvider theme={theme}>
      <JWindowManager>
        <JOSNotificationProvider>
          {children}
        </JOSNotificationProvider>
      </JWindowManager>
    </JOSThemeProvider>
  )
}

function NotifyButton({ title, body, icon, duration }: { title: string; body?: string; icon?: string; duration?: number }) {
  const { notify } = useOSNotify()
  return <button onClick={() => notify({ title, body, icon, duration })}>notify</button>
}

describe('JOSNotification', () => {
  it('renders notification after notify() call', () => {
    render(<W><NotifyButton title="Test Alert" body="Something happened" /></W>)
    fireEvent.click(screen.getByText('notify'))
    expect(screen.getByText('Test Alert')).toBeInTheDocument()
    expect(screen.getByText('Something happened')).toBeInTheDocument()
  })

  it('renders icon if provided', () => {
    render(<W><NotifyButton title="Alert" icon="🔔" /></W>)
    fireEvent.click(screen.getByText('notify'))
    expect(screen.getByText('🔔')).toBeInTheDocument()
  })

  it('close button dismisses notification', () => {
    render(<W><NotifyButton title="Dismiss Me" /></W>)
    fireEvent.click(screen.getByText('notify'))
    fireEvent.click(screen.getByTitle('Dismiss'))
    expect(screen.queryByText('Dismiss Me')).not.toBeInTheDocument()
  })

  it('stacks multiple notifications', () => {
    render(
      <W>
        <NotifyButton title="First"  />
        <NotifyButton title="Second" />
      </W>
    )
    const buttons = screen.getAllByText('notify')
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[1])
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('caps visible notifications at 4', () => {
    function MultiNotify() {
      const { notify } = useOSNotify()
      return (
        <button onClick={() => {
          for (let i = 0; i < 6; i++) {
            notify({ title: `Alert ${i}`, duration: 0 })
          }
        }}>multi</button>
      )
    }
    render(<W><MultiNotify /></W>)
    fireEvent.click(screen.getByText('multi'))
    // Max 4 visible; extras queued
    const notifs = document.querySelectorAll('.j-os-notif')
    expect(notifs.length).toBeLessThanOrEqual(4)
  })

  it('notification stack has correct data-testid', () => {
    render(<W><NotifyButton title="Ping" /></W>)
    fireEvent.click(screen.getByText('notify'))
    expect(document.querySelector('[data-testid="j-os-notif-stack"]')).toBeInTheDocument()
  })

  it('throws if useOSNotify used outside JOSNotificationProvider', () => {
    // Suppress console.error for this test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    function BadConsumer() {
      useOSNotify()
      return null
    }
    expect(() => render(<BadConsumer />)).toThrow()
    spy.mockRestore()
  })
})
