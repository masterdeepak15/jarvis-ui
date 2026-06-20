import { ReactNode } from 'react';
import { JState } from '../../theme/JarvisTokens';
export interface JRadialItemDef {
    key: string;
    icon: string;
    label: string;
    angle: number;
    state: JState;
    onClick: () => void;
}
type RegisterFn = (item: JRadialItemDef) => void;
export declare const RadialMenuContext: import('react').Context<RegisterFn | null>;
export declare function useRadialMenu(): RegisterFn | null;
export interface JRadialMenuProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    triggerLabel?: string;
    radius?: number;
    centerSize?: string;
    children?: ReactNode;
}
export declare function JRadialMenu({ open: _open, onOpenChange, triggerLabel, radius, centerSize, children, }: JRadialMenuProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=JRadialMenu.d.ts.map