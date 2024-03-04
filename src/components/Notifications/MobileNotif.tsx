import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerPortal, DrawerTrigger } from '@/components/ui/drawer';
import { stringToNotif } from '@/utils/utils';
import { BsBell } from 'react-icons/bs';

import { NotificationMod } from '.';
import { notifs } from './Mediums&Large';

const MobileNotif: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button variant="ghost" size="icon">
          <BsBell className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerContent className="flex flex-col fixed max-h-[50%] rounded-t-[10px] dark:bg-[#141414]">
          <Button type="submit" className="m-5">
            Clear your notifications
          </Button>
          <div className="overflow-auto">
            {notifs.map((item, idx) => (
              <NotificationMod
                key={idx}
                notif={stringToNotif(item.notif)}
                message={item.message}
                url={item.url}
              />
            ))}
            {notifs.map((item, idx) => (
              <NotificationMod
                key={idx}
                notif={stringToNotif(item.notif)}
                message={item.message}
                url={item.url}
              />
            ))}
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default MobileNotif;
