import { ReactNode } from 'react';
import { JState } from '../../theme/JarvisTokens';
export interface JAlertProps {
    state?: JState;
    title?: string;
    children?: ReactNode;
    dismissible?: boolean;
    blink?: boolean;
    onDismiss?: () => void;
}
export declare function JAlert({ state, title, children, dismissible, blink, onDismiss }: JAlertProps): import("react").JSX.Element | null;
//# sourceMappingURL=JAlert.d.ts.map