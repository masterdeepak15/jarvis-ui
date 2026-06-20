import { JColor, JState } from '../../theme/JarvisTokens';
export interface JOrbProps {
    systemName?: string;
    size?: string;
    color?: JColor;
    state?: JState;
    listening?: boolean;
    onClick?: () => void;
}
export declare function JOrb({ systemName, size, state, listening, onClick, }: JOrbProps): import("react").JSX.Element;
//# sourceMappingURL=JOrb.d.ts.map