# JPagination

Page navigation with first/last buttons and optional record-count info.

## Import

```tsx
import { JPagination } from '@masterdeepak15/jarvis-ui'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `number` | — | Current page (1-based) |
| `totalPages` | `number` | — | Total number of pages |
| `onPageChange` | `(page: number) => void` | — | Called with new page number |
| `showFirstLast` | `boolean` | `false` | Show « first and last » buttons |
| `showInfo` | `boolean` | `false` | Show "Page X of Y" info |
| `pageSize` | `number` | — | Items per page (used in info display) |

## Use Cases

### Basic pagination

```tsx
const [page, setPage] = useState(1)
const totalPages = Math.ceil(data.length / 10)

<JPagination
  page={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>
```

### Full pagination with all features

```tsx
const [page, setPage]       = useState(1)
const [pageSize, setPageSize] = useState(10)
const totalPages = Math.ceil(filteredData.length / pageSize)

<JPagination
  page={page}
  totalPages={totalPages}
  onPageChange={setPage}
  showFirstLast
  showInfo
  pageSize={pageSize}
/>
```

### Client-side paged table

```tsx
const ALL_DATA = [...] // 100 rows
const PAGE_SIZE = 10

const [page, setPage] = useState(1)

const totalPages  = Math.ceil(ALL_DATA.length / PAGE_SIZE)
const visibleRows = ALL_DATA.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
  {/* Table rows */}
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    {visibleRows.map(row => <RowComponent key={row.id} row={row} />)}
  </div>

  {/* Pagination bar */}
  <JPagination
    page={page}
    totalPages={totalPages}
    onPageChange={setPage}
    showFirstLast
    showInfo
    pageSize={PAGE_SIZE}
  />
</div>
```

### Server-side pagination

```tsx
const [page, setPage]       = useState(1)
const [data, setData]       = useState([])
const [totalPages, setTotal] = useState(1)
const [loading, setLoading]  = useState(false)

async function fetchPage(p: number) {
  setLoading(true)
  const res = await fetch(`/api/devices?page=${p}&size=20`)
  const json = await res.json()
  setData(json.items)
  setTotal(json.totalPages)
  setLoading(false)
}

useEffect(() => { fetchPage(page) }, [page])

<>
  {loading ? <JSpinner label="LOADING..." /> : <DataTable rows={data} />}
  <JPagination
    page={page}
    totalPages={totalPages}
    onPageChange={setPage}
    showFirstLast
    showInfo
  />
</>
```

### With variable page size selector

```tsx
const [page, setPage]       = useState(1)
const [pageSize, setPageSize] = useState('10')

const pSize    = parseInt(pageSize)
const totalPgs = Math.ceil(filtered.length / pSize)
const visible  = filtered.slice((page - 1) * pSize, page * pSize)

// Reset to page 1 when size changes
function handleSizeChange(v: string) {
  setPageSize(v)
  setPage(1)
}

<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <JSelect
    value={pageSize}
    onChange={handleSizeChange}
    options={['5','10','20','50'].map(n => ({ value: n, label: `${n} / PAGE` }))}
  />
  <JPagination page={page} totalPages={totalPgs} onPageChange={setPage} showFirstLast showInfo />
</div>
```

## Notes

- `page` is 1-based (first page = 1, not 0)
- Always clamp page to `[1, totalPages]` before passing — no internal bounds-clamping
- When filters change, reset `page` to `1` to avoid being on a now-empty page
- `showInfo` displays "Page X of Y" — requires `totalPages` to be accurate
