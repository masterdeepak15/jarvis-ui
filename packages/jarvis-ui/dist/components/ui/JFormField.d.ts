import { ReactNode } from 'react';
export interface JFormFieldProps {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    children: ReactNode;
}
export declare function JFormField({ label, error, hint, required, children }: JFormFieldProps): import("react").JSX.Element;
//# sourceMappingURL=JFormField.d.ts.map