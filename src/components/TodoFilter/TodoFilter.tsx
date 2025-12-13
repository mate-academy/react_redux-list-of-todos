import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setStatus, setQuery } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(setStatus(e.target.value as 'all' | 'active' | 'completed'));

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setQuery(e.target.value));

  const handleClearSearch = () => dispatch(setQuery(''));

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            value={filter.status}
            onChange={handleStatusChange}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>
      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          type="text"
          className="input"
          placeholder="Search..."
          value={filter.query}
          onChange={handleQueryChange}
          data-cy="searchInput"
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {filter.query.length > 0 && (
            <button
              type="button"
              className="delete"
              data-cy="clearSearchButton"
              onClick={handleClearSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
