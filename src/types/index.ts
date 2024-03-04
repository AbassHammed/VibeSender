import { SVGProps } from 'react';

import { settingPage } from '@/pages/settings/Settings';
import * as Dialog from '@radix-ui/react-dialog';

const DialogRoot = Dialog.Root;
const DialogTrigger = Dialog.Trigger;
const DialogPortal = Dialog.Portal;
const DialogOverlay = Dialog.Overlay;
const DialogContent = Dialog.Content;
const DialogTittle = Dialog.Title;
const DialogDescription = Dialog.Description;
const DialogClose = Dialog.Close;

export {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTittle,
  DialogDescription,
  DialogClose,
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type notif = 'info' | 'success' | 'warn' | 'error';

export type color = 'default' | 'success' | 'danger' | 'warning';

export type User = {
  uid: string;
  email: string;
  fullName: string;
  userName: string;
  jobDescription: string;
  bio: string;
  status: string;
  lang: string;
  following: number;
  lastSeen: string;
  dateBirth: string;
  streetName: string;
  postalCode: string;
  stateprovince: string;
  country: string;
  imageUrl: string;
  createdAt: string;
  deletedAt: string;
};

export type SideNavItem = {
  title: string;
  path: string;
  onClick: () => void;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type NavItemType = {
  icon?: {
    icon: React.ReactNode;
    fillIcon: React.ReactNode;
  };
  label: string;
  href: string;
};

export type MobileNavItemType = {
  icon?: {
    icon: React.ReactNode;
    fillIcon: React.ReactNode;
  };
  href: string;
};

export type notification = {
  id: string;
  notif: string;
  message: string;
  url?: string;
  createdAt: string;
  dismissed: boolean;
};

export type SettingsNavItemType = {
  title: string;
  href: settingPage;
};

export type Article = {
  article_id: string;
  title: string;
  link: string;
  keywords: string;
  creator: string;
  video_url: string;
  description: string;
  content: string;
  pubDate: string;
  image_url: string;
  source_id: string;
  source_url: string;
  source_icon: string;
  source_priority: number;
  country: [string[]];
  category: [string[]];
  language: string;
  ai_tags: [string[]];
  ai_region: string;
  sentiment: string;
  sentiment_stats: {
    positive: number;
    neutral: number;
    negative: number;
  };
};

export type Articles = {
  status: string;
  totalResults: number;
  results: Article[];
  nextPage: string;
};
