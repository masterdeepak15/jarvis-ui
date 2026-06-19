# TASKS.md
> Updated: 2026-06-19 | Session #1

---

## 🔥 Active
| ID | Task | Started | Agent |
|----|------|---------|-------|
| T-0 | Design spec + .claude/ memory setup | 2026-06-19 | Claude Sonnet 4.6 |

---

## 📋 Backlog

### Phase 1 — Foundation (monorepo scaffolding + theme system)
| ID | Task | Priority | Notes |
|----|------|----------|-------|
| T-1 | Scaffold pnpm workspace monorepo | 🔴 High | `pnpm-workspace.yaml`, root `package.json`, both `packages/jarvis-ui` and `apps/docs` initialized |
| T-2 | Copy 4 CSS files from Blazor verbatim | 🔴 High | `jarvis-theme.css`, `jarvis-ui.css`, `jarvis-charts.css`, `jarvis-maps.css` |
| T-3 | Implement `JarvisTheme.ts` + 6 presets | 🔴 High | Mirror `JarvisTheme.cs` — same 30 properties, same 6 presets |
| T-4 | Implement `JarvisTokens.ts` enum resolvers | 🔴 High | `JColor`, `JSize`, `JVariant`, `JState`, `JAnimSpeed`, `JCardStyle`, `JButtonShape` |
| T-5 | Implement `JThemeContext.tsx` + `useTheme` hook | 🔴 High | React context, `setPreset()`, `setTheme()`, injects `<style id="jarvis-theme-vars">` |
| T-6 | Implement `JThemeProvider` component | 🔴 High | Wraps app, takes `preset` prop, uses `JThemeContext` |
| T-7 | Implement `JThemePicker` component | 🔴 High | 6 preset swatches + custom color inputs; mirrors `JThemePicker.razor` |
| T-8 | Configure Vite library build + `package.json` exports | 🔴 High | ESM + CJS output, peer deps external, CSS export path |
| T-9 | Configure Tailwind CSS in library + demo app | 🔴 High | `tailwind.config.ts` in both packages |

### Phase 2 — Layout Shell
| ID | Task | Priority | Notes |
|----|------|----------|-------|
| T-10 | `JHudBar` component | 🔴 High | Top/bottom HUD bar — dots, waveform, ticks, LIVE/REC; read `JHudBar.razor` first |
| T-11 | `JSidebar` component | 🔴 High | Left nav with brand header, nav slot, footer, time display; read `JSidebar.razor` first |
| T-12 | `JPageLayout` component | 🔴 High | Full app shell — fixed top/bottom bars, sidebar, content area; read `JPageLayout.razor` first |

### Phase 3 — Core UI
| ID | Task | Priority | Notes |
|----|------|----------|-------|
| T-13 | `JButton` (9 shapes) | 🔴 High | SVG polygon backgrounds for notched shapes; read `JButton.razor` first |
| T-14 | `JCard` (9 styles) | 🔴 High | CornerBracket, Notched, SideRail, GlowBorder, PartialBorder, DangerPulse, Hexagonal, Radar, DoubleFrame |
| T-15 | `JInput` | 🔴 High | Corner bracket accents, clip-path, label, helper text |
| T-16 | `JSpinner` | 🟡 Med | 3 concentric rotating rings + diamond center |
| T-17 | `JBadge` | 🟡 Med | Status badge |
| T-18 | `JProgress` | 🟡 Med | Progress bar |
| T-19 | `JAlert` | 🟡 Med | Alert box |
| T-20 | `JModal` | 🟡 Med | Modal dialog |
| T-21 | `JToast` + `JToastProvider` | 🟡 Med | Toast notifications |

### Phase 4 — Forms
| ID | Task | Priority | Notes |
|----|------|----------|-------|
| T-22 | `JTextArea` | 🟡 Med | Multi-line input |
| T-23 | `JSelect` | 🟡 Med | Dropdown select |
| T-24 | `JSlider` | 🟡 Med | Range slider |
| T-25 | `JToggle` | 🟡 Med | Toggle switch with diamond thumb |
| T-26 | `JCheckbox` | 🟡 Med | HUD-styled checkbox |
| T-27 | `JRadio` | 🟡 Med | HUD-styled radio |
| T-28 | `JFormField` | 🟡 Med | Form field wrapper |

### Phase 5 — Data
| ID | Task | Priority | Notes |
|----|------|----------|-------|
| T-29 | `JTable` + `JDataRow` | 🟡 Med | Data table with sorting/filtering |
| T-30 | `JAccordion` | 🟡 Med | Collapsible accordion |
| T-31 | `JPagination` | 🟡 Med | Pagination control |
| T-32 | `JStatCard` | 🟡 Med | Pre-wired stat/metric card wrapping JCard |
| T-33 | `JNavItem` | 🟡 Med | Navigation menu item |

### Phase 6 — Special / Advanced
| ID | Task | Priority | Notes |
|----|------|----------|-------|
| T-34 | `JOrb` | 🟡 Med | JARVIS identity orb with rotating rings |
| T-35 | `JCommandPalette` | 🟡 Med | Command palette overlay |
| T-36 | `JRadialMenu` + `JRadialItem` | 🟡 Med | Circular radial menu |
| T-37 | `JBootScreen` | 🟡 Med | Startup animation screen |
| T-38 | `JWaveform` | 🟡 Med | Audio waveform visualization |
| T-39 | `JNodeGraph` | 🟢 Low | Node/network visualization |
| T-40 | `JArcMeter` | 🟢 Low | Arc meter (mic level indicator) |
| T-41 | `JHudLabel` | 🟢 Low | HUD-styled label |
| T-42 | `JDivider` | 🟢 Low | Visual divider |
| T-43 | `JStatusPill` | 🟢 Low | Status indicator pill |
| T-44 | `JHudFrame` + `JHudFrameCard` | 🟢 Low | Basic HUD frame wrappers |
| T-45 | `JDatePicker` | 🟢 Low | Single date selection |
| T-46 | `JDateRangePicker` | 🟢 Low | Date range selection |
| T-47 | `JTimePicker` | 🟢 Low | Time selection |

### Phase 7 — Charts
| ID | Task | Priority | Notes |
|----|------|----------|-------|
| T-48 | `JBarChart` | 🟡 Med | Recharts BarChart wrapper; read `JBarChart.razor` first |
| T-49 | `JLineChart` | 🟡 Med | Recharts LineChart wrapper |
| T-50 | `JDonutChart` | 🟡 Med | Recharts PieChart wrapper |
| T-51 | `JGaugeChart` | 🟡 Med | Custom SVG arc (no Recharts primitive) |
| T-52 | `JRadarChart` | 🟡 Med | Recharts RadarChart wrapper |
| T-53 | `JSparkline` | 🟡 Med | Minimal Recharts LineChart |

### Phase 8 — Maps
| ID | Task | Priority | Notes |
|----|------|----------|-------|
| T-54 | Copy GeoJSON files from Blazor docs to `assets/geo/` | 🟡 Med | Bundle with library |
| T-55 | `JLeafletMap` | 🟡 Med | react-leaflet integration; read `jarvis-leaflet.js` + `JLeafletMap.razor` first |
| T-56 | `JGoogleMap` | 🟡 Med | @react-google-maps/api; read `jarvis-gmap.js` + `JGoogleMap.razor` first |
| T-57 | `JMapInfoWindow` | 🟡 Med | Shared HUD-styled popup |

### Demo App
| ID | Task | Priority | Notes |
|----|------|----------|-------|
| T-58 | Scaffold `apps/docs` Vite app | 🟡 Med | After library Phase 1 is done |
| T-59 | Demo pages for all component groups | 🟡 Med | One page per phase (layout, buttons, cards, forms, data, special, charts, maps) |
| T-60 | Wire `JThemePicker` into demo app header | 🟡 Med | Live theme switching in demo |
| T-61 | `barrel export` — add all components to `src/index.ts` | 🟡 Med | Do progressively after each phase |

---

## ✅ Done
| ID | Task | Completed | Session |
|----|------|-----------|---------|
| T-0 | Design spec + .claude/ memory setup | 2026-06-19 | #1 |

---

## 🚫 Blocked
*(none)*
