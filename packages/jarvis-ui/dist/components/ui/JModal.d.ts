import { ReactNode } from 'react';
export interface JModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    subTitle?: string;
    closable?: boolean;
    closeOnBackdrop?: boolean;
    width?: string;
    notchSize?: string;
    children?: ReactNode;
    footer?: ReactNode;
}
export declare function JModal({ open, onClose, title, subTitle, closable, closeOnBackdrop, width, notchSize, children, footer }: JModalProps): import('react').ReactPortal | null;
//# sourceMappingURL=JModal.d.ts.map