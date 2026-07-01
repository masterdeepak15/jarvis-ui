import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JFileExplorer } from './JFileExplorer'
import type { JFileNode } from './JFileExplorer'

const tree: JFileNode[] = [
  {
    id: 'root', name: 'Root', type: 'folder',
    children: [
      {
        id: 'docs', name: 'Documents', type: 'folder',
        children: [
          { id: 'report', name: 'report.pdf', type: 'file', meta: { size: '4 KB' } },
        ],
      },
      { id: 'img', name: 'image.png', type: 'file' },
    ],
  },
]

describe('JFileExplorer', () => {
  it('renders top-level folder in tree', () => {
    render(<JFileExplorer tree={tree} />)
    expect(screen.getByText('Root')).toBeInTheDocument()
  })

  it('clicking folder expands its children in tree', () => {
    render(<JFileExplorer tree={tree} />)
    fireEvent.click(screen.getByText('Root'))
    expect(screen.getByText('Documents')).toBeInTheDocument()
  })

  it('clicking folder again collapses it', () => {
    render(<JFileExplorer tree={tree} />)
    fireEvent.click(screen.getByText('Root'))
    expect(screen.getByText('Documents')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Root'))
    expect(screen.queryByText('Documents')).not.toBeInTheDocument()
  })

  it('selecting a folder shows its children in right pane', () => {
    render(<JFileExplorer tree={tree} />)
    fireEvent.click(screen.getByText('Root'))
    fireEvent.click(screen.getByText('Documents'))
    expect(screen.getByText('report.pdf')).toBeInTheDocument()
  })

  it('onSelect is called when clicking a pane item', () => {
    const onSelect = vi.fn()
    render(<JFileExplorer tree={tree} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Root'))
    fireEvent.click(screen.getByText('Documents'))
    fireEvent.click(screen.getByText('report.pdf'))
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'report' }))
  })

  it('onOpen is called on double-click of a pane item', () => {
    const onOpen = vi.fn()
    render(<JFileExplorer tree={tree} onOpen={onOpen} />)
    fireEvent.click(screen.getByText('Root'))
    fireEvent.dblClick(screen.getByText('image.png'))
    expect(onOpen).toHaveBeenCalledWith(expect.objectContaining({ id: 'img' }))
  })

  it('shows breadcrumb path for selected folder', () => {
    render(<JFileExplorer tree={tree} />)
    fireEvent.click(screen.getByText('Root'))
    fireEvent.click(screen.getByText('Documents'))
    expect(screen.getByText('Documents')).toBeInTheDocument()
  })

  it('renders folder icon for folders and file icon for files', () => {
    render(<JFileExplorer tree={tree} />)
    fireEvent.click(screen.getByText('Root'))
    fireEvent.click(screen.getByText('Documents'))
    // default icons are emoji — folder=📁, file=📄
    expect(document.querySelector('.j-os-pane-item__icon')).toBeInTheDocument()
  })
})
