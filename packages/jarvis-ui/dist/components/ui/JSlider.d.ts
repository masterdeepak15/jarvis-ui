import { JColor } from '../../theme/JarvisTokens';
export interface JSliderProps {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    showValue?: boolean;
    color?: JColor;
}
export declare function JSlider({ value, defaultValue, onChange, min, max, step, disabled, showValue, }: JSliderProps): import("react").JSX.Element;
//# sourceMappingURL=JSlider.d.ts.map