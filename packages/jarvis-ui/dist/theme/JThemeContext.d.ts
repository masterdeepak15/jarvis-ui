import { ReactNode } from 'react';
import { JarvisTheme, JThemePreset } from './JarvisTheme';
export interface ThemeContextValue {
    theme: JarvisTheme;
    setTheme: (theme: JarvisTheme) => void;
    setPreset: (preset: JThemePreset) => void;
}
interface JThemeProviderProps {
    children: ReactNode;
    preset?: JThemePreset;
    theme?: JarvisTheme;
}
export declare function JThemeProvider({ children, preset, theme: initialTheme }: JThemeProviderProps): import("react").JSX.Element;
export declare function useTheme(): ThemeContextValue;
export {};
//# sourceMappingURL=JThemeContext.d.ts.map