import React from 'react';

import { User } from '@/types';
import { Avatar, Button, Card, CardBody } from '@nextui-org/react';

type UpdateImageProps = {
  profileUser: User;
};

const UpdateImage: React.FC<UpdateImageProps> = ({ profileUser }) => (
  <Card className="border-none bg-transparent">
    <CardBody className="justify-between">
      <div className="flex gap-3">
        <Avatar radius="full" size="lg" src={profileUser.imageUrl} />
        <div className="flex flex-col items-start justify-center pl-2">
          <h4 className="text-small font-semibold leading-none text-default-600">
            {profileUser.userName}
          </h4>
          <h5 className="text-small tracking-tight text-default-500">{profileUser.fullName}</h5>
        </div>
        <Button size="sm" className="absolute right-4 items-center mt-3">
            Change photo
        </Button>
      </div>
    </CardBody>
  </Card>
);
export default UpdateImage;
