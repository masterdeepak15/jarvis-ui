import { JColor, JSize } from '../../theme/JarvisTokens';
export interface JTextAreaProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    rows?: number;
    resize?: 'none' | 'vertical' | 'both';
    color?: JColor;
    size?: JSize;
}
export declare function JTextArea({ value, defaultValue, onChange, placeholder, disabled, readOnly, error, rows, resize, size, }: JTextAreaProps): import("react").JSX.Element;
//# sourceMappingURL=JTextArea.d.ts.map