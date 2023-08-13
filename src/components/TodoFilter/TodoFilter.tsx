import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { FilterStatus } from '../../types/FilterStatus';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const handleFilterStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.setStatus(event.target.value as FilterStatus));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setQuery(event.target.value));
  };

  const handleClear = () => {
    dispatch(actions.setClear());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={status}
            data-cy="statusSelect"
            onChange={handleFilterStatus}
          >
            <option value={FilterStatus.ALL}>All</option>
            <option value={FilterStatus.ACTIVE}>Active</option>
            <option value={FilterStatus.COMPLETED}>Completed</option>
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
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
              aria-label="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
