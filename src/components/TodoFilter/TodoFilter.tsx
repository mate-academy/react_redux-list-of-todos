import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { Filter, actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter.filter);
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();

  const onFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    dispatch(filterActions.setFilter(value as Filter));
  };

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    dispatch(filterActions.setQuery(value));
  };

  const queryClear = () => {
    dispatch(filterActions.setQuery(''));
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
            value={filter}
            onChange={onFilterChange}
          >
            <option value="all">All</option>

            <option value="active">Active</option>

            <option value="completed">Completed</option>
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
          onChange={onQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {!!query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={queryClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
