export type JThemePreset = 'cyan' | 'amber' | 'green' | 'red' | 'purple' | 'white';
export interface JarvisTheme {
    name: string;
    preset: JThemePreset;
    accent: string;
    accentMid: string;
    accentDim: string;
    accentDeep: string;
    warn: string;
    err: string;
    ok: string;
    bg: string;
    bgCard: string;
    bgCardAlt: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textDim: string;
    durScan: string;
    durPulse: string;
    durSpin: string;
    durShine: string;
    durCorner: string;
    notch: string;
    notchLg: string;
    railW: string;
}
export declare function toCss(t: JarvisTheme): string;
export declare const PRESETS: Record<JThemePreset, JarvisTheme>;
//# sourceMappingURL=JarvisTheme.d.ts.map