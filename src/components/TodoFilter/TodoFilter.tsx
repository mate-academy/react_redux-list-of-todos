import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { actions as filterActions } from '../../features/filter';
import { FilterBy } from '../../types/FilterBy';

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(event.target.value));
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
            onChange={event =>
              dispatch(filterActions.setFilter(event.target.value as FilterBy))
            }
            value={status}
          >
            <option value={FilterBy.ALL}>All</option>
            <option value={FilterBy.ACTIVE}>Active</option>
            <option value={FilterBy.COMPLETED}>Completed</option>
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
          onChange={handleQuery}
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
              onClick={() => dispatch(filterActions.setQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
