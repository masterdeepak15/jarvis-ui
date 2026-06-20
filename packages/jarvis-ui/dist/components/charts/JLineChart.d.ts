import { JChartPoint } from './JChartTypes';
export interface JLineChartProps {
    data: JChartPoint[];
    height?: string;
    colorVar?: string;
    showArea?: boolean;
    showDots?: boolean;
    showAxisLabels?: boolean;
    showGrid?: boolean;
    gridLines?: number;
}
export declare function JLineChart({ data, height, colorVar, showArea, showDots, showAxisLabels, showGrid, gridLines, }: JLineChartProps): import("react").JSX.Element;
//# sourceMappingURL=JLineChart.d.ts.map