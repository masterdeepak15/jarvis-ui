export interface JArcReactorProps {
    /** Power level 0-100 */
    level?: number;
    /** Size in px */
    size?: number;
    /** Color */
    color?: 'cyan' | 'amber' | 'green' | 'red' | 'blue';
    /** Show label */
    label?: string;
    /** Animate outer ring */
    animated?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare function JArcReactor({ level, size, color, label, animated, className, style, }: JArcReactorProps): import("react").JSX.Element;
//# sourceMappingURL=JArcReactor.d.ts.map