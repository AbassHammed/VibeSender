import { useContext } from 'react';

import { SessionContext } from '@/Contexts';

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a Sessionprovider');
  }
  return context;
};
