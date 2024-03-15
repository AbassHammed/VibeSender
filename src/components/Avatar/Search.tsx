import React, { useEffect, useState } from 'react';

import ProfileCard from '@/Components/ProfileCard';
import { friendShipStatusStyles1 } from '@/data';
import {
  acceptFriendRequest,
  checkFriendshipStatus,
  searchFriendInRequest,
  sendFriendRequest,
} from '@/firebase';
import { firestore } from '@/firebase/firebase';
import { useAuth, useSession } from '@/hooks';
import { friendship, FriendshipStatus, User as SessionUser } from '@/types';
import { Button, Popover, PopoverContent, PopoverTrigger, User } from '@nextui-org/react';
import { deleteDoc, doc } from 'firebase/firestore';

interface SearchAvatarProps {
  profileUser: SessionUser;
}

const SearchAvatar: React.FC<SearchAvatarProps> = ({ profileUser }) => {
  const { user: currentUser } = useAuth();
  const { sessionData } = useSession();
  const [friendshipStatus, setFriendshipStatus] = useState<FriendshipStatus>('accept');
  const [isMe, setIsMe] = useState(false);
  const [values, setValues] = useState<friendship>();

  useEffect(() => {
    const { background, text, message } = friendShipStatusStyles1[friendshipStatus];
    setValues(prev => ({ ...prev, background, text, message }));
    const checkStatus = async () => {
      if (!currentUser || !profileUser) {
        return;
      }

      const isFriends = await checkFriendshipStatus(currentUser.uid, profileUser.uid);
      if (isFriends) {
        setFriendshipStatus('unfollow');
        return;
      }

      const receivedRequest = await searchFriendInRequest(profileUser.uid, currentUser.uid);
      if (receivedRequest) {
        setFriendshipStatus('accept');
        return;
      }

      const sentRequest = await searchFriendInRequest(currentUser.uid, profileUser.uid);
      if (sentRequest) {
        setFriendshipStatus('pending');
        return;
      }

      setFriendshipStatus('follow');
    };
    const isUser = profileUser.uid === currentUser?.uid;
    setIsMe(isUser);
    checkStatus();
  }, [currentUser, profileUser, friendshipStatus]);

  const toggleFriendshipStatus = async () => {
    if (!currentUser || !profileUser || !sessionData?.currentUser) {
      return;
    }
    const docId = [currentUser.uid, profileUser.uid].sort().join('_');
    const docRef = doc(firestore, 'friends', docId);

    switch (friendshipStatus) {
      case 'follow':
        await sendFriendRequest(profileUser.uid, currentUser.uid, sessionData.currentUser.userName);
        setFriendshipStatus('pending');
        break;

      case 'unfollow':
        await deleteDoc(docRef);
        setFriendshipStatus('follow');
        break;

      case 'accept':
        await acceptFriendRequest(docId, profileUser.uid, currentUser.uid);
        break;

      default:
        break;
    }
  };

  return (
    <Popover placement="bottom">
      <div className="flex gap-3 relative">
        <PopoverTrigger>
          <User
            as="button"
            name={profileUser.fullName}
            description={profileUser.jobDescription}
            className="transition-transform font-medium"
            avatarProps={{
              src: profileUser.imageUrl,
            }}
          />
        </PopoverTrigger>
        <Button
          className={isMe ? 'hidden' : 'absolute right-2 items-center'}
          onPress={toggleFriendshipStatus}
          isIconOnly
          color={values?.background}>
          {values?.message}
        </Button>
      </div>
      <PopoverContent className="p-1">
        <ProfileCard User={profileUser} />
      </PopoverContent>
    </Popover>
  );
};

export default SearchAvatar;
