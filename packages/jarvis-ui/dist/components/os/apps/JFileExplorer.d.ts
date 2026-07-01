export interface JFileNode {
    id: string;
    name: string;
    type: 'file' | 'folder';
    icon?: string;
    children?: JFileNode[];
    meta?: Record<string, string>;
}
export interface JFileExplorerProps {
    tree: JFileNode[];
    onOpen?: (node: JFileNode) => void;
    onSelect?: (node: JFileNode) => void;
    initialPath?: string[];
}
export declare function JFileExplorer({ tree, onOpen, onSelect: onSelectProp, initialPath }: JFileExplorerProps): import("react").JSX.Element;
//# sourceMappingURL=JFileExplorer.d.ts.map