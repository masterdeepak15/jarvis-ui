import { useState, createContext, useContext, Children, isValidElement } from 'react'
import type { ReactNode, KeyboardEvent, ReactElement } from 'react'
import type { JColor } from '../../theme/JarvisTokens'

// ── Internal context ──────────────────────────────────────────────
interface JTabsCtxValue {
  activeTab: string
  selectTab: (key: string) => void
}

const JTabsContext = createContext<JTabsCtxValue | null>(null)

export function useJTabsContext(): JTabsCtxValue | null {
  return useContext(JTabsContext)
}

// ── Public types ──────────────────────────────────────────────────
export interface JTabsProps {
  activeTab?:   string
  onTabChange?: (key: string) => void
  color?:       JColor
  children:     ReactNode
}

interface TabDef {
  key:       string
  label:     string
  icon?:     string
  badge?:    string
  disabled?: boolean
}

// ── Component ─────────────────────────────────────────────────────
export function JTabs({ activeTab: controlledTab, onTabChange, children }: JTabsProps) {
  // Scan children synchronously — no async flicker
  const tabDefs: TabDef[] = []
  Children.forEach(children, (child) => {
    if (isValidElement(child) && (child.type as any)._isJTab) {
      const p = (child as ReactElement<any>).props
      tabDefs.push({ key: p.tabKey, label: p.label, icon: p.icon, badge: p.badge, disabled: p.disabled })
    }
  })

  const [internalTab, setInternalTab] = useState<string | null>(null)

  // Controlled: use prop; Uncontrolled: use state; Fallback: first non-disabled tab
  const firstKey = tabDefs.find(t => !t.disabled)?.key ?? ''
  const active   = controlledTab ?? internalTab ?? firstKey

  function selectTab(key: string) {
    if (controlledTab === undefined) setInternalTab(key)
    onTabChange?.(key)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, currentKey: string) {
    const enabled = tabDefs.filter(t => !t.disabled)
    const idx     = enabled.findIndex(t => t.key === currentKey)
    let   nextKey: string | undefined

    if      (e.key === 'ArrowRight') nextKey = enabled[(idx + 1) % enabled.length]?.key
    else if (e.key === 'ArrowLeft')  nextKey = enabled[(idx - 1 + enabled.length) % enabled.length]?.key
    else if (e.key === 'Home')       nextKey = enabled[0]?.key
    else if (e.key === 'End')        nextKey = enabled[enabled.length - 1]?.key
    else return

    e.preventDefault()
    if (nextKey) {
      selectTab(nextKey)
      document.getElementById(`tab-${nextKey}`)?.focus()
    }
  }

  return (
    <JTabsContext.Provider value={{ activeTab: active, selectTab }}>
      {/* Tab strip */}
      <div
        role="tablist"
        style={{
          display:      'flex',
          borderBottom: '1px solid var(--j-accent-12)',
          overflowX:    'auto',
          gap:          0,
        }}
      >
        {tabDefs.map((def) => {
          const isActive = def.key === active
          return (
            <button
              key={def.key}
              id={`tab-${def.key}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`panel-${def.key}`}
              disabled={def.disabled}
              onClick={() => selectTab(def.key)}
              onKeyDown={(e) => handleKeyDown(e, def.key)}
              style={{
                position:      'relative',
                display:       'flex',
                alignItems:    'center',
                gap:           6,
                padding:       '10px 18px',
                background:    'transparent',
                border:        'none',
                cursor:        def.disabled ? 'not-allowed' : 'pointer',
                fontFamily:    "'Courier New', monospace",
                fontSize:      10,
                fontWeight:    600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                whiteSpace:    'nowrap',
                color:         def.disabled
                               ? 'var(--j-text-dim)'
                               : isActive
                               ? 'var(--j-accent)'
                               : 'var(--j-text-muted)',
                textShadow:    isActive ? '0 0 8px var(--j-accent-50)' : 'none',
                opacity:       def.disabled ? 0.4 : 1,
                transition:    'color 0.15s',
              }}
            >
              {def.icon && (
                <span style={{
                  fontStyle: 'normal',
                  fontSize:  13,
                  ...(isActive ? { filter: 'drop-shadow(0 0 4px var(--j-accent))' } : {}),
                }}>
                  {def.icon}
                </span>
              )}
              <span>{def.label}</span>
              {def.badge && (
                <span style={{
                  fontSize:   8,
                  padding:    '1px 5px',
                  background: 'var(--j-accent-12)',
                  color:      'var(--j-accent-mid)',
                  clipPath:   'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
                }}>
                  {def.badge}
                </span>
              )}
              {isActive && (
                <div style={{
                  position:   'absolute',
                  bottom:     -1,
                  left:       0,
                  right:      0,
                  height:     2,
                  background: 'var(--j-accent)',
                  boxShadow:  '0 0 8px var(--j-accent)',
                  overflow:   'hidden',
                }}>
                  <div style={{
                    position:   'absolute',
                    inset:      0,
                    width:      30,
                    background: 'linear-gradient(90deg, transparent, var(--j-text-primary), transparent)',
                    animation:  'j-scan-h 2s ease-in-out infinite',
                  }} />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Content area */}
      <div style={{ paddingTop: 4 }}>
        {children}
      </div>
    </JTabsContext.Provider>
  )
}
