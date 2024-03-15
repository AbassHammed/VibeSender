import React from 'react';

import { Module } from '@/Components/FriendRequest';
import { AddUserIcon } from '@/Components/Icons';
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/Components/UserInterface';
import { friends } from '@/data';

const Mobile: React.FC = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button variant="ghost" size="icon" className="lg:ml-5">
        <AddUserIcon className="h-6 w-6" />
      </Button>
    </DrawerTrigger>
    <DrawerContent className="flex flex-col md:hidden fixed max-h-[50%] rounded-t-[10px] dark:bg-[#141414]">
      <DrawerHeader className="px-5">
        <DrawerTitle>Notifications</DrawerTitle>
      </DrawerHeader>
      <ul className="mt-6 space-y-3 overflow-auto">
        {friends.map(item => (
          <Module
            key={item.id}
            recieverId={item.recieverId}
            requestId={item.requestId}
            senderId={item.senderId}
            senderUserName={item.senderUserName}
          />
        ))}
      </ul>
    </DrawerContent>
  </Drawer>
);

export default Mobile;
