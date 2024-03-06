import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { IoPersonAddOutline } from 'react-icons/io5';

import { Module } from '.';

const friends = [
  {
    id: 1,
    recieverId: 'vhmlvbuijlbdbciubfeqiybvliulbqviue',
    senderId: 'oiherqubibmavbibrmioeuionuariu',
    senderUserName: 'AbassHammed',
    requestId: 'vhmlvbuijlbdbciubfeqiybvliulbqviue_oiherqubibmavbibrmioeuionuariu',
  },
  {
    id: 2,
    recieverId: 'eqyblvulibvliuybqvieubciubldbjvlhm',
    senderId: 'nuariuoiherqubrmioeibmavbibuibmav',
    senderUserName: 'JaneDoe',
    requestId: 'eqyblvulibvliuybqvieubciubldbjvlhm_nuariuoiherqubrmioeibmavbibuibmav',
  },
  {
    id: 3,
    recieverId: 'cubfeqiybvhmlvbuilbqviueijlbdbciu',
    senderId: 'bibuibmavoiherqunumavbibrmioeuariu',
    senderUserName: 'JohnSmith',
    requestId: 'cubfeqiybvhmlvbuilbqviueijlbdbciu_bibuibmavoiherqunumavbibrmioeuariu',
  },
  {
    id: 4,
    recieverId: 'liulbqviuevhmlvbuijlbdbciubfeqiybv',
    senderId: 'ionuariuoiherqubibmavbibrmioeu',
    senderUserName: 'AliceJones',
    requestId: 'liulbqviuevhmlvbuijlbdbciubfeqiybv_ionuariuoiherqubibmavbibrmioeu',
  },
  {
    id: 5,
    recieverId: 'bciubfeqiybvliulbqviuevhmlvbuijlbd',
    senderId: 'rmioeuionuariuoiherqubibmavbi',
    senderUserName: 'EveWilliams',
    requestId: 'bciubfeqiybvliulbqviuevhmlvbuijlbd_rmioeuionuariuoiherqubibmavbi',
  },
];

const MediumLarge: React.FC = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="lg:ml-5">
        <IoPersonAddOutline className="h-6 w-6" />
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
