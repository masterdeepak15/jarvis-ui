import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JNodeGraph } from './JNodeGraph'
import type { NodeDef, EdgeDef } from './JNodeGraph'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

const chipNode: NodeDef = { id: 'n1', label: 'NODE-1', x: 40, y: 40 }
const hubNode:  NodeDef = { id: 'h1', label: 'HUB',    x: 200, y: 200, type: 'hub' }
const diamNode: NodeDef = { id: 'd1', label: 'ROUTER', x: 100, y: 100, type: 'diamond' }
const hexNode:  NodeDef = { id: 'x1', label: 'SERVER', x: 300, y: 100, type: 'hex' }

const edge12: EdgeDef = { from: 'n1', to: 'h1' }
const edgeLabelled: EdgeDef = { from: 'n1', to: 'h1', label: 'LINK' }

describe('JNodeGraph', () => {
  it('renders container with data-node-graph', () => {
    const { container } = render(<W><JNodeGraph nodes={[]} edges={[]} /></W>)
    expect(container.querySelector('[data-node-graph]')).toBeInTheDocument()
  })

  it('renders chip node with data-node-id and data-node-type="chip"', () => {
    const { container } = render(<W><JNodeGraph nodes={[chipNode]} edges={[]} /></W>)
    const el = container.querySelector('[data-node-id="n1"]')
    expect(el).toBeInTheDocument()
    expect(el).toHaveAttribute('data-node-type', 'chip')
  })

  it('renders hub node with data-node-type="hub"', () => {
    const { container } = render(<W><JNodeGraph nodes={[hubNode]} edges={[]} /></W>)
    expect(container.querySelector('[data-node-type="hub"]')).toBeInTheDocument()
  })

  it('renders diamond node with data-node-type="diamond"', () => {
    const { container } = render(<W><JNodeGraph nodes={[diamNode]} edges={[]} /></W>)
    expect(container.querySelector('[data-node-type="diamond"]')).toBeInTheDocument()
  })

  it('renders hex node with data-node-type="hex"', () => {
    const { container } = render(<W><JNodeGraph nodes={[hexNode]} edges={[]} /></W>)
    expect(container.querySelector('[data-node-type="hex"]')).toBeInTheDocument()
  })

  it('renders all 4 nodes', () => {
    const { container } = render(
      <W><JNodeGraph nodes={[chipNode, hubNode, diamNode, hexNode]} edges={[]} /></W>
    )
    expect(container.querySelectorAll('[data-node-id]').length).toBe(4)
  })

  it('renders SVG edge with data-edge attribute', () => {
    const { container } = render(
      <W><JNodeGraph nodes={[chipNode, hubNode]} edges={[edge12]} /></W>
    )
    expect(container.querySelector('[data-edge="n1-h1"]')).toBeInTheDocument()
  })

  it('renders correct number of edges', () => {
    const e2: EdgeDef = { from: 'h1', to: 'd1' }
    const { container } = render(
      <W><JNodeGraph nodes={[chipNode, hubNode, diamNode]} edges={[edge12, e2]} /></W>
    )
    expect(container.querySelectorAll('[data-edge]').length).toBe(2)
  })

  it('renders title with data-graph-title', () => {
    const { container } = render(
      <W><JNodeGraph nodes={[]} edges={[]} title="MY GRAPH" /></W>
    )
    expect(container.querySelector('[data-graph-title]')).toBeInTheDocument()
    expect(container.querySelector('[data-graph-title]')!.textContent).toContain('MY GRAPH')
  })

  it('does not render title when not provided', () => {
    const { container } = render(<W><JNodeGraph nodes={[]} edges={[]} /></W>)
    expect(container.querySelector('[data-graph-title]')).not.toBeInTheDocument()
  })

  it('renders legend when showLegend=true', () => {
    const { container } = render(
      <W><JNodeGraph nodes={[]} edges={[]} showLegend={true} /></W>
    )
    expect(container.querySelector('[data-legend]')).toBeInTheDocument()
  })

  it('hides legend when showLegend=false', () => {
    const { container } = render(
      <W><JNodeGraph nodes={[]} edges={[]} showLegend={false} /></W>
    )
    expect(container.querySelector('[data-legend]')).not.toBeInTheDocument()
  })

  it('shows node label text', () => {
    const { getByText } = render(<W><JNodeGraph nodes={[chipNode]} edges={[]} /></W>)
    expect(getByText('NODE-1')).toBeInTheDocument()
  })

  it('shows node sub text', () => {
    const n: NodeDef = { id: 's1', label: 'NODE', x: 0, y: 0, sub: 'subtitle' }
    const { getByText } = render(<W><JNodeGraph nodes={[n]} edges={[]} /></W>)
    expect(getByText('subtitle')).toBeInTheDocument()
  })

  it('shows node value on chip', () => {
    const n: NodeDef = { id: 'v1', label: 'NODE', x: 0, y: 0, value: '42 MB' }
    const { getByText } = render(<W><JNodeGraph nodes={[n]} edges={[]} /></W>)
    expect(getByText('42 MB')).toBeInTheDocument()
  })

  it('drag: mouseDown + mouseMove updates node position', () => {
    const { container } = render(
      <W><JNodeGraph nodes={[{ id: 'drag', label: 'DRAG', x: 100, y: 100 }]} edges={[]} /></W>
    )
    const node  = container.querySelector('[data-node-id="drag"]') as HTMLElement
    const graph = container.querySelector('[data-node-graph]') as HTMLElement

    // mouseDown at (120,120) → offX=20, offY=20
    fireEvent.mouseDown(node, { clientX: 120, clientY: 120 })
    // mouseMove to (200,200) → newX=180, newY=180
    fireEvent.mouseMove(graph, { clientX: 200, clientY: 200 })

    expect(node.style.left).toBe('180px')
    expect(node.style.top).toBe('180px')
  })

  it('mouseLeave stops drag — subsequent move does not change position', () => {
    const { container } = render(
      <W><JNodeGraph nodes={[{ id: 'nd', label: 'X', x: 50, y: 50 }]} edges={[]} /></W>
    )
    const node  = container.querySelector('[data-node-id="nd"]') as HTMLElement
    const graph = container.querySelector('[data-node-graph]') as HTMLElement

    fireEvent.mouseDown(node, { clientX: 60, clientY: 60 })
    fireEvent.mouseLeave(graph)
    fireEvent.mouseMove(graph, { clientX: 300, clientY: 300 })

    // Position should still be original (50, 50)
    expect(node.style.left).toBe('50px')
    expect(node.style.top).toBe('50px')
  })

  it('mouseUp stops drag', () => {
    const { container } = render(
      <W><JNodeGraph nodes={[{ id: 'nu', label: 'X', x: 60, y: 60 }]} edges={[]} /></W>
    )
    const node  = container.querySelector('[data-node-id="nu"]') as HTMLElement
    const graph = container.querySelector('[data-node-graph]') as HTMLElement

    fireEvent.mouseDown(node, { clientX: 70, clientY: 70 })
    fireEvent.mouseUp(graph)
    fireEvent.mouseMove(graph, { clientX: 300, clientY: 300 })

    expect(node.style.left).toBe('60px')
    expect(node.style.top).toBe('60px')
  })

  it('edge label renders as SVG text', () => {
    const { container } = render(
      <W><JNodeGraph nodes={[chipNode, hubNode]} edges={[edgeLabelled]} /></W>
    )
    const texts = container.querySelectorAll('text')
    const found = Array.from(texts).some(t => t.textContent === 'LINK')
    expect(found).toBe(true)
  })

  it('applies custom width and height', () => {
    const { container } = render(
      <W><JNodeGraph nodes={[]} edges={[]} width="800px" height="600px" /></W>
    )
    const el = container.querySelector('[data-node-graph]') as HTMLElement
    expect(el.style.width).toBe('800px')
    expect(el.style.height).toBe('600px')
  })

  it('default showLegend is true', () => {
    const { container } = render(<W><JNodeGraph nodes={[]} edges={[]} /></W>)
    expect(container.querySelector('[data-legend]')).toBeInTheDocument()
  })
})
