/* eslint-disable max-len */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';
import { Filters } from '../../types/Filters';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const { setFilter, setQuery } = actions;

  const handleChange =
    (key: 'query' | 'status') =>
      // eslint-disable-next-line prettier/prettier
      (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = event.target.value;

      dispatch(key === 'query' ? setQuery(value) : setFilter(value as Status));
    };

  const handleQueryChange = handleChange('query');
  const handleFilterChange = handleChange('status');
  const handleClearSearch = () => query && dispatch(setQuery(''));

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            onChange={handleFilterChange}
            value={status}
            data-cy="statusSelect"
          >
            <option value={Filters.All}>All</option>
            <option value={Filters.Active}>Active</option>
            <option value={Filters.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
