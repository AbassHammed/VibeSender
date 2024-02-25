import { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Loading from '@/components/Loading';
import { auth } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/conversations');
    }
  }, [user, router]);

  if (loading) {
    return <Loading />;
  }

  const Brand = () => (
    <div className="flex items-center justify-between py-5 md:block">
      <a href="#home">
        <img src="/logo.svg" width={120} height={50} alt="VibeSender logo" />
      </a>
    </div>
  );

  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 blur-xl max-h-screen"
        style={{
          background:
            'linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)',
        }}></div>
      <div className="relative">
        <header>
          <nav className="pb-5 md:text-sm">
            <div className=" items-center w-screen px-4 md:flex ">
              <Brand />
            </div>
          </nav>
        </header>
        <section>
          <div className="w-screen mx-auto px-4 py-28  light:text-gray-600 overflow-hidden md:flex">
            <div className="flex-none space-y-5 max-w-xl md:mx-32">
              <Link
                href="javascript:void(0)"
                className="inline-flex gap-x-6 items-center rounded-full p-1 pr-6 border text-sm font-medium duration-150 hover:bg-white hover:text-black">
                <span className="inline-block rounded-full px-3 py-1 bg-indigo-600 text-white">
                  News
                </span>
                <p className="flex items-center">
                  Read the launch post from here
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
              </Link>
              <h1 className="text-4xl light:text-gray-800 font-extrabold sm:text-5xl">
                Build your SaaS exactly how you want
              </h1>
              <p>
                Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque
                laudantium, totam rem aperiam, eaque ipsa quae.
              </p>
              <div className="flex items-center gap-x-3 sm:text-sm">
                <Link
                  href="/auth"
                  className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                  Create account
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="/auth"
                  className="flex items-center justify-center gap-x-1 py-2 px-4 light:text-gray-700 light:hover:text-gray-900 font-medium duration-150 md:inline-flex">
                  Log in
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className=" hidden md:block">
              {/* Replace with your image */}
              <img src="/text.svg" className="max-w-lg" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
