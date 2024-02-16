import React, { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/useAuth';
import useScroll from '@/hooks/useScroll';
import { useSession } from '@/hooks/useSession';
import { cn } from '@/utils/utils';

import UserAvatar from '../Avatar/StatusAvatar';
import Loading from '../Loading';

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
      className={cn(`sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`, {
        'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
      })}>
      <div className="flex h-[56px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex flex-row space-x-3 items-center justify-center md:hidden">
            <span className="font-bold text-xl flex ">VibeSender</span>
          </Link>
        </div>

        <div className="hidden md:block ">
          <UserAvatar profileUser={sessionData?.currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Header;
