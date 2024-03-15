import React from 'react';

import { ErrorIcon, InfoIcon, SuccessIcon, WarnIcon, XIcon } from '@/Components/Icons';
import { notificationStyles } from '@/data';
import { cn } from '@/lib/utils';
import { notif } from '@/types';

interface NotificationModProps {
  notif: notif;
  message: string;
  url?: string;
  onClose: () => void;
}

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
