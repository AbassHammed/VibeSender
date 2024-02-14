import React from 'react';

import { useRouter } from 'next/router';

import SideBar from './SideBar/SideBar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();
  const showNavbar = !['/', '/users', '/conversations'].includes(pathname);

  const mainClass = showNavbar ? 'flex flex-row h-full' : '';

  return (
    <>
      {showNavbar && <SideBar />}
      <main className={mainClass}>{children}</main>
    </>
  );
};

export default Layout;
