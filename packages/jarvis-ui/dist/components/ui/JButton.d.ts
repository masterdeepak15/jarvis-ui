import { ReactNode } from 'react';
import { JButtonShape, JColor, JSize, JVariant } from '../../theme/JarvisTokens';
export interface JButtonProps {
    shape?: JButtonShape;
    color?: JColor;
    size?: JSize;
    variant?: JVariant;
    loading?: boolean;
    disabled?: boolean;
    icon?: ReactNode;
    iconRight?: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    children?: ReactNode;
}
export declare function JButton({ shape, color, size, variant, loading, disabled, icon, iconRight, type, onClick, children, }: JButtonProps): import("react").JSX.Element;
//# sourceMappingURL=JButton.d.ts.map