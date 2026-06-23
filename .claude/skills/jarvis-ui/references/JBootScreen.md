# JBootScreen

Animated 5-phase boot sequence overlay — runs on mount then calls `onComplete` when done.

## Import

```tsx
import { JBootScreen } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `systemName` | `string` | `'JARVIS'` | System name shown during boot |
| `version` | `string` | — | Version string (e.g. `'v2.0.0'`) |
| `onComplete` | `() => void` | — | Called when boot animation finishes |
| `phases` | `string[]` | — | Custom phase labels (overrides defaults) |

## Boot Phases (default)

1. INITIALIZING CORE SYSTEMS
2. LOADING MODULES
3. ESTABLISHING SECURE LINK
4. CALIBRATING SENSORS
5. SYSTEM READY

## Use Cases

### App startup boot screen

```tsx
const [booted, setBooted] = useState(false)

if (!booted) {
  return (
    <JBootScreen
      systemName="NEXUS COMMAND"
      version="v2.1.0"
      onComplete={() => setBooted(true)}
    />
  )
}

return <AppContent />
```

### Full app with boot screen

```tsx
function App() {
  const [booted, setBooted] = useState(false)

  return (
    <JThemeProvider preset="cyan">
      {!booted ? (
        <JBootScreen
          systemName="TACTICAL OPS"
          version="v1.0.0"
          onComplete={() => setBooted(true)}
        />
      ) : (
        <JPageLayout sidebar={<Sidebar />}>
          <MainContent />
        </JPageLayout>
      )}
    </JThemeProvider>
  )
}
```

### Custom phase labels

```tsx
<JBootScreen
  systemName="RAIL TRAFFIC CONTROL"
  version="v3.2.1"
  phases={[
    'CONNECTING TO RAIL NETWORK',
    'LOADING STATION DATA',
    'SYNCING TIMETABLES',
    'CALIBRATING SENSORS',
    'SYSTEM ONLINE',
  ]}
  onComplete={() => setBooted(true)}
/>
```

### With localStorage — skip on repeat visits

```tsx
const [booted, setBooted] = useState(
  () => localStorage.getItem('booted') === 'true'
)

function handleBootComplete() {
  localStorage.setItem('booted', 'true')
  setBooted(true)
}

return booted
  ? <App />
  : <JBootScreen systemName="NEXUS" onComplete={handleBootComplete} />
```

### Demo / replay button

```tsx
const [booted, setBooted] = useState(true)

<JButton size="sm" color="ghost" onClick={() => setBooted(false)}>
  ▶ REPLAY BOOT
</JButton>

{!booted && (
  <JBootScreen
    systemName="JARVIS"
    version="v2.0.0"
    onComplete={() => setBooted(true)}
  />
)}
```

## Notes

- `JBootScreen` renders full-screen (fixed overlay) — it covers everything underneath
- `onComplete` is required — without it the boot sequence runs but nothing happens after
- The animation is purely cosmetic — it doesn't actually load or verify anything
- Typically used once at app startup; skip on subsequent sessions with `localStorage`
- Custom `phases` must be an array of 3–7 strings for best visual pacing
