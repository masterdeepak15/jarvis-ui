import { ReactNode } from 'react';
import { JColor, JSize } from '../../theme/JarvisTokens';
export type JBadgeShape = 'angular' | 'hex' | 'diamond' | 'pill';
export interface JBadgeProps {
    color?: JColor;
    size?: JSize;
    shape?: JBadgeShape;
    blink?: boolean;
    showDot?: boolean;
    children?: ReactNode;
}
export declare function JBadge({ color, size, shape, blink, showDot, children }: JBadgeProps): import("react").JSX.Element;
//# sourceMappingURL=JBadge.d.ts.map