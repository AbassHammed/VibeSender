import React, { useState } from 'react';

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
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useSignOut } from 'react-firebase-hooks/auth';

import { AddNoteIcon } from '../Icons/AddNoteIcon';
import { CopyDocumentIcon } from '../Icons/CopyDocumentIcon';
import { DeleteDocumentIcon } from '../Icons/DeleteDocumentIcon';
import { EditDocumentIcon } from '../Icons/EditDocumentIcon';
import { SystemIcon } from '../Icons/SystemIcon';

type SideBarAvatarProps = {
  profileUser: SessionUser;
};

type theme = 'light' | 'dark';

const SideBarAvatar: React.FC<SideBarAvatarProps> = ({ profileUser }) => {
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0';
  const [signOut] = useSignOut(auth);
  const { setTheme } = useTheme();
  const [themeVariant, setThemeVariant] = useState<theme>();
  const [isIcon, setIsIcon] = useState<boolean | undefined>(undefined);

  const toggleTheme = () => {
    if (themeVariant === 'dark') {
      setIsIcon(true);
      setThemeVariant('light');
      setTheme(themeVariant);
    }
    if (themeVariant === 'light' || !themeVariant) {
      setIsIcon(false);
      setThemeVariant('dark');
      setTheme(themeVariant || 'dark');
    }
  };

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
            key="theme"
            startContent={isIcon ? <MoonIcon /> : !isIcon ? <SunIcon /> : <SystemIcon />}
            onPress={toggleTheme}>
            Switch appearance
          </DropdownItem>
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
