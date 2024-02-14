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
      className="mx-2 max-w-[300px]"
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
