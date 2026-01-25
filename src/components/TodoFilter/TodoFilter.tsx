import React from 'react';
import {
  Status as FilterStatus,
  setQuery,
  setStatus,
} from '../../features/filter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.filter.query);

  const handleStatus = (status: FilterStatus) => {
    dispatch(setStatus(status));
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
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
            onChange={e => handleStatus(e.target.value as FilterStatus)}
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
          onChange={handleQuery}
          value={query}
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
              onClick={() => dispatch(setQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
