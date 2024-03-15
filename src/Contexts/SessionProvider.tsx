import React, { createContext, useEffect, useState } from 'react';

import { decryptData, encryptData } from '@/lib/utils';
import { SessionData } from '@/types';

interface SessionProviderProps {
  children: React.ReactNode;
}

interface SessionContextProps {
  sessionData: SessionData | null;
  setSessionData: React.Dispatch<React.SetStateAction<SessionData | null>>;
}

export const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [sessionData, setSessionData] = useState<SessionData | null>(() => {
    if (typeof window !== 'undefined') {
      const storedSessionData = sessionStorage.getItem('uid');
      return storedSessionData ? JSON.parse(decryptData(storedSessionData)) : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionData) {
        sessionStorage.setItem('uid', encryptData(JSON.stringify(sessionData)));
      } else {
        sessionStorage.removeItem('sessionData');
      }
    }
  }, [sessionData]);

  return (
    <SessionContext.Provider value={{ sessionData, setSessionData }}>
      {children}
    </SessionContext.Provider>
  );
};
