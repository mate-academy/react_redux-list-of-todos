import React from 'react';
import { FilterTypes, actions as filterActions } from '../../features/filter';
import { useAppDispatch, useAppSelector } from '../../hooks';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={filter.status}
            onChange={event => {
              const value = event.target.value as FilterTypes;

              dispatch(filterActions.setFilter(value));
            }}
            data-cy="statusSelect"
          >
            <option value={FilterTypes.All}>All</option>
            <option value={FilterTypes.Active}>Active</option>
            <option value={FilterTypes.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={filter.query}
          onChange={event => {
            dispatch(filterActions.setQuery(event.target.value));
          }}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {filter.query.trim() && (
            <button
              onClick={() => dispatch(filterActions.setQuery(''))}
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
