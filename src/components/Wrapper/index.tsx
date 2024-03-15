import React, { useEffect } from 'react';

import { auth, currentUserQuery } from '@/firebase';
import { useSession } from '@/hooks';
import { useShowNavbar } from '@/lib/utils';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useAuthState } from 'react-firebase-hooks/auth';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const showNavbar = useShowNavbar();
  return showNavbar ? (
    <div className="flex flex-col space-y-2 light:bg-zinc-100 flex-grow">{children}</div>
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

export function MarginWidthWrapper({ children }: { children: React.ReactNode }) {
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

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const showNavbar = useShowNavbar();
  const { setSessionData } = useSession();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const checkAuthStateAndFetchData = async () => {
      const authState = sessionStorage.getItem('authState');

      if (!authState && user) {
        await currentUserQuery(user.uid, setSessionData).then(() => {
          sessionStorage.setItem('authState', 'true');
        });
      }
    };

    if (showNavbar && user) {
      checkAuthStateAndFetchData();
    }
  }, [showNavbar, user, setSessionData]);
  return <div>{children}</div>;
};
