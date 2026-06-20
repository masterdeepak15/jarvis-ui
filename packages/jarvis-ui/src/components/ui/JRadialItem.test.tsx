import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JRadialMenu } from './JRadialMenu'
import { JRadialItem } from './JRadialItem'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JRadialItem', () => {
  it('registers with data-item-key derived from label and angle', () => {
    const { container } = render(
      <W>
        <JRadialMenu>
          <JRadialItem icon="⊞" label="Test" angle={0} />
        </JRadialMenu>
      </W>
    )
    expect(container.querySelector('[data-item-key="Test-0"]')).toBeInTheDocument()
  })

  it('registers at custom angle', () => {
    const { container } = render(
      <W>
        <JRadialMenu>
          <JRadialItem icon="⚡" label="Power" angle={180} />
        </JRadialMenu>
      </W>
    )
    expect(container.querySelector('[data-item-key="Power-180"]')).toBeInTheDocument()
  })

  it('default angle is 0', () => {
    const { container } = render(
      <W>
        <JRadialMenu>
          <JRadialItem label="Default" />
        </JRadialMenu>
      </W>
    )
    expect(container.querySelector('[data-item-key="Default-0"]')).toBeInTheDocument()
  })

  it('default label is empty string', () => {
    const { container } = render(
      <W>
        <JRadialMenu>
          <JRadialItem icon="X" angle={45} />
        </JRadialMenu>
      </W>
    )
    expect(container.querySelector('[data-item-key="-45"]')).toBeInTheDocument()
  })

  it('shows icon inside the registered item circle', () => {
    const { getByText } = render(
      <W>
        <JRadialMenu>
          <JRadialItem icon="★" label="Star" angle={90} />
        </JRadialMenu>
      </W>
    )
    expect(getByText('★')).toBeInTheDocument()
  })
})
