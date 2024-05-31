export interface SidebarLink {
  href: string;
  name: string;
}

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    href: '/table',
    name: 'Table'
  },
  {
    href: '/graph-dashboard',
    name: 'GraphDashboard'
  }
];
