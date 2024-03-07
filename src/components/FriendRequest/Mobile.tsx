import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
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

const Mobile: React.FC = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button variant="ghost" size="icon" className="lg:ml-5">
        <IoPersonAddOutline className="h-6 w-6" />
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
