export type JColor = 'cyan' | 'blue' | 'amber' | 'red' | 'green' | 'ghost' | 'white';
export type JSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type JVariant = 'solid' | 'outline' | 'ghost' | 'danger' | 'scan';
export type JState = 'idle' | 'active' | 'processing' | 'warning' | 'error' | 'success';
export type JAnimSpeed = 'off' | 'slow' | 'normal' | 'fast';
export type JCardStyle = 'CornerBracket' | 'Notched' | 'SideRail' | 'GlowBorder' | 'PartialBorder' | 'DangerPulse' | 'Hexagonal' | 'Radar' | 'DoubleFrame';
export type JButtonShape = 'LeftNotch' | 'RightNotch' | 'BothNotch' | 'Parallelogram' | 'GhostSkew' | 'BracketFrame' | 'Hexagonal' | 'IconSquare' | 'ScanFull';
export declare const JarvisTokens: {
    color: (c?: JColor) => string;
    size: (s?: JSize) => string;
    variant: (v?: JVariant) => string;
    state: (s?: JState) => string;
    animSpeed: (a?: JAnimSpeed) => string;
    cardStyle: (cs?: JCardStyle) => string;
    buttonShape: (bs?: JButtonShape) => string;
    cls: (...parts: (string | false | null | undefined)[]) => string;
};
//# sourceMappingURL=JarvisTokens.d.ts.map