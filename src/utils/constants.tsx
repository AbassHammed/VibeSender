import { settingPage } from '@/pages/settings/Settings';
import { NavItemType } from '@/types';
import { BsBell, BsFillBellFill } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { FiSearch } from 'react-icons/fi';
import { HiUsers } from 'react-icons/hi';
import { HiOutlineUsers } from 'react-icons/hi2';
import {
  IoChatbubblesOutline,
  IoChatbubblesSharp,
  IoSettingsOutline,
  IoSettingsSharp,
} from 'react-icons/io5';
import { PiNotepad, PiNotepadFill } from 'react-icons/pi';

export const NavItem: NavItemType[] = [
  {
    icon: {
      icon: <IoChatbubblesOutline />,
      fillIcon: <IoChatbubblesSharp />,
    },
    label: 'Messages',
    href: '/conversations',
  },
  {
    icon: {
      icon: <HiOutlineUsers />,
      fillIcon: <HiUsers />,
    },
    label: 'Groups',
    href: '#',
  },
  {
    icon: {
      icon: <CiSearch />,
      fillIcon: <FiSearch />,
    },
    label: 'Search',
    href: '/search',
  },
  {
    icon: {
      icon: <BsBell />,
      fillIcon: <BsFillBellFill />,
    },
    label: 'Notifications',
    href: '#',
  },

  {
    icon: {
      icon: <PiNotepad />,
      fillIcon: <PiNotepadFill />,
    },
    label: 'News',
    href: '#',
  },

  {
    icon: {
      icon: <IoSettingsOutline />,
      fillIcon: <IoSettingsSharp />,
    },
    label: 'Settings ',
    href: '/settings',
  },
];

type SettingsNavItemType = {
  title: string;
  href: settingPage;
};

export const SettingsNavItem: SettingsNavItemType[] = [
  {
    title: 'Profile',
    href: 'profile',
  },
  {
    title: 'Account',
    href: 'account',
  },
];
