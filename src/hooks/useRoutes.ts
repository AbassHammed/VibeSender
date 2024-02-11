import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useSidebarContext } from '@/contexts/sideBarContext';

const useRoutes = () => {
  const [signOut] = useSignOut(auth);
  const pathname = usePathname();
  const { toggleLinkActive } = useSidebarContext();

  const routes = useMemo(
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
      },
    ],
    [pathname, signOut, toggleLinkActive],
  );

  return routes;
};

export default useRoutes;
