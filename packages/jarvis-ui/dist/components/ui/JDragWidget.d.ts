export interface JDragWidgetProps {
    title?: string;
    /** Initial X position (px) */
    defaultX?: number;
    /** Initial Y position (px) */
    defaultY?: number;
    /** Width of the widget */
    width?: number | string;
    /** Accent color variant */
    color?: 'cyan' | 'amber' | 'green' | 'red' | 'blue' | 'white';
    /** Show minimize button */
    collapsible?: boolean;
    /** Extra class for outer div */
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    /** Called when position changes */
    onMove?: (x: number, y: number) => void;
}
export declare function JDragWidget({ title, defaultX, defaultY, width, color, collapsible, className, style, children, onMove, }: JDragWidgetProps): import("react").JSX.Element;
//# sourceMappingURL=JDragWidget.d.ts.map