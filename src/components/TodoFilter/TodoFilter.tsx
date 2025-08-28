import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleClearQuery = () => {
    dispatch(setQuery(''));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value as 'all' | 'active' | 'completed'));
  };

  return (
    <div className="field has-addons">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Search todos..."
          value={query}
          onChange={handleQueryChange}
          data-cy="searchInput"
        />
      </div>
      {query && (
        <div className="control">
          <button
            className="button is-light"
            onClick={handleClearQuery}
            data-cy="clearSearchButton"
          >
            Clear
          </button>
        </div>
      )}
      <div className="control">
        <div className="select">
          <select
            value={status}
            onChange={handleStatusChange}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};
