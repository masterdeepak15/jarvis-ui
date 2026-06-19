import { ReactNode } from 'react';
import { JColor } from '../../theme/JarvisTokens';
export interface JHudFrameProps {
    color?: JColor;
    systemLabel?: string;
    showTop?: boolean;
    showBottom?: boolean;
    showDots?: boolean;
    showLive?: boolean;
    showWaveform?: boolean;
    showTicks?: boolean;
    showRec?: boolean;
    contentPadding?: string;
    children?: ReactNode;
    topContent?: ReactNode;
    bottomContent?: ReactNode;
}
export declare function JHudFrame({ color, systemLabel, showTop, showBottom, showDots, showLive, showWaveform, showTicks, showRec, contentPadding, children, topContent, bottomContent, }: JHudFrameProps): import("react").JSX.Element;
//# sourceMappingURL=JHudFrame.d.ts.map