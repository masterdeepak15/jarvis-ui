import { JColor } from '../../theme/JarvisTokens';
export interface JArcMeterProps {
    level: number;
    totalArcs?: number;
    color?: JColor;
    orientation?: 'horizontal' | 'vertical';
    showLabel?: boolean;
    label?: string;
    showValue?: boolean;
    arcWidth?: string;
    arcGap?: string;
}
export declare function JArcMeter({ level, totalArcs, color: _color, orientation, showLabel, label, showValue, arcWidth, arcGap, }: JArcMeterProps): import("react").JSX.Element;
//# sourceMappingURL=JArcMeter.d.ts.map