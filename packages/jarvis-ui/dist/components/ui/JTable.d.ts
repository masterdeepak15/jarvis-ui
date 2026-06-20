export interface JTableColumn {
    label: string;
    key: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    isBadge?: boolean;
}
export type JTableRow = Record<string, unknown>;
export interface JTableProps {
    columns: JTableColumn[];
    rows?: JTableRow[];
    stateColumn?: string;
    showFooter?: boolean;
    footerLabel?: string;
}
export declare function JTable({ columns, rows, stateColumn, showFooter, footerLabel, }: JTableProps): import("react").JSX.Element;
//# sourceMappingURL=JTable.d.ts.map