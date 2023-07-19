import React from 'react';
import { SortingType } from '../../types/sortingType';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, query } = useAppSelector((state) => state.filter);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setStatus(event.target.value as SortingType));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(event.target.value));
  };

  const handleClearSearch = () => {
    dispatch(filterActions.clearFilter());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleFilterChange}
          >
            <option value={SortingType.ALL}>All</option>
            <option value={SortingType.ACTIVE}>Active</option>
            <option value={SortingType.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query
            && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleClearSearch}
                aria-label="delete"
              />
            )}
        </span>
      </p>
    </form>
  );
};
