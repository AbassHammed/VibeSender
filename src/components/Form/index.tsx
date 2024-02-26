import React, { useCallback, useState } from 'react';

import Image from 'next/image';

import { GithubIcon, GoogleIcon } from '../Icons';
import LoginForm from './Login';
import SignUpForm from './SignUp';

type page = 'LOGIN' | 'REGISTER';

const Form: React.FC = () => {
  const [page, setPage] = useState<page>('LOGIN');

  const togglePage = useCallback(() => {
    page === 'LOGIN' ? setPage('REGISTER') : setPage('LOGIN');
  }, [page]);
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-6">
          <Image src="/logo.svg" width={150} height={150} className="mx-auto" alt="Logo" />
          <div className="mt-3">
            <h3 className="light:text-gray-800 text-2xl font-bold sm:text-3xl">
              {page === 'LOGIN' ? 'Welcome back' : 'Sign up '}
            </h3>
          </div>
        </div>
        {page === 'LOGIN' ? <LoginForm /> : <SignUpForm />}
        <div className="relative">
          <span className="block w-full h-px bg-gray-300"></span>
          <p className="inline-block w-fit text-sm dark:bg-[#030712] bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
            Or continue with
          </p>
        </div>
        <div className="space-y-4 text-sm font-medium">
          <button
            disabled
            className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
            <GoogleIcon />
            Continue with Google
          </button>
          <button
            disabled
            className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
            <GithubIcon />
            Continue with Github
          </button>
        </div>
        <p className="text-center">
          {page === 'LOGIN' ? 'New to VibeSender ? ' : 'Already have an account '}
          <a
            onClick={togglePage}
            className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
            {page === 'LOGIN' ? 'Sign up' : 'Log in'}
          </a>
        </p>
      </div>
    </div>
  );
};
export default Form;
