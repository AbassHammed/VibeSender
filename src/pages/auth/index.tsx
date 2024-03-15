import React, { useCallback, useEffect, useState } from 'react';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LoginForm, SignUpForm } from '@/Components/AuthForms';
import { buttonVariants } from '@/Components/UserInterface';
import { cn } from '@/lib/utils';

type page = 'LOGIN' | 'REGISTER';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function AuthenticationPage() {
  const [page, setPage] = useState<page>('LOGIN');
  const router = useRouter();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#signup') {
        setPage('REGISTER');
      } else if (hash === '#login') {
        setPage('LOGIN');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const togglePage = useCallback(() => {
    if (page === 'LOGIN') {
      setPage('REGISTER');
      router.push('#signup', undefined, { shallow: true });
    } else {
      setPage('LOGIN');
      router.push('#login', undefined, { shallow: true });
    }
  }, [page, router]);

  return (
    <>
      <div className="flex h-[800px] px-2 flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <a
          onClick={togglePage}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-4 cursor-pointer',
          )}>
          {page === 'LOGIN' ? 'Sign Up' : 'Login'}
        </a>
        <div className="relative hidden h-full flex-col bg-muted p-4 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image src="/logo.svg" alt="App logo" width={100} height={100} />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                VibeSender is a dynamic messaging app designed for the modern communicator. With a
                focus on seamless, real-time conversations.
              </p>
              <footer>Abass Hammed</footer>
            </blockquote>
          </div>
        </div>
        <div className="mt-[120px] lg:p-8 md:pb-10 ">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {page === 'REGISTER' ? 'Create an account' : 'Welcome back'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {page === 'REGISTER' && 'Enter your personal info below to create your account'}
              </p>
            </div>
            {page === 'LOGIN' ? <LoginForm className="mt-20" /> : <SignUpForm />}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking{' '}
              <span className="font-bold">
                {page === 'LOGIN' ? 'Log in' : 'Sign in with Email'}
              </span>
              , you agree to our{' '}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
