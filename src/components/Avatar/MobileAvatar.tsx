import React, { useState } from 'react';

import { Drawer, DrawerContent, DrawerPortal, DrawerTrigger } from '@/components/ui/drawer';
import { auth } from '@/firebase';
import { User as SessionUser } from '@/types';
import { Avatar, cn, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react';
import { useSignOut } from 'react-firebase-hooks/auth';

import { AddNoteIcon, CopyDocumentIcon, DeleteDocumentIcon, EditDocumentIcon } from '../Icons';

type MobileAvatarProps = {
  profileUser: SessionUser;
};

const MobileAvatar: React.FC<MobileAvatarProps> = ({ profileUser }) => {
  const [open, setOpen] = useState(false);
  const [signOut] = useSignOut(auth);
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0';

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
                href="/privacy"
                key="privacy"
                description="How we manage your data"
                startContent={<AddNoteIcon className={iconClasses} />}>
                Privacy
              </ListboxItem>
              <ListboxItem
                href="/terms-condition"
                key="terms"
                description="Terms and Conditions"
                startContent={<CopyDocumentIcon className={iconClasses} />}>
                Terms
              </ListboxItem>
              <ListboxItem
                href="/report"
                key="report"
                description="Report a bug or an issue"
                startContent={<EditDocumentIcon className={iconClasses} />}>
                Report
              </ListboxItem>
            </ListboxSection>
            <ListboxSection>
              <ListboxItem
                key="logout"
                className="text-warning"
                color="warning"
                onPress={signOut}
                description="Logout of your account"
                startContent={<DeleteDocumentIcon className={cn(iconClasses, 'text-warning')} />}>
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
