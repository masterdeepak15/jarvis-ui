export interface JKPITickerItem {
    label: string;
    value: string;
    /** Change delta e.g. "+2.4%" */
    delta?: string;
    /** positive / negative / neutral */
    trend?: 'up' | 'down' | 'flat';
}
export interface JKPITickerProps {
    items: JKPITickerItem[];
    /** Scroll speed px/s */
    speed?: number;
    /** Color */
    color?: 'cyan' | 'amber' | 'green' | 'red';
    /** Height px */
    height?: number;
    /** Pause on hover */
    pauseOnHover?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare function JKPITicker({ items, speed, color, height, pauseOnHover, className, style, }: JKPITickerProps): import("react").JSX.Element;
//# sourceMappingURL=JKPITicker.d.ts.map