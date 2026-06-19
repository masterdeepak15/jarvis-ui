import { ReactNode } from 'react';
import { JColor } from '../../theme/JarvisTokens';
export interface JPageLayoutProps {
    systemName?: string;
    version?: string;
    color?: JColor;
    showSidebar?: boolean;
    sidebarWidth?: string;
    navLabel?: string;
    showTicks?: boolean;
    showWaveform?: boolean;
    showLive?: boolean;
    showRec?: boolean;
    contentPadding?: string;
    sidebar?: ReactNode;
    sidebarFooter?: ReactNode;
    topBar?: ReactNode;
    bottomBar?: ReactNode;
    children?: ReactNode;
}
export declare function JPageLayout({ systemName, version, color, showSidebar, sidebarWidth, navLabel, showTicks, showWaveform, showLive, showRec, contentPadding, sidebar, sidebarFooter, topBar, bottomBar, children, }: JPageLayoutProps): import("react").JSX.Element;
//# sourceMappingURL=JPageLayout.d.ts.map