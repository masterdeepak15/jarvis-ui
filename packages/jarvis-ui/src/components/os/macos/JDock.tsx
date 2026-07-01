import type { JDesktopApp } from '../shell/JDesktop'

export function JDock(_props: { apps: JDesktopApp[] }) {
  return <div data-testid="j-os-dock" className="j-os-dock" />
}
