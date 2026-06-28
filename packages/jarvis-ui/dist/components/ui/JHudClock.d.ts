export interface JHudClockProps {
    /** Show analog ring */
    analog?: boolean;
    /** Color */
    color?: 'cyan' | 'amber' | 'green' | 'red' | 'blue' | 'white';
    /** Size of analog ring in px */
    size?: number;
    /** Show date below */
    showDate?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare function JHudClock({ analog, color, size, showDate, className, style, }: JHudClockProps): import("react").JSX.Element;
//# sourceMappingURL=JHudClock.d.ts.map