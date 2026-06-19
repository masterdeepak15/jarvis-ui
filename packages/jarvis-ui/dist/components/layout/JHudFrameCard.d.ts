import { ReactNode } from 'react';
import { JColor } from '../../theme/JarvisTokens';
export type JFrameStyle = 'Alpha' | 'Beta' | 'Gamma' | 'Delta';
export interface JHudFrameCardProps {
    frameStyle?: JFrameStyle;
    color?: JColor;
    title?: string;
    frameId?: string;
    showStatusDot?: boolean;
    width?: string;
    height?: string;
    children?: ReactNode;
}
export declare function JHudFrameCard({ frameStyle, color, title, frameId, showStatusDot, width, height, children, }: JHudFrameCardProps): import("react").JSX.Element;
//# sourceMappingURL=JHudFrameCard.d.ts.map