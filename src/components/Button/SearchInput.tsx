import React, { useState } from 'react';

import { searchRequest } from '@/firebase/query';
import useDebounce from '@/hooks/useDebounce';
import { useSession } from '@/hooks/useSession';
import { Input } from '@nextui-org/react';

import { SearchIcon } from '../Icons/SearchIcon';

interface SearchInputProps {
  currentUserId: string;
  searchInFriends: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ currentUserId, searchInFriends }) => {
  const [filterValue, setFilterValue] = useState('');
  const { setSessionData } = useSession();

  useDebounce(() => {
    if (filterValue.trim() !== '') {
      searchRequest(filterValue.trim(), searchInFriends, setSessionData, currentUserId);
    } else {setSessionData(prev => ({ ...prev, searchedUsers: [] }));}
  }, [currentUserId, setSessionData, filterValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value ? setFilterValue(e.currentTarget.value) : setFilterValue('');
  };

  return (
    <Input
      isClearable
      className="max-w-[320px] px-3 mb-2"
      variant="bordered"
      placeholder="Search by name..."
      value={filterValue}
      startContent={<SearchIcon />}
      onChange={handleSearchChange}
    />
  );
};

export default SearchInput;
