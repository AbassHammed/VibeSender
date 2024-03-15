import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { SearchAvatar } from '@/Components/Avatar';
import SearchInput from '@/Components/SearchInput';
import Spinner from '@/Components/Spinner';
import { Placeholder, Separator } from '@/Components/UserInterface';
import { auth } from '@/firebase/firebase';
import { useDimensions } from '@/hooks';
import { useSession } from '@/hooks/useSession';
import { useAuthState } from 'react-firebase-hooks/auth';

const SearchPage: React.FC = () => {
  const { sessionData } = useSession();
  const [user] = useAuthState(auth);
  const { width } = useDimensions();
  const router = useRouter();

  useEffect(() => {
    if (width >= 768) {
      router.push('/messages');
    }
  }, [width]);

  if (!user || !sessionData?.currentUser) {
    return <Spinner />;
  }

  return (
    <div className="fixed w-[calc(100%-16px)] h-[calc(100%-110px)] m-2 lg:block rounded-lg border">
      <div className="font-bold py-4 text-2xl pl-4"> Search</div>
      <SearchInput currentUserId={user.uid} />
      <Separator className="mt-4 mb-2" />
      <div className="overflow-auto">
        {!sessionData.searchedUsers || sessionData.searchedUsers.length === 0 ? (
          <Placeholder description="There is nothing to display" imagePath="/empty.svg" />
        ) : (
          sessionData.searchedUsers.map(user => (
            <div key={user.uid} className="m-2">
              <SearchAvatar profileUser={user} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default SearchPage;
