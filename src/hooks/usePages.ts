import { useMemo } from 'react';

import { usePathname } from 'next/navigation';

import { useSidebarContext } from '@/contexts/sideBarContext';
import { auth } from '@/firebase/firebase';
import { useSignOut } from 'react-firebase-hooks/auth';
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';

const usePages = () => {
  const [signOut] = useSignOut(auth);
  const pathname = usePathname();
  const { toggleLinkActive } = useSidebarContext();

  const pages = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        active: pathname === '/conversations',
        onClick: () => toggleLinkActive('/conversation'),
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        active: pathname === '/users',
        onClick: () => toggleLinkActive('/users'),
      },
      {
        label: 'Logout',
        onClick: () => signOut(),
        href: '/',
        icon: HiArrowLeftOnRectangle,
        active: false,
      },
    ],
    [pathname, signOut, toggleLinkActive],
  );

  return pages;
};

export default usePages;
