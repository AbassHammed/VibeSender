import React, { useState } from 'react';

import Loading from '@/components/Loading';
import { AppearancePage, ProfilePage } from '@/components/settingsComponents';
import SettingsNav from '@/components/SettingsNav';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/firebase/firebase';
import { useSession } from '@/hooks/useSession';
import { SettingsNavItem } from '@/utils/constants';
import { useAuthState } from 'react-firebase-hooks/auth';

export type settingPage = 'profile' | 'account' | 'appearance';

const Settings: React.FC = () => {
  const [variant, setVariant] = useState<settingPage>('profile');
  const [user, loading] = useAuthState(auth);
  const { sessionData } = useSession();

  if (loading || !user || !sessionData?.currentUser) {
    return <Loading />;
  }
  return (
    <div className="hidden space-y-6 pb-10 md:block rounded-lg dark:bg-black bg-white">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight px-4 pt-4">Settings</h2>
      </div>
      <Separator className="my-4 bg-[#0f0f0f]" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="p-2 lg:w-1/5">
          <SettingsNav items={SettingsNavItem} variant={variant} setVariant={setVariant} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          {variant === 'appearance' ? (
            <AppearancePage />
          ) : variant === 'profile' ? (
            <ProfilePage currentUser={sessionData.currentUser} />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
export default Settings;
