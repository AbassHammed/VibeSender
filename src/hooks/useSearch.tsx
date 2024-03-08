import React, { createContext, useContext, useState } from 'react';

interface SearchStateProviderProps {
  children: React.ReactNode;
}

interface SearchStateContextProps {
  isSearchEnabled: boolean;
  setSearchEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchStateContext = createContext<SearchStateContextProps | undefined>(undefined);

export const SearchStateProvider: React.FC<SearchStateProviderProps> = ({ children }) => {
  const [isSearchEnabled, setSearchEnabled] = useState<boolean>(false);

  return (
    <SearchStateContext.Provider value={{ isSearchEnabled, setSearchEnabled }}>
      {children}
    </SearchStateContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error('useSearchState must be used within an SearchStateProvider');
  }
  return context;
};
