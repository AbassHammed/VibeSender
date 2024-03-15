import React, { createContext, useState } from 'react';

interface SearchStateProviderProps {
  children: React.ReactNode;
}

interface SearchStateContextProps {
  isSearchEnabled: boolean;
  setSearchEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchStateContext = createContext<SearchStateContextProps | undefined>(undefined);

export const SearchStateProvider: React.FC<SearchStateProviderProps> = ({ children }) => {
  const [isSearchEnabled, setSearchEnabled] = useState<boolean>(false);

  return (
    <SearchStateContext.Provider value={{ isSearchEnabled, setSearchEnabled }}>
      {children}
    </SearchStateContext.Provider>
  );
};
