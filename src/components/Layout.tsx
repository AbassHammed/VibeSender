import { useRouter } from 'next/router';
import SideBar from './SideBar/SideBar';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();
  const showNavbar = !['/'].includes(pathname);

  const mainClass = showNavbar ? 'flex flex-row h-full' : '';

  return (
    <>
      {showNavbar && <SideBar />}
      <main className={mainClass}>{children}</main>
    </>
  );
};

export default Layout;
