import { MobileNavItemType, NavItemType, SettingsNavItemType } from '@/types';
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

export const MobileNavItem: MobileNavItemType[] = [
  {
    icon: {
      icon: <IoChatbubblesOutline />,
      fillIcon: <IoChatbubblesSharp />,
    },
    href: '/messages',
  },
  {
    icon: {
      icon: <HiOutlineUsers />,
      fillIcon: <HiUsers />,
    },
    href: '#Groups',
  },
  {
    icon: {
      icon: <CiSearch />,
      fillIcon: <FiSearch />,
    },
    href: '/Search',
  },
  {
    icon: {
      icon: <PiNotepad />,
      fillIcon: <PiNotepadFill />,
    },
    href: '/News',
  },
  {
    icon: {
      icon: <IoSettingsOutline />,
      fillIcon: <IoSettingsSharp />,
    },
    href: '/settings',
  },
];

export const NavItem1: NavItemType[] = [
  {
    icon: {
      icon: <IoChatbubblesOutline />,
      fillIcon: <IoChatbubblesSharp />,
    },
    label: 'Messages',
    href: '/messages',
  },
  {
    icon: {
      icon: <HiOutlineUsers />,
      fillIcon: <HiUsers />,
    },
    label: 'Groups',
    href: '#',
  },
];

export const NavItem2: NavItemType[] = [
  {
    icon: {
      icon: <PiNotepad />,
      fillIcon: <PiNotepadFill />,
    },
    label: 'News',
    href: '/News',
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
