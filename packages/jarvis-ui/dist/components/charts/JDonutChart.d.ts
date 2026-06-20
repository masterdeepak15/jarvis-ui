import { JDonutSegment } from './JChartTypes';
export interface JDonutChartProps {
    data: JDonutSegment[];
    size?: string;
    thickness?: number;
    centerValue?: string;
    centerLabel?: string;
    showLegend?: boolean;
}
export declare function JDonutChart({ data, size, thickness, centerValue, centerLabel, showLegend, }: JDonutChartProps): import("react").JSX.Element;
//# sourceMappingURL=JDonutChart.d.ts.map