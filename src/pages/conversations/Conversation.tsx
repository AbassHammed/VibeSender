import React from 'react';

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
    <div className="hidden md:flex flex-col lg:h-[calc(100%-56px)] h-screen p-2 w-[350px]">
      <aside className="flex flex-co fixed lg:h-[calc(100%-70px)] md:h-[calc(100%-16px)] w-80 bg-white dark:bg-black rounded-lg border">
        <ChatBar chats={mockConversations} />
      </aside>
    </div>
  );
};
export default ConversationPage;
