/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filter);

  const changeStatus = (newStatus: string) => {
    const newFilters = { ...filters, status: newStatus };

    return dispatch(filterActions.setFilters(newFilters));
  };

  const changeQuery = (newQuery: string) => {
    const newFilters = { ...filters, query: newQuery };

    return dispatch(filterActions.setFilters(newFilters));
  };

  const removeQuery = () => {
    const newFilters = { ...filters, query: '' };

    return dispatch(filterActions.setFilters(newFilters));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filters.status}
            onChange={({ target }) => changeStatus(target.value)}
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
          value={filters.query}
          onChange={({ target }) => changeQuery(target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filters.query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={removeQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
