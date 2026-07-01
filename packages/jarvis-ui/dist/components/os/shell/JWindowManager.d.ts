import { ReactNode } from 'react';
export interface WindowState {
    id: string;
    appId: string;
    title: string;
    icon?: string;
    x: number;
    y: number;
    width: number;
    height: number;
    minimized: boolean;
    maximized: boolean;
    zIndex: number;
    content: ReactNode;
}
export interface OpenWindowConfig {
    appId: string;
    title: string;
    icon?: string;
    width?: number;
    height?: number;
    content: ReactNode;
}
export interface WindowManagerContextValue {
    windows: WindowState[];
    focusedId: string | null;
    compactMode: boolean;
    desktopSize: {
        w: number;
        h: number;
    };
    openWindow: (config: OpenWindowConfig) => string;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    restoreWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    moveWindow: (id: string, x: number, y: number) => void;
    resizeWindow: (id: string, w: number, h: number) => void;
    setDesktopSize: (w: number, h: number) => void;
}
export declare function useWindowManager(): WindowManagerContextValue;
export interface JWindowManagerProps {
    compactBreakpoint?: number;
    children: ReactNode;
}
export declare function JWindowManager({ compactBreakpoint, children }: JWindowManagerProps): import("react").JSX.Element;
//# sourceMappingURL=JWindowManager.d.ts.map