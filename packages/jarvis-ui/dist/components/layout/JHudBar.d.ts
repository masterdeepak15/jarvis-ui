import { ReactNode } from 'react';
import { JColor, JAnimSpeed } from '../../theme/JarvisTokens';
export type JHudBarPosition = 'top' | 'bottom';
export interface JHudBarProps {
    position?: JHudBarPosition;
    color?: JColor;
    animSpeed?: JAnimSpeed;
    systemLabel?: string;
    showDots?: boolean;
    showWaveform?: boolean;
    showTicks?: boolean;
    showLive?: boolean;
    showRec?: boolean;
    tickCount?: number;
    tickActive?: number;
    children?: ReactNode;
}
export declare function JHudBar({ position, color, animSpeed, systemLabel, showDots, showWaveform, showTicks, showLive, showRec, tickCount, tickActive, children, }: JHudBarProps): import("react").JSX.Element;
//# sourceMappingURL=JHudBar.d.ts.map