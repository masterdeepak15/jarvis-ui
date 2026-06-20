import { JColor } from '../../theme/JarvisTokens';
export interface JCheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    color?: JColor;
}
export declare function JCheckbox({ checked, defaultChecked, onChange, label, disabled, }: JCheckboxProps): import("react").JSX.Element;
//# sourceMappingURL=JCheckbox.d.ts.map