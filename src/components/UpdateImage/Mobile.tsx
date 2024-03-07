import React, { Key, useRef, useState } from 'react';

import { currentUserQuery, firestore, storage } from '@/firebase';
import { useSession } from '@/hooks';
import { User } from '@/types';
import { Avatar, Button, Card, CardBody, Listbox, ListboxItem } from '@nextui-org/react';
import { doc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { Drawer, DrawerContent, DrawerPortal, DrawerTitle, DrawerTrigger } from '../ui/drawer';

interface DrawProps {
  handleSelectedImage: (images: FileList | null) => Promise<void>;
  handleListboxAction: (key: Key) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isError: string;
}

const Draw: React.FC<DrawProps> = ({
  handleListboxAction,
  handleSelectedImage,
  isError,
  fileInputRef,
}) => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button size="sm" className="absolute right-4 items-center mt-3">
        Change photo
      </Button>
    </DrawerTrigger>
    <DrawerPortal>
      <DrawerContent className="flex flex-col md:hidden fixed h-[20%] rounded-t-[10px] dark:bg-[#141414]">
        <DrawerTitle className="flex justify-center items-center my-4">
          Change Profile Picture
        </DrawerTitle>
        <Listbox aria-label="Example with disabled actions" onAction={handleListboxAction}>
          <ListboxItem key="new" className="text-blue-600 ml-2">
            Upload Photo
          </ListboxItem>
          <ListboxItem key="delete" className="text-danger hover:bg-muted hover:text-danger ml-2">
            Remove current Photo
          </ListboxItem>
        </Listbox>
        <h1 className="text-small">{isError}</h1>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/gif"
          onChange={e => handleSelectedImage(e.target.files)}
          style={{ display: 'none' }} // Hide the file input
        />
      </DrawerContent>
    </DrawerPortal>
  </Drawer>
);

type MobileImageProps = {
  profileUser: User;
};

const MAX_IMAGE_SIZE = 10000000;

const MobileImage: React.FC<MobileImageProps> = ({ profileUser }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState('');
  const { setSessionData } = useSession();

  const handleSelectedImage = async (images: FileList | null) => {
    if (!images || images.length === 0) {
      setIsError('No image selected');
      return;
    }

    const image = images[0];
    if (image.size > MAX_IMAGE_SIZE) {
      setIsError('Only image up to 10MB allowed');
      return;
    }

    const uniqueId = uuidv4();
    const storageRef = ref(storage, `profileImages/${uniqueId}-${image.name}`);

    try {
      const uploadTaskSnapshot = await uploadBytesResumable(storageRef, image);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      const userDocRef = doc(firestore, 'users', profileUser.uid);
      await updateDoc(userDocRef, { imageUrl: downloadURL });
      await currentUserQuery(profileUser.uid, setSessionData);
      setIsError('');
    } catch (error) {
      setIsError('Upload failed');
    }
  };

  const deleteProfilePicture = async (imagePath: string, userId: string) => {
    const storageRef = ref(storage, imagePath);

    try {
      await deleteObject(storageRef);

      const userDocRef = doc(firestore, 'users', userId);
      await updateDoc(userDocRef, { imageUrl: null });
      await currentUserQuery(profileUser.uid, setSessionData);
    } catch (error) {
      setIsError('Error deleting file');
    }
  };

  const handleListboxAction = (key: Key) => {
    if (key === 'new') {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else if (key === 'delete') {
      deleteProfilePicture(profileUser.imageUrl, profileUser.uid);
    }
  };
  return (
    <>
      <Card className="border bg-transparent md:hidden">
        <CardBody className="justify-between">
          <div className="flex gap-3">
            <Avatar radius="full" size="lg" src={profileUser.imageUrl} />
            <div className="flex flex-col items-start justify-center pl-2">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {profileUser.userName}
              </h4>
              <h5 className="text-small tracking-tight text-default-500">{profileUser.fullName}</h5>
            </div>
            <Draw
              handleListboxAction={handleListboxAction}
              handleSelectedImage={handleSelectedImage}
              isError={isError}
              fileInputRef={fileInputRef}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
};
export default MobileImage;
