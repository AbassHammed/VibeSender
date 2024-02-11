import React, { createContext, useContext, useState } from 'react';

type SidebarContextType = {
  isLinkActive: boolean;
  activeLinkId: string | null;
  toggleLinkActive: (linkId: string) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLinkActive, setIsLinkActive] = useState(true);
  const [activeLinkId, setActiveLinkId] = useState<string | null>(null);

  const toggleLinkActive = (linkId: string) => {
    setIsLinkActive(prevIsActive => {
      if (activeLinkId === linkId && prevIsActive) {
        return false;
      } else if (activeLinkId === linkId && !prevIsActive) {
        return true;
      } else {
        setActiveLinkId(linkId);
        return true;
      }
    });
  };

  return (
    <SidebarContext.Provider value={{ isLinkActive, activeLinkId, toggleLinkActive }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};
