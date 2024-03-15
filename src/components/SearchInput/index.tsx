import React, { useState } from 'react';

import { searchRequest } from '@/firebase';
import { useDebounce, useSession } from '@/hooks';
import { Input } from '@nextui-org/react';

import { SearchIcon } from '../Icons';

interface SearchInputProps {
  currentUserId: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ currentUserId }) => {
  const [filterValue, setFilterValue] = useState('');
  const { setSessionData } = useSession();

  useDebounce(() => {
    filterValue.trim() !== ''
      ? searchRequest(filterValue.trim(), setSessionData)
      : setSessionData(prev => ({ ...prev, searchedUsers: [] }));
  }, [currentUserId, setSessionData, filterValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value ? setFilterValue(e.currentTarget.value) : setFilterValue('');
  };

  return (
    <Input
      isClearable
      className="w-full px-3 mb-2"
      variant="bordered"
      placeholder="Search by Username..."
      value={filterValue}
      startContent={<SearchIcon />}
      onClear={() => setFilterValue('')}
      onChange={handleSearchChange}
    />
  );
};

export default SearchInput;
