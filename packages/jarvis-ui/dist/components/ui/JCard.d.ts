import { ReactNode } from 'react';
import { JCardStyle, JColor } from '../../theme/JarvisTokens';
export interface JCardProps {
    cardStyle?: JCardStyle;
    color?: JColor;
    header?: ReactNode;
    footer?: ReactNode;
    padding?: string;
    children?: ReactNode;
}
export declare function JCard({ cardStyle, color, header, footer, padding, children, }: JCardProps): import("react").JSX.Element;
//# sourceMappingURL=JCard.d.ts.map