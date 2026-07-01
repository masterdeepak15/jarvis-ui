import { useState } from 'react'
import type { ReactNode } from 'react'

export interface JControlSection {
  id:        string
  icon:      string
  label:     string
  component: ReactNode
}

export interface JControlPanelProps {
  sections:        JControlSection[]
  defaultSection?: string
}

export function JControlPanel({ sections, defaultSection }: JControlPanelProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultSection ?? null)
  const [search,   setSearch]   = useState('')

  const filtered = sections.filter(s =>
    s.label.toLowerCase().includes(search.toLowerCase())
  )

  const active = sections.find(s => s.id === activeId)

  return (
    <div className="j-os-controlpanel">
      <div className="j-os-controlpanel__search">
        <input
          type="text"
          placeholder="Search settings..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="j-os-controlpanel__body">
        <div className="j-os-controlpanel__grid">
          {filtered.map(s => (
            <button
              key={s.id}
              className={`j-os-cp-item${activeId === s.id ? ' j-os-cp-item--active' : ''}`}
              onClick={() => setActiveId(s.id)}
            >
              <span className="j-os-cp-item__icon">{s.icon}</span>
              <span className="j-os-cp-item__label">{s.label}</span>
            </button>
          ))}
        </div>

        <div className="j-os-controlpanel__pane">
          {active ? active.component : (
            <div style={{ color: 'var(--os-text-muted)', fontSize: 13, marginTop: 16 }}>
              Select a setting from the left panel.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
