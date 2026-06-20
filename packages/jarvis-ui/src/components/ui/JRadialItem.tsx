import { useEffect } from 'react'
import type { JState } from '../../theme/JarvisTokens'
import { useRadialMenu } from './JRadialMenu'

export interface JRadialItemProps {
  icon?:    string
  label?:   string
  angle?:   number
  state?:   JState
  onClick?: () => void
}

export function JRadialItem({
  icon    = '⊞',
  label   = '',
  angle   = 0,
  state   = 'active',
  onClick,
}: JRadialItemProps) {
  const register = useRadialMenu()

  useEffect(() => {
    register?.({
      key:     `${label}-${angle}`,
      icon,
      label,
      angle,
      state,
      onClick: onClick ?? (() => {}),
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
