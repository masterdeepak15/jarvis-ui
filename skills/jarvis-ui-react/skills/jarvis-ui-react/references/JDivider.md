# JDivider · JDataRow

Utility display components for visual separation and key-value data rows.

## Import

```tsx
import { JDivider, JDataRow } from '@masterdeepak15/jarvis-ui'
```

---

## JDivider

Horizontal or vertical line separator with optional centered label.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Text label centered in the divider |
| `vertical` | `boolean` | `false` | Render as vertical divider |
| `color` | `JColor` | `'cyan'` | Line color |

### Examples

```tsx
// Plain divider
<JDivider />

// With section label
<JDivider label="DEVICE CONFIGURATION" />
<JDivider label="SYSTEM HEALTH"  />
<JDivider label="ALERT SETTINGS" />

// Colored
<JDivider label="WARNING ZONE" color="amber" />
<JDivider label="CRITICAL"     color="red"   />

// Vertical (in a flex row)
<div style={{ display: 'flex', alignItems: 'stretch', gap: 16 }}>
  <div>Section A content</div>
  <JDivider vertical />
  <div>Section B content</div>
</div>
```

---

## JDataRow

Key-value data row for structured information display.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Key (left side) |
| `value` | `string\|number` | — | Value (right side) |
| `state` | `JState` | — | Optional state color for the value |

### Examples

```tsx
// Basic data rows
<JDataRow label="DEVICE ID"  value="CCTV-001" />
<JDataRow label="LOCATION"   value="Gate A — North Entry" />
<JDataRow label="IP ADDRESS" value="192.168.1.101" />
<JDataRow label="LAST SEEN"  value="14:32:07 UTC" />

// With state coloring
<JDataRow label="STATUS"  value="ONLINE"   state="active"  />
<JDataRow label="STATUS"  value="WARNING"  state="warning" />
<JDataRow label="STATUS"  value="OFFLINE"  state="error"   />
<JDataRow label="STATUS"  value="RESTORED" state="success" />

// In a detail panel
<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
  <JDataRow label="UNIT ID"    value={unit.id} />
  <JDataRow label="TYPE"       value={unit.type} />
  <JDataRow label="STATUS"     value={unit.status} state={stateOf(unit.status)} />
  <JDataRow label="HEALTH"     value={`${unit.health}%`} />
  <JDataRow label="LOCATION"   value={unit.location} />
  <JDataRow label="LAST EVENT" value={unit.lastEvent} />
</div>

// State helper function
function stateOf(status: string): JState {
  const map: Record<string, JState> = {
    Online: 'active', Warning: 'warning', Error: 'error', Offline: 'error', OK: 'success'
  }
  return map[status] ?? 'active'
}
```

---

## Combining both in a form section

```tsx
<JDivider label="UNIT IDENTITY" />
<JDataRow label="ID"        value="CCTV-001" />
<JDataRow label="INSTALLED" value="2024-03-15" />

<JDivider label="CURRENT STATE" />
<JDataRow label="STATUS"  value="ONLINE"  state="active" />
<JDataRow label="HEALTH"  value="87%"     state="active" />
<JDataRow label="BATTERY" value="12%"     state="warning" />
```

## Notes

- `JDivider` without `label` is a plain line — good for visual separation in forms
- `JDataRow` renders label in muted color, value in primary color
- `state` on `JDataRow` applies accent color to the value text only
