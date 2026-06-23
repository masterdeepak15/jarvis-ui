# JDatePicker · JDateRangePicker · JTimePicker

Date and time pickers with HUD styling.

## Import

```tsx
import { JDatePicker, JDateRangePicker, JTimePicker } from '@masterdeepak15/jarvis-ui'
import type { DateRange } from '@masterdeepak15/jarvis-ui'
```

---

## JDatePicker

Single date picker with calendar popup.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| undefined` | — | Selected date |
| `onChange` | `(d: Date \| undefined) => void` | — | Change handler |
| `color` | `JColor` | `'cyan'` | Accent color |
| `minDate` | `Date` | — | Earliest selectable date |
| `maxDate` | `Date` | — | Latest selectable date |
| `disabled` | `boolean` | `false` | Disabled state |

### Examples

```tsx
const [date, setDate] = useState<Date | undefined>()

// Basic
<JDatePicker value={date} onChange={setDate} />

// Amber, future dates only
<JDatePicker
  value={date}
  onChange={setDate}
  color="amber"
  minDate={new Date()}
/>

// Show selected value
<JDataRow label="DATE" value={date ? date.toLocaleDateString() : '—'} />
```

---

## JDateRangePicker

Dual-month calendar for selecting a start/end date range.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `DateRange` | — | `{ from?: Date, to?: Date }` |
| `onChange` | `(r: DateRange) => void` | — | Change handler |
| `color` | `JColor` | `'cyan'` | Accent color |

`DateRange`: `{ from?: Date; to?: Date }`

### Examples

```tsx
const [range, setRange] = useState<DateRange>({})

<JDateRangePicker value={range} onChange={setRange} />

// Display selected range
<div style={{ display: 'flex', gap: 16 }}>
  <JDataRow label="FROM" value={range.from?.toLocaleDateString() ?? '—'} />
  <JDataRow label="TO"   value={range.to?.toLocaleDateString()   ?? '—'} />
</div>
```

---

## JTimePicker

Time picker (HH:MM format) with HUD styling.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Time string `'HH:MM'` |
| `onChange` | `(t: string) => void` | — | Change handler |
| `color` | `JColor` | `'cyan'` | Accent color |
| `disabled` | `boolean` | `false` | Disabled state |

### Examples

```tsx
const [time, setTime] = useState('14:30')

// Default cyan
<JTimePicker value={time} onChange={setTime} />

// Green variant
<JTimePicker value={time} onChange={setTime} color="green" />

// Display value
<JDataRow label="TIME" value={time} />
```

---

## Combined Date+Time form

```tsx
const [date, setDate] = useState<Date | undefined>()
const [time, setTime] = useState('09:00')
const [range, setRange] = useState<DateRange>({})

<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
  <JFormField label="MISSION DATE">
    <JDatePicker value={date} onChange={setDate} minDate={new Date()} />
  </JFormField>

  <JFormField label="DEPARTURE TIME">
    <JTimePicker value={time} onChange={setTime} color="amber" />
  </JFormField>

  <JFormField label="OPERATION WINDOW">
    <JDateRangePicker value={range} onChange={setRange} color="green" />
  </JFormField>
</div>
```

## Notes

- All are controlled components — always pass `value` + `onChange`
- `JTimePicker` value is a plain string `'HH:MM'` — not a Date object
- `JDateRangePicker` handles the two-click selection sequence internally
