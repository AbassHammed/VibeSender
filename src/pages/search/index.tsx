import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import SearchInput from '@/components/Button/SearchInput';
import Loading from '@/components/Loading';
import { Separator } from '@/components/ui/separator';
import { useSidebarContext } from '@/contexts/sideBarContext';
import { auth } from '@/firebase/firebase';
import { currentUserQuery } from '@/firebase/query';
import { useSession } from '@/hooks/useSession';
import { Empty } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';

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
  });

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
            <div className="flex justify-between mb-4 pt-2">
              <div className="text-2xl font-bold text-neutral-800">Search</div>
            </div>
          </div>
          <SearchInput />
          <Separator className="my-4" />
          <Empty description="No users found" />
        </aside>
      )}
    </>
  );
};
export default Index;
