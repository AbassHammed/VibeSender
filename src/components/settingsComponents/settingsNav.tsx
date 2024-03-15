import React from 'react';

import Link from 'next/link';

import { buttonVariants } from '@/Components/UserInterface';
import { cn } from '@/lib/utils';
import { settingPage } from '@/pages/settings';

interface SidebarNavProps {
  items: {
    href: settingPage;
    title: string;
  }[];
  setVariant: React.Dispatch<React.SetStateAction<settingPage>>;
  variant: settingPage;
}

const SettingsNav: React.FC<SidebarNavProps> = ({ items, setVariant, variant }) => {
  const toggle = (path: settingPage) => {
    setVariant(path);
  };

  return (
    <nav className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1')}>
      {items.map(item => (
        <Link
          onClick={() => toggle(item.href)}
          key={item.href}
          href={`#${item.href}`}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            variant === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start',
          )}>
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default SettingsNav;
