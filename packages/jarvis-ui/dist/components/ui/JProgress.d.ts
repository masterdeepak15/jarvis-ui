import { JState } from '../../theme/JarvisTokens';
export type JProgressVariant = 'bar' | 'ticks';
export interface JProgressProps {
    value?: number;
    label?: string;
    state?: JState;
    variant?: JProgressVariant;
    indeterminate?: boolean;
    showPercent?: boolean;
    total?: number;
}
export declare function JProgress({ value, label, state, variant, indeterminate, showPercent, total, }: JProgressProps): import("react").JSX.Element;
//# sourceMappingURL=JProgress.d.ts.map