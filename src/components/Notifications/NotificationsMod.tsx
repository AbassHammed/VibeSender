import React from 'react';

import { cn } from '@/lib/utils';
import { notif } from '@/types';

import { ErrorIcon, InfoIcon, SuccessIcon, WarnIcon } from '../Icons';

interface NotificationModProps {
  notif: notif;
  message: string;
  url?: string;
}

const NotificationMod: React.FC<NotificationModProps> = ({ message, notif, url }) => (
  <div className="w-full px-4 my-3 mb-5">
    <div
      className={cn(
        `flex justify-between p-4 rounded-md `,
        notif === 'error'
          ? 'bg-red-50 border border-red-300'
          : notif === 'info'
            ? 'bg-blue-50 border border-blue-300'
            : notif === 'warn'
              ? 'bg-yellow-50 border border-yellow-300'
              : 'bg-green-50 border border-green-300',
      )}>
      <div className="flex gap-3 sm:items-center">
        <div>
          {notif === 'error' ? (
            <ErrorIcon />
          ) : notif === 'info' ? (
            <InfoIcon />
          ) : notif === 'success' ? (
            <SuccessIcon />
          ) : (
            <WarnIcon />
          )}
        </div>
        <p
          className={cn(
            `sm:text-sm`,
            notif === 'error'
              ? 'text-red-600'
              : notif === 'info'
                ? 'text-blue-600'
                : notif === 'warn'
                  ? 'text-yellow-600'
                  : 'text-green-600',
          )}>
          {message}{' '}
          {url && (
            <a
              href={url}
              className={cn(
                `underline font-medium `,
                notif === 'error'
                  ? 'hover:text-red-700'
                  : notif === 'info'
                    ? 'hover:text-blue-700'
                    : notif === 'warn'
                      ? 'hover:text-yellow-700'
                      : 'hover:text-green-700',
              )}>
              link
            </a>
          )}
        </p>
      </div>
    </div>
  </div>
);

export default NotificationMod;
