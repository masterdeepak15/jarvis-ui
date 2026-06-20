import { JColor } from '../../theme/JarvisTokens';
export interface JTimePickerProps {
    value?: string;
    onChange?: (time: string) => void;
    placeholder?: string;
    disabled?: boolean;
    format?: '12h' | '24h';
    color?: JColor;
}
export declare function JTimePicker({ value, onChange, disabled, format, }: JTimePickerProps): import("react").JSX.Element;
//# sourceMappingURL=JTimePicker.d.ts.map