import { JColor } from '../../theme/JarvisTokens';
export interface JPaginationProps {
    page: number;
    onPageChange: (page: number) => void;
    totalPages: number;
    showFirstLast?: boolean;
    showInfo?: boolean;
    pageSize?: number;
    color?: JColor;
}
export declare function JPagination({ page, onPageChange, totalPages, showFirstLast, showInfo, pageSize, }: JPaginationProps): import("react").JSX.Element;
//# sourceMappingURL=JPagination.d.ts.map