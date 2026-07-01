export interface JProcess {
    pid: number;
    name: string;
    cpu: number;
    memory: number;
    status: 'running' | 'suspended' | 'stopped';
}
export interface JTaskManagerProps {
    processes: JProcess[];
    onKill?: (pid: number) => void;
}
export declare function JTaskManager({ processes, onKill }: JTaskManagerProps): import("react").JSX.Element;
//# sourceMappingURL=JTaskManager.d.ts.map