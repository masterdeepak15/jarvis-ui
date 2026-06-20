import { JColor } from '../../theme/JarvisTokens';
export interface JDatePickerProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    color?: JColor;
}
export declare function JDatePicker({ value, onChange, placeholder, disabled, minDate, maxDate, }: JDatePickerProps): import("react").JSX.Element;
//# sourceMappingURL=JDatePicker.d.ts.map