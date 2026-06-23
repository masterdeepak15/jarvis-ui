# JPageLayout · JSidebar · JNavItem

Full-page HUD layout with sidebar navigation and top/bottom HUD bars.

## Import

```tsx
import { JPageLayout, JSidebar, JNavItem } from '@masterdeepak15/jarvis-ui'
```

---

## JPageLayout

Wraps the entire page with top HUD bar, bottom HUD bar, and sidebar. Main content goes as `children`.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Page content area |
| `topBarLabel` | `string` | — | Text in the top HUD bar |
| `systemName` | `string` | — | System name in the top bar |
| `sidebar` | `ReactNode` | — | Sidebar content (use `JSidebar`) |

### Example

```tsx
<JPageLayout
  topBarLabel="JARVIS TACTICAL OPS"
  sidebar={
    <JSidebar>
      <JNavItem icon="⊞" label="DASHBOARD"   active={page === 'dash'}    onClick={() => setPage('dash')} />
      <JNavItem icon="🌐" label="TACTICAL MAP" active={page === 'map'}    onClick={() => setPage('map')} />
      <JNavItem icon="▣" label="DATA TABLE"   active={page === 'table'}  onClick={() => setPage('table')} />
      <JNavItem icon="⚙" label="SETTINGS"     active={page === 'settings'} onClick={() => setPage('settings')} />
    </JSidebar>
  }
>
  {page === 'dash'  && <DashboardPage />}
  {page === 'map'   && <MapPage />}
  {page === 'table' && <DataTablePage />}
</JPageLayout>
```

---

## JSidebar

Left navigation sidebar container. Wraps `JNavItem` components.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Navigation items |
| `collapsed` | `boolean` | `false` | Collapse to icon-only mode |

---

## JNavItem

Individual sidebar navigation item.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | — | Icon character/emoji |
| `label` | `string` | — | Nav item label |
| `active` | `boolean` | `false` | Highlighted active state |
| `onClick` | `() => void` | — | Click handler |
| `color` | `JColor` | `'cyan'` | Active highlight color |
| `badge` | `string\|number` | — | Small badge (count/status) |

---

## Full app layout example

```tsx
import { JPageLayout, JSidebar, JNavItem, JThemeProvider } from '@masterdeepak15/jarvis-ui'
import '@masterdeepak15/jarvis-ui/styles'

const NAV_ITEMS = [
  { key: 'dashboard', icon: '⊞', label: 'DASHBOARD'    },
  { key: 'map',       icon: '🌐', label: 'TACTICAL MAP' },
  { key: 'data',      icon: '▣', label: 'DATA TABLE'   },
  { key: 'alerts',    icon: '⚠', label: 'ALERTS',  badge: 3 },
  { key: 'settings',  icon: '⚙', label: 'SETTINGS'    },
]

function App() {
  const [page, setPage] = useState('dashboard')

  return (
    <JThemeProvider preset="cyan">
      <JPageLayout
        topBarLabel="NEXUS COMMAND"
        sidebar={
          <JSidebar>
            {NAV_ITEMS.map(item => (
              <JNavItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                active={page === item.key}
                onClick={() => setPage(item.key)}
              />
            ))}
          </JSidebar>
        }
      >
        {page === 'dashboard' && <DashboardPage />}
        {page === 'map'       && <MapPage />}
        {page === 'data'      && <DataPage />}
        {page === 'alerts'    && <AlertsPage />}
        {page === 'settings'  && <SettingsPage />}
      </JPageLayout>
    </JThemeProvider>
  )
}
```

## Notes

- `JPageLayout` handles the full viewport — don't add extra scroll containers
- `JSidebar` and `JNavItem` can also be used standalone without `JPageLayout`
- `badge` on `JNavItem` renders a small count indicator (useful for unread alerts, etc.)
- `active` state on `JNavItem` should be driven by your current page/route state
