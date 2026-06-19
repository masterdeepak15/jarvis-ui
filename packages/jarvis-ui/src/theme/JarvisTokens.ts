export type JColor     = 'cyan' | 'blue' | 'amber' | 'red' | 'green' | 'ghost' | 'white'
export type JSize      = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type JVariant   = 'solid' | 'outline' | 'ghost' | 'danger' | 'scan'
export type JState     = 'idle' | 'active' | 'processing' | 'warning' | 'error' | 'success'
export type JAnimSpeed = 'off' | 'slow' | 'normal' | 'fast'

export type JCardStyle =
  | 'CornerBracket' | 'Notched'    | 'SideRail'  | 'GlowBorder'
  | 'PartialBorder' | 'DangerPulse'| 'Hexagonal' | 'Radar' | 'DoubleFrame'

export type JButtonShape =
  | 'LeftNotch' | 'RightNotch' | 'BothNotch'   | 'Parallelogram'
  | 'GhostSkew' | 'BracketFrame'| 'Hexagonal'  | 'IconSquare' | 'ScanFull'

const CARD_STYLE_MAP: Record<JCardStyle, string> = {
  CornerBracket: 'j-card-s1',
  Notched:       'j-card-s2',
  SideRail:      'j-card-s3',
  GlowBorder:    'j-card-s4',
  PartialBorder: 'j-card-s5',
  DangerPulse:   'j-card-s6',
  Hexagonal:     'j-card-s7',
  Radar:         'j-card-s8',
  DoubleFrame:   'j-card-s9',
}

const BUTTON_SHAPE_MAP: Record<JButtonShape, string> = {
  LeftNotch:     'j-btn-left-notch',
  RightNotch:    'j-btn-right-notch',
  BothNotch:     'j-btn-both-notch',
  Parallelogram: 'j-btn-parallelogram',
  GhostSkew:     'j-btn-ghost-skew',
  BracketFrame:  'j-btn-bracket',
  Hexagonal:     'j-btn-hex',
  IconSquare:    'j-btn-icon-sq',
  ScanFull:      'j-btn-scan-full',
}

export const JarvisTokens = {
  color:       (c?: JColor)      => c  ? `j-color-${c}` : '',
  size:        (s?: JSize)       => s  ? `j-size-${s}` : '',
  variant:     (v?: JVariant)    => v  ? `j-variant-${v}` : '',
  state:       (s?: JState)      => s  ? `j-state-${s}` : '',
  animSpeed:   (a?: JAnimSpeed)  => a  ? `j-anim-${a}` : '',
  cardStyle:   (cs?: JCardStyle)    => cs  ? CARD_STYLE_MAP[cs] : '',
  buttonShape: (bs?: JButtonShape)  => bs  ? BUTTON_SHAPE_MAP[bs] : '',
  cls: (...parts: (string | false | null | undefined)[]) =>
    parts.filter(Boolean).join(' '),
}
