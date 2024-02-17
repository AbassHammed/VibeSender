import React from 'react';

import { User as SessionUser } from '@/types';
import { Avatar, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import ProfileCard from '../ProfileCard/Profilecard';

type StatusAvatarProps = {
  profileUser: SessionUser;
};

const StatusAvatar: React.FC<StatusAvatarProps> = ({ profileUser }) => (
  <Popover showArrow placement="bottom">
    <PopoverTrigger>
      <Avatar isBordered color={profileUser.status} src={profileUser.imageUrl} />
    </PopoverTrigger>
    <PopoverContent className="p-1">
      <ProfileCard User={profileUser} />
    </PopoverContent>
  </Popover>
);

export default StatusAvatar;
