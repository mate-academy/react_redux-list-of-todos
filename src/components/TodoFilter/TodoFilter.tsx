import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value));
  };

  const handleClearQuery = () => {
    dispatch(setQuery(''));
  };

  return (
    <div className="field is-grouped">
      <p className="control is-expanded">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleQueryChange}
        />
      </p>
      {query && (
        <p className="control">
          <button
            data-cy="clearSearchButton"
            type="button"
            className="button"
            onClick={handleClearQuery}
          >
            Clear
          </button>
        </p>
      )}
      <p className="control">
        <select
          data-cy="statusSelect"
          className="select"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </p>
    </div>
  );
};
