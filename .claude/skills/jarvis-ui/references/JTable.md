# JTable

Simple data table with state-based row coloring, hover, and optional footer.

## Import

```tsx
import { JTable } from '@masterdeepak15/jarvis-ui'
import type { JTableColumn, JTableRow } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `JTableColumn[]` | — | Column definitions |
| `rows` | `JTableRow[]` | — | Row data objects |
| `stateColumn` | `string` | — | Column key whose value maps to a JState for row coloring |
| `footerLabel` | `string` | — | Footer text (e.g. record count) |

## Types

```tsx
type JTableColumn = {
  key:      string    // matches row object key
  label:    string    // header display text
  sortable?: boolean  // (future use)
}

type JTableRow = Record<string, any>  // plain object keyed to column keys
```

## State Column Mapping

When `stateColumn` is set, the cell value is matched to a JState color:

| Value | State | Color |
|-------|-------|-------|
| `'Online'` / `'active'` | `active` | cyan |
| `'Warning'` / `'warning'` | `warning` | amber |
| `'Error'` / `'error'` / `'Offline'` | `error` | red |
| `'Success'` / `'success'` | `success` | green |

## Use Cases

### Basic table

```tsx
const columns: JTableColumn[] = [
  { key: 'id',       label: 'DEVICE ID' },
  { key: 'type',     label: 'TYPE'      },
  { key: 'location', label: 'LOCATION'  },
  { key: 'status',   label: 'STATUS'    },
]

const rows: JTableRow[] = [
  { id: 'CCTV-001', type: 'CCTV', location: 'Gate A', status: 'Online'  },
  { id: 'VMS-001',  type: 'VMS',  location: 'Zone 3', status: 'Warning' },
  { id: 'PTZ-002',  type: 'PTZ',  location: 'Gate B', status: 'Error'   },
]

<JTable columns={columns} rows={rows} stateColumn="status" />
```

### With footer count

```tsx
<JTable
  columns={columns}
  rows={rows}
  stateColumn="status"
  footerLabel={`${rows.length} DEVICES TOTAL`}
/>
```

### Stats summary after table

```tsx
const online  = rows.filter(r => r.status === 'Online').length
const warning = rows.filter(r => r.status === 'Warning').length
const error   = rows.filter(r => r.status === 'Error').length

<>
  <JTable columns={columns} rows={rows} stateColumn="status" />
  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
    <JBadge color="green">{online} ONLINE</JBadge>
    <JBadge color="amber">{warning} WARNINGS</JBadge>
    <JBadge color="red">{error} ERRORS</JBadge>
  </div>
</>
```

### When to use JTable vs custom table

Use `JTable` when:
- You need quick state-colored rows out of the box
- Data is simple — no custom cell renderers needed
- No sort/filter/paginate required

Build a custom table when:
- You need sortable headers (click to sort)
- You need custom cell renderers (JStatusPill, JBadge, JProgress in cells)
- You need client-side or server-side pagination

For a full-featured sortable + paginated table, combine:
`filteredRows → sorted → sliced` → custom `<table>` → `JPagination`

```tsx
// Custom sortable table pattern
const [sortKey, setSortKey]   = useState<string | null>(null)
const [sortDir, setSortDir]   = useState<'asc' | 'desc'>('asc')
const [page, setPage]         = useState(1)
const PAGE_SIZE = 10

const sorted = sortKey
  ? [...data].sort((a, b) => {
      const d = String(a[sortKey]).localeCompare(String(b[sortKey]))
      return sortDir === 'asc' ? d : -d
    })
  : data

const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
const visible = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

// Render custom <table> with headers that toggle sort
// Then <JPagination page={page} totalPages={totalPages} onPageChange={setPage} showFirstLast showInfo />
```

## Notes

- `stateColumn` key must exist in every row object
- Rows without a matching state value render with default styling
- `JTable` has no built-in sort, filter, or pagination — use JPagination + custom logic for those
