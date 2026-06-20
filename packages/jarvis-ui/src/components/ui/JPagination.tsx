import type { CSSProperties } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

export interface JPaginationProps {
  page:           number
  onPageChange:   (page: number) => void
  totalPages:     number
  showFirstLast?: boolean
  showInfo?:      boolean
  pageSize?:      number
  color?:         JColor
}

// Build visible page list for ellipsis mode.
// Returns page numbers; -1 is the sentinel for "···"
function getVisiblePages(page: number, totalPages: number, pageSize: number): number[] {
  const half  = Math.floor(pageSize / 2)
  let   start = Math.max(1, page - half)
  let   end   = Math.min(totalPages, start + pageSize - 1)
  start = Math.max(1, end - pageSize + 1)

  const pages: number[] = []
  if (start > 1) {
    pages.push(1)
    if (start > 2) pages.push(-1)
  }
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push(-1)
    pages.push(totalPages)
  }
  return pages
}

const BASE_BTN: CSSProperties = {
  padding:       '5px 10px',
  fontSize:      11,
  fontFamily:    "'Courier New', monospace",
  letterSpacing: '0.08em',
  clipPath:      'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
  cursor:        'pointer',
  transition:    'all 0.15s',
  border:        'none',
}

function navStyle(disabled: boolean): CSSProperties {
  return {
    ...BASE_BTN,
    background: 'transparent',
    border:     `1px solid ${disabled ? 'var(--j-accent-08)' : 'var(--j-accent-18)'}`,
    color:      disabled ? 'var(--j-accent-18)' : 'var(--j-text-muted)',
    cursor:     disabled ? 'not-allowed' : 'pointer',
  }
}

function pageStyle(isActive: boolean): CSSProperties {
  return {
    ...BASE_BTN,
    background: isActive ? 'var(--j-accent-12)' : 'transparent',
    border:     `1px solid ${isActive ? 'var(--j-accent)' : 'var(--j-accent-18)'}`,
    color:      isActive ? 'var(--j-accent)' : 'var(--j-text-muted)',
    boxShadow:  isActive ? '0 0 8px var(--j-accent-44)' : 'none',
  }
}

export function JPagination({
  page,
  onPageChange,
  totalPages,
  showFirstLast = false,
  showInfo      = true,
  pageSize      = 5,
}: JPaginationProps) {
  const atStart = page <= 1
  const atEnd   = page >= totalPages

  function goTo(p: number) {
    const clamped = Math.max(1, Math.min(totalPages, p))
    if (clamped !== page) onPageChange(clamped)
  }

  return (
    <nav
      aria-label="Pagination"
      style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Courier New', monospace" }}
    >
      {showFirstLast && (
        <button type="button" disabled={atStart} onClick={() => goTo(1)} style={navStyle(atStart)}>
          «
        </button>
      )}

      <button type="button" disabled={atStart} onClick={() => goTo(page - 1)} style={navStyle(atStart)}>
        ‹
      </button>

      {totalPages <= 10 ? (
        /* Tick bar mode */
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
          {Array.from({ length: totalPages }, (_, i) => {
            const p     = i + 1
            const isCur = p === page
            return (
              <div
                key={p}
                role="button"
                tabIndex={0}
                aria-label={`Page ${p}`}
                aria-current={isCur ? 'page' : undefined}
                onClick={() => goTo(p)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(p) } }}
                style={{
                  width:      6,
                  height:     isCur ? 18 : 10,
                  background: isCur ? 'var(--j-accent)' : 'var(--j-accent-18)',
                  clipPath:   'polygon(0 15%, 100% 0, 100% 100%, 0 85%)',
                  boxShadow:  isCur ? '0 0 8px var(--j-accent)' : 'none',
                  cursor:     'pointer',
                  transition: 'all 0.2s',
                  ...(isCur ? { animation: 'j-pulse 2s ease-in-out infinite' } : {}),
                }}
              />
            )
          })}
        </div>
      ) : (
        /* Ellipsis mode */
        <>
          {getVisiblePages(page, totalPages, pageSize).map((p, idx) =>
            p === -1 ? (
              <span
                key={`ellipsis-${idx}`}
                style={{ color: 'var(--j-text-dim)', fontSize: 10, padding: '0 4px' }}
              >
                ···
              </span>
            ) : (
              <button
                key={p}
                type="button"
                aria-current={p === page ? 'page' : undefined}
                onClick={() => goTo(p)}
                style={pageStyle(p === page)}
              >
                {p}
              </button>
            )
          )}
        </>
      )}

      <button type="button" disabled={atEnd} onClick={() => goTo(page + 1)} style={navStyle(atEnd)}>
        ›
      </button>

      {showFirstLast && (
        <button type="button" disabled={atEnd} onClick={() => goTo(totalPages)} style={navStyle(atEnd)}>
          »
        </button>
      )}

      {showInfo && (
        <span style={{
          fontSize:      9,
          color:         'var(--j-text-dim)',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          marginLeft:    8,
        }}>
          {page} / {totalPages}
        </span>
      )}
    </nav>
  )
}
