// Styles — consumers import once: import 'jarvis-ui/styles'
import './styles/jarvis-theme.css'
import './styles/jarvis-ui.css'
import './styles/jarvis-charts.css'
import './styles/jarvis-maps.css'
import './styles/jarvis-os.css'

// Theme system
export type { JarvisTheme, JThemePreset } from './theme/JarvisTheme'
export { PRESETS, toCss } from './theme/JarvisTheme'
export type { JColor, JSize, JVariant, JState, JAnimSpeed, JCardStyle, JButtonShape } from './theme/JarvisTokens'
export { JarvisTokens } from './theme/JarvisTokens'
export { JThemeProvider, useTheme } from './theme/JThemeContext'
export type { ThemeContextValue } from './theme/JThemeContext'

// Components — theme
export { JThemePicker } from './components/theme/JThemePicker'

// Components — layout
export type { JHudBarPosition, JHudBarProps } from './components/layout/JHudBar'
export { JHudBar } from './components/layout/JHudBar'
export type { JSpinnerProps } from './components/layout/JSpinner'
export { JSpinner } from './components/layout/JSpinner'
export type { JNavItemProps } from './components/layout/JNavItem'
export { JNavItem } from './components/layout/JNavItem'
export type { JSidebarProps } from './components/layout/JSidebar'
export { JSidebar } from './components/layout/JSidebar'
export type { JPageLayoutProps } from './components/layout/JPageLayout'
export { JPageLayout } from './components/layout/JPageLayout'
export type { JHudFrameProps } from './components/layout/JHudFrame'
export { JHudFrame } from './components/layout/JHudFrame'
export type { JFrameStyle, JHudFrameCardProps } from './components/layout/JHudFrameCard'
export { JHudFrameCard } from './components/layout/JHudFrameCard'

// Components — ui
export type { JButtonProps } from './components/ui/JButton'
export { JButton } from './components/ui/JButton'
export type { JCardProps } from './components/ui/JCard'
export { JCard } from './components/ui/JCard'
export type { JInputProps } from './components/ui/JInput'
export { JInput } from './components/ui/JInput'
export type { JTextAreaProps } from './components/ui/JTextArea'
export { JTextArea } from './components/ui/JTextArea'
export type { JSelectOption, JSelectProps } from './components/ui/JSelect'
export { JSelect } from './components/ui/JSelect'
export type { JCheckboxProps } from './components/ui/JCheckbox'
export { JCheckbox } from './components/ui/JCheckbox'
export type { JRadioProps } from './components/ui/JRadio'
export { JRadio } from './components/ui/JRadio'
export type { JToggleProps } from './components/ui/JToggle'
export { JToggle } from './components/ui/JToggle'
export type { JSliderProps } from './components/ui/JSlider'
export { JSlider } from './components/ui/JSlider'
export type { JFormFieldProps } from './components/ui/JFormField'
export { JFormField } from './components/ui/JFormField'
export type { JDatePickerProps } from './components/ui/JDatePicker'
export { JDatePicker } from './components/ui/JDatePicker'
export type { DateRange, JDateRangePickerProps } from './components/ui/JDateRangePicker'
export { JDateRangePicker } from './components/ui/JDateRangePicker'
export type { JTimePickerProps } from './components/ui/JTimePicker'
export { JTimePicker } from './components/ui/JTimePicker'

// Components — display atoms
export type { JBadgeShape, JBadgeProps } from './components/ui/JBadge'
export { JBadge } from './components/ui/JBadge'
export type { JStatusPillProps } from './components/ui/JStatusPill'
export { JStatusPill } from './components/ui/JStatusPill'
export type { JProgressVariant, JProgressProps } from './components/ui/JProgress'
export { JProgress } from './components/ui/JProgress'
export type { JDividerOrientation, JDividerProps } from './components/ui/JDivider'
export { JDivider } from './components/ui/JDivider'
export type { JHudLabelVariant, JHudLabelProps } from './components/ui/JHudLabel'
export { JHudLabel } from './components/ui/JHudLabel'

// Components — feedback
export type { JAlertProps } from './components/ui/JAlert'
export { JAlert } from './components/ui/JAlert'
export type { JDataRowProps } from './components/ui/JDataRow'
export { JDataRow } from './components/ui/JDataRow'

// Components — modal
export type { JModalProps } from './components/ui/JModal'
export { JModal } from './components/ui/JModal'

// Components — toast
export type { JToastProviderProps } from './components/ui/JToastProvider'
export { JToastProvider, useToast } from './components/ui/JToastProvider'

// Components — composite
export type { JStatCardDataRow, JStatCardProps } from './components/ui/JStatCard'
export { JStatCard } from './components/ui/JStatCard'

// Components — navigation
export type { JTabsProps } from './components/ui/JTabs'
export { JTabs } from './components/ui/JTabs'
export type { JTabProps } from './components/ui/JTab'
export { JTab } from './components/ui/JTab'
export type { JAccordionProps } from './components/ui/JAccordion'
export { JAccordion } from './components/ui/JAccordion'
export type { JPaginationProps } from './components/ui/JPagination'
export { JPagination } from './components/ui/JPagination'

// Components — HUD visualizations
export type { JArcMeterProps } from './components/ui/JArcMeter'
export { JArcMeter } from './components/ui/JArcMeter'
export type { JWaveformProps } from './components/ui/JWaveform'
export { JWaveform } from './components/ui/JWaveform'
export type { JOrbProps } from './components/ui/JOrb'
export { JOrb } from './components/ui/JOrb'

// Chart types
export type { JChartPoint, JDonutSegment, JRadarAxis } from './components/charts/JChartTypes'
export type { JSparkTrend, JChartOrientation }         from './components/charts/JChartTypes'

// Components — charts
export type { JSparklineProps }  from './components/charts/JSparkline'
export { JSparkline }            from './components/charts/JSparkline'
export type { JBarChartProps }   from './components/charts/JBarChart'
export { JBarChart }             from './components/charts/JBarChart'
export type { JLineChartProps }  from './components/charts/JLineChart'
export { JLineChart }            from './components/charts/JLineChart'
export type { JDonutChartProps } from './components/charts/JDonutChart'
export { JDonutChart }           from './components/charts/JDonutChart'
export type { JGaugeChartProps } from './components/charts/JGaugeChart'
export { JGaugeChart }           from './components/charts/JGaugeChart'
export type { JRadarChartProps } from './components/charts/JRadarChart'
export { JRadarChart }           from './components/charts/JRadarChart'

// Components — boot
export type { JBootScreenProps } from './components/ui/JBootScreen'
export { JBootScreen }           from './components/ui/JBootScreen'

// Components — interactive
export type { JTableColumn, JTableRow, JTableProps } from './components/ui/JTable'
export { JTable }                                    from './components/ui/JTable'
export type { JCommand, JCommandPaletteProps }       from './components/ui/JCommandPalette'
export { JCommandPalette }                           from './components/ui/JCommandPalette'

// Components — radial menu
export type { JRadialItemDef, JRadialMenuProps } from './components/ui/JRadialMenu'
export { JRadialMenu, RadialMenuContext, useRadialMenu } from './components/ui/JRadialMenu'
export type { JRadialItemProps }                 from './components/ui/JRadialItem'
export { JRadialItem }                           from './components/ui/JRadialItem'

// Components — HUD widgets (SHIELD / Iron Man style)
export type { JDragWidgetProps }    from './components/ui/JDragWidget'
export { JDragWidget }              from './components/ui/JDragWidget'
export type { JHudClockProps }      from './components/ui/JHudClock'
export { JHudClock }                from './components/ui/JHudClock'
export type { JArcReactorProps }    from './components/ui/JArcReactor'
export { JArcReactor }              from './components/ui/JArcReactor'
export type { JHeatmapCell, JHeatmapProps } from './components/ui/JHeatmap'
export { JHeatmap }                 from './components/ui/JHeatmap'
export type { JActivityFeedItem, JActivityFeedProps } from './components/ui/JActivityFeed'
export { JActivityFeed }            from './components/ui/JActivityFeed'
export type { JKPITickerItem, JKPITickerProps } from './components/ui/JKPITicker'
export { JKPITicker }               from './components/ui/JKPITicker'
export type { JWidgetSlot, JHudCanvasProps } from './components/ui/JHudCanvas'
export { JHudCanvas }               from './components/ui/JHudCanvas'

// Components — node graph
export type { NType, EdgeStyle, NodeDef, EdgeDef, JNodeGraphProps } from './components/ui/JNodeGraph'
export { JNodeGraph }                                                from './components/ui/JNodeGraph'

// Components — OS shell (Windows 11 / macOS desktop)
export type { OSTheme }                            from './components/os/shell/JOSThemeProvider'
export { JOSThemeProvider, useOSTheme }            from './components/os/shell/JOSThemeProvider'
export type { JDesktopApp, JDesktopProps }         from './components/os/shell/JDesktop'
export { JDesktop }                                from './components/os/shell/JDesktop'
export type { WindowState, OpenWindowConfig, WindowManagerContextValue, JWindowManagerProps } from './components/os/shell/JWindowManager'
export { JWindowManager, useWindowManager }        from './components/os/shell/JWindowManager'
export type { JWindowProps }                       from './components/os/shell/JWindow'
export { JWindow }                                 from './components/os/shell/JWindow'
export type { JStartMenuProps }                    from './components/os/windows/JStartMenu'
export { JStartMenu }                              from './components/os/windows/JStartMenu'
export { JTaskbar }                                from './components/os/windows/JTaskbar'
export { JDock }                                   from './components/os/macos/JDock'
export type { JMenuBarMenu, JMenuBarProps }        from './components/os/macos/JMenuBar'
export { JMenuBar }                                from './components/os/macos/JMenuBar'
export type { OSNotifyConfig }                     from './components/os/shared/JOSNotification'
export { JOSNotificationProvider, useOSNotify }    from './components/os/shared/JOSNotification'
