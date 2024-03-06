import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerPortal, DrawerTrigger } from '@/components/ui/drawer';
import { stringToNotif } from '@/utils/utils';
import { BsBell } from 'react-icons/bs';

import { NotificationMod } from '.';
import Swipe from '../Swipe';

const MobileNotif: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState([
    {
      id: 1,
      message: 'Your friend AbassHammed just added you, check thier profile out',
      notif: 'info',
    },
    {
      id: 2,
      message:
        'It\'s been 6 months since you changed your password, constantly changing password makes it more secure',
      notif: 'warn',
    },
    {
      id: 3,
      message:
        'Your account is violating some our terms and conditions, kindly review your email inboxes for the steps to takes',
      notif: 'error',
    },
    {
      id: 4,
      message: 'You just created your account, welcome! complete your profile here.',
      notif: 'success',
      url: 'localhost:3000/setting',
    },
  ]);

  const removeNotification = (id: number) => {
    setNotifs(notifs.filter(notification => notification.id !== id));
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <BsBell className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerContent className="flex flex-col md:hidden fixed max-h-[50%] rounded-t-[10px] dark:bg-[#141414]">
          <Button type="submit" className="m-5">
            Clear your notifications
          </Button>
          <div className="overflow-auto">
            {notifs.map((item, idx) => (
              <Swipe key={idx} onSwipe={() => removeNotification(item.id)}>
                <NotificationMod
                  key={idx}
                  notif={stringToNotif(item.notif)}
                  message={item.message}
                  url={item.url}
                  onClose={() => removeNotification(item.id)}
                />
              </Swipe>
            ))}
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default MobileNotif;
