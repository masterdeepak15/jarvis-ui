import { JColor, JSize } from '../../theme/JarvisTokens';
export interface JSelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface JSelectProps {
    options: JSelectOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    color?: JColor;
    size?: JSize;
}
export declare function JSelect({ options, value, defaultValue, onChange, placeholder, disabled, error, size, }: JSelectProps): import("react").JSX.Element;
//# sourceMappingURL=JSelect.d.ts.map