import React, { useEffect, useState } from 'react';

import { friendShipStatusStyles } from '@/data';
import {
  acceptFriendRequest,
  checkFriendshipStatus,
  firestore,
  searchFriendInRequest,
  sendFriendRequest,
} from '@/firebase';
import { useAuth, useSession } from '@/hooks';
import { cn } from '@/lib/utils';
import { FriendshipStatus, User } from '@/types';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { deleteDoc, doc } from 'firebase/firestore';

interface ProfileCardProps {
  User: User;
}

const ProfileCard = ({ User: profileUser }: ProfileCardProps) => {
  const { user: currentUser } = useAuth();
  const { sessionData } = useSession();
  const [isFollowed, setIsFollowed] = useState<boolean>();
  const [friendshipStatus, setFriendshipStatus] = useState<FriendshipStatus>('accept');
  const [isMe, setIsMe] = useState(false);
  const [values, setValues] = useState({ background: '', text: '' });

  useEffect(() => {
    const { background, text } = friendShipStatusStyles[friendshipStatus];
    setValues(prev => ({ ...prev, background, text }));
    const checkStatus = async () => {
      if (!currentUser || !profileUser) {
        return;
      }

      const isFriends = await checkFriendshipStatus(currentUser.uid, profileUser.uid);
      if (isFriends) {
        setIsFollowed(true);
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
    <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar radius="full" size="md" src={profileUser.imageUrl} />
          <div className="flex flex-col items-start justify-center pl-1">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {profileUser.fullName}
            </h4>
            <h5 className="text-small tracking-tight text-default-500">{profileUser.userName}</h5>
          </div>
        </div>
        <Button
          className={cn(values.background, values.text, { 'hidden ': isMe })}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? 'bordered' : 'solid'}
          onPress={toggleFriendshipStatus}>
          {friendshipStatus}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-small pl-px text-default-500">{profileUser.bio}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">{profileUser.following}</p>
          <p className=" text-default-500 text-small">Following</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
