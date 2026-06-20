import { JColor, JSize } from '../../theme/JarvisTokens';
export interface JInputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'search';
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    color?: JColor;
    size?: JSize;
}
export declare function JInput({ type, value, defaultValue, onChange, placeholder, disabled, readOnly, error, size, }: JInputProps): import("react").JSX.Element;
//# sourceMappingURL=JInput.d.ts.map