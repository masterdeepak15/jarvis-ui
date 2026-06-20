import { JChartPoint, JChartOrientation } from './JChartTypes';
export interface JBarChartProps {
    data: JChartPoint[];
    height?: string;
    colorVar?: string;
    orientation?: JChartOrientation;
    showGrid?: boolean;
    showAxisLabels?: boolean;
    showValues?: boolean;
    gridLines?: number;
}
export declare function JBarChart({ data, height, colorVar, orientation, showGrid, showAxisLabels, showValues, gridLines, }: JBarChartProps): import("react").JSX.Element;
//# sourceMappingURL=JBarChart.d.ts.map