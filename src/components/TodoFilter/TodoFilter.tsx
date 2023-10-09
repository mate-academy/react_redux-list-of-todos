import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Filter } from '../../types/Filter';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const [search, setSearch] = useState('');

  const dispatch = useAppDispatch();
  const { status } = useAppSelector(state => state.filter);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setStatus(event.target.value as Filter));
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    dispatch(filterActions.setQuery(event.target.value));
  };

  const handleClear = () => {
    dispatch(filterActions.clearQuery());
    setSearch('');
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
            value={status}
          >
            <option value={Filter.All}>All</option>
            <option value={Filter.Active}>Active</option>
            <option value={Filter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {search && (
            <button
              aria-label="none"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
