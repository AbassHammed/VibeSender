import '@/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'sonner';
import Layout from '@/components/Layout';
import { SidebarProvider } from '@/contexts/sideBarContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>VibeSender</title>
        <meta
          name="description"
          content="VibeSender is a dynamic messaging app designed for the modern communicator. With a focus on seamless, real-time conversations, VibeSend offers an intuitive and engaging platform for users to connect, share, and collaborate. Whether you're sending instant messages, sharing photos, or engaging in group chats, VibeSend ensures your conversations are both private and secure. Emphasizing user experience, the app features a sleek design and customizable themes, allowing you to personalize your chat environment. With VibeSend, staying in touch with friends, family, and colleagues is more vibrant and effortless than ever. Join the VibeSend community today and elevate your messaging experience."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Icon.png" sizes="180*180" />
      </Head>
      <SidebarProvider>
        <Toaster richColors position="top-center" closeButton />
        <Layout>
          <NextUIProvider>
            <Component {...pageProps} />
          </NextUIProvider>
        </Layout>
      </SidebarProvider>
    </RecoilRoot>
  );
}
