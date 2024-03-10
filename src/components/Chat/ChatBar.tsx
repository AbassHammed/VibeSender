import { useEffect, useState } from 'react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { UserQuery } from '@/firebase';
import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import { conversation } from '@/types';
import { FiMoreHorizontal } from 'react-icons/fi';
import { LuPenSquare } from 'react-icons/lu';

interface ChatItemProps {
  chat: conversation;
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({ name: '', imageUrl: '' });

  useEffect(() => {
    const fetchFriendData = async (participantId: string) => {
      const userDoc = await UserQuery(participantId);
      if (userDoc) {
        setUserData({ name: userDoc.fullName, imageUrl: userDoc.imageUrl });
      }
    };

    const friendId =
      user?.uid === chat.participants[0] ? chat.participants[1] : chat.participants[0];
    fetchFriendData(friendId);
  }, [chat, user?.uid]);

  return (
    <button className="justify-start flex flex-row hover:bg-muted rounded-lg w-[300px] p-2">
      <Avatar className="flex justify-center items-center">
        <AvatarImage
          src={userData.imageUrl}
          alt={`${userData.name}'s avatar`}
          width={6}
          height={6}
          className="w-10 h-10"
        />
      </Avatar>
      <div className="flex flex-col max-w-60 px-4">
        <span className=" flex">{userData.name}</span>
        {chat.lastMessage && (
          <span
            className={cn(
              'text-zinc-300 text-xs truncate',
              chat.lastMessage.read ? 'font-bold dark:text-white text-black' : '',
            )}>
            {chat.lastMessage.userId === user?.uid ? `You: ` : `${userData.name.split(' ')[0]}: `}
            {chat.lastMessage.message}
          </span>
        )}
      </div>
    </button>
  );
};

interface ChatBarProps {
  chats: conversation[];
}

const ChatBar: React.FC<ChatBarProps> = ({ chats }) => (
  <div className="relative flex flex-col h-full w-full gap-4 p-2">
    <div className="flex justify-between p-2 items-center">
      <div className="flex gap-2 items-center text-2xl">
        <p className="font-medium">Chats</p>
        <span className="text-zinc-300">({chats.length})</span>
      </div>
      <div>
        <button className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9')}>
          <FiMoreHorizontal size={20} />
        </button>

        <button className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9')}>
          <LuPenSquare size={20} />
        </button>
      </div>
    </div>
    <nav>
      {chats.map(chat => (
        <ChatItem chat={chat} key={chat.conversationId} />
      ))}
    </nav>
  </div>
);

export default ChatBar;
