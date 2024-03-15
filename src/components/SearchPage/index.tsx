import React from 'react';

import { SearchAvatar } from '@/Components/Avatar';
import SearchInput from '@/Components/SearchInput';
import Spinner from '@/Components/Spinner';
import { Placeholder, Separator } from '@/Components/UserInterface';
import { auth } from '@/firebase/firebase';
import { useSearch } from '@/hooks';
import { useSession } from '@/hooks/useSession';
import { useAuthState } from 'react-firebase-hooks/auth';

const SearchPage: React.FC = () => {
  const { sessionData } = useSession();
  const [user] = useAuthState(auth);
  const { isSearchEnabled } = useSearch();

  if (!user || !sessionData?.currentUser) {
    return <Spinner />;
  }

  return (
    isSearchEnabled && (
      <>
        <div className="fixed z-50 hidden md:flex lg:h-[calc(100%-56px)] h-screen  p-4 min-w-[350px] bg-white dark:bg-black rounded-lg mb-4 border">
          <aside className=" flex flex-col z-50 fixed h-full w-80 bg-white dark:bg-black rounded-lg border">
            <div>
              <div className="px-5">
                <div className="flex justify-between mb-4 pt-2">
                  <div className="text-2xl font-bold">Search</div>
                </div>
              </div>
              <SearchInput currentUserId={user.uid} />
              <Separator className="my-4" />
            </div>
            <div className="overflow-auto">
              {!sessionData.searchedUsers || sessionData.searchedUsers.length === 0 ? (
                <Placeholder description="There is nothing to display" imagePath="/empty.svg" />
              ) : (
                sessionData.searchedUsers.map(user => (
                  <div key={user.uid} className="m-2">
                    <SearchAvatar profileUser={user} />
                    <Separator className="my-4" />
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      </>
    )
  );
};
export default SearchPage;
