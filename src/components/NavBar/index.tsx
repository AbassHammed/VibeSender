import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/hooks/useSession';
import { NavItemType } from '@/types';
import { NavItem } from '@/utils/constants';
import { cn } from '@/utils/utils';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import SideBarAvatar from '../Avatar/SideBarAvatar';
import Loading from '../Loading';

function SideNavItem({ href, icon, label }: NavItemType) {
  const [animationParent] = useAutoAnimate();
  const pathname = usePathname();
  const isActivePage = pathname === href;
  return (
    <Link
      ref={animationParent}
      href={href}
      className="flex gap-2 items-center p-2 transition-all rounded-lg cursor-pointer hover:bg-muted w-full">
      <div className="w-[35px] h-[35px] text-3xl">{isActivePage ? icon?.fillIcon : icon?.icon}</div>

      <p className={cn('text-[16px] hidden md:block transition-all ', isActivePage && 'font-bold')}>
        {label}
      </p>
    </Link>
  );
}

export default function Sidebar() {
  const { sessionData } = useSession();
  const { user, loading } = useAuth();

  if (!sessionData?.currentUser || !user || loading) {
    return <Loading />;
  }

  return (
    <div
      className={cn(
        'h-screen overflow-y-auto w-fit fixed md:pr-8  pt-2 flex flex-col gap-3 border-r-[1px] pl-[10px] md:w-60',
      )}>
      <Link href={'/'} className="p-2">
        <Image
          src="/navimg.png"
          width={100}
          height={100}
          alt="Logo"
          className="items-center"
          priority
        />
      </Link>

      {NavItem.map((d, idx) => (
        <SideNavItem key={idx} icon={d.icon} href={d.href} label={d.label} />
      ))}

      <div className="pb-2 bottom-0 fixed">
        <SideBarAvatar profileUser={sessionData?.currentUser} />
      </div>
    </div>
  );
}
