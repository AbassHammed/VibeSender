import React, { useState } from 'react';

import { AccountPage, ProfilePage, SettingsNav } from '@/Components/settingsComponents';
import Spinner from '@/Components/Spinner';
import { Separator } from '@/Components/UserInterface';
import { auth } from '@/firebase/firebase';
import { useSession } from '@/hooks/useSession';
import { SettingsNavItem } from '@/lib/constants';
import { useAuthState } from 'react-firebase-hooks/auth';

export type settingPage = 'profile' | 'account';

const SettingsPage: React.FC = () => {
  const [variant, setVariant] = useState<settingPage>('profile');
  const [user, loading] = useAuthState(auth);
  const { sessionData } = useSession();

  if (loading || !user || !sessionData?.currentUser) {
    return <Spinner />;
  }
  return (
    <div className=" space-y-6 pb-5 px-2 md:block rounded-lg  light:bg-white">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight px-4 pt-4">Settings</h2>
      </div>
      <Separator className="my-4 light:bg-[#0f0f0f]" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="p-2 lg:w-1/5">
          <SettingsNav items={SettingsNavItem} variant={variant} setVariant={setVariant} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          {variant === 'profile' ? (
            <ProfilePage currentUser={sessionData.currentUser} />
          ) : (
            <AccountPage currentUser={sessionData.currentUser} />
          )}
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
