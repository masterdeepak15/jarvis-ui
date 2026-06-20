import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { JState, JColor } from '../../theme/JarvisTokens'
import { JSpinner } from '../layout/JSpinner'
import { JStatusPill } from './JStatusPill'
import { JBadge } from './JBadge'

export interface JTableColumn {
  label:    string
  key:      string
  width?:   string
  align?:   'left' | 'center' | 'right'
  isBadge?: boolean
}

export type JTableRow = Record<string, unknown>

export interface JTableProps {
  columns:      JTableColumn[]
  rows?:        JTableRow[]
  stateColumn?: string
  showFooter?:  boolean
  footerLabel?: string
}

const STATE_TD_COLOR: Record<string, string> = {
  warning:    'var(--j-warn)',
  error:      'var(--j-err)',
  success:    'var(--j-ok)',
  idle:       'var(--j-text-muted)',
  active:     'var(--j-text-secondary)',
  processing: 'var(--j-text-secondary)',
}

const STATE_BORDER_COLOR: Record<string, string> = {
  warning:    'var(--j-warn)',
  error:      'var(--j-err)',
  success:    'var(--j-ok)',
  idle:       'transparent',
  active:     'transparent',
  processing: 'transparent',
}

const STATE_BADGE_COLOR: Record<string, JColor> = {
  warning:    'amber',
  error:      'red',
  success:    'green',
  idle:       'ghost',
  active:     'cyan',
  processing: 'cyan',
}

function getRowState(row: JTableRow, stateColumn?: string): JState {
  if (!stateColumn) return 'active'
  const v = String(row[stateColumn] ?? '').toLowerCase()
  if (v === 'warning' || v === 'warn')    return 'warning'
  if (v === 'error'   || v === 'danger')  return 'error'
  if (v === 'success' || v === 'ok')      return 'success'
  if (v === 'idle'    || v === 'offline') return 'idle'
  return 'active'
}

export function JTable({
  columns,
  rows,
  stateColumn,
  showFooter = true,
  footerLabel,
}: JTableProps) {
  const [hoveredRow, setHoveredRow] = useState(-1)
  const empty = !rows || rows.length === 0

  return (
    <div style={{
      position:   'relative',
      background: 'var(--j-bg-card)',
      border:     '1px solid var(--j-accent-12)',
      overflow:   'hidden',
      fontFamily: "'Courier New', monospace",
    }}>
      {/* Top scan bar */}
      <div style={{ position: 'relative', height: 2, background: 'linear-gradient(90deg,var(--j-accent),var(--j-accent-08))', overflow: 'hidden' }}>
        <div className="j-scan-h" style={{ position: 'absolute', inset: 0, width: 60, background: 'linear-gradient(90deg,transparent,var(--j-text-primary),transparent)' }} />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, fontFamily: "'Courier New', monospace" }}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} style={{
                  padding:       '8px 14px',
                  textAlign:     col.align ?? 'left',
                  fontSize:      9,
                  fontWeight:    600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color:         'var(--j-accent-mid)',
                  background:    'var(--j-accent-05)',
                  borderBottom:  '1px solid var(--j-accent-18)',
                  whiteSpace:    'nowrap',
                  ...(col.width ? { width: col.width } : {}),
                } as CSSProperties}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {empty ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <JSpinner size="24px" showLabel={false} />
                    <span style={{ fontSize: 10, color: 'var(--j-text-dim)', letterSpacing: '0.10em' }}>NO DATA</span>
                  </div>
                </td>
              </tr>
            ) : rows!.map((row, idx) => {
              const state   = getRowState(row, stateColumn)
              const hovered = idx === hoveredRow
              const bg = hovered
                ? 'var(--j-accent-05)'
                : idx % 2 === 0 ? 'transparent' : 'var(--j-accent-05)'
              const baseBorder = STATE_BORDER_COLOR[state] ?? 'transparent'
              const borderColor = baseBorder === 'transparent' && hovered
                ? 'var(--j-accent-50)'
                : baseBorder

              return (
                <tr
                  key={idx}
                  data-state={state}
                  style={{ background: bg, transition: 'background 0.12s', borderLeft: `2px solid ${borderColor}` }}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(-1)}
                >
                  {columns.map(col => {
                    const val      = String(row[col.key] ?? '')
                    const tdColor  = STATE_TD_COLOR[state] ?? 'var(--j-text-secondary)'
                    const tdStyle: CSSProperties = {
                      padding:      '8px 14px',
                      textAlign:    col.align ?? 'left',
                      borderBottom: '1px solid var(--j-accent-05)',
                      color:        tdColor,
                    }
                    let content: React.ReactNode = val
                    if (col.key === stateColumn) {
                      content = <JStatusPill state={state}>{val}</JStatusPill>
                    } else if (col.isBadge) {
                      content = <JBadge color={STATE_BADGE_COLOR[state] ?? 'cyan'}>{val}</JBadge>
                    }
                    return <td key={col.key} style={tdStyle}>{content}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom accent line */}
      <div style={{ height: 1, background: 'linear-gradient(90deg,var(--j-accent-25),transparent)' }} />

      {showFooter && !empty && (
        <div style={{
          padding:        '6px 14px',
          fontSize:       8,
          color:          'var(--j-text-dim)',
          letterSpacing:  '0.10em',
          textTransform:  'uppercase',
          display:        'flex',
          justifyContent: 'space-between',
        }}>
          <span>{rows!.length} RECORDS</span>
          {footerLabel && <span>{footerLabel}</span>}
        </div>
      )}
    </div>
  )
}
