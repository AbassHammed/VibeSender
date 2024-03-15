import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MediumSideBarAvatar } from '@/Components/Avatar';
import { MediumLarge } from '@/Components/FriendRequest';
import { MediumLargeSheet } from '@/Components/Notifications';
import Spinner from '@/Components/Spinner';
import { useAuth, useSearch, useSession } from '@/hooks';
import { NavItem1, NavItem2 } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MobileNavItemType } from '@/types';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { CiSearch } from 'react-icons/ci';
import { FiSearch } from 'react-icons/fi';

function MobileSideNavItem({ href, icon }: MobileNavItemType) {
  const [animationParent] = useAutoAnimate();
  const pathname = usePathname();
  const { setSearchEnabled } = useSearch();
  const isActivePage = pathname === href;
  return (
    <Link
      ref={animationParent}
      href={href}
      onClick={() => setSearchEnabled(false)}
      className="flex gap-2 items-center p-2 transition-all rounded-lg cursor-pointer hover:bg-muted w-[100%]">
      <div className="w-[35px] h-[35px] text-3xl">{isActivePage ? icon?.fillIcon : icon?.icon}</div>
    </Link>
  );
}

export default function MobileSideBar() {
  const [animationParent] = useAutoAnimate();
  const { sessionData } = useSession();
  const { user, loading } = useAuth();
  const { setSearchEnabled, isSearchEnabled } = useSearch();

  if (!sessionData?.currentUser || !user || loading) {
    return <Spinner />;
  }

  return (
    <div
      className={cn(
        'h-screen overflow-y-auto w-fit fixed hidden md:block lg:hidden p-5  pt-2  flex-col gap-3 border-r-[1px]  md:w-[80px]',
      )}>
      <div className="h-20 flex items-center mb-16 dark:hidden">
        <Link href="/" className="flex-none">
          <Image src="/light.svg" alt="Logo" width={50} height={50} />
        </Link>
      </div>

      <div className="h-20 items-center mb-16 dark:flex hidden light:hidden">
        <Link href="/" className="flex-none">
          <Image src="/dark.svg" alt="Logo" width={50} height={50} />
        </Link>
      </div>

      {NavItem1.map((d, idx) => (
        <MobileSideNavItem key={idx} icon={d.icon} href={d.href} />
      ))}
      <button
        ref={animationParent}
        onClick={() => setSearchEnabled(prev => !prev)}
        className="flex gap-2 items-center p-2 transition-all rounded-lg cursor-pointer hover:bg-muted w-full">
        <div className="w-[35px] h-[35px] text-3xl">
          {' '}
          {isSearchEnabled ? <FiSearch /> : <CiSearch />}
        </div>
      </button>
      {NavItem2.map((d, idx) => (
        <MobileSideNavItem key={idx} icon={d.icon} href={d.href} />
      ))}

      <div className="flex flex-col items-center justify-end py-4 bottom-0 fixed">
        <div className="my-2">
          <MediumLarge />
        </div>
        <div className=" my-2">
          <MediumLargeSheet />
        </div>
        <div className="my-2">
          <MediumSideBarAvatar profileUser={sessionData?.currentUser} />
        </div>
      </div>
    </div>
  );
}
