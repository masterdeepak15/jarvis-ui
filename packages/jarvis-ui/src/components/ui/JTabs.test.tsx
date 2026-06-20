import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JTabs } from './JTabs'
import { JTab } from './JTab'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JTabs', () => {
  it('renders tab labels in the strip', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha"><p>Alpha content</p></JTab>
          <JTab tabKey="b" label="Beta"><p>Beta content</p></JTab>
        </JTabs>
      </W>
    )
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
  })

  it('auto-selects first tab in uncontrolled mode', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha"><p>Alpha content</p></JTab>
          <JTab tabKey="b" label="Beta"><p>Beta content</p></JTab>
        </JTabs>
      </W>
    )
    expect(screen.getByText('Alpha content')).toBeInTheDocument()
    expect(screen.queryByText('Beta content')).not.toBeInTheDocument()
  })

  it('clicking a tab switches content', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha"><p>Alpha content</p></JTab>
          <JTab tabKey="b" label="Beta"><p>Beta content</p></JTab>
        </JTabs>
      </W>
    )
    fireEvent.click(screen.getByText('Beta'))
    expect(screen.getByText('Beta content')).toBeInTheDocument()
    expect(screen.queryByText('Alpha content')).not.toBeInTheDocument()
  })

  it('onTabChange fires with the clicked tab key', () => {
    const onChange = vi.fn()
    render(
      <W>
        <JTabs onTabChange={onChange}>
          <JTab tabKey="a" label="Alpha"><p>A</p></JTab>
          <JTab tabKey="b" label="Beta"><p>B</p></JTab>
        </JTabs>
      </W>
    )
    fireEvent.click(screen.getByText('Beta'))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('controlled mode: activeTab prop controls which panel shows', () => {
    render(
      <W>
        <JTabs activeTab="b">
          <JTab tabKey="a" label="Alpha"><p>Alpha content</p></JTab>
          <JTab tabKey="b" label="Beta"><p>Beta content</p></JTab>
        </JTabs>
      </W>
    )
    expect(screen.getByText('Beta content')).toBeInTheDocument()
    expect(screen.queryByText('Alpha content')).not.toBeInTheDocument()
  })

  it('icon renders on the tab button', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha" icon="⊞"><p>A</p></JTab>
        </JTabs>
      </W>
    )
    expect(screen.getByText('⊞')).toBeInTheDocument()
  })

  it('badge renders on the tab button', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha" badge="12"><p>A</p></JTab>
        </JTabs>
      </W>
    )
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('disabled tab cannot be clicked', () => {
    const onChange = vi.fn()
    render(
      <W>
        <JTabs onTabChange={onChange}>
          <JTab tabKey="a" label="Alpha"><p>A</p></JTab>
          <JTab tabKey="b" label="Beta" disabled><p>B</p></JTab>
        </JTabs>
      </W>
    )
    const betaBtn = screen.getByText('Beta').closest('button') as HTMLElement
    expect(betaBtn).toBeDisabled()
    fireEvent.click(betaBtn)
    expect(onChange).not.toHaveBeenCalledWith('b')
  })

  it('tab strip has role=tablist', () => {
    const { container } = render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="A"><p>A</p></JTab>
        </JTabs>
      </W>
    )
    expect(container.querySelector('[role="tablist"]')).toBeInTheDocument()
  })

  it('active tab button has aria-selected=true', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha"><p>A</p></JTab>
          <JTab tabKey="b" label="Beta"><p>B</p></JTab>
        </JTabs>
      </W>
    )
    expect(screen.getByText('Alpha').closest('button')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Beta').closest('button')).toHaveAttribute('aria-selected', 'false')
  })

  it('active panel has role=tabpanel', () => {
    const { container } = render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="A"><p>A content</p></JTab>
        </JTabs>
      </W>
    )
    expect(container.querySelector('[role="tabpanel"]')).toBeInTheDocument()
  })

  it('panel id matches aria-controls on its tab button', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="alpha" label="Alpha"><p>A content</p></JTab>
        </JTabs>
      </W>
    )
    const btn = screen.getByText('Alpha').closest('button') as HTMLElement
    const controls = btn.getAttribute('aria-controls')!
    expect(document.getElementById(controls)).toBeInTheDocument()
  })

  it('ArrowRight key moves to next tab', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha"><p>Alpha content</p></JTab>
          <JTab tabKey="b" label="Beta"><p>Beta content</p></JTab>
        </JTabs>
      </W>
    )
    const alphaBtn = screen.getByText('Alpha').closest('button') as HTMLElement
    fireEvent.keyDown(alphaBtn, { key: 'ArrowRight' })
    expect(screen.getByText('Beta content')).toBeInTheDocument()
  })

  it('ArrowLeft key wraps from first to last tab', () => {
    render(
      <W>
        <JTabs>
          <JTab tabKey="a" label="Alpha"><p>Alpha content</p></JTab>
          <JTab tabKey="b" label="Beta"><p>Beta content</p></JTab>
        </JTabs>
      </W>
    )
    const alphaBtn = screen.getByText('Alpha').closest('button') as HTMLElement
    fireEvent.keyDown(alphaBtn, { key: 'ArrowLeft' })
    expect(screen.getByText('Beta content')).toBeInTheDocument()
  })
})
