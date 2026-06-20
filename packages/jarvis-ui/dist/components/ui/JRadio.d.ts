import { JColor } from '../../theme/JarvisTokens';
export interface JRadioProps {
    checked?: boolean;
    onChange?: (value: string) => void;
    label?: string;
    value: string;
    name?: string;
    disabled?: boolean;
    color?: JColor;
}
export declare function JRadio({ checked, onChange, label, value, name, disabled }: JRadioProps): import("react").JSX.Element;
//# sourceMappingURL=JRadio.d.ts.map