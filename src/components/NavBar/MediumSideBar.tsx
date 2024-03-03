import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuth, useSession } from '@/hooks';
import { MobileNavItemType } from '@/types';
import { NavItem } from '@/utils/constants';
import { cn } from '@/utils/utils';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { MediumSideBarAvatar } from '../Avatar';
import Loading from '../Loading';
import { MediumLargeSheet } from '../Notifications';

function MobileSideNavItem({ href, icon }: MobileNavItemType) {
  const [animationParent] = useAutoAnimate();
  const pathname = usePathname();
  const isActivePage = pathname === href;
  return (
    <Link
      ref={animationParent}
      href={href}
      className="flex gap-2 items-center p-2 transition-all rounded-lg cursor-pointer hover:bg-muted w-[100%]">
      <div className="w-[35px] h-[35px] text-3xl">{isActivePage ? icon?.fillIcon : icon?.icon}</div>
    </Link>
  );
}

export default function MobileSideBar() {
  const { sessionData } = useSession();
  const { user, loading } = useAuth();

  if (!sessionData?.currentUser || !user || loading) {
    return <Loading />;
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

      {NavItem.map((d, idx) => (
        <MobileSideNavItem key={idx} icon={d.icon} href={d.href} />
      ))}

      <div className="flex flex-col items-center justify-end py-4 bottom-0 fixed">
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
