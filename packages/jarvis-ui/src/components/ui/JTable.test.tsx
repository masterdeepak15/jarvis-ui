import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JTable } from './JTable'
import type { JTableColumn, JTableRow } from './JTable'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

const COLS: JTableColumn[] = [
  { label: 'Name',   key: 'name' },
  { label: 'Status', key: 'status' },
  { label: 'Score',  key: 'score', align: 'right' },
]

const ROWS: JTableRow[] = [
  { name: 'Alpha', status: 'active',  score: 99 },
  { name: 'Beta',  status: 'warning', score: 70 },
  { name: 'Gamma', status: 'error',   score: 10 },
  { name: 'Delta', status: 'success', score: 95 },
  { name: 'Omega', status: 'idle',    score: 0  },
]

describe('JTable', () => {
  it('renders table element', () => {
    const { container } = render(<W><JTable columns={COLS} rows={ROWS} /></W>)
    expect(container.querySelector('table')).toBeInTheDocument()
  })

  it('renders th count = columns.length', () => {
    const { container } = render(<W><JTable columns={COLS} rows={ROWS} /></W>)
    expect(container.querySelectorAll('th').length).toBe(COLS.length)
  })

  it('renders N tbody rows = rows.length', () => {
    const { container } = render(<W><JTable columns={COLS} rows={ROWS} /></W>)
    expect(container.querySelectorAll('tbody tr').length).toBe(ROWS.length)
  })

  it('empty rows renders NO DATA text', () => {
    const { getByText } = render(<W><JTable columns={COLS} rows={[]} /></W>)
    expect(getByText('NO DATA')).toBeInTheDocument()
  })

  it('undefined rows renders NO DATA text', () => {
    const { getByText } = render(<W><JTable columns={COLS} /></W>)
    expect(getByText('NO DATA')).toBeInTheDocument()
  })

  it('stateColumn=status warning row gets data-state="warning"', () => {
    const { container } = render(<W><JTable columns={COLS} rows={ROWS} stateColumn="status" /></W>)
    expect(container.querySelector('[data-state="warning"]')).toBeInTheDocument()
  })

  it('stateColumn=status error row gets data-state="error"', () => {
    const { container } = render(<W><JTable columns={COLS} rows={ROWS} stateColumn="status" /></W>)
    expect(container.querySelector('[data-state="error"]')).toBeInTheDocument()
  })

  it('stateColumn=status success row gets data-state="success"', () => {
    const { container } = render(<W><JTable columns={COLS} rows={ROWS} stateColumn="status" /></W>)
    expect(container.querySelector('[data-state="success"]')).toBeInTheDocument()
  })

  it('stateColumn=status idle row gets data-state="idle"', () => {
    const { container } = render(<W><JTable columns={COLS} rows={ROWS} stateColumn="status" /></W>)
    expect(container.querySelector('[data-state="idle"]')).toBeInTheDocument()
  })

  it('showFooter=true (default) renders RECORDS text', () => {
    const { getByText } = render(<W><JTable columns={COLS} rows={ROWS} /></W>)
    expect(getByText(`${ROWS.length} RECORDS`)).toBeInTheDocument()
  })

  it('showFooter=false hides footer', () => {
    const { queryByText } = render(<W><JTable columns={COLS} rows={ROWS} showFooter={false} /></W>)
    expect(queryByText(/RECORDS/i)).not.toBeInTheDocument()
  })

  it('footerLabel renders its text', () => {
    const { getByText } = render(
      <W><JTable columns={COLS} rows={ROWS} footerLabel="PAGE 1 OF 3" /></W>
    )
    expect(getByText('PAGE 1 OF 3')).toBeInTheDocument()
  })

  it('isBadge column renders a span element inside cell', () => {
    const badgeCols: JTableColumn[] = [
      { label: 'Name',  key: 'name' },
      { label: 'Label', key: 'label', isBadge: true },
    ]
    const badgeRows: JTableRow[] = [{ name: 'X', label: 'VIP' }]
    const { container } = render(
      <W><JTable columns={badgeCols} rows={badgeRows} /></W>
    )
    const tds = container.querySelectorAll('tbody td')
    expect(tds[1].querySelector('span')).toBeInTheDocument()
  })

  it('stateColumn cell renders j-status-dot inside cell', () => {
    const { container } = render(
      <W><JTable columns={COLS} rows={ROWS} stateColumn="status" /></W>
    )
    expect(container.querySelector('.j-status-dot')).toBeInTheDocument()
  })

  it('mouseenter and mouseleave on row do not crash', () => {
    const { container } = render(<W><JTable columns={COLS} rows={ROWS} /></W>)
    const firstRow = container.querySelector('tbody tr')!
    expect(() => fireEvent.mouseEnter(firstRow)).not.toThrow()
    expect(() => fireEvent.mouseLeave(firstRow)).not.toThrow()
  })

  it('warn alias maps to warning state', () => {
    const { container } = render(
      <W><JTable columns={COLS} rows={[{ name: 'A', status: 'warn', score: 0 }]} stateColumn="status" /></W>
    )
    expect(container.querySelector('[data-state="warning"]')).toBeInTheDocument()
  })

  it('danger alias maps to error state', () => {
    const { container } = render(
      <W><JTable columns={COLS} rows={[{ name: 'A', status: 'danger', score: 0 }]} stateColumn="status" /></W>
    )
    expect(container.querySelector('[data-state="error"]')).toBeInTheDocument()
  })
})
