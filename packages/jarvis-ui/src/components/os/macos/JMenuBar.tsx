export interface JMenuBarMenu {
  label: string
  items: { label: string; shortcut?: string; onClick: () => void; divider?: boolean }[]
}

export function JMenuBar(_props: { appName?: string; menus?: JMenuBarMenu[] }) {
  return <div data-testid="j-os-menubar" className="j-os-menubar" />
}
