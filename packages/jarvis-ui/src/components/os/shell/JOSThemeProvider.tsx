import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

export type OSTheme = 'windows11' | 'macos'

const OSThemeContext = createContext<OSTheme>('windows11')

export function useOSTheme(): OSTheme {
  return useContext(OSThemeContext)
}

export interface JOSThemeProviderProps {
  theme:    OSTheme
  children: ReactNode
}

export function JOSThemeProvider({ theme, children }: JOSThemeProviderProps) {
  return (
    <OSThemeContext.Provider value={theme}>
      <div data-os-theme={theme} data-testid="j-os-root" className="j-os-root">
        {children}
      </div>
    </OSThemeContext.Provider>
  )
}
