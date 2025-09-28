import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, setStatus, clearQuery } from '../../features/filter';

type FilterStatus = 'all' | 'active' | 'completed';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value as FilterStatus));
  };

  const handleClearQuery = () => {
    dispatch(clearQuery());
  };

  return (
    <div className="field is-grouped mb-4">
      <div className="control has-icons-right">
        <input
          data-cy="searchInput"
          className="input"
          type="text"
          placeholder="Search todos."
          value={query}
          onChange={handleQueryChange}
        />
        {query && (
          <button
            data-cy="clearSearchButton"
            className="button is-small is-right"
            onClick={handleClearQuery}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 4,
            }}
          >
            <span className="icon is-small">
              <i className="fas fa-times"></i>
            </span>
          </button>
        )}
      </div>

      <div className="control">
        <div className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
