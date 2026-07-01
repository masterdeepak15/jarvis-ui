import { ReactNode } from 'react';
export type OSTheme = 'windows11' | 'macos';
export declare function useOSTheme(): OSTheme;
export interface JOSThemeProviderProps {
    theme: OSTheme;
    children: ReactNode;
}
export declare function JOSThemeProvider({ theme, children }: JOSThemeProviderProps): import("react").JSX.Element;
//# sourceMappingURL=JOSThemeProvider.d.ts.map