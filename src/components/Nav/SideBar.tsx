import React, { useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SideBarAvatar } from '@/Components/Avatar';
import Spinner from '@/Components/Spinner';
import { useAuth, useSearch, useSession } from '@/hooks';
import { NavItem1, NavItem2 } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { NavItemType } from '@/types';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { CiSearch } from 'react-icons/ci';
import { FiSearch } from 'react-icons/fi';

function SideNavItem({ href, icon, label }: NavItemType) {
  const [animationParent] = useAutoAnimate();
  const pathname = usePathname();
  const { setSearchEnabled } = useSearch();
  const isActivePage = pathname === href;
  return (
    <Link
      ref={animationParent}
      href={href}
      onClick={() => {
        setSearchEnabled(false);
      }}
      className="flex gap-2 items-center p-2 transition-all rounded-lg cursor-pointer hover:bg-muted w-full">
      <div className="w-[35px] h-[35px] text-3xl">{isActivePage ? icon?.fillIcon : icon?.icon}</div>

      <p className={cn('text-[16px] hidden md:block transition-all ', isActivePage && 'font-bold')}>
        {label}
      </p>
    </Link>
  );
}

export default function SideBar() {
  const [animationParent] = useAutoAnimate();
  const { sessionData } = useSession();
  const { user, loading } = useAuth();
  const { setSearchEnabled, isSearchEnabled } = useSearch();

  useEffect(() => {
    if (!isSearchEnabled) {
      const url = new URL(window.location.href);
      url.hash = ''; // Clear the hash part
      window.history.replaceState({}, '', url.href);
    }
  }, [isSearchEnabled]);

  if (!sessionData?.currentUser || !user || loading) {
    return <Spinner />;
  }

  return (
    <div
      className={cn(
        'h-screen overflow-y-auto w-fit fixed lg:pr-8 hidden lg:block  pt-2  flex-col gap-3 border-r-[1px] pl-[10px] lg:w-60',
      )}>
      <div className="h-20 flex items-center mb-16">
        <Link href="/" className="flex-none">
          <img src="/logo.svg" alt="Logo" width={180} />
        </Link>
      </div>

      {NavItem1.map((d, idx) => (
        <SideNavItem key={idx} icon={d.icon} href={d.href} label={d.label} />
      ))}
      <button
        ref={animationParent}
        onClick={() => setSearchEnabled(prev => !prev)}
        className="flex gap-2 items-center p-2 transition-all rounded-lg cursor-pointer hover:bg-muted w-full">
        <div className="w-[35px] h-[35px] text-3xl">
          {isSearchEnabled ? <FiSearch /> : <CiSearch />}
        </div>
        <p
          className={cn(
            'text-[16px] hidden md:block transition-all ',
            isSearchEnabled && 'font-bold',
          )}>
          Search
        </p>
      </button>
      {NavItem2.map((d, idx) => (
        <SideNavItem key={idx} icon={d.icon} href={d.href} label={d.label} />
      ))}

      <div className="pb-2 bottom-0 fixed">
        <SideBarAvatar profileUser={sessionData?.currentUser} />
      </div>
    </div>
  );
}
