import { ReactNode } from 'react';
import { JColor } from '../../theme/JarvisTokens';
export interface JSidebarProps {
    systemName?: string;
    version?: string;
    navLabel?: string;
    width?: string;
    color?: JColor;
    children?: ReactNode;
    footer?: ReactNode;
}
export declare function JSidebar({ systemName, version, navLabel, width, color, children, footer, }: JSidebarProps): import("react").JSX.Element;
//# sourceMappingURL=JSidebar.d.ts.map