import { JColor } from '../../theme/JarvisTokens';
export type NType = 'chip' | 'hub' | 'diamond' | 'hex';
export type EdgeStyle = 'solid' | 'dashed' | 'dotted';
export interface NodeDef {
    id: string;
    label: string;
    x: number;
    y: number;
    type?: NType;
    color?: JColor;
    sub?: string;
    value?: string;
    pulse?: boolean;
}
export interface EdgeDef {
    from: string;
    to: string;
    color?: JColor;
    style?: EdgeStyle;
    arrow?: boolean;
    animated?: boolean;
    animDur?: number;
    label?: string;
}
export interface JNodeGraphProps {
    nodes: NodeDef[];
    edges: EdgeDef[];
    width?: string;
    height?: string;
    title?: string;
    showLegend?: boolean;
}
export declare function JNodeGraph({ nodes, edges, width, height, title, showLegend, }: JNodeGraphProps): import("react").JSX.Element;
//# sourceMappingURL=JNodeGraph.d.ts.map