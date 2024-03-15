import { useRouter } from 'next/router';

import { color, notif } from '@/types';
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
