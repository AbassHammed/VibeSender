import React from 'react';

import { Input } from '@nextui-org/react';

import { SearchIcon } from '../Icons/SearchIcon';

const SearchInput: React.FC = () => {
  const [filterValue, setFilterValue] = React.useState('');

  const onSearchChange = React.useCallback((value?: string) => {
    value ? setFilterValue(value) : setFilterValue('');
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
  }, []);

  return (
    <Input
      isClearable
      className="max-w-[320px] mb-2"
      variant="bordered"
      placeholder="Search by name..."
      value={filterValue}
      startContent={<SearchIcon />}
      onClear={() => onClear()}
      onValueChange={onSearchChange}
    />
  );
};
export default SearchInput;
