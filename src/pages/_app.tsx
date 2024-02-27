import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import Header from '@/components/Header/Header';
// import HeaderMobile from '@/components/Header/HeaderMobile';
import NavBar from '@/components/NavBar';
import Play from '@/components/News';
import {
  MarginWidthWrapper,
  PageWrapper,
  ThemeProvider,
  useShowNavbar,
} from '@/components/Wrapper';
import { SessionProvider } from '@/hooks/useSession';
import { MantineProvider } from '@mantine/core';
import { NextUIProvider } from '@nextui-org/react';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'sonner';

export default function App({ Component, pageProps }: AppProps) {
  const showNavbar = useShowNavbar();

  const renderContent = () => (
    <>
      <NavBar />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          {/* <HeaderMobile /> */}
          <PageWrapper>
            <Play />
            <Component {...pageProps} />
          </PageWrapper>
        </MarginWidthWrapper>
      </main>
    </>
  );
  return (
    <RecoilRoot>
      <Head>
        <title>VibeSender</title>
        <meta
          name="description"
          content="VibeSender is a dynamic messaging app designed for the modern communicator. With a focus on seamless, real-time conversations, VibeSend offers an intuitive and engaging platform for users to connect, share, and collaborate. Whether you're sending instant messages, sharing photos, or engaging in group chats, VibeSend ensures your conversations are both private and secure. Emphasizing user experience, the app features a sleek design and customizable themes, allowing you to personalize your chat environment. With VibeSend, staying in touch with friends, family, and colleagues is more vibrant and effortless than ever. Join the VibeSend community today and elevate your messaging experience."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="system"
          disableTransitionOnChange>
          <Toaster richColors position="top-center" closeButton />
          <NextUIProvider>
            <MantineProvider>
              {showNavbar ? renderContent() : <Component {...pageProps} />}
            </MantineProvider>
          </NextUIProvider>
        </ThemeProvider>
      </SessionProvider>
    </RecoilRoot>
  );
}
