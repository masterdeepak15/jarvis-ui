import type { JColor } from '../../theme/JarvisTokens'
import { JarvisTokens } from '../../theme/JarvisTokens'

export type JHudLabelVariant = 'chip' | 'callout' | 'circuit' | 'badge' | 'panel'

export interface JHudLabelProps {
  variant?:  JHudLabelVariant
  text:      string
  subText?:  string
  value?:    string
  color?:    JColor
  showDot?:  boolean
  showLine?: boolean
}

export function JHudLabel({ variant = 'chip', text, subText, value, color = 'cyan', showDot = true, showLine = true }: JHudLabelProps) {
  const outerClass = JarvisTokens.cls('j-hl', `j-hl-${variant}`, JarvisTokens.color(color))

  let inner: React.ReactNode

  switch (variant) {
    case 'chip':
      inner = (
        <div className="j-hl-chip">
          {showDot && <span className="j-hl-pip" />}
          <span className="j-hl-text">{text}</span>
          {value && <span className="j-hl-val">{value}</span>}
          {showLine && <div className="j-hl-line-h" />}
        </div>
      )
      break

    case 'callout':
      inner = (
        <div className="j-hl-callout">
          <div className="j-hl-callout-inner">
            {subText && <div className="j-hl-sub">{subText}</div>}
            <div className="j-hl-main">{text}</div>
          </div>
          {showLine && (
            <div className="j-hl-callout-line">
              <div className="j-hl-line-seg" />
              <div className="j-hl-line-dot" />
            </div>
          )}
        </div>
      )
      break

    case 'circuit':
      inner = (
        <div className="j-hl-circuit">
          <div className="j-hl-cir-bracket">
            <div className="j-hl-cir-label">{text}</div>
            {value && <div className="j-hl-cir-val">{value}</div>}
          </div>
          {showLine && (
            <div className="j-hl-cir-arm">
              <div className="j-hl-cir-node" />
              <div className="j-hl-cir-track" />
              <div className="j-hl-cir-node j-hl-cir-node-end" />
            </div>
          )}
        </div>
      )
      break

    case 'badge':
      inner = (
        <div className="j-hl-badge">
          <div className="j-hl-badge-ring">
            <span className="j-hl-badge-val">{value ?? text}</span>
          </div>
          <div className="j-hl-badge-label">{text}</div>
        </div>
      )
      break

    case 'panel':
      inner = (
        <div className="j-hl-panel">
          <div className="j-hl-panel-top">
            {subText && <span className="j-hl-panel-sub">{subText}</span>}
          </div>
          <div className="j-hl-panel-body">
            <span className="j-hl-panel-main">{text}</span>
            {value && <span className="j-hl-panel-val">{value}</span>}
          </div>
          <div className="j-hl-panel-scan" />
        </div>
      )
      break
  }

  return <div className={outerClass}>{inner}</div>
}
