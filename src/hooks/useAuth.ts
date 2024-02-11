import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';

type UseAuthReturnType = {
  user: ReturnType<typeof useAuthState>[0];
  loading: ReturnType<typeof useAuthState>[1];
};

export const useAuth = (): UseAuthReturnType => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  return { user, loading };
};
