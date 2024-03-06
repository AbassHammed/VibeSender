import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useAuth, useScroll, useSession } from '@/hooks';
import { cn } from '@/utils/utils';

import { StatusAvatar } from '../Avatar';
import { MediumLarge } from '../FriendRequest';
import Loading from '../Loading';
import { MediumLargeSheet } from '../Notifications';

const Header = () => {
  const scrolled = useScroll(5);
  const { sessionData } = useSession();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

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
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full hidden lg:block transition-all border-b border-gray-200`,
        {
          'border-b border-gray-200 light:bg-white/75 backdrop-blur-lg': scrolled,
        },
      )}>
      <div className="flex h-[56px] items-center justify-end px-4">
        <div className=" flex flex-row">
          <MediumLarge />
          <MediumLargeSheet />
          <StatusAvatar profileUser={sessionData?.currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Header;
