import { JSparkTrend } from './JChartTypes';
export interface JSparklineProps {
    data: number[];
    width?: string;
    height?: string;
    showArea?: boolean;
    showTrend?: boolean;
    trend?: JSparkTrend;
    colorVar?: string;
}
export declare function JSparkline({ data, width, height, showArea, showTrend, trend, colorVar, }: JSparklineProps): import("react").JSX.Element;
//# sourceMappingURL=JSparkline.d.ts.map