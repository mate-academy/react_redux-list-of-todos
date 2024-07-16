import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearCurrentQuery,
  getCurrentFilter,
  getCurrentQuery,
} from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.filter.query);

  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value as Status;

    dispatch(getCurrentFilter(filterValue));
  };

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryValue = e.target.value;

    dispatch(getCurrentQuery(queryValue));
  };

  const handleClearQuery = () => {
    dispatch(clearCurrentQuery());
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select onChange={handleChangeFilter} data-cy="statusSelect">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={handleChangeQuery}
          data-cy="searchInput"
          value={query}
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              onClick={handleClearQuery}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
