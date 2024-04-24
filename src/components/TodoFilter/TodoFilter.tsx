import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const filterDispatch = useAppDispatch();
  const queryDispatch = useAppDispatch();
  const selectedFilter = useAppSelector(state => state.currentFilter.status);
  const query = useAppSelector(state => state.currentFilter.query);

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    queryDispatch(filterActions.setQuery(event.target.value));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    filterDispatch(filterActions.setStatus(event.target.value as Status));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={selectedFilter}
            data-cy="statusSelect"
            onChange={e => handleFilterChange(e)}
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
          onChange={e => handleQuery(e)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => queryDispatch(filterActions.clearQuery())}
          />
        </span>
      </p>
    </form>
  );
};
