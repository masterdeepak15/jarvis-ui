import { JColor } from '../../theme/JarvisTokens';
export interface JToggleProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    color?: JColor;
}
export declare function JToggle({ checked, defaultChecked, onChange, label, disabled, }: JToggleProps): import("react").JSX.Element;
//# sourceMappingURL=JToggle.d.ts.map