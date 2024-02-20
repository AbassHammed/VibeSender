import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import UserAvatar from '@/components/Avatar/UserAvatar';
import SearchInput from '@/components/Button/SearchInput';
import Loading from '@/components/Loading';
import { Separator } from '@/components/ui/separator';
import { useSidebarContext } from '@/contexts/sideBarContext';
import { auth } from '@/firebase/firebase';
import { currentUserQuery } from '@/firebase/query';
import { useSession } from '@/hooks/useSession';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdOutlineGroupAdd } from 'react-icons/md';

const Index: React.FC = () => {
  const { isLinkActive } = useSidebarContext();
  const { sessionData, setSessionData } = useSession();
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      return router.push('/');
    }
    currentUserQuery(user.uid, setSessionData);
  }, [setSessionData, user, router]);

  if (!user || !sessionData?.currentUser) {
    return <Loading />;
  }

  return (
    <>
      {isLinkActive && (
        <aside
          className="
          h-fit
        inset-y-0 
        pb-20
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
            <div className="flex justify-between mb-4 pt-4">
              <div className="text-2xl font-bold text-neutral-800">Chats</div>
              <div
                // onClick={() => setIsModalOpen(true)}
                className="
              rounded-full 
              p-2 
              bg-blue-100 
              text-gray-600 
              cursor-pointer 
              hover:opacity-75 
              transition
            ">
                <MdOutlineGroupAdd size={20} />
              </div>
            </div>
          </div>
          <SearchInput currentUserId={user.uid} searchInfirends />
          <Separator className="my-4" />
          {!sessionData.searchedUsers
            ? 'No recent users'
            : sessionData.searchedUsers.map(user => (
              <div key={user.uid} className="m-2">
                <UserAvatar key={user.uid} profileUser={user} />
              </div>
            ))}
        </aside>
      )}
    </>
  );
};
export default Index;
