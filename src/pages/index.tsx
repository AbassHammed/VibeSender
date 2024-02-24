import { useEffect } from 'react';

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
  return <AuthForm />;
}
