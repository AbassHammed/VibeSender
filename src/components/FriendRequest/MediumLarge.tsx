import React from 'react';

import { Module } from '@/Components/FriendRequest';
import { AddUserIcon } from '@/Components/Icons';
import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/Components/UserInterface';
import { friends } from '@/data';

const MediumLarge: React.FC = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="lg:ml-5">
        <AddUserIcon className="h-6 w-6" />
      </Button>
    </SheetTrigger>
    <SheetContent className="overflow-y-auto h-screen px-1">
      <SheetHeader className="px-5">
        <SheetTitle>Notifications</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </SheetDescription>
        <Button type="submit">Clear your notifications</Button>
      </SheetHeader>
      <ul className="mt-6 space-y-3">
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
    </SheetContent>
  </Sheet>
);

export default MediumLarge;
