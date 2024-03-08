import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { stringToNotif } from '@/utils/utils';
import { BsBell } from 'react-icons/bs';

import { NotificationMod } from '.';

const MediumLargeSheet: React.FC = () => {
  const [notifs, setNotifs] = useState([
    {
      id: 1,
      message: 'Your friend AbassHammed just added you, check thier profile out',
      notif: 'info',
    },
    {
      id: 2,
      message:
        'It has been 6 months since you changed your password, constantly changing password makes it more secure',
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:mx-5">
          <BsBell className="h-6 w-6" />
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
        {notifs.map(item => (
          <NotificationMod
            key={item.id}
            notif={stringToNotif(item.notif)}
            message={item.message}
            url={item.url}
            onClose={() => removeNotification(item.id)}
          />
        ))}
        {notifs.map((item, idx) => (
          <NotificationMod
            key={idx}
            notif={stringToNotif(item.notif)}
            message={item.message}
            url={item.url}
            onClose={() => removeNotification(item.id)}
          />
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default MediumLargeSheet;
