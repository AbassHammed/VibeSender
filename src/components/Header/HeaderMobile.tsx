import React, { useEffect } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

import { MobileAvatar } from '@/Components/Avatar';
import { Mobile } from '@/Components/FriendRequest';
import { MobileNotif } from '@/Components/Notifications';
import Spinner from '@/Components/Spinner';
import { useAuth, useSession } from '@/hooks';

const HeaderMobile: React.FC = () => {
  const { sessionData } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading: authLoading } = useAuth();
  const showNotif = !['/settings', '/search'].includes(pathname);
  const showAdd = ['/search'].includes(pathname);

  useEffect(() => {
    if (!sessionData) {
      router.push('/');
      return;
    }
  }, [sessionData, router]);

  if (!user || authLoading || !sessionData?.currentUser) {
    return <Spinner />;
  }

  return (
    <div className="fixed md:hidden inset-x-0 z-30 top-0 flex flex-row justify-between p-2 w-full h-12 border-b bg-white dark:bg-black">
      <div className="flex items-center space-x-4">
        <Image src="/logo.svg" width={100} height={100} alt="Logo" />
      </div>

      <div className=" md:hidden ">
        {showNotif ? (
          <MobileNotif />
        ) : showAdd ? (
          <Mobile />
        ) : (
          <MobileAvatar profileUser={sessionData?.currentUser} />
        )}
      </div>
    </div>
  );
};
export default HeaderMobile;
