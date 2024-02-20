import React, { useState } from 'react';

import { searchRequest } from '@/firebase/query';
import useDebounce from '@/hooks/useDebounce';
import { useSession } from '@/hooks/useSession';
import { Input } from '@nextui-org/react';

import { SearchIcon } from '../Icons/SearchIcon';

interface SearchInputProps {
  currentUserId: string;
  searchInfirends: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ currentUserId, searchInfirends }) => {
  const [filterValue, setFilterValue] = useState('');
  const { setSessionData } = useSession();

  useDebounce(() => {
    if (filterValue) {searchRequest(filterValue, searchInfirends, setSessionData, currentUserId);}
  }, [currentUserId, setSessionData, filterValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value ? setFilterValue(e.currentTarget.value) : setFilterValue('');
  };

  return (
    <Input
      isClearable
      className="max-w-full px-3 mb-2"
      variant="bordered"
      placeholder="Search by name..."
      value={filterValue}
      startContent={<SearchIcon />}
      onChange={handleSearchChange}
    />
  );
};

export default SearchInput;
