import React, { useEffect, useState } from 'react';

import { Avatar, AvatarImage, buttonVariants } from '@/Components/UserInterface';
import { UserQuery } from '@/firebase';
import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import { conversation, User } from '@/types';
import { Info, Phone, Video } from 'lucide-react';

type ChatTopBarProps = {
  selectedConvo: conversation;
};

export const TopBarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];
const ChatTopBar: React.FC<ChatTopBarProps> = ({ selectedConvo }) => {
  const { user } = useAuth();
  const [selecteduser, setSelectedUser] = useState<User>();

  useEffect(() => {
    const fetchFriendData = async (participantId: string) => {
      const userDoc = await UserQuery(participantId);
      if (userDoc) {
        setSelectedUser(userDoc);
      }
    };

    const friendId =
      user?.uid === selectedConvo.participants[0]
        ? selectedConvo.participants[1]
        : selectedConvo.participants[0];
    fetchFriendData(friendId);
  }, [selectedConvo, user?.uid]);

  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex justify-center gap-2">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={selecteduser?.imageUrl}
            alt={`${selecteduser?.fullName}'s image`}
            width={6}
            height={6}
            className="w-10 h-10"
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{selecteduser?.fullName}</span>
          <span className="text-xs">{selecteduser?.lastSeen}</span>
        </div>
      </div>

      <div>
        {TopBarIcons.map((icon, idx) => (
          <button
            key={idx}
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9')}>
            <icon.icon size={20} className="text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
};
export default ChatTopBar;
