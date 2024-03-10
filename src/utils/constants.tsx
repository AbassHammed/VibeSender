import { conversation, MobileNavItemType, NavItemType, SettingsNavItemType } from '@/types';
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
    href: '/conversations',
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
    href: '/search',
  },
  {
    icon: {
      icon: <PiNotepad />,
      fillIcon: <PiNotepadFill />,
    },
    href: '/news',
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
];

export const NavItem2: NavItemType[] = [
  {
    icon: {
      icon: <PiNotepad />,
      fillIcon: <PiNotepadFill />,
    },
    label: 'News',
    href: '/news',
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

export const mockConversations: conversation[] = [
  {
    conversationId: 'conv1',
    participants: ['qUOBTPeDzATjJSw0yUjgccihtgE2', 'qUOBTPeDzATjJSw0yUjgccihtgE2'],
    lastMessage: {
      userId: 'qUOBTPeDzATjJSw0yUjgccihtgE2',
      message: 'Hey, are we still on for tomorrow?',
      timestamp: '2024-03-10T15:00:00Z',
      read: false,
      type: 'text',
    },
    lastUpdate: '2024-03-10T15:00:00Z',
  },
  {
    conversationId: 'conv2',
    participants: ['qUOBTPeDzATjJSw0yUjgccihtgE2', 'qUOBTPeDzATjJSw0yUjgccihtgE2'],
    lastMessage: {
      userId: 'qUOBTPeDzATjJSw0yUjgccihtgE2',
      message: 'Just sent the documents. Let me know if you need any changes.',
      timestamp: '2024-03-09T12:30:00Z',
      read: true,
      type: 'text',
    },
    lastUpdate: '2024-03-09T12:30:00Z',
  },
  {
    conversationId: 'conv3',
    participants: ['qUOBTPeDzATjJSw0yUjgccihtgE2', 'qUOBTPeDzATjJSw0yUjgccihtgE2'],
    lastMessage: {
      userId: 'qUOBTPeDzATjJSw0yUjgccihtgE2',
      message: 'Loved the photos from the trip!',
      timestamp: '2024-03-08T09:20:00Z',
      read: true,
      type: 'text',
    },
    lastUpdate: '2024-03-08T09:20:00Z',
  },
];
