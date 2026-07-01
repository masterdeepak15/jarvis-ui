import { ReactNode } from 'react';
export interface OSNotifyConfig {
    title: string;
    body?: string;
    icon?: string;
    duration?: number;
}
export interface OSNotifyRecord {
    id: string;
    title: string;
    body?: string;
    icon?: string;
    timestamp: string;
}
interface OSNotifyContextValue {
    notify: (config: OSNotifyConfig) => void;
    recent: OSNotifyRecord[];
    clearAll: () => void;
}
export declare function useOSNotify(): OSNotifyContextValue;
/** Returns null when called outside JOSNotificationProvider (safe for optional consumers). */
export declare function useOSNotifyOptional(): OSNotifyContextValue | null;
export declare function JOSNotificationProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export {};
//# sourceMappingURL=JOSNotification.d.ts.map