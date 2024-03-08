import React from 'react';

import UserAvatar from '@/components/Avatar/SearchAvatar';
import SearchInput from '@/components/Button/SearchInput';
import Loading from '@/components/Loading';
import Placeholder from '@/components/ui/placeHolder';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/firebase/firebase';
import { useSession } from '@/hooks/useSession';
import { useAuthState } from 'react-firebase-hooks/auth';

const SearchPage: React.FC = () => {
  const { sessionData } = useSession();
  const [user] = useAuthState(auth);

  if (!user || !sessionData?.currentUser) {
    return <Loading />;
  }

  return (
    <>
      <aside
        className="
          h-fit
        inset-y-0 
        max-w-80
        lg:pb-0
        lg:max-w-80 
        lg:block
        rounded-lg
        overflow-y-auto 
        border 
        border-gray-200
      ">
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-2">
            <div className="text-2xl font-bold text-neutral-800">Search</div>
          </div>
        </div>
        <SearchInput currentUserId={user.uid} page="find" />
        <Separator className="my-4" />
        {!sessionData.searchedUsers || sessionData.searchedUsers.length === 0 ? (
          <Placeholder description="There is nothing to display" imagePath="/empty.svg" />
        ) : (
          sessionData.searchedUsers.map(user => (
            <div key={user.uid} className="m-2">
              <UserAvatar profileUser={user} />
            </div>
          ))
        )}
      </aside>
    </>
  );
};
export default SearchPage;
