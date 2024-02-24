import { useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import AuthForm from '@/components/Form';
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
  return (
    <div>
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            alt="Logo"
            height={100}
            width={100}
            className="mx-auto w-auto"
            src={'/app.png'}
            priority
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
