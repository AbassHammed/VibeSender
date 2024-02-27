import React, { SetStateAction, useEffect } from 'react';

import { auth } from '@/firebase';
import { useLocalStorage } from '@/hooks';
import { User as SessionUser } from '@/types';
import { stringToColor } from '@/utils/utils';
import {
  Avatar,
  Button,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useSignOut } from 'react-firebase-hooks/auth';

import {
  AddNoteIcon,
  CopyDocumentIcon,
  DeleteDocumentIcon,
  EditDocumentIcon,
  SystemIcon,
} from '../Icons';

type MediumSideBarAvatarProps = {
  profileUser: SessionUser;
};

const MediumSideBarAvatar: React.FC<MediumSideBarAvatarProps> = ({ profileUser }) => {
  const [signOut] = useSignOut(auth);
  const { setTheme } = useTheme();
  const [themeVariant, setThemeVariant] = useLocalStorage('theme', 'system');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([themeVariant]));
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0';

  useEffect(() => {
    setTheme(themeVariant);
  }, [setTheme, themeVariant]);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys],
  );

  return (
    <Dropdown closeOnSelect={false}>
      <DropdownTrigger>
        <Avatar isBordered color={stringToColor(profileUser.status)} src={profileUser.imageUrl} />
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownSection showDivider>
          <DropdownItem
            key="theme"
            startContent={
              selectedValue === 'dark' ? (
                <MoonIcon />
              ) : selectedValue === 'light' ? (
                <SunIcon />
              ) : (
                <SystemIcon />
              )
            }
            endContent={
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">{selectedValue}</Button>
                </DropdownTrigger>
                <DropdownMenu
                  variant="faded"
                  aria-label="Dropdown menu with icons"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={key => setSelectedKeys(key as SetStateAction<Set<string>>)}>
                  <DropdownItem
                    key="light"
                    startContent={<SunIcon className={iconClasses} />}
                    onPress={() => setThemeVariant('light')}>
                    Light
                  </DropdownItem>
                  <DropdownItem
                    key="dark"
                    startContent={<MoonIcon className={iconClasses} />}
                    onPress={() => setThemeVariant('dark')}>
                    Dark
                  </DropdownItem>
                  <DropdownItem
                    key="system"
                    startContent={<SystemIcon className={iconClasses} />}
                    onPress={() => setThemeVariant('system')}>
                    System
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }>
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

export default MediumSideBarAvatar;
