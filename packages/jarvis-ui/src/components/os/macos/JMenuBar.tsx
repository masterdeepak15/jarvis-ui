import { useState } from 'react'

export interface JMenuBarMenu {
  label: string
  items: { label: string; shortcut?: string; onClick: () => void; divider?: boolean }[]
}

export interface JMenuBarProps {
  appName?: string
  menus?:   JMenuBarMenu[]
}

export function JMenuBar({ appName, menus = [] }: JMenuBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  function toggleMenu(label: string) {
    setOpenMenu(prev => prev === label ? null : label)
  }

  return (
    <div data-testid="j-os-menubar" className="j-os-menubar">
      <button className="j-os-menubar__item" onClick={() => setOpenMenu(null)}>

      </button>
      {appName && (
        <button className="j-os-menubar__item" style={{ fontWeight: 700 }}>
          {appName}
        </button>
      )}
      {menus.map(menu => (
        <div key={menu.label} style={{ position: 'relative' }}>
          <button className="j-os-menubar__item" onClick={() => toggleMenu(menu.label)}>
            {menu.label}
          </button>
          {openMenu === menu.label && (
            <div className="j-os-menubar__dropdown">
              {menu.items.map((item, i) =>
                item.divider ? (
                  <div key={i} className="j-os-menubar__divider" />
                ) : (
                  <button
                    key={item.label}
                    className="j-os-menubar__dropdown-item"
                    onClick={() => { item.onClick(); setOpenMenu(null) }}
                  >
                    {item.label}
                    {item.shortcut && <span className="j-os-menubar__shortcut">{item.shortcut}</span>}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      ))}
      <span data-testid="j-os-menubar-clock" className="j-os-menubar__clock">{time}</span>
    </div>
  )
}
