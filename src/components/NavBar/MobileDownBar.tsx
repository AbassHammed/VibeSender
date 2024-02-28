import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MobileNavItemType } from '@/types';
import { MobileNavItem } from '@/utils/constants';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const MobileSideNavItem = ({ href, icon }: MobileNavItemType) => {
  const [animationParent] = useAutoAnimate();
  const pathname = usePathname();
  const isActivePage = pathname === href;

  return (
    <Link
      ref={animationParent}
      href={href}
      className={`flex transition-all cursor-pointer ${isActivePage ? 'text-bold' : ''}`}>
      <div className="w-[35px] h-[35px] text-3xl">{isActivePage ? icon?.fillIcon : icon?.icon}</div>
    </Link>
  );
};

const MobileDownBar: React.FC = () => {
  const links = MobileNavItem.map((d, idx) => (
    <MobileSideNavItem key={idx} icon={d.icon} href={d.href} />
  ));

  return (
    <div className="fixed md:hidden inset-x-0 z-30 bottom-0 flex flex-row justify-between p-2 w-full h-12 border-t bg-white dark:bg-black">
      {links}
    </div>
  );
};

export default MobileDownBar;
