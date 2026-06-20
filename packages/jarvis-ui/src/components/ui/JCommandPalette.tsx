import { useState, useEffect, useRef, useMemo } from 'react'
import type { CSSProperties } from 'react'
import type { JState } from '../../theme/JarvisTokens'

export interface JCommand {
  label:        string
  key:          string
  icon?:        string
  group?:       string
  state?:       JState
  description?: string
}

export interface JCommandPaletteProps {
  visible:      boolean
  onClose:      () => void
  commands:     JCommand[]
  onExecute:    (cmd: JCommand) => void
  placeholder?: string
  isListening?: boolean
}

function rowAccent(state: JState = 'active'): string {
  if (state === 'warning') return 'var(--j-warn)'
  if (state === 'error')   return 'var(--j-err)'
  if (state === 'success') return 'var(--j-ok)'
  return 'var(--j-accent-mid)'
}

export function JCommandPalette({
  visible,
  onClose,
  commands,
  onExecute,
  placeholder  = 'Type a command...',
  isListening  = false,
}: JCommandPaletteProps) {
  const [query,       setQuery]       = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (visible) {
      setQuery('')
      setSelectedIdx(0)
      inputRef.current?.focus()
    }
  }, [visible])

  const filtered = useMemo(() => {
    if (!query.trim()) return commands
    const q = query.toLowerCase()
    return commands.filter(c =>
      c.label.toLowerCase().includes(q) ||
      c.key.toLowerCase().includes(q) ||
      (c.description?.toLowerCase().includes(q) ?? false)
    )
  }, [commands, query])

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    setSelectedIdx(0)
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      if (filtered[selectedIdx]) execute(filtered[selectedIdx])
    } else if (e.key === 'Escape') {
      close()
    }
  }

  function execute(cmd: JCommand) {
    onExecute(cmd)
    close()
  }

  function close() {
    setQuery('')
    setSelectedIdx(0)
    onClose()
  }

  function clearQuery() {
    setQuery('')
    setSelectedIdx(0)
    inputRef.current?.focus()
  }

  if (!visible) return null

  // Pre-process items with group header flags
  const items: Array<{ cmd: JCommand; idx: number; showGroup: boolean }> = []
  let lastGroup: string | undefined
  filtered.forEach((cmd, i) => {
    const showGroup = cmd.group !== lastGroup
    lastGroup = cmd.group
    items.push({ cmd, idx: i, showGroup })
  })

  const cornerTL: CSSProperties = {
    position:    'absolute',
    top:         0,
    left:        0,
    width:       14,
    height:      14,
    borderColor: 'var(--j-accent)',
    borderStyle: 'solid',
    borderWidth: '2px 0 0 2px',
    filter:      'drop-shadow(0 0 4px var(--j-accent))',
    animation:   'j-corner-blink var(--j-dur-corner, 2s) ease-in-out infinite',
    pointerEvents: 'none',
  }

  const cornerTR: CSSProperties = {
    ...cornerTL,
    left:        'auto',
    right:       0,
    borderWidth: '2px 2px 0 0',
  }

  return (
    <>
      {/* Backdrop */}
      <div
        data-backdrop=""
        onClick={close}
        style={{
          position:       'fixed',
          inset:          0,
          zIndex:         3000,
          background:     'var(--j-bg-overlay)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Panel */}
      <div style={{
        position:   'fixed',
        zIndex:     3001,
        top:        '20%',
        left:       '50%',
        transform:  'translateX(-50%)',
        width:      560,
        maxWidth:   'calc(100vw - 32px)',
        background: 'var(--j-bg-card)',
        overflow:   'hidden',
        clipPath:   'polygon(18px 0%,100% 0%,100% calc(100% - 18px),calc(100% - 18px) 100%,0% 100%,0% 18px)',
        border:     '1px solid var(--j-accent-25)',
        boxShadow:  '0 0 40px var(--j-accent-12),0 0 80px var(--j-accent-05)',
        fontFamily: "'Courier New', monospace",
      }}>
        {/* Corner brackets */}
        <div style={cornerTL} />
        <div style={cornerTR} />

        {/* Vertical scan line */}
        <div
          className="j-scan-v"
          style={{
            position:   'absolute',
            left:       0,
            right:      0,
            height:     1,
            top:        -1,
            background: 'linear-gradient(90deg,transparent,var(--j-accent),transparent)',
            boxShadow:  '0 0 12px var(--j-accent)',
            pointerEvents: 'none',
          }}
        />

        {/* Search row */}
        <div style={{ position: 'relative', padding: '12px 16px', borderBottom: '1px solid var(--j-accent-12)' }}>
          <div
            data-search-icon=""
            style={{
              position:   'absolute',
              left:       28,
              top:        '50%',
              transform:  'translateY(-50%)',
              fontSize:   16,
              color:      'var(--j-accent-mid)',
              filter:     'drop-shadow(0 0 4px var(--j-accent))',
              animation:  'j-pulse 2s ease-in-out infinite',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {isListening ? '🎙' : '⌕'}
          </div>
          <input
            ref={inputRef}
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleKey}
            placeholder={placeholder}
            style={{
              width:         '100%',
              padding:       '10px 40px 10px 40px',
              background:    'transparent',
              border:        'none',
              outline:       'none',
              color:         'var(--j-text-primary)',
              fontSize:      14,
              fontFamily:    "'Courier New', monospace",
              letterSpacing: '0.06em',
              boxSizing:     'border-box',
            } as CSSProperties}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              data-clear=""
              onClick={clearQuery}
              style={{
                position:   'absolute',
                right:      28,
                top:        '50%',
                transform:  'translateY(-50%)',
                background: 'transparent',
                border:     'none',
                cursor:     'pointer',
                color:      'var(--j-text-muted)',
                fontSize:   14,
                fontFamily: 'inherit',
                padding:    '2px 6px',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Results */}
        <div style={{ maxHeight: 360, overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{
              padding:       24,
              textAlign:     'center',
              fontSize:      11,
              color:         'var(--j-text-dim)',
              letterSpacing: '0.10em',
            }}>
              NO COMMANDS FOUND
            </div>
          ) : (
            items.map(({ cmd, idx, showGroup }) => {
              const selected = idx === selectedIdx
              const accent   = rowAccent(cmd.state ?? 'active')
              return (
                <div key={cmd.key}>
                  {showGroup && cmd.group && (
                    <div data-group-header="" style={{
                      padding:       '6px 16px 2px',
                      fontSize:      8,
                      color:         'var(--j-text-dim)',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      userSelect:    'none',
                    }}>
                      {cmd.group}
                    </div>
                  )}
                  <div
                    data-cmd={cmd.key}
                    data-selected={selected ? 'true' : 'false'}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    style={{
                      display:    'flex',
                      alignItems: 'center',
                      gap:        10,
                      padding:    '10px 16px',
                      cursor:     'pointer',
                      background: selected ? 'var(--j-accent-08)' : 'transparent',
                      borderLeft: `2px solid ${selected ? accent : 'transparent'}`,
                      transition: 'background 0.1s',
                    }}
                  >
                    {cmd.icon && (
                      <span style={{ fontSize: 14, color: accent, filter: `drop-shadow(0 0 4px ${accent})`, flexShrink: 0 }}>
                        {cmd.icon}
                      </span>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: selected ? 'var(--j-text-primary)' : 'var(--j-text-secondary)', letterSpacing: '0.06em' }}>
                        {cmd.label}
                      </div>
                      {cmd.description && (
                        <div style={{ fontSize: 9, color: 'var(--j-text-muted)', letterSpacing: '0.08em', marginTop: 1 }}>
                          {cmd.description}
                        </div>
                      )}
                    </div>
                    {selected && (
                      <span style={{ fontSize: 9, color: 'var(--j-accent-mid)', letterSpacing: '0.10em', opacity: 0.7, flexShrink: 0 }}>
                        ENTER
                      </span>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer hints */}
        <div style={{
          padding:       '6px 16px',
          borderTop:     '1px solid var(--j-accent-08)',
          display:       'flex',
          gap:           16,
          fontSize:      8,
          color:         'var(--j-text-dim)',
          letterSpacing: '0.10em',
          userSelect:    'none',
        }}>
          <span>↑↓ NAVIGATE</span>
          <span>↵ EXECUTE</span>
          <span>ESC CLOSE</span>
        </div>
      </div>
    </>
  )
}
