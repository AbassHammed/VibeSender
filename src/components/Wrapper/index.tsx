import { ReactNode } from 'react';
import * as React from 'react';

import { useRouter } from 'next/router';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

// Custom hook to determine if the navbar should be shown
export function useShowNavbar() {
  const { pathname } = useRouter();
  return !['/', '/404', '/auth'].includes(pathname);
}

export function PageWrapper({ children }: { children: ReactNode }) {
  const showNavbar = useShowNavbar();
  return showNavbar ? (
    <div className="flex flex-col pt-2 px-4 space-y-2 light:bg-zinc-100 flex-grow">{children}</div>
  ) : null;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function useNavbarType() {
  const [navbarType, setNavbarType] = React.useState('mobile');

  React.useEffect(() => {
    const updateNavbarType = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setNavbarType('mobile');
      } else if (width >= 768 && width < 1024) {
        setNavbarType('medium');
      } else {
        setNavbarType('large');
      }
    };
    updateNavbarType();

    window.addEventListener('resize', updateNavbarType);

    return () => window.removeEventListener('resize', updateNavbarType);
  }, []);

  return navbarType;
}

export function MarginWidthWrapper({ children }: { children: ReactNode }) {
  const navbarType = useNavbarType();

  let marginLeftClass = '';
  switch (navbarType) {
    case 'medium':
      marginLeftClass = 'md:ml-[80px]';
      break;
    case 'large':
      marginLeftClass = 'md:ml-60';
      break;
    case 'mobile':
      marginLeftClass = 'my-12';
      break;
  }

  return (
    <div className={`flex flex-col ${marginLeftClass} sm:border-r sm:border-zinc-700 min-h-screen`}>
      {children}
    </div>
  );
}
