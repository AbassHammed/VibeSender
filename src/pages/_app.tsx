import { Header, HeaderMobile } from '@/Components/Header';
import { MediumSideBar, MobileDownBar, SideBar } from '@/Components/Nav';
import { MarginWidthWrapper, PageWrapper } from '@/Components/Wrapper';
import { Provider } from '@/Contexts';
import { useShowNavbar } from '@/lib/utils';

import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import SearchPage from '@/Components/SearchPage';

export default function App({ Component, pageProps }: AppProps) {
  const showNavbar = useShowNavbar();

  const renderContent = () => (
    <>
      <MediumSideBar />
      <SideBar />
      <MobileDownBar />
      <HeaderMobile />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <PageWrapper>
            <SearchPage />
            <Component {...pageProps} />
          </PageWrapper>
        </MarginWidthWrapper>
      </main>
    </>
  );

  return (
    <>
      <Head>
        <title>VibeSender</title>
        <meta
          name="description"
          content="VibeSender is a dynamic messaging app designed for the modern communicator. With a focus on seamless, real-time conversations, VibeSend offers an intuitive and engaging platform for users to connect, share, and collaborate. Whether you're sending instant messages, sharing photos, or engaging in group chats, VibeSend ensures your conversations are both private and secure. Emphasizing user experience, the app features a sleek design and customizable themes, allowing you to personalize your chat environment. With VibeSend, staying in touch with friends, family, and colleagues is more vibrant and effortless than ever. Join the VibeSend community today and elevate your messaging experience."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Provider>{showNavbar ? renderContent() : <Component {...pageProps} />}</Provider>
    </>
  );
}
