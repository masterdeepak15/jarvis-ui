# Typical Layout Guide

Use Typical when the content is data-dense but not cinematic — admin panels, dashboards with tables, analytics, settings pages. It has a sidebar and a scrollable main content area like a normal web app.

---

## Core Structure

```tsx
import {
  JPageLayout, JSidebar, JNavItem, JNavSection,
  JStatCard, JLineChart, JBarChart, JTable,
  JButton, JInput, JSelect
} from '@masterdeepak15/jarvis-ui'

export function TypicalPage() {
  return (
    <JPageLayout
      sidebar={
        <JSidebar>
          <JNavSection label="MAIN">
            <JNavItem icon="dashboard" label="Overview"  to="/"       active />
            <JNavItem icon="chart"     label="Analytics" to="/analytics" />
            <JNavItem icon="table"     label="Data"      to="/data" />
          </JNavSection>
          <JNavSection label="ADMIN">
            <JNavItem icon="settings"  label="Settings"  to="/settings" />
            <JNavItem icon="users"     label="Users"     to="/users" />
          </JNavSection>
        </JSidebar>
      }
    >
      {/* Main content: flex column, gap, max-width container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200 }}>

        {/* Stat cards row — always first in Typical */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <JStatCard label="TOTAL USERS"   value="12,480" delta="+3.2%" state="success" />
          <JStatCard label="ACTIVE TODAY"  value="1,842"  delta="+8.1%" state="success" />
          <JStatCard label="ERROR RATE"    value="0.43%"  delta="+0.1%" state="warning" />
          <JStatCard label="UPTIME"        value="99.97%" delta="0.00%"               />
        </div>

        {/* Chart row — primary visualization */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
          <JLineChart title="REQUESTS / DAY"  data={requestData} height={240} />
          <JBarChart  title="ERROR BREAKDOWN" data={errorData}   height={240} />
        </div>

        {/* Data table — full width */}
        <JTable
          title="RECENT EVENTS"
          columns={['Time', 'User', 'Event', 'Status']}
          rows={tableRows}
          sortable
          paginate
        />

      </div>
    </JPageLayout>
  )
}
```

---

## Layout Zones (Typical Mode)

```
┌─────────────────────────────────────────────────────────────┐
│ [JARVIS LOGO]                              [user] [settings]│  ← JTopBar
├──────────────┬──────────────────────────────────────────────┤
│              │  [STAT] [STAT] [STAT] [STAT]                 │
│  JSidebar    │  ─── stat cards row ───                      │
│              │                                              │
│  JNavSection │  [LINE CHART 2/3]     [BAR CHART 1/3]        │
│  JNavItem    │  ─── chart row ───                           │
│              │                                              │
│  JNavSection │  [TABLE ──────────────────────────────────]  │
│  JNavItem    │  ─── data table row ───                      │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

| Zone | Components | Width |
|---|---|---|
| Sidebar | `JSidebar` + `JNavSection` + `JNavItem` | 220px fixed |
| Stat cards | `JStatCard` × 3–4 | `repeat(N, 1fr)` grid |
| Chart row | `JLineChart` + `JBarChart` | `2fr 1fr` or `1fr 1fr` |
| Data table | `JTable` | full remaining width |
| Action toolbar | `JButton` + `JInput` + `JSelect` | above table |

---

## Typical vs Movies Decision Rules

| If... | Choose |
|---|---|
| User needs to navigate between sections | **Typical** (sidebar nav) |
| Content is tables, forms, lists | **Typical** |
| Light/dark theme matters | **Typical** |
| Mobile-friendly required | **Typical** |
| Pure data visualization, cinematic feel wanted | **Movies** |
| Fixed viewport, no scrolling | **Movies** |

---

## Key Rules

**Stat cards always come first.** Top of the main content area, in a grid, 3–4 columns. Never embed them mid-page.

**Charts follow stats.** Primary chart (wider) + secondary chart side by side.

**Tables are last.** Full width, paginated, sortable.

**Never mix Typical and Movies.** Don't put `JHudCanvas` inside `JPageLayout`.

**`JPageLayout` is the root.** Everything goes inside it — no raw `div` outer containers.

---

## Common Patterns

### Filter bar above a table

```tsx
<div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
  <JInput placeholder="Search..." onChange={setSearch} style={{ flex: 1 }} />
  <JSelect value={status} onChange={setStatus} options={statusOptions} />
  <JButton label="Export" variant="ghost" onClick={handleExport} />
</div>
<JTable ... />
```

### Page header with action button

```tsx
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h2 style={{ color: 'var(--j-fg)', margin: 0 }}>Analytics</h2>
  <JButton label="Download Report" icon="download" onClick={handleDownload} />
</div>
```

### Responsive stat grid (fewer columns on narrow screens)

```tsx
// Use auto-fit for responsive columns
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 16
}}>
  <JStatCard ... />
</div>
```

---

## Banned in Typical Mode

| ❌ Banned | Why | Use Instead |
|---|---|---|
| `JHudCanvas` | HUD canvas = Movies mode | Standard grid/flex layout |
| `position: absolute` on main content | Breaks page flow | `display: grid` / `flex` |
| Hardcoded hex colors | Breaks theme system | `var(--j-fg)`, `var(--j-surface)` etc. |
| Full-bleed dark background on content | Typical allows light mode | Let `JPageLayout` control background |
