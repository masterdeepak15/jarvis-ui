import { ReactNode } from 'react';
export interface JDesktopApp {
    id: string;
    icon: string;
    label: string;
    component: ReactNode;
    defaultWidth?: number;
    defaultHeight?: number;
}
export interface JDesktopProps {
    theme: 'windows11' | 'macos';
    apps: JDesktopApp[];
    wallpaper?: string;
    compactBreakpoint?: number;
    initialWindows?: string[];
}
export declare function JDesktop({ theme, apps, wallpaper, compactBreakpoint, initialWindows, }: JDesktopProps): import("react").JSX.Element;
//# sourceMappingURL=JDesktop.d.ts.map