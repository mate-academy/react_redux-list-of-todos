import React from 'react';
import { StatusFilter } from './StatusFilter';
import { QueryFilter } from './QueryFilter';

export const TodoFilter: React.FC = () => {
  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <StatusFilter />

      <QueryFilter />
    </form>
  );
};
