import React, { useState } from 'react';

import { Drawer, DrawerContent, DrawerPortal, DrawerTrigger } from '@/Components/UserInterface';
import { auth } from '@/firebase';
import { User as SessionUser } from '@/types';
import { Avatar, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react';
import { LogOutIcon } from 'lucide-react';
import { useSignOut } from 'react-firebase-hooks/auth';

import { EditDocumentIcon } from '../Icons';

interface MobileAvatarProps {
  profileUser: SessionUser;
}

const MobileAvatar: React.FC<MobileAvatarProps> = ({ profileUser }) => {
  const [open, setOpen] = useState(false);
  const [signOut] = useSignOut(auth);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Avatar src={profileUser.imageUrl} size="sm" />
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerContent className="flex flex-col md:hidden fixed max-h-[50%] rounded-t-[10px] dark:bg-[#141414]">
          <Listbox variant="flat" aria-label="Listbox with options for user">
            <ListboxSection showDivider>
              <ListboxItem
                href="/report"
                key="report"
                description="Report a bug or an issue"
                startContent={<EditDocumentIcon className="h-6 w-6" />}>
                Help & Feedback
              </ListboxItem>
            </ListboxSection>
            <ListboxSection>
              <ListboxItem
                key="logout"
                className="text-warning"
                color="warning"
                startContent={<LogOutIcon />}
                onPress={signOut}
                description="Logout of your account">
                Log out
              </ListboxItem>
            </ListboxSection>
          </Listbox>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};
export default MobileAvatar;
