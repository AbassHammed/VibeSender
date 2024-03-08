import React, { useEffect, useState } from 'react';

import {
  acceptFriendRequest,
  checkFriendshipStatus,
  searchFriendInRequest,
  sendFriendRequest,
} from '@/firebase';
import { firestore } from '@/firebase/firebase';
import { useAuth, useSession } from '@/hooks';
import { User as SessionUser, type color } from '@/types';
import { Button, Popover, PopoverContent, PopoverTrigger, User } from '@nextui-org/react';
import { deleteDoc, doc } from 'firebase/firestore';
import { FaCheck, FaX } from 'react-icons/fa6';
import { MdOutlinePendingActions } from 'react-icons/md';
import { SlUserFollow } from 'react-icons/sl';

import ProfileCard from '../ProfileCard';

type friendship = {
  background: color;
  icon: React.ReactNode;
  text: string;
};

type FriendshipStatus = 'follow' | 'unfollow' | 'pending' | 'accept';

const friendShipStatusStyles: Record<FriendshipStatus, friendship> = {
  unfollow: {
    background: 'danger',
    icon: <FaX />,
    text: 'text-red-600',
  },
  follow: {
    background: 'primary',
    icon: <SlUserFollow />,
    text: 'text-blue-600',
  },
  pending: {
    background: 'warning',
    icon: <MdOutlinePendingActions />,
    text: 'text-yellow-600',
  },
  accept: {
    background: 'success',
    icon: <FaCheck />,
    text: 'text-green-600',
  },
};

type SearchAvatarProps = {
  profileUser: SessionUser;
};

const SearchAvatar: React.FC<SearchAvatarProps> = ({ profileUser }) => {
  const { user: currentUser } = useAuth();
  const { sessionData } = useSession();
  const [friendshipStatus, setFriendshipStatus] = useState<FriendshipStatus>('accept');
  const [isMe, setIsMe] = useState(false);
  const [values, setValues] = useState<friendship>();

  useEffect(() => {
    const { background, text, icon } = friendShipStatusStyles[friendshipStatus];
    setValues(prev => ({ ...prev, background, text, icon }));
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
          {values?.icon}
        </Button>
      </div>
      <PopoverContent className="p-1">
        <ProfileCard User={profileUser} />
      </PopoverContent>
    </Popover>
  );
};

export default SearchAvatar;
