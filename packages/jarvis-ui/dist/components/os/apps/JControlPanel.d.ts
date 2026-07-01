import { ReactNode } from 'react';
export interface JControlSection {
    id: string;
    icon: string;
    label: string;
    component: ReactNode;
}
export interface JControlPanelProps {
    sections: JControlSection[];
    defaultSection?: string;
}
export declare function JControlPanel({ sections, defaultSection }: JControlPanelProps): import("react").JSX.Element;
//# sourceMappingURL=JControlPanel.d.ts.map