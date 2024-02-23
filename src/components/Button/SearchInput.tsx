import React, { useState } from 'react';

import { searchMessages, searchRequest } from '@/firebase';
import { useDebounce, useSession } from '@/hooks';
import { Input } from '@nextui-org/react';

import { SearchIcon } from '../Icons';

type Page = 'convo' | 'find';

interface SearchInputProps {
  currentUserId: string;
  page: Page;
}

const SearchInput: React.FC<SearchInputProps> = ({ currentUserId, page }) => {
  const [filterValue, setFilterValue] = useState('');
  const { setSessionData } = useSession();

  useDebounce(() => {
    if (page === 'convo' && filterValue.trim() !== '') {
      searchMessages(filterValue.trim(), setSessionData, currentUserId);
    } else if (page === 'find' && filterValue.trim() !== '') {
      searchRequest(filterValue.trim(), setSessionData);
    } else {
      setSessionData(prev => ({ ...prev, searchedUsers: [] }));
    }
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
