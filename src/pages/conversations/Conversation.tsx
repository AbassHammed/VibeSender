import React from 'react';

import { UserAvatar } from '@/components/Avatar';
import { SearchInput } from '@/components/Button';
import Loading from '@/components/Loading';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/firebase';
import { useSession } from '@/hooks';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdOutlineGroupAdd } from 'react-icons/md';

const ConversationPage: React.FC = () => {
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
            <div className="text-2xl font-bold light:text-neutral-800">Chats</div>
            <div
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
        <SearchInput currentUserId={user.uid} page="convo" />
        <Separator className="my-4" />
        {!sessionData.searchedUsers
          ? 'No recent users'
          : sessionData.searchedUsers.map(user => (
              <div key={user.uid} className="m-2">
                <UserAvatar key={user.uid} profileUser={user} />
              </div>
            ))}
      </aside>
    </>
  );
};
export default ConversationPage;
