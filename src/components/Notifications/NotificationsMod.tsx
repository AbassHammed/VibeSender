import React from 'react';

import { cn } from '@/lib/utils';
import { notif } from '@/types';

import { ErrorIcon, InfoIcon, SuccessIcon, WarnIcon, XIcon } from '../Icons';

interface NotificationModProps {
  notif: notif;
  message: string;
  url?: string;
  onClose: () => void;
}

const notificationStyles = {
  error: {
    background: 'bg-red-50 border border-red-300',
    text: 'text-red-600',
    hover: 'hover:text-red-700',
  },
  info: {
    background: 'bg-blue-50 border border-blue-300',
    text: 'text-blue-600',
    hover: 'hover:text-blue-700',
  },
  warn: {
    background: 'bg-yellow-50 border border-yellow-300',
    text: 'text-yellow-600',
    hover: 'hover:text-yellow-700',
  },
  success: {
    background: 'bg-green-50 border border-green-300',
    text: 'text-green-600',
    hover: 'hover:text-green-700',
  },
};

const icons = { error: ErrorIcon, info: InfoIcon, success: SuccessIcon, warn: WarnIcon };

const NotificationMod: React.FC<NotificationModProps> = ({ message, notif, url, onClose }) => {
  const { background, text, hover } = notificationStyles[notif] || notificationStyles.success;
  const Icon = icons[notif] || SuccessIcon;

  return (
    <div className="w-full px-4 my-3 mb-5">
      <div className={cn(`flex justify-between p-4 rounded-md`, background)}>
        <div className="flex gap-3 sm:items-center">
          <div>
            <Icon />
          </div>
          <p className={cn(`sm:text-sm`, text)}>
            {message}{' '}
            {url && (
              <a href={url} className={cn(`underline font-medium`, hover)}>
                link
              </a>
            )}
          </p>
        </div>
        <button className={cn(text.replace('-600', '-500'))} onClick={onClose}>
          <XIcon />
        </button>
      </div>
    </div>
  );
};

export default NotificationMod;
