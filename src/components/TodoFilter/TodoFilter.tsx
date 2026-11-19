import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const handleClearQuery = () => {
    dispatch(setQuery(''));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(e.target.value as Status));
  };

  return (
    <nav className="level">
      <div className="level-left">
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              data-cy="searchInput"
              className="input"
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleQueryChange}
            />
            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>

            {query && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete is-small"
                style={{ position: 'absolute', right: '12px', top: '14px' }}
                onClick={handleClearQuery}
              />
            )}
          </div>
        </div>
      </div>

      <div className="level-right">
        <div className="field">
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
      </div>
    </nav>
  );
};
