import type { JDesktopApp } from '../shell/JDesktop'

export function JTaskbar(_props: { apps: JDesktopApp[] }) {
  return <div data-testid="j-os-taskbar" className="j-os-taskbar" />
}
