import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilters,
  setQueryFilter,
  setStatusFilter,
} from '../../features/filter';
import { AppDispatch } from '../../app/store';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector(selectFilters);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => {
              dispatch(setStatusFilter(event.target.value));
            }}
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
          onChange={event => dispatch(setQueryFilter(event.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filters.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(setQueryFilter(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
