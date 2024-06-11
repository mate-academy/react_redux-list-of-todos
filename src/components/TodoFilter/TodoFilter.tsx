import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions as filterAction } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');

  const dispatch = useAppDispatch();

  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelect = event.currentTarget.value;

    setStatus(newSelect);

    dispatch(filterAction.setFilter(newSelect, query));
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.currentTarget.value;

    setQuery(newQuery);
    dispatch(filterAction.setFilter(status, newQuery));
  };

  const handleDelete = () => {
    setQuery('');
    dispatch(filterAction.removeFilter(status, ''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatus}>
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
