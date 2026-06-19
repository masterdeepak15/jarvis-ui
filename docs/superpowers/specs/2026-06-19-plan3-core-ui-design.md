# JarvisUI Plan 3 — Core UI Components Design Spec

**Date:** 2026-06-19  
**Status:** Approved  
**Covers:** JButton · JCard · JInput · JTextArea · JSelect · JCheckbox · JRadio · JToggle · JSlider · JFormField · JDatePicker · JDateRangePicker · JTimePicker

---

## Context

Part 3 of 5 in the JarvisUI React port. Plans 1 (Foundation) and 2 (Layout) are complete. This plan delivers all interactive UI components: buttons, content cards, all form inputs, and date/time pickers.

---

## Global Constraints (inherited + new)

- Read the Blazor `.razor` source file BEFORE implementing any component — it is the spec
- Blazor source root: `D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI\`
- Repo root: `D:\Claude\HUD Theme\HUDtheme\`
- All colors via `var(--j-*)` CSS variables — no hardcoded hex in TSX
- No `border-radius` on HUD components — use `clip-path` polygons
- Font: `'Courier New', monospace` everywhere
- CSS classes for all components already exist in copied `jarvis-ui.css` and `jarvis-theme.css` — verify actual class names by grepping before implementing
- All components: support both controlled (`value` + `onChange`) and uncontrolled (`defaultValue`) usage
- TDD: write failing test first, then implement
- Every component exported from `packages/jarvis-ui/src/index.ts`
- Use `JarvisTokens.color()`, `JarvisTokens.size()`, `JarvisTokens.buttonShape()`, `JarvisTokens.cardStyle()`, `JarvisTokens.cls()` from existing `JarvisTokens.ts`
- Date/time pickers use `react-day-picker` (already a workspace dependency in `packages/jarvis-ui/package.json` — add if missing)

---

## File Structure

```
packages/jarvis-ui/src/components/ui/
├── JButton.tsx              JButton.test.tsx
├── JCard.tsx                JCard.test.tsx
├── JInput.tsx               JInput.test.tsx
├── JTextArea.tsx            JTextArea.test.tsx
├── JSelect.tsx              JSelect.test.tsx
├── JCheckbox.tsx            JCheckbox.test.tsx
├── JRadio.tsx               JRadio.test.tsx
├── JToggle.tsx              JToggle.test.tsx
├── JSlider.tsx              JSlider.test.tsx
├── JFormField.tsx           JFormField.test.tsx
├── JDatePicker.tsx          JDatePicker.test.tsx
├── JDateRangePicker.tsx     JDateRangePicker.test.tsx
└── JTimePicker.tsx          JTimePicker.test.tsx
```

---

## Task Breakdown

### Task 1 — JButton

**Blazor source:** `JarvisUI/Components/JButton.razor`

**Props:**
```ts
interface JButtonProps {
  shape?:     JButtonShape          // default: 'LeftNotch'
  color?:     JColor                // default: 'cyan'
  size?:      JSize                 // default: 'md'
  variant?:   JVariant              // default: 'solid'
  loading?:   boolean               // shows spinner, disables interaction
  disabled?:  boolean
  icon?:      ReactNode             // left icon slot
  iconRight?: ReactNode             // right icon slot
  type?:      'button'|'submit'|'reset'  // default: 'button'
  onClick?:   () => void
  children?:  ReactNode
}
```

**Behavior:**
- Renders `<button>` with `className` built from `JarvisTokens.cls(JarvisTokens.buttonShape(shape), JarvisTokens.color(color), JarvisTokens.size(size), JarvisTokens.variant(variant))`
- 9 shapes map to CSS classes via existing `BUTTON_SHAPE_MAP` in JarvisTokens
- `loading=true`: adds loading class, shows animated dots or scan line, sets `disabled` attribute, prevents onClick
- `disabled=true`: sets `disabled` attribute, reduces opacity via CSS state class
- Icon slots: rendered inside button, flex layout with gap

**CSS classes to verify exist:** `j-btn`, `j-btn-left-notch`, `j-btn-right-notch`, `j-btn-both-notch`, `j-btn-parallelogram`, `j-btn-ghost-skew`, `j-btn-bracket`, `j-btn-hex`, `j-btn-icon-sq`, `j-btn-scan-full`, `j-size-*`, `j-variant-*`, `j-color-*`

**Tests (min):** renders, correct shape class applied, loading disables click, disabled prevents click, icon slots render, type attribute passed through

---

### Task 2 — JCard

**Blazor source:** `JarvisUI/Components/JCard.razor`

**Props:**
```ts
interface JCardProps {
  cardStyle?: JCardStyle   // default: 'CornerBracket' → j-card-s1
  color?:     JColor       // default: 'cyan'
  header?:    ReactNode    // optional header slot
  footer?:    ReactNode    // optional footer slot
  padding?:   string       // default: '16px'
  children?:  ReactNode
}
```

**Behavior:**
- `className`: `JarvisTokens.cls('j-card', JarvisTokens.cardStyle(cardStyle), JarvisTokens.color(color))`
- 9 styles are CSS-driven — the component is purely a class + slot wrapper
- Header rendered above content with appropriate border/spacing (check Blazor for exact structure)
- Footer rendered below content
- `padding` applied to content area only (not header/footer — they have their own padding)

**CSS classes to verify exist:** `j-card`, `j-card-s1` through `j-card-s9`

**Tests (min):** renders, cardStyle class applied, header/footer slots render, children render, color class applied

---

### Task 3 — JInput · JTextArea · JSelect

**Blazor sources:** `JInput.razor`, `JTextArea.razor`, `JSelect.razor`

#### JInput
```ts
interface JInputProps {
  type?:         'text'|'email'|'password'|'number'|'search'  // default: 'text'
  value?:        string
  defaultValue?: string
  onChange?:     (value: string) => void
  placeholder?:  string
  disabled?:     boolean
  readOnly?:     boolean
  error?:        boolean   // applies error styling
  color?:        JColor
  size?:         JSize
}
```

#### JTextArea
```ts
interface JTextAreaProps {
  value?:        string
  defaultValue?: string
  onChange?:     (value: string) => void
  placeholder?:  string
  disabled?:     boolean
  readOnly?:     boolean
  error?:        boolean
  rows?:         number    // default: 4
  resize?:       'none'|'vertical'|'both'  // default: 'none'
  color?:        JColor
  size?:         JSize
}
```

#### JSelect
```ts
interface JSelectOption {
  value:     string
  label:     string
  disabled?: boolean
}
interface JSelectProps {
  options:       JSelectOption[]
  value?:        string
  defaultValue?: string
  onChange?:     (value: string) => void
  placeholder?:  string
  disabled?:     boolean
  error?:        boolean
  color?:        JColor
  size?:         JSize
}
```

**Behavior (all three):**
- HUD border styling, accent on focus, error state via error class
- clip-path on container (no border-radius)
- `onChange` receives the value string directly (not the event)
- `error=true` applies error color class to border/glow

**CSS classes to verify exist:** `j-input`, `j-textarea`, `j-select`, `j-input-error` (or similar)

**Tests per component (min):** renders, value controlled, onChange fires, placeholder shown, disabled prevents input, error class applied when error=true

---

### Task 4 — JCheckbox · JRadio · JToggle · JSlider

**Blazor sources:** `JCheckbox.razor`, `JRadio.razor`, `JToggle.razor`, `JSlider.razor`

#### JCheckbox
```ts
interface JCheckboxProps {
  checked?:        boolean
  defaultChecked?: boolean
  onChange?:       (checked: boolean) => void
  label?:          string
  disabled?:       boolean
  color?:          JColor
}
```

#### JRadio
```ts
interface JRadioProps {
  checked?:  boolean
  onChange?: (value: string) => void
  label?:    string
  value:     string
  name?:     string
  disabled?: boolean
  color?:    JColor
}
```

#### JToggle
```ts
interface JToggleProps {
  checked?:        boolean
  defaultChecked?: boolean
  onChange?:       (checked: boolean) => void
  label?:          string
  disabled?:       boolean
  color?:          JColor
}
```

#### JSlider
```ts
interface JSliderProps {
  value?:        number
  defaultValue?: number
  onChange?:     (value: number) => void
  min?:          number   // default: 0
  max?:          number   // default: 100
  step?:         number   // default: 1
  disabled?:     boolean
  showValue?:    boolean  // shows current value label. default: true
  color?:        JColor
}
```

**Behavior:**
- JCheckbox: custom indicator (diamond clip-path or square), hidden native input
- JRadio: custom dot indicator, hidden native input
- JToggle: sliding pill animation on state change
- JSlider: styled range input, accent-colored track fill, custom thumb via CSS
- All: label rendered beside control with gap, disabled dims and prevents interaction

**CSS classes to verify exist:** `j-checkbox`, `j-radio`, `j-toggle`, `j-slider`

**Tests per component (min):** renders, checked state reflected, onChange fires, label shown, disabled prevents change

---

### Task 5 — JFormField · JDatePicker · JDateRangePicker · JTimePicker

**Blazor sources:** `JFormField.razor`, `JDatePicker.razor`, `JDateRangePicker.razor`, `JTimePicker.razor`

#### JFormField (wrapper)
```ts
interface JFormFieldProps {
  label?:    string
  error?:    string    // error message text (empty = no error shown)
  hint?:     string    // helper text below input
  required?: boolean   // adds * to label
  children:  ReactNode
}
```

Structure:
```
<div class="j-form-field">
  {label && <label class="j-field-label">{label}{required && <span>*</span>}</label>}
  {children}
  {error  && <span class="j-field-error">{error}</span>}
  {hint   && <span class="j-field-hint">{hint}</span>}
</div>
```

#### JDatePicker
```ts
interface JDatePickerProps {
  value?:    Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  minDate?:  Date
  maxDate?:  Date
  color?:    JColor
}
```

- HUD-styled trigger button showing formatted date or placeholder
- Popover calendar using `react-day-picker` `<DayPicker>` component
- Calendar styled with HUD colors via CSS variable overrides
- Popover closes on outside click (use `useEffect` + document listener)
- Format: `DD MMM YYYY` (e.g. "19 Jun 2026")

#### JDateRangePicker
```ts
interface DateRange { from?: Date; to?: Date }
interface JDateRangePickerProps {
  value?:    DateRange
  onChange?: (range: DateRange) => void
  placeholder?: string
  disabled?: boolean
  color?:    JColor
}
```
- Two-month calendar view or single-month with range selection
- Uses `react-day-picker` range mode
- Trigger shows "DD MMM — DD MMM" or placeholder

#### JTimePicker
```ts
interface JTimePickerProps {
  value?:   string   // 'HH:mm' format
  onChange?: (time: string) => void
  placeholder?: string
  disabled?: boolean
  format?:  '12h'|'24h'  // default: '24h'
  color?:   JColor
}
```
- HUD-styled input pair (hours : minutes) or single text input accepting HH:mm
- Inline implementation (no external library) — two number inputs with HUD clip-path styling
- Validates and clamps values on blur (hours 0–23, minutes 0–59)
- `onChange` called with formatted `'HH:mm'` string

**CSS classes to verify exist:** `j-form-field`, `j-field-label`, `j-field-error`, `j-field-hint`, `j-date-picker`, `j-time-picker`

**Task 5 setup step:** before writing components, run `pnpm add react-day-picker` in `packages/jarvis-ui/` (if not already a dependency)

**Tests:**
- JFormField: label shown, required asterisk, error message, hint, children render
- JDatePicker: renders trigger, clicking trigger opens calendar, selecting date calls onChange, disabled prevents open
- JDateRangePicker: renders trigger, range selection calls onChange with from+to
- JTimePicker: renders, value displayed, onChange fires on valid input, clamped on blur

---

## Exports

All 13 components + their prop interfaces added to `packages/jarvis-ui/src/index.ts` in Task 5 (or at end of each task — implementer's choice, but all must be present after Task 5).

---

## Testing Strategy

- Vitest + React Testing Library (already configured)
- All tests wrapped in `<JThemeProvider>` via a `Wrapper` helper
- No visual/animation assertions — test structure, props, user interactions
- Aim: every component has ≥5 tests covering: renders, primary prop, interaction, disabled state, slot/children
- Date pickers: mock `react-day-picker` is NOT needed — RTL renders it fine in jsdom

---

## Dependencies

| Package | Where | Why |
|---------|-------|-----|
| `react-day-picker` | `packages/jarvis-ui` dependencies | JDatePicker + JDateRangePicker |

No other new dependencies. JTimePicker is implemented inline with two number inputs.
