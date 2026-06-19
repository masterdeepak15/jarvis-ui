import { describe, it, expect } from 'vitest'
import { JarvisTokens } from './JarvisTokens'

describe('JarvisTokens.color', () => {
  it('maps cyan → j-color-cyan', () => expect(JarvisTokens.color('cyan')).toBe('j-color-cyan'))
  it('maps amber → j-color-amber', () => expect(JarvisTokens.color('amber')).toBe('j-color-amber'))
  it('maps ghost → j-color-ghost', () => expect(JarvisTokens.color('ghost')).toBe('j-color-ghost'))
  it('returns empty string for undefined', () => expect(JarvisTokens.color(undefined)).toBe(''))
})

describe('JarvisTokens.size', () => {
  it('maps xs → j-size-xs', () => expect(JarvisTokens.size('xs')).toBe('j-size-xs'))
  it('maps md → j-size-md', () => expect(JarvisTokens.size('md')).toBe('j-size-md'))
  it('maps xl → j-size-xl', () => expect(JarvisTokens.size('xl')).toBe('j-size-xl'))
  it('returns empty string for undefined', () => expect(JarvisTokens.size(undefined)).toBe(''))
})

describe('JarvisTokens.variant', () => {
  it('maps solid → j-variant-solid', () => expect(JarvisTokens.variant('solid')).toBe('j-variant-solid'))
  it('maps danger → j-variant-danger', () => expect(JarvisTokens.variant('danger')).toBe('j-variant-danger'))
})

describe('JarvisTokens.state', () => {
  it('maps active → j-state-active', () => expect(JarvisTokens.state('active')).toBe('j-state-active'))
  it('maps error → j-state-error', () => expect(JarvisTokens.state('error')).toBe('j-state-error'))
  it('maps processing → j-state-processing', () => expect(JarvisTokens.state('processing')).toBe('j-state-processing'))
  it('returns empty string for undefined', () => expect(JarvisTokens.state(undefined)).toBe(''))
})

describe('JarvisTokens.animSpeed', () => {
  it('maps normal → j-anim-normal', () => expect(JarvisTokens.animSpeed('normal')).toBe('j-anim-normal'))
  it('maps off → j-anim-off', () => expect(JarvisTokens.animSpeed('off')).toBe('j-anim-off'))
})

describe('JarvisTokens.cardStyle', () => {
  it('maps CornerBracket → j-card-s1', () => expect(JarvisTokens.cardStyle('CornerBracket')).toBe('j-card-s1'))
  it('maps Notched → j-card-s2', () => expect(JarvisTokens.cardStyle('Notched')).toBe('j-card-s2'))
  it('maps SideRail → j-card-s3', () => expect(JarvisTokens.cardStyle('SideRail')).toBe('j-card-s3'))
  it('maps GlowBorder → j-card-s4', () => expect(JarvisTokens.cardStyle('GlowBorder')).toBe('j-card-s4'))
  it('maps PartialBorder → j-card-s5', () => expect(JarvisTokens.cardStyle('PartialBorder')).toBe('j-card-s5'))
  it('maps DangerPulse → j-card-s6', () => expect(JarvisTokens.cardStyle('DangerPulse')).toBe('j-card-s6'))
  it('maps Hexagonal → j-card-s7', () => expect(JarvisTokens.cardStyle('Hexagonal')).toBe('j-card-s7'))
  it('maps Radar → j-card-s8', () => expect(JarvisTokens.cardStyle('Radar')).toBe('j-card-s8'))
  it('maps DoubleFrame → j-card-s9', () => expect(JarvisTokens.cardStyle('DoubleFrame')).toBe('j-card-s9'))
  it('returns empty string for undefined', () => expect(JarvisTokens.cardStyle(undefined)).toBe(''))
})

describe('JarvisTokens.buttonShape', () => {
  it('maps LeftNotch → j-btn-left-notch', () => expect(JarvisTokens.buttonShape('LeftNotch')).toBe('j-btn-left-notch'))
  it('maps RightNotch → j-btn-right-notch', () => expect(JarvisTokens.buttonShape('RightNotch')).toBe('j-btn-right-notch'))
  it('maps BothNotch → j-btn-both-notch', () => expect(JarvisTokens.buttonShape('BothNotch')).toBe('j-btn-both-notch'))
  it('maps Parallelogram → j-btn-parallelogram', () => expect(JarvisTokens.buttonShape('Parallelogram')).toBe('j-btn-parallelogram'))
  it('maps GhostSkew → j-btn-ghost-skew', () => expect(JarvisTokens.buttonShape('GhostSkew')).toBe('j-btn-ghost-skew'))
  it('maps BracketFrame → j-btn-bracket (NOT j-btn-bracket-frame)', () => expect(JarvisTokens.buttonShape('BracketFrame')).toBe('j-btn-bracket'))
  it('maps Hexagonal → j-btn-hex (NOT j-btn-hexagonal)', () => expect(JarvisTokens.buttonShape('Hexagonal')).toBe('j-btn-hex'))
  it('maps IconSquare → j-btn-icon-sq (NOT j-btn-icon-square)', () => expect(JarvisTokens.buttonShape('IconSquare')).toBe('j-btn-icon-sq'))
  it('maps ScanFull → j-btn-scan-full', () => expect(JarvisTokens.buttonShape('ScanFull')).toBe('j-btn-scan-full'))
})

describe('JarvisTokens.cls', () => {
  it('joins strings with spaces', () => {
    expect(JarvisTokens.cls('a', 'b', 'c')).toBe('a b c')
  })
  it('filters out falsy values', () => {
    expect(JarvisTokens.cls('a', false, null, undefined, '', 'b')).toBe('a b')
  })
  it('returns empty string when all values are falsy', () => {
    expect(JarvisTokens.cls(false, null, undefined)).toBe('')
  })
})
