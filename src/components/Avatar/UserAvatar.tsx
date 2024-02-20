import React, { useEffect, useState } from 'react';

import { firestore } from '@/firebase/firebase';
import { useAuth } from '@/hooks/useAuth';
import { User as SessionUser } from '@/types';
import { Button, Popover, PopoverContent, PopoverTrigger, User } from '@nextui-org/react';
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { FaCheck, FaX } from 'react-icons/fa6';

import ProfileCard from '../ProfileCard/Profilecard';

type UserAvatarProps = {
  profileUser: SessionUser;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ profileUser }) => {
  const { user: currentUser } = useAuth();
  const [isFollowed, setIsFollowed] = useState(false);
  const [friendshipDocId, setFriendshipDocId] = useState('');

  useEffect(() => {
    const checkFriendship = async () => {
      if (!currentUser || !profileUser) {
        return;
      }

      const docId = [currentUser.uid, profileUser.uid].sort().join('_');
      const docRef = doc(firestore, 'friendships', docId);
      const docSnap = await getDoc(docRef);

      setIsFollowed(docSnap.exists());
      if (docSnap.exists()) {
        setFriendshipDocId(docId);
      }
    };

    checkFriendship();
  }, [currentUser, profileUser]);

  const toggleFriendship = async () => {
    const docId = friendshipDocId || [currentUser?.uid, profileUser.uid].sort().join('_');
    const docRef = doc(firestore, 'friendships', docId);

    if (isFollowed) {
      await deleteDoc(docRef);
      setIsFollowed(false);
    } else {
      await setDoc(docRef, {
        userId1: currentUser?.uid,
        userId2: profileUser.uid,
        createdAt: serverTimestamp(),
      });
      setIsFollowed(true);
      setFriendshipDocId(docId);
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
          className="absolute right-2 items-center"
          onPress={toggleFriendship}
          isIconOnly
          color={isFollowed ? 'danger' : 'success'}>
          {' '}
          {isFollowed ? <FaX /> : <FaCheck />}
        </Button>
      </div>
      <PopoverContent className="p-1">
        <ProfileCard User={profileUser} />
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
