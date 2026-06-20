import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JRadialMenu } from './JRadialMenu'
import { JRadialItem } from './JRadialItem'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JRadialMenu', () => {
  it('renders center trigger button', () => {
    const { container } = render(<W><JRadialMenu /></W>)
    expect(container.querySelector('[data-trigger]')).toBeInTheDocument()
  })

  it('shows default triggerLabel MENU', () => {
    const { getByText } = render(<W><JRadialMenu /></W>)
    expect(getByText('MENU')).toBeInTheDocument()
  })

  it('shows custom triggerLabel', () => {
    const { getByText } = render(<W><JRadialMenu triggerLabel="NAV" /></W>)
    expect(getByText('NAV')).toBeInTheDocument()
  })

  it('initially closed — data-open="false"', () => {
    const { container } = render(<W><JRadialMenu /></W>)
    expect(container.querySelector('[data-open="false"]')).toBeInTheDocument()
  })

  it('clicking center opens menu — data-open="true"', () => {
    const { container } = render(<W><JRadialMenu /></W>)
    fireEvent.click(container.querySelector('[data-trigger]')!)
    expect(container.querySelector('[data-open="true"]')).toBeInTheDocument()
  })

  it('shows CLOSE text when open', () => {
    const { container, getByText } = render(<W><JRadialMenu /></W>)
    fireEvent.click(container.querySelector('[data-trigger]')!)
    expect(getByText('CLOSE')).toBeInTheDocument()
  })

  it('clicking center again closes menu', () => {
    const { container } = render(<W><JRadialMenu /></W>)
    const trigger = container.querySelector('[data-trigger]')!
    fireEvent.click(trigger)
    fireEvent.click(trigger)
    expect(container.querySelector('[data-open="false"]')).toBeInTheDocument()
  })

  it('3 JRadialItem children register 3 item elements', () => {
    const { container } = render(
      <W>
        <JRadialMenu>
          <JRadialItem icon="A" label="Alpha" angle={0}   />
          <JRadialItem icon="B" label="Beta"  angle={120} />
          <JRadialItem icon="C" label="Gamma" angle={240} />
        </JRadialMenu>
      </W>
    )
    expect(container.querySelectorAll('[data-item-key]').length).toBe(3)
  })

  it('items have opacity 0 when closed', () => {
    const { container } = render(
      <W>
        <JRadialMenu>
          <JRadialItem icon="A" label="Alpha" angle={0} />
        </JRadialMenu>
      </W>
    )
    const item = container.querySelector('[data-item-key]') as HTMLElement
    expect(item.style.opacity).toBe('0')
  })

  it('items have opacity 1 when open', () => {
    const { container } = render(
      <W>
        <JRadialMenu>
          <JRadialItem icon="A" label="Alpha" angle={0} />
        </JRadialMenu>
      </W>
    )
    fireEvent.click(container.querySelector('[data-trigger]')!)
    const item = container.querySelector('[data-item-key]') as HTMLElement
    expect(item.style.opacity).toBe('1')
  })

  it('mouseenter on item shows hover label', () => {
    const { container } = render(
      <W>
        <JRadialMenu>
          <JRadialItem icon="A" label="Alpha" angle={0} />
        </JRadialMenu>
      </W>
    )
    fireEvent.click(container.querySelector('[data-trigger]')!)
    fireEvent.mouseEnter(container.querySelector('[data-item-key="Alpha-0"]')!)
    expect(container.querySelector('[data-hover-label]')).toBeInTheDocument()
    expect(container.querySelector('[data-hover-label]')!.textContent).toBe('Alpha')
  })

  it('mouseleave hides hover label', () => {
    const { container } = render(
      <W>
        <JRadialMenu>
          <JRadialItem icon="A" label="Alpha" angle={0} />
        </JRadialMenu>
      </W>
    )
    fireEvent.click(container.querySelector('[data-trigger]')!)
    const item = container.querySelector('[data-item-key="Alpha-0"]')!
    fireEvent.mouseEnter(item)
    fireEvent.mouseLeave(item)
    expect(container.querySelector('[data-hover-label]')).not.toBeInTheDocument()
  })

  it('clicking item calls its onClick', () => {
    const onClick = vi.fn()
    const { container } = render(
      <W>
        <JRadialMenu>
          <JRadialItem icon="A" label="Go" angle={0} onClick={onClick} />
        </JRadialMenu>
      </W>
    )
    fireEvent.click(container.querySelector('[data-trigger]')!)
    fireEvent.click(container.querySelector('[data-item-key="Go-0"]')!)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('clicking item closes the menu', () => {
    const { container } = render(
      <W>
        <JRadialMenu>
          <JRadialItem icon="A" label="Go" angle={0} />
        </JRadialMenu>
      </W>
    )
    fireEvent.click(container.querySelector('[data-trigger]')!)
    fireEvent.click(container.querySelector('[data-item-key="Go-0"]')!)
    expect(container.querySelector('[data-open="false"]')).toBeInTheDocument()
  })

  it('calls onOpenChange(true) when opened', () => {
    const onOpenChange = vi.fn()
    const { container } = render(<W><JRadialMenu onOpenChange={onOpenChange} /></W>)
    fireEvent.click(container.querySelector('[data-trigger]')!)
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('calls onOpenChange(false) when closed', () => {
    const onOpenChange = vi.fn()
    const { container } = render(<W><JRadialMenu onOpenChange={onOpenChange} /></W>)
    const trigger = container.querySelector('[data-trigger]')!
    fireEvent.click(trigger)
    fireEvent.click(trigger)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('connector lines render only when open', () => {
    const { container } = render(
      <W>
        <JRadialMenu>
          <JRadialItem icon="A" label="Alpha" angle={0} />
        </JRadialMenu>
      </W>
    )
    expect(container.querySelector('[data-connector]')).not.toBeInTheDocument()
    fireEvent.click(container.querySelector('[data-trigger]')!)
    expect(container.querySelector('[data-connector]')).toBeInTheDocument()
  })
})
