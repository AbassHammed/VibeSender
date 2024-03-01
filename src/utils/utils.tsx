import { type color, type notif } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export function stringToColor(colorString: string): color {
  return colorString as color;
}

export function stringToNotif(notifString: string): notif {
  return notifString as notif;
}
