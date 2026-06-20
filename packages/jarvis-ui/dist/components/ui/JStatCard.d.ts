import { ReactNode } from 'react';
import { JCardStyle, JColor, JState } from '../../theme/JarvisTokens';
export interface JStatCardDataRow {
    label: string;
    value: string;
    barPercent?: number;
}
export interface JStatCardProps {
    cardStyle?: JCardStyle;
    color?: JColor;
    padding?: string;
    title: string;
    value: string;
    sub?: string;
    state?: JState;
    badge?: string;
    badgeColor?: JColor;
    showStatusDot?: boolean;
    barValue?: number;
    dataRows?: JStatCardDataRow[];
    children?: ReactNode;
}
export declare function JStatCard({ cardStyle, color, padding, title, value, sub, state, badge, badgeColor, showStatusDot, barValue, dataRows, children, }: JStatCardProps): import("react").JSX.Element;
//# sourceMappingURL=JStatCard.d.ts.map