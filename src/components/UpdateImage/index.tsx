import React, { Key, useRef, useState } from 'react';

import { Separator } from '@/Components/UserInterface';
import { currentUserQuery, firestore, storage } from '@/firebase';
import { useSession } from '@/hooks';
import { User } from '@/types';
import { Avatar, Button, Card, CardBody, Listbox, ListboxItem } from '@nextui-org/react';
import { doc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

interface UpdateImageProps {
  profileUser: User;
}

const MAX_IMAGE_SIZE = 10000000;

const UpdateImage: React.FC<UpdateImageProps> = ({ profileUser }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState('');
  const { setSessionData } = useSession();
  const [isOpen, setIsopen] = useState(false);

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
      <Card className="border bg-transparent hidden md:flex">
        <CardBody className="justify-between">
          <div className="flex gap-3">
            <Avatar radius="full" size="lg" src={profileUser.imageUrl} />
            <div className="flex flex-col items-start justify-center pl-2">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {profileUser.userName}
              </h4>
              <h5 className="text-small tracking-tight text-default-500">{profileUser.fullName}</h5>
            </div>
            <Button
              size="sm"
              className="absolute right-4 items-center mt-3"
              onPress={() => setIsopen(prev => !prev)}>
              Change photo
            </Button>
          </div>
        </CardBody>
      </Card>
      <div className={isOpen ? 'hidden md:flex' : 'hidden'}>
        <div
          className=" fixed inset-0 w-full h-full bg-black opacity-40 z-40"
          onClick={() => setIsopen(prev => !prev)}
        />
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg sm:w-[60%] md:w-[320px]  bg-white z-50 dark:bg-[#141414] justify-center items-center">
          <header className="flex flex-col gap-1 text-center py-4">Change Profile Photo</header>
          <Separator />
          <div className="text-center">
            <Listbox aria-label="Example with disabled actions" onAction={handleListboxAction}>
              <ListboxItem showDivider key="new" className="text-blue-600 hover:text-blue-600 py-2">
                Upload Photo
              </ListboxItem>
              <ListboxItem showDivider key="delete" className="text-danger hover:text-danger py-2">
                Remove current Photo
              </ListboxItem>
              <ListboxItem key="cancel" onClick={() => setIsopen(prev => !prev)} className="py-2">
                cancel
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
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdateImage;
