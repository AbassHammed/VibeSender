import { ReactNode } from 'react';
import * as React from 'react';

import { useRouter } from 'next/router';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

// Custom hook to determine if the navbar should be shown
export function useShowNavbar() {
  const { pathname } = useRouter();
  return !['/', '/404'].includes(pathname);
}

export function MarginWidthWrapper({ children }: { children: ReactNode }) {
  const showNavbar = useShowNavbar();
  return showNavbar ? (
    <div className="flex flex-col md:ml-60 sm:border-r sm:border-zinc-700 min-h-screen">
      {children}
    </div>
  ) : null;
}

export function PageWrapper({ children }: { children: ReactNode }) {
  const showNavbar = useShowNavbar();
  return showNavbar ? (
    <div className="flex flex-col pt-2 px-4 space-y-2 light:bg-zinc-100 flex-grow pb-4">
      {children}
    </div>
  ) : null;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
