import React, { useEffect } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

import { useAuth, useSession } from '@/hooks';

import { MobileAvatar } from '../Avatar';
import Loading from '../Loading';
import { MobileNotif } from '../Notifications';

const HeaderMobile: React.FC = () => {
  const { sessionData } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading: authLoading } = useAuth();
  const showNotif = !['/settings'].includes(pathname);

  useEffect(() => {
    if (!sessionData) {
      router.push('/');
      return;
    }
  }, [sessionData, router]);

  if (!user || authLoading || !sessionData?.currentUser) {
    return <Loading />;
  }

  return (
    <div className="fixed md:hidden inset-x-0 z-30 top-0 flex flex-row justify-between p-2 w-full h-12 border-b bg-white dark:bg-black">
      <div className="flex items-center space-x-4">
        <Image src="/logo.svg" width={100} height={100} alt="Logo" />
      </div>

      <div className=" md:hidden ">
        {showNotif ? <MobileNotif /> : <MobileAvatar profileUser={sessionData?.currentUser} />}
      </div>
    </div>
  );
};
export default HeaderMobile;
