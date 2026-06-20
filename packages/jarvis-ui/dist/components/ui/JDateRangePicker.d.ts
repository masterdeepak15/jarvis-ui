import { JColor } from '../../theme/JarvisTokens';
export interface DateRange {
    from?: Date;
    to?: Date;
}
export interface JDateRangePickerProps {
    value?: DateRange;
    onChange?: (range: DateRange) => void;
    placeholder?: string;
    disabled?: boolean;
    color?: JColor;
}
export declare function JDateRangePicker({ value, onChange, placeholder, disabled, }: JDateRangePickerProps): import("react").JSX.Element;
//# sourceMappingURL=JDateRangePicker.d.ts.map