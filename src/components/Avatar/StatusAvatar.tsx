import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, Avatar } from '@nextui-org/react';
import { User as SessionUser } from '@/types';
import ProfileCard from '../ProfileCard/Profilecard';

type UserAvatarprops = {
  profileUser: SessionUser;
};

const UserAvatar: React.FC<UserAvatarprops> = ({ profileUser }) => (
  <Popover showArrow placement="bottom">
    <PopoverTrigger>
      <Avatar isBordered color={profileUser.status} src={profileUser.imageUrl} />
    </PopoverTrigger>
    <PopoverContent className="p-1">
      <ProfileCard User={profileUser} />
    </PopoverContent>
  </Popover>
);

export default UserAvatar;
