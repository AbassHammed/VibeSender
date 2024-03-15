import React, { SetStateAction, useEffect } from 'react';

import { EditDocumentIcon, MoonIcon, SunIcon, SystemIcon } from '@/Components/Icons';
import { auth } from '@/firebase';
import { useLocalStorage } from '@/hooks';
import { User as SessionUser } from '@/types';
import {
  Button,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useSignOut } from 'react-firebase-hooks/auth';

interface SideBarAvatarProps {
  profileUser: SessionUser;
}

const SideBarAvatar: React.FC<SideBarAvatarProps> = ({ profileUser }) => {
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
            onPress={signOut}
            description="Logout of your account">
            Log out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SideBarAvatar;
