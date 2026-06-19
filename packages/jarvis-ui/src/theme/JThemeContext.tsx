import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { JarvisTheme, JThemePreset, PRESETS, toCss } from './JarvisTheme'

interface ThemeContextValue {
  theme: JarvisTheme
  setTheme: (theme: JarvisTheme) => void
  setPreset: (preset: JThemePreset) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

interface JThemeProviderProps {
  children: ReactNode
  preset?: JThemePreset
  theme?: JarvisTheme
}

export function JThemeProvider({ children, preset = 'cyan', theme: initialTheme }: JThemeProviderProps) {
  const [theme, setThemeState] = useState<JarvisTheme>(initialTheme ?? PRESETS[preset])

  useEffect(() => {
    let style = document.getElementById('jarvis-theme-vars') as HTMLStyleElement | null
    if (!style) {
      style = document.createElement('style')
      style.id = 'jarvis-theme-vars'
      document.head.appendChild(style)
    }
    style.textContent = toCss(theme)
  }, [theme])

  const setTheme = (t: JarvisTheme) => setThemeState(t)
  const setPreset = (p: JThemePreset) => setThemeState(PRESETS[p])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, setPreset }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside JThemeProvider')
  return ctx
}
