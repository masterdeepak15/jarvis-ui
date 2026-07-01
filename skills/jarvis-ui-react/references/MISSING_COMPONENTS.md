# Missing Components Backlog

Components that were needed during real app builds but don't exist in the library. Each entry documents the gap, what had to be hand-rolled, and what a library version should support.

---

## 1. JTable with custom cell renderers

**Gap:** `JTable` exists but has no support for custom cell renderers — no status badges, masked images, or inline action buttons inside cells. Every multi-column data table with non-text cells had to be built raw with `<table>`.

**What was hand-rolled:** 8-column sortable/paginated tables with `<table>`, `<thead>`, `<tbody>`, manual sort state, manual page slice, inline `JBadge` and `JButton` per row.

**What the library version should support:**
- `columns: { key, label, render?: (value, row) => ReactNode }[]` — cell renderer per column
- `sortable?: boolean` — click-to-sort on column headers
- `pagination?: { pageSize: number }` — built-in pagination with `JPagination`
- HUD-themed `<tr>` hover state, alternating row tint, sticky header

---

## 2. JEvidenceImage

**Gap:** No component for displaying evidence/media images with redaction toggle — a fixed pattern in surveillance, compliance, and audit UIs.

**What was hand-rolled:** `MaskedPlateImage` — a div with a `<img>` + an overlay div (blurred/pixelated via CSS filter) + a toggle button. State: `masked: boolean`.

**What the library version should support:**
- `src: string` — image URL
- `masked?: boolean` + `onMaskChange?: (v: boolean) => void` — controlled redaction overlay
- `maskLabel?: string` — label on the overlay (e.g. `'REDACTED'`)
- `maskBlur?: number` — blur intensity
- HUD-style corner brackets on the image frame

---

## 3. JMapPanel

**Gap:** No map component at all. `react-leaflet` had to be pulled in raw with manual tile layer, manual FitBounds, manual marker SVG strings, manual GeoJSON style functions. Hand-rolled Leaflet does not inherit the HUD theme.

**What was hand-rolled:** Full `react-leaflet` setup — `MapContainer`, `TileLayer` (dark CartoDB tile), `GeoJSON` with custom `style()` and `onEachFeature()`, `Marker` with custom `divIcon` using inline SVG strings, `useMap()` hook for `FitBounds`.

**What the library version should support:**
- `JMapPanel` wrapper around `react-leaflet` with:
  - Dark HUD tile layer baked in (CartoDB dark matter or similar)
  - `markers?: { lat, lng, label?, state?: JState }[]` — themed markers using `--j-accent`/`--j-err`/etc.
  - `geoJson?: GeoJSON` — rendered with HUD accent color boundaries
  - `fitBounds?: boolean` — auto-fit to markers/GeoJSON on mount
  - `height?: string` — container height
- Zero Leaflet setup required from the consumer

---

## 4. Multi-series JLineChart

**Gap:** `JLineChart` is single-series only. Comparing two trends on one chart (signal vs noise, online vs offline over time) is a common dashboard need and currently impossible without dropping to raw Recharts.

**What was hand-rolled:** Not possible without raw charting lib — feature was omitted from the UI.

**What the library version should support:**
- `series: { label: string; data: JChartPoint[]; colorVar: string; area?: boolean }[]`
- Legend row below chart (label + color swatch per series)
- All series share the same X labels (aligned by index or by `label` matching)
- Existing single-series API (`data` + `colorVar`) kept as a convenience shorthand

---

## 5. JForm with field-level validation state

**Gap:** No form-level error state management. Every login, registration, and CRUD form hand-rolls `fieldErr: Record<string, string>` state + manual validation before submit.

**What was hand-rolled:** `useState<Record<string, string>>({})` + inline `if (!value) setFieldErr(...)` blocks + passing error string to `JFormField` manually.

**What the library version should support:**
- `JForm` wrapper: `onSubmit`, `validate?: (values) => Record<string, string>` — returns field error map
- Automatically propagates errors down to named `JFormField` children via context
- `JFormField` reads its own error from context by `name` — no manual wiring needed
- `useFormField(name)` hook for custom inputs
- Clears field error on change

---

## 6. Toast stacking / notification queue

**Gap:** `JToastProvider` exists but the API and behavior were uncertain after being burned by wrong docs three times in the same session, so it was avoided. `JAlert` was used instead for transient messages, positioned manually at a fixed location.

**What was hand-rolled:** Single fixed-position `JAlert` with `useState<{message,state} | null>` — only one notification visible at a time, no queue, auto-dismiss via `setTimeout`.

**What the library version needs (or needs documented):**
- Verify and document the actual `useToast()` / `toast()` API against the `JToastProvider` source
- Document: max visible toasts, queue behavior, auto-dismiss duration, stacking direction
- If stacking isn't supported, add it: `maxVisible?: number`, FIFO queue, slide-in animation per toast
