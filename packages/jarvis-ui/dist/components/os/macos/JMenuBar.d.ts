export interface JMenuBarMenu {
    label: string;
    items: {
        label: string;
        shortcut?: string;
        onClick: () => void;
        divider?: boolean;
    }[];
}
export interface JMenuBarProps {
    appName?: string;
    menus?: JMenuBarMenu[];
}
export declare function JMenuBar({ appName, menus }: JMenuBarProps): import("react").JSX.Element;
//# sourceMappingURL=JMenuBar.d.ts.map