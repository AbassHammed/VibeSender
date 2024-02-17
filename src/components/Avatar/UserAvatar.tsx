import React from 'react';

import { User as SessionUser } from '@/types';
import { Popover, PopoverContent, PopoverTrigger, User } from '@nextui-org/react';

import ProfileCard from '../ProfileCard/Profilecard';

type UserAvatarProps = {
  profileUser: SessionUser;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ profileUser }) => (
  <Popover showArrow placement="bottom">
    <PopoverTrigger>
      <User
        as="button"
        name={profileUser.fullName}
        description={profileUser.jobDescription}
        className="transition-transform"
        avatarProps={{
          src: profileUser.imageUrl,
        }}
      />
    </PopoverTrigger>
    <PopoverContent className="p-1">
      <ProfileCard User={profileUser} />
    </PopoverContent>
  </Popover>
);

export default UserAvatar;
