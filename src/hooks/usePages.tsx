import { useMemo } from 'react';

import { useSidebarContext } from '@/contexts/sideBarContext';
import { SideNavItem } from '@/types';
import { Icon } from '@iconify/react';

const usePages = () => {
  const { toggleLinkActive } = useSidebarContext();

  const SIDENAV_ITEMS: SideNavItem[] = useMemo(
    () => [
      {
        title: 'Messages',
        path: '/conversations',
        icon: <Icon icon="lucide:mail" width="24" height="24" />,
        onClick: () => toggleLinkActive('/conversations'),
      },
      {
        title: 'Friends',
        path: '/users',
        icon: <Icon icon="lucide:home" width="24" height="24" />,
        onClick: () => toggleLinkActive('/users'),
      },
      {
        title: 'Settings',
        path: '/settings',
        icon: <Icon icon="lucide:settings" width="24" height="24" />,
        onClick: () => toggleLinkActive('/settings'),
        submenu: true,
        subMenuItems: [
          {
            title: 'Account',
            path: '/settings/account',
            onClick: () => toggleLinkActive('/settings/account'),
          },
          {
            title: 'Privacy',
            path: '/settings/privacy',
            onClick: () => toggleLinkActive('/settings/privacy'),
          },
        ],
      },
      {
        title: 'Help',
        path: '/help',
        icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
        onClick: () => toggleLinkActive('/help'),
      },
    ],
    [toggleLinkActive],
  );

  return SIDENAV_ITEMS;
};

export default usePages;
