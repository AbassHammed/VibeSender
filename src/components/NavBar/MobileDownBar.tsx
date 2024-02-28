import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { MobileNavItemType } from '@/types';
import { MobileNavItem } from '@/utils/constants';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const MobileDownBar: React.FC = () => {
  function MobileSideNavItem({ href, icon }: MobileNavItemType) {
    const [animationParent] = useAutoAnimate();
    const pathname = usePathname();
    const isActivePage = pathname === href;
    return (
      <Link
        ref={animationParent}
        href={href}
        className="flex items-center p-2 transition-all  cursor-pointer w-[100%]">
        <div className="w-[35px] h-[35px] text-3xl">
          {isActivePage ? icon?.fillIcon : icon?.icon}
        </div>
      </Link>
    );
  }

  const links = MobileNavItem.map((d, idx) => (
    <MobileSideNavItem key={idx} icon={d.icon} href={d.href} />
  ));

  return (
    <div
      className={cn(
        `fixed md:hidden inset-x-0 z-30 bottom-0 mt-5 flex w-full h-12 transition-all bg-inherit items-center justify-between border-t  light:bg-white dark:bg-black`,
      )}>
      {links}
    </div>
  );
};
export default MobileDownBar;
