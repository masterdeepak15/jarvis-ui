import { JThemePicker, useTheme } from 'jarvis-ui'

function ThemeInfo() {
  const { theme } = useTheme()
  return (
    <div style={{ fontSize: 10, color: 'var(--j-text-muted)', letterSpacing: '0.08em', marginTop: 16 }}>
      ACTIVE: {theme.name.toUpperCase()} — ACCENT: {theme.accent}
    </div>
  )
}

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--j-bg)',
      color: 'var(--j-text-primary)',
      fontFamily: "'Courier New', 'Lucida Console', monospace",
      padding: 32,
    }}>
      <div style={{ fontSize: 22, color: 'var(--j-accent)', letterSpacing: '0.16em', marginBottom: 4 }}>
        JARVIS UI
      </div>
      <div style={{ fontSize: 10, color: 'var(--j-text-muted)', letterSpacing: '0.12em', marginBottom: 32 }}>
        REACT COMPONENT LIBRARY — PHASE 1 FOUNDATION
      </div>

      <div style={{ border: '1px solid var(--j-border)', padding: 16, maxWidth: 320 }}>
        <JThemePicker />
      </div>

      <ThemeInfo />
    </div>
  )
}
