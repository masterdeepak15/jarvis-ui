import { JColor } from '../../theme/JarvisTokens';
export type JHudLabelVariant = 'chip' | 'callout' | 'circuit' | 'badge' | 'panel';
export interface JHudLabelProps {
    variant?: JHudLabelVariant;
    text: string;
    subText?: string;
    value?: string;
    color?: JColor;
    showDot?: boolean;
    showLine?: boolean;
}
export declare function JHudLabel({ variant, text, subText, value, color, showDot, showLine }: JHudLabelProps): import("react").JSX.Element;
//# sourceMappingURL=JHudLabel.d.ts.map