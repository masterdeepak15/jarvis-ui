import type { ReactNode } from 'react'
import { useJTabsContext } from './JTabs'

export interface JTabProps {
  tabKey:    string
  label:     string
  icon?:     string
  badge?:    string
  disabled?: boolean
  children?: ReactNode
}

export function JTab({ tabKey, children }: JTabProps) {
  const ctx = useJTabsContext()
  if (!ctx || ctx.activeTab !== tabKey) return null
  return (
    <div
      role="tabpanel"
      id={`panel-${tabKey}`}
      aria-labelledby={`tab-${tabKey}`}
    >
      {children}
    </div>
  )
}

// Static marker — JTabs uses this to identify JTab children during Children.forEach
;(JTab as any)._isJTab = true
