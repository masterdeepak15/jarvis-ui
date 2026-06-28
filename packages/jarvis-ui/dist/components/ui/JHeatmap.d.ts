export interface JHeatmapCell {
    value: number;
    label?: string;
    tooltip?: string;
}
export interface JHeatmapProps {
    /** 2D grid data. rows × cols */
    data: JHeatmapCell[][];
    /** Color palette */
    color?: 'cyan' | 'amber' | 'green' | 'red';
    /** Cell size in px */
    cellSize?: number;
    /** Gap between cells */
    gap?: number;
    /** Show value inside cell */
    showValue?: boolean;
    /** Title */
    title?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare function JHeatmap({ data, color, cellSize, gap, showValue, title, className, style, }: JHeatmapProps): import("react").JSX.Element;
//# sourceMappingURL=JHeatmap.d.ts.map