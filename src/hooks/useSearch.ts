import { useContext } from 'react';

import { SearchStateContext } from '@/Contexts';

const useSearch = () => {
  const context = useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error('useSearchState must be used within an SearchStateProvider');
  }
  return context;
};

export default useSearch;
