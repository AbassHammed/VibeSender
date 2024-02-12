import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { User } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';

type ProfileCardProps = {
  User: User;
};
const ProfileCard = ({ User: profileUser }: ProfileCardProps) => {
  const { user: currentUser } = useAuth();
  const [isFollowed, setIsFollowed] = useState(false);
  const [friendshipDocId, setFriendshipDocId] = useState('');

  useEffect(() => {
    const checkFriendship = async () => {
      if (!currentUser || !profileUser) {return;}

      const docId = [currentUser.uid, profileUser.uid].sort().join('_');
      const docRef = doc(firestore, 'friendships', docId);
      const docSnap = await getDoc(docRef);

      setIsFollowed(docSnap.exists());
      if (docSnap.exists()) {setFriendshipDocId(docId);}
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
    <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar isBordered radius="full" size="md" src={profileUser.imageUrl} />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {profileUser.fullName}
            </h4>
            <h5 className="text-small tracking-tight text-default-500">{profileUser.userName}</h5>
          </div>
        </div>
        <Button
          className={isFollowed ? 'bg-transparent text-foreground border-default-200' : ''}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? 'bordered' : 'solid'}
          onPress={toggleFriendship}>
          {isFollowed ? 'Unfollow' : 'Follow'}
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
