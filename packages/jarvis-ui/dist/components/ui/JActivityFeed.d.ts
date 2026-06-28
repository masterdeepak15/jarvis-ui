export interface JActivityFeedItem {
    id: string;
    time?: string;
    level?: 'active' | 'warning' | 'error' | 'success' | 'info';
    message: string;
    source?: string;
}
export interface JActivityFeedProps {
    items: JActivityFeedItem[];
    /** Max visible rows before scroll */
    maxRows?: number;
    /** Row height in px */
    rowHeight?: number;
    /** Auto scroll to bottom on new items */
    autoScroll?: boolean;
    /** Show timestamp */
    showTime?: boolean;
    /** Show source label */
    showSource?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare function JActivityFeed({ items, maxRows, rowHeight, autoScroll, showTime, showSource, className, style, }: JActivityFeedProps): import("react").JSX.Element;
//# sourceMappingURL=JActivityFeed.d.ts.map