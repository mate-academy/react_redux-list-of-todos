import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(e.target.value as Status));
  };

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const clearQuery = () => dispatch(setQuery(''));

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={onStatusChange}
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
          onChange={onQueryChange}
          placeholder="Search..."
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={clearQuery}
              />
            </span>
          )}
        </span>
      </p>
    </form>
  );
};
