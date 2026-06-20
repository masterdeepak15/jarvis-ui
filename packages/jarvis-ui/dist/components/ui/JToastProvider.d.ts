import { ReactNode } from 'react';
import { JState } from '../../theme/JarvisTokens';
interface ToastCtxValue {
    show: (state: JState, message: string, title?: string, duration?: number) => string;
    dismiss: (id: string) => void;
}
export declare function useToast(): ToastCtxValue;
export interface JToastProviderProps {
    children: ReactNode;
}
export declare function JToastProvider({ children }: JToastProviderProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=JToastProvider.d.ts.map