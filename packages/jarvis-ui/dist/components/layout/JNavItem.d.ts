import { JColor } from '../../theme/JarvisTokens';
export interface JNavItemProps {
    href?: string;
    icon?: string;
    label?: string;
    badge?: string;
    active?: boolean;
    color?: JColor;
    onClick?: () => void;
}
export declare function JNavItem({ href, icon, label, badge, active, onClick }: JNavItemProps): import("react").JSX.Element;
//# sourceMappingURL=JNavItem.d.ts.map