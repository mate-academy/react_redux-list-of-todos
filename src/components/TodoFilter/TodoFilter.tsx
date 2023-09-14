import React from 'react';
import { SearchInput } from '../SearchInput';
import { Select } from '../Select';

export const TodoFilter: React.FC = () => {
  return (
    <form className="field has-addons">
      <Select />

      <SearchInput />
    </form>
  );
};
