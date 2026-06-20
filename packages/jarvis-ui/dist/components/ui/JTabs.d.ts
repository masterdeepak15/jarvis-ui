import { ReactNode } from 'react';
import { JColor } from '../../theme/JarvisTokens';
interface JTabsCtxValue {
    activeTab: string;
    selectTab: (key: string) => void;
}
export declare function useJTabsContext(): JTabsCtxValue | null;
export interface JTabsProps {
    activeTab?: string;
    onTabChange?: (key: string) => void;
    color?: JColor;
    children: ReactNode;
}
export declare function JTabs({ activeTab: controlledTab, onTabChange, children }: JTabsProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=JTabs.d.ts.map