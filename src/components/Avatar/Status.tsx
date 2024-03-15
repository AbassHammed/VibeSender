import React from 'react';

import ProfileCard from '@/Components/ProfileCard';
import { stringToColor } from '@/lib/utils';
import { User as SessionUser } from '@/types';
import { Avatar, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

type StatusAvatarProps = {
  profileUser: SessionUser;
};

const StatusAvatar: React.FC<StatusAvatarProps> = ({ profileUser }) => (
  <Popover placement="bottom">
    <PopoverTrigger>
      <Avatar isBordered color={stringToColor(profileUser.status)} src={profileUser.imageUrl} />
    </PopoverTrigger>
    <PopoverContent className="p-1">
      <ProfileCard User={profileUser} />
    </PopoverContent>
  </Popover>
);

export default StatusAvatar;
