export interface JWidgetSlot {
    id: string;
    x: number;
    y: number;
    width?: number;
    title?: string;
    color?: 'cyan' | 'amber' | 'green' | 'red' | 'blue';
    content: React.ReactNode;
}
export interface JHudCanvasProps {
    /** Initial widget positions */
    widgets: JWidgetSlot[];
    /** Canvas height */
    height?: number | string;
    /** Show grid overlay */
    showGrid?: boolean;
    /** Grid size px */
    gridSize?: number;
    /** Snap to grid */
    snapToGrid?: boolean;
    /** Background color */
    background?: string;
    className?: string;
    style?: React.CSSProperties;
    /** Called when any widget is moved */
    onWidgetMove?: (id: string, x: number, y: number) => void;
}
export declare function JHudCanvas({ widgets: initialWidgets, height, showGrid, gridSize, snapToGrid, background, className, style, onWidgetMove, }: JHudCanvasProps): import("react").JSX.Element;
//# sourceMappingURL=JHudCanvas.d.ts.map