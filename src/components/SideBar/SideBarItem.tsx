import Link from 'next/link';

import clsx from 'clsx';
import { IconType } from 'react-icons';

interface SideBarItemProps {
  label?: string;
  icon: IconType;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const SideBarItem: React.FC<SideBarItemProps> = ({ label, href, icon: Icon, active, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick} key={label}>
      <Link
        href={href}
        className={clsx(
          `
            group 
            flex 
            gap-x-3 
            rounded-md 
            p-3 
            text-sm 
            leading-6 
            font-semibold 
            text-gray-500 
            hover:text-black 
            hover:bg-blue-500
          `,
          active && 'bg-blue-500 text-black',
        )}>
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
      </Link>
    </li>
  );
};

export default SideBarItem;
