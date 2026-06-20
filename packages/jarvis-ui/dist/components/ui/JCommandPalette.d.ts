import { JState } from '../../theme/JarvisTokens';
export interface JCommand {
    label: string;
    key: string;
    icon?: string;
    group?: string;
    state?: JState;
    description?: string;
}
export interface JCommandPaletteProps {
    visible: boolean;
    onClose: () => void;
    commands: JCommand[];
    onExecute: (cmd: JCommand) => void;
    placeholder?: string;
    isListening?: boolean;
}
export declare function JCommandPalette({ visible, onClose, commands, onExecute, placeholder, isListening, }: JCommandPaletteProps): import("react").JSX.Element | null;
//# sourceMappingURL=JCommandPalette.d.ts.map