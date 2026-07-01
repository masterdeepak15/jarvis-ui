import { ReactNode } from 'react';
export interface OSNotifyConfig {
    title: string;
    body?: string;
    icon?: string;
    duration?: number;
}
interface OSNotifyContextValue {
    notify: (config: OSNotifyConfig) => void;
}
export declare function useOSNotify(): OSNotifyContextValue;
export declare function JOSNotificationProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export {};
//# sourceMappingURL=JOSNotification.d.ts.map