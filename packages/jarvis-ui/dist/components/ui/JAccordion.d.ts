import { ReactNode } from 'react';
import { JColor, JState } from '../../theme/JarvisTokens';
export interface JAccordionProps {
    title: string;
    icon?: string;
    badge?: string;
    defaultOpen?: boolean;
    isOpen?: boolean;
    onIsOpenChange?: (open: boolean) => void;
    state?: JState;
    color?: JColor;
    children?: ReactNode;
}
export declare function JAccordion({ title, icon, badge, defaultOpen, isOpen: controlledOpen, onIsOpenChange, state, color, children, }: JAccordionProps): import("react").JSX.Element;
//# sourceMappingURL=JAccordion.d.ts.map