import React from 'react';

import { FilterStatus, setQuery, setStatus } from '../../features/filter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.filter.query);

  const handleStatusChange = (value: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(value.target.value as FilterStatus));
  };

  const handleQueryChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(value.target.value));
  };

  const resetQuery = () => {
    dispatch(setQuery(''));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusChange}>
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
          onChange={handleQueryChange}
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
              onClick={resetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
