import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filterForm, setFilterFrom] = useState<Status>('all');

  const dispatch = useAppDispatch();

  const setFilter = (filterToUse: Status, queryToUse: string) =>
    dispatch(filterActions.setFilter(filterToUse, queryToUse));

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    setFilter(filterForm, event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterFrom(event.target.value as Status);

    setFilter(event.target.value as Status, query);
  };

  const handleDeleteQuery = () => {
    setQuery('');

    setFilter(filterForm, '');
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
            value={filterForm}
            onChange={handleFilterChange}
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
          value={query}
          placeholder="Search..."
          onChange={handleQueryChange}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
