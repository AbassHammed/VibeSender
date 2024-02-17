import React from 'react';

import { auth } from '@/firebase/firebase';
import { User as SessionUser } from '@/types';
import {
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from '@nextui-org/react';
import { useSignOut } from 'react-firebase-hooks/auth';

import { AddNoteIcon } from '../Icons/AddNoteIcon';
import { CopyDocumentIcon } from '../Icons/CopyDocumentIcon';
import { DeleteDocumentIcon } from '../Icons/DeleteDocumentIcon';
import { EditDocumentIcon } from '../Icons/EditDocumentIcon';

type SideBarAvatarProps = {
  profileUser: SessionUser;
};

const SideBarAvatar: React.FC<SideBarAvatarProps> = ({ profileUser }) => {
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0';
  const [signOut] = useSignOut(auth);

  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          as="button"
          name={profileUser.fullName}
          description={profileUser.jobDescription}
          className="transition-transform font-semibold"
          avatarProps={{
            src: profileUser.imageUrl,
          }}
        />
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownSection showDivider>
          <DropdownItem
            href="/privacy"
            key="privacy"
            description="How we manage your data"
            startContent={<AddNoteIcon className={iconClasses} />}>
            Privacy
          </DropdownItem>
          <DropdownItem
            href="/terms-condition"
            key="terms"
            description="Terms and Conditions"
            startContent={<CopyDocumentIcon className={iconClasses} />}>
            Terms
          </DropdownItem>
          <DropdownItem
            href="/report"
            key="report"
            description="Report a bug or an issue"
            startContent={<EditDocumentIcon className={iconClasses} />}>
            Report
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          <DropdownItem
            key="logout"
            className="text-warning"
            color="warning"
            onPress={signOut}
            description="Logout of your account"
            startContent={<DeleteDocumentIcon className={cn(iconClasses, 'text-warning')} />}>
            Log out
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            description="Permanently delete your account"
            startContent={<DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />}>
            Delete Account
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SideBarAvatar;
