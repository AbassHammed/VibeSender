import React from 'react';

import { Chat } from '@/components/Chat';
import ChatBar from '@/components/Chat/ChatBar';
import Loading from '@/components/Loading';
import { auth } from '@/firebase';
import { useSession } from '@/hooks';
import { mockConversations } from '@/utils/constants';
import { useAuthState } from 'react-firebase-hooks/auth';

const ConversationPage: React.FC = () => {
  const { sessionData } = useSession();
  const [user] = useAuthState(auth);

  if (!user || !sessionData?.currentUser) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex p-2">
        <aside className="fixed hidden md:flex flex-col w-80 bg-white dark:bg-black rounded-lg border lg:h-[calc(100%-70px)] md:h-[calc(100%-16px)]">
          <ChatBar chats={mockConversations} />
        </aside>
        <div className="fixed hidden rounded-lg ml-[330px] md:flex lg:w-[950px] lg:h-[calc(100%-70px)] md:h-[calc(100%-16px)] border">
          {' '}
          <Chat />
        </div>
      </div>
    </>
  );
};
export default ConversationPage;
