import React, { SetStateAction, useEffect } from 'react';

import { EditDocumentIcon, MoonIcon, SunIcon, SystemIcon } from '@/Components/Icons';
import { auth } from '@/firebase';
import { useLocalStorage } from '@/hooks';
import { stringToColor } from '@/lib/utils';
import { User as SessionUser } from '@/types';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { LogOutIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSignOut } from 'react-firebase-hooks/auth';

interface MediumSideBarAvatarProps {
  profileUser: SessionUser;
}

const MediumSideBarAvatar: React.FC<MediumSideBarAvatarProps> = ({ profileUser }) => {
  const [signOut] = useSignOut(auth);
  const { setTheme } = useTheme();
  const [themeVariant, setThemeVariant] = useLocalStorage('theme', 'system');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([themeVariant]));
  const iconClasses = 'text-xl pointer-events-none flex-shrink-0 w-6 h-6';

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
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{profileUser.fullName}</p>
          </DropdownItem>
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
                  <Button variant="bordered">{selectedValue} </Button>
                </DropdownTrigger>

                <DropdownMenu
                  variant="faded"
                  aria-label="Dropdown menu for the themes"
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
            Theme
          </DropdownItem>
          <DropdownItem
            href="/report"
            key="report"
            description="Report a bug or an issue"
            startContent={<EditDocumentIcon className={iconClasses} />}>
            Help & Feedback
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="logout"
            className="text-warning"
            color="warning"
            startContent={<LogOutIcon className={iconClasses} />}
            onPress={signOut}
            description="Logout of your account">
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default MediumSideBarAvatar;
