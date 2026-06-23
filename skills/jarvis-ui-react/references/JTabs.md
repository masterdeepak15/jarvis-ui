# JTabs · JTab

Tab navigation system. `JTabs` is the container; `JTab` is each individual tab.

## Import

```tsx
import { JTabs, JTab } from '@masterdeepak15/jarvis-ui'
```

## JTabs Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JTab[]` | — | `JTab` components |
| `defaultTab` | `string` | first tab key | Initially active tab key |
| `onTabChange` | `(key: string) => void` | — | Called when tab changes |

## JTab Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabKey` | `string` | — | Unique identifier for this tab |
| `label` | `string` | — | Tab header text |
| `icon` | `string` | — | Icon/emoji before the label |
| `children` | `ReactNode` | — | Tab panel content |

## Use Cases

### Basic tabs

```tsx
<JTabs>
  <JTab tabKey="overview" label="OVERVIEW" icon="⊞">
    <p>Overview content here</p>
  </JTab>
  <JTab tabKey="details" label="DETAILS" icon="◈">
    <p>Details content here</p>
  </JTab>
  <JTab tabKey="logs" label="LOGS" icon="▣">
    <p>Log entries here</p>
  </JTab>
</JTabs>
```

### Tabs with components

```tsx
<JTabs defaultTab="chart">
  <JTab tabKey="chart"  label="CHART"  icon="📊">
    <JLineChart data={lineData} lines={[{ key: 'value', color: 'var(--j-accent)' }]} />
  </JTab>
  <JTab tabKey="table"  label="TABLE"  icon="▣">
    <JTable columns={cols} rows={rows} />
  </JTab>
  <JTab tabKey="config" label="CONFIG" icon="⚙">
    <JFormField label="INTERVAL">
      <JSelect value={interval} onChange={setInterval} options={intervalOptions} />
    </JFormField>
  </JTab>
</JTabs>
```

### Tabs with change handler

```tsx
const [activeTab, setActiveTab] = useState('client')

<JTabs defaultTab="client" onTabChange={setActiveTab}>
  <JTab tabKey="client" label="CLIENT-SIDE" icon="◉">
    <TabClientSide />
  </JTab>
  <JTab tabKey="server" label="SERVER-SIDE" icon="◈">
    <TabServerSide />
  </JTab>
  <JTab tabKey="direct" label="DIRECT"      icon="▶">
    <TabDirect />
  </JTab>
</JTabs>
```

### Multi-section page with tabs

```tsx
// Each tab is a full page section
<JTabs>
  <JTab tabKey="inputs"    label="INPUT + TEXTAREA"  icon="✎"><TabInputs /></JTab>
  <JTab tabKey="select"    label="SELECT + TOGGLE"   icon="◐"><TabSelectToggle /></JTab>
  <JTab tabKey="slider"    label="SLIDER + CHECKBOX" icon="⊟"><TabSliderCheck /></JTab>
  <JTab tabKey="formfield" label="FORMFIELD"         icon="⊞"><TabFormField /></JTab>
  <JTab tabKey="datetime"  label="DATE + TIME"       icon="📅"><TabDateTime /></JTab>
</JTabs>
```

## Notes

- `JTab` components must be direct children of `JTabs`
- `tabKey` must be unique within each `JTabs` instance
- `icon` supports any string — emoji, unicode symbols, or text prefix
- Tab content is only rendered when the tab is active (not just hidden)
- `onTabChange` fires after the tab has already switched — use for analytics or side effects
