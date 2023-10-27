import React, { useContext } from 'react';

import { TodosContext } from '../TodosContext';
import { Status } from '../../types/Status';

export const TodoFilter = () => {
  const { filter, setFilter } = useContext(TodosContext);

  const handleGlobalFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFilter({
      ...filter,
      global: event.target.value as Status,
    });
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      query: event.target.value,
    });
  };

  const handleClearSearch = () => {
    setFilter({
      ...filter,
      query: '',
    });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.global}
            onChange={handleGlobalFilterChange}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filter.query}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
