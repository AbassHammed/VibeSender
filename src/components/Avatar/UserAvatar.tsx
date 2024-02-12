import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, User } from '@nextui-org/react';
import { User as SessionUser } from '@/types';
import ProfileCard from '../ProfileCard/Profilecard';

type UserAvatarprops = {
  profileUser: SessionUser;
};

const UserAvatar: React.FC<UserAvatarprops> = ({ profileUser }) => (
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
