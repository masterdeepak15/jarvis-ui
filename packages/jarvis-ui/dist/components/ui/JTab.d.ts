import { ReactNode } from 'react';
export interface JTabProps {
    tabKey: string;
    label: string;
    icon?: string;
    badge?: string;
    disabled?: boolean;
    children?: ReactNode;
}
export declare function JTab({ tabKey, children }: JTabProps): import("react").JSX.Element | null;
//# sourceMappingURL=JTab.d.ts.map