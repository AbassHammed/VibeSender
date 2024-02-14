import { ReactNode } from 'react';

import { useRouter } from 'next/router';

// Custom hook to determine if the navbar should be shown
export function useShowNavbar() {
  const { pathname } = useRouter();
  return !['/'].includes(pathname);
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
    <div className="flex flex-col pt-2 px-4 space-y-2 bg-zinc-100 flex-grow pb-4">{children}</div>
  ) : null;
}
