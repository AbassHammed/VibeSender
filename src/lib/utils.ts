import { useRouter } from 'next/router';

import { color, notif, TimeComparisonResult } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import * as CryptoJS from 'crypto-js';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, process.env.NEXT_PUBLIC_SECRET_KEY as string).toString();
};

export const decryptData = (cipherText: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, process.env.NEXT_PUBLIC_SECRET_KEY as string);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const useShowNavbar = () => {
  const { pathname } = useRouter();
  return !['/', '/404', '/auth'].includes(pathname);
};

export function stringToColor(colorString: string): color {
  return colorString as color;
}

export function stringToNotif(notifString: string): notif {
  return notifString as notif;
}

export function compareTimeAndDate(inputTime: string, inputDate: string): TimeComparisonResult {
  const now = new Date();
  const currentDateStr = now.toISOString().split('T')[0];

  if (inputDate !== currentDateStr) {
    return { success: false };
  }

  const [inputHours, inputMinutes] = inputTime.split(':').map(Number);
  const inputDateTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    inputHours,
    inputMinutes,
  );

  let differenceInMinutes = (now.getTime() - inputDateTime.getTime()) / (1000 * 60);

  if (differenceInMinutes < 0) {
    return { success: false };
  }

  if (differenceInMinutes < 60) {
    return { success: true, difference: Math.round(differenceInMinutes), units: 'mins' };
  } else {
    const differenceInHours = differenceInMinutes / 60;
    return { success: true, difference: Math.round(differenceInHours), units: 'hours' };
  }
}
